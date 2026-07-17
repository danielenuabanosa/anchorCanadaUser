'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import emptyFolderImg from '@assets/images/applications/empty-folder.png';
import noMatchSearchImg from '@assets/images/applications/no-match-search.png';

/** Figma 490:18847 / 505:12314 — bulk selection toolbar */
export function ApplicationBulkActionBar({
  count,
  onClear,
  onShortlist,
  onReject,
  onAssignReviewer,
  onExport,
  variant = 'desktop',
  className,
}: {
  count: number;
  onClear: () => void;
  onShortlist?: () => void;
  onReject?: () => void;
  onAssignReviewer?: () => void;
  onExport?: () => void;
  variant?: 'desktop' | 'mobile';
  className?: string;
}) {
  if (count <= 0) return null;

  const actions = (
    <>
      <button
        type="button"
        onClick={onShortlist}
        className="rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-2 text-sm font-medium text-[#2F66C8]"
      >
        Shortlist
      </button>
      <button
        type="button"
        onClick={onReject}
        className="rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-2 text-sm font-medium text-[#2F66C8]"
      >
        Reject
      </button>
      <button
        type="button"
        onClick={onAssignReviewer}
        className="rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-2 text-sm font-medium text-[#2F66C8]"
      >
        Assign Reviewer
      </button>
      <button
        type="button"
        onClick={onExport}
        className="rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-2 text-sm font-medium text-[#2F66C8]"
      >
        Export
      </button>
    </>
  );

  if (variant === 'mobile') {
    return (
      <div
        className={cn(
          'rounded-[6px] border border-[#EEF2F8] bg-[#F8FAFC] p-2.5',
          className,
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-[#2F66C8]">
            {count} applicants select
          </p>
          <button
            type="button"
            onClick={onClear}
            className="flex h-[34px] w-[38px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-[#44516A]"
            aria-label="Clear selection"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">{actions}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-5 rounded-[6px] border border-[#EEF2F8] bg-[#F8FAFC] p-2.5',
        className,
      )}
    >
      <p className="text-sm font-medium text-[#2F66C8]">{count} applicants select</p>
      <div className="flex flex-wrap items-center gap-2.5">{actions}</div>
      <button
        type="button"
        onClick={onClear}
        className="flex items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white p-2 text-[#44516A]"
        aria-label="Clear selection"
      >
        <X className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

/** Figma 490:19354 / 492:447 — no applications yet */
export function ApplicationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-5 py-16 text-center">
      <Image
        src={emptyFolderImg}
        alt=""
        width={96}
        height={80}
        className="h-20 w-auto object-contain"
        priority
      />
      <div className="w-full max-w-[470px]">
        <h3 className="flex flex-wrap items-baseline justify-center gap-1.5">
          <span className="font-serif text-[24px] text-[#0F172A]">No Applications</span>
          <span className="font-serif text-[28px] italic text-[#2F66C8]">Yet</span>
        </h3>
        <p className="mt-2.5 text-sm text-[#44516A]">
          Applications submitted to your opportunities will appear here.
        </p>
      </div>
      <Link
        href="/opportunities"
        className="inline-flex h-[45px] items-center justify-center rounded-[6px] bg-[#2F66C8] px-4 text-sm font-medium text-white hover:bg-[#2454A4]"
      >
        View Opportunities
      </Link>
    </div>
  );
}

/** Figma 492:461 / 505:12922 — filters/search yield no rows */
export function ApplicationsNoMatchState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-5 py-16 text-center">
      <Image
        src={noMatchSearchImg}
        alt=""
        width={80}
        height={80}
        className="h-20 w-20 object-contain"
        priority
      />
      <div className="w-full max-w-[470px]">
        <h3 className="flex flex-wrap items-baseline justify-center gap-1.5">
          <span className="font-serif text-[24px] text-[#0F172A]">No applicants match</span>
          <span className="font-serif text-[28px] italic text-[#2F66C8]">your filters</span>
        </h3>
        <p className="mt-2.5 text-sm text-[#44516A]">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    </div>
  );
}

/** Figma 492:1253 — table loading skeleton */
export function ApplicationsTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="hidden space-y-0 p-5 md:block">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[40px_1fr_1fr_200px_140px_1fr_100px] items-center gap-2.5 border-b border-[#EEF2F8] py-3.5 last:border-0"
        >
          <div className="h-[18px] w-[18px] animate-pulse rounded-[4px] bg-[#EEF2F8]" />
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 animate-pulse rounded-full bg-[#EEF2F8]" />
            <div className="space-y-2">
              <div className="h-3.5 w-28 animate-pulse rounded bg-[#EEF2F8]" />
              <div className="h-3 w-20 animate-pulse rounded bg-[#EEF2F8]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-36 animate-pulse rounded bg-[#EEF2F8]" />
            <div className="h-5 w-16 animate-pulse rounded bg-[#EEF2F8]" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-24 animate-pulse rounded bg-[#EEF2F8]" />
            <div className="h-3 w-14 animate-pulse rounded bg-[#EEF2F8]" />
          </div>
          <div className="h-6 w-24 animate-pulse rounded-[4px] bg-[#EEF2F8]" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-pulse rounded-full bg-[#EEF2F8]" />
            <div className="h-3.5 w-24 animate-pulse rounded bg-[#EEF2F8]" />
          </div>
          <div className="h-8 w-8 animate-pulse rounded-[6px] bg-[#EEF2F8]" />
        </div>
      ))}
    </div>
  );
}

export function ApplicationsMobileSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-[#EEF2F8]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-[#EEF2F8]" />
              <div className="h-3 w-48 animate-pulse rounded bg-[#EEF2F8]" />
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <div className="h-6 w-24 animate-pulse rounded bg-[#EEF2F8]" />
            <div className="h-4 w-28 animate-pulse rounded bg-[#EEF2F8]" />
          </div>
          <div className="mt-5 h-10 w-full animate-pulse rounded-[6px] bg-[#EEF2F8]" />
        </div>
      ))}
    </div>
  );
}
