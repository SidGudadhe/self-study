import React from 'react';
import { prisma } from '@/lib/prisma';
import NewTestClient from './NewTestClient';

export const dynamic = 'force-dynamic';

export default async function NewTestPage({
  searchParams,
}: {
  searchParams: { subjectId?: string; topicId?: string; unitId?: string };
}) {
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

  return (
    <NewTestClient
      subjects={subjects}
      initialSubjectId={searchParams.subjectId}
      initialTopicId={searchParams.topicId}
      initialUnitId={searchParams.unitId}
    />
  );
}
