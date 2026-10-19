import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  Brain,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RevisionPlannerPage() {
  const user = await getAuthenticatedUserOrDemo();
  const now = new Date();

  // Fetch spaced review schedules
  const schedules = await prisma.spacedReviewSchedule.findMany({
    where: { userId: user.id },
    include: {
      topic: {
        include: {
          unit: {
            include: { subject: true },
          },
          masteryRecords: {
            where: { userId: user.id },
          },
        },
      },
    },
    orderBy: { dueDate: 'asc' },
  });

  const dueNow = schedules.filter((s) => s.dueDate <= now);
  const dueSoon = schedules.filter(
    (s) => s.dueDate > now && s.dueDate <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
  );
  const scheduledFuture = schedules.filter(
    (s) => s.dueDate > new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> SuperMemo SM-2 & Ebbinghaus Spaced Retrieval
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-indigo-400" /> Spaced Revision Planner
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Prevents forgetting by scheduling deliberate retrieval tests at calibrated intervals (1d, 3d, 7d, 16d). Distinguishes short-term test scores from durable long-term retention.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Due for Recall Today
          </span>
          <p className="text-3xl font-extrabold text-white">{dueNow.length}</p>
          <p className="text-[11px] text-slate-400">Memory retention decay threshold reached</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Due Within 3 Days
          </span>
          <p className="text-3xl font-extrabold text-amber-400">{dueSoon.length}</p>
          <p className="text-[11px] text-slate-400">Scheduled for memory consolidation</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Long-Term Stable
          </span>
          <p className="text-3xl font-extrabold text-emerald-400">{scheduledFuture.length}</p>
          <p className="text-[11px] text-slate-400">Intervals expanded up to 14+ days</p>
        </div>
      </div>

      {/* Topics Due for Immediate Re-testing (User Requirement C) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-indigo-400" /> Retention Re-testing Schedule
          </h2>
          <span className="text-xs text-slate-400">Sorted by memory urgency</span>
        </div>

        {schedules.length > 0 ? (
          <div className="divide-y divide-slate-800 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            {schedules.slice(0, 15).map((sched) => {
              const isOverdue = sched.dueDate <= now;
              const mastery = sched.topic.masteryRecords[0];

              return (
                <div
                  key={sched.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {sched.topic.unit.subject.code}
                      </span>
                      <span className="text-xs text-slate-400">
                        Unit {sched.topic.unit.unitNumber}: {sched.topic.unit.title}
                      </span>
                      {isOverdue && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Recall Due Now
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{sched.topic.title}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Current Mastery: <strong className="text-indigo-400">{mastery?.currentMastery || 0}%</strong></span>
                      <span>•</span>
                      <span>Retention Score: <strong className="text-rose-400">{mastery?.retentionScore || 0}%</strong></span>
                      <span>•</span>
                      <span>Repetition #{sched.repetitionNumber}</span>
                      <span>•</span>
                      <span>Interval: {sched.intervalDays} days</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <Link
                      href={`/student/teacher?subjectId=${sched.topic.unit.subjectId}&topicId=${sched.topicId}&mode=QUICK_REVISION`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1"
                    >
                      <Brain className="w-3.5 h-3.5" /> 3-Min Recap
                    </Link>
                    <Link
                      href={`/student/tests/new?subjectId=${sched.topic.unit.subjectId}&topicId=${sched.topicId}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" /> Test Retention
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No scheduled reviews yet.</p>
        )}
      </div>
    </div>
  );
}
