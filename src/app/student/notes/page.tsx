import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { BookmarkCheck, FileText, Sparkles, Brain, Download, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SavedNotesPage() {
  const user = await getAuthenticatedUserOrDemo();

  const notes = await prisma.revisionNote.findMany({
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
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-indigo-400" /> Saved AI Revision Notes & Flashcards
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Structured 12-section notes generated directly from syllabus learning objectives and lecture notes.
          </p>
        </div>
        <Link
          href="/student/teacher"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all"
        >
          <Brain className="w-4 h-4" /> Open AI Teacher to Generate
        </Link>
      </div>

      {/* Notes Grid */}
      {notes.length > 0 ? (
        <div className="space-y-6">
          {notes.map((note) => {
            let flashcards = [];
            if (note.flashcardsJson) {
              try {
                flashcards = JSON.parse(note.flashcardsJson);
              } catch {}
            }

            return (
              <div
                key={note.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl"
              >
                {/* Note Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {note.topic.unit.subject.code}
                      </span>
                      <span className="text-xs text-slate-400">
                        Unit {note.topic.unit.unitNumber}: {note.topic.unit.title}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">{note.title}</h2>
                    <p className="text-xs text-slate-400">{note.overview}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/student/teacher?subjectId=${note.topic.unit.subjectId}&topicId=${note.topicId}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/20 text-xs font-semibold transition-all flex items-center gap-1"
                    >
                      <Brain className="w-3.5 h-3.5" /> Revisit Lesson
                    </Link>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Key Definitions */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h3 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                      📖 Key Definitions & Concepts
                    </h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {note.keyDefinitions}
                    </p>
                  </div>

                  {/* Formulas & KaTeX Equations */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h3 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                      📐 Key Formulas & Equations
                    </h3>
                    <p className="text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                      {note.formulas}
                    </p>
                  </div>

                  {/* Step-by-Step Processes */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h3 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                      ⚙️ Step-by-Step Analytical Process
                    </h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {note.processes}
                    </p>
                  </div>

                  {/* Common Misconceptions */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h3 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                      ⚠️ Common Pitfalls & Exam Mistakes
                    </h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {note.commonMistakes}
                    </p>
                  </div>
                </div>

                {/* Interactive Flashcards */}
                {flashcards.length > 0 && (
                  <div className="pt-2 space-y-3">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Active Recall Flashcards ({flashcards.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {flashcards.map((fc: any, fIdx: number) => (
                        <div
                          key={fIdx}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs hover:border-indigo-500/40 transition-colors"
                        >
                          <span className="text-[10px] font-bold text-indigo-400 font-mono">
                            Q: {fc.front}
                          </span>
                          <p className="text-slate-300 border-t border-slate-800 pt-1.5 text-[11px]">
                            <strong className="text-slate-400">A:</strong> {fc.back}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Summary Banner */}
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-200">
                  <span className="font-bold">⚡ Quick Summary:</span> {note.quickSummary}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h2 className="text-base font-bold text-slate-200">No Saved Revision Notes Yet</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Open the AI Teacher for any DBATU syllabus topic and click &quot;Generate Revision Notes&quot; to synthesize structured 12-section notes and flashcards!
          </p>
          <Link
            href="/student/teacher"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20"
          >
            <Brain className="w-4 h-4" /> Go to AI Teacher
          </Link>
        </div>
      )}
    </div>
  );
}
