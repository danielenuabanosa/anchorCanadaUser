'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

/* Figma design-token class aliases */
export const card = 'bg-white border border-[#EEF2F8] rounded-[10px]';
export const cardShadow = 'shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]';
export const textPrimary = 'text-[#0F172A]';
export const textSecondary = 'text-[#44516A]';
export const textTertiary = 'text-[#8C97AD]';
export const textBrand = 'text-[#2F66C8]';
export const bgBrand = 'bg-[#2F66C8]';
export const bgBrandSubtle = 'bg-[#EFF4FF]';
export const borderDefault = 'border-[#D9E1EF]';

export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className={cn('font-instrument-serif text-[36px] leading-[56px]', textPrimary)}>{title}</h1>
      <p className={cn(textSecondary, 'text-base max-md:text-sm')}>{subtitle}</p>
    </div>
  );
}

export function SectionCard({ icon, title, action, children, className }: {
  icon?: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(card, 'overflow-hidden', className)}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEF2F8]">
        <div className="flex items-center gap-4">
          {icon && <span className={textPrimary}>{icon}</span>}
          <h3 className={cn(textPrimary, 'font-medium text-lg max-md:text-base')}>{title}</h3>
        </div>
        {action}
      </div>
      <div className="p-5 max-md:p-4">{children}</div>
    </div>
  );
}

export function TabNav<T extends string>({ tabs, active, onChange, className }: {
  tabs: { id: T; label: string; icon?: React.ReactNode }[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-0 border-b border-[#EEF2F8] overflow-x-auto no-scrollbar', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2.5 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap max-md:gap-2 max-md:px-3 max-md:py-3 max-md:text-xs',
            active === tab.id
              ? 'border-[#2F66C8] text-[#2F66C8]'
              : 'border-transparent text-[#44516A] hover:text-[#0F172A]',
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ on, onChange, size = 'md' }: {
  on: boolean;
  onChange: (v: boolean) => void;
  size?: 'sm' | 'md';
}) {
  const sm = size === 'sm';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={cn(
        'relative rounded-full transition-colors shrink-0',
        sm ? 'w-10 h-5' : 'w-11 h-6',
        on ? bgBrand : 'bg-[#D9E1EF]',
      )}
    >
      <span className={cn(
        'absolute top-0.5 rounded-full bg-white shadow-sm transition-all',
        sm ? 'w-4 h-4' : 'w-5 h-5',
        on ? 'right-0.5 left-auto' : 'left-0.5',
      )} />
    </button>
  );
}

export function DonutChart({ total, segments, size = 102 }: {
  total: number;
  segments: { color: string; offset: number }[];
  size?: number;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#EEF2F8" strokeWidth="10" />
        {segments.map((seg, i) => (
          <circle key={i} cx="40" cy="40" r="30" fill="none" stroke={seg.color} strokeWidth="10"
            strokeDasharray="188.5" strokeDashoffset={seg.offset} />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn(textPrimary, 'font-bold text-2xl leading-none max-md:text-xl')}>{total}</span>
        <span className={cn(textSecondary, 'text-xs font-medium mt-0.5')}>Total</span>
      </div>
    </div>
  );
}

export function ProfileStrengthRing({ percent = 92, size = 60, showLabel = true }: { percent?: number; size?: number; showLabel?: boolean }) {
  const offset = 188.5 * (1 - percent / 100);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#EEF2F8" strokeWidth="10" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="#22C55E" strokeWidth="10"
          strokeDasharray="188.5" strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(textPrimary, 'font-bold leading-none', size >= 100 ? 'text-[28px]' : size >= 60 ? 'text-sm' : 'text-xs')}>
            {percent}%
          </span>
        </div>
      )}
    </div>
  );
}

export const PROFILE_TAGS = [
  { label: 'Open to Opportunities', bg: 'bg-[#ECFDF5]', text: 'text-[#15803D]' },
  { label: 'Work Permit Holder', bg: 'bg-[#E6DFFD]', text: 'text-[#502CC2]' },
  { label: 'Available Immediately', bg: 'bg-[#E2E9FE]', text: 'text-[#1040FC]' },
] as const;

export function ProfileTags({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-2 max-md:gap-1.5', className)}>
      {PROFILE_TAGS.map((tag) => (
        <span key={tag.label} className={cn('text-xs px-1.5 py-0.5 rounded-[4px]', tag.bg, tag.text)}>
          {tag.label}
        </span>
      ))}
    </div>
  );
}

export function SettingsStatusBar({ percent = 92 }: { percent?: number }) {
  return (
    <div className={cn(card, cardShadow, 'flex items-center h-[100px] shrink-0 max-lg:w-full')}>
      <div className="flex items-center gap-[26px] px-5 py-2.5 border-r border-[#EEF2F8] h-full">
        <div>
          <p className={cn(textSecondary, 'text-sm font-medium')}>Profile Strength</p>
          <p className={cn(textPrimary, 'font-bold text-[28px] leading-none mt-2.5')}>{percent}%</p>
        </div>
        <ProfileStrengthRing percent={percent} size={60} showLabel={false} />
      </div>
      <div className="flex items-center gap-4 px-5 py-2.5">
        <div className="bg-[#ECFDF5] w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" aria-hidden>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <p className={cn(textPrimary, 'font-medium text-base')}>Account Verified</p>
          <p className={cn(textSecondary, 'text-sm font-medium mt-1')}>Your account is fully verified</p>
        </div>
      </div>
    </div>
  );
}

export function TipOfDayCard({ illustration }: { illustration: string | StaticImageData }) {
  return (
    <div className="bg-[#F1F5FD] border border-[#D9E1EF] rounded-[20px] overflow-hidden">
      <div className="p-5 flex flex-col gap-10 max-md:gap-4 max-md:p-4">
        <div className="flex items-center gap-5 max-md:gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F66C8" strokeWidth="2" aria-hidden>
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" /><path d="M10 22h4" />
          </svg>
          <h3 className={cn('font-instrument-serif text-2xl max-md:text-xl', textPrimary)}>Tip of the Day</h3>
        </div>
        <p className={cn(textSecondary, 'text-xs leading-normal')}>
          Respond quickly to opportunities to increase your chances of success.
        </p>
      </div>
      <div className="flex justify-end pr-5 pb-0 max-md:justify-center max-md:pb-4">
        <Image src={illustration} alt="" width={215} height={125} className="object-contain" aria-hidden />
      </div>
    </div>
  );
}
