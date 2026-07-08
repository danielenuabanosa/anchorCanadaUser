'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RECENT_TEAM_ACTIVITY, TEAM_PERFORMANCE_METRICS } from './teamManagementData';

export function RecentTeamActivityPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Recent Applications</h3>
        <Link href="/applications" className="text-sm font-medium text-[#2F66C8]">
          View All
        </Link>
      </div>

      <ul className="mt-5 flex flex-col">
        {RECENT_TEAM_ACTIVITY.map((item) => (
          <li key={item.id} className="border-b border-[#EEF2F8] py-3.5 last:border-b-0">
            <div className="flex items-center gap-4">
              <Image
                src={item.avatar}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <p className="min-w-0 text-sm text-[#0F172A]">
                  <span className="font-medium">{item.memberName}</span>{' '}
                  <span className="text-[#44516A]">{item.action}</span>
                </p>
                <div className="flex shrink-0 items-center gap-5">
                  <span className="whitespace-nowrap text-sm text-[#44516A]">{item.timeLabel}</span>
                  {item.isNew ? (
                    <span className="rounded-[4px] border border-[#DCE7FF] bg-[#EFF4FF] px-1.5 py-0.5 text-sm font-medium text-[#2F66C8]">
                      New
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TeamPerformancePanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Team Performance</h3>
        <button
          type="button"
          className="inline-flex items-center gap-4 rounded-[6px] border border-[#EEF2F8] bg-white px-2.5 py-1.5 text-sm text-[#0F172A]"
        >
          This Month
          <ChevronDown className="h-3.5 w-3.5 text-[#44516A]" />
        </button>
      </div>

      <ul className="mt-5 flex flex-col">
        {TEAM_PERFORMANCE_METRICS.map((metric) => (
          <li key={metric.label} className="flex items-center gap-4 py-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-[#F8FAFC]">
              <metric.icon className="h-5 w-5 text-[#44516A]" strokeWidth={1.75} />
            </div>
            <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs text-[#8C97AD]">{metric.label}</p>
                <p className="truncate text-base font-semibold text-[#0F172A]">{metric.value}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">
                <ArrowUp className="h-3.5 w-3.5" />
                {metric.change}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TeamHubBottomSections() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_571px]">
      <RecentTeamActivityPanel />
      <TeamPerformancePanel />
    </div>
  );
}
