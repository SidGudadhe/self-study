'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function SyllabusRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/student/subjects');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center p-8">
      <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
        <BookOpen className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-white">Redirecting to Subjects &amp; Syllabus...</h2>
      <p className="text-sm text-slate-400">
        Syllabus topics are now consolidated under My Subjects.
      </p>
      <Link
        href="/student/subjects"
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
      >
        Go to Subjects &amp; Syllabus
      </Link>
    </div>
  );
}
