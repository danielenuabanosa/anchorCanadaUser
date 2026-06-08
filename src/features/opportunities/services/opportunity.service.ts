import apiClient from '@/lib/api';
import type { Opportunity, OpportunityFilters, PaginatedOpportunities } from '../types';

export const opportunityService = {
  async list(filters: OpportunityFilters = {}): Promise<PaginatedOpportunities> {
    const { data } = await apiClient.get<PaginatedOpportunities>('/opportunities', {
      params: filters,
    });
    return data;
  },

  async getById(id: string): Promise<Opportunity> {
    const { data } = await apiClient.get<Opportunity>(`/opportunities/${id}`);
    return data;
  },

  async getBySlug(slug: string): Promise<Opportunity> {
    const { data } = await apiClient.get<Opportunity>(`/opportunities/slug/${slug}`);
    return data;
  },

  async save(id: string): Promise<void> {
    await apiClient.post(`/opportunities/${id}/save`);
  },

  async unsave(id: string): Promise<void> {
    await apiClient.delete(`/opportunities/${id}/save`);
  },
};
