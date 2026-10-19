const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const subjects = await p.subject.findMany({
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

  for (const s of subjects) {
    console.log(`\n========================================`);
    console.log(`[Order ${s.orderIndex}] ${s.code} - ${s.name}`);
    console.log(`========================================`);
    for (const u of s.units) {
      console.log(`  Unit ${u.unitNumber}: ${u.title}`);
      for (const t of u.topics) {
        console.log(`    * [${t.id}] ${t.title}`);
      }
    }
  }

  process.exit(0);
}

run();
