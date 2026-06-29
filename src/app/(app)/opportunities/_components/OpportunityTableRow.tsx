'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { OpportunityRow } from './opportunitiesHubData';
import { OpportunityRowActions } from './OpportunityRowActions';
import {
  HEALTH_DOT,
  STATUS_STYLES,
  TYPE_ICONS,
  TYPE_ICON_BG,
  TYPE_LABELS,
  TYPE_STYLES,
} from './opportunitiesHubData';

interface OpportunityTableRowProps {
  row: OpportunityRow;
  onDelete?: (id: string) => void;
}

export function OpportunityTableRow({ row, onDelete }: OpportunityTableRowProps) {
  const icon = TYPE_ICONS[row.type];

  return (
    <div className="grid grid-cols-1 gap-3 border-b border-[#EEF2F8] py-4 last:border-b-0 md:grid-cols-[minmax(220px,1.4fr)_100px_100px_120px_90px_130px_140px_48px] md:items-center md:gap-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] p-2"
          style={{ backgroundColor: TYPE_ICON_BG[row.type] }}
        >
          <Image src={icon} alt="" width={20} height={20} className="object-contain" />
        </div>
        <div className="min-w-0">
          <Link href={`/opportunities/${row.id}`} className="truncate text-base font-medium text-[#0F172A] hover:text-[#2F66C8]">
            {row.name}
          </Link>
          <p className="truncate text-sm text-[#8C97AD]">{row.category}</p>
        </div>
      </div>
      <span
        className={`inline-flex w-fit rounded-[6px] px-1.5 py-0.5 text-sm font-medium ${TYPE_STYLES[row.type]}`}
      >
        {TYPE_LABELS[row.type]}
      </span>
      <span
        className={`inline-flex w-fit rounded-[6px] px-1.5 py-0.5 text-sm font-medium ${STATUS_STYLES[row.status]}`}
      >
        {row.status}
      </span>
      <div>
        <p className="text-base text-[#44516A]">{row.applicationsDisplay ?? row.applications}</p>
        <p className="text-sm text-[#8C97AD]">{row.applicationsDelta}</p>
      </div>
      <p className="text-base text-[#44516A]">{row.views.toLocaleString()}</p>
      <div>
        <p className="text-base text-[#44516A]">{row.deadline}</p>
        <p className={`text-sm ${row.daysLeft === 'Closed' || row.daysLeft === '-' ? 'text-[#8C97AD]' : 'text-[#15803D]'}`}>
          {row.daysLeft}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {row.health !== '-' ? (
          <>
            <span className={`h-3 w-3 shrink-0 rounded-full ${HEALTH_DOT[row.health]}`} />
            <p className="truncate text-base text-[#44516A]">{row.health}</p>
          </>
        ) : (
          <p className="text-base text-[#8C97AD]">-</p>
        )}
      </div>
      <OpportunityRowActions row={row} onDelete={onDelete} />    </div>
  );
}
