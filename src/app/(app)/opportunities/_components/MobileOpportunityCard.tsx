'use client';

import {
  CalendarDays,
  ChartColumnBig,
  ExternalLink,
  GraduationCap,
  Heart,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OpportunityRowActions } from './OpportunityRowActions';
import type { OpportunityRow } from './opportunitiesHubData';
import {
  HEALTH_DOT,
  STATUS_STYLES,
  TYPE_LABELS,
  TYPE_STYLES,
} from './opportunitiesHubData';

const MOBILE_CARD_ICONS: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
  '1': { icon: Users, bg: 'bg-[#EAF1FE]', color: 'text-[#2F66C8]' },
  '2': { icon: ChartColumnBig, bg: 'bg-[#EDE3FE]', color: 'text-[#7C3AED]' },
  '3': { icon: ExternalLink, bg: 'bg-[#FDF6E2]', color: 'text-[#D97706]' },
  '4': { icon: Heart, bg: 'bg-[#FEE8E8]', color: 'text-[#DC2626]' },
  '5': { icon: GraduationCap, bg: 'bg-[#EAF1FE]', color: 'text-[#2F66C8]' },
  '6': { icon: CalendarDays, bg: 'bg-[#EAF1FE]', color: 'text-[#2F66C8]' },
};

const DEFAULT_ICON = { icon: Users, bg: 'bg-[#EAF1FE]', color: 'text-[#2F66C8]' };

interface MobileOpportunityCardProps {
  row: OpportunityRow;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onPause?: (id: string) => void;
  onExtendDeadline?: (id: string, date: string) => void;
}

function MetricColumn({
  value,
  label,
  labelClassName,
}: {
  value: string;
  label: string;
  labelClassName?: string;
}) {
  return (
    <div className="min-w-0 flex-1 border-r border-[#EEF2F8] last:border-r-0">
      <p className="text-lg font-medium leading-[23px] text-[#0F172A]">{value}</p>
      <span
        className={cn(
          'mt-0.5 inline-flex rounded-[2px] px-1 py-0.5 text-[10px] leading-[13px]',
          labelClassName ?? 'bg-[#F8FAFC] text-[#44516A]',
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function MobileOpportunityCard({
  row,
  onDelete,
  onArchive,
  onPause,
  onExtendDeadline,
}: MobileOpportunityCardProps) {
  const iconConfig = MOBILE_CARD_ICONS[row.id] ?? DEFAULT_ICON;
  const Icon = iconConfig.icon;
  const daysLeftClass =
    row.daysLeft === 'Not published'
      ? 'bg-[#F8FAFC] text-[#44516A]'
      : 'bg-[#ECFDF5] text-[#15803D]';
  const deadlineValue = row.deadline === '-' ? '-' : row.deadline;

  return (
    <article className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-5">
          <span className={cn('flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[8.667px]', iconConfig.bg)}>
            <Icon className={cn('h-6 w-6', iconConfig.color)} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold leading-[21px] text-[#0F172A]">{row.name}</p>
            <div className="mt-1 flex flex-wrap gap-2.5">
              <span className={cn('rounded-[4px] px-1.5 py-0.5 text-xs font-medium', TYPE_STYLES[row.type])}>
                {TYPE_LABELS[row.type]}
              </span>
              <span className={cn('rounded-[4px] px-1.5 py-0.5 text-xs font-medium', STATUS_STYLES[row.status])}>
                {row.status}
              </span>
            </div>
          </div>
        </div>
        <OpportunityRowActions
          row={row}
          onDelete={onDelete}
          onArchive={onArchive}
          onPause={onPause}
          onExtendDeadline={onExtendDeadline}
          compact
        />
      </div>

      <div className="flex gap-5">
        <MetricColumn
          value={String(row.applicationsDisplay ?? row.applications)}
          label="Applications"
        />
        <MetricColumn value={row.views.toLocaleString()} label="Views" />
        <MetricColumn value={deadlineValue} label={row.daysLeft} labelClassName={daysLeftClass} />
      </div>

      <div className="flex items-center gap-2">
        {row.health !== '-' ? (
          <>
            <span className={cn('h-3 w-3 shrink-0 rounded-full', HEALTH_DOT[row.health])} />
            <span className="truncate text-sm leading-[18px] text-[#44516A]">{row.health}</span>
          </>
        ) : (
          <span className="text-sm leading-[18px] text-[#44516A]">-</span>
        )}
      </div>
    </article>
  );
}
