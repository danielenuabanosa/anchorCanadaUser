'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HubMenuOption {
  value: string;
  label: string;
}

interface HubMenuSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: HubMenuOption[];
  /** Shown on the trigger when value matches the first/default option, or as aria label. */
  label?: string;
  placeholder?: string;
  variant?: 'chip' | 'field' | 'default';
  className?: string;
  menuClassName?: string;
  'aria-label'?: string;
}

/**
 * Shared Figma-style dropdown for hub filters and forms.
 * - chip: compact filter bar control
 * - field: labeled filter modal control
 * - default: full-width form select
 */
export function HubMenuSelect({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select…',
  variant = 'default',
  className,
  menuClassName,
  'aria-label': ariaLabel,
}: HubMenuSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);
  const triggerText =
    variant === 'chip'
      ? label && (value === options[0]?.value || !selected)
        ? label
        : (selected?.label ?? label ?? placeholder)
      : (selected?.label ?? placeholder);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    // Capture scroll so menus don't appear to "float" over content while scrolling.
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open]);

  const isActiveChip =
    variant === 'chip' && value !== options[0]?.value && Boolean(selected);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {variant === 'field' && label ? (
        <p className="mb-1.5 text-sm font-medium text-[#0F172A]">{label}</p>
      ) : null}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel ?? label}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-2.5 text-left outline-none transition-colors',
          variant === 'chip' &&
            cn(
              'h-[45px] shrink-0 whitespace-nowrap rounded-[6px] border px-3 text-sm',
              isActiveChip || open
                ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                : 'border-[#EEF2F8] bg-white text-[#0F172A] hover:bg-[#F8FAFC]',
            ),
          variant === 'field' &&
            'w-full gap-2.5 rounded-[10px] border border-[#EEF2F8] bg-white p-3.5 text-sm text-[#0F172A]',
          variant === 'default' &&
            cn(
              'h-[50px] w-full justify-between rounded-[10px] border bg-white px-4 text-base',
              open ? 'border-[#2F66C8]' : 'border-[#D9E1EF] hover:border-[#B9C3D6]',
              selected ? 'text-[#0F172A]' : 'text-[#8C97AD]',
            ),
        )}
      >
        <span className="min-w-0 flex-1 truncate">{triggerText}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 transition-transform',
            variant === 'default' ? 'h-[18px] w-[18px] text-[#8C97AD]' : 'text-[#44516A]',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <div
          className={cn(
            'absolute z-50 mt-1.5 min-w-full overflow-hidden rounded-[10px] border-[0.6px] border-[#EEF2F8] bg-[#F8FAFC] p-1 shadow-[0px_2px_8px_rgba(0,0,0,0.05)]',
            variant === 'chip' ? 'left-0 right-auto w-[220px]' : 'left-0 right-0',
            menuClassName,
          )}
          role="presentation"
        >
          <ul
            id={listId}
            role="listbox"
            className="max-h-64 overflow-auto rounded-[9px] border-[0.6px] border-[#EEF2F8] bg-white"
          >
            {options.map((opt, index) => {
              const isSelected = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-4 p-3 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]',
                      variant === 'default' && 'text-base',
                      index < options.length - 1 && 'border-b border-[#EEF2F8]',
                    )}
                  >
                    <span className="min-w-0 flex-1">{opt.label}</span>
                    {isSelected ? (
                      <Check className="h-4 w-4 shrink-0 text-[#2F66C8]" strokeWidth={2.5} />
                    ) : (
                      <span className="h-4 w-4 shrink-0" aria-hidden />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
