'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  Zap,
  Sliders,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface SubjectWithUnits {
  id: string;
  code: string;
  name: string;
  credits: number;
  units: Array<{
    id: string;
    unitNumber: number;
    title: string;
    topics: Array<{
      id: string;
      title: string;
    }>;
  }>;
}

export default function NewTestClient({
  subjects,
  initialSubjectId,
  initialTopicId,
  initialUnitId,
}: {
  subjects: SubjectWithUnits[];
  initialSubjectId?: string;
  initialTopicId?: string;
  initialUnitId?: string;
}) {
  const router = useRouter();

  const [subjectId, setSubjectId] = useState<string>(
    initialSubjectId || (subjects[0]?.id || '')
  );
  const [scopeType, setScopeType] = useState<string>(
    initialTopicId ? 'TOPIC' : initialUnitId ? 'UNIT' : 'FULL_SUBJECT'
  );
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId || '');
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(
    initialTopicId ? [initialTopicId] : []
  );
  const [difficulty, setDifficulty] = useState<string>('MEDIUM');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(20);
  const [generating, setGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentSubject = subjects.find((s) => s.id === subjectId);
  const allUnits = currentSubject?.units || [];
  const allTopics = allUnits.flatMap((u) => u.topics.map((t) => ({ ...t, unitNumber: u.unitNumber })));

  const handleToggleTopic = (tId: string) => {
    setSelectedTopicIds((prev) =>
      prev.includes(tId) ? prev.filter((id) => id !== tId) : [...prev, tId]
    );
  };

  const handleGenerateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/tests/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          scopeType,
          topicIds: selectedTopicIds,
          unitId: selectedUnitId,
          difficulty,
          questionCount,
          timeLimitMinutes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate test');
      }

      router.push(`/student/tests/player/${data.testId}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating test');
      setGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> 12-Step Validated Adaptive Generator
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Configure Test Series Assessment</h1>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          Create syllabus-aligned tests for a single topic, a unit, or an entire DBATU engineering subject. The adaptive engine dynamically allocates 50% weak, 25% retention decay, and 25% broad syllabus questions.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleGenerateTest} className="space-y-6">
        {/* Step 1: Subject Selection */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            1. Target DBATU Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value);
              setSelectedUnitId('');
              setSelectedTopicIds([]);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name} ({s.credits} Credits • {s.units.length} Units)
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Scope Type */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            2. Assessment Scope
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'FULL_SUBJECT', label: 'Full Subject', desc: 'Sample all 5 units' },
              { id: 'UNIT', label: 'Single Unit', desc: 'Test specific unit' },
              { id: 'TOPIC', label: 'Custom Topics', desc: 'Select specific topics' },
              { id: 'ADAPTIVE_WEAKNESS', label: 'Adaptive Weakness', desc: 'Auto-target weak topics' },
            ].map((scope) => (
              <button
                type="button"
                key={scope.id}
                onClick={() => setScopeType(scope.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  scopeType === scope.id
                    ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="text-xs font-bold text-slate-100">{scope.label}</p>
                <p className="text-[11px] text-slate-400 mt-1">{scope.desc}</p>
              </button>
            ))}
          </div>

          {/* Unit selector if scope is UNIT */}
          {scopeType === 'UNIT' && (
            <div className="pt-2">
              <label className="block text-[11px] text-slate-400 mb-1.5 font-medium">Select Unit:</label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                <option value="">-- Choose Unit --</option>
                {allUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.title} ({u.topics.length} topics)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Topic multi-select if scope is TOPIC */}
          {scopeType === 'TOPIC' && (
            <div className="pt-2 space-y-2">
              <label className="block text-[11px] text-slate-400 font-medium">
                Choose Specific Topics ({selectedTopicIds.length} selected):
              </label>
              <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800">
                {allTopics.map((t) => {
                  const isChecked = selectedTopicIds.includes(t.id);
                  return (
                    <label
                      key={t.id}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-900 cursor-pointer text-xs text-slate-300"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleTopic(t.id)}
                        className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                      />
                      <span>
                        <span className="text-indigo-400 font-medium font-mono text-[10px]">
                          [U{t.unitNumber}]
                        </span>{' '}
                        {t.title}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Test Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Difficulty */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 outline-none"
            >
              <option value="FOUNDATION">Foundation (Easy - 0.85x weight)</option>
              <option value="MEDIUM">Medium Standard (1.0x weight)</option>
              <option value="ADVANCED">Advanced Challenge (1.2x weight)</option>
              <option value="MIXED_ADAPTIVE">Mixed Adaptive Calibration</option>
            </select>
          </div>

          {/* Questions Count */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Question Count
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 outline-none"
            >
              <option value={5}>5 Questions (Quick Check)</option>
              <option value={10}>10 Questions (Standard Quiz)</option>
              <option value={15}>15 Questions (Unit Test)</option>
              <option value={20}>20 Questions (Comprehensive Exam)</option>
            </select>
          </div>

          {/* Time Limit */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Time Limit
            </label>
            <select
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 outline-none"
            >
              <option value={10}>10 Minutes</option>
              <option value={20}>20 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
            </select>
          </div>
        </div>

        {/* Proposed Topic Distribution Preview (Section 9 Requirement) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" /> Proposed Topic Distribution Blueprint
            </span>
            <span className="text-[11px] text-indigo-400 font-mono">
              Total: {questionCount} Qs • {questionCount * 4} Marks
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-indigo-400 font-bold text-base">
                {Math.max(1, Math.round(questionCount * 0.5))} Qs (50%)
              </span>
              <span className="text-[10px] text-slate-400">Weakness & Low Mastery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-amber-400 font-bold text-base">
                {Math.max(1, Math.round(questionCount * 0.25))} Qs (25%)
              </span>
              <span className="text-[10px] text-slate-400">Retention Decay & Diagnostic</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-emerald-400 font-bold text-base">
                {Math.max(1, questionCount - Math.round(questionCount * 0.5) - Math.round(questionCount * 0.25))} Qs (25%)
              </span>
              <span className="text-[10px] text-slate-400">Broad Syllabus Coverage</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={generating}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Validating & Assembling Test...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" /> Generate Adaptive Test & Start Exam
            </>
          )}
        </button>
      </form>
    </div>
  );
}
