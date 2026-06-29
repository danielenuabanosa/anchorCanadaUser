'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import type { CategoryGroupDef } from '../lib/builderData';

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

interface CategoryGroupCardProps {
  group: CategoryGroupDef;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CategoryGroupCard({ group, selectedId, onSelect }: CategoryGroupCardProps) {
  const hasSelection = group.subcategories.some((s) => s.id === selectedId);

  function handleCardClick() {
    const currentInGroup = group.subcategories.find((s) => s.id === selectedId);
    onSelect(currentInGroup?.id ?? group.subcategories[0]?.id ?? group.id);
  }

  return (
    <button
      type="button"
      onClick={handleCardClick}
      className={`relative flex w-full flex-col overflow-hidden rounded-[20px] bg-white text-left transition-all ${
        hasSelection ? 'border-2 border-[#2F66C8]' : 'border border-[#EEF2F8]'
      }`}
    >
      <div className="absolute right-5 top-5">
        <RadioDot selected={hasSelection} />
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] p-4"
          style={{ backgroundColor: group.iconBg }}
        >
          <Image src={group.icon} alt="" width={21} height={21} className="object-contain" />
        </div>

        <div className="flex flex-col gap-5">
          <p className="font-sans text-[16px] font-medium leading-normal text-[#0F172A]">{group.title}</p>

          <div className="flex flex-wrap gap-2.5">
            {group.subcategories.map((sub) => (
              <span
                key={sub.id}
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(sub.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    onSelect(sub.id);
                  }
                }}
                className="cursor-pointer rounded-[4px] px-1 py-0.5 font-sans text-[14px] leading-normal"
                style={{
                  backgroundColor: group.tagBg,
                  color: group.tagColor,
                }}
              >
                {sub.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
