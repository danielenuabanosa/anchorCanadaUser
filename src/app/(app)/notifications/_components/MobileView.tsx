'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCheck, ListFilter, Settings } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { NOTIFICATION_PREFS, NOTIFICATION_SUMMARY, NOTIFICATION_TABS } from './notificationsData';
import { NotificationTabChips } from './NotificationTabChips';
import { NotificationSortDropdown } from './NotificationSortDropdown';
import { NotificationsFilterModal } from './NotificationsFilterModal';
import { NotificationsList } from './NotificationsList';
import {
  DeleteNotificationModal,
  NotificationDetailModal,
  NotificationsSidePanels,
} from './NotificationsHubModals';
import { useNotificationsHub } from './useNotificationsHub';

export default function MobileView() {
  const hub = useNotificationsHub();
  const { clearSelection, setActionsOpenId, setDeleteTargetId, setDetailTargetId, toggleSelect } = hub;
  const [prefs, setPrefs] = useState(NOTIFICATION_PREFS);

  const searchParams = useSearchParams();
  const demo = searchParams.get('demo');

  useEffect(() => {
    if (!demo) return;

    clearSelection();
    setActionsOpenId(null);
    setDeleteTargetId(null);
    setDetailTargetId(null);

    if (demo === 'swipe') {
      setActionsOpenId('1');
      return;
    }

    if (demo === 'bulk') {
      toggleSelect('1');
      toggleSelect('2');
      toggleSelect('3');
      return;
    }

    if (demo === 'delete') {
      setActionsOpenId('1');
      setDeleteTargetId('1');
      return;
    }

    if (demo === 'detail') {
      setDetailTargetId('1');
      return;
    }
  }, [clearSelection, demo, setActionsOpenId, setDeleteTargetId, setDetailTargetId, toggleSelect]);

  return (
    <div className="flex flex-col pb-4">
      <MobileHubPageHero
        title="Notifications"
        subtitle="Stay updated with everything happening across your organization."
      />

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={hub.markAllRead}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-sm font-medium text-[#0F172A]"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </button>
        <Link
          href="/settings"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-sm font-medium text-[#0F172A]"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {NOTIFICATION_SUMMARY.slice(0, 4).map((card) => (
          <HubStatCard key={card.label} {...card} />
        ))}
        <div className="col-span-2">
          <HubStatCard {...NOTIFICATION_SUMMARY[4]} />
        </div>
      </div>

      <div className="mt-5">
        <NotificationTabChips
          tabs={NOTIFICATION_TABS}
          activeTab={hub.activeTab}
          onChange={(tab) => {
            hub.setActiveTab(tab);
            hub.setPage(1);
          }}
        />
      </div>

      <div className="mt-3 flex gap-2.5">
        <button
          type="button"
          onClick={() => hub.setFilterOpen(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-[#EFF4FF] py-2.5 text-sm text-[#2F66C8]"
        >
          <ListFilter className="h-3.5 w-3.5" />
          Filter
        </button>
        <NotificationSortDropdown value={hub.sort} onChange={hub.setSort} compact />
      </div>

      <div className="mt-5">
        <NotificationsList
          mobile
          pageItems={hub.pageItems}
          selected={hub.selected}
          selectionMode={hub.selectionMode}
          actionsOpenId={hub.actionsOpenId}
          page={hub.page}
          pageSize={hub.pageSize}
          total={hub.total}
          onPageChange={hub.goToPage}
          onPageSizeChange={hub.changePageSize}
          onToggleSelect={hub.toggleSelect}
          onToggleGroupSelect={hub.toggleGroupSelect}
          onEnterSelection={hub.enterSelectionMode}
          onOpenDetail={hub.openDetail}
          onMarkRead={hub.markRead}
          onArchive={hub.archive}
          onDelete={hub.setDeleteTargetId}
          onSetActionsOpenId={hub.setActionsOpenId}
          onBulkMarkRead={hub.handleBulkMarkRead}
          onBulkArchive={hub.handleBulkArchive}
          onBulkDelete={hub.deleteSelected}
          onClearSelection={hub.clearSelection}
        />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <NotificationsSidePanels
          mobile
          prefs={prefs}
          onPrefToggle={(id) =>
            setPrefs((current) =>
              current.map((pref) => (pref.id === id ? { ...pref, enabled: !pref.enabled } : pref)),
            )
          }
        />
      </div>

      <NotificationsFilterModal
        open={hub.filterOpen}
        onClose={() => hub.setFilterOpen(false)}
        mobile
        filters={hub.filters}
        onApply={(next) => {
          hub.setFilters(next);
          hub.setPage(1);
        }}
      />

      <DeleteNotificationModal
        open={Boolean(hub.deleteTargetId)}
        onClose={() => hub.setDeleteTargetId(null)}
        onConfirm={hub.confirmDelete}
        mobile
      />

      <NotificationDetailModal
        item={hub.detailTarget}
        onClose={() => hub.setDetailTargetId(null)}
        mobile
      />
    </div>
  );
}
