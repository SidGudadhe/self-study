import React from 'react';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { FileText } from 'lucide-react';
import StudyMaterialManagerClient from './StudyMaterialManagerClient';

export const dynamic = 'force-dynamic';

export default async function StudyMaterialsPage() {
  const user = await getAuthenticatedUserOrDemo();

  // Fetch subjects in strict hierarchy: Math > Physics > BEE > BCME > others
  const subjects = await prisma.subject.findMany({
    orderBy: { orderIndex: 'asc' },
    include: {
      units: {
        orderBy: { unitNumber: 'asc' },
        include: {
          topics: {
            orderBy: { orderIndex: 'asc' },
          },
        },
      },
    },
  });

  // Fetch existing study materials with semantic chunks
  const materials = await prisma.studyMaterial.findMany({
    include: {
      subject: true,
      chunks: {
        include: {
          topic: true,
        },
        orderBy: { pageNumber: 'asc' },
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
            <FileText className="w-6 h-6 text-indigo-400" /> Topic Study Material & Ingestion Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Topic-level note documentary, mathematical derivations, formula sheets, and PDF/PPT materials directly indexed into the learning algorithm.
          </p>
        </div>
      </div>

      {/* Interactive Topic Ingestion & Material Management */}
      <StudyMaterialManagerClient subjects={subjects} initialMaterials={materials} />
    </div>
  );
}
