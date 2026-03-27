import { describe, expect, it } from 'vitest';
import { reportSchema, toSeries } from '../lib/validators/report';

describe('reportSchema', () => {
  it('validates valid input', () => {
    const result = reportSchema.safeParse({
      title: 'Test Report',
      description: 'This is a test report.',
      chartType: 'BAR',
      labels: 'A,B,C',
      values: '10,20,30'
    });

    expect(result.success).toBe(true);
  });

  it('rejects short title', () => {
    const result = reportSchema.safeParse({
      title: 'A',
      description: 'This is a test report.',
      chartType: 'LINE',
      labels: 'A,B',
      values: '10,20'
    });

    expect(result.success).toBe(false);
  });
});

describe('toSeries', () => {
  it('maps labels and values to series', () => {
    const series = toSeries({
      title: 'Test Report',
      description: 'This is a test report.',
      chartType: 'BAR',
      labels: 'Alpha, Beta',
      values: '5, 7'
    });

    expect(series).toEqual([
      { label: 'Alpha', value: 5 },
      { label: 'Beta', value: 7 }
    ]);
  });
});
