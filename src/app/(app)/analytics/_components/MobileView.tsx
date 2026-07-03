'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { MobileHubStatGrid } from '@/app/(app)/opportunities/_components/MobileHubStatGrid';
import { MobileHubTabs } from '@/app/(app)/opportunities/_components/MobileHubTabs';
import { PerformanceAreaChart } from '@/app/(app)/dashboard/_components/PerformanceAreaChart';
import {
  ANALYTICS_STATS,
  ANALYTICS_TABS,
  TOP_OPPORTUNITIES,
  type AnalyticsTab,
} from './analyticsData';
import { AnalyticsFilterModal } from './AnalyticsFilterModal';

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-col pb-4">
      <MobileHubPageHero
        title="Analytics"
        subtitle="Track performance across opportunities, applications, and engagement."
        action={
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A]"
          >
            Filter & Date Range
            <ChevronDown className="h-4 w-4" />
          </button>
        }
      />

      <section className="py-5">
        <MobileHubStatGrid stats={ANALYTICS_STATS.slice(0, 4)} />
      </section>

      <section className="py-5">
        <MobileHubTabs
          tabs={ANALYTICS_TABS.map((t) => ({ id: t.id, label: t.label, count: t.count }))}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </section>

      <div className="mt-5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <h2 className="mb-3 text-base font-medium text-[#0F172A]">
          {activeTab === 'overview' && 'Performance Overview'}
          {activeTab === 'opportunities' && 'Opportunity Performance'}
          {activeTab === 'applications' && 'Application Trends'}
          {activeTab === 'engagement' && 'Engagement Metrics'}
        </h2>
        <PerformanceAreaChart />
      </div>

      <div className="mt-5 rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="border-b border-[#EEF2F8] px-4 py-3">
          <h2 className="text-base font-medium text-[#0F172A]">Top Opportunities</h2>
        </div>
        <div className="divide-y divide-[#EEF2F8]">
          {TOP_OPPORTUNITIES.map((row) => (
            <div key={row.id} className="flex flex-col gap-1 px-4 py-4">
              <p className="text-sm font-medium text-[#0F172A]">{row.name}</p>
              <p className="text-xs text-[#44516A]">
                {row.views.toLocaleString()} views · {row.applications} applications · {row.conversion}
              </p>
            </div>
          ))}
        </div>
      </div>

      <AnalyticsFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        mobile
        onApply={() => setFilterOpen(false)}
      />
    </div>
  );
}
