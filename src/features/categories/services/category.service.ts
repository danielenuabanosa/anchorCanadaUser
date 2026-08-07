import apiClient from '@/lib/api';
import type { Category } from '../types';

export const categoryService = {
  async list(): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>('/categories');
    return data;
  },

  async getBySlug(slug: string): Promise<Category> {
    const { data } = await apiClient.get<Category>(`/categories/${slug}`);
    return data;
  },
};
