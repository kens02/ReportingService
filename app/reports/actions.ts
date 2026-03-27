'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { reportSchema, toSeries, toDataPayload } from '@/lib/validators/report';

export type FormState = {
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const emptyState: FormState = {};

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  }
  return true;
}

export async function createReport(_: FormState, formData: FormData): Promise<FormState> {
  const isAuthed = await requireSession();
  if (!isAuthed) {
    return { message: 'ログインが必要です。' };
  }

  const parsed = reportSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    chartType: formData.get('chartType'),
    labels: formData.get('labels'),
    values: formData.get('values')
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const series = toSeries(parsed.data);
  if (series.length === 0) {
    return { message: 'データのラベルと値を正しく入力してください。' };
  }

  await prisma.report.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      chartType: parsed.data.chartType,
      data: toDataPayload(parsed.data)
    }
  });

  revalidatePath('/');
  redirect('/');
}

export async function updateReport(_: FormState, formData: FormData): Promise<FormState> {
  const isAuthed = await requireSession();
  if (!isAuthed) {
    return { message: 'ログインが必要です。' };
  }

  const id = String(formData.get('id') ?? '');
  if (!id) {
    return { message: 'レポートIDが見つかりません。' };
  }

  const parsed = reportSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    chartType: formData.get('chartType'),
    labels: formData.get('labels'),
    values: formData.get('values')
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const series = toSeries(parsed.data);
  if (series.length === 0) {
    return { message: 'データのラベルと値を正しく入力してください。' };
  }

  await prisma.report.update({
    where: { id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      chartType: parsed.data.chartType,
      data: toDataPayload(parsed.data)
    }
  });

  revalidatePath('/');
  revalidatePath(`/reports/${id}`);
  redirect(`/reports/${id}`);
}

export async function deleteReport(_: FormState, formData: FormData): Promise<FormState> {
  const isAuthed = await requireSession();
  if (!isAuthed) {
    return { message: 'ログインが必要です。' };
  }

  const id = String(formData.get('id') ?? '');
  if (!id) {
    return { message: 'レポートIDが見つかりません。' };
  }

  await prisma.report.delete({
    where: { id }
  });

  revalidatePath('/');
  redirect('/');
}

export const initialFormState = emptyState;
