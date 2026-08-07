'use client';

import { cn } from '@/lib/utils';

/** Figma 492:1253 — pulse block (#EEF2F8) */
export function Pulse({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded bg-[#EEF2F8]', className)}
    />
  );
}

/** Stat / metric cards row (Figma hub loading) */
export function StatCardsSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('grid gap-5', className)}
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Pulse key={i} className="h-[104px] w-full rounded-lg" />
      ))}
    </div>
  );
}

export function StatCardsSkeletonMobile({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-2.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <Pulse key={i} className="h-[120px] min-w-0 flex-1 rounded-[8px]" />
      ))}
    </div>
  );
}

/** Search + filter chips row */
export function FilterBarSkeleton({ chips = 5 }: { chips?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5" aria-hidden="true">
      <Pulse className="h-[45px] min-w-[200px] flex-1 rounded-[6px]" />
      {Array.from({ length: chips }).map((_, i) => (
        <Pulse key={i} className="h-[45px] w-[140px] rounded-[6px]" />
      ))}
    </div>
  );
}

/**
 * Figma 492:1253 — table rows: checkbox, avatar + bars, column bars, action.
 * Use when the page layout is tabular; otherwise prefer list/card skeletons.
 */
export function TableRowsSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-0 p-5" aria-hidden="true" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[40px_minmax(0,1.2fr)_minmax(0,1fr)_120px_100px_40px] items-center gap-2.5 border-b border-[#EEF2F8] py-3.5 last:border-0"
        >
          <Pulse className="h-[18px] w-[18px] rounded-[4px]" />
          <div className="flex items-center gap-2.5">
            <Pulse className="h-10 w-10 shrink-0 rounded-full" />
            <div className="space-y-2">
              <Pulse className="h-3.5 w-28 rounded" />
              <Pulse className="h-3 w-20 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <Pulse className="h-3.5 w-36 max-w-full rounded" />
            <Pulse className="h-5 w-16 rounded" />
          </div>
          <div className="space-y-2">
            <Pulse className="h-3.5 w-24 rounded" />
            <Pulse className="h-3 w-14 rounded" />
          </div>
          <Pulse className="h-6 w-24 rounded-[4px]" />
          <Pulse className="h-8 w-8 rounded-[6px]" />
        </div>
      ))}
    </div>
  );
}

/** User applications — vertical cards matching ApplicationCard layout */
export function ApplicationCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-[30px]" aria-hidden="true" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <div className="flex flex-col gap-5 border-b border-[#EEF2F8] p-5">
            <div className="flex items-center justify-between gap-3">
              <Pulse className="h-6 w-24 rounded" />
              <div className="flex items-center gap-5">
                <Pulse className="h-3 w-28 rounded" />
                <Pulse className="h-[45px] w-[110px] rounded-[6px]" />
                <Pulse className="h-8 w-8 rounded-[6px]" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Pulse className="h-12 w-12 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Pulse className="h-4 w-2/3 max-w-[280px] rounded" />
                <Pulse className="h-3 w-40 rounded" />
              </div>
            </div>
          </div>
          <div className="flex gap-8 p-5">
            <div className="space-y-2">
              <Pulse className="h-3 w-16 rounded" />
              <Pulse className="h-3.5 w-24 rounded" />
            </div>
            <div className="space-y-2">
              <Pulse className="h-3 w-16 rounded" />
              <Pulse className="h-3.5 w-28 rounded" />
            </div>
            <div className="space-y-2">
              <Pulse className="h-3 w-20 rounded" />
              <Pulse className="h-3.5 w-20 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ApplicationCardsSkeletonMobile({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-5" aria-hidden="true" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
          <div className="flex gap-4">
            <Pulse className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Pulse className="h-4 w-32 rounded" />
              <Pulse className="h-3 w-48 max-w-full rounded" />
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <Pulse className="h-6 w-24 rounded" />
            <Pulse className="h-4 w-28 rounded" />
          </div>
          <Pulse className="mt-5 h-10 w-full rounded-[6px]" />
        </div>
      ))}
    </div>
  );
}

