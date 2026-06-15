import { redirect } from 'next/navigation';

type ApplyPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ flow?: string; step?: string }>;
};

export default async function ApplyPage({ params, searchParams }: ApplyPageProps) {
  const { id } = await params;
  const sp = await searchParams;

  const qs = new URLSearchParams({
    apply: '1',
    flow: sp.flow ?? 'internal',
    step: sp.step ?? '1',
  });

  redirect(`/opportunities/${id}?${qs.toString()}`);
}
