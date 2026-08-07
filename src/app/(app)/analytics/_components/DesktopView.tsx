'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download } from 'lucide-react';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { DateRangeTrigger } from '@/shared/components/ui/DatePicker';
import {
  useProviderAnalytics,
  type AnalyticsPeriod,
} from '@/features/provider/hooks/useProviderAnalytics';
import { AnalyticsDataProvider } from './AnalyticsDataContext';
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
import { ExportAnalyticsModal, InsightDetailModal } from './AnalyticsHubModals';

function periodFromLabel(label: string): AnalyticsPeriod {
  const lower = label.toLowerCase();
  if (lower.includes('7 day') || lower.includes('last 7')) return '7d';
  if (lower.includes('90 day') || lower.includes('last 90') || lower.includes('3 month')) return '90d';
  if (lower.includes('year') || lower.includes('12 month')) return 'year';
  return '30d';
}

export default function DesktopView() {
  const searchParams = useSearchParams();
  const demoState = searchParams.get('demo');
  const forceLoading = demoState === 'loading';

  const [period, setPeriod] = useState<AnalyticsPeriod>('30d');
  const { data, loading: apiLoading } = useProviderAnalytics(period);
  const loading = forceLoading || apiLoading;

  const [exportOpen, setExportOpen] = useState(demoState === 'export');
  const [insightId, setInsightId] = useState<string | null>(
    demoState === 'insight' ? (data.insights[0]?.id ?? null) : null,
  );
  const [dateRange, setDateRange] = useState(data.dateRangeLabel);

  const selectedInsight = useMemo(
    () => data.insights.find((insight) => insight.id === insightId) ?? null,
    [data.insights, insightId],
  );

  function openInsight(id: string) {
    setInsightId(id);
  }

  function openFirstInsight() {
    const first = data.insights[0];
    if (first) setInsightId(first.id);
  }

  function handleDateRangeChange(label: string) {
    setDateRange(label);
    setPeriod(periodFromLabel(label));
  }

  const displayRange = apiLoading ? dateRange : data.dateRangeLabel || dateRange;

  return (
    <AnalyticsDataProvider value={data}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Analytics</h1>
            <p className="text-base text-[#44516A]">
              Manage your organization&apos;s performance and optimize your opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <DateRangeTrigger value={displayRange} onChange={handleDateRangeChange} align="right" />
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
            {data.stats.map((stat) => (
              <HubStatCard key={stat.label} {...stat} subtext="from selected period" />
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

        <ExportAnalyticsModal open={exportOpen} onClose={() => setExportOpen(false)} />
        <InsightDetailModal
          open={Boolean(insightId)}
          insight={selectedInsight}
          onClose={() => setInsightId(null)}
        />
      </div>
    </AnalyticsDataProvider>
  );
}
