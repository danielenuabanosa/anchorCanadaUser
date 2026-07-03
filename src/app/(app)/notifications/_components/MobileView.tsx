'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import {
  NOTIFICATIONS,
  NOTIFICATION_FILTER_STATUS,
  NOTIFICATION_FILTER_TYPES,
  NOTIFICATION_SUMMARY,
  NOTIFICATION_TABS,
  type NotificationTab,
} from './notificationsData';
import { NotificationRow } from './NotificationRow';
import { NotificationTabChips } from './NotificationTabChips';
import { NotificationsFilterModal } from './NotificationsFilterModal';

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return NOTIFICATIONS;
    return NOTIFICATIONS.filter((n) => n.tab === activeTab);
  }, [activeTab]);

  const groups = ['Today', 'Yesterday', 'Earlier'] as const;

  return (
    <div className="flex flex-col pb-4">
      <MobileHubPageHero
        title="Notifications"
        subtitle="Stay updated with everything happening across your organization."
      />

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {NOTIFICATION_SUMMARY.slice(0, 4).map((card) => (
          <HubStatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="mt-5">
        <NotificationTabChips tabs={NOTIFICATION_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-3 flex gap-2.5">
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-[#EFF4FF] py-2.5 text-sm text-[#2F66C8]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter
        </button>
        <button
          type="button"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-sm text-[#0F172A]"
        >
          Newest
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-5 space-y-2.5">
        {groups.map((group) => {
          const items = filtered.filter((n) => n.group === group);
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <p className="py-2.5 text-sm font-medium text-[#0F172A]">{group}</p>
              <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
                {items.map((item, index) => (
                  <NotificationRow
                    key={item.id}
                    title={item.title}
                    body={item.body}
                    time={item.time}
                    unread={item.unread}
                    icon={item.icon}
                    iconBg={item.iconBg}
                    iconColor={item.iconColor}
                    className={cn(index < items.length - 1 && 'border-b border-[#EEF2F8]')}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <NotificationsFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        mobile
        typeOptions={NOTIFICATION_FILTER_TYPES}
        statusOptions={NOTIFICATION_FILTER_STATUS}
      />
    </div>
  );
}
