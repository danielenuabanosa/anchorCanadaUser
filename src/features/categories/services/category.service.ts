import apiClient from '@/lib/api';
import { isStaticMode } from '@/lib/staticMode';
import { MOCK_CATEGORIES } from '@/lib/mockData';
import type { Category } from '../types';

export const categoryService = {
  async list(): Promise<Category[]> {
    if (isStaticMode()) return MOCK_CATEGORIES;

    const { data } = await apiClient.get<Category[]>('/categories');
    return data;
  },

  async getBySlug(slug: string): Promise<Category> {
    if (isStaticMode()) {
      const found = MOCK_CATEGORIES.find((category) => category.slug === slug);
      if (!found) throw new Error('Category not found.');
      return found;
    }

    const { data } = await apiClient.get<Category>(`/categories/${slug}`);
    return data;
  },
};
