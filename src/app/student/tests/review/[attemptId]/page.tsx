import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
  Brain,
  FileText,
  TrendingUp,
  Award,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TestReviewPage({
  params,
}: {
  params: { attemptId: string };
}) {
  const attempt = await prisma.testAttempt.findUnique({
    where: { id: params.attemptId },
    include: {
      test: {
        include: {
          subject: true,
          questions: {
            include: {
              topic: {
                include: {
                  unit: true,
                },
              },
            },
          },
        },
      },
      responses: true,
    },
  });

  if (!attempt) return notFound();

  // Create lookup for responses by questionId
  const responseMap = new Map();
  for (const resp of attempt.responses) {
    responseMap.set(resp.questionId, resp);
  }

  const isPassed = attempt.percentage >= 50;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <Link
        href="/student/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
      </Link>

      {/* Result Score Banner */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              {attempt.test.subject.code}
            </span>
            <span className="text-xs text-slate-400">{attempt.test.subject.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{attempt.test.title}</h1>
          <p className="text-xs text-slate-400">
            Completed in {Math.round(attempt.durationSeconds / 60)} minutes • Submitted {new Date(attempt.submittedAt || attempt.startedAt).toLocaleTimeString()}
          </p>
        </div>

        <div className="flex items-center gap-6 self-start md:self-auto border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div className="text-right">
            <p className="text-xs text-slate-400">Total Score</p>
            <p className="text-3xl font-extrabold text-indigo-400">
              {attempt.totalScore} <span className="text-sm font-normal text-slate-400">/ {attempt.maxScore}</span>
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-xl border text-center font-bold text-sm ${
              isPassed
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}
          >
            {attempt.percentage}%
            <span className="block text-[10px] font-normal">
              {isPassed ? 'Satisfactory' : 'Needs Practice'}
            </span>
          </div>
        </div>
      </div>

      {/* Granular Questions Breakdown (User Requirement A & Section 8) */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-400" /> Question-by-Question Diagnostic Evaluation
        </h2>

        <div className="space-y-6">
          {attempt.test.questions.map((q, idx) => {
            const resp = responseMap.get(q.id);
            const isCorrect = resp ? resp.isCorrect : false;
            const marksAwarded = resp ? resp.marksAwarded : 0;
            const errorType = resp ? resp.errorTaxonomy : 'NOT_ATTEMPTED';
            const priorScore = resp?.priorConceptScore ?? 0;

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-lg"
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-400 text-sm">Question {idx + 1}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {q.questionType}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Error Taxonomy Badge (User Requirement A) */}
                    {errorType && errorType !== 'NONE' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        ⚠️ {errorType.replace(/_/g, ' ')}
                      </span>
                    )}
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isCorrect
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {marksAwarded} / {q.maxMarks} Marks
                    </span>
                  </div>
                </div>

                {/* Question Syllabus Mapping */}
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">
                    Unit {q.topic.unit.unitNumber}: {q.topic.unit.title}
                  </span>{' '}
                  • <span>Topic: {q.topic.title}</span>
                </div>

                {/* Question Body */}
                <p className="text-sm text-slate-100 font-medium leading-relaxed">
                  {q.questionText}
                </p>

                {/* Student's Answer vs Official Key */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-semibold block">Your Submitted Response:</span>
                    <p className="text-slate-200 font-mono">
                      {resp?.studentAnswer ? String(resp.studentAnswer) : 'No response provided.'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-semibold block">Official Answer Key / Rubric:</span>
                    <p className="text-emerald-400 font-mono">
                      {q.correctKey}
                    </p>
                  </div>
                </div>

                {/* Explanation & Evaluator Feedback */}
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-300">💡 Step-by-Step Pedagogical Explanation:</span>
                    <span className="text-[10px] text-slate-400">Source: {q.sourceReference}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                  {resp?.evaluatorFeedback && (
                    <p className="text-indigo-400 italic pt-1 border-t border-indigo-500/20">
                      Evaluator Remark: {resp.evaluatorFeedback}
                    </p>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <div className="text-[11px] text-slate-400">
                    Prior concept baseline: <span className="font-mono text-slate-300">{priorScore}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/student/teacher?subjectId=${attempt.test.subjectId}&topicId=${q.topicId}&mode=DETAILED`}
                      className="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1"
                    >
                      <Brain className="w-3.5 h-3.5" /> Re-learn Topic
                    </Link>
                    <Link
                      href={`/student/tests/new?subjectId=${attempt.test.subjectId}&topicId=${q.topicId}`}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all text-xs font-medium border border-slate-700"
                    >
                      Practice Again
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
