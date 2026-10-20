const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function check() {
  const subjects = await p.subject.findMany({
    orderBy: { orderIndex: 'asc' },
    include: {
      units: {
        include: {
          topics: {
            include: {
              chunks: true,
            },
          },
        },
      },
    },
  });

  let zeroCoverageCount = 0;
  let totalTopics = 0;

  for (const s of subjects) {
    console.log(`\n=== [Order ${s.orderIndex}] ${s.code} - ${s.name} ===`);
    for (const u of s.units) {
      console.log(`  Unit: ${u.title}`);
      for (const t of u.topics) {
        totalTopics++;
        const chunkCount = t.chunks ? t.chunks.length : 0;
        if (chunkCount === 0) {
          zeroCoverageCount++;
          console.log(`    ❌ [NO CHUNKS] Topic: "${t.title}" (ID: ${t.id})`);
        } else {
          console.log(`    ✅ Topic: "${t.title}" (${chunkCount} chunks)`);
        }
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`TOTAL TOPICS: ${totalTopics} | COVERED: ${totalTopics - zeroCoverageCount} | MISSING: ${zeroCoverageCount}`);
  console.log(`======================================================`);
}

check().finally(() => p.$disconnect());
