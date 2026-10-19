import { prisma } from '../prisma';

export interface MasteryUpdateParams {
  userId: string;
  topicId: string;
  attemptId: string;
  questionId: string;
  scoreEarned: number;
  maxScore: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  questionType: string;
  durationSeconds: number;
  studentAnswer: string;
  isCorrect: boolean | null;
  evaluatorFeedback?: string;
  evaluatorConfidence?: number;
  errorTaxonomy?: string;
}

export interface TopicPriorityResult {
  topicId: string;
  topicTitle: string;
  unitNumber: number;
  currentMastery: number;
  retentionScore: number;
  evidenceConfidence: number;
  priorityScore: number;
  selectionGroup: 'WEAK_DEFICIT' | 'RETENTION_UNCERTAINTY' | 'SYLLABUS_BREADTH';
  recommendedReason: string;
}

export class AdaptiveEngine {
  // -------------------------------------------------------------
  // 1. Difficulty Weighting Curve
  // -------------------------------------------------------------
  static getDifficultyWeight(difficulty: string): number {
    switch (difficulty.toUpperCase()) {
      case 'EASY':
        return 0.85; // limits trivial high-score inflation
      case 'MEDIUM':
        return 1.00;
      case 'HARD':
        return 1.20; // rewards higher cognitive mastery
      default:
        return 1.00;
    }
  }

  // -------------------------------------------------------------
  // 2. Calibrated Mastery Update (Bayesian / Recency Smoothing)
  // -------------------------------------------------------------
  static calculateNewMastery(
    previousMastery: number,
    questionAccuracy: number, // 0 to 1
    difficulty: string,
    totalAttemptsSoFar: number
  ): number {
    const diffWeight = this.getDifficultyWeight(difficulty);
    // Raw normalized performance score (0 to 100)
    const rawScore = Math.min(100, questionAccuracy * diffWeight * 100);

    // Dynamic smoothing parameter alpha:
    // With 0-2 prior attempts, reacts quickly (alpha ~ 0.5 - 0.7)
    // With >8 prior attempts, stabilizes (alpha ~ 0.85)
    const alpha = Math.min(0.85, Math.max(0.40, 0.40 + totalAttemptsSoFar * 0.05));

    const updated = alpha * previousMastery + (1 - alpha) * rawScore;
    return parseFloat(Math.min(100, Math.max(0, updated)).toFixed(1));
  }

  // -------------------------------------------------------------
  // 3. Ebbinghaus Spaced Retention Decay
  // R = M * exp(- deltaT / S)
  // -------------------------------------------------------------
  static calculateRetention(
    currentMastery: number,
    lastAssessedAt: Date | null,
    repetitionCount: number,
    easeFactor: number = 2.5
  ): number {
    if (!lastAssessedAt || currentMastery <= 0) return 0.0;

    const now = new Date().getTime();
    const elapsedDays = Math.max(0, (now - lastAssessedAt.getTime()) / (1000 * 60 * 60 * 24));

    // Memory Strength factor S (in days)
    // S increases with successful spaced repetitions: S = S0 * (1 + 1.6 * repetitions)
    const baseMemoryDays = 3.0;
    const memoryStrength = baseMemoryDays * Math.pow(easeFactor / 2.5, 0.5) * (1 + 1.6 * repetitionCount);

    const retentionRatio = Math.exp(-elapsedDays / memoryStrength);
    const retentionScore = currentMastery * retentionRatio;

    return parseFloat(Math.min(100, Math.max(0, retentionScore)).toFixed(1));
  }

  // -------------------------------------------------------------
  // 4. Evidence Confidence Estimator
  // -------------------------------------------------------------
  static calculateEvidenceConfidence(
    totalAttempts: number,
    distinctQuestionTypes: number = 1
  ): number {
    if (totalAttempts <= 0) return 0.0;

    // Sample volume saturation curve: 1 - exp(-N / 4)
    // N=1 -> 22%, N=2 -> 39%, N=4 -> 63%, N=8 -> 86%
    const volumeTerm = (1 - Math.exp(-totalAttempts / 4.0)) * 70;

    // Question type diversity bonus (up to 30%)
    const diversityTerm = Math.min(1.0, distinctQuestionTypes / 3.0) * 30;

    const confidence = volumeTerm + diversityTerm;
    return parseFloat(Math.min(100, Math.max(0, confidence)).toFixed(1));
  }

