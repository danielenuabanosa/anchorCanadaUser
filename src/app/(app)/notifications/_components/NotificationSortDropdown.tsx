'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NOTIFICATION_SORT_OPTIONS, type NotificationSort } from './notificationsData';

export function NotificationSortDropdown({
  value,
  onChange,
  compact,
}: {
  value: NotificationSort;
  onChange: (value: NotificationSort) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const label = NOTIFICATION_SORT_OPTIONS.find((option) => option.id === value)?.label ?? 'Newest First';

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-sm text-[#0F172A]',
          compact ? 'flex-1 justify-center px-4 py-2.5' : 'px-5 py-2.5',
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 text-[#44516A]" />
      </button>
      {open ? (
        <>
          <button type="button" className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-label="Close sort menu" />
          <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-[180px] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-1 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
            <div className="overflow-hidden rounded-[9px] border border-[#EEF2F8] bg-white">
              {NOTIFICATION_SORT_OPTIONS.map((option, index) => {
                const selected = option.id === value;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange(option.id);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2.5 p-3 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]',
                      index < NOTIFICATION_SORT_OPTIONS.length - 1 && 'border-b border-[#EEF2F8]',
                    )}
                  >
                    <span className="flex-1">{option.label}</span>
                    {selected ? <Check className="h-[18px] w-[18px] shrink-0 text-[#2F66C8]" strokeWidth={2} /> : <span className="h-[18px] w-[18px] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
