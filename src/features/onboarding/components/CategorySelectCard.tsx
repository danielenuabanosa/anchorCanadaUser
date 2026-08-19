'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

export interface CategorySelectCardDef {
  id: string;
  title: string;
  tags: Array<{ label: string; bg: string; color: string }>;
  icon: StaticImageData;
  iconBg: string;
}

function RadioDot({ selected, size = 'md' }: { selected: boolean; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';
  const icon = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';

  return (
    <div
      className={`flex ${dim} shrink-0 items-center justify-center rounded-full border-2 transition-all ${
        selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
      }`}
    >
      {selected ? <Check className={`${icon} text-white`} strokeWidth={3} /> : null}
    </div>
  );
}

/** Figma PROVIDER-APPLICATION node 11:137 category card */
export function CategorySelectCard({
  item,
  selected,
  onSelect,
  compact = false,
}: {
  item: CategorySelectCardDef;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-white text-left shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] transition-all ${
        selected ? 'border-2 border-[#2F66C8]' : 'border border-[#D9E1EF] hover:border-[#2F66C8]/40'
      }`}
    >
      <div className={`absolute ${compact ? 'right-3 top-3' : 'right-5 top-[19px]'}`}>
        <RadioDot selected={selected} size={compact ? 'sm' : 'md'} />
      </div>

      <div className={`flex w-full flex-col ${compact ? 'gap-4 px-4 py-5' : 'gap-5 px-5 py-[30px]'}`}>
        <div
          className={`flex shrink-0 items-center justify-center ${
            compact ? 'h-[60px] w-[60px] rounded-[20px] p-4' : 'h-[100px] w-[100px] rounded-[30px] p-[30px]'
          }`}
          style={{ backgroundColor: item.iconBg }}
        >
          <Image
            src={item.icon}
            alt=""
            width={compact ? 24 : 40}
            height={compact ? 24 : 40}
            className="object-contain"
          />
        </div>

        <div className={`flex flex-col ${compact ? 'gap-4' : 'gap-7'}`}>
          <p
            className={`truncate font-serif font-normal text-[#0F172A] ${
              compact ? 'text-[18px] leading-tight' : 'text-[28px] leading-[56px]'
            }`}
          >
            {item.title}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {item.tags.map((tag) => (
              <span
                key={tag.label}
                className="rounded-[4px] px-1 py-0.5 font-sans text-[14px] leading-normal"
                style={{ backgroundColor: tag.bg, color: tag.color }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
