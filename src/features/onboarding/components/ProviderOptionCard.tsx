'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

export interface TagDef {
  label: string;
  bg: string;
  color: string;
}

export interface OptionCardDef {
  id: string;
  title: string;
  desc: string;
  tags: TagDef[];
  icon: StaticImageData;
  iconBg: string;
  footerIcon?: StaticImageData;
  footerIconBg?: string;
  footerText?: string;
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
      {selected && <Check className={`${icon} text-white`} strokeWidth={3} />}
    </div>
  );
}

export function ProviderOptionCard({
  item,
  selected,
  onSelect,
  compact = false,
  showFooter = true,
}: {
  item: OptionCardDef;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
  showFooter?: boolean;
}) {
  const iconWrap = compact ? 'h-[60px] w-[60px] rounded-[30px] p-4' : 'h-[100px] w-[100px] rounded-[50px] p-[30px]';
  const iconSize = compact ? 24 : 40;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex h-full w-full flex-col rounded-[20px] bg-white p-5 text-left shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] transition-all ${
        selected ? 'border-2 border-[#2F66C8] bg-[#DCE7FF]' : 'border border-[#D9E1EF] hover:border-[#2F66C8]/30'
      }`}
    >
      <div className={`absolute ${compact ? 'right-3 top-3' : 'right-5 top-5'}`}>
        <RadioDot selected={selected} size={compact ? 'sm' : 'md'} />
      </div>

      <div className={`flex flex-col ${compact ? 'gap-4' : 'gap-5'}`}>
        <div className={`flex flex-col ${compact ? 'gap-3' : 'gap-5'}`}>
          <div
            className={`flex items-center justify-center ${iconWrap}`}
            style={{ backgroundColor: item.iconBg }}
          >
            <Image src={item.icon} alt="" width={iconSize} height={iconSize} className="object-contain" />
          </div>

          <div className={`flex flex-col ${compact ? 'gap-3' : 'gap-7'}`}>
            <div>
              <p
                className={`font-serif text-[#0F172A] ${
                  compact ? 'text-[16px] leading-tight' : 'text-[28px] leading-[56px]'
                }`}
              >
                {item.title}
              </p>
              <p className={`mt-1 font-sans text-[#44516A] ${compact ? 'text-[12px] leading-snug' : 'text-[16px]'}`}>
                {item.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {item.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="rounded-[4px] px-1 py-0.5 font-sans text-[14px]"
                  style={{ backgroundColor: tag.bg, color: tag.color }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {showFooter && item.footerIcon && item.footerText && (
          <div className="flex items-center gap-5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[24px] p-2.5"
              style={{ backgroundColor: item.footerIconBg ?? item.iconBg }}
            >
              <Image src={item.footerIcon} alt="" width={29} height={29} className="object-contain" />
            </div>
            <p className="font-sans text-[16px] font-medium text-[#0F172A]">{item.footerText}</p>
          </div>
        )}
      </div>
    </button>
  );
}
