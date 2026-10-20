'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  BookmarkCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Zap,
  Brain,
  Search,
  Filter,
  FileText,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Flashcard {
  front: string;
  back: string;
}

interface RevisionNoteItem {
  id: string;
  topicId: string;
  title: string;
  overview: string | null;
  keyDefinitions: string | null;
  formulas: string | null;
  processes: string | null;
  commonMistakes: string | null;
  quickSummary: string | null;
  flashcardsJson: string | null;
  updatedAt: string | Date;
  topic: {
    id: string;
    title: string;
    unit: {
      unitNumber: number;
      title: string;
      subjectId: string;
      subject: {
        id: string;
        code: string;
        name: string;
      };
    };
  };
}

interface ScheduleItem {
  id: string;
  topicId: string;
  dueDate: string | Date;
  repetitionNumber: number;
  intervalDays: number;
  topic: {
    id: string;
    title: string;
    unit: {
      unitNumber: number;
      title: string;
      subjectId: string;
      subject: {
        id: string;
        code: string;
        name: string;
      };
    };
    masteryRecords: Array<{
      currentMastery: number;
      retentionScore: number;
    }>;
  };
}

interface SubjectSimple {
  id: string;
  code: string;
  name: string;
}

interface Props {
  initialTab?: string;
  filterTopicId?: string;
  schedules: ScheduleItem[];
  notes: RevisionNoteItem[];
  subjects: SubjectSimple[];
}

export default function RevisionHubClient({
  initialTab = 'retention',
  filterTopicId = '',
  schedules,
  notes,
  subjects,
}: Props) {
  const [activeTab, setActiveTab] = useState<'retention' | 'notes'>(
    initialTab === 'notes' ? 'notes' : 'retention'
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(
    notes.length > 0 ? notes[0].id : null
  );

  const now = new Date();

  // Metrics
  const dueNow = schedules.filter((s) => new Date(s.dueDate) <= now);
  const dueSoon = schedules.filter((s) => {
    const d = new Date(s.dueDate);
    return d > now && d <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  });
  const scheduledFuture = schedules.filter(
    (s) => new Date(s.dueDate) > new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
  );

  // Filtered Notes
  const filteredNotes = notes.filter((n) => {
    if (filterTopicId && n.topicId !== filterTopicId) return false;
    if (selectedSubjectId !== 'ALL' && n.topic.unit.subject.id !== selectedSubjectId) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchTopic = n.topic.title.toLowerCase().includes(q);
      const matchSubj = n.topic.unit.subject.name.toLowerCase().includes(q);
      if (!matchTitle && !matchTopic && !matchSubj) return false;
    }
    return true;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Unified Spaced Retrieval & AI Knowledge Hub
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-indigo-400" /> Revision & Notes Hub
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Consolidated workspace combining calibrated Ebbinghaus spaced retention schedules with your 12-section AI lecture notes and active recall flashcards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/student/teacher"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all"
            >
              <Brain className="w-4 h-4" /> AI Teacher
            </Link>
            <Link
              href="/student/tests/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
            >
              <Zap className="w-4 h-4 text-indigo-400" /> Adaptive Test
            </Link>
          </div>
        </div>

        {/* Unified Tab Switcher (No Duplicate Pages) */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('retention')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'retention'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Spaced Retention Schedules</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                activeTab === 'retention' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {dueNow.length > 0 ? `${dueNow.length} Due` : schedules.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'notes'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Revision Notes & Flashcards</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                activeTab === 'notes' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {notes.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: SPACED RETENTION SCHEDULES */}
      {activeTab === 'retention' && (
        <div className="space-y-6">
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Due for Recall Today
              </span>
              <p className="text-3xl font-extrabold text-white">{dueNow.length}</p>
              <p className="text-[11px] text-slate-400">Memory retention decay threshold reached</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Due Within 3 Days
              </span>
              <p className="text-3xl font-extrabold text-amber-400">{dueSoon.length}</p>
              <p className="text-[11px] text-slate-400">Scheduled for memory consolidation</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Long-Term Stable
              </span>
              <p className="text-3xl font-extrabold text-emerald-400">{scheduledFuture.length}</p>
              <p className="text-[11px] text-slate-400">Intervals expanded up to 14+ days</p>
            </div>
          </div>

          {/* Retention Re-testing Schedule Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-indigo-400" /> Retention Re-testing Schedule
              </h2>
              <span className="text-xs text-slate-400">Calibrated by SuperMemo SM-2 & Ebbinghaus formula</span>
            </div>

            {schedules.length > 0 ? (
              <div className="divide-y divide-slate-800 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
                {schedules.map((sched) => {
                  const isOverdue = new Date(sched.dueDate) <= now;
                  const mastery = sched.topic.masteryRecords[0];

                  return (
                    <div
                      key={sched.id}
                      className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="space-y-1.5">
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
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                          <span>
                            Current Mastery:{' '}
                            <strong className="text-indigo-400">
                              {mastery?.currentMastery || 0}%
                            </strong>
                          </span>
                          <span>•</span>
                          <span>
                            Retention Score:{' '}
                            <strong className="text-rose-400">
                              {mastery?.retentionScore || 0}%
                            </strong>
                          </span>
                          <span>•</span>
                          <span>Repetition #{sched.repetitionNumber}</span>
                          <span>•</span>
                          <span>Interval: {sched.intervalDays} days</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
                        <Link
                          href={`/student/teacher?subjectId=${sched.topic.unit.subjectId}&topicId=${sched.topicId}&mode=QUICK_REVISION`}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                        >
                          <Brain className="w-3.5 h-3.5" /> 3-Min Recap
                        </Link>
                        <Link
                          href={`/student/tests/new?subjectId=${sched.topic.unit.subjectId}&topicId=${sched.topicId}`}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" /> Test Retention
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <RotateCcw className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No Spaced Reviews Scheduled Yet</p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Take a test or practice questions on any topic. The adaptive engine will automatically calibrate your memory retention decay and schedule reviews!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: REVISION NOTES & FLASHCARDS */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes or formulas..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full md:w-auto bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} - {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes List */}
          {filteredNotes.length > 0 ? (
            <div className="space-y-6">
              {filteredNotes.map((note) => {
                let flashcards: Flashcard[] = [];
                if (note.flashcardsJson) {
                  try {
                    flashcards = JSON.parse(note.flashcardsJson);
                  } catch {}
                }
                const isExpanded = expandedNoteId === note.id;

                return (
                  <div
                    key={note.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-xl transition-all"
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
                        <button
                          onClick={() => setExpandedNoteId(isExpanded ? null : note.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
                        >
                          {isExpanded ? (
                            <>
                              <span>Collapse</span> <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Full Note</span> <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                        <Link
                          href={`/student/teacher?subjectId=${note.topic.unit.subjectId}&topicId=${note.topicId}`}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/20 text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <Brain className="w-3.5 h-3.5" /> Revisit Lesson
                        </Link>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {isExpanded && (
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
                    )}

                    {/* Interactive Flashcards */}
                    {flashcards.length > 0 && (
                      <div className="pt-2 space-y-3">
                        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Active Recall Flashcards ({flashcards.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {flashcards.map((fc, fIdx) => (
                            <div
                              key={fIdx}
                              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs hover:border-indigo-500/40 transition-colors"
                            >
                              <span className="text-[10px] font-bold text-indigo-400 font-mono block">
                                Q: {fc.front}
                              </span>
                              <p className="text-slate-300 border-t border-slate-800 pt-2 text-[11px]">
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
      )}
    </div>
  );
}
