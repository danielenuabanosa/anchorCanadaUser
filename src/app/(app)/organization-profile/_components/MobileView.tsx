'use client';

import { ChevronDown, SquarePen } from 'lucide-react';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import orgAvatar from '@assets/images/prov-sickkids.png';
import {
  AboutOrganizationCard,
  IdentityDetailsCard,
  OrganizationInfoCard,
  OrgStatsRow,
} from './OrgProfileShared';
import { OrgActionMenu, OrgProfileModalLayer } from './OrgProfileModals';
import { useOrgProfileHub } from './useOrgProfileHub';

export default function MobileView() {
  const hub = useOrgProfileHub();

  return (
    <div className="flex flex-col gap-5 pb-4">
      <MobileHubPageHero
        title="Organization Profile"
        subtitle="Manage your organizations information, branding, verification, and public presence."
        action={
          <div className="relative flex gap-2.5">
            <button
              type="button"
              onClick={() => hub.openModal('edit')}
              className="inline-flex w-[258px] shrink-0 items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#2F66C8]"
            >
              <SquarePen className="h-[18px] w-[18px]" strokeWidth={1.75} />
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => hub.setActionOpen((o) => !o)}
              aria-expanded={hub.actionOpen}
              className="inline-flex flex-1 items-center justify-between rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
            >
              Action
              <ChevronDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
            <OrgActionMenu
              open={hub.actionOpen}
              onClose={() => hub.setActionOpen(false)}
              onAction={hub.handleAction}
            />
          </div>
        }
      />

      <OrgStatsRow mobile />

      <IdentityDetailsCard
        avatarSrc={orgAvatar.src}
        mobile
        onCompleteVerification={() => hub.openModal('completeVerification')}
      />

      <AboutOrganizationCard mobile />

      <OrganizationInfoCard mobile />

      <OrgProfileModalLayer hub={hub} mobile />
    </div>
  );
}
