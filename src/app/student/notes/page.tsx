'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookmarkCheck } from 'lucide-react';

export default function NotesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/student/revision?tab=notes');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center p-8">
      <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
        <BookmarkCheck className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-white">Redirecting to Revision Notes Hub...</h2>
      <p className="text-sm text-slate-400">
        Notes and spaced repetition are now unified under Revision &amp; Notes Hub.
      </p>
      <Link
        href="/student/revision?tab=notes"
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
      >
        Go to Revision Notes
      </Link>
    </div>
  );
}
