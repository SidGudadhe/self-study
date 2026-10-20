import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import {
  BookOpen,
  Brain,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HelpCircle,
  FileText,
  FileCheck,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SubjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getAuthenticatedUserOrDemo();

  const subject = await prisma.subject.findUnique({
    where: { id: params.id },
    include: {
      textbooks: true,
      units: {
        orderBy: { unitNumber: 'asc' },
        include: {
          topics: {
            orderBy: { orderIndex: 'asc' },
            include: {
              subtopics: true,
              objectives: true,
              masteryRecords: {
                where: { userId: user.id },
              },
              spacedSchedules: {
                where: { userId: user.id },
              },
            },
          },
        },
      },
    },
  });

  if (!subject) return notFound();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Back button & Title */}
      <div className="space-y-4">
        <Link
          href="/student/subjects"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Subjects
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {subject.code}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {subject.category} • {subject.credits} Credits
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-medium">
                {subject.semester === 'I' ? 'Semester I' : 'Semester II'} ({subject.group})
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{subject.name}</h1>
            <p className="text-xs text-slate-400">
              Teaching Scheme: <span className="text-slate-300">{subject.teachingScheme}</span> | Evaluation: <span className="text-slate-300">{subject.evaluationScheme}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/student/teacher?subjectId=${subject.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30"
            >
              <Brain className="w-4 h-4" /> Open Subject AI Teacher
            </Link>
            <Link
              href={`/student/tests/new?subjectId=${subject.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-all"
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" /> Create Test
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Textbooks */}
      {subject.textbooks.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" /> Prescribed University Textbooks & References
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {subject.textbooks.map((tb) => (
              <div key={tb.id} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 text-xs">
                <p className="font-semibold text-slate-200">{tb.title}</p>
                <p className="text-slate-400 text-[11px]">{tb.author} {tb.publisher ? `• ${tb.publisher}` : ''}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Units & Topics Hierarchy */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Curriculum Units & Topics</h2>

        <div className="space-y-4">
          {subject.units.map((unit) => (
            <div
              key={unit.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
            >
              {/* Unit Header */}
              <div className="p-5 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Unit {unit.unitNumber}
                  </span>
                  <h3 className="text-base font-bold text-white">{unit.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  {unit.hours && (
                    <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded font-mono">
                      {unit.hours}
                    </span>
                  )}
                  <Link
                    href={`/student/tests/new?subjectId=${subject.id}&unitId=${unit.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all border border-indigo-500/30"
                  >
                    Test Unit
                  </Link>
                </div>
              </div>

              {/* Topics List */}
              <div className="divide-y divide-slate-800/60 p-2">
                {unit.topics.map((topic) => {
                  const mastery = topic.masteryRecords[0];
                  const currentM = mastery ? mastery.currentMastery : 0;
                  const confidence = mastery ? mastery.evidenceConfidence : 0;
                  const attempts = mastery ? mastery.totalAttempts : 0;

                  return (
                    <div
                      key={topic.id}
                      className="p-4 hover:bg-slate-800/20 rounded-xl transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-100">
                            {topic.title}
                          </span>
                          {topic.status !== 'compulsory' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                              {topic.status}
                            </span>
                          )}
                        </div>

                        {/* Subtopics */}
                        {topic.subtopics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {topic.subtopics.map((st) => (
                              <span
                                key={st.id}
                                className="text-[11px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
                              >
                                {st.title}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Learning Objectives */}
                        {topic.objectives.length > 0 && (
                          <p className="text-[11px] text-slate-400 italic">
                            🎯 Objective: {topic.objectives[0].description} ({topic.objectives[0].bloomLevel})
                          </p>
                        )}
                      </div>

                      {/* Mastery Indicator & Action Buttons */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="text-xs text-slate-400">Mastery:</span>
                            <span
                              className={`text-sm font-bold ${
                                currentM >= 75
                                  ? 'text-emerald-400'
                                  : currentM >= 50
                                  ? 'text-indigo-400'
                                  : currentM > 0
                                  ? 'text-amber-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              {currentM}%
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400">
                            {attempts > 0 ? `${attempts} attempts • Conf: ${confidence}%` : 'Not assessed yet'}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/student/teacher?subjectId=${subject.id}&topicId=${topic.id}&mode=DETAILED`}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1"
                            title="Start AI Teacher Lesson"
                          >
                            <Brain className="w-3.5 h-3.5" /> Learn
                          </Link>
                          <Link
                            href={`/student/tests/new?subjectId=${subject.id}&topicId=${topic.id}`}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
                            title="Take Practice Test"
                          >
                            Test
                          </Link>
                          <Link
                            href={`/student/revision?topicId=${topic.id}&tab=notes`}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all"
                            title="View Revision Notes & Flashcards"
                          >
                            <FileText className="w-4 h-4 text-indigo-400" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
