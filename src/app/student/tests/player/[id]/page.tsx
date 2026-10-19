import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PlayerClient from './PlayerClient';

export const dynamic = 'force-dynamic';

export default async function TestPlayerPage({
  params,
}: {
  params: { id: string };
}) {
  const test = await prisma.test.findUnique({
    where: { id: params.id },
    include: {
      subject: true,
      questions: {
        include: {
          topic: {
            include: {
              unit: true,
            },
          },
        },
      },
    },
  });

  if (!test) return notFound();

  return <PlayerClient test={test} />;
}