/** Opportunities explore — list rows */
export function OpportunityListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div
      className="overflow-hidden rounded-[10px] border border-[#EEF2F8]"
      aria-hidden="true"
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-5 border-b border-[#EEF2F8] bg-white p-5 last:border-b-0"
        >
          <div className="flex items-center justify-between">
            <Pulse className="h-7 w-16 rounded-[6px]" />
            <Pulse className="h-11 w-11 rounded-[6px]" />
          </div>
          <div className="flex items-center gap-[26px]">
            <Pulse className="h-14 w-14 shrink-0 rounded-[10px]" />
            <div className="min-w-0 flex-1 space-y-5">
              <div className="space-y-2">
                <Pulse className="h-5 w-3/4 max-w-[360px] rounded" />
                <Pulse className="h-3 w-48 max-w-full rounded" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Pulse className="h-6 w-20 rounded" />
                <Pulse className="h-6 w-24 rounded" />
                <Pulse className="h-6 w-16 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OpportunityListSkeletonMobile({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
          <div className="mb-3 flex justify-between">
            <Pulse className="h-6 w-14 rounded" />
            <Pulse className="h-8 w-8 rounded-[6px]" />
          </div>
          <div className="flex gap-3">
            <Pulse className="h-12 w-12 shrink-0 rounded-[8px]" />
            <div className="flex-1 space-y-2">
              <Pulse className="h-4 w-full rounded" />
              <Pulse className="h-3 w-2/3 rounded" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Pulse className="h-5 w-16 rounded" />
            <Pulse className="h-5 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Saved / dashboard card grids */
export function OpportunityGridSkeleton({
  count = 6,
  columns = 'md:grid-cols-2 xl:grid-cols-3',
}: {
  count?: number;
  columns?: string;
}) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-5', columns)}
      aria-hidden="true"
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-3.5">
              <Pulse className="h-6 w-20 rounded" />
              <Pulse className="h-4 w-3/4 rounded" />
            </div>
            <Pulse className="h-9 w-9 shrink-0 rounded-[6px]" />
          </div>
          <div className="flex items-center gap-3">
            <Pulse className="h-10 w-10 shrink-0 rounded-full" />
            <div className="space-y-2">
              <Pulse className="h-3.5 w-28 rounded" />
              <Pulse className="h-3 w-20 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <Pulse className="h-5 w-16 rounded" />
            <Pulse className="h-5 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Provider / organisation cards */
export function ProviderGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-5"
      aria-hidden="true"
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <Pulse className="h-14 w-14 rounded-full" />
            <Pulse className="h-4 w-24 rounded" />
            <Pulse className="h-3 w-16 rounded" />
            <Pulse className="mt-2 h-8 w-full rounded-[6px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Notifications list */
export function NotificationListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2.5" aria-hidden="true" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex gap-3 rounded-[10px] border border-[#EEF2F8] bg-white p-4"
        >
          <Pulse className="h-10 w-10 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Pulse className="h-3.5 w-3/4 max-w-[320px] rounded" />
            <Pulse className="h-3 w-full max-w-[420px] rounded" />
            <Pulse className="h-3 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Messages inbox rows */
export function MessagesInboxSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul aria-hidden="true" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex gap-3 border-b border-[#EEF2F8] p-4">
          <Pulse className="h-12 w-12 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex justify-between gap-2">
              <Pulse className="h-3.5 w-28 rounded" />
              <Pulse className="h-3 w-10 rounded" />
            </div>
            <Pulse className="h-3 w-full rounded" />
            <Pulse className="h-3 w-2/3 rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MessagesThreadSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6" aria-hidden="true" role="status" aria-label="Loading">
      <div className="flex items-center gap-3 border-b border-[#EEF2F8] pb-4">
        <Pulse className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Pulse className="h-4 w-36 rounded" />
          <Pulse className="h-3 w-24 rounded" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Pulse className="ml-auto h-12 w-[55%] rounded-[10px]" />
        <Pulse className="h-12 w-[50%] rounded-[10px]" />
        <Pulse className="ml-auto h-10 w-[40%] rounded-[10px]" />
        <Pulse className="h-14 w-[60%] rounded-[10px]" />
      </div>
    </div>
  );
}

