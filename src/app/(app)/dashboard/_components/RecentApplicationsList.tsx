'use client';

import { cn } from '@/lib/utils';
import { STATUS_STYLES, type ApplicationStatus } from './dashboardData';
import { DashboardSectionHeader } from './DashboardSectionHeader';
import { Pulse } from '@/shared/components/ui/PageSkeletons';

type RecentApp = {
  id: string;
  applicant: string;
  appliedFor: string;
  status: string;
  timeLabel: string;
};

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'A'
  );
}

export function RecentApplicationsList({
  className,
  items = [],
  loading,
  error,
}: {
  className?: string;
  items?: RecentApp[];
  loading?: boolean;
  error?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-full w-full min-w-0 flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        className,
      )}
    >
      <DashboardSectionHeader title="Recent Applications" href="/applications" />

      <ul className="mt-5 flex flex-col">
        {loading ? (
          <li className="flex flex-col gap-3 py-2" aria-hidden>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <Pulse className="h-10 w-10 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Pulse className="h-3.5 w-32 rounded" />
                  <Pulse className="h-3 w-40 rounded" />
                </div>
                <Pulse className="h-6 w-20 rounded" />
              </div>
            ))}
          </li>
        ) : error ? (
          <li className="py-8 text-sm text-[#B91C1C]">{error}</li>
        ) : items.length === 0 ? (
          <li className="py-8 text-sm text-[#8C97AD]">No applications yet.</li>
        ) : (
          items.map((app) => {
            const status = app.status as ApplicationStatus;
            return (
              <li key={app.id} className="flex min-h-[80px] items-center py-3.5">
                <div className="flex w-full items-center gap-4">
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#EFF4FF] text-sm font-semibold text-[#2F66C8]">
                    {initials(app.applicant)}
                  </div>

                  <div className="flex min-w-0 flex-1 items-end justify-between gap-4">
                    <div className="min-w-0 pr-2">
                      <p className="truncate text-base font-medium leading-[21px] text-[#0F172A]">
                        {app.applicant}
                      </p>
                      <p className="mt-1 truncate text-sm leading-[18px] text-[#44516A]">
                        Applied for {app.appliedFor}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-5">
                      <span className="whitespace-nowrap text-sm leading-[18px] text-[#44516A]">
                        {app.timeLabel}
                      </span>
                      <span
                        className={`whitespace-nowrap rounded-[4px] px-1.5 py-0.5 text-sm font-medium leading-[18px] ${STATUS_STYLES[status] ?? STATUS_STYLES['Under Review']}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
