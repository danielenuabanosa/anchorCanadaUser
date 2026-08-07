'use client';

import Image from 'next/image';
import Link from 'next/link';
import { OpportunityRowActions } from '@/app/(app)/opportunities/_components/OpportunityRowActions';
import type { OpportunityRow } from '@/app/(app)/opportunities/_components/opportunitiesHubData';
import {
  HEALTH_DOT,
  STATUS_STYLES,
  TYPE_ICONS,
  TYPE_ICON_BG,
  TYPE_LABELS,
  TYPE_STYLES,
} from '@/app/(app)/opportunities/_components/opportunitiesHubData';

interface OpportunityGridCardProps {
  row: OpportunityRow;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onPause?: (id: string) => void;
  onExtendDeadline?: (id: string, date: string) => void;
}

export function OpportunityGridCard({
  row,
  onDelete,
  onArchive,
  onPause,
  onExtendDeadline,
}: OpportunityGridCardProps) {
  const icon = TYPE_ICONS[row.type];
  const iconBg = TYPE_ICON_BG[row.type];
  const daysLeftClass =
    row.daysLeft === 'Closed' ||
    row.daysLeft === '-' ||
    row.daysLeft === 'Not published' ||
    row.daysLeft.toLowerCase().includes('past')
      ? 'text-[#8C97AD]'
      : 'text-[#15803D]';

  return (
    <article className="flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] p-2.5"
            style={{ backgroundColor: iconBg }}
          >
            <Image src={icon} alt="" width={24} height={24} className="object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/opportunities/${row.id}`}
                className="line-clamp-2 font-sans text-[16px] font-medium leading-snug text-[#0F172A] hover:text-[#2F66C8]"
              >
                {row.name}
              </Link>
              <OpportunityRowActions
                row={row}
                onDelete={onDelete}
                onArchive={onArchive}
                onPause={onPause}
                onExtendDeadline={onExtendDeadline}
              />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <span
                className={`rounded-[4px] px-1.5 py-0.5 font-sans text-[12px] font-medium ${TYPE_STYLES[row.type]}`}
              >
                {TYPE_LABELS[row.type]}
              </span>
              <span
                className={`rounded-[4px] px-1.5 py-0.5 font-sans text-[12px] font-medium ${STATUS_STYLES[row.status]}`}
              >
                {row.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div>
          <p className="font-sans text-[14px] font-medium text-[#0F172A]">
            {row.applicationsDisplay ?? row.applications}
          </p>
          <p className="mt-0.5 font-sans text-[12px] text-[#8C97AD]">Applications</p>
        </div>
        <div>
          <p className="font-sans text-[14px] font-medium text-[#0F172A]">{row.views.toLocaleString()}</p>
          <p className="mt-0.5 font-sans text-[12px] text-[#8C97AD]">Views</p>
        </div>
        <div>
          <p className="font-sans text-[14px] font-medium text-[#0F172A]">
            {row.deadline === '-' ? '—' : row.deadline}
          </p>
          <p className={`mt-0.5 font-sans text-[12px] ${daysLeftClass}`}>{row.daysLeft}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-[#EEF2F8] pt-4">
        {row.health !== '-' ? (
          <>
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${HEALTH_DOT[row.health]}`} />
            <span className="font-sans text-[13px] text-[#44516A]">{row.health}</span>
          </>
        ) : (
          <span className="font-sans text-[13px] text-[#8C97AD]">—</span>
        )}
      </div>
    </article>
  );
}
