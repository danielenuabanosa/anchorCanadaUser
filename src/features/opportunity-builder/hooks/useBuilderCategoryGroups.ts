'use client';

import { useMemo } from 'react';
import { useCategories } from '@/features/categories/hooks/useCategories';
import {
  mapCategoriesToBuilderGroups,
  type CategoryGroupDef,
} from '@/features/opportunity-builder/lib/builderData';

export function useBuilderCategoryGroups() {
  const query = useCategories();
  const groups: CategoryGroupDef[] = useMemo(
    () => mapCategoriesToBuilderGroups(query.data ?? []),
    [query.data],
  );

  return {
    groups,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function findCategoryGroup(
  groups: CategoryGroupDef[],
  categoryId: string | null | undefined,
): CategoryGroupDef | undefined {
  if (!categoryId) return undefined;
  return groups.find(
    (g) => g.id === categoryId || g.subcategories.some((s) => s.id === categoryId),
  );
}
