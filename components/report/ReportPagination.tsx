import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ReportPaginationProps {
  page: number;
  totalPages: number;
}

export function ReportPagination({ page, totalPages }: ReportPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <Button asChild variant="ghost">
        <Link href={`/?page=${Math.max(1, page - 1)}`} aria-disabled={page === 1}>
          前のページ
        </Link>
      </Button>
      <span className="text-sm text-mutedForeground">
        {page} / {totalPages}
      </span>
      <Button asChild variant="ghost">
        <Link href={`/?page=${Math.min(totalPages, page + 1)}`} aria-disabled={page === totalPages}>
          次のページ
        </Link>
      </Button>
    </div>
  );
}
