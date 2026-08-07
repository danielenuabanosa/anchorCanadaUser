'use client';

import { useEffect, useState } from 'react';
import {
  providerApi,
  type ProviderHubOverview,
} from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import avatar1 from '@assets/images/profile-avatar.png';
import type { RecentActivity } from '@/app/(app)/opportunities/_components/opportunitiesHubData';
import { RECENT_ACTIVITY } from '@/app/(app)/opportunities/_components/opportunitiesHubData';

export function useProviderOpportunitiesOverview() {
  const [overview, setOverview] = useState<ProviderHubOverview | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(() =>
    isStaticMode() ? RECENT_ACTIVITY.map((item) => ({ ...item })) : [],
  );
  const [loading, setLoading] = useState(!isStaticMode());
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (isStaticMode()) {
        setRecentActivity(RECENT_ACTIVITY.map((item) => ({ ...item })));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const data = await providerApi.getOpportunitiesOverview();
        if (cancelled) return;
        setOverview(data);
        setRecentActivity(
          data.recentActivity.map((item) => ({
            id: item.id,
            name: item.name,
            action: item.action,
            time: item.time,
            status: item.status,
            avatar: avatar1,
          })),
        );
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Could not load overview.');
        setOverview(null);
        setRecentActivity([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { overview, recentActivity, loading, error };
}
