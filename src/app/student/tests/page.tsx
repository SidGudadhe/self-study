import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { GraduationCap, Zap, Clock, CheckCircle2, Award, ArrowRight, Play } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TestSeriesPage() {
  const user = await getAuthenticatedUserOrDemo();

  const [tests, attempts] = await Promise.all([
    prisma.test.findMany({
      where: { userId: user.id },
      include: {
        subject: true,
        attempts: {
          orderBy: { startedAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.testAttempt.findMany({
      where: { userId: user.id },
      include: {
        test: {
          include: { subject: true },
        },
      },
      orderBy: { startedAt: 'desc' },
    }),
  ]);

  const totalAttempts = attempts.length;
  const avgPercentage =
    totalAttempts > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts)
      : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" /> Test Series & Assessment Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Adaptive, diagnostic, and unit tests designed to measure conceptual mastery and Ebbinghaus retention.
          </p>
        </div>
        <Link
          href="/student/tests/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <Zap className="w-4 h-4" /> Create Adaptive Test
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Total Tests Attempted</span>
          <p className="text-2xl font-bold text-white">{totalAttempts}</p>
        </div>
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Average Score</span>
          <p className="text-2xl font-bold text-indigo-400">{avgPercentage}%</p>
        </div>
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Adaptive Blueprint Distribution</span>
          <p className="text-xs text-emerald-400 font-semibold pt-1">
            50% Weak • 25% Retention • 25% Breadth
          </p>
        </div>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Available & Historical Tests</h2>

        {tests.length > 0 ? (
          <div className="divide-y divide-slate-800 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            {tests.map((test) => {
              const lastAttempt = test.attempts[0];
              return (
                <div
                  key={test.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {test.subject.code}
                      </span>
                      <span className="text-xs text-slate-400">{test.subject.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {test.scopeType}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{test.title}</h3>
                    <p className="text-xs text-slate-400">
                      {test.totalQuestions} Questions • {test.totalMarks} Marks • {test.timeLimitMinutes} Mins
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {lastAttempt ? (
                      <div className="text-right mr-2">
                        <span className="text-xs font-bold text-indigo-400 block">
                          Last: {lastAttempt.percentage}%
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {lastAttempt.totalScore} / {lastAttempt.maxScore} marks
                        </span>
                      </div>
                    ) : null}

                    {lastAttempt ? (
                      <Link
                        href={`/student/tests/review/${lastAttempt.id}`}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        View Review
                      </Link>
                    ) : null}

                    <Link
                      href={`/student/tests/player/${test.id}`}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" /> Start Test
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No tests available. Click above to create your first test!</p>
        )}
      </div>
    </div>
  );
}
