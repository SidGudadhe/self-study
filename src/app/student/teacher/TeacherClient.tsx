'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Send,
  Sparkles,
  BookOpen,
  FileCheck,
  CheckCircle2,
  BookmarkCheck,
  RotateCcw,
  Zap,
  HelpCircle,
  Award,
} from 'lucide-react';
import Link from 'next/link';

interface SubjectOption {
  id: string;
  code: string;
  name: string;
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

const MODES = [
  { id: 'DETAILED', label: 'Detailed Learning', desc: 'Step-by-step complete lecture' },
  { id: 'SIMPLE', label: 'Simple Explanation', desc: 'Analogies & beginner language' },
  { id: 'DEEP_DIVE', label: 'Deep Dive', desc: 'Advanced proofs & industrial use' },
  { id: 'EXAM_PREP', label: 'Exam Preparation', desc: 'DBATU marks & key pitfalls' },
  { id: 'QUICK_REVISION', label: 'Quick Revision', desc: '3-minute formulas & rules' },
  { id: 'DOUBT_SOLVING', label: 'Doubt Solving', desc: 'Direct answers grounded in notes' },
  { id: 'PRACTICE', label: 'Practice Mode', desc: 'Live questions & instant review' },
];

export default function TeacherClient({
  subjects,
  initialSubjectId,
  initialTopicId,
  initialMode,
}: {
  subjects: SubjectOption[];
  initialSubjectId?: string;
  initialTopicId?: string;
  initialMode?: string;
}) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || (subjects[0]?.id || '')
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || '');
  const [mode, setMode] = useState<string>(initialMode || 'DETAILED');
  const [messages, setMessages] = useState<Array<{ sender: string; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [noteSuccessId, setNoteSuccessId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId);
  const allTopics = currentSubject
    ? currentSubject.units.flatMap((u) => u.topics.map((t) => ({ ...t, unitNumber: u.unitNumber })))
    : [];

  // Auto-select first topic if none selected
  useEffect(() => {
    if (!selectedTopicId && allTopics.length > 0) {
      setSelectedTopicId(allTopics[0].id);
    }
  }, [selectedSubjectId, allTopics]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleStartLesson = async () => {
    if (!selectedSubjectId) return;
    setLoading(true);
    setMessages([]);
    try {
      const res = await fetch('/api/ai/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          topicId: selectedTopicId,
          mode,
          message: '',
        }),
      });
      const data = await res.json();
      if (data.success && data.message) {
        setConversationId(data.conversationId);
        setMessages([{ sender: 'ai', content: data.message.content }]);
      }
    } catch (err) {
      console.error('Failed to load lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  const prevTopicRef = useRef<string>(selectedTopicId);

  // Start initial lesson or switch topic
  useEffect(() => {
    if (selectedSubjectId && selectedTopicId) {
      if (prevTopicRef.current !== selectedTopicId) {
        prevTopicRef.current = selectedTopicId;
        setConversationId(null);
        setMessages([]);
        handleStartLesson();
      } else if (messages.length === 0) {
        handleStartLesson();
      }
    }
  }, [selectedSubjectId, selectedTopicId, mode]);

  const handleQuickQuestion = (questionText: string) => {
    if (loading) return;
    setInputMessage('');
    setMessages((prev) => [...prev, { sender: 'user', content: questionText }]);
    setLoading(true);

    fetch('/api/ai/teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subjectId: selectedSubjectId,
        topicId: selectedTopicId,
        mode,
        message: questionText,
        conversationId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.message) {
          setMessages((prev) => [...prev, { sender: 'ai', content: data.message.content }]);
        }
      })
      .catch((err) => console.error('Quick question error:', err))
      .finally(() => setLoading(false));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage;
    setInputMessage('');
    setMessages((prev) => [...prev, { sender: 'user', content: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          topicId: selectedTopicId,
          mode,
          message: userText,
          conversationId,
        }),
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, { sender: 'ai', content: data.message.content }]);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNotes = async () => {
    if (!selectedTopicId || generatingNotes) return;
    setGeneratingNotes(true);
    setNoteSuccessId(null);
    try {
      const res = await fetch('/api/ai/notes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: selectedTopicId }),
      });
      const data = await res.json();
      if (data.success) {
        setNoteSuccessId(data.noteId);
      }
    } catch (err) {
      console.error('Failed to generate notes:', err);
    } finally {
      setGeneratingNotes(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-slate-950">
      {/* Top Bar Controls */}
      <header className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white flex items-center gap-2">
              DBATU AI Personal Teacher
            </h1>
            <p className="text-[11px] text-slate-400">
              Syllabus-aware RAG tutoring with 7 pedagogical modes
            </p>
          </div>
        </div>

        {/* Subject & Topic Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setSelectedTopicId('');
            }}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-indigo-500 outline-none"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>

          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:ring-1 focus:ring-indigo-500 outline-none max-w-xs truncate"
          >
            {allTopics.map((t) => (
              <option key={t.id} value={t.id}>
                Unit {t.unitNumber}: {t.title}
              </option>
            ))}
          </select>

          {/* Generate 12-Section Notes */}
          <button
            onClick={handleGenerateNotes}
            disabled={generatingNotes || !selectedTopicId}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" />
            {generatingNotes ? 'Generating Notes...' : 'Generate Revision Notes'}
          </button>

          {noteSuccessId && (
            <Link
              href={`/student/revision?tab=notes`}
              className="text-xs text-emerald-400 font-semibold hover:underline flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> View in Revision Hub
            </Link>
          )}
        </div>
      </header>

      {/* Modes Navigation Ribbon */}
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/40 flex items-center gap-2 overflow-x-auto custom-scrollbar flex-shrink-0">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0 mr-1">
          Pedagogical Mode:
        </span>
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
              mode === m.id
                ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={m.desc}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 max-w-4xl mx-auto ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                <Brain className="w-4 h-4" />
              </div>
            )}

            <div
              className={`rounded-2xl p-5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white font-medium max-w-lg shadow-lg'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-xl max-w-3xl whitespace-pre-line'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-4xl mx-auto items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              Synthesizing syllabus lesson and retrieving grounded notes...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Doubt & Simplification Chips */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/60 flex items-center gap-2 overflow-x-auto custom-scrollbar flex-shrink-0">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0 mr-1">
          Quick Doubts:
        </span>
        <button
          type="button"
          onClick={() => handleQuickQuestion('Mujhe ye bilkul aasan aur simple bhasha me samjhao')}
          disabled={loading}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/40 transition-all whitespace-nowrap flex items-center gap-1"
        >
          💡 Aasan Bhasha Me Samjhao
        </button>
        <button
          type="button"
          onClick={() => handleQuickQuestion('Iska ek real-life example ya analogy dekar clear karo')}
          disabled={loading}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/40 transition-all whitespace-nowrap flex items-center gap-1"
        >
          🔍 Real-Life Analogy
        </button>
        <button
          type="button"
          onClick={() => handleQuickQuestion('Step-by-step procedure batao taaki calculation me galti na ho')}
          disabled={loading}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/40 transition-all whitespace-nowrap flex items-center gap-1"
        >
          ⚙️ Step-by-Step Procedure
        </button>
        <button
          type="button"
          onClick={() => handleQuickQuestion('Agar ye condition fail ho ya zero ho jaye toh kya hoga?')}
          disabled={loading}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/40 transition-all whitespace-nowrap flex items-center gap-1"
        >
          ❓ What If Condition Fails?
        </button>
        <button
          type="button"
          onClick={() => handleQuickQuestion('DBATU university exam me ispar kaisa question aayega aur kitne marks ka?')}
          disabled={loading}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/40 transition-all whitespace-nowrap flex items-center gap-1"
        >
          🎯 DBATU Exam Strategy
        </button>
      </div>

      {/* Chat Input Box */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask a question or request simpler explanation in ${MODES.find((m) => m.id === mode)?.label}...`}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
