'use client';

import { useCallback, useEffect, useState } from 'react';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import {
  DEFAULT_OPPORTUNITY_DETAIL,
  type OpportunityDetail,
} from '@/app/(app)/opportunities/[id]/_components/opportunityDetailData';
import orgLogo from '@assets/images/prov-sickkids.png';
import avatar1 from '@assets/images/profile-avatar.png';

type ApiDetail = {
  id: string;
  title: string;
  description?: string;
  category?: string | null;
  uiStatus?: string;
  opportunityTypeLabel?: string;
  organization?: string;
  metrics?: OpportunityDetail['metrics'];
  pipeline?: OpportunityDetail['pipeline'];
  health?: OpportunityDetail['health'];
  details?: {
    benefits?: string;
    eligibility?: string;
    requirements?: string;
    location?: string;
    targetAudience?: string;
    template?: string;
    opens?: string;
    created?: string;
    published?: string;
    deadline?: string;
  };
  timeline?: OpportunityDetail['timeline'];
  recentApplicants?: Array<{
    id: string;
    name: string;
    applied: string;
    status: string;
    score: string;
  }>;
};

function mapDetail(api: ApiDetail): OpportunityDetail {
  const d = api.details ?? {};
  return {
    id: api.id,
    title: api.title,
    status: (api.uiStatus as OpportunityDetail['status']) ?? 'Draft',
    opportunityType: api.opportunityTypeLabel ?? 'Internal Opportunity',
    category: api.category ?? 'General',
    description: api.description || 'No description provided.',
    organization: api.organization ?? 'Your organization',
    created: d.created ?? '—',
    published: d.published ?? '—',
    deadline: d.deadline ?? '—',
    opens: d.opens ?? '—',
    targetAudience: d.targetAudience ?? 'Open',
    location: d.location ?? 'Canada',
    template: d.template ?? 'Custom',
    benefits: d.benefits ?? '—',
    eligibility: d.eligibility ?? '—',
    requirements: d.requirements ?? '—',
    logo: orgLogo,
    metrics: api.metrics ?? DEFAULT_OPPORTUNITY_DETAIL.metrics,
    pipeline: api.pipeline ?? DEFAULT_OPPORTUNITY_DETAIL.pipeline,
    health: api.health ?? DEFAULT_OPPORTUNITY_DETAIL.health,
    timeline: api.timeline ?? DEFAULT_OPPORTUNITY_DETAIL.timeline,
    recentApplicants: (api.recentApplicants ?? []).map((a) => ({
      ...a,
      avatar: avatar1,
    })),
  };
}

export function useOpportunityDetail(id: string) {
  const [data, setData] = useState<OpportunityDetail | null>(
    isStaticMode() ? DEFAULT_OPPORTUNITY_DETAIL : null,
  );
  const [loading, setLoading] = useState(!isStaticMode());
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (isStaticMode()) {
      setData({ ...DEFAULT_OPPORTUNITY_DETAIL, id });
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const api = (await providerApi.getOpportunity(id, true)) as ApiDetail | null;
      if (!api) {
        setError('Opportunity not found.');
        setData(null);
        return;
      }
      setData(mapDetail(api));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load opportunity.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) void load();
  }, [id, load]);

  return { data, loading, error, refetch: load };
}
