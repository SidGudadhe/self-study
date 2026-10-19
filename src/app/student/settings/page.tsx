import React from 'react';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { Settings, Shield, Sliders, Key, User, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const user = await getAuthenticatedUserOrDemo();
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 0);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-400" /> Platform Settings & Algorithm Calibration
        </h1>
        <p className="text-sm text-slate-400">
          Manage your student profile, adaptive engine weighting parameters, and AI API integrations.
        </p>
      </div>

      {/* Profile Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" /> Student Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Student Full Name</label>
            <input
              type="text"
              readOnly
              value={user.name}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 font-medium"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">University Email</label>
            <input
              type="email"
              readOnly
              value={user.email}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Adaptive Algorithm Calibration Settings */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" /> Adaptive Learning Parameters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">Mastery Target Cutoff</span>
            <p className="text-slate-400 text-[11px]">Threshold for verified mastery status</p>
            <p className="text-lg font-mono font-bold text-indigo-400 pt-1">75.0%</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">SuperMemo SM-2 Base Ease Factor</span>
            <p className="text-slate-400 text-[11px]">Standard multiplier for spaced interval expansion</p>
            <p className="text-lg font-mono font-bold text-indigo-400 pt-1">2.5</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">Priority Weight: Mastery Deficit</span>
            <p className="text-slate-400 text-[11px]">Weight assigned to (100 - Mastery)</p>
            <p className="text-lg font-mono font-bold text-emerald-400 pt-1">35% (0.35)</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">Priority Weight: Retention Decay</span>
            <p className="text-slate-400 text-[11px]">Weight assigned to (100 - Retention)</p>
            <p className="text-lg font-mono font-bold text-rose-400 pt-1">20% (0.20)</p>
          </div>
        </div>
      </div>

      {/* AI Provider Configuration */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Key className="w-4 h-4 text-indigo-400" /> AI Provider & Fallback Engine
        </h2>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-slate-200 block">Google Gemini API Status</span>
            <p className="text-slate-400 text-[11px]">
              {hasGeminiKey
                ? 'Gemini 1.5 Flash is active with online multimodal reasoning.'
                : 'Offline High-Fidelity Pedagogical Fallback Engine is active. Explanations, KaTeX equations, and rubrics are generated deterministically.'}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
              hasGeminiKey
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
            }`}
          >
            {hasGeminiKey ? 'Gemini Live' : 'Deterministic Fallback Active'}
          </span>
        </div>
      </div>
    </div>
  );
}
