'use client';

import Link from 'next/link';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';
import { cn } from '@/lib/utils';

interface StartBuilderDropdownProps {
  compact?: boolean;
  label?: string;
  className?: string;
}

/** Direct entry into the opportunity builder (no type dropdown). */
export function StartBuilderDropdown({
  compact = false,
  label = 'Start Opportunity Builder',
  className = '',
}: StartBuilderDropdownProps) {
  const resetBuilder = useOpportunityBuilderStore((s) => s.resetBuilder);

  return (
    <Link
      href="/opportunities/create/type"
      onClick={() => resetBuilder()}
      className={cn(
        'inline-flex h-[50px] items-center justify-center gap-2.5 rounded-[6px] bg-[#2F66C8] px-6 text-sm font-normal text-white transition hover:bg-[#2454A4] md:h-[45px] md:px-4 md:text-base',
        compact && 'md:px-3 md:text-sm',
        className.includes('w-') && 'w-full',
        className,
      )}
    >
      {label}
    </Link>
  );
}
