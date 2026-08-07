import apiClient from '@/lib/api';
import type { Opportunity, OpportunityFilters, PaginatedOpportunities } from '../types';
import type { ExploreMeta } from './explore.types';

export type { ExploreMeta };

export const opportunityService = {
  async getExploreMeta(): Promise<ExploreMeta> {
    const { data } = await apiClient.get<ExploreMeta>('/opportunities/explore-meta');
    return data;
  },

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

  async save(_id: string): Promise<void> {
    await apiClient.post(`/opportunities/${_id}/save`);
  },

  async unsave(_id: string): Promise<void> {
    await apiClient.delete(`/opportunities/${_id}/save`);
  },
};
