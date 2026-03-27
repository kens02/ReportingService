import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { REPORTS_PER_PAGE, APP_NAME } from '@/lib/constants';
import { ReportPagination } from '@/components/report/ReportPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';

interface HomeProps {
  searchParams?: { page?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Math.max(Number(searchParams?.page ?? '1'), 1);
  const [total, reports, session] = await Promise.all([
    prisma.report.count(),
    prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * REPORTS_PER_PAGE,
      take: REPORTS_PER_PAGE
    }),
    getServerSession(authOptions)
  ]);

  const totalPages = Math.max(Math.ceil(total / REPORTS_PER_PAGE), 1);

  return (
    <main className="space-y-10">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-mutedForeground">Dashboard</p>
            <h1 className="text-4xl font-semibold tracking-tight">{APP_NAME}</h1>
            <p className="text-base text-mutedForeground">
              集計したレポートを素早く共有し、意思決定を加速させるためのスペース。
            </p>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <Button asChild>
                <Link href="/reports/new">新規レポート</Link>
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link href="/signin">ログインして作成</Link>
              </Button>
            )}
            <Button asChild variant="ghost">
              <Link href="/api/reports">API</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-mutedForeground">
                  <span>チャート: {report.chartType}</span>
                  <span>{report.createdAt.toLocaleDateString('ja-JP')}</span>
                </div>
                <div className="mt-4">
                  <Button asChild variant="ghost">
                    <Link href={`/reports/${report.id}`}>詳細を見る</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {reports.length === 0 && (
          <div className="surface p-10 text-center text-mutedForeground">
            まだレポートがありません。最初のレポートを作成してください。
          </div>
        )}
      </section>
      <section className="surface p-6">
        <ReportPagination page={page} totalPages={totalPages} />
      </section>
    </main>
  );
}
