import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';
import { AIProvider } from '@/lib/ai/provider';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUserOrDemo();
    const body = await req.json();
    const { subjectId, topicId, mode = 'DETAILED', message, conversationId } = body;

    if (!subjectId) {
      return NextResponse.json({ error: 'subjectId is required' }, { status: 400 });
    }

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    let topic = null;
    let unit = null;
    if (topicId) {
      topic = await prisma.topic.findUnique({
        where: { id: topicId },
        include: { unit: true },
      });
      if (topic) unit = topic.unit;
    }

    // Retrieve or create conversation
    let conv = conversationId
      ? await prisma.teacherConversation.findUnique({ where: { id: conversationId } })
      : null;

    if (!conv) {
      conv = await prisma.teacherConversation.create({
        data: {
          userId: user.id,
          subjectId,
          topicId: topicId || null,
          mode,
          title: topic ? `Lesson: ${topic.title}` : `Tutoring: ${subject.name}`,
        },
      });
    }

    // Save user message if provided
    if (message && message.trim().length > 0) {
      await prisma.chatMessage.create({
        data: {
          conversationId: conv.id,
          sender: 'user',
          content: message,
        },
      });
    }

    // Retrieve grounded chunks for this topic
    const groundedChunks = topicId ? await AIProvider.retrieveGroundedChunks(topicId, message) : [];

    // Generate AI response
    const teacherResult = await AIProvider.generateTeacherResponse({
      subjectName: subject.name,
      subjectCode: subject.code,
      unitTitle: unit ? `Unit ${unit.unitNumber}: ${unit.title}` : 'General Syllabus',
      topicTitle: topic ? topic.title : 'Overview and Concepts',
      mode,
      studentQuestion: message,
      groundedChunks,
    });

    // Save AI message
    const aiMsg = await prisma.chatMessage.create({
      data: {
        conversationId: conv.id,
        sender: 'ai',
        content: teacherResult.content,
        groundedSourceIds: JSON.stringify(teacherResult.citations),
        isGrounded: teacherResult.isGrounded,
      },
    });

    return NextResponse.json({
      success: true,
      conversationId: conv.id,
      message: aiMsg,
      citations: teacherResult.citations,
    });
  } catch (error: any) {
    console.error('Teacher API error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
