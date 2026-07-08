'use client';

import Image from 'next/image';
import { ArrowRight, ChevronDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  OPPORTUNITY_STATUS_STYLES,
  OPPORTUNITY_TYPE_STYLES,
  TEAM_PERFORMANCE,
  TOP_OPPORTUNITIES,
  type TopOpportunityRow,
} from './analyticsData';

function SortDropdown() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-sm text-[#44516A]">Sort by:</span>
      <button
        type="button"
        className="inline-flex h-[45px] items-center gap-2 rounded-[6px] border border-[#EEF2F8] bg-white px-3 text-sm text-[#0F172A]"
      >
        Newest Applied
        <ChevronDown className="h-3.5 w-3.5 text-[#44516A]" />
      </button>
    </div>
  );
}

function TypePill({ type }: { type: TopOpportunityRow['type'] }) {
  return (
    <span className={cn('inline-flex rounded-[4px] px-1.5 py-0.5 text-sm font-medium', OPPORTUNITY_TYPE_STYLES[type])}>
      {type}
    </span>
  );
}

function StatusPill({ status }: { status: TopOpportunityRow['status'] }) {
  return (
    <span className={cn('inline-flex rounded-[4px] px-1.5 py-0.5 text-sm font-medium', OPPORTUNITY_STATUS_STYLES[status])}>
      {status}
    </span>
  );
}

