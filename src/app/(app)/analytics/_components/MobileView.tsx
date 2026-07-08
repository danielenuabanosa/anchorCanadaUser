'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Download } from 'lucide-react';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { ANALYTICS_DATE_RANGE, ANALYTICS_INSIGHTS, ANALYTICS_STATS } from './analyticsData';
import {
  ApplicantDemographicsPanel,
  ApplicationFunnelPanel,
  ApplicationsOverTimeChart,
  InsightsPanel,
  TrafficSourcesPanel,
} from './AnalyticsChartPanels';
import {
  AnalyticsStatSkeletonGrid,
  TeamPerformanceMobile,
  TopOpportunitiesMobile,
} from './AnalyticsSections';
import { AnalyticsFilterModal } from './AnalyticsFilterModal';
import { ExportAnalyticsModal, InsightDetailModal } from './AnalyticsHubModals';

export default function MobileView() {
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [insightId, setInsightId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState(ANALYTICS_DATE_RANGE);

  const selectedInsight = useMemo(
    () => ANALYTICS_INSIGHTS.find((insight) => insight.id === insightId) ?? null,
    [insightId],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  function openInsight(id: string) {
    setInsightId(id);
  }

  function openFirstInsight() {
    const first = ANALYTICS_INSIGHTS[0];
    if (first) setInsightId(first.id);
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <MobileHubPageHero
        title="Analytics"
        subtitle="Manage your organization's performance and optimize your opportunities."
        action={
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A]"
            >
              <CalendarDays className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">{dateRange}</span>
            </button>
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A]"
            >
              <Download className="h-[18px] w-[18px]" />
              Export Report
            </button>
          </div>
        }
      />

      {loading ? (
        <AnalyticsStatSkeletonGrid mobile />
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {ANALYTICS_STATS.map((stat) => (
            <HubStatCard key={stat.label} {...stat} subtext="from last 30 days" />
          ))}
        </div>
      )}

      <ApplicationsOverTimeChart skeleton={loading} />
      <ApplicationFunnelPanel skeleton={loading} mobile />
      <TopOpportunitiesMobile skeleton={loading} />
      <ApplicantDemographicsPanel skeleton={loading} />
      <TrafficSourcesPanel skeleton={loading} />
      <TeamPerformanceMobile skeleton={loading} />
      <InsightsPanel
        skeleton={loading}
        onInsightClick={openInsight}
        onViewAllClick={openFirstInsight}
      />

      <AnalyticsFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        mobile
        dateRange={dateRange}
        onApply={(filters) => {
          setDateRange(filters.dateRange);
          setFilterOpen(false);
        }}
      />
      <ExportAnalyticsModal open={exportOpen} onClose={() => setExportOpen(false)} mobile />
      <InsightDetailModal
        open={Boolean(insightId)}
        insight={selectedInsight}
        onClose={() => setInsightId(null)}
        mobile
      />
    </div>
  );
}
