import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen bg-slate-950 text-slate-100 custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
