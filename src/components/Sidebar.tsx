'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  FileText,
  Bot,
  GraduationCap,
  TrendingUp,
  CalendarDays,
  BookmarkCheck,
  Settings,
  Sparkles,
  Award
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { name: 'My Subjects', href: '/student/subjects', icon: BookOpen },
  { name: 'Syllabus Manager', href: '/student/syllabus', icon: FolderTree },
  { name: 'Study Materials', href: '/student/materials', icon: FileText },
  { name: 'AI Teacher', href: '/student/teacher', icon: Bot, badge: '7 Modes' },
  { name: 'Test Series', href: '/student/tests', icon: GraduationCap, badge: 'Adaptive' },
  { name: 'My Performance', href: '/student/analytics', icon: TrendingUp },
  { name: 'Revision Planner', href: '/student/revision', icon: CalendarDays, badge: 'Spaced' },
  { name: 'Saved Notes', href: '/student/notes', icon: BookmarkCheck },
  { name: 'Settings', href: '/student/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
            CogniStudy <span className="text-xs bg-indigo-500/20 text-indigo-400 font-semibold px-1.5 py-0.5 rounded border border-indigo-500/30">AI</span>
          </h1>
          <p className="text-xs text-slate-400">DBATU B.Tech Hub</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Self-Study Navigation
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/student/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Student Badge Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/60">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-200 truncate">Rohan Sharma</p>
            <p className="text-[10px] text-slate-400 truncate">DBATU B.Tech • First Year</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
