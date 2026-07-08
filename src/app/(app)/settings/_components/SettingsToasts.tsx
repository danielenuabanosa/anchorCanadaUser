'use client';

import { Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SettingsHub } from './useSettingsHub';

export function SettingsToasts({ hub }: { hub: SettingsHub }) {
  if (!hub.toast) return null;

  if (hub.toast === 'success') {
    return (
      <div className="pointer-events-none fixed left-1/2 top-6 z-40 w-[min(412px,calc(100vw-40px))] -translate-x-1/2 xl:left-auto xl:right-10 xl:top-[130px] xl:translate-x-0">
        <div className="pointer-events-auto flex items-center gap-5 rounded-[12px] border border-[rgba(255,255,255,0.6)] bg-gradient-to-r from-[#ECFDF5] from-0% to-white to-[31.488%] px-6 py-4 shadow-[0px_6px_8px_rgba(0,0,0,0.08)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] bg-[rgba(255,255,255,0.6)]">
            <Info className="h-6 w-6 text-[#15803D]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-medium text-[#0F172A]">Settings Updated Successfully!</p>
            <p className="mt-1 text-sm text-[#8C97AD]">Your changes have been saved.</p>
          </div>
          <button type="button" onClick={() => hub.setToast(null)} className="shrink-0 text-[#44516A]" aria-label="Dismiss">
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-40 w-[min(412px,calc(100vw-40px))] -translate-x-1/2 xl:left-auto xl:right-10 xl:top-[130px] xl:translate-x-0">
      <div className="pointer-events-auto rounded-[12px] border border-[rgba(255,255,255,0.6)] bg-gradient-to-r from-[#FFF4DF] from-0% to-white to-[31.488%] px-6 py-4 shadow-[0px_6px_8px_rgba(0,0,0,0.08)]">
        <div className="flex items-start gap-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] bg-[rgba(255,255,255,0.6)]">
            <Info className="h-6 w-6 text-[#B45309]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-medium text-[#0F172A]">You have unsaved changes</p>
            <p className="mt-1 text-sm text-[#8C97AD]">You made changes that are not saved yet.</p>
          </div>
          <button
            type="button"
            onClick={() => hub.setToast(null)}
            className="shrink-0 rounded-[12px] border border-[#FEF3C7] bg-[#FFFBEB] p-1.5 text-[#44516A]"
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" strokeWidth={1.75} />
          </button>
        </div>
        <div className="mt-5 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={hub.discardChanges}
            className="rounded-[6px] border border-[#EEF2F8] bg-white px-2.5 py-2 text-xs font-medium text-[#44516A]"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={hub.saveChanges}
            className="rounded-[6px] bg-[#B45309] px-2.5 py-2 text-xs font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
