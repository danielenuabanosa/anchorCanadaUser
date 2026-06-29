'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicantRow } from './applicationsHubData';
import { OPPORTUNITY_TYPE_STYLES, STATUS_STYLES } from './applicationsHubData';

interface MobileApplicantCardProps {
  row: ApplicantRow;
}

export function MobileApplicantCard({ row }: MobileApplicantCardProps) {
  return (
    <Link href={`/applications/${row.id}`} className="block">
      <article className="flex items-center gap-4 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
          <Image src={row.avatar} alt="" width={52} height={52} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold leading-[21px] text-[#0F172A]">{row.applicant}</p>
              <p className="truncate text-sm leading-[18px] text-[#8C97AD]">{row.location}</p>
            </div>
            <span className="shrink-0 text-[#44516A]" aria-hidden>
              <Ellipsis className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
          </div>

          <p className="mt-1 truncate text-sm leading-[18px] text-[#44516A]">{row.opportunity}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-xs font-medium',
                OPPORTUNITY_TYPE_STYLES[row.opportunityType],
              )}
            >
              {row.opportunityType}
            </span>
            <span className={cn('rounded px-1.5 py-0.5 text-xs font-medium', STATUS_STYLES[row.status])}>
              {row.status}
            </span>
            <span className="text-xs leading-[13px] text-[#8C97AD]">{row.appliedAt}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
