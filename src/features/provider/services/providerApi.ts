import apiClient from '@/lib/api';

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
  async saveOnboarding(data: Record<string, unknown>, markComplete = false) {
    const { data: result } = await apiClient.post('/provider/onboarding', { data, markComplete });
    return result;
  },

  async publishOpportunity(payload: PublishOpportunityPayload) {
    const { data } = await apiClient.post('/provider/opportunities', {
      ...payload,
      publish: payload.publish ?? true,
    });
    return data;
  },

  async listOpportunities() {
    const { data } = await apiClient.get<{ data: unknown[] }>('/provider/opportunities');
    return data.data;
  },

  async listApplications() {
    const { data } = await apiClient.get<{ data: unknown[] }>('/provider/applications');
    return data.data;
  },
};
