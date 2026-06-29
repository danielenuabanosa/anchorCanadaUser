'use client';

import { BUILDER_STEPS } from '@/features/opportunity-builder/lib/builderData';
import { cn } from '@/lib/utils';

export function BuilderStepProgress({
  current,
  mobile = false,
}: {
  current: number;
  mobile?: boolean;
}) {
  return (
    <div className={cn('flex w-full items-end', mobile ? 'gap-3.5' : 'gap-2.5')}>
      {BUILDER_STEPS.map((label, i) => (
        <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
          <span
            className={cn(
              'hidden text-center text-sm font-medium leading-none lg:block',
              i <= current ? 'text-[#2F66C8]' : 'text-[#8C97AD]',
            )}
          >
            {label}
          </span>
          <div
            className={cn(
              'w-full rounded-[2px]',
              mobile ? 'h-2.5' : 'h-2.5',
              i <= current ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]',
            )}
          />
        </div>
      ))}
    </div>
  );
}
