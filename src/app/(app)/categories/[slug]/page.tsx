import type { Metadata } from 'next';
import { CategoryDetailContent } from '@/features/categories/components/CategoryDetailContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'Category' };

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  return <CategoryDetailContent slug={slug} />;
}
