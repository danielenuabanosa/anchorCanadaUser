'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatePickerField, parseIsoDate, toIsoDate } from '@/shared/components/ui/DatePicker';

interface SchedulePublishModalProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (payload: { date: string; time: string }) => void;
  initialDate?: string;
  initialTime?: string;
}

function toDateInputValue(isoOrDisplay?: string) {
  const parsed = parseIsoDate(isoOrDisplay);
  return parsed ? toIsoDate(parsed) : '';
}

function formatTimeLabel(time24: string) {
  if (!time24) return 'Select time';
  const [hStr, mStr] = time24.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return time24;
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function SchedulePublishModal({
  open,
  onClose,
  onSchedule,
  initialDate,
  initialTime = '10:00',
}: SchedulePublishModalProps) {
  const [date, setDate] = useState(toDateInputValue(initialDate));
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (!open) return;
    setDate(toDateInputValue(initialDate) || '');
    setTime(initialTime || '10:00');
  }, [open, initialDate, initialTime]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const canSchedule = useMemo(() => Boolean(date && time), [date, time]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-publish-title"
        className={cn(
          'relative z-10 flex w-full flex-col overflow-hidden border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]',
          'max-h-[90vh] rounded-t-[20px] sm:max-w-[720px] sm:rounded-[20px]',
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#EEF2F8] p-5 sm:p-[26px]">
          <h2 id="schedule-publish-title" className="text-[18px] font-medium text-[#0F172A]">
            Schedule Publish
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-10 sm:px-[26px]">
          <div>
            <p className="font-serif text-[24px] text-[#0F172A] sm:text-[28px]">Schedule Publication</p>
            <p className="mt-1 text-sm text-[#44516A]">
              Choose when you&apos;d like this opportunity to go live.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2.5">
                <span className="text-base font-semibold leading-[1.8] text-[#0F172A]">
                  Publish Date <span className="font-normal text-[#EF4444]">*</span>
                </span>
                <DatePickerField
                  value={date}
                  onChange={setDate}
                  required
                  placeholder="Select date"
                />
              </label>

              <label className="flex flex-col gap-2.5">
                <span className="text-base font-semibold leading-[1.8] text-[#0F172A]">
                  Publish Time <span className="font-normal text-[#EF4444]">*</span>
                </span>
                <span className="relative flex h-[54px] items-center rounded-[10px] border border-[#D9E1EF] bg-white px-4">
                  <span className="min-w-0 flex-1 truncate text-base text-[#0F172A]">
                    {formatTimeLabel(time)}
                  </span>
                  <Clock className="pointer-events-none h-5 w-5 shrink-0 text-[#8C97AD]" />
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label="Publish Time"
                  />
                </span>
              </label>
            </div>
            <p className="text-sm text-[#8C97AD]">Time zone: Eastern Time (ET)</p>
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-5 sm:p-[26px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[45px] min-w-[86px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-5 text-sm font-medium text-[#44516A] hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSchedule}
            onClick={() => onSchedule({ date, time })}
            className={cn(
              'flex h-[45px] items-center justify-center rounded-[6px] px-5 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',
              canSchedule ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40',
            )}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
