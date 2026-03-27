export const APP_NAME = 'ReportingService';
export const REPORTS_PER_PAGE = 6;
export const CHART_TYPES = ['BAR', 'LINE'] as const;
export const DEFAULT_REPORT_VALUES = {
  title: '',
  description: '',
  chartType: 'BAR',
  labels: 'A,B,C,D',
  values: '10,20,30,15'
} as const;
