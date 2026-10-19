import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { AIProvider } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUserOrDemo();
    const body = await req.json();
    const { topicId } = body;

    if (!topicId) {
      return NextResponse.json({ error: 'topicId is required' }, { status: 400 });
    }

    const revisionNote = await AIProvider.generateTopicRevisionNotes(user.id, topicId);

    return NextResponse.json({
      success: true,
      noteId: revisionNote.id,
      note: revisionNote,
    });
  } catch (error: any) {
    console.error('Generate Notes API error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
