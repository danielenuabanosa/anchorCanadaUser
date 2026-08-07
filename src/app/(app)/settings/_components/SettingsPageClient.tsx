'use client';

import { useSettingsHub } from './useSettingsHub';
import { OrgInfoSidebar, SettingsNav, SettingsPageHeader } from './SettingsShared';
import { SettingsTabPanel } from './SettingsTabPanels';
import { SettingsModals } from './SettingsModals';
import { SettingsToasts } from './SettingsToasts';

export default function SettingsPageClient() {
  const hub = useSettingsHub();

  return (
    <div className="relative flex flex-col gap-5 pb-6">
      <SettingsPageHeader />
      <SettingsToasts hub={hub} />

      {/* Desktop: 280 | 600 | 368 */}
      <div className="hidden gap-5 xl:grid xl:grid-cols-[280px_600px_368px] xl:items-start">
        <SettingsNav active={hub.activeTab} onChange={hub.setActiveTab} className="sticky top-5" />
        <SettingsTabPanel hub={hub} />
        <OrgInfoSidebar
          className="sticky top-5"
          completionPercent={hub.profileCompletion}
          checklist={hub.completionChecklist}
        />
      </div>

      {/* Mobile: header → nav → org sidebar → tab panel (Figma order) */}
      <div className="flex flex-col gap-5 xl:hidden">
        <SettingsNav active={hub.activeTab} onChange={hub.setActiveTab} />
        <OrgInfoSidebar
          mobile
          completionPercent={hub.profileCompletion}
          checklist={hub.completionChecklist}
        />
        <SettingsTabPanel hub={hub} mobile />
      </div>

      <SettingsModals hub={hub} />
    </div>
  );
}
