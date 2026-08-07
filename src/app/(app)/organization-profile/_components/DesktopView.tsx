'use client';

import {
  AboutOrganizationCard,
  IdentityDetailsCard,
  OrganizationInfoCard,
  OrgStatsRow,
  PageHeaderActions,
} from './OrgProfileShared';
import { OrgActionMenu, OrgProfileModalLayer } from './OrgProfileModals';
import { useOrgProfileHub } from './useOrgProfileHub';
import { OrgProfileDisplayProvider } from './OrgProfileDisplayContext';
import { ProfileContentSkeleton, StatCardsSkeleton } from '@/shared/components/ui/PageSkeletons';

export default function DesktopView() {
  const hub = useOrgProfileHub();

  return (
    <OrgProfileDisplayProvider profile={hub.profile} stats={hub.stats}>
      <div className="flex flex-col gap-5">
        <PageHeaderActions
          onEdit={() => hub.openModal('edit')}
          onToggleAction={() => hub.setActionOpen((o) => !o)}
          actionOpen={hub.actionOpen}
        >
          <OrgActionMenu
            open={hub.actionOpen}
            onClose={() => hub.setActionOpen(false)}
            onAction={hub.handleAction}
          />
        </PageHeaderActions>

        {hub.error ? (
          <p className="rounded-[8px] border border-[#FEE2E2] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
            {hub.error}
          </p>
        ) : null}

        {hub.loading ? (
          <>
            <StatCardsSkeleton count={4} />
            <ProfileContentSkeleton />
          </>
        ) : (
          <>
            <OrgStatsRow />

            <div className="grid gap-5 xl:grid-cols-[500px_1fr_364px]">
              <IdentityDetailsCard
                avatarSrc={hub.profile.logoUrl || undefined}
                onCompleteVerification={() => hub.openModal('completeVerification')}
              />
              <AboutOrganizationCard />
              <OrganizationInfoCard />
            </div>
          </>
        )}

        <OrgProfileModalLayer hub={hub} />
      </div>
    </OrgProfileDisplayProvider>
  );
}
