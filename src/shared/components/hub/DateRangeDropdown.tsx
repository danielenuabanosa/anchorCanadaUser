'use client';

import { useState } from 'react';
import { CalendarDays, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DateRangePicker } from '@/shared/components/ui/DatePicker';

export const DATE_RANGE_OPTIONS = [
  'Last 7 days',
  'Last 30 days',
  'Last 90 days',
  'This Quarter',
  'Last Year',
  'Custom Range',
] as const;

export type DateRangeOption = (typeof DATE_RANGE_OPTIONS)[number];

interface DateRangeDropdownProps {
  open: boolean;
  onClose: () => void;
  value: DateRangeOption | string;
  onChange: (value: DateRangeOption | string) => void;
  className?: string;
  align?: 'left' | 'right';
}

export function DateRangeDropdown({
  open,
  onClose,
  value,
  onChange,
  className,
  align = 'right',
}: DateRangeDropdownProps) {
  const [customOpen, setCustomOpen] = useState(false);

  if (!open && !customOpen) return null;

  const customSeed =
    typeof value === 'string' && value.includes(' - ') ? value : '01 Jul 2026 - 08 Jul 2026';

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40"
        onClick={() => {
          setCustomOpen(false);
          onClose();
        }}
        aria-label="Close menu"
      />
      {open && !customOpen ? (
        <div
          className={cn(
            'absolute top-full z-50 mt-1 w-[220px] rounded-[10px] bg-[#F8FAFC] p-1 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
            align === 'right' ? 'right-0' : 'left-0',
            className,
          )}
        >
          <div className="overflow-hidden rounded-[9px] border border-[#EEF2F8] bg-white">
            {DATE_RANGE_OPTIONS.map((option, index) => {
              const selected = value === option;
              const isCustom = option === 'Custom Range';

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (isCustom) {
                      setCustomOpen(true);
                      return;
                    }
                    onChange(option);
                    onClose();
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 p-3 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]',
                    index < DATE_RANGE_OPTIONS.length - 1 && 'border-b border-[#EEF2F8]',
                  )}
                >
                  <span className="flex-1">{option}</span>
                  {isCustom ? (
                    <CalendarDays className="h-[18px] w-[18px] shrink-0 text-[#44516A]" strokeWidth={1.75} />
                  ) : selected ? (
                    <Check className="h-[18px] w-[18px] shrink-0 text-[#2F66C8]" strokeWidth={2} />
                  ) : (
                    <span className="h-[18px] w-[18px] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {customOpen ? (
        <DateRangePicker
          value={customSeed}
          onChange={(label) => {
            onChange(label);
            setCustomOpen(false);
            onClose();
          }}
          onClose={() => {
            setCustomOpen(false);
            onClose();
          }}
          className={cn('top-full', align === 'right' ? 'right-0' : 'left-0', className)}
        />
      ) : null}
    </>
  );
}
