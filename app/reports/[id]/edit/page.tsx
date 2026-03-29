import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ReportForm } from '@/components/report/ReportForm';
import { updateReport } from '@/app/reports/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { parseSeries } from '@/lib/validators/report';

interface EditReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditReportPage({ params }: EditReportPageProps) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  const report = await prisma.report.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!report) {
    notFound();
  }

  const series = parseSeries(report.data);
  const defaultValues = {
    title: report.title,
    description: report.description,
    chartType: report.chartType,
    labels: series.map((item) => item.label).join(', '),
    values: series.map((item) => item.value).join(', ')
  };

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="section-title">レポート編集</h1>
        <Button asChild variant="ghost">
          <Link href={`/reports/${report.id}`}>詳細へ戻る</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>レポート情報の更新</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportForm
            action={updateReport}
            defaultValues={defaultValues}
            submitLabel="更新する"
            reportId={report.id}
          />
        </CardContent>
      </Card>
    </main>
  );
}
