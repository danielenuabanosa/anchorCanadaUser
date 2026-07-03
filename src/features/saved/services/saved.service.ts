import apiClient from '@/lib/api';
import { isStaticMode } from '@/lib/staticMode';
import { MOCK_PROVIDER_OPPORTUNITIES } from '@/lib/mockData';
import type { Opportunity } from '@/features/opportunities/types';

export const savedService = {
  async list(): Promise<Opportunity[]> {
    if (isStaticMode()) return MOCK_PROVIDER_OPPORTUNITIES.slice(0, 1);

    const { data } = await apiClient.get<Opportunity[]>('/saved');
    return data;
  },

  async remove(_opportunityId: string): Promise<void> {
    if (isStaticMode()) return;
    await apiClient.delete(`/saved/${_opportunityId}`);
  },
};