/** Profile tab content */
export function ProfileContentSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden="true" role="status" aria-label="Loading">
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <Pulse className="h-5 w-40 rounded" />
          <Pulse className="h-4 w-12 rounded" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Pulse className="h-3 w-20 rounded" />
              <Pulse className="h-4 w-36 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <Pulse className="mb-4 h-5 w-32 rounded" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Pulse key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <Pulse className="mb-4 h-5 w-36 rounded" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Pulse className="h-10 w-10 rounded-[6px]" />
              <div className="flex-1 space-y-2">
                <Pulse className="h-3.5 w-40 rounded" />
                <Pulse className="h-3 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Opportunity / provider detail hero + body */
export function DetailPageSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden="true" role="status" aria-label="Loading">
      <Pulse className="h-4 w-32 rounded" />
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-8">
          <Pulse className="h-[114px] w-[100px] shrink-0 rounded-[10px]" />
          <div className="space-y-3">
            <div className="flex gap-2">
              <Pulse className="h-5 w-16 rounded-sm" />
              <Pulse className="h-5 w-20 rounded-sm" />
            </div>
            <Pulse className="h-9 w-72 max-w-full rounded" />
            <Pulse className="h-4 w-48 rounded" />
            <div className="flex gap-2">
              <Pulse className="h-4 w-24 rounded" />
              <Pulse className="h-4 w-28 rounded" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Pulse className="h-11 w-11 rounded-[6px]" />
          <Pulse className="h-11 w-36 rounded-[6px]" />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5 rounded-[10px] border border-[#EEF2F8] bg-white p-6">
          <Pulse className="h-5 w-40 rounded" />
          <Pulse className="h-3 w-full rounded" />
          <Pulse className="h-3 w-full rounded" />
          <Pulse className="h-3 w-4/5 rounded" />
          <Pulse className="mt-4 h-5 w-36 rounded" />
          <Pulse className="h-3 w-full rounded" />
          <Pulse className="h-3 w-3/4 rounded" />
        </div>
        <div className="space-y-4 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <Pulse className="h-5 w-28 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Pulse className="h-3 w-20 rounded" />
              <Pulse className="h-4 w-32 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Compact card skeleton for dashboard sections */
export function DashboardCardsSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="flex gap-5 overflow-hidden" aria-hidden="true" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex w-full min-w-0 flex-1 flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5"
        >
          <Pulse className="h-6 w-20 rounded" />
          <Pulse className="h-4 w-3/4 rounded" />
          <div className="flex items-center gap-3">
            <Pulse className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Pulse className="h-3.5 w-28 rounded" />
              <Pulse className="h-3 w-20 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Application detail panel */
export function ApplicationDetailSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden="true" role="status" aria-label="Loading">
      <div className="flex items-center gap-4">
        <Pulse className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Pulse className="h-5 w-56 max-w-full rounded" />
          <Pulse className="h-3 w-32 rounded" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-[10px] border border-[#EEF2F8] p-4">
            <Pulse className="h-3 w-16 rounded" />
            <Pulse className="h-4 w-24 rounded" />
          </div>
        ))}
      </div>
      <div className="space-y-3 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <Pulse className="h-4 w-40 rounded" />
        <Pulse className="h-3 w-full rounded" />
        <Pulse className="h-3 w-full rounded" />
        <Pulse className="h-3 w-2/3 rounded" />
      </div>
      <div className="space-y-3 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <Pulse className="h-4 w-36 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Pulse className="h-9 w-9 rounded-[6px]" />
            <Pulse className="h-3.5 flex-1 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
