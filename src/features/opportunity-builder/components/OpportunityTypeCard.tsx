'use client';

import Image from 'next/image';
import { Check, Building2, ExternalLink, Link2, Users } from 'lucide-react';
import type { OpportunityTypeDef } from '../lib/builderData';
import { cn } from '@/lib/utils';

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div
      className={cn(
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all',
        selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white',
      )}
    >
      {selected ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
    </div>
  );
}

export function OpportunityTypeCard({
  item,
  selected,
  onSelect,
  compact = false,
}: {
  item: OpportunityTypeDef;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const isExternal = item.id === 'external';
  const TypeIcon = isExternal ? ExternalLink : Building2;
  const FooterIcon = isExternal ? Link2 : Users;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative flex w-full flex-col overflow-hidden text-left transition-all',
        compact
          ? cn('rounded-[10px] border bg-white', selected ? 'border-[#2F66C8]' : 'border-[#EEF2F8]')
          : cn(
              'rounded-[20px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]',
              selected
                ? 'border-2 border-[#2F66C8] bg-[#F8FAFC]'
                : 'border border-[#D9E1EF] bg-white',
            ),
      )}
    >
      <div className="relative h-[180px] w-full overflow-hidden bg-[#EFF4FF]">
        <Image src={item.heroImage} alt="" fill className="object-cover object-center" sizes="400px" />
        <div className="absolute right-5 top-5">
          <RadioDot selected={selected} />
        </div>
      </div>

      <div className={cn('flex flex-col', compact ? 'gap-5 px-5 py-5' : 'min-h-[496px] gap-0 p-0')}>
        <div className={cn('flex flex-col gap-5', !compact && 'px-5 pt-5')}>
          <div className="flex items-center gap-5">
            <div
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[8.667px]"
              style={{ backgroundColor: item.iconBg }}
            >
              <TypeIcon className="h-6 w-6" style={{ color: item.accentColor }} strokeWidth={1.75} />
            </div>
            <p className="font-sans text-lg font-semibold leading-[21px] text-[#0F172A]">{item.title}</p>
          </div>

          <p className="font-sans text-sm leading-[1.6] text-[#44516A]">{item.description}</p>

          <div className="flex flex-wrap gap-2.5">
            {item.tags.map((tag) => (
              <span
                key={tag.label}
                className="rounded px-1.5 py-0.5 font-sans text-sm font-medium"
                style={{ backgroundColor: tag.bg, color: tag.color }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {!compact ? (
            <ul className="flex flex-col gap-5 border-t border-[#EEF2F8] pt-5">
              {item.checklist.map((line) => (
                <li key={line} className="flex items-center gap-5 font-sans text-sm text-[#0F172A]">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div
          className={cn(
            'mt-auto flex items-center justify-center gap-2.5 border-t border-[#EEF2F8]',
            compact ? 'pt-0' : 'mx-5 mb-0 mt-5 h-[60px]',
          )}
        >
          {!compact ? (
            <>
              <FooterIcon className="h-5 w-5" style={{ color: item.accentColor }} strokeWidth={1.75} />
              <p className="font-sans text-sm font-medium" style={{ color: item.accentColor }}>
                {item.footerText}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </button>
  );
}
