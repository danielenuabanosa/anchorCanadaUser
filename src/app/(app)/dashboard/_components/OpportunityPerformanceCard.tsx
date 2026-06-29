'use client';

import { ChevronDown } from 'lucide-react';
import { ArrowUp, PERFORMANCE_METRICS } from './dashboardData';
import { PerformanceAreaChart } from './PerformanceAreaChart';

export function OpportunityPerformanceCard() {
  return (
    <div className="flex h-full min-h-[504px] flex-col overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="border-b border-[#EEF2F8] p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 flex-1 truncate text-base font-semibold leading-[1.8] text-[#0F172A]">
            Opportunity Performance
          </h3>
          <button
            type="button"
            className="inline-flex h-[34px] shrink-0 items-center gap-2.5 rounded-[6px] border border-[#EEF2F8] bg-white px-2.5 text-sm font-medium text-[#44516A]"
          >
            Last 7 Days
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-[#EEF2F8]">
        {PERFORMANCE_METRICS.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={`flex min-w-0 flex-1 flex-col gap-2 p-4 ${
                index < PERFORMANCE_METRICS.length - 1 ? 'border-r border-[#EEF2F8]' : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[#44516A]" strokeWidth={1.75} />
                <p className="truncate text-xs leading-4 text-[#44516A]">{metric.label}</p>
              </div>
              <p className="text-xl font-semibold leading-[26px] text-[#0F172A]">{metric.value}</p>
              <span className="inline-flex w-fit items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-[10px] leading-none text-[#15803D]">
                <ArrowUp className="h-2.5 w-2.5" />
                {metric.change}
              </span>
            </div>
          );
        })}
      </div>

      <PerformanceAreaChart />
    </div>
  );
}
