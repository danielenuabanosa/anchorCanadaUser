import apiClient from '@/lib/api';
import { isStaticMode } from '@/lib/staticMode';
import {
  MOCK_API_PROVIDER_APPLICATIONS,
  MOCK_API_PROVIDER_OPPORTUNITIES,
} from '@/lib/mockData';

export interface PublishOpportunityPayload {
  title: string;
  description?: string;
  opportunityType: 'internal' | 'external' | 'express-interest';
  category?: string | null;
  template?: string | null;
  location?: string;
  province?: string;
  tags?: string[];
  builderPayload: Record<string, unknown>;
  publish?: boolean;
}

export const providerApi = {
  async saveOnboarding(_data: Record<string, unknown>, _markComplete = false) {
    if (isStaticMode()) return { ok: true };
    const { data: result } = await apiClient.post('/provider/onboarding', {
      data: _data,
      markComplete: _markComplete,
    });
    return result;
  },

  async publishOpportunity(payload: PublishOpportunityPayload) {
    if (isStaticMode()) {
      return {
        id: `opp-static-${Date.now()}`,
        title: payload.title,
        status: payload.publish === false ? 'draft' : 'published',
      };
    }

    const { data } = await apiClient.post('/provider/opportunities', {
      ...payload,
      publish: payload.publish ?? true,
    });
    return data;
  },

  async listOpportunities() {
    if (isStaticMode()) return MOCK_API_PROVIDER_OPPORTUNITIES;

    const { data } = await apiClient.get<{ data: unknown[] }>('/provider/opportunities');
    return data.data;
  },

  async listApplications() {
    if (isStaticMode()) return MOCK_API_PROVIDER_APPLICATIONS;

    const { data } = await apiClient.get<{ data: unknown[] }>('/provider/applications');
    return data.data;
  },
};
