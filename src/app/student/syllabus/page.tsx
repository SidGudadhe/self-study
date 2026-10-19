import React from 'react';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { FolderTree, CheckCircle2, Sliders, FileUp, Sparkles, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SyllabusManagerPage() {
  const user = await getAuthenticatedUserOrDemo();

  const subjects = await prisma.subject.findMany({
    include: {
      units: {
        include: {
          topics: {
            include: {
              subtopics: true,
              objectives: true,
            },
          },
        },
      },
    },
    orderBy: { orderIndex: 'asc' },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-indigo-400" /> Syllabus Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review, calibrate importance weights, and organize DBATU First Year Engineering syllabus topics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> 12 Verified DBATU Subjects
          </span>
        </div>
      </div>

      {/* Syllabus Tree Overview */}
      <div className="space-y-6">
        {subjects.map((subj) => (
          <div key={subj.id} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-5 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {subj.code}
                  </span>
                  <span className="text-xs text-slate-400">{subj.category} • {subj.credits} Credits</span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">{subj.name}</h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {subj.units.length} Units
              </span>
            </div>

            <div className="p-5 space-y-4">
              {subj.units.map((unit) => (
                <div key={unit.id} className="rounded-xl bg-slate-950/60 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200">
                      Unit {unit.unitNumber}: {unit.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">{unit.hours || ''}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {unit.topics.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-200">{t.title}</p>
                          {t.subtopics.length > 0 && (
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {t.subtopics.map((s) => s.title).join(' • ')}
                            </p>
                          )}
                          {t.objectives.length > 0 && (
                            <span className="inline-block text-[10px] text-indigo-400 font-mono">
                              {t.objectives[0].code} ({t.objectives[0].bloomLevel})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium capitalize">
                            {t.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
