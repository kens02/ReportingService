import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { ReportChart } from '@/components/report/ReportChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteReport } from '@/app/reports/actions';
import { parseSeries } from '@/lib/validators/report';

interface ReportDetailPageProps {
  params: { id: string };
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const report = await prisma.report.findUnique({
    where: { id: params.id }
  });

  if (!report) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const series = parseSeries(report.data);

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-mutedForeground">Report Detail</p>
          <h1 className="text-3xl font-semibold">{report.title}</h1>
          <p className="text-mutedForeground">{report.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="ghost">
            <Link href="/">一覧へ戻る</Link>
          </Button>
          {session && (
            <Button asChild variant="secondary">
              <Link href={`/reports/${report.id}/edit`}>編集</Link>
            </Button>
          )}
          {session && (
            <form action={deleteReport}>
              <input type="hidden" name="id" value={report.id} />
              <Button type="submit" variant="ghost">
                削除
              </Button>
            </form>
          )}
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>チャート</CardTitle>
          <CardDescription>{report.chartType}チャートで可視化しています。</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportChart type={report.chartType} data={series} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>集計データ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-accent/70 text-mutedForeground">
                <tr>
                  <th className="px-4 py-3 font-medium">ラベル</th>
                  <th className="px-4 py-3 font-medium">値</th>
                </tr>
              </thead>
              <tbody>
                {series.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <td className="px-4 py-3">{row.label}</td>
                    <td className="px-4 py-3 font-medium">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
