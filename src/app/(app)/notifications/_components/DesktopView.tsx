'use client';



import { useEffect } from 'react';

import Link from 'next/link';

import { CheckCheck, ListFilter, Settings } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';

// Card / tab counts now come from live API via useNotificationsHub

import { useNotificationChannelPrefs } from '@/features/provider/hooks/useNotificationChannelPrefs';

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



export default function DesktopView() {

  const hub = useNotificationsHub();
  const { clearSelection, setActionsOpenId, setDeleteTargetId, setDetailTargetId, toggleSelect } = hub;

  const { prefs, togglePref } = useNotificationChannelPrefs();

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

    <div className="flex flex-col gap-5">

      <div className="flex flex-wrap items-end justify-between gap-4">

        <div>

          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Notifications</h1>

          <p className="text-base text-[#44516A]">

            Stay updated with everything happening across your organization.

          </p>

        </div>

        <div className="flex flex-wrap gap-5">

          <button

            type="button"

            onClick={hub.markAllRead}

            className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"

          >

            <CheckCheck className="h-[18px] w-[18px]" />

            Mark all as read

          </button>

          <Link

            href="/settings"

            className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"

          >

            <Settings className="h-[18px] w-[18px]" />

            Settings

          </Link>

        </div>

      </div>



      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-5">

        {hub.cards.map((card) => (

          <HubStatCard key={card.label} {...card} />

        ))}

      </div>



      <div className="flex flex-wrap items-center justify-between gap-3">

        <NotificationTabChips

          tabs={hub.tabs}

          activeTab={hub.activeTab}

          onChange={(tab) => {

            hub.setActiveTab(tab);

            hub.setPage(1);

          }}

        />

        <div className="flex items-center gap-2.5">

          <button

            type="button"

            onClick={() => hub.setFilterOpen(true)}

            className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-[#EFF4FF] px-4 py-2.5 text-sm text-[#2F66C8]"

          >

            <ListFilter className="h-3.5 w-3.5" />

            Filter

          </button>

          <NotificationSortDropdown value={hub.sort} onChange={hub.setSort} />

        </div>

      </div>



      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">

        <div>

          <NotificationsList

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



        <div className="flex flex-col gap-5">

          <NotificationsSidePanels

            prefs={prefs}

            recentActivity={hub.recentActivity}

            onPrefToggle={(id) => {
              void togglePref(id);
            }}

          />

        </div>

      </div>



      <NotificationsFilterModal

        open={hub.filterOpen}

        onClose={() => hub.setFilterOpen(false)}

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

      />



      <NotificationDetailModal

        item={hub.detailTarget}

        onClose={() => hub.setDetailTargetId(null)}

      />

    </div>

  );

}


