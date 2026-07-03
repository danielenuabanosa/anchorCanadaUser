import apiClient from '@/lib/api';
import { isStaticMode } from '@/lib/staticMode';
import { MOCK_PROVIDER_OPPORTUNITIES } from '@/lib/mockData';
import type { Opportunity, OpportunityFilters, PaginatedOpportunities } from '../types';

export const opportunityService = {
  async list(filters: OpportunityFilters = {}): Promise<PaginatedOpportunities> {
    if (isStaticMode()) {
      return {
        data: MOCK_PROVIDER_OPPORTUNITIES,
        total: MOCK_PROVIDER_OPPORTUNITIES.length,
        page: filters.page ?? 1,
        totalPages: 1,
      };
    }

    const { data } = await apiClient.get<PaginatedOpportunities>('/opportunities', {
      params: filters,
    });
    return data;
  },

  async getById(id: string): Promise<Opportunity> {
    if (isStaticMode()) {
      const found =
        MOCK_PROVIDER_OPPORTUNITIES.find((opp) => opp.id === id) ?? MOCK_PROVIDER_OPPORTUNITIES[0];
      return found;
    }

    const { data } = await apiClient.get<Opportunity>(`/opportunities/${id}`);
    return data;
  },

  async getBySlug(slug: string): Promise<Opportunity> {
    if (isStaticMode()) {
      const found = MOCK_PROVIDER_OPPORTUNITIES.find((opp) => opp.slug === slug);
      if (!found) throw new Error('Opportunity not found.');
      return found;
    }

    const { data } = await apiClient.get<Opportunity>(`/opportunities/slug/${slug}`);
    return data;
  },

  async save(_id: string): Promise<void> {
    if (isStaticMode()) return;
    await apiClient.post(`/opportunities/${_id}/save`);
  },

  async unsave(_id: string): Promise<void> {
    if (isStaticMode()) return;
    await apiClient.delete(`/opportunities/${_id}/save`);
  },
};
