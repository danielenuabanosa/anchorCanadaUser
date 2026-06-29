'use client';

import { cn } from '@/lib/utils';
import { TEAM_ACTIVITY } from './dashboardData';
import { DashboardSectionHeader } from './DashboardSectionHeader';

interface TeamActivityListProps {
  className?: string;
}

export function TeamActivityList({ className }: TeamActivityListProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full min-w-0 flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <DashboardSectionHeader title="Team Activity" href="/dashboard#team" />

      <ul className="mt-5 flex flex-col">
        {TEAM_ACTIVITY.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex min-h-[80px] items-center py-3.5">
              <div className="flex w-full items-center gap-4">
                <span
                  className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border ${item.iconBg} ${item.iconBorder}`}
                >
                  <Icon className={`h-[26px] w-[26px] ${item.iconColor}`} strokeWidth={1.5} />
                </span>
                <div className="flex min-w-0 flex-1 items-end justify-between gap-4">
                  <p className="min-w-0 text-base leading-[21px] text-[#0F172A]">
                    <span className="font-semibold">{item.member}</span>{' '}
                    <span className="text-[#44516A]">{item.action}</span>
                  </p>
                  <span className="shrink-0 whitespace-nowrap text-sm leading-[18px] text-[#44516A]">
                    {item.time}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
