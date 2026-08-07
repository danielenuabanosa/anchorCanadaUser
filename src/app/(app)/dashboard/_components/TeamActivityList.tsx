'use client';

import { Pencil, Star, Upload, UserPlus, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardSectionHeader } from './DashboardSectionHeader';
import { Pulse } from '@/shared/components/ui/PageSkeletons';

type ActivityKind = 'edit' | 'review' | 'publish' | 'shortlist' | 'invite';

type ActivityItem = {
  id: string;
  member: string;
  action: string;
  time: string;
  kind?: ActivityKind;
};

const KIND_STYLES: Record<
  ActivityKind,
  { icon: typeof Pencil; iconBg: string; iconBorder: string; iconColor: string }
> = {
  edit: {
    icon: Pencil,
    iconBg: 'bg-[#EBDEFD]',
    iconBorder: 'border-[#DFD2F9]',
    iconColor: 'text-[#6821CD]',
  },
  review: {
    icon: Users,
    iconBg: 'bg-[#FFF6EA]',
    iconBorder: 'border-[#FFE8C7]',
    iconColor: 'text-[#D97706]',
  },
  publish: {
    icon: Upload,
    iconBg: 'bg-[#F5EDFD]',
    iconBorder: 'border-[#E8DFFB]',
    iconColor: 'text-[#7C3AED]',
  },
  shortlist: {
    icon: Star,
    iconBg: 'bg-[#FFF6EA]',
    iconBorder: 'border-[#FFE8C7]',
    iconColor: 'text-[#D97706]',
  },
  invite: {
    icon: UserPlus,
    iconBg: 'bg-[#E8F6ED]',
    iconBorder: 'border-[#DCEDE3]',
    iconColor: 'text-[#15803D]',
  },
};

export function TeamActivityList({
  className,
  items = [],
  loading,
  error,
}: {
  className?: string;
  items?: ActivityItem[];
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
      <DashboardSectionHeader title="Team Activity" href="/team" />

      <ul className="mt-5 flex flex-col">
        {loading ? (
          <li className="flex flex-col gap-3 py-2" aria-hidden>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <Pulse className="h-9 w-9 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Pulse className="h-3.5 w-40 rounded" />
                  <Pulse className="h-3 w-24 rounded" />
                </div>
              </div>
            ))}
          </li>
        ) : error ? (
          <li className="py-8 text-sm text-[#B91C1C]">{error}</li>
        ) : items.length === 0 ? (
          <li className="py-8 text-sm text-[#8C97AD]">
            No team activity yet. Publish opportunities or review applicants to see updates here.
          </li>
        ) : (
          items.map((item) => {
            const style = KIND_STYLES[item.kind ?? 'edit'];
            const Icon = style.icon;
            return (
              <li key={item.id} className="flex min-h-[80px] items-center py-3.5">
                <div className="flex w-full items-center gap-4">
                  <span
                    className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border ${style.iconBg} ${style.iconBorder}`}
                  >
                    <Icon className={`h-[26px] w-[26px] ${style.iconColor}`} strokeWidth={1.5} />
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
          })
        )}
      </ul>
    </div>
  );
}
