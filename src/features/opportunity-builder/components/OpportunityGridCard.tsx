'use client';



import Image from 'next/image';
import { TrendingUp } from 'lucide-react';
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
}

export function OpportunityGridCard({ row, onDelete }: OpportunityGridCardProps) {

  const icon = TYPE_ICONS[row.type];

  const iconBg = TYPE_ICON_BG[row.type];



  return (

    <article className="flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">

      <div className="flex items-start justify-between gap-3">

        <div className="flex min-w-0 items-start gap-3">

          <div

            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] p-2.5"

            style={{ backgroundColor: iconBg }}

          >

            <Image src={icon} alt="" width={24} height={24} className="object-contain" />

          </div>

          <div className="min-w-0">

            <p className="truncate font-sans text-[16px] font-medium text-[#0F172A]">{row.name}</p>

            <p className="truncate font-sans text-[12px] text-[#8C97AD]">{row.category}</p>

          </div>

        </div>

        <OpportunityRowActions row={row} onDelete={onDelete} />

      </div>



      <div className="mt-4 flex flex-wrap gap-2">

        <span className={`rounded-[4px] px-1.5 py-0.5 font-sans text-[12px] font-medium ${TYPE_STYLES[row.type]}`}>

          {TYPE_LABELS[row.type]}

        </span>

        <span className={`rounded-[4px] px-1.5 py-0.5 font-sans text-[12px] font-medium ${STATUS_STYLES[row.status]}`}>

          {row.status}

        </span>

      </div>



      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#EEF2F8] pt-4">

        <div>

          <p className="font-sans text-[10px] uppercase tracking-wide text-[#8C97AD]">Applications</p>

          <p className="font-sans text-[14px] font-medium text-[#0F172A]">

            {row.applicationsDisplay ?? row.applications}

          </p>

        </div>

        <div>

          <p className="font-sans text-[10px] uppercase tracking-wide text-[#8C97AD]">Views</p>

          <p className="font-sans text-[14px] font-medium text-[#0F172A]">{row.views.toLocaleString()}</p>

        </div>

        <div>

          <p className="font-sans text-[10px] uppercase tracking-wide text-[#8C97AD]">Deadline</p>

          <p className="font-sans text-[14px] font-medium text-[#0F172A]">{row.deadline.split(',')[0]}</p>

        </div>

      </div>



      <div className="mt-3 flex items-center justify-between rounded-[6px] bg-[#F8FAFC] px-3 py-2">

        <div className="flex items-center gap-2">

          {row.health !== '-' ? (

            <>

              <span className={`h-2.5 w-2.5 rounded-full ${HEALTH_DOT[row.health]}`} />

              <span className="font-sans text-[12px] text-[#44516A]">{row.health}</span>

            </>

          ) : (

            <span className="font-sans text-[12px] text-[#8C97AD]">-</span>

          )}

        </div>

        {row.applicationsDelta.startsWith('+') && (

          <span className="inline-flex items-center gap-1 font-sans text-[11px] text-[#15803D]">

            <TrendingUp className="h-3 w-3" />

            {row.applicationsDelta}

          </span>

        )}

      </div>

    </article>

  );

}


