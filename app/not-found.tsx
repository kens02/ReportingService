import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="surface flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-semibold">ページが見つかりません</h2>
      <p className="text-sm text-mutedForeground">指定したレポートは存在しないようです。</p>
      <Button asChild variant="ghost">
        <Link href="/">一覧へ戻る</Link>
      </Button>
    </div>
  );
}
