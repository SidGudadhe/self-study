import React from 'react';
import { prisma } from '@/lib/prisma';
import TeacherClient from './TeacherClient';

export const dynamic = 'force-dynamic';

export default async function TeacherPage({
  searchParams,
}: {
  searchParams: { subjectId?: string; topicId?: string; mode?: string };
}) {
  const subjects = await prisma.subject.findMany({
    orderBy: { code: 'asc' },
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
    <TeacherClient
      subjects={subjects}
      initialSubjectId={searchParams.subjectId}
      initialTopicId={searchParams.topicId}
      initialMode={searchParams.mode}
    />
  );
}
