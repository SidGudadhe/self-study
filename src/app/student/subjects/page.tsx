import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { BookOpen, Brain, GraduationCap, ChevronRight, BookmarkCheck, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SubjectsPage() {
  const user = await getAuthenticatedUserOrDemo();

  const subjects = await prisma.subject.findMany({
    orderBy: { code: 'asc' },
    include: {
      units: {
        include: {
          topics: {
            include: {
              masteryRecords: {
                where: { userId: user.id },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Curriculum Subjects</h1>
          <p className="text-sm text-slate-400 mt-1">
            DBATU B.Tech First Year Engineering Syllabus (NEP 2020 Guidelines, 2024-2025)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/student/syllabus"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Syllabus Manager
          </Link>
          <Link
            href="/student/tests/new"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            Create New Test
          </Link>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subj) => {
          const totalTopics = subj.units.reduce((acc, u) => acc + u.topics.length, 0);
          const assessedTopics = subj.units.reduce(
            (acc, u) =>
              acc + u.topics.filter((t) => t.masteryRecords.length > 0 && t.masteryRecords[0].totalAttempts > 0).length,
            0
          );
          const masteredTopics = subj.units.reduce(
            (acc, u) =>
              acc + u.topics.filter((t) => t.masteryRecords.length > 0 && t.masteryRecords[0].currentMastery >= 75).length,
            0
          );
          const avgMastery =
            assessedTopics > 0
              ? Math.round(
                  subj.units.reduce((acc, u) => {
                    const sum = u.topics.reduce((tSum, t) => tSum + (t.masteryRecords[0]?.currentMastery || 0), 0);
                    return acc + sum;
                  }, 0) / assessedTopics
                )
              : 0;

          return (
            <div
              key={subj.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {subj.code}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                      {subj.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-400 font-semibold text-[11px]">
                      {subj.credits} Cr
                    </span>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/student/subjects/${subj.id}`}
                    className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1"
                  >
                    {subj.name}
                  </Link>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {subj.description || `${subj.units.length} Units • Evaluation: ${subj.evaluationScheme}`}
                  </p>
                </div>

                {/* Progress Stats */}
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Mastery Progress</span>
                    <span className="font-bold text-indigo-400">{avgMastery}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${avgMastery}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                    <span>{assessedTopics} / {totalTopics} assessed</span>
                    <span className="text-emerald-400 font-medium">{masteredTopics} mastered</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                <Link
                  href={`/student/teacher?subjectId=${subj.id}`}
                  className="py-2 px-1 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white font-medium transition-all border border-indigo-500/20 flex items-center justify-center gap-1"
                  title="Open AI Teacher"
                >
                  <Brain className="w-3.5 h-3.5" /> Teach
                </Link>
                <Link
                  href={`/student/tests/new?subjectId=${subj.id}`}
                  className="py-2 px-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-all border border-slate-700 flex items-center justify-center gap-1"
                  title="Generate Test"
                >
                  <GraduationCap className="w-3.5 h-3.5" /> Test
                </Link>
                <Link
                  href={`/student/subjects/${subj.id}`}
                  className="py-2 px-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all border border-slate-700 flex items-center justify-center gap-1"
                  title="View Units & Topics"
                >
                  <span>Topics</span> <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
