import React from 'react';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { FileText, Upload, CheckCircle2, AlertCircle, FileCheck, Layers, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StudyMaterialsPage() {
  const user = await getAuthenticatedUserOrDemo();

  const materials = await prisma.studyMaterial.findMany({
    include: {
      subject: true,
      chunks: {
        include: {
          topic: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" /> Study Materials & Ingestion Vault
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Grounded PDF notes, OCR extraction, section-level chunking, and notes-to-topic syllabus mapping.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-slate-900 border-2 border-dashed border-slate-700/80 hover:border-indigo-500/60 transition-colors text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-base text-slate-200">Upload DBATU Notes & Reference Books</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Supports PDF, Scanned Notes, DOCX, TXT, and Images. Files are securely parsed with page tracking and grounded into the syllabus.
          </p>
        </div>
        <button
          type="button"
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20"
        >
          Select Files to Ingest
        </button>
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Indexed Course Materials</h2>

        {materials.length > 0 ? (
          <div className="space-y-4">
            {materials.map((mat) => (
              <div key={mat.id} className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                        {mat.subject.code}
                      </span>
                      <span className="text-xs text-slate-400">{mat.subject.name}</span>
                    </div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {mat.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      File: <span className="font-mono text-slate-300">{mat.originalFilename}</span> • {mat.extractedPages} pages • OCR Quality: <span className="text-emerald-400 font-semibold">{(mat.ocrQuality * 100).toFixed(0)}%</span>
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1 self-start md:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {mat.status}
                  </span>
                </div>

                {/* Chunks Preview */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold flex items-center gap-1.5 text-slate-300">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" /> Extracted Semantic Chunks ({mat.chunks.length})
                    </span>
                    <span>Ready for Grounded RAG</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {mat.chunks.map((chunk) => (
                      <div key={chunk.id} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-semibold text-indigo-300 truncate max-w-[200px]">
                            {chunk.sectionTitle}
                          </span>
                          <span className="text-slate-400 font-mono">Page {chunk.pageNumber}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-3 leading-relaxed">
                          {chunk.content}
                        </p>
                        {chunk.topic && (
                          <div className="pt-1 text-[10px] text-emerald-400">
                            Mapped Topic: <span className="font-semibold">{chunk.topic.title}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No study materials uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
