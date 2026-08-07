'use client';

import { useState } from 'react';
import { Clock, Eye, Heart, UserRound } from 'lucide-react';
import { HubMenuSelect } from '@/shared/components/hub/HubMenuSelect';
import { ArrowUp } from './dashboardData';
import { PerformanceAreaChart } from './PerformanceAreaChart';

const PERFORMANCE_PERIOD_OPTIONS = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'year', label: 'This Year' },
] as const;

type Metric = { value: string; change: string };
type ChartPoint = { label: string; views: number; saves: number; applications: number };

export function OpportunityPerformanceCard({
  period,
  onPeriodChange,
  metrics,
  chart,
  loading,
}: {
  period?: string;
  onPeriodChange?: (period: string) => void;
  metrics?: {
    views: Metric;
    saves: Metric;
    applications: Metric;
    conversionRate: Metric;
  };
  chart?: ChartPoint[];
  loading?: boolean;
}) {
  const [localPeriod, setLocalPeriod] = useState<string>(PERFORMANCE_PERIOD_OPTIONS[0].value);
  const activePeriod = period ?? localPeriod;

  function handlePeriodChange(next: string) {
    if (onPeriodChange) onPeriodChange(next);
    else setLocalPeriod(next);
  }

  const rows = [
    { label: 'Views', icon: Eye, ...(metrics?.views ?? { value: '—', change: '0%' }) },
    { label: 'Saves', icon: Heart, ...(metrics?.saves ?? { value: '—', change: '0%' }) },
    {
      label: 'Applications',
      icon: UserRound,
      ...(metrics?.applications ?? { value: '—', change: '0%' }),
    },
    {
      label: 'Conv. Rates',
      icon: Clock,
      ...(metrics?.conversionRate ?? { value: '—', change: '0%' }),
    },
  ];

  return (
    <div className="flex h-full min-h-[504px] flex-col overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="border-b border-[#EEF2F8] p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 flex-1 truncate text-base font-semibold leading-[1.8] text-[#0F172A]">
            Opportunity Performance
          </h3>
          <HubMenuSelect
            variant="chip"
            value={activePeriod}
            onChange={handlePeriodChange}
            options={[...PERFORMANCE_PERIOD_OPTIONS]}
            aria-label="Performance period"
            className="shrink-0 [&_button]:h-[34px] [&_button]:px-2.5 [&_button]:text-sm [&_button]:font-medium [&_button]:text-[#44516A]"
            menuClassName="right-0 left-auto w-[180px]"
          />
        </div>
      </div>

      <div className="flex border-b border-[#EEF2F8]">
        {rows.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={`flex min-w-0 flex-1 flex-col gap-2 p-4 ${
                index < rows.length - 1 ? 'border-r border-[#EEF2F8]' : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[#44516A]" strokeWidth={1.75} />
                <p className="truncate text-xs leading-4 text-[#44516A]">{metric.label}</p>
              </div>
              <p className="text-xl font-semibold leading-[26px] text-[#0F172A]">
                {loading ? '…' : metric.value}
              </p>
              <span className="inline-flex w-fit items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-[10px] leading-none text-[#15803D]">
                <ArrowUp className="h-2.5 w-2.5" />
                {metric.change}
              </span>
            </div>
          );
        })}
      </div>

      <PerformanceAreaChart key={activePeriod} data={chart} />
    </div>
  );
}
