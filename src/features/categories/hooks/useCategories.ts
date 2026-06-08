import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/category.service';

export const CATEGORY_KEYS = {
  all:    ['categories'] as const,
  detail: (slug: string) => ['categories', slug] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_KEYS.all,
    queryFn:  () => categoryService.list(),
    staleTime: 1000 * 60 * 10, // categories change rarely
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: CATEGORY_KEYS.detail(slug),
    queryFn:  () => categoryService.getBySlug(slug),
    enabled:  !!slug,
  });
}
