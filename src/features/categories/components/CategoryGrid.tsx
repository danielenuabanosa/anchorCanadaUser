'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCategories } from '../hooks/useCategories';
import { CategoryCard } from './CategoryCard';
import { SkeletonList } from '@/shared/components/ui/Skeleton';
import { HubSortSelect } from '@/shared/components/hub/HubSortSelect';
import type { HubMenuOption } from '@/shared/components/hub/HubMenuSelect';

const SORT_OPTIONS: HubMenuOption[] = [
  { value: 'name', label: 'Name A–Z' },
  { value: 'count', label: 'Most Opportunities' },
];

export function CategoryGrid() {
  const { data, isLoading, isError } = useCategories();
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();
  const [sort, setSort] = useState('name');

  const categories = useMemo(() => {
    const list = (data ?? []).filter((c) => {
      if (!query) return true;
      return (
        c.title.toLowerCase().includes(query) ||
        c.slug.toLowerCase().includes(query) ||
        (c.description ?? '').toLowerCase().includes(query)
      );
    });

    const next = [...list];
    if (sort === 'count') {
      next.sort((a, b) => (b.opportunityCount ?? 0) - (a.opportunityCount ?? 0));
    } else {
      next.sort((a, b) => a.title.localeCompare(b.title));
    }
    return next;
  }, [data, query, sort]);

  if (isLoading) return <SkeletonList count={5} />;

  if (isError) {
    return (
      <div className="rounded-2xl border border-error-100 bg-error-50 p-6 text-center text-sm text-error-600">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#44516A]">
          {categories.length} {categories.length === 1 ? 'category' : 'categories'}
          {query ? ` matching “${query}”` : ''}
        </p>
        <HubSortSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />
      </div>
      {categories.length === 0 ? (
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-4 py-8 text-center text-sm text-[#44516A]">
          No categories match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
