'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CHART_TYPES } from '@/lib/constants';
import type { ReportInput } from '@/lib/validators/report';
import type { FormState } from '@/app/reports/actions';

interface ReportFormProps {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  defaultValues: ReportInput;
  submitLabel: string;
  reportId?: string;
}

const initialState: FormState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? '送信中...' : label}
    </Button>
  );
}

export function ReportForm({ action, defaultValues, submitLabel, reportId }: ReportFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {reportId && <input type="hidden" name="id" value={reportId} />}
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input id="title" name="title" defaultValue={defaultValues.title} required />
        {state.fieldErrors?.title?.map((message) => (
          <p key={message} className="text-xs text-red-500">
            {message}
          </p>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">説明</Label>
        <Textarea id="description" name="description" defaultValue={defaultValues.description} required />
        {state.fieldErrors?.description?.map((message) => (
          <p key={message} className="text-xs text-red-500">
            {message}
          </p>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="chartType">チャート種別</Label>
          <Select id="chartType" name="chartType" defaultValue={defaultValues.chartType}>
            {CHART_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="labels">ラベル (カンマ区切り)</Label>
          <Input id="labels" name="labels" defaultValue={defaultValues.labels} required />
          {state.fieldErrors?.labels?.map((message) => (
            <p key={message} className="text-xs text-red-500">
              {message}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="values">値 (カンマ区切り数値)</Label>
        <Input id="values" name="values" defaultValue={defaultValues.values} required />
        {state.fieldErrors?.values?.map((message) => (
          <p key={message} className="text-xs text-red-500">
            {message}
          </p>
        ))}
      </div>
      {state.message && <p className="text-sm text-red-500">{state.message}</p>}
      <SubmitButton label={submitLabel} />
    </form>
  );
}
