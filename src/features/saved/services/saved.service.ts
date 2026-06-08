import apiClient from '@/lib/api';
import type { Opportunity } from '@/features/opportunities/types';

export const savedService = {
  async list(): Promise<Opportunity[]> {
    const { data } = await apiClient.get<Opportunity[]>('/saved');
    return data;
  },

  async remove(opportunityId: string): Promise<void> {
    await apiClient.delete(`/saved/${opportunityId}`);
  },
};
