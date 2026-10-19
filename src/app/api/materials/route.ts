import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserOrDemo } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');
    const topicId = searchParams.get('topicId');

    const where: any = {};
    if (subjectId) where.subjectId = subjectId;
    if (topicId) where.topicId = topicId;

    const materials = await prisma.studyMaterial.findMany({
      where,
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

    return NextResponse.json({ success: true, materials });
  } catch (error: any) {
    console.error('Error fetching materials:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUserOrDemo();
    const body = await request.json();

    const {
      subjectId,
      topicId,
      title,
      materialType = 'TEXT_DOCUMENTARY',
      content,
      sourceReference,
      fileName,
    } = body;

    if (!subjectId || !topicId || !title || !content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Subject, Topic, Title, and Material Content are required.' },
        { status: 400 }
      );
    }

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      return NextResponse.json({ error: 'Selected subject not found.' }, { status: 404 });
    }

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
      include: { unit: true },
    });
    if (!topic) {
      return NextResponse.json({ error: 'Selected topic not found.' }, { status: 404 });
    }

    const cleanContent = content.trim();
    const byteSize = Buffer.byteLength(cleanContent, 'utf8');
    const calculatedPages = Math.max(1, Math.ceil(cleanContent.length / 1400));

    // Determine clean file extension
    let extension = 'txt';
    if (materialType === 'PDF_DOCUMENT') extension = 'pdf';
    else if (materialType === 'PPT_PRESENTATION') extension = 'pptx';
    else if (materialType === 'DOCX_DOCUMENT') extension = 'docx';

    const safeTopicName = topic.title.replace(/[^a-zA-Z0-9]/g, '_');
    const originalFilename = fileName?.trim() || `${subject.code}_${safeTopicName}.${extension}`;

    // Create StudyMaterial entry
    const material = await prisma.studyMaterial.create({
      data: {
        subjectId,
        topicId,
        title: title.trim(),
        originalFilename,
        fileType: materialType.toLowerCase(),
        filePath: `/materials/stored/${subjectId}/${topicId}`,
        fileSize: byteSize,
        status: 'INDEXED',
        extractedPages: calculatedPages,
        ocrQuality: 1.0,
      },
    });

    // Semantic Chunking: Split content intelligently into 600-1200 char educational chunks
    // Splitting on Markdown headings (### or ##) or double newlines to preserve complete educational concepts
    const rawSections = cleanContent.split(/\n(?=###?\s+)/g);
    const chunkBlocks: Array<{ title: string; body: string }> = [];

    for (const section of rawSections) {
      const trimmed = section.trim();
      if (!trimmed) continue;

      const lines = trimmed.split('\n');
      const firstLine = lines[0].replace(/^#+\s*/, '').trim();
      const sectionHeading = firstLine.length > 0 && firstLine.length < 80
        ? firstLine
        : `${topic.title} - Core Concepts`;

      // If section is reasonably sized (< 2500 chars), keep as 1 chunk
      if (trimmed.length <= 2500) {
        chunkBlocks.push({ title: sectionHeading, body: trimmed });
      } else {
        // Subdivide large sections into smaller paragraph-preserving chunks
        const paragraphs = trimmed.split(/\n\s*\n/);
        let currentChunk = '';
        let partIndex = 1;

        for (const p of paragraphs) {
          if ((currentChunk + '\n\n' + p).length > 2000 && currentChunk.length > 0) {
            chunkBlocks.push({
              title: `${sectionHeading} (Part ${partIndex})`,
              body: currentChunk.trim(),
            });
            partIndex++;
            currentChunk = p;
          } else {
            currentChunk = currentChunk ? currentChunk + '\n\n' + p : p;
          }
        }
        if (currentChunk.trim().length > 0) {
          chunkBlocks.push({
            title: partIndex > 1 ? `${sectionHeading} (Part ${partIndex})` : sectionHeading,
            body: currentChunk.trim(),
          });
        }
      }
    }

    // Insert DocumentChunks into database
    let pageCounter = 1;
    const createdChunks = [];

    for (let i = 0; i < chunkBlocks.length; i++) {
      const block = chunkBlocks[i];
      const approxTokens = Math.max(20, Math.round(block.body.length / 4));

      const chunk = await prisma.documentChunk.create({
        data: {
          materialId: material.id,
          topicId: topic.id,
          pageNumber: pageCounter,
          sectionTitle: block.title,
          content: block.body,
          tokenCount: approxTokens,
          confidenceScore: 1.0,
        },
      });

      createdChunks.push(chunk);
      if ((i + 1) % 2 === 0) pageCounter++;
    }

    return NextResponse.json({
      success: true,
      material: {
        ...material,
        chunks: createdChunks,
      },
      chunksCount: createdChunks.length,
      message: `Successfully indexed ${createdChunks.length} semantic chunks into the learning algorithm!`,
    });
  } catch (error: any) {
    console.error('Error creating study material:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
