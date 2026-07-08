'use client';

import { cn } from '@/lib/utils';
import type { HelpCenterTab } from '@/store/helpCenterStore';
import { COMMAND_CENTER_ITEMS } from './helpCenterData';

export function CommandCenterNav({
  activeTab,
  onSelect,
  onReportIssue,
}: {
  activeTab: HelpCenterTab;
  onSelect: (tab: HelpCenterTab) => void;
  onReportIssue: () => void;
}) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5 md:h-full md:w-[320px]">
      <p className="text-base font-semibold leading-[1.8] text-[#0F172A]">Command Center</p>

      <div className="flex w-full flex-col gap-2.5 md:min-h-0 md:flex-1 md:justify-between md:gap-0">
        <div className="flex w-full flex-col gap-2.5">
          {COMMAND_CENTER_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                className={cn(
                  'flex w-full items-center gap-5 rounded-[6px] p-2.5 text-left transition',
                  active
                    ? 'border border-[#DCE7FF] bg-[#EFF4FF] text-[#2F66C8]'
                    : 'text-[#44516A] hover:bg-[#F8FAFC]',
                )}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
                <span className="text-sm">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex w-full items-center rounded-[6px] border border-[#EEF2F8] bg-white p-4">
          <div className="flex flex-1 flex-col gap-1 text-sm">
            <p className="font-semibold text-[#0F172A]">Can&rsquo;t find what you need?</p>
            <button type="button" onClick={onReportIssue} className="text-left text-[#44516A] hover:text-[#2F66C8]">
              Report an issue and our team will assist you.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
