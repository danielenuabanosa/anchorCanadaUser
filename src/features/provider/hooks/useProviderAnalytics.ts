'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ShieldUser,
  Timer,
  UserCheck,
  UserSearch,
  Users,
  UserStar,
} from 'lucide-react';
import avatar1 from '@assets/images/profile-avatar.png';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';
import {
  ANALYTICS_INSIGHTS,
  ANALYTICS_STATS,
  APPLICATIONS_OVER_TIME,
  APPLICATIONS_OVER_TIME_Y_MAX,
  APPLICATION_FUNNEL,
  TEAM_PERFORMANCE,
  TOP_COUNTRIES,
  TOP_OPPORTUNITIES,
  TRAFFIC_SOURCES,
  type AnalyticsStat,
  type FunnelStep,
  type InsightDetail,
  type TeamPerformanceRow,
  type TopOpportunityRow,
  type TrafficSourceRow,
  type CountryRow,
} from '@/app/(app)/analytics/_components/analyticsData';

export type AnalyticsPeriod = '7d' | '30d' | '90d' | 'year';

export type ProviderAnalyticsData = {
  dateRangeLabel: string;
  stats: AnalyticsStat[];
  applicationsOverTime: Array<{ label: string; thisPeriod: number; lastPeriod: number }>;
  applicationsOverTimeYMax: number;
  funnel: FunnelStep[];
  topOpportunities: TopOpportunityRow[];
  teamPerformance: TeamPerformanceRow[];
  topCountries: CountryRow[];
  trafficSources: TrafficSourceRow[];
  insights: InsightDetail[];
};

type ApiAnalytics = {
  dateRangeLabel?: string;
  stats?: {
    totalViews?: { value: number; change: string };
    applications?: { value: number; change: string };
    conversionRate?: { value: string; change: string };
    interviewRate?: { value: string; change: string };
    acceptanceRate?: { value: string; change: string };
    activeOpportunities?: { value: number; change: string };
  };
  applicationsOverTime?: Array<{ label: string; thisPeriod: number; lastPeriod: number }>;
  applicationsOverTimeYMax?: number;
  funnel?: FunnelStep[];
  topOpportunities?: Array<{
    id: string;
    name: string;
    createdBy: string;
    type: string;
    views: number;
    applications: number;
    conversionRate: string;
    interviewRate: string;
    status: string;
  }>;
  teamPerformance?: Array<{
    id: string;
    name: string;
    email: string;
    applicationsReviewed: number;
    avgReviewTime: string;
    interviewsConducted: number;
  }>;
  topCountries?: CountryRow[];
  trafficSources?: TrafficSourceRow[];
  insights?: InsightDetail[];
};

function mapStats(api?: ApiAnalytics['stats']): AnalyticsStat[] {
  if (!api) return ANALYTICS_STATS;
  return [
    {
      label: 'Total Views',
      value: (api.totalViews?.value ?? 0).toLocaleString(),
      change: (api.totalViews?.change ?? '0%').replace(/^[+-]/, ''),
      changeNegative: (api.totalViews?.change ?? '').startsWith('-'),
      icon: Users,
      iconBg: 'bg-[#EFF4FF]',
      iconColor: 'text-[#2F66C8]',
    },
    {
      label: 'Applications',
      value: (api.applications?.value ?? 0).toLocaleString(),
      change: (api.applications?.change ?? '0%').replace(/^[+-]/, ''),
      changeNegative: (api.applications?.change ?? '').startsWith('-'),
      icon: UserCheck,
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#15803D]',
    },
    {
      label: 'Conversion Rate',
      value: api.conversionRate?.value ?? '0%',
      change: api.conversionRate?.change === '—' ? undefined : api.conversionRate?.change?.replace(/^[+-]/, ''),
      icon: Timer,
      iconBg: 'bg-[#FFF7ED]',
      iconColor: 'text-[#C2410C]',
    },
    {
      label: 'Interview Rate',
      value: api.interviewRate?.value ?? '0%',
      icon: ShieldUser,
      iconBg: 'bg-[#F4F1FE]',
      iconColor: 'text-[#7C3AED]',
    },
    {
      label: 'Acceptance Rate',
      value: api.acceptanceRate?.value ?? '0%',
      icon: UserSearch,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0369A1]',
    },
    {
      label: 'Active Opportunities',
      value: api.activeOpportunities?.value ?? 0,
      icon: UserStar,
      iconBg: 'bg-[#FDF4FF]',
      iconColor: 'text-[#9333EA]',
    },
  ];
}

function mapPayload(raw: ApiAnalytics | null): ProviderAnalyticsData {
  if (!raw) {
    return {
      dateRangeLabel: 'Last 30 days',
      stats: ANALYTICS_STATS,
      applicationsOverTime: [...APPLICATIONS_OVER_TIME],
      applicationsOverTimeYMax: APPLICATIONS_OVER_TIME_Y_MAX,
      funnel: APPLICATION_FUNNEL,
      topOpportunities: TOP_OPPORTUNITIES,
      teamPerformance: TEAM_PERFORMANCE,
      topCountries: TOP_COUNTRIES,
      trafficSources: TRAFFIC_SOURCES,
      insights: ANALYTICS_INSIGHTS,
    };
  }

  return {
    dateRangeLabel: raw.dateRangeLabel ?? 'Last 30 days',
    stats: mapStats(raw.stats),
    applicationsOverTime: raw.applicationsOverTime?.length
      ? raw.applicationsOverTime
      : [...APPLICATIONS_OVER_TIME],
    applicationsOverTimeYMax: raw.applicationsOverTimeYMax ?? APPLICATIONS_OVER_TIME_Y_MAX,
    funnel: raw.funnel?.length ? raw.funnel : APPLICATION_FUNNEL,
    topOpportunities: (raw.topOpportunities ?? []).map((o) => ({
      id: o.id,
      name: o.name,
      createdBy: o.createdBy,
      creatorAvatar: avatar1,
      type: (o.type as TopOpportunityRow['type']) || 'Internal',
      views: o.views,
      applications: o.applications,
      conversionRate: o.conversionRate,
      interviewRate: o.interviewRate,
      status: o.status === 'Paused' ? 'Paused' : 'Active',
    })),
    teamPerformance: (raw.teamPerformance ?? []).map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      avatar: avatar1,
      applicationsReviewed: m.applicationsReviewed,
      avgReviewTime: m.avgReviewTime,
      interviewsConducted: m.interviewsConducted,
    })),
    topCountries: raw.topCountries?.length ? raw.topCountries : TOP_COUNTRIES,
    trafficSources: raw.trafficSources?.length ? raw.trafficSources : TRAFFIC_SOURCES,
    insights: raw.insights?.length ? raw.insights : ANALYTICS_INSIGHTS,
  };
}

export function useProviderAnalytics(period: AnalyticsPeriod = '30d') {
  const [data, setData] = useState<ProviderAnalyticsData>(() => mapPayload(null));
  const [loading, setLoading] = useState(!isStaticMode());
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (isStaticMode()) {
      setData(mapPayload(null));
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const raw = (await providerApi.getAnalytics(period)) as ApiAnalytics;
      setData(mapPayload(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load analytics.');
      setData(mapPayload(null));
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    void load();
  }, [load]);

  const trafficPie = useMemo(
    () =>
      data.trafficSources.map((s) => ({
        name: s.label,
        value: parseFloat(s.percent) || 0,
        color: s.color,
      })),
    [data.trafficSources],
  );

  return { data, loading, error, refetch: load, trafficPie };
}
