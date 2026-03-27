import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { DEFAULT_REPORT_VALUES } from '@/lib/constants';
import { ReportForm } from '@/components/report/ReportForm';
import { createReport } from '@/app/reports/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function NewReportPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="section-title">新規レポート作成</h1>
        <Button asChild variant="ghost">
          <Link href="/">一覧へ戻る</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>レポート情報</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportForm action={createReport} defaultValues={DEFAULT_REPORT_VALUES} submitLabel="作成する" />
        </CardContent>
      </Card>
    </main>
  );
}
