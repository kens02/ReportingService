import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { reportSchema, toSeries, toDataPayload } from '@/lib/validators/report';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(Number(searchParams.get('page') ?? '1'), 1);
  const limit = Math.min(Math.max(Number(searchParams.get('limit') ?? '10'), 1), 50);

  const [total, reports] = await Promise.all([
    prisma.report.count(),
    prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })
  ]);

  return NextResponse.json({
    data: reports,
    page,
    total,
    totalPages: Math.max(Math.ceil(total / limit), 1)
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = reportSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const series = toSeries(parsed.data);
  if (series.length === 0) {
    return NextResponse.json({ message: 'Invalid series data' }, { status: 400 });
  }

  const report = await prisma.report.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      chartType: parsed.data.chartType,
      data: toDataPayload(parsed.data)
    }
  });

  return NextResponse.json({ data: report }, { status: 201 });
}