export function TopOpportunitiesDesktop({ skeleton }: { skeleton?: boolean }) {
  if (skeleton) {
    return (
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-4">
          <div className="h-6 w-48 animate-pulse rounded bg-[#EEF2F8]" />
          <div className="h-[45px] w-[210px] animate-pulse rounded bg-[#EEF2F8]" />
        </div>
        <div className="space-y-0 px-5 py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 border-b border-[#EEF2F8] py-5 last:border-0">
              <div className="h-10 w-44 animate-pulse rounded bg-[#EEF2F8]" />
              <div className="h-6 w-16 animate-pulse rounded bg-[#EEF2F8]" />
              <div className="h-6 w-12 animate-pulse rounded bg-[#EEF2F8]" />
              <div className="h-6 w-12 animate-pulse rounded bg-[#EEF2F8]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF2F8] px-5 py-4">
        <h2 className="text-lg font-medium text-[#0F172A]">Top Performing Opportunities</h2>
        <SortDropdown />
      </div>

      <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[minmax(200px,1.2fr)_minmax(100px,0.8fr)_100px_120px_120px_120px_100px] md:gap-2.5">
        {['Opportunity', 'Type', 'Views', 'Applications', 'Conversion Rate', 'Interview Rate', 'Status'].map(
          (col) => (
            <p key={col} className="py-3.5 text-sm font-medium text-[#0F172A]">
              {col}
            </p>
          ),
        )}
      </div>

      <div className="divide-y divide-[#EEF2F8] px-5">
        {TOP_OPPORTUNITIES.map((row) => (
          <div
            key={row.id}
            className="grid gap-3 py-5 md:grid-cols-[minmax(200px,1.2fr)_minmax(100px,0.8fr)_100px_120px_120px_120px_100px] md:items-center md:gap-2.5"
          >
            <div>
              <p className="text-sm font-medium text-[#0F172A]">{row.name}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-[#44516A]">
                <span>Created By:</span>
                <Image
                  src={row.creatorAvatar}
                  alt=""
                  width={14}
                  height={14}
                  className="rounded-full"
                />
                <span>{row.createdBy}</span>
              </div>
            </div>
            <div>
              <TypePill type={row.type} />
            </div>
            <p className="text-sm text-[#44516A]">{row.views.toLocaleString()}</p>
            <p className="text-sm text-[#44516A]">{row.applications}</p>
            <p className="text-sm text-[#44516A]">{row.conversionRate}</p>
            <p className="text-sm text-[#44516A]">{row.interviewRate}</p>
            <StatusPill status={row.status} />
          </div>
        ))}
      </div>

      <div className="border-t border-[#EEF2F8] px-5 py-5">
        <button type="button" className="inline-flex items-center gap-2.5 text-sm text-[#2F66C8]">
          View all opportunities
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function TopOpportunityMobileCard({ row }: { row: TopOpportunityRow }) {
  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#0F172A]">{row.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#44516A]">
            <span>Applications: {row.applications}</span>
            <TypePill type={row.type} />
          </div>
        </div>
        <button type="button" className="rounded-[6px] border border-[#EEF2F8] p-1.5 text-[#44516A]" aria-label="More actions">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-[#44516A]">Status</p>
          <div className="mt-1">
            <StatusPill status={row.status} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#44516A]">Views</p>
          <p className="mt-1 text-sm text-[#0F172A]">{row.views.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-[#44516A]">Conversion Rate</p>
          <p className="mt-1 text-sm text-[#0F172A]">{row.conversionRate}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#44516A]">Interview Rate</p>
          <p className="mt-1 text-sm text-[#0F172A]">{row.interviewRate}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#EEF2F8] pt-3 text-xs text-[#44516A]">
        <span>Created By:</span>
        <span className="flex items-center gap-2">
          <Image src={row.creatorAvatar} alt="" width={16} height={16} className="rounded-full" />
          {row.createdBy}
        </span>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-[6px] border border-[#EEF2F8] py-2.5 text-sm text-[#0F172A]"
      >
        View Opportunity
      </button>
    </div>
  );
}

export function TopOpportunitiesMobile({ skeleton }: { skeleton?: boolean }) {
  if (skeleton) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-44 animate-pulse rounded bg-[#EEF2F8]" />
          <div className="h-[45px] w-[150px] animate-pulse rounded bg-[#EEF2F8]" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-[280px] animate-pulse rounded-[10px] bg-[#EEF2F8]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-[#0F172A]">Top Performing Opportunities</h2>
        <SortDropdown />
      </div>
      <div className="space-y-4">
        {TOP_OPPORTUNITIES.map((row) => (
          <TopOpportunityMobileCard key={row.id} row={row} />
        ))}
      </div>
      <button type="button" className="inline-flex items-center gap-2.5 text-sm text-[#2F66C8]">
        View all opportunities
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function TeamPerformanceDesktop({ skeleton }: { skeleton?: boolean }) {
  if (skeleton) {
    return (
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
        <div className="border-b border-[#EEF2F8] px-5 py-4">
          <div className="h-6 w-40 animate-pulse rounded bg-[#EEF2F8]" />
        </div>
        <div className="space-y-4 px-5 py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded bg-[#EEF2F8]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF2F8] px-5 py-4">
        <h2 className="text-lg font-medium text-[#0F172A]">Team Performance</h2>
        <SortDropdown />
      </div>

      <div className="hidden border-b border-[#EEF2F8] px-5 md:grid md:grid-cols-[minmax(200px,1.4fr)_120px_120px_120px] md:gap-2.5">
        {['Member', 'Applications Reviewed', 'Avg. Review Time', 'Interview Conducted'].map((col) => (
          <p key={col} className="py-4 text-sm font-medium text-[#0F172A]">
            {col}
          </p>
        ))}
      </div>

      <div className="divide-y divide-[#EEF2F8] px-5">
        {TEAM_PERFORMANCE.map((member) => (
          <div
            key={member.id}
            className="grid gap-3 py-5 md:grid-cols-[minmax(200px,1.4fr)_120px_120px_120px] md:items-center md:gap-2.5"
          >
            <div className="flex items-center gap-2.5">
              <Image src={member.avatar} alt="" width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{member.name}</p>
                <p className="text-xs text-[#44516A]">{member.email}</p>
              </div>
            </div>
            <p className="text-sm text-[#44516A]">{member.applicationsReviewed}</p>
            <p className="text-sm text-[#44516A]">{member.avgReviewTime}</p>
            <p className="text-sm text-[#44516A]">{member.interviewsConducted}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamPerformanceMobile({ skeleton }: { skeleton?: boolean }) {
  if (skeleton) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-40 animate-pulse rounded bg-[#EEF2F8]" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-[10px] bg-[#EEF2F8]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-[#0F172A]">Team Performance</h2>
        <SortDropdown />
      </div>
      <div className="space-y-4">
        {TEAM_PERFORMANCE.map((member) => (
          <div key={member.id} className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
            <div className="flex items-center gap-3">
              <Image src={member.avatar} alt="" width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{member.name}</p>
                <p className="text-xs text-[#44516A]">{member.email}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#EEF2F8] pt-4">
              <div>
                <p className="text-xs text-[#44516A]">Reviewed</p>
                <p className="mt-1 text-sm text-[#0F172A]">{member.applicationsReviewed}</p>
              </div>
              <div>
                <p className="text-xs text-[#44516A]">Avg. Time</p>
                <p className="mt-1 text-sm text-[#0F172A]">{member.avgReviewTime}</p>
              </div>
              <div>
                <p className="text-xs text-[#44516A]">Interviews</p>
                <p className="mt-1 text-sm text-[#0F172A]">{member.interviewsConducted}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsStatSkeletonGrid({ mobile }: { mobile?: boolean }) {
  const count = mobile ? 6 : 6;
  return (
    <div className={cn('grid gap-2.5', mobile ? 'grid-cols-2' : 'grid-cols-2 xl:grid-cols-6')}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-[158px] animate-pulse rounded-[8px] bg-[#EEF2F8]" />
      ))}
    </div>
  );
}
