'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Download } from 'lucide-react';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
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
  TeamPerformanceDesktop,
  TopOpportunitiesDesktop,
} from './AnalyticsSections';
import { AnalyticsFilterModal } from './AnalyticsFilterModal';
import { ExportAnalyticsModal, InsightDetailModal } from './AnalyticsHubModals';

export default function DesktopView() {
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
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Analytics</h1>
          <p className="text-base text-[#44516A]">
            Manage your organization&apos;s performance and optimize your opportunities.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
          >
            <CalendarDays className="h-[18px] w-[18px]" />
            {dateRange}
          </button>
          <button
            type="button"
            onClick={() => setExportOpen(true)}
            className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
          >
            <Download className="h-[18px] w-[18px]" />
            Export Report
          </button>
        </div>
      </div>

      {loading ? (
        <AnalyticsStatSkeletonGrid />
      ) : (
        <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-6">
          {ANALYTICS_STATS.map((stat) => (
            <HubStatCard key={stat.label} {...stat} subtext="from last 30 days" />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,571fr)_minmax(0,697fr)]">
        <ApplicationsOverTimeChart skeleton={loading} />
        <ApplicationFunnelPanel skeleton={loading} />
      </div>

      <TopOpportunitiesDesktop skeleton={loading} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,697fr)_minmax(0,571fr)]">
        <ApplicantDemographicsPanel skeleton={loading} />
        <TrafficSourcesPanel skeleton={loading} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,697fr)_minmax(0,571fr)]">
        <TeamPerformanceDesktop skeleton={loading} />
        <InsightsPanel
          skeleton={loading}
          onInsightClick={openInsight}
          onViewAllClick={openFirstInsight}
        />
      </div>

      <AnalyticsFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        dateRange={dateRange}
        onApply={(filters) => {
          setDateRange(filters.dateRange);
          setFilterOpen(false);
        }}
      />
      <ExportAnalyticsModal open={exportOpen} onClose={() => setExportOpen(false)} />
      <InsightDetailModal
        open={Boolean(insightId)}
        insight={selectedInsight}
        onClose={() => setInsightId(null)}
      />
    </div>
  );
}
