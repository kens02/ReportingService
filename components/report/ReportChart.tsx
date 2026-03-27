'use client';

import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { CHART_TYPES } from '@/lib/constants';

type ChartType = (typeof CHART_TYPES)[number];

interface ReportChartProps {
  type: ChartType;
  data: { label: string; value: number }[];
}

export function ReportChart({ type, data }: ReportChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-mutedForeground">
        グラフを表示するためのデータがありません。
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'BAR' ? (
          <BarChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="value" fill="#1d4ed8" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeWidth={3} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