  // -------------------------------------------------------------
  // 5. Error Taxonomy Classifier
  // -------------------------------------------------------------
  static classifyError(
    isCorrect: boolean | null,
    scoreFraction: number,
    durationSeconds: number,
    questionType: string,
    priorMastery: number
  ): string {
    if (isCorrect === true || scoreFraction >= 0.95) {
      return 'NONE';
    }

    // Fast response (< 15s) with high prior mastery suggests careless slip
    if (durationSeconds < 15 && priorMastery >= 75) {
      return 'CARELESS_MISTAKE';
    }

    if (questionType === 'NUMERICAL') {
      if (scoreFraction > 0.4 && scoreFraction < 0.9) {
        return 'CALCULATION_ERROR';
      }
      return 'FORMULA_SELECTION_ERROR';
    }

    if (questionType === 'CONCEPTUAL_SHORT' || questionType === 'APPLICATION_LONG') {
      if (scoreFraction >= 0.4 && scoreFraction <= 0.75) {
        return 'INCOMPLETE_ANSWER';
      }
      return 'CONCEPTUAL_MISUNDERSTANDING';
    }

    if (questionType === 'MCQ' || questionType === 'TRUE_FALSE') {
      if (durationSeconds > 60) {
        return 'CONCEPTUAL_MISUNDERSTANDING';
      }
      return 'FACTUAL_KNOWLEDGE_GAP';
    }

    return 'INSUFFICIENT_EVIDENCE';
  }

  // -------------------------------------------------------------
  // 6. Granular Historical Record & Learning Profile Update
  // (Addresses User Requirement A: Persists Every Single Answer)
  // -------------------------------------------------------------
  static async recordAttemptAndUpdateProfile(params: MasteryUpdateParams) {
    const {
      userId,
      topicId,
      attemptId,
      questionId,
      scoreEarned,
      maxScore,
      difficulty,
      questionType,
      durationSeconds,
      studentAnswer,
      isCorrect,
      evaluatorFeedback,
      evaluatorConfidence = 1.0,
    } = params;

    // 1. Fetch current mastery record
    let masteryRecord = await prisma.topicMastery.findUnique({
      where: { userId_topicId: { userId, topicId } },
    });

    if (!masteryRecord) {
      masteryRecord = await prisma.topicMastery.create({
        data: {
          userId,
          topicId,
          currentMastery: 0.0,
          retentionScore: 0.0,
          evidenceConfidence: 0.0,
          totalAttempts: 0,
          correctAttempts: 0,
          recentAccuracy: 0.0,
          consecutiveCorrect: 0,
          primaryErrorCategory: 'NONE',
          errorDistributionJson: JSON.stringify({}),
        },
      });
    }

    const priorConceptScore = masteryRecord.currentMastery;
    const scoreFraction = maxScore > 0 ? Math.max(0, Math.min(1, scoreEarned / maxScore)) : 0;
    const determinedCorrect = isCorrect !== null ? isCorrect : scoreFraction >= 0.7;

    // 2. Classify error taxonomy
    const errorTaxonomy =
      params.errorTaxonomy ||
      this.classifyError(
        determinedCorrect,
        scoreFraction,
        durationSeconds,
        questionType,
        priorConceptScore
      );

    // 3. PERSIST GRANULAR ANSWER RECORD (Requirement A)
    const savedResponse = await prisma.questionResponse.create({
      data: {
        attemptId,
        questionId,
        userId,
        topicId,
        studentAnswer: typeof studentAnswer === 'object' ? JSON.stringify(studentAnswer) : String(studentAnswer || ''),
        isCorrect: determinedCorrect,
        marksAwarded: scoreEarned,
        marksDeducted: Math.max(0, maxScore - scoreEarned),
        durationSeconds,
        errorTaxonomy,
        evaluatorFeedback: evaluatorFeedback || (determinedCorrect ? 'Correct conceptual execution.' : 'Needs revision on underlying principles.'),
        evaluatorConfidence,
        priorConceptScore,
      },
    });

    // 4. Update Spaced Review Schedule (SuperMemo SM-2 adaptation)
    let reviewSchedule = await prisma.spacedReviewSchedule.findUnique({
      where: { userId_topicId: { userId, topicId } },
    });

    let repetition = reviewSchedule ? reviewSchedule.repetitionNumber : 0;
    let easeFactor = reviewSchedule ? reviewSchedule.easeFactor : 2.5;
    let intervalDays = reviewSchedule ? reviewSchedule.intervalDays : 1.0;

    if (determinedCorrect) {
      repetition += 1;
      if (repetition === 1) intervalDays = 1.0;
      else if (repetition === 2) intervalDays = 3.0;
      else intervalDays = parseFloat((intervalDays * easeFactor).toFixed(1));
    } else {
      repetition = 0;
      intervalDays = 1.0;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    }

    const nextDueDate = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);

