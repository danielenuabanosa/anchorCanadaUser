'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicationStage } from '../[id]/_components/applicationDetailData';
import type { ApplicantRow } from './applicationsHubData';
import { OPPORTUNITY_TYPE_STYLES, STATUS_STYLES } from './applicationsHubData';
import { RowActionsMenu } from './ApplicationHubModals';

interface MobileApplicantCardProps {
  row: ApplicantRow;
  selected?: boolean;
  /** Figma: checkboxes only appear once selection mode is active */
  showCheckbox?: boolean;
  onToggleSelect?: (id: string) => void;
  onAssignReviewer?: (id: string) => void;
  onAction?: (label: string, row: ApplicantRow) => void;
}

export function MobileApplicantCard({
  row,
  selected = false,
  showCheckbox = false,
  onToggleSelect,
  onAssignReviewer,
  onAction,
}: MobileApplicantCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <article
      className={cn(
        'relative flex flex-col gap-5 rounded-[10px] border bg-white p-4',
        selected ? 'border-[#2F66C8]' : 'border-[#EEF2F8]',
        menuOpen && 'z-50',
      )}
    >
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
        <div className="flex shrink-0 items-start gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-[#EEF2F8] p-1.5 text-[#44516A]"
              aria-label="Applicant actions"
              aria-expanded={menuOpen}
            >
              <Ellipsis className="h-[18px] w-[18px]" />
            </button>
            <RowActionsMenu
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              stage={row.status as ApplicationStage}
              onView={() => {
                setMenuOpen(false);
                router.push(`/applications/${row.id}`);
              }}
              onAssignReviewer={() => {
                setMenuOpen(false);
                onAssignReviewer?.(row.id);
              }}
              onAction={(label) => {
                setMenuOpen(false);
                onAction?.(label, row);
              }}
            />
          </div>
          {showCheckbox ? (
            <button
              type="button"
              onClick={() => onToggleSelect?.(row.id)}
              className={cn(
                'mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border',
                selected
                  ? 'border-[#2F66C8] bg-[#2F66C8] text-white'
                  : 'border-[#D9E1EF] bg-[#EEF2F8]',
              )}
              aria-label={selected ? 'Deselect applicant' : 'Select applicant'}
              aria-pressed={selected}
            >
              {selected ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={cn('rounded-[4px] px-1.5 py-0.5 text-sm font-medium', STATUS_STYLES[row.status])}>
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
        className="flex w-full items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-2.5 text-sm font-medium text-[#2F66C8]"
      >
        View Applicant
      </Link>
    </article>
  );
}
