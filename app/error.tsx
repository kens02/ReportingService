'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="surface flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-semibold">エラーが発生しました</h2>
      <p className="text-sm text-mutedForeground">時間をおいて再度お試しください。</p>
      <Button onClick={reset}>再読み込み</Button>
    </div>
  );
}
