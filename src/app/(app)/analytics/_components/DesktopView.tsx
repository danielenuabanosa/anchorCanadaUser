'use client';

import { useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DateRangeDropdown,
  type DateRangeOption,
} from '@/shared/components/hub/DateRangeDropdown';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { PerformanceAreaChart } from '@/app/(app)/dashboard/_components/PerformanceAreaChart';
import {
  ANALYTICS_STATS,
  ANALYTICS_TABS,
  TOP_OPPORTUNITIES,
  type AnalyticsTab,
} from './analyticsData';
import { AnalyticsFilterModal } from './AnalyticsFilterModal';

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview');
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeOption>('Last 30 days');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Analytics</h1>
          <p className="text-base text-[#44516A]">
            Track performance across opportunities, applications, and engagement.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setDateOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
            >
              {dateRange}
              <ChevronDown className="h-[18px] w-[18px]" />
            </button>
            <DateRangeDropdown
              open={dateOpen}
              onClose={() => setDateOpen(false)}
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
          >
            Filter
            <ChevronDown className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
          >
            <Download className="h-[18px] w-[18px]" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-6">
        {ANALYTICS_STATS.map((stat) => (
          <HubStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex gap-2.5 overflow-x-auto border-b border-[#EEF2F8] px-2.5">
          {ANALYTICS_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'shrink-0 px-2.5 py-3.5 text-sm',
                activeTab === tab.id
                  ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                  : 'text-[#0F172A]',
              )}
            >
              {tab.label}
              {tab.count > 0 ? ` (${tab.count.toLocaleString()})` : ''}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'overview' && (
            <>
              <h2 className="mb-4 text-lg font-medium text-[#0F172A]">Performance Overview</h2>
              <PerformanceAreaChart />
            </>
          )}
          {activeTab === 'opportunities' && (
            <>
              <h2 className="mb-4 text-lg font-medium text-[#0F172A]">Opportunity Performance</h2>
              <p className="mb-4 text-sm text-[#44516A]">24 active opportunities with 48,290 total views this period.</p>
              <PerformanceAreaChart />
            </>
          )}
          {activeTab === 'applications' && (
            <>
              <h2 className="mb-4 text-lg font-medium text-[#0F172A]">Application Trends</h2>
              <p className="mb-4 text-sm text-[#44516A]">1,284 applications received with a 12% increase from last month.</p>
              <PerformanceAreaChart />
            </>
          )}
          {activeTab === 'engagement' && (
            <>
              <h2 className="mb-4 text-lg font-medium text-[#0F172A]">Engagement Metrics</h2>
              <p className="mb-4 text-sm text-[#44516A]">4.8% click-through rate and 2.6% conversion rate across all opportunities.</p>
              <PerformanceAreaChart />
            </>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="border-b border-[#EEF2F8] px-5 py-4">
          <h2 className="text-lg font-medium text-[#0F172A]">Top Performing Opportunities</h2>
        </div>
        <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[1.6fr_100px_120px_100px_120px] md:gap-2.5">
          {['Opportunity', 'Views', 'Applications', 'Conversion', 'Engagement'].map((col) => (
            <p key={col} className="py-3.5 text-sm font-medium text-[#0F172A]">
              {col}
            </p>
          ))}
        </div>
        <div className="divide-y divide-[#EEF2F8] px-5">
          {TOP_OPPORTUNITIES.map((row) => (
            <div
              key={row.id}
              className="grid gap-2 py-4 md:grid-cols-[1.6fr_100px_120px_100px_120px] md:items-center md:gap-2.5"
            >
              <p className="text-sm font-medium text-[#0F172A]">{row.name}</p>
              <p className="text-sm text-[#44516A]">{row.views.toLocaleString()}</p>
              <p className="text-sm text-[#44516A]">{row.applications}</p>
              <p className="text-sm text-[#44516A]">{row.conversion}</p>
              <span
                className={cn(
                  'inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium',
                  row.engagement === 'High' && 'bg-[#ECFDF5] text-[#15803D]',
                  row.engagement === 'Moderate' && 'bg-[#FFF7ED] text-[#C2410C]',
                  row.engagement === 'Low' && 'bg-[#F1F5F9] text-[#64748B]',
                )}
              >
                {row.engagement}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnalyticsFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        dateRange={dateRange}
        onApply={() => setFilterOpen(false)}
      />
    </div>
  );
}
