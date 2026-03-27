import { z } from 'zod';
import { CHART_TYPES } from '@/lib/constants';
import { parseList, parseNumberList } from '@/lib/utils';

export const reportSchema = z.object({
  title: z.string().min(3, 'タイトルは3文字以上で入力してください。').max(80),
  description: z.string().min(5, '説明は5文字以上で入力してください。').max(280),
  chartType: z.enum(CHART_TYPES),
  labels: z.string().min(1, 'ラベルを入力してください。'),
  values: z.string().min(1, '値を入力してください。')
});

export type ReportInput = z.infer<typeof reportSchema>;

export function toSeries(input: ReportInput) {
  const labels = parseList(input.labels);
  const values = parseNumberList(input.values);

  if (labels.length === 0 || values.length === 0) {
    return [];
  }

  const length = Math.min(labels.length, values.length);
  return Array.from({ length }, (_, index) => ({
    label: labels[index],
    value: values[index]
  }));
}

export function toDataPayload(input: ReportInput) {
  const series = toSeries(input);
  return JSON.stringify({ series });
}

export function parseSeries(data: string) {
  try {
    const parsed = JSON.parse(data) as { series?: { label: string; value: number }[] };
    return parsed.series ?? [];
  } catch {
    return [];
  }
}
