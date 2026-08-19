'use client';

import { Check } from 'lucide-react';
import { useHelpCenterStore } from '@/store/helpCenterStore';
import { Avatar } from '@/shared/components/ui/Avatar';
import { useAuthStore } from '@/store/authStore';
import { useOrgBrandingStore } from '@/store/orgBrandingStore';
import { photoSrc } from '@/shared/lib/photoSrc';
import { REPORT_SUBMITTER } from './helpCenterData';
import { HelpCenteredShell } from './HelpCenterShared';

export function IssueSubmittedModal() {
  const reportOpen = useHelpCenterStore((s) => s.reportOpen);
  const reportSubmitted = useHelpCenterStore((s) => s.reportSubmitted);
  const closeReport = useHelpCenterStore((s) => s.closeReport);
  const user = useAuthStore((s) => s.user);
  const orgLogo = useOrgBrandingStore((s) => s.logoUrl);
  const orgName = useOrgBrandingStore((s) => s.organizationName);
  const name = user?.name || orgName || REPORT_SUBMITTER.name;
  const email = user?.email || REPORT_SUBMITTER.email;
  const photo = photoSrc(user?.avatarUrl) || photoSrc(orgLogo);

  if (!reportOpen || !reportSubmitted) return null;

  return (
    <HelpCenteredShell
      onClose={closeReport}
      footer={
        <button
          type="button"
          onClick={closeReport}
          className="w-full rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] transition hover:bg-[#2554A6]"
        >
          Close
        </button>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex size-[160px] items-center justify-center rounded-[80px] bg-[#F1FFEE] p-4">
          <div className="flex size-[128px] items-center justify-center rounded-full bg-[#DCFCE7]">
            <Check className="h-14 w-14 text-[#15803D]" strokeWidth={2.5} aria-hidden />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-center gap-1.5">
          <span className="font-serif text-[28px] text-[#0F172A] md:text-[36px]">Issue</span>
          <span className="font-serif text-[28px] italic text-[#2F66C8] md:text-[36px]">Submitted!</span>
        </div>

        <p className="mt-5 text-base text-[#44516A]">Thank you for reporting this issue.</p>

        <div className="mt-4 flex w-full items-center gap-4 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-3.5">
          <Avatar src={photo} fallback={name} size="md" className="shrink-0" />
          <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-[#0F172A]">{name}</p>
              <p className="truncate text-xs text-[#44516A]">{email}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-[#8C97AD]">Reference ID</p>
              <p className="text-sm font-medium text-[#15803D]">{REPORT_SUBMITTER.referenceId}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-base text-[#44516A]">
          Our support team will review your issue and contact you shortly.
        </p>
      </div>
    </HelpCenteredShell>
  );
}
