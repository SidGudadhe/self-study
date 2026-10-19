import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  Sparkles,
  Calendar,
  Flame,
  Target,
  Zap,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getAuthenticatedUserOrDemo();

  // 1. Fetch Summary Counts
  const [totalSubjects, totalUnits, totalTopics] = await Promise.all([
    prisma.subject.count(),
    prisma.unit.count(),
    prisma.topic.count(),
  ]);

  // 2. Fetch User Topic Mastery Data
  const masteryRecords = await prisma.topicMastery.findMany({
    where: { userId: user.id },
    include: {
      topic: {
        include: {
          unit: {
            include: { subject: true },
          },
        },
      },
    },
  });

  const topicsAssessed = masteryRecords.filter((m) => m.totalAttempts > 0).length;
  const topicsMastered = masteryRecords.filter((m) => m.currentMastery >= 75).length;
  const topicsNeedingAttention = masteryRecords.filter((m) => m.totalAttempts > 0 && m.currentMastery < 60).length;

  // 3. Retention Warnings (Decayed Memory)
  const now = new Date();
  const retentionAlerts = masteryRecords
    .filter((m) => m.currentMastery >= 60 && m.retentionScore < 60)
    .slice(0, 3);

  // 4. Upcoming Spaced Reviews Due
  const upcomingReviews = await prisma.spacedReviewSchedule.findMany({
    where: {
      userId: user.id,
      dueDate: { lte: new Date(now.getTime() + 48 * 60 * 60 * 1000) },
    },
    include: {
      topic: {
        include: {
          unit: {
            include: { subject: true },
          },
        },
      },
    },
    orderBy: { dueDate: 'asc' },
    take: 4,
  });

  // 5. Recent Test Attempts
  const recentAttempts = await prisma.testAttempt.findMany({
    where: { userId: user.id },
    include: {
      test: {
        include: { subject: true },
      },
    },
    orderBy: { startedAt: 'desc' },
    take: 4,
  });

  // 6. Actionable Recommendations
  const recommendations = await prisma.studentRecommendation.findMany({
    where: { userId: user.id, isResolved: false },
    include: {
      subject: true,
      topic: true,
    },
    orderBy: { priorityScore: 'desc' },
    take: 3,
  });

  // Calculate overall syllabus coverage
  const coveragePercent = totalTopics > 0 ? Math.round((topicsAssessed / totalTopics) * 100) : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-indigo-950 border border-indigo-500/20 p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> DBATU First Year Engineering NEP 2024-25
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-indigo-400">{user.name}</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Your self-study engine is actively monitoring your topic mastery, tracking Ebbinghaus retention decay, and calibrating your next practice session.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/student/tests/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              <Zap className="w-4 h-4" /> Start Adaptive Test
            </Link>
            <Link
              href="/student/teacher"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-all"
            >
              <Brain className="w-4 h-4 text-indigo-400" /> AI Teacher
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Topics & Coverage */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Syllabus Assessed</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{topicsAssessed}</span>
            <span className="text-xs text-slate-400">/ {totalTopics} topics</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${coveragePercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">{coveragePercent}% complete across 12 subjects</p>
        </div>

        {/* Mastered Topics */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Demonstrated Mastery</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">{topicsMastered}</span>
            <span className="text-xs text-slate-400">topics (≥ 75%)</span>
          </div>
          <p className="text-[11px] text-slate-400">Multi-attempt verified knowledge</p>
        </div>

        {/* Topics Needing Attention */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Weakness Hotspots</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">{topicsNeedingAttention}</span>
            <span className="text-xs text-slate-400">topics (&lt; 60%)</span>
          </div>
          <p className="text-[11px] text-slate-400">Targeted for remediation questions</p>
        </div>

        {/* Retention Decay Alert */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Retention Watchlist</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-400">{retentionAlerts.length}</span>
            <span className="text-xs text-slate-400">topics decaying</span>
          </div>
          <p className="text-[11px] text-slate-400">Recall likelihood dropped below 60%</p>
        </div>
      </div>

      {/* Main Grid: Priority Recommendations & Spaced Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Actionable Recommendations (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-indigo-400" /> Recommended Study Steps
            </h2>
            <Link
              href="/student/analytics"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              View Full Analytics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                        {rec.subject.code}
                      </span>
                      <span className="text-xs text-slate-400">{rec.subject.name}</span>
                    </div>
                    <h3 className="font-semibold text-slate-100 text-sm group-hover:text-indigo-400 transition-colors">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      💡 {rec.reasonExplanation}
                    </p>
                  </div>
                  <Link
                    href={rec.actionUrl}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all"
                  >
                    Act Now
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="font-semibold text-sm text-slate-200">No Pending Urgent Interventions</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Take an adaptive diagnostic test to map your baseline across First-Year engineering subjects!
              </p>
              <Link
                href="/student/tests/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Configure Diagnostic Test
              </Link>
            </div>
          )}

          {/* Recent Test History */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" /> Recent Test Assessments
            </h2>
            {recentAttempts.length > 0 ? (
              <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
                {recentAttempts.map((attempt) => (
                  <div key={attempt.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{attempt.test.title}</p>
                      <p className="text-xs text-slate-400">
                        {attempt.test.subject.name} • {new Date(attempt.startedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-indigo-400">{attempt.percentage}%</p>
                        <p className="text-[10px] text-slate-400">{attempt.totalScore} / {attempt.maxScore} marks</p>
                      </div>
                      <Link
                        href={`/student/tests/review/${attempt.id}`}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No test attempts completed yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Spaced Review Schedule & Fast Navigation */}
        <div className="space-y-6">
          {/* Spaced Repetition Due Widget */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" /> Spaced Reviews Due
              </h3>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                SuperMemo SM-2
              </span>
            </div>

            {upcomingReviews.length > 0 ? (
              <div className="space-y-3">
                {upcomingReviews.map((rev) => (
                  <div key={rev.id} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-indigo-300">
                        {rev.topic.unit.subject.code}
                      </span>
                      <span className="text-[10px] text-amber-400">
                        Interval: {rev.intervalDays}d
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-200 line-clamp-1">{rev.topic.title}</p>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-slate-400">Repetition #{rev.repetitionNumber}</span>
                      <Link
                        href={`/student/teacher?subjectId=${rev.topic.unit.subjectId}&topicId=${rev.topicId}&mode=QUICK_REVISION`}
                        className="text-[10px] text-indigo-400 hover:underline font-semibold"
                      >
                        Quick Review →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No reviews due today. You are fully up to date!</p>
            )}

            <Link
              href="/student/revision"
              className="block w-full py-2 text-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg border border-indigo-500/20 transition-all"
            >
              Open Spaced Revision Planner
            </Link>
          </div>

          {/* Quick Subject Access */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Semester I Timetable Subjects
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/student/subjects/subj-24AF1000BS101"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[EM-I] Engg. Mathematics - I</span>
                <span className="text-slate-400 font-mono">3 Cr</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF2PHYBS202"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[PHY] Engg. Physics</span>
                <span className="text-slate-400 font-mono">3 Cr</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF2EGRES204"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[EG] Engg. Graphics</span>
                <span className="text-slate-400 font-mono">2 Cr</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF1000ES206"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[BEE] Basic Electrical & Electronics</span>
                <span className="text-slate-400 font-mono">3 Cr</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF2CMEES208"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[BCME] Basic Civil & Mechanical</span>
                <span className="text-slate-400 font-mono">3 Cr</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF1EEEES209"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[EEE] Energy & Environmental Engg.</span>
                <span className="text-slate-400 font-mono">Audit</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF1000VS211"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[DT] Design Thinking</span>
                <span className="text-slate-400 font-mono">2 Cr</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF1000IK210"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[IKS] Indian Knowledge System</span>
                <span className="text-slate-400 font-mono">2 Cr</span>
              </Link>
              <Link
                href="/student/subjects/subj-24AF1000CC212A"
                className="flex items-center justify-between p-2 rounded hover:bg-slate-800/60 text-slate-300 transition-colors"
              >
                <span>[CC-IPD] Integrated Personality Dev.</span>
                <span className="text-slate-400 font-mono">2 Cr</span>
              </Link>
              <Link
                href="/student/subjects"
                className="block text-center text-xs text-indigo-400 pt-2 hover:underline"
              >
                View full Semester I curriculum →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
