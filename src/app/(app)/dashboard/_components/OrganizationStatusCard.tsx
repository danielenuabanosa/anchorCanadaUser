'use client';

import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ORG_STATUS } from './dashboardData';

export function OrganizationStatusCard({
  className = '',
  verification = ORG_STATUS.verification,
  profileComplete = ORG_STATUS.profileComplete,
  memberSince = ORG_STATUS.memberSince,
  loading,
}: {
  className?: string;
  verification?: string;
  profileComplete?: number;
  memberSince?: string;
  loading?: boolean;
}) {
  const isVerified = verification.toLowerCase() === 'verified';

  return (
    <div className={cn('flex flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5', className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-[18px]">
          <ShieldCheck className="h-6 w-6 shrink-0 text-[#2F66C8]" strokeWidth={1.75} />
          <h3 className="text-base font-semibold leading-[1.8] text-[#0F172A]">Organization Status</h3>
        </div>
        <button
          type="button"
          className="flex h-6 w-6 shrink-0 items-center justify-center text-[#44516A]"
          aria-label="Organization status options"
        >
          <ChevronDown className="h-6 w-6" strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between py-2.5">
          <span className="text-sm text-[#44516A]">Verification Status</span>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-[6px] px-1.5 py-0.5 text-sm font-medium',
              isVerified
                ? 'bg-[#ECFDF5] text-[#15803D]'
                : 'bg-[#FFFBEB] text-[#B45309]',
            )}
          >
            {loading ? '…' : verification}
            {isVerified ? <Check className="h-3 w-3" strokeWidth={2.5} /> : null}
          </span>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between py-2.5">
            <span className="text-sm text-[#44516A]">Organization Profile</span>
            <span className="text-sm font-medium text-[#0F172A]">
              {loading ? '…' : `${profileComplete}% Complete`}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#EEF2F8]">
            <div
              className="h-full rounded-full bg-[#2F66C8]"
              style={{ width: `${Math.min(100, Math.max(0, profileComplete))}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="text-sm text-[#44516A]">Member Since</span>
          <span className="text-sm font-medium text-[#0F172A]">
            {loading ? '…' : memberSince}
          </span>
        </div>
      </div>

      <Link
        href="/organization-profile"
        className="mt-5 flex h-[45px] w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-[#EFF4FF] text-sm font-medium text-[#2F66C8] hover:bg-[#E5EEFF]"
      >
        View Organization Profile
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
