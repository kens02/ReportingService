import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { reportSchema, toSeries, toDataPayload } from '@/lib/validators/report';
import { authOptions } from '@/lib/auth';

interface RouteParams {
  params: { id: string };
}

export async function GET(_: Request, { params }: RouteParams) {
  const report = await prisma.report.findUnique({
    where: { id: params.id }
  });

  if (!report) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data: report });
}

export async function PUT(request: Request, { params }: RouteParams) {
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

  const report = await prisma.report.update({
    where: { id: params.id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      chartType: parsed.data.chartType,
      data: toDataPayload(parsed.data)
    }
  });

  return NextResponse.json({ data: report });
}

export async function DELETE(_: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await prisma.report.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ ok: true });
}
