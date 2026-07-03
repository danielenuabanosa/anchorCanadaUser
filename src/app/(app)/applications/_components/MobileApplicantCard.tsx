'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicantRow } from './applicationsHubData';
import { OPPORTUNITY_TYPE_STYLES, STATUS_STYLES } from './applicationsHubData';
import { MobileRowActionsSheet } from './ApplicationHubModals';

interface MobileApplicantCardProps {
  row: ApplicantRow;
  onAssignReviewer?: (id: string) => void;
}

export function MobileApplicantCard({ row, onAssignReviewer }: MobileApplicantCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <article className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 gap-5">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={row.avatar} alt="" width={40} height={40} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-[#0F172A]">{row.applicant}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2.5">
              <p className="truncate text-xs text-[#44516A]">{row.opportunity}</p>
              <span
                className={cn(
                  'shrink-0 rounded-[2px] border px-1 py-0.5 text-xs',
                  OPPORTUNITY_TYPE_STYLES[row.opportunityType],
                )}
              >
                {row.opportunityType}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[#EEF2F8] text-[#44516A]"
          aria-label="Applicant actions"
        >
          <Ellipsis className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className={cn('rounded px-1.5 py-0.5 text-sm font-medium', STATUS_STYLES[row.status])}>
          {row.status}
        </span>
        <div className="text-right">
          <p className="text-sm text-[#0F172A]">Applied {row.appliedAt}</p>
          {row.appliedTime ? <p className="text-xs text-[#8C97AD]">{row.appliedTime}</p> : null}
        </div>
      </div>

      {row.reviewer ? (
        <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#44516A]">Reviewed By:</p>
            <div className="flex items-center gap-2">
              {row.reviewerAvatar ? (
                <Image
                  src={row.reviewerAvatar}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : null}
              <p className="text-sm font-medium text-[#0F172A]">{row.reviewer}</p>
            </div>
          </div>
        </div>
      ) : null}

      <Link
        href={`/applications/${row.id}`}
        className="flex w-full items-center justify-center rounded-[6px] border border-[#EEF2F8] py-2.5 text-sm font-medium text-[#2F66C8]"
      >
        View Applicant
      </Link>

      <MobileRowActionsSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onView={() => {
          setMenuOpen(false);
          router.push(`/applications/${row.id}`);
        }}
        onAssignReviewer={() => {
          setMenuOpen(false);
          onAssignReviewer?.(row.id);
        }}
      />
    </article>
  );
}
