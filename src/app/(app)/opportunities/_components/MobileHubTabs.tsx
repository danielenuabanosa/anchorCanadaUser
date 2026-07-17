'use client';

import { cn } from '@/lib/utils';

interface MobileHubTab {
  id: string;
  label: string;
  count: number;
}

interface MobileHubTabsProps<T extends string> {
  tabs: MobileHubTab[];
  activeTab: T;
  onChange: (tab: T) => void;
}

export function MobileHubTabs<T extends string>({ tabs, activeTab, onChange }: MobileHubTabsProps<T>) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 no-scrollbar">
      <div className="flex min-w-max gap-2.5 border-b border-[#EEF2F8]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id as T)}
              className={cn(
                'shrink-0 px-2.5 py-3.5 text-sm leading-[18px]',
                isActive
                  ? 'border-b-[1.4px] border-[#2F66C8] font-medium text-[#2F66C8]'
                  : 'text-[#0F172A]',
              )}
            >
              {tab.label} ({tab.count.toLocaleString()})
            </button>
          );
        })}
      </div>
    </div>
  );
}
