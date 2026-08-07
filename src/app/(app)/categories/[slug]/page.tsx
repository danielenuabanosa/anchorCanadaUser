'use client';

import { CategoryDetailContent } from '@/features/categories/components/CategoryDetailContent';
import { use } from 'react';

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <CategoryDetailContent slug={slug} />;
}
