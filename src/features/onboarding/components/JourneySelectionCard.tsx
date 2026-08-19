'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import type { TagDef } from './ProviderOptionCard';

export interface JourneyCardDef {
  id: 'publish' | 'explore';
  title: string;
  body: string;
  tags: TagDef[];
  statIconSrc: StaticImageData;
  statIconBg: string;
  statBold: string;
  statMuted?: string;
  image: StaticImageData;
  heroBg?: StaticImageData;
}

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
        selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
      }`}
    >
      {selected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
    </div>
  );
}

export function JourneySelectionCard({
  card,
  selected,
  onSelect,
  compact = false,
}: {
  card: JourneyCardDef;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex w-full max-w-[490px] flex-col overflow-hidden rounded-[20px] text-left shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] transition-all ${
        selected ? 'border-2 border-[#2F66C8] bg-[#DCE7FF]' : 'border border-[#D9E1EF] bg-white'
      }`}
    >
      <div className={`relative w-full overflow-hidden bg-[#EFF4FF] ${compact ? 'h-[180px]' : 'h-[240px]'}`}>
        <Image
          src={card.image}
          alt={card.title}
          fill
          priority
          loading="eager"
          className="object-contain object-bottom"
          sizes="(max-width: 768px) 100vw, 490px"
        />
        <div className={`absolute ${compact ? 'right-4 top-4' : 'right-5 top-5'}`}>
          <RadioCircle selected={selected} />
        </div>
      </div>

      <div className={`flex flex-col justify-between ${compact ? 'gap-4 p-4' : 'h-[273px] p-5'}`}>
        <div className={`flex flex-col ${compact ? 'gap-4' : 'gap-7'}`}>
          <div>
            <h3 className={`font-serif text-[#0F172A] ${compact ? 'text-[22px] leading-tight' : 'text-[28px] leading-[56px]'}`}>
              {card.title}
            </h3>
            <p className={`font-sans text-[#44516A] ${compact ? 'mt-1 text-[14px]' : 'text-[16px]'}`}>{card.body}</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {card.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-[4px] px-1 py-0.5 font-sans ${compact ? 'text-[12px]' : 'text-[14px]'}`}
                style={{ backgroundColor: tag.bg, color: tag.color }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        <div className={`flex items-center ${compact ? 'gap-3 border-t border-[#EEF2F8] pt-4' : 'gap-5'}`}>
          <div className={`flex shrink-0 items-center justify-center rounded-[24px] ${compact ? 'h-10 w-10 p-2' : 'h-12 w-12 p-2.5'} ${card.statIconBg}`}>
            <Image src={card.statIconSrc} alt="" width={compact ? 18 : 29} height={compact ? 18 : 29} className="object-contain" />
          </div>
          <div>
            <p className={`font-sans font-medium text-[#0F172A] ${compact ? 'text-[13px]' : 'text-[16px]'}`}>{card.statBold}</p>
            {card.statMuted && (
              <p className={`font-sans text-[#44516A] ${compact ? 'text-[12px]' : 'text-[14px]'}`}>{card.statMuted}</p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
