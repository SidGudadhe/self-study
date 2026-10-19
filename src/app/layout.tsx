import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CogniStudy AI | Intelligent Self-Study & Adaptive Test Series',
  description: 'DBATU Engineering Syllabus-aware AI Teacher, Intelligent Tests, and Calibrated Mastery Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 flex min-h-screen">
        {children}
      </body>
    </html>
  );
}
