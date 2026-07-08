'use client';

import orgAvatar from '@assets/images/prov-sickkids.png';
import {
  AboutOrganizationCard,
  IdentityDetailsCard,
  OrganizationInfoCard,
  OrgStatsRow,
  PageHeaderActions,
} from './OrgProfileShared';
import { OrgActionMenu, OrgProfileModalLayer } from './OrgProfileModals';
import { useOrgProfileHub } from './useOrgProfileHub';

export default function DesktopView() {
  const hub = useOrgProfileHub();

  return (
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

      <OrgStatsRow />

      <div className="grid gap-5 xl:grid-cols-[500px_1fr_364px]">
        <IdentityDetailsCard
          avatarSrc={orgAvatar.src}
          onCompleteVerification={() => hub.openModal('completeVerification')}
        />
        <AboutOrganizationCard />
        <OrganizationInfoCard />
      </div>

      <OrgProfileModalLayer hub={hub} />
    </div>
  );
}
