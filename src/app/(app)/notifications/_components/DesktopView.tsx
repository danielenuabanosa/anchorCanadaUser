'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Settings, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import {
  NOTIFICATIONS,
  NOTIFICATION_FILTER_STATUS,
  NOTIFICATION_FILTER_TYPES,
  NOTIFICATION_PREFS,
  NOTIFICATION_SUMMARY,
  NOTIFICATION_TABS,
  RECENT_ACTIVITY_WIDGET,
  type NotificationTab,
} from './notificationsData';
import { NotificationRow } from './NotificationRow';
import { NotificationTabChips } from './NotificationTabChips';
import { NotificationsFilterModal } from './NotificationsFilterModal';

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [prefs, setPrefs] = useState(NOTIFICATION_PREFS);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return NOTIFICATIONS;
    return NOTIFICATIONS.filter((n) => n.tab === activeTab);
  }, [activeTab]);

  const groups = ['Today', 'Yesterday', 'Earlier'] as const;

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
            className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
          >
            <Check className="h-[18px] w-[18px]" />
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
        {NOTIFICATION_SUMMARY.map((card) => (
          <HubStatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <NotificationTabChips tabs={NOTIFICATION_TABS} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-[#EFF4FF] px-4 py-2.5 text-sm text-[#2F66C8]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-5 py-2.5 text-sm text-[#0F172A]"
          >
            Newest First
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div>
          {groups.map((group) => {
            const items = filtered.filter((n) => n.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="mb-2.5 last:mb-0">
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

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-medium text-[#8C97AD]">
              Showing 1 to {filtered.length} of {filtered.length} notifications
            </p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4 text-[#0F172A]" />
              </button>
              <button
                type="button"
                className="flex h-12 min-w-[48px] items-center justify-center rounded-[6px] bg-[#2F66C8] px-6 text-base font-medium text-white"
              >
                1
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4 text-[#0F172A]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#0F172A]">Recent Activity</h3>
              <Link href="/applications" className="flex items-center gap-1 text-sm font-medium text-[#2F66C8]">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-3">
              {RECENT_ACTIVITY_WIDGET.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.color}`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-[#8C97AD]">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <h3 className="text-lg font-medium text-[#0F172A]">Notification Preferences</h3>
            <p className="mt-1 text-sm text-[#44516A]">Manage how you receive notifications.</p>
            <ul className="mt-4 space-y-4">
              {prefs.map((pref) => (
                <li key={pref.id} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{pref.label}</p>
                    <p className="text-xs text-[#8C97AD]">{pref.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={pref.enabled}
                    onClick={() =>
                      setPrefs((p) =>
                        p.map((x) => (x.id === pref.id ? { ...x, enabled: !x.enabled } : x)),
                      )
                    }
                    className={cn(
                      'relative h-6 w-11 shrink-0 rounded-full transition',
                      pref.enabled ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
                        pref.enabled ? 'left-[22px]' : 'left-0.5',
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
            <Link
              href="/settings"
              className="mt-5 flex w-full items-center justify-center rounded-[6px] border border-[#D9E1EF] py-3 text-sm font-medium text-[#2F66C8]"
            >
              Manage Preferences
            </Link>
          </div>
        </div>
      </div>

      <NotificationsFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        typeOptions={NOTIFICATION_FILTER_TYPES}
        statusOptions={NOTIFICATION_FILTER_STATUS}
      />
    </div>
  );
}
