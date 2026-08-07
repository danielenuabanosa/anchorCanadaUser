'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  providerApi,
  type ProviderDashboardResponse,
} from '@/features/provider/services/providerApi';
import {
  ACTIVE_OPPORTUNITIES,
  DASHBOARD_DATE_RANGE,
  ORG_STATUS,
  PERFORMANCE_CHART,
  PERFORMANCE_METRICS,
  PROVIDER_STATS,
  RECENT_APPLICATIONS,
  TEAM_ACTIVITY,
} from '@/app/(app)/dashboard/_components/dashboardData';
import { isStaticMode } from '@/lib/staticMode';

function staticDashboard(): ProviderDashboardResponse {
  return {
    organizationName: 'your organization',
    dateRangeLabel: DASHBOARD_DATE_RANGE,
    stats: {
      activeListings: {
        value: Number(PROVIDER_STATS[0].value),
        changePct: PROVIDER_STATS[0].changePct,
      },
      totalApplicants: {
        value: Number(String(PROVIDER_STATS[1].value).replace(/,/g, '')),
        changePct: PROVIDER_STATS[1].changePct,
      },
      engagementRate: {
        value: String(PROVIDER_STATS[2].value),
        changePct: PROVIDER_STATS[2].changePct,
      },
      activeMembers: {
        value: Number(PROVIDER_STATS[3].value),
        changePct: PROVIDER_STATS[3].changePct,
      },
    },
    organizationStatus: {
      verification: ORG_STATUS.verification,
      verificationStatus: 'verified',
      profileComplete: ORG_STATUS.profileComplete,
      memberSince: ORG_STATUS.memberSince,
    },
    performance: {
      metrics: {
        views: { value: PERFORMANCE_METRICS[0].value, change: PERFORMANCE_METRICS[0].change },
        saves: { value: PERFORMANCE_METRICS[1].value, change: PERFORMANCE_METRICS[1].change },
        applications: {
          value: PERFORMANCE_METRICS[2].value,
          change: PERFORMANCE_METRICS[2].change,
        },
        conversionRate: {
          value: PERFORMANCE_METRICS[3].value,
          change: PERFORMANCE_METRICS[3].change,
        },
      },
      chart: PERFORMANCE_CHART.map((row) => ({ ...row })),
    },
    activeOpportunities: ACTIVE_OPPORTUNITIES.map((row) => ({ ...row })),
    recentApplications: RECENT_APPLICATIONS.map((row) => ({
      id: row.id,
      applicant: row.applicant,
      appliedFor: row.appliedFor,
      status: row.status,
      timeLabel: row.timeLabel,
      avatarUrl: null,
    })),
    teamActivity: TEAM_ACTIVITY.map((row) => ({
      id: row.id,
      member: row.member,
      action: row.action,
      time: row.time,
      createdAt: new Date().toISOString(),
      kind: 'edit' as const,
    })),
  };
}

export function useProviderDashboard(initialPeriod = '7d') {
  const [period, setPeriod] = useState(initialPeriod);
  const [data, setData] = useState<ProviderDashboardResponse | null>(() =>
    isStaticMode() ? staticDashboard() : null,
  );
  const [loading, setLoading] = useState(!isStaticMode());
  const [error, setError] = useState('');

  const load = useCallback(async (nextPeriod: string) => {
    if (isStaticMode()) {
      setData(staticDashboard());
      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const dashboard = await providerApi.getDashboard(nextPeriod);
      setData(dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load dashboard.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(period);
  }, [load, period]);

  return {
    data,
    loading,
    error,
    period,
    setPeriod,
    refetch: () => load(period),
  };
}
