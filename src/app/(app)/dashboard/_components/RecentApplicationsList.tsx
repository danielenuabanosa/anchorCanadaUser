'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { RECENT_APPLICATIONS, STATUS_STYLES } from './dashboardData';
import { DashboardSectionHeader } from './DashboardSectionHeader';

interface RecentApplicationsListProps {
  className?: string;
}

export function RecentApplicationsList({ className }: RecentApplicationsListProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full min-w-0 flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <DashboardSectionHeader title="Recent Applications" href="/applications" />

      <ul className="mt-5 flex flex-col">
        {RECENT_APPLICATIONS.map((app) => (
          <li key={app.id} className="flex min-h-[80px] items-center py-3.5">
            <div className="flex w-full items-center gap-4">
              <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
                <Image src={app.avatar} alt="" width={52} height={52} className="h-full w-full object-cover" />
              </div>

              <div className="flex min-w-0 flex-1 items-end justify-between gap-4">
                <div className="min-w-0 pr-2">
                  <p className="truncate text-base font-medium leading-[21px] text-[#0F172A]">{app.applicant}</p>
                  <p className="mt-1 truncate text-sm leading-[18px] text-[#44516A]">
                    Applied for {app.appliedFor}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-5">
                  <span className="whitespace-nowrap text-sm leading-[18px] text-[#44516A]">{app.timeLabel}</span>
                  <span
                    className={`whitespace-nowrap rounded-[4px] px-1.5 py-0.5 text-sm font-medium leading-[18px] ${STATUS_STYLES[app.status]}`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
