import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleData = [
  {
    title: 'Weekly Sales Summary',
    description: 'Sales volume by day for the last week.',
    chartType: 'BAR',
    data: JSON.stringify({
      series: [
        { label: 'Mon', value: 120 },
        { label: 'Tue', value: 98 },
        { label: 'Wed', value: 140 },
        { label: 'Thu', value: 110 },
        { label: 'Fri', value: 165 },
        { label: 'Sat', value: 90 },
        { label: 'Sun', value: 75 }
      ]
    })
  },
  {
    title: 'Active Users Trend',
    description: 'Monthly active users for the last 6 months.',
    chartType: 'LINE',
    data: JSON.stringify({
      series: [
        { label: 'Oct', value: 340 },
        { label: 'Nov', value: 380 },
        { label: 'Dec', value: 420 },
        { label: 'Jan', value: 460 },
        { label: 'Feb', value: 500 },
        { label: 'Mar', value: 540 }
      ]
    })
  }
];

async function main() {
  const existing = await prisma.report.count();
  if (existing > 0) {
    return;
  }

  await prisma.report.createMany({
    data: sampleData
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
