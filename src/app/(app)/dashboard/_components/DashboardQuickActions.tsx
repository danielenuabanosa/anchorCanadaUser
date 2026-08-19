'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { isProviderOrgVerified, promptUnverifiedProvider } from '@/store/verificationModalStore';
import { QUICK_ACTIONS } from './dashboardData';
import { useProviderAccess } from '@/features/provider/hooks/useProviderAccess';
import { PROVIDER_PERMISSIONS } from '@/features/provider/lib/permissions';

export function DashboardQuickActions() {
  const verificationStatus = useAuthStore((s) => s.user?.provider?.verificationStatus);
  const { can } = useProviderAccess();

  const actions = QUICK_ACTIONS.filter((action) => {
    if (action.label === 'Create Opportunity') return can(PROVIDER_PERMISSIONS.OPP_CREATE);
    if (action.label === 'Review Applications') return can(PROVIDER_PERMISSIONS.APP_REVIEW);
    if (action.label === 'Invite Team Members') return can(PROVIDER_PERMISSIONS.ORG_TEAM);
    return true;
  });

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="flex flex-wrap items-stretch gap-x-[50px] gap-y-2.5 xl:justify-between">
        {actions.map(({ label, href, icon: Icon, cardClass, iconWrapClass, iconColor, textColor }) => (
          <Link
            key={label}
            href={href}
            onClick={(e) => {
              if (label === 'Create Opportunity' && !isProviderOrgVerified(verificationStatus)) {
                e.preventDefault();
                promptUnverifiedProvider();
              }
            }}
            className={`flex h-[104px] w-[calc(50%-5px)] flex-col items-center justify-center gap-3.5 rounded-[10px] border px-4 py-4 text-center transition hover:opacity-90 sm:w-[180px] ${cardClass}`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-[20px] ${iconWrapClass}`}>
              <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={1.75} />
            </span>
            <span className={`text-sm font-medium leading-[18px] ${textColor}`}>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
