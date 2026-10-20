import { NextRequest, NextResponse } from 'next/server';
import AdmZip from 'adm-zip';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const materialType = (formData.get('materialType') as string) || 'PDF_DOCUMENT';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const fileName = file.name;
    const fileSize = file.size;
    const buffer = Buffer.from(await file.arrayBuffer());

    let extractedText = '';
    let pagesCount = 1;
    let ocrQuality = 1.0;

    const lowerName = fileName.toLowerCase();

    // 1. PDF Document Parsing
    if (lowerName.endsWith('.pdf')) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pdfModule = require('pdf-parse');
        let rawText = '';

        if (typeof pdfModule === 'function') {
          const pdfData = await pdfModule(buffer);
          pagesCount = pdfData.numpages || 1;
          rawText = pdfData.text || '';
        } else if (pdfModule && pdfModule.PDFParse) {
          const parser = new pdfModule.PDFParse({ data: buffer });
          const textRes = await parser.getText();
          rawText = typeof textRes === 'string' ? textRes : textRes?.text || '';
        }

        if (rawText && rawText.trim().length > 0) {
          const rawPages = rawText.split(/\f|\n\s*\n\s*\n/).filter((p: string) => p.trim().length > 0);
          if (rawPages.length > 1) {
            extractedText = rawPages
              .map((p: string, idx: number) => `### Page ${idx + 1}\n${p.trim()}`)
              .join('\n\n');
          } else {
            extractedText = `### Page 1\n${rawText.trim()}`;
          }
        } else {
          extractedText = `### Page 1\n[Document: ${fileName} (${(fileSize / 1024).toFixed(1)} KB). Please review and add topic lecture notes.]`;
          ocrQuality = 0.7;
        }
      } catch (pdfErr: any) {
        console.warn('PDF extraction warning:', pdfErr.message);
        extractedText = `### Document: ${fileName}\n[Uploaded PDF file (${(fileSize / 1024).toFixed(1)} KB). Please review and add lecture notes.]`;
        ocrQuality = 0.7;
      }
    }
    // 2. PPTX Presentation Parsing
    else if (lowerName.endsWith('.pptx')) {
      try {
        const zip = new AdmZip(buffer);
        const zipEntries = zip.getEntries();
        const slideEntries = zipEntries
          .filter((e) => e.entryName.startsWith('ppt/slides/slide') && e.entryName.endsWith('.xml'))
          .sort((a, b) => {
            const numA = parseInt(a.entryName.replace(/\D/g, '') || '0', 10);
            const numB = parseInt(b.entryName.replace(/\D/g, '') || '0', 10);
            return numA - numB;
          });

        pagesCount = Math.max(1, slideEntries.length);
        const slideTexts: string[] = [];

        for (let i = 0; i < slideEntries.length; i++) {
          const xml = zip.readAsText(slideEntries[i]);
          const textMatches = xml.match(/<a:t[^>]*>(.*?)<\/a:t>/g) || [];
          const lines = textMatches
            .map((m) => m.replace(/<\/?[^>]+(>|$)/g, '').trim())
            .filter((t) => t.length > 0);

          if (lines.length > 0) {
            slideTexts.push(
              `### Slide ${i + 1}: ${lines[0]}\n${lines
                .slice(1)
                .map((l) => `- ${l}`)
                .join('\n')}`
            );
          }
        }

        if (slideTexts.length > 0) {
          extractedText = slideTexts.join('\n\n');
        } else {
          extractedText = `### Slide 1\n[Presentation: ${fileName} (${pagesCount} slides). Review and add lecture notes.]`;
        }
      } catch (zipErr) {
        console.warn('PPTX parsing error:', zipErr);
        extractedText = `### Presentation Deck: ${fileName}\n[Uploaded presentation (${(fileSize / 1024).toFixed(1)} KB). Add or review presentation notes.]`;
      }
    }
    // 3. Fallback for text / other format
    else {
      extractedText = buffer.toString('utf8');
      pagesCount = Math.max(1, Math.ceil(extractedText.length / 1400));
    }

    // Clean suggested title
    const cleanBaseName = fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    const suggestedTitle = cleanBaseName
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return NextResponse.json({
      success: true,
      fileName,
      fileSize,
      pagesCount,
      ocrQuality,
      suggestedTitle,
      extractedText,
    });
  } catch (error: any) {
    console.error('File extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to extract text from file.' },
      { status: 500 }
    );
  }
}
