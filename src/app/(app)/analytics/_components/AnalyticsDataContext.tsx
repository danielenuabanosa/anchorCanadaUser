'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ProviderAnalyticsData } from '@/features/provider/hooks/useProviderAnalytics';
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
} from './analyticsData';

const fallback: ProviderAnalyticsData = {
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

const AnalyticsDataContext = createContext<ProviderAnalyticsData>(fallback);

export function AnalyticsDataProvider({
  value,
  children,
}: {
  value: ProviderAnalyticsData;
  children: ReactNode;
}) {
  return <AnalyticsDataContext.Provider value={value}>{children}</AnalyticsDataContext.Provider>;
}

export function useAnalyticsData() {
  return useContext(AnalyticsDataContext);
}
