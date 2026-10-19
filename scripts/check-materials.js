const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function check() {
  const subjects = await p.subject.findMany({
    orderBy: { orderIndex: 'asc' },
    include: {
      studyMaterials: {
        include: { chunks: true },
      },
      units: {
        include: { topics: true },
      },
    },
  });

  console.log('=== SUBJECTS & GROUNDED STUDY MATERIALS SUMMARY ===\n');
  for (const s of subjects) {
    const topicCount = s.units.reduce((a, u) => a + u.topics.length, 0);
    const matCount = s.studyMaterials.length;
    const chunkCount = s.studyMaterials.reduce((a, m) => a + m.chunks.length, 0);
    console.log(`[Order ${s.orderIndex}] ${s.code} - ${s.name}:`);
    console.log(`    Materials: ${matCount}, Chunks: ${chunkCount}, Topics in Syllabus: ${topicCount}`);
  }

  const totalChunks = await p.documentChunk.count();
  const totalMaterials = await p.studyMaterial.count();
  console.log(`\nTOTAL INGESTED: ${totalMaterials} Study Materials, ${totalChunks} Grounded Semantic Chunks.`);
  process.exit(0);
}

check();
