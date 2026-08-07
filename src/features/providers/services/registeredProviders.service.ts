import apiClient from '@/lib/api';
import { getApiErrorMessage } from '@/lib/apiError';
import type {
  ProviderDirectoryItem,
  ProviderFacets,
  ProviderListParams,
} from '../types';

export const registeredProvidersService = {
  async list(params: ProviderListParams = {}): Promise<{
    providers: ProviderDirectoryItem[];
    total: number;
    facets: ProviderFacets;
  }> {
    try {
      const { data } = await apiClient.get<{
        providers?: ProviderDirectoryItem[];
        data?: ProviderDirectoryItem[];
        total?: number;
        facets?: ProviderFacets;
      }>('/providers', { params });

      const providers = data.providers ?? data.data ?? [];
      return {
        providers,
        total: data.total ?? providers.length,
        facets: data.facets ?? { industries: [], provinces: [], orgTypes: [] },
      };
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Could not load registered providers.'));
    }
  },

  async getById(id: string): Promise<ProviderDirectoryItem> {
    try {
      const { data } = await apiClient.get<
        ProviderDirectoryItem | { data: ProviderDirectoryItem }
      >(`/providers/${id}`);
      return 'data' in data && data.data ? data.data : (data as ProviderDirectoryItem);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Could not load provider.'));
    }
  },
};
