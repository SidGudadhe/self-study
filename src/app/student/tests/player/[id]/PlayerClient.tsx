'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';

interface QuestionItem {
  id: string;
  topicId: string;
  questionText: string;
  questionType: string;
  difficulty: string;
  maxMarks: number;
  optionsJson?: string | null;
  sourceReference?: string | null;
  topic: {
    title: string;
    unit: {
      unitNumber: number;
      title: string;
    };
  };
}

interface TestData {
  id: string;
  title: string;
  timeLimitMinutes: number;
  totalMarks: number;
  subject: {
    code: string;
    name: string;
  };
  questions: QuestionItem[];
}

export default function PlayerClient({ test }: { test: TestData }) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({
    [test.questions[0]?.id]: true,
  });
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(test.timeLimitMinutes * 60);
  const [submitting, setSubmitting] = useState(false);

  const currentQ = test.questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
    const qId = test.questions[index]?.id;
    if (qId) {
      setVisited((prev) => ({ ...prev, [qId]: true }));
    }
  };

  const handleSaveAndNext = () => {
    if (currentIndex < test.questions.length - 1) {
      handleSelectQuestion(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleSelectQuestion(currentIndex - 1);
    }
  };

  const handleClearResponse = () => {
    if (!currentQ) return;
    setResponses((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    if (!currentQ) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
    handleSaveAndNext();
  };

  const handleSubmitExam = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const durationSeconds = test.timeLimitMinutes * 60 - timeLeft;
      const res = await fetch('/api/tests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: test.id,
          responses,
          durationSeconds: Math.max(1, durationSeconds),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit test');

      router.push(`/student/tests/review/${data.attemptId}`);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Error submitting test. Please try again.');
      setSubmitting(false);
    }
  };

  // Determine state of question for palette
  const getQuestionPaletteState = (qId: string) => {
    const isAnswered = responses[qId] !== undefined && responses[qId] !== '';
    const isMarked = markedForReview[qId];
    const isVis = visited[qId];

    if (isAnswered && isMarked) return 'ANSWERED_MARKED'; // Purple with green dot
    if (isMarked) return 'MARKED'; // Purple
    if (isAnswered) return 'ANSWERED'; // Green
    if (isVis) return 'NOT_ANSWERED'; // Red
    return 'NOT_VISITED'; // Slate
  };

  let parsedOptions: string[] = [];
  if (currentQ?.optionsJson) {
    try {
      parsedOptions = JSON.parse(currentQ.optionsJson);
    } catch {}
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-slate-950">
      {/* Exam Header */}
      <header className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between z-10 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              {test.subject.code}
            </span>
            <h1 className="text-sm font-bold text-white">{test.title}</h1>
          </div>
          <p className="text-[11px] text-slate-400">
            Total Marks: {test.totalMarks} • {test.questions.length} Questions
          </p>
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-sm font-bold text-indigo-400">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            onClick={handleSubmitExam}
            disabled={submitting}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {submitting ? 'Evaluating Answers...' : 'Submit Test'}
          </button>
        </div>
      </header>

      {/* Main Examination Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Active Question Screen */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto p-8 custom-scrollbar">
          {currentQ ? (
            <div className="max-w-3xl space-y-6">
              {/* Question Metadata */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-400">
                    Question {currentIndex + 1} of {test.questions.length}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {currentQ.questionType}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {currentQ.difficulty}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  +{currentQ.maxMarks} Marks
                </span>
              </div>

              {/* Syllabus Context */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  Unit {currentQ.topic.unit.unitNumber}: {currentQ.topic.unit.title}
                </span>{' '}
                • <span>Topic: {currentQ.topic.title}</span>
              </div>

              {/* Question Text */}
              <div className="text-base text-slate-100 font-medium leading-relaxed">
                {currentQ.questionText}
              </div>

              {/* Response Controls based on QuestionType */}
              <div className="pt-4 space-y-3">
                {currentQ.questionType === 'MCQ' || currentQ.questionType === 'TRUE_FALSE' ? (
                  <div className="space-y-2">
                    {parsedOptions.map((opt, oIdx) => {
                      const isSelected = responses[currentQ.id] === opt;
                      return (
                        <button
                          type="button"
                          key={oIdx}
                          onClick={() => setResponses((prev) => ({ ...prev, [currentQ.id]: opt }))}
                          className={`w-full p-4 rounded-xl text-left text-sm transition-all border flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-indigo-400 bg-indigo-500'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : currentQ.questionType === 'MULTI_SELECT' ? (
                  <div className="space-y-2">
                    <p className="text-xs text-indigo-400 font-medium italic">
                      * Select all options that apply:
                    </p>
                    {parsedOptions.map((opt, oIdx) => {
                      const selectedList: string[] = Array.isArray(responses[currentQ.id])
                        ? responses[currentQ.id]
                        : [];
                      const isChecked = selectedList.includes(opt);
                      const toggleCheck = () => {
                        const updated = isChecked
                          ? selectedList.filter((item) => item !== opt)
                          : [...selectedList, opt];
                        setResponses((prev) => ({ ...prev, [currentQ.id]: updated }));
                      };
                      return (
                        <button
                          type="button"
                          key={oIdx}
                          onClick={toggleCheck}
                          className={`w-full p-4 rounded-xl text-left text-sm transition-all border flex items-center justify-between ${
                            isChecked
                              ? 'bg-indigo-600/20 border-indigo-500 text-white'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <span>{opt}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                          />
                        </button>
                      );
                    })}
                  </div>
                ) : currentQ.questionType === 'NUMERICAL' ? (
                  <div className="space-y-2">
                    <label className="block text-xs text-slate-400">
                      Enter your calculated numerical value:
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={responses[currentQ.id] || ''}
                      onChange={(e) =>
                        setResponses((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                      }
                      placeholder="e.g. 42.5"
                      className="w-full max-w-xs bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ) : (
                  // CONCEPTUAL_SHORT / Subjective
                  <div className="space-y-2">
                    <label className="block text-xs text-slate-400">
                      Type your conceptual explanation / derivation response:
                    </label>
                    <textarea
                      rows={5}
                      value={responses[currentQ.id] || ''}
                      onChange={(e) =>
                        setResponses((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                      }
                      placeholder="Write your explanation here. The AI rubric evaluator will grade conceptual understanding and theorem application..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No question available.</p>
          )}

          {/* Bottom Action Ribbon */}
          <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>
              <button
                type="button"
                onClick={handleClearResponse}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMarkReview}
                className="px-4 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Flag className="w-3.5 h-3.5" /> Mark for Review & Next
              </button>
              <button
                type="button"
                onClick={handleSaveAndNext}
                disabled={currentIndex === test.questions.length - 1}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-indigo-600/20 disabled:opacity-40 flex items-center gap-1.5"
              >
                Save & Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: 5-State Question Palette */}
        <aside className="w-72 bg-slate-900 border-l border-slate-800 p-5 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Question Palette
            </h2>

            {/* 5-State Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-rose-600 inline-block" />
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-purple-600 inline-block" />
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-800 border border-slate-700 inline-block" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-4 gap-2">
              {test.questions.map((q, idx) => {
                const state = getQuestionPaletteState(q.id);
                const isCurrent = idx === currentIndex;

                let colorClasses = 'bg-slate-800 text-slate-400 border-slate-700';
                if (state === 'ANSWERED') {
                  colorClasses = 'bg-emerald-600 text-white border-emerald-500';
                } else if (state === 'NOT_ANSWERED') {
                  colorClasses = 'bg-rose-600 text-white border-rose-500';
                } else if (state === 'MARKED') {
                  colorClasses = 'bg-purple-600 text-white border-purple-500';
                } else if (state === 'ANSWERED_MARKED') {
                  colorClasses = 'bg-purple-700 text-white border-emerald-400 ring-2 ring-emerald-400';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(idx)}
                    className={`h-10 rounded-lg font-mono text-xs font-bold transition-all border flex items-center justify-center relative ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-indigo-400 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Answered:</span>
              <span className="font-bold text-emerald-400">
                {Object.keys(responses).length} / {test.questions.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Marked for Review:</span>
              <span className="font-bold text-purple-400">
                {Object.values(markedForReview).filter(Boolean).length}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
