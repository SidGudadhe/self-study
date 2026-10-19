import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { AdaptiveEngine } from '@/lib/adaptive/engine';
import { AIProvider } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUserOrDemo();
    const body = await req.json();
    const { testId, responses = {}, durationSeconds = 0 } = body;

    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          include: { topic: true },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    let totalScore = 0;
    const maxScore = test.totalMarks;

    // Create Test Attempt
    const attempt = await prisma.testAttempt.create({
      data: {
        testId: test.id,
        userId: user.id,
        durationSeconds: Number(durationSeconds),
        status: 'SUBMITTED',
      },
    });

    const evaluatedQuestions = [];

    for (const q of test.questions) {
      const studentAns = responses[q.id];
      let isCorrect: boolean | null = false;
      let scoreEarned = 0;
      let feedback = '';
      let evaluatorConfidence = 1.0;
      let errorTaxonomy = 'NONE';

      if (q.questionType === 'MCQ' || q.questionType === 'TRUE_FALSE') {
        if (studentAns && String(studentAns).trim() === String(q.correctKey).trim()) {
          isCorrect = true;
          scoreEarned = q.maxMarks;
          feedback = 'Correct! Exactly matches official answer key.';
          errorTaxonomy = 'NONE';
        } else {
          isCorrect = false;
          scoreEarned = 0;
          feedback = `Incorrect. Official answer: ${q.correctKey}.`;
          errorTaxonomy = studentAns ? 'CONCEPTUAL_MISUNDERSTANDING' : 'FACTUAL_KNOWLEDGE_GAP';
        }
      } else if (q.questionType === 'NUMERICAL') {
        const numVal = parseFloat(studentAns);
        const correctNum = parseFloat(q.correctKey);
        const minTol = q.toleranceMin !== null ? q.toleranceMin : correctNum - 0.1;
        const maxTol = q.toleranceMax !== null ? q.toleranceMax : correctNum + 0.1;

        if (!isNaN(numVal) && numVal >= minTol && numVal <= maxTol) {
          isCorrect = true;
          scoreEarned = q.maxMarks;
          feedback = `Correct numerical calculation (${numVal}).`;
          errorTaxonomy = 'NONE';
        } else {
          isCorrect = false;
          scoreEarned = 0;
          feedback = `Numerical result outside tolerance. Expected: ${q.correctKey} (Range: [${minTol}, ${maxTol}]). Submitted: ${studentAns || 'None'}.`;
          errorTaxonomy = !isNaN(numVal) ? 'CALCULATION_ERROR' : 'FORMULA_SELECTION_ERROR';
        }
      } else if (q.questionType === 'MULTI_SELECT') {
        try {
          const correctArr: string[] = JSON.parse(q.correctKey);
          const studentArr: string[] = Array.isArray(studentAns) ? studentAns : [];

          const matched = studentArr.filter((item) => correctArr.includes(item)).length;
          const incorrect = studentArr.filter((item) => !correctArr.includes(item)).length;

          if (matched === correctArr.length && incorrect === 0) {
            isCorrect = true;
            scoreEarned = q.maxMarks;
            feedback = 'All correct options selected!';
            errorTaxonomy = 'NONE';
          } else if (matched > 0 && incorrect === 0) {
            isCorrect = null; // partial
            scoreEarned = parseFloat(((matched / correctArr.length) * q.maxMarks).toFixed(1));
            feedback = `Partially correct (${matched}/${correctArr.length} correct options).`;
            errorTaxonomy = 'INCOMPLETE_ANSWER';
          } else {
            isCorrect = false;
            scoreEarned = 0;
            feedback = 'Incorrect combination of options.';
            errorTaxonomy = 'CONCEPTUAL_MISUNDERSTANDING';
          }
        } catch {
          isCorrect = false;
          scoreEarned = 0;
          errorTaxonomy = 'CONCEPTUAL_MISUNDERSTANDING';
        }
      } else {
        // CONCEPTUAL_SHORT / Subjective Rubric Evaluation
        const evalResult = AIProvider.evaluateSubjectiveAnswer(
          q.questionText,
          String(studentAns || ''),
          q.rubricJson,
          q.correctKey,
          q.maxMarks
        );
        scoreEarned = evalResult.score;
        feedback = evalResult.feedback;
        evaluatorConfidence = evalResult.confidence;
        errorTaxonomy = evalResult.errorTaxonomy;
        isCorrect = scoreEarned >= q.maxMarks * 0.7;
      }

      totalScore += scoreEarned;

      // RECORD GRANULAR ATTEMPT HISTORY & UPDATE ADAPTIVE PROFILE (Requirements A, B, C)
      const recordResult = await AdaptiveEngine.recordAttemptAndUpdateProfile({
        userId: user.id,
        topicId: q.topicId,
        attemptId: attempt.id,
        questionId: q.id,
        scoreEarned,
        maxScore: q.maxMarks,
        difficulty: q.difficulty as any,
        questionType: q.questionType,
        durationSeconds: Math.round(durationSeconds / test.questions.length),
        studentAnswer: studentAns,
        isCorrect,
        evaluatorFeedback: feedback,
        evaluatorConfidence,
        errorTaxonomy,
      });

      evaluatedQuestions.push({
        questionId: q.id,
        scoreEarned,
        maxScore: q.maxMarks,
        isCorrect,
        feedback,
        errorTaxonomy,
        priorMastery: recordResult.savedResponse.priorConceptScore,
        newMastery: recordResult.newMastery,
        newRetention: recordResult.newRetention,
      });
    }

    const percentage = maxScore > 0 ? parseFloat(((totalScore / maxScore) * 100).toFixed(1)) : 0;

    // Update Attempt Final Score
    await prisma.testAttempt.update({
      where: { id: attempt.id },
      data: {
        totalScore,
        maxScore,
        percentage,
        submittedAt: new Date(),
        masteryImpactSummaryJson: JSON.stringify(evaluatedQuestions),
      },
    });

    // Refresh Actionable Recommendations for Subject
    await AdaptiveEngine.refreshStudentRecommendations(user.id, test.subjectId);

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      totalScore,
      maxScore,
      percentage,
      evaluatedQuestions,
    });
  } catch (error: any) {
    console.error('Test submission API error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
