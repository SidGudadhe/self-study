import React from 'react';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import {
  TrendingUp,
  Brain,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  BarChart3,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const user = await getAuthenticatedUserOrDemo();

  // Fetch topic masteries with unit & subject
  const masteries = await prisma.topicMastery.findMany({
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
    orderBy: { currentMastery: 'desc' },
  });

  // Fetch granular question response history (User Requirement A)
  const questionResponses = await prisma.questionResponse.findMany({
    where: { userId: user.id },
    include: {
      question: true,
      topic: {
        include: { unit: true },
      },
      attempt: {
        include: { test: true },
      },
    },
    orderBy: { timestamp: 'desc' },
    take: 15,
  });

  const assessedTopics = masteries.filter((m) => m.totalAttempts > 0);
  const masteredCount = assessedTopics.filter((m) => m.currentMastery >= 75).length;
  const weakCount = assessedTopics.filter((m) => m.currentMastery < 50).length;

  // Aggregate Error Taxonomy from all question responses
  const errorCounts: Record<string, number> = {};
  for (const resp of questionResponses) {
    if (resp.errorTaxonomy && resp.errorTaxonomy !== 'NONE') {
      errorCounts[resp.errorTaxonomy] = (errorCounts[resp.errorTaxonomy] || 0) + 1;
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-400" /> Student Performance & Adaptive Analytics
        </h1>
        <p className="text-sm text-slate-400">
          Calibrated learning signals tracking three independent dimensions: Current Mastery, Retention Decay, and Evidence Confidence.
        </p>
      </div>

      {/* 3 Core Dimensions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dimension 1: Current Mastery */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              1. Current Mastery (M)
            </span>
            <Brain className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Measures how well you can solve questions right now, calibrated by question difficulty (Easy: 0.85x, Medium: 1.0x, Hard: 1.2x).
          </p>
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{masteredCount}</span>
            <span className="text-xs text-slate-400">of {assessedTopics.length} topics mastered (≥ 75%)</span>
          </div>
        </div>

        {/* Dimension 2: Retention Decay */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              2. Retention Decay (R)
            </span>
            <Clock className="w-5 h-5 text-rose-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tracks Ebbinghaus forgetting curve over elapsed days. Memory strength factor expands with spaced repetition retrieval.
          </p>
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400">
              {assessedTopics.filter((m) => m.currentMastery >= 60 && m.retentionScore < 60).length}
            </span>
            <span className="text-xs text-slate-400">topics needing spaced recall practice</span>
          </div>
        </div>

        {/* Dimension 3: Evidence Confidence */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              3. Evidence Confidence (C)
            </span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Prevents false mastery from a single lucky answer. Saturates exponentially with sample size and distinct question type variety.
          </p>
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">
              {assessedTopics.filter((m) => m.evidenceConfidence >= 60).length}
            </span>
            <span className="text-xs text-slate-400">topics with robust diagnostic evidence</span>
          </div>
        </div>
      </div>

      {/* Error Taxonomy Analysis (User Requirement A & Section 6.4) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> Identified Error Patterns (Diagnostic Taxonomy)
        </h2>
        {Object.keys(errorCounts).length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            {Object.entries(errorCounts).map(([errType, count]) => (
              <div key={errType} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  {errType.replace(/_/g, ' ')}
                </span>
                <p className="text-xl font-extrabold text-white">{count} occurrences</p>
                <p className="text-[10px] text-slate-400">Targeted for remediation review</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            No recurring conceptual errors detected yet. Complete tests to populate taxonomy diagnostics.
          </p>
        )}
      </div>

      {/* Granular Historical Response Record Table (User Requirement A) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Granular Question Attempt History
          </h2>
          <span className="text-xs text-slate-400">Showing last {questionResponses.length} answers</span>
        </div>

        {questionResponses.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Topic / Subject</th>
                  <th className="p-3">Question</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3">Prior Concept Score</th>
                  <th className="p-3">Error Classification</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {questionResponses.map((resp) => (
                  <tr key={resp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-medium text-slate-200">
                      <span className="font-semibold text-indigo-400 block truncate max-w-[180px]">
                        {resp.topic.title}
                      </span>
                      <span className="text-[10px] text-slate-400">Unit {resp.topic.unit.unitNumber}</span>
                    </td>
                    <td className="p-3 max-w-xs truncate text-slate-300">
                      {resp.question.questionText}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[10px]">
                        {resp.question.difficulty}
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className={resp.marksAwarded > 0 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                        {resp.marksAwarded} / {resp.question.maxMarks}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">
                      {resp.priorConceptScore !== null ? `${resp.priorConceptScore}%` : 'N/A'}
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        resp.errorTaxonomy === 'NONE'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {resp.errorTaxonomy}
                      </span>
                    </td>
                    <td className="p-3 text-[10px] text-slate-400 whitespace-nowrap">
                      {new Date(resp.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400">No question attempts logged yet.</p>
        )}
      </div>

      {/* Topic Mastery & Retention Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Topic Mastery Breakdown</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Subject & Unit</th>
                <th className="p-3">Topic Title</th>
                <th className="p-3">Current Mastery (M)</th>
                <th className="p-3">Retention Decay (R)</th>
                <th className="p-3">Evidence Confidence</th>
                <th className="p-3">Total Attempts</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {assessedTopics.map((m) => {
                const statusLabel =
                  m.currentMastery >= 75
                    ? 'Mastered'
                    : m.currentMastery >= 50
                    ? 'Developing'
                    : 'Needs Review';
                const statusColor =
                  m.currentMastery >= 75
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : m.currentMastery >= 50
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-amber-400 bg-amber-500/10';

                return (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3">
                      <span className="font-mono text-indigo-400 block font-semibold">
                        {m.topic.unit.subject.code}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Unit {m.topic.unit.unitNumber}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-white max-w-xs truncate">
                      {m.topic.title}
                    </td>
                    <td className="p-3 font-mono font-bold text-indigo-400">
                      {m.currentMastery}%
                    </td>
                    <td className="p-3 font-mono font-bold text-rose-400">
                      {m.retentionScore}%
                    </td>
                    <td className="p-3 font-mono text-slate-300">
                      {m.evidenceConfidence}%
                    </td>
                    <td className="p-3 font-mono">
                      {m.correctAttempts} / {m.totalAttempts}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/student/tests/new?subjectId=${m.topic.unit.subjectId}&topicId=${m.topicId}`}
                        className="text-indigo-400 hover:underline font-semibold"
                      >
                        Practice →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
