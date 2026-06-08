'use client';

import { useCategories } from '../hooks/useCategories';
import { CategoryCard } from './CategoryCard';
import { SkeletonList } from '@/shared/components/ui/Skeleton';

export function CategoryGrid() {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <SkeletonList count={5} />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-error-100 bg-error-50 p-6 text-center text-sm text-error-600">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
