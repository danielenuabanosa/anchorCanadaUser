'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CREATE_OPTIONS } from '../lib/builderData';
import { useOpportunityBuilderStore, type OpportunityType } from '@/store/opportunityBuilderStore';

interface StartBuilderDropdownProps {
  compact?: boolean;
  label?: string;
  className?: string;
}

export function StartBuilderDropdown({
  compact = false,
  label = 'Start Opportunity Builder',
  className = '',
}: StartBuilderDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const resetBuilder = useOpportunityBuilderStore((s) => s.resetBuilder);
  const setBuilderData = useOpportunityBuilderStore((s) => s.setBuilderData);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(type: OpportunityType) {
    resetBuilder();
    setBuilderData({ opportunityType: type, workflowType: type });
    setOpen(false);
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-[50px] items-center justify-center gap-2.5 rounded-[6px] bg-[#2F66C8] px-6 text-sm font-normal text-white transition hover:bg-[#2454A4] md:h-[45px] md:px-4 md:text-base ${
          compact ? 'md:px-3 md:text-sm' : ''
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 min-w-[240px] overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white shadow-lg">
          {CREATE_OPTIONS.map((opt) => (
            <Link
              key={opt.id}
              href={opt.href}
              onClick={() => handleSelect(opt.id)}
              className="block px-4 py-3 text-sm text-[#44516A] transition hover:bg-[#F8FAFC] hover:text-[#2F66C8]"
            >
              {opt.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
