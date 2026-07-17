'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function inRange(d: Date, from: Date, to: Date) {
  const t = dayTime(d);
  return t >= dayTime(from) && t <= dayTime(to);
}

/** Display label: `08 Jul 2026` */
export function formatDateLabel(d: Date) {
  const day = String(d.getDate()).padStart(2, '0');
  const mon = MONTH_NAMES[d.getMonth()].slice(0, 3);
  return `${day} ${mon} ${d.getFullYear()}`;
}

export function formatRangeLabel(from: Date, to: Date) {
  return `${formatDateLabel(from)} - ${formatDateLabel(to)}`;
}

/** ISO `yyyy-mm-dd` ↔ Date helpers */
export function toIsoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseIsoDate(value?: string | null): Date | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

export function parseRangeLabel(label: string): { from: Date; to: Date } {
  const parts = label.split(' - ').map((s) => s.trim());
  const parse = (s: string) => {
    const [dd, mon, yyyy] = s.split(' ');
    const mi = MONTH_NAMES.findIndex((m) => m.slice(0, 3) === mon);
    if (!dd || mi < 0 || !yyyy) return new Date();
    return new Date(Number(yyyy), mi, Number(dd));
  };
  if (parts.length === 2) return { from: parse(parts[0]), to: parse(parts[1]) };
  const today = new Date();
  return { from: today, to: today };
}

function buildMonthCells(year: number, month: number) {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function CalendarMonthGrid({
  cursor,
  onCursorChange,
  renderDay,
}: {
  cursor: Date;
  onCursorChange: (next: Date) => void;
  renderDay: (day: Date) => React.ReactNode;
}) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = buildMonthCells(year, month);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onCursorChange(new Date(year, month - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] text-[#44516A] hover:bg-[#F8FAFC]"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-medium text-[#0F172A]">
          {MONTH_NAMES[month]} {year}
        </p>
        <button
          type="button"
          onClick={() => onCursorChange(new Date(year, month + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#EEF2F8] text-[#44516A] hover:bg-[#F8FAFC]"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 text-center text-xs text-[#8C97AD]">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (day ? <span key={day.toISOString()}>{renderDay(day)}</span> : <span key={`e-${i}`} />))}
      </div>
    </div>
  );
}

export function DateRangePicker({
  value,
  onChange,
  onClose,
  className,
}: {
  value: string;
  onChange: (label: string) => void;
  onClose: () => void;
  className?: string;
}) {
  const initial = parseRangeLabel(value);
  const [cursor, setCursor] = useState(new Date(initial.from.getFullYear(), initial.from.getMonth(), 1));
  const [from, setFrom] = useState<Date | null>(initial.from);
  const [to, setTo] = useState<Date | null>(initial.to);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClose]);

  function pick(day: Date) {
    if (!from || (from && to)) {
      setFrom(day);
      setTo(null);
      return;
    }
    if (day < from) {
      setTo(from);
      setFrom(day);
    } else {
      setTo(day);
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 w-[320px] rounded-[12px] border border-[#D9E1EF] bg-white p-4 shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      <CalendarMonthGrid
        cursor={cursor}
        onCursorChange={setCursor}
        renderDay={(day) => {
          const selected = Boolean((from && sameDay(day, from)) || (to && sameDay(day, to)));
          const ranged = Boolean(from && to && inRange(day, from, to) && !selected);
          return (
            <button
              type="button"
              onClick={() => pick(day)}
              className={cn(
                'h-9 w-full rounded-[6px] text-sm transition-colors',
                selected
                  ? 'bg-[#2F66C8] text-white'
                  : ranged
                    ? 'bg-[#EFF4FF] text-[#2F66C8]'
                    : 'text-[#0F172A] hover:bg-[#F8FAFC]',
              )}
            >
              {day.getDate()}
            </button>
          );
        }}
      />
      <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-[#EEF2F8] pt-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[6px] border border-[#EEF2F8] px-3 py-2 text-sm text-[#44516A] hover:bg-[#F8FAFC]"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!from || !to}
          onClick={() => {
            if (from && to) {
              onChange(formatRangeLabel(from, to));
              onClose();
            }
          }}
          className="rounded-[6px] bg-[#2F66C8] px-3 py-2 text-sm text-white disabled:opacity-40"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

/** Single-date field with admin-style calendar popover. Value is ISO `yyyy-mm-dd`. */
export function DatePickerField({
  id,
  value,
  onChange,
  placeholder = 'Select date',
  required,
  disabled,
  className,
  align = 'left',
}: {
  id?: string;
  value: string;
  onChange: (isoDate: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const selected = parseIsoDate(value);
  const [cursor, setCursor] = useState(
    () => (selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
  );
  const [draft, setDraft] = useState<Date | null>(selected);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setDraft(selected);
    setCursor(
      selected
        ? new Date(selected.getFullYear(), selected.getMonth(), 1)
        : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    );
  }, [open, selected]);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const display = useMemo(() => (selected ? formatDateLabel(selected) : placeholder), [selected, placeholder]);

  return (
    <div ref={wrapRef} className={cn('relative w-full', className)}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-required={required}
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          'anchor-field flex w-full items-center justify-between gap-2.5 text-left',
          disabled && 'cursor-not-allowed opacity-50',
          open && 'border-[#2F66C8]',
        )}
      >
        <span className={cn('truncate text-base', selected ? 'text-[#0F172A]' : 'text-[#8C97AD]')}>
          {display}
        </span>
        <CalendarDays className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" aria-hidden />
      </button>

      {open ? (
        <div
          className={cn(
            'absolute z-50 mt-2 w-[320px] rounded-[12px] border border-[#D9E1EF] bg-white p-4 shadow-[0px_6px_16px_rgba(0,0,0,0.08)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          <CalendarMonthGrid
            cursor={cursor}
            onCursorChange={setCursor}
            renderDay={(day) => {
              const isSelected = Boolean(draft && sameDay(day, draft));
              return (
                <button
                  type="button"
                  onClick={() => setDraft(day)}
                  className={cn(
                    'h-9 w-full rounded-[6px] text-sm transition-colors',
                    isSelected ? 'bg-[#2F66C8] text-white' : 'text-[#0F172A] hover:bg-[#F8FAFC]',
                  )}
                >
                  {day.getDate()}
                </button>
              );
            }}
          />
          <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-[#EEF2F8] pt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-[6px] border border-[#EEF2F8] px-3 py-2 text-sm text-[#44516A] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!draft}
              onClick={() => {
                if (!draft) return;
                onChange(toIsoDate(draft));
                setOpen(false);
              }}
              className="rounded-[6px] bg-[#2F66C8] px-3 py-2 text-sm text-white disabled:opacity-40"
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Chip/button that opens the admin DateRangePicker (analytics / dashboard style). */
export function DateRangeTrigger({
  value,
  onChange,
  className,
  buttonClassName,
  align = 'right',
}: {
  value: string;
  onChange: (label: string) => void;
  className?: string;
  buttonClassName?: string;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC]',
          buttonClassName,
        )}
      >
        <CalendarDays className="h-[18px] w-[18px] shrink-0 text-[#44516A]" />
        <span className="truncate">{value}</span>
      </button>
      {open ? (
        <DateRangePicker
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
          className={align === 'right' ? 'right-0' : 'left-0'}
        />
      ) : null}
    </div>
  );
}
