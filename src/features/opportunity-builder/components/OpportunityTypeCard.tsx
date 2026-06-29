'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import type { OpportunityTypeDef } from '../lib/builderData';

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
        selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
      }`}
    >
      {selected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
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
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex w-full flex-col overflow-hidden text-left transition-all ${
        compact
          ? `rounded-[10px] border bg-white ${selected ? 'border-[#2F66C8]' : 'border-[#EEF2F8]'}`
          : `rounded-[20px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] ${
              selected ? 'border-2 border-[#2F66C8] bg-[#F8FAFC]' : 'border border-[#D9E1EF] bg-white'
            }`
      }`}
    >
      <div className="relative h-[180px] w-full overflow-hidden bg-[#EFF4FF]">
        <Image src={item.heroImage} alt="" fill className="object-cover object-center" sizes="400px" />
        <div className="absolute right-5 top-5">
          <RadioDot selected={selected} />
        </div>
      </div>

      {compact ? (
        <div className="flex flex-col gap-5 px-5 py-5">
          <div className="flex items-center gap-5">
            <div
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[8.667px] p-2"
              style={{ backgroundColor: item.iconBg }}
            >
              <Image src={item.icon} alt="" width={24} height={24} className="object-contain" />
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
        </div>
      ) : (
        <div className="flex min-h-[320px] flex-col gap-5 p-5">
        <div className="flex items-start gap-4">
          <div
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full p-3"
            style={{ backgroundColor: item.iconBg }}
          >
            <Image src={item.icon} alt="" width={26} height={26} className="object-contain" />
          </div>
          <div>
            <p className="font-sans text-[18px] font-semibold text-[#0F172A]">{item.title}</p>
            <p className="mt-1 font-sans text-[14px] text-[#44516A]">{item.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag.label}
              className="rounded-[4px] px-1.5 py-0.5 font-sans text-[12px]"
              style={{ backgroundColor: tag.bg, color: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <ul className="flex flex-col gap-2">
          {item.checklist.map((line) => (
            <li key={line} className="flex items-center gap-2 font-sans text-[14px] text-[#44516A]">
              <Check className="h-4 w-4 shrink-0 text-[#22C55E]" strokeWidth={2.5} />
              {line}
            </li>
          ))}
        </ul>

        <div className="rounded-[6px] border border-[#EEF2F8] bg-[#F8FAFC] px-3 py-2">
          <p className="font-sans text-[12px] text-[#8C97AD]">Sample requirement</p>
          <p className="font-sans text-[14px] font-medium text-[#44516A]">{item.sampleRequirement}</p>
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-[#EEF2F8] pt-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: item.iconBg }}
          >
            <Image src={item.icon} alt="" width={20} height={20} className="object-contain" />
          </div>
          <p className="font-sans text-[14px] font-medium text-[#0F172A]">{item.footerText}</p>
        </div>
        </div>
      )}
    </button>
  );
}
