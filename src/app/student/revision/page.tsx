import React from 'react';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import RevisionHubClient from './RevisionHubClient';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams?: {
    tab?: string;
    topicId?: string;
  };
}

export default async function RevisionPlannerPage({ searchParams }: Props) {
  const user = await getAuthenticatedUserOrDemo();

  const [schedules, notes, subjects] = await Promise.all([
    prisma.spacedReviewSchedule.findMany({
      where: { userId: user.id },
      include: {
        topic: {
          include: {
            unit: {
              include: { subject: true },
            },
            masteryRecords: {
              where: { userId: user.id },
              select: {
                currentMastery: true,
                retentionScore: true,
              },
            },
          },
        },
      },
      orderBy: { dueDate: 'asc' },
    }),
    prisma.revisionNote.findMany({
      where: { userId: user.id },
      include: {
        topic: {
          include: {
            unit: {
              include: { subject: true },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.subject.findMany({
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
      },
    }),
  ]);

  return (
    <RevisionHubClient
      initialTab={searchParams?.tab || 'retention'}
      filterTopicId={searchParams?.topicId || ''}
      schedules={schedules}
      notes={notes}
      subjects={subjects}
    />
  );
}
