'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BuilderMenuOption {
  value: string;
  label: string;
}

interface BuilderMenuSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: BuilderMenuOption[];
  placeholder?: string;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

/** Figma-style builder dropdown (nodes like 872:19109): rounded panel, row dividers, check on selected. */
export function BuilderMenuSelect({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  id,
  className,
  'aria-label': ariaLabel,
}: BuilderMenuSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const listId = `${triggerId}-listbox`;

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        id={triggerId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-[50px] w-full items-center justify-between gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white px-4 text-left text-base outline-none transition-colors',
          open ? 'border-[#2F66C8]' : 'hover:border-[#B9C3D6]',
          selected ? 'text-[#0F172A]' : 'text-[#8C97AD]',
        )}
      >
        <span className="min-w-0 truncate">{selected?.label ?? placeholder}</span>
        <ChevronDown
          className={cn(
            'h-[18px] w-[18px] shrink-0 text-[#8C97AD] transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <div
          className="absolute left-0 right-0 z-50 mt-1.5 rounded-[10px] border-[0.6px] border-[#EEF2F8] bg-[#F8FAFC] p-1 shadow-[0px_2px_8px_rgba(0,0,0,0.05)]"
          role="presentation"
        >
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={triggerId}
            className="overflow-hidden rounded-[9px] border-[0.6px] border-[#EEF2F8] bg-white"
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
                      'flex w-full items-center gap-4 p-3 text-left text-base text-[#0F172A] hover:bg-[#F8FAFC]',
                      index < options.length - 1 && 'border-b border-[#EEF2F8]',
                    )}
                  >
                    <span className="min-w-0 flex-1">{opt.label}</span>
                    {isSelected ? (
                      <Check className="h-[18px] w-[18px] shrink-0 text-[#2F66C8]" strokeWidth={2.5} />
                    ) : (
                      <span className="h-[18px] w-[18px] shrink-0" aria-hidden />
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
