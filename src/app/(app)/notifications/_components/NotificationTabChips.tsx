'use client';

import { cn } from '@/lib/utils';
import type { NotificationTab } from './notificationsData';

interface NotificationTabChipsProps {
  tabs: { id: NotificationTab; label: string; count: number }[];
  activeTab: NotificationTab;
  onChange: (tab: NotificationTab) => void;
}

export function NotificationTabChips({ tabs, activeTab, onChange }: NotificationTabChipsProps) {
  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex shrink-0 items-center gap-2.5 rounded-[6px] px-3.5 py-2 text-sm',
              isActive
                ? 'bg-[#2F66C8] font-medium text-white'
                : 'border border-[#D9E1EF] bg-white font-normal text-[#8C97AD]',
            )}
          >
            {tab.label}
            <span
              className={cn(
                'inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium',
                isActive ? 'bg-white/20 text-white' : 'bg-[#EEF2F8] text-[#0F172A]',
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