    await prisma.spacedReviewSchedule.upsert({
      where: { userId_topicId: { userId, topicId } },
      update: {
        intervalDays,
        repetitionNumber: repetition,
        easeFactor,
        dueDate: nextDueDate,
        lastReviewDate: new Date(),
        lastScore: scoreFraction * 100,
        status: 'PENDING',
      },
      create: {
        userId,
        topicId,
        intervalDays,
        repetitionNumber: repetition,
        easeFactor,
        dueDate: nextDueDate,
        lastReviewDate: new Date(),
        lastScore: scoreFraction * 100,
        status: 'PENDING',
      },
    });

    // 5. Calculate new Mastery, Retention, and Confidence
    const newMastery = this.calculateNewMastery(
      masteryRecord.currentMastery,
      scoreFraction,
      difficulty,
      masteryRecord.totalAttempts
    );

    const newRetention = this.calculateRetention(
      newMastery,
      new Date(),
      repetition,
      easeFactor
    );

    // Query distinct question types attempted for diversity
    const distinctTypes = await prisma.questionResponse.findMany({
      where: { userId, topicId },
      select: { question: { select: { questionType: true } } },
      distinct: ['questionId'],
    });

    const newConfidence = this.calculateEvidenceConfidence(
      masteryRecord.totalAttempts + 1,
      distinctTypes.length
    );

    // Parse & update error distribution
    let errorDist: Record<string, number> = {};
    try {
      errorDist = JSON.parse(masteryRecord.errorDistributionJson || '{}');
    } catch {}
    if (errorTaxonomy && errorTaxonomy !== 'NONE') {
      errorDist[errorTaxonomy] = (errorDist[errorTaxonomy] || 0) + 1;
    }

    // Determine primary recurring error
    let primaryError = masteryRecord.primaryErrorCategory;
    let maxErrorCount = 0;
    for (const [errType, count] of Object.entries(errorDist)) {
      if (count > maxErrorCount) {
        maxErrorCount = count;
        primaryError = errType;
      }
    }

    // 6. Update TopicMastery
    const updatedMastery = await prisma.topicMastery.update({
      where: { id: masteryRecord.id },
      data: {
        currentMastery: newMastery,
        retentionScore: newRetention,
        evidenceConfidence: newConfidence,
        totalAttempts: masteryRecord.totalAttempts + 1,
        correctAttempts: masteryRecord.correctAttempts + (determinedCorrect ? 1 : 0),
        recentAccuracy: scoreFraction * 100,
        consecutiveCorrect: determinedCorrect ? masteryRecord.consecutiveCorrect + 1 : 0,
        primaryErrorCategory: primaryError,
        errorDistributionJson: JSON.stringify(errorDist),
        lastAssessedAt: new Date(),
        nextReviewDate: nextDueDate,
      },
    });

    // 7. Record History Snapshot
    await prisma.topicMasteryHistory.create({
      data: {
        topicMasteryId: masteryRecord.id,
        userId,
        topicId,
        attemptId,
        previousMastery: priorConceptScore,
        newMastery,
        previousRetention: masteryRecord.retentionScore,
        newRetention,
        confidence: newConfidence,
        eventReason: 'TEST_COMPLETION',
      },
    });

