'use client';

import Image from 'next/image';
import { Briefcase, Calendar, Check, GraduationCap, Plus, Settings, Star, Users } from 'lucide-react';
import type { BuilderTemplateDef } from '../lib/builderData';

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

const FOOTER_ICONS = {
  star: Star,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  users: Users,
  calendar: Calendar,
  settings: Settings,
  plus: Plus,
} as const;

function resolveFooterIcon(template: BuilderTemplateDef) {
  if (template.id === 'community-grant') return FOOTER_ICONS.star;
  if (template.id === 'startup-grant') return FOOTER_ICONS.briefcase;
  if (template.id === 'research-grant') return FOOTER_ICONS['graduation-cap'];
  if (template.id === 'youth-development-grant') return FOOTER_ICONS.users;
  if (template.id === 'event-sponsorship') return FOOTER_ICONS.calendar;
  return FOOTER_ICONS.settings;
}

export function TemplateOptionCard({
  template,
  selected,
  onSelect,
  compact = false,
}: {
  template: BuilderTemplateDef;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const FooterIcon = template.id === 'scratch' ? FOOTER_ICONS.settings : resolveFooterIcon(template);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex w-full flex-col overflow-hidden text-left transition-all ${
        compact
          ? `rounded-[10px] bg-white ${selected ? 'border-2 border-[#2F66C8]' : 'border border-[#EEF2F8]'}`
          : `rounded-[20px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] ${
              selected ? 'border-2 border-[#2F66C8] bg-[#F8FAFC]' : 'border border-[#D9E1EF] bg-white'
            }`
      }`}
    >
      <div className="relative h-[180px] w-full shrink-0 overflow-hidden bg-[#EFF4FF]">
        <Image src={template.heroImage} alt="" fill className="object-cover object-center" sizes="400px" />
        <div className="absolute right-5 top-5">
          <RadioDot selected={selected} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className={compact ? undefined : 'pb-2.5'}>
          <p
            className={`font-sans font-semibold text-[#0F172A] ${
              compact ? 'text-lg leading-[21px]' : 'text-[18px] leading-normal'
            }`}
          >
            {template.title}
          </p>
          <p className="mt-2.5 font-sans text-[14px] leading-[1.6] text-[#44516A]">
            {template.description}
          </p>
        </div>

        {!compact ? (
          <>
            <ul className="flex flex-col gap-4 py-2.5">
              {template.features.map((feature) => (
                <li key={feature} className="flex items-center gap-5">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ backgroundColor: template.checkColor }}
                  >
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="font-sans text-[14px] text-[#0F172A]">{feature}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-auto flex items-center justify-center gap-2.5 rounded-[10px] py-3"
              style={{ backgroundColor: template.footerBg }}
            >
              <FooterIcon className="h-5 w-5" style={{ color: template.footerColor }} />
              <span className="font-sans text-[14px] font-medium" style={{ color: template.footerColor }}>
                {template.footerLabel}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </button>
  );
}