    return {
      savedResponse,
      updatedMastery,
      newMastery,
      newRetention,
      newConfidence,
      errorTaxonomy,
    };
  }

  // -------------------------------------------------------------
  // 7. Deterministic Topic Prioritization Function
  // Priority = wm*(100-M) + wr*(100-R) + wu*(100-C) + we*ErrorRecurrence + ws*SyllabusImportance
  // -------------------------------------------------------------
  static calculateTopicPriority(
    mastery: number,
    retention: number,
    confidence: number,
    errorCount: number,
    syllabusWeight: number = 1.0
  ): number {
    const wm = 0.35; // Mastery deficit
    const wr = 0.20; // Retention decay
    const wu = 0.20; // Uncertainty / lack of evidence
    const we = 0.15; // Recurring errors
    const ws = 0.10; // Syllabus weight

    const masteryDeficit = Math.max(0, 100 - mastery);
    const retentionDeficit = Math.max(0, 100 - retention);
    const uncertaintyDeficit = Math.max(0, 100 - confidence);
    const errorPenalty = Math.min(100, errorCount * 25);
    const importanceScore = Math.min(100, syllabusWeight * 80);

    const priority =
      wm * masteryDeficit +
      wr * retentionDeficit +
      wu * uncertaintyDeficit +
      we * errorPenalty +
      ws * importanceScore;

    return parseFloat(priority.toFixed(1));
  }

  // -------------------------------------------------------------
  // 8. Adaptive Test Blueprint Generator
  // (Addresses User Requirement B & C: Allocates Questions Intelligently)
  // -------------------------------------------------------------
  static async generateAdaptiveBlueprint(
    userId: string,
    subjectId: string,
    candidateTopicIds: string[],
    totalQuestionsRequested: number = 10
  ) {
    // 1. Fetch topics with their units and current mastery records
    const topics = await prisma.topic.findMany({
      where: {
        id: { in: candidateTopicIds },
      },
      include: {
        unit: true,
        masteryRecords: {
          where: { userId },
        },
        spacedSchedules: {
          where: { userId },
        },
      },
    });

    if (topics.length === 0) {
      throw new Error('No valid topics selected for adaptive blueprint.');
    }

    // 2. Score every candidate topic
    const scoredTopics: TopicPriorityResult[] = topics.map((t) => {
      const masteryRec = t.masteryRecords[0];
      const currentM = masteryRec ? masteryRec.currentMastery : 0;
      const lastAssessed = masteryRec ? masteryRec.lastAssessedAt : null;
      const spaced = t.spacedSchedules[0];
      const repetition = spaced ? spaced.repetitionNumber : 0;
      const ease = spaced ? spaced.easeFactor : 2.5;

      const retention = this.calculateRetention(currentM, lastAssessed, repetition, ease);
      const confidence = masteryRec ? masteryRec.evidenceConfidence : 0;

      let errorCount = 0;
      if (masteryRec && masteryRec.errorDistributionJson) {
        try {
          const dist = JSON.parse(masteryRec.errorDistributionJson);
          errorCount = Object.values(dist).reduce((acc: number, v: any) => acc + (Number(v) || 0), 0);
        } catch {}
      }

      const priority = this.calculateTopicPriority(
        currentM,
        retention,
        confidence,
        errorCount,
        t.importanceWeight
      );

      // Categorize selection reason
      let selectionGroup: 'WEAK_DEFICIT' | 'RETENTION_UNCERTAINTY' | 'SYLLABUS_BREADTH' = 'SYLLABUS_BREADTH';
      let recommendedReason = '';

      if (currentM < 60 && confidence >= 30) {
        selectionGroup = 'WEAK_DEFICIT';
        recommendedReason = `Struggled in recent tests (Mastery: ${currentM}%). Targeted practice needed to clear misconceptions.`;
      } else if (confidence < 40) {
        selectionGroup = 'RETENTION_UNCERTAINTY';
        recommendedReason = `Insufficient assessment evidence (Confidence: ${confidence}%). Diagnostic evaluation needed.`;
      } else if (retention < 65 && currentM >= 60) {
        selectionGroup = 'RETENTION_UNCERTAINTY';
        recommendedReason = `Retention decay detected (${retention}% recall likelihood). Spaced retrieval review needed.`;
      } else {
        selectionGroup = 'SYLLABUS_BREADTH';
        recommendedReason = `Balanced syllabus coverage maintenance.`;
      }

      return {
        topicId: t.id,
        topicTitle: t.title,
        unitNumber: t.unit.unitNumber,
        currentMastery: currentM,
        retentionScore: retention,
        evidenceConfidence: confidence,
        priorityScore: priority,
        selectionGroup,
        recommendedReason,
      };
    });

    // Sort by priority descending
    scoredTopics.sort((a, b) => b.priorityScore - a.priorityScore);

    // 3. Quota allocation (50% Weak, 25% Retention/Uncertainty, 25% Syllabus)
    const weakQuota = Math.max(1, Math.round(totalQuestionsRequested * 0.5));
    const retentionQuota = Math.max(1, Math.round(totalQuestionsRequested * 0.25));
    const breadthQuota = Math.max(1, totalQuestionsRequested - (weakQuota + retentionQuota));

    const weakTopics = scoredTopics.filter((t) => t.selectionGroup === 'WEAK_DEFICIT');
    const retentionTopics = scoredTopics.filter((t) => t.selectionGroup === 'RETENTION_UNCERTAINTY');
    const breadthTopics = scoredTopics.filter((t) => t.selectionGroup === 'SYLLABUS_BREADTH');

    // Build question allocation map { topicId: questionCount }
    const allocationMap = new Map<string, number>();
    const assignQuestions = (topicList: TopicPriorityResult[], quota: number) => {
      if (topicList.length === 0) return quota; // leftover to reallocate
      let remaining = quota;
      let i = 0;
      while (remaining > 0) {
        const t = topicList[i % topicList.length];
        const currentCount = allocationMap.get(t.topicId) || 0;
        // Guardrail: don't exceed max per topic unless total topics is small
        const maxPerTopic = candidateTopicIds.length <= 2 ? totalQuestionsRequested : Math.ceil(totalQuestionsRequested * 0.4);
        if (currentCount < maxPerTopic || topicList.length === 1) {
          allocationMap.set(t.topicId, currentCount + 1);
          remaining--;
        }
        i++;
        if (i > quota * 10) break; // safety break
      }
      return remaining;
    };

    let leftovers = assignQuestions(weakTopics, weakQuota);
    leftovers += assignQuestions(retentionTopics, retentionQuota + leftovers);
    assignQuestions(breadthTopics.length > 0 ? breadthTopics : scoredTopics, breadthQuota + leftovers);

    // Format blueprint summary
    const blueprintItems = scoredTopics
      .filter((t) => allocationMap.has(t.topicId))
      .map((t) => ({
        ...t,
        allocatedQuestions: allocationMap.get(t.topicId) || 0,
      }));

    return {
      totalQuestions: totalQuestionsRequested,
      scoredTopics,
      blueprint: blueprintItems,
      allocationSummary: Object.fromEntries(allocationMap),
      decisionRationale: `Allocated ${weakQuota} questions to weak deficit topics, ${retentionQuota} to spaced retention/uncertainty diagnostics, and ${breadthQuota} to broad syllabus reinforcement.`,
    };
  }

  // -------------------------------------------------------------
  // 9. Generate Actionable Student Recommendations
  // (Addresses Prompt Section 7: Explainable Reasons)
  // -------------------------------------------------------------
  static async refreshStudentRecommendations(userId: string, subjectId: string) {
    const topics = await prisma.topic.findMany({
      where: { unit: { subjectId } },
      include: {
        unit: true,
        masteryRecords: { where: { userId } },
        spacedSchedules: { where: { userId } },
      },
    });

    const recommendations = [];

    for (const t of topics) {
      const mastery = t.masteryRecords[0];
      const currentM = mastery ? mastery.currentMastery : 0;
      const confidence = mastery ? mastery.evidenceConfidence : 0;
      const lastAssessed = mastery ? mastery.lastAssessedAt : null;
      const spaced = t.spacedSchedules[0];
      const repetition = spaced ? spaced.repetitionNumber : 0;
      const retention = this.calculateRetention(currentM, lastAssessed, repetition);

      if (mastery && currentM < 50 && confidence >= 40) {
        recommendations.push({
          userId,
          subjectId,
          topicId: t.id,
          recommendationType: 'REVISE_CONCEPTS',
          title: `Needs Revision: ${t.title}`,
          reasonExplanation: `Your current mastery is ${currentM}% with ${mastery.totalAttempts} questions attempted. Primary error pattern: ${(mastery.primaryErrorCategory || 'NONE').replace(/_/g, ' ')}. Review notes and revisit worked derivations.`,
          priorityScore: 90 - currentM * 0.5,
          actionUrl: `/student/teacher?subjectId=${subjectId}&topicId=${t.id}&mode=DETAILED`,
        });
      } else if (currentM >= 60 && retention < 60) {
        recommendations.push({
          userId,
          subjectId,
          topicId: t.id,
          recommendationType: 'TAKE_RETENTION_TEST',
          title: `Spaced Retention Check: ${t.title}`,
          reasonExplanation: `You previously demonstrated strong knowledge (${currentM}%), but estimated recall has decayed to ${retention}% over time. Take a quick 3-question retention test to lock it in.`,
          priorityScore: 75,
          actionUrl: `/student/tests/new?subjectId=${subjectId}&topicId=${t.id}`,
        });
      } else if (confidence < 30) {
        recommendations.push({
          userId,
          subjectId,
          topicId: t.id,
          recommendationType: 'DIAGNOSTIC_ASSESSMENT',
          title: `Unassessed Topic: ${t.title}`,
          reasonExplanation: `Only ${mastery ? mastery.totalAttempts : 0} questions attempted so far (Evidence confidence: ${confidence}%). Complete an initial diagnostic test to map your baseline understanding.`,
          priorityScore: 60,
          actionUrl: `/student/tests/new?subjectId=${subjectId}&topicId=${t.id}`,
        });
      }
    }

    // Delete existing unresolved recommendations for this subject & insert fresh
    await prisma.studentRecommendation.deleteMany({
      where: { userId, subjectId, isResolved: false },
    });

    if (recommendations.length > 0) {
      await prisma.studentRecommendation.createMany({
        data: recommendations,
      });
    }

    return recommendations;
  }
}
