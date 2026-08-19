'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Heart, LockKeyhole, ShieldCheck } from 'lucide-react';

import canadaFlag from '@assets/icons/canada-flag.png';
import confettiBg from '@assets/images/valid-bg.png';
import shieldSuccess from '@assets/images/rpwds-shield-3d.png';
import loginBg from '@assets/images/login-toronto-bg.png';
import mapleLeafIcon from '@assets/icons/canada-flag.png';

import {
  CHECKLIST_ITEMS,
  FOOTER_ITEMS,
  OPPORTUNITY_PREVIEW_ROWS,
  UPDATE_STATS,
} from './resetPasswordSuccessData';

function CheckIcon({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const box = size === 'sm' ? 'size-4 rounded-[8px] p-1' : 'size-6 rounded-[12px] p-1.5';
  const icon = size === 'sm' ? 'size-2' : 'size-3';

  return (
    <span className={`flex shrink-0 items-center justify-center bg-[#22C55E] text-white ${box}`}>
      <svg className={icon} viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function SuccessHero({ variant }: { variant: 'desktop' | 'mobile' }) {
  if (variant === 'mobile') {
    return (
      <div className="relative flex w-full flex-col items-center gap-5">
        <div className="relative h-[140px] w-full">
          <Image src={confettiBg} alt="" fill className="object-cover object-center" priority />
        </div>
        <div className="relative -mt-[110px] h-[125px] w-[128px]">
          <Image src={shieldSuccess} alt="Password updated" fill className="object-contain drop-shadow-xl" priority />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center gap-10">
      <div className="relative h-[269px] w-full">
        <Image src={confettiBg} alt="" fill className="object-cover object-center" priority />
      </div>
      <div className="relative -mt-[220px] h-[195px] w-[200px]">
        <Image src={shieldSuccess} alt="Password updated" fill className="object-contain drop-shadow-xl" priority />
      </div>
    </div>
  );
}

export function SuccessHeading({ variant }: { variant: 'desktop' | 'mobile' }) {
  const titleClass =
    variant === 'mobile'
      ? 'font-serif text-[48px] leading-[56px] text-[#0F172A]'
      : 'font-serif text-[60px] leading-[56px] text-[#0F172A]';
  const bodyClass = variant === 'mobile' ? 'text-[14px] text-[#8C97AD]' : 'text-[16px] text-[#8C97AD]';

  return (
    <div className={`flex flex-col items-center text-center ${variant === 'mobile' ? 'gap-2.5' : 'gap-6'}`}>
      <h1 className={titleClass}>You&apos;re Back In! 🎉</h1>
      <div className={bodyClass}>
        <p>Your password has been updated and your</p>
        <p>Anchor account is secure again.</p>
      </div>
    </div>
  );
}

export function ChecklistCard({ variant }: { variant: 'desktop' | 'mobile' }) {
  const tipClass = variant === 'mobile' ? 'text-[12px]' : 'text-[14px]';
  const itemClass = variant === 'mobile' ? 'text-[14px]' : 'text-[16px]';
  const gap = variant === 'mobile' ? 'gap-4' : 'gap-5';

  return (
    <div className={`flex w-full flex-col rounded-[20px] border border-[#D9E1EF] bg-white p-5 ${gap}`}>
      <div className="inline-flex items-center gap-2.5 self-start rounded bg-[#EEF2F8] px-1.5 py-1">
        <LockKeyhole className="size-4 text-[#5D6B86]" strokeWidth={2} aria-hidden />
        <span className={`font-sans text-[#5D6B86] ${tipClass}`}>
          You can update your password anytime in settings.
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {CHECKLIST_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-5">
            <CheckIcon size={variant === 'mobile' ? 'sm' : 'md'} />
            <span className={`font-medium text-[#0F172A] ${itemClass}`}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhileYouWereAwayStats({ variant }: { variant: 'desktop' | 'mobile' }) {
  if (variant === 'desktop') return null;

  return (
    <div className="flex w-full flex-col gap-5">
      <p className="px-2.5 text-[16px] font-medium text-[#0F172A]">While you were away</p>
      <div className="flex overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white">
        {UPDATE_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex min-w-0 flex-1 flex-col items-center gap-5 p-5 ${
              index < UPDATE_STATS.length - 1 ? 'border-r border-[#EEF2F8]' : ''
            }`}
          >
            <div className={`${stat.iconBg} flex size-[52px] items-center justify-center rounded-[26px] p-[13px]`}>
              <Image src={stat.icon} alt="" width={26} height={26} />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-[20px] font-semibold text-[#0F172A]">{stat.count}</span>
              <span className="text-[12px] text-[#44516A]">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocationBanner({ variant }: { variant: 'desktop' | 'mobile' }) {
  const titleClass =
    variant === 'mobile' ? 'text-[14px] font-medium text-[#15803D]' : 'text-[18px] font-medium text-[#15803D]';
  const bodyClass = variant === 'mobile' ? 'text-[12px] text-[#44516A]' : 'text-[16px] text-[#44516A]';
  const iconWrap =
    variant === 'mobile'
      ? 'size-[54px] rounded-[27px] p-[13.5px]'
      : 'size-[68px] rounded-[34px] p-[17px]';
  const iconSize = variant === 'mobile' ? 'size-[27px]' : 'size-[34px]';

  return (
    <div className="flex w-full items-center gap-5 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-5">
      <div className={`flex shrink-0 items-center justify-center bg-[#D1FAE5] ${iconWrap}`}>
        <LockKeyhole className={`${iconSize} text-[#15803D]`} strokeWidth={2} aria-hidden />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={titleClass}>Signed in from Toronto, Ontario</span>
          <Image src={canadaFlag} alt="Canada" width={24} height={15} className="rounded-sm object-cover" />
        </div>
        <p className={bodyClass}>Your trusted devices remain connected.</p>
      </div>
    </div>
  );
}

export function ActionButtons({ variant }: { variant: 'desktop' | 'mobile' }) {
  const btnClass =
    variant === 'mobile'
      ? 'flex h-auto w-full items-center justify-center gap-2.5 px-6 py-4 text-[14px]'
      : 'inline-flex items-center gap-2.5 px-6 py-4 text-[16px]';

  if (variant === 'mobile') {
    return (
      <div className="flex w-full flex-col gap-5">
        <Link href="/login" className={`${btnClass} rounded-[6px] bg-[#2F66C8] text-white hover:bg-[#2454A4]`}>
          Return to Anchor
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href="/reset-password"
          className={`${btnClass} rounded-[6px] border border-[#D9E1EF] bg-white text-[#2F66C8] hover:bg-[#F8FAFC]`}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/reset-password"
        className={`${btnClass} rounded-[6px] border border-[#D9E1EF] bg-white text-[#2F66C8] hover:bg-[#F8FAFC]`}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back
      </Link>
      <Link href="/login" className={`${btnClass} rounded-[6px] bg-[#2F66C8] text-white hover:bg-[#2454A4]`}>
        Return to Anchor
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

export function WelcomeSidebar() {
  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-[10px] border border-[#E0EBFF] bg-[#F8FAFC]">
      <div className="relative mb-[-28px] h-[255px] w-full">
        <Image src={loginBg} alt="" fill className="object-cover" sizes="(max-width: 1200px) 50vw, 622px" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFF4FF] via-[#EFF4FF]/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-10 py-[65px]">
          <p className="text-[20px] font-medium leading-[1.6] text-[#0F172A]">👋 Welcome back,</p>
          <p className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Jacob Sullivan</p>
          <p className="text-[16px] text-[#44516A]">Your personalized feed is ready.</p>
        </div>
      </div>

      <div className="px-5 pb-10">
        <div className="flex flex-col gap-7 rounded-[10px] border border-[#D9E1EF] bg-white px-5 py-10 shadow-[0px_6px_8px_rgba(0,64,245,0.1)]">
          <div className="flex flex-col gap-5">
            <p className="px-2.5 text-[18px] font-medium text-[#0F172A]">Your latest updates</p>
            <div className="grid grid-cols-3 gap-2.5">
              {UPDATE_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-5 rounded-[10px] border border-[#D9E1EF] p-5 text-center"
                >
                  <div className={`${stat.iconBg} flex size-[60px] items-center justify-center rounded-[30px] p-[15px]`}>
                    <Image src={stat.icon} alt="" width={30} height={30} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[24px] font-semibold text-[#0F172A]">{stat.count}</span>
                    <span className="text-[12px] text-[#44516A]">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="px-2.5 text-[18px] font-medium text-[#0F172A]">Opportunity Performance</p>
            <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
              {OPPORTUNITY_PREVIEW_ROWS.map((row, index) => (
                <div
                  key={row.id}
                  className={`flex items-center justify-between gap-5 p-5 ${
                    index < OPPORTUNITY_PREVIEW_ROWS.length - 1 ? 'border-b border-[#EEF2F8]' : ''
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <div className="relative h-20 w-[100px] shrink-0 overflow-hidden rounded-[10px]">
                      <Image src={row.image} alt="" fill className="object-cover" />
                      {row.badge ? (
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-[#15803D] px-1.5 py-1 text-[14px] font-semibold text-white">
                          {row.badge}
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[16px] font-medium text-[#0F172A]">{row.title}</p>
                      <p className="text-[14px] text-[#44516A]">{row.subtitle}</p>
                      <p className="text-[10px] italic text-[#8C97AD]">{row.footnote}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-5 py-2.5 text-[14px] text-[#2F66C8]"
                  >
                    View
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-center gap-3 px-5 py-[26px]">
                <Link href="/dashboard" className="text-[14px] font-semibold text-[#2F66C8] hover:underline">
                  Go to Dashboard
                </Link>
                <ArrowRight className="size-4 text-[#2F66C8]" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterIcon({ type }: { type: (typeof FOOTER_ITEMS)[number]['icon'] }) {
  const wrap = 'flex size-[68px] shrink-0 items-center justify-center rounded-[34px] bg-[#EFF4FF] p-[17px]';

  if (type === 'maple') {
    return (
      <div className={wrap}>
        <Image src={mapleLeafIcon} alt="" width={34} height={34} className="object-contain" />
      </div>
    );
  }

  if (type === 'heart') {
    return (
      <div className={wrap}>
        <Heart className="size-[34px] text-[#2F66C8]" strokeWidth={1.75} aria-hidden />
      </div>
    );
  }

  return (
    <div className={wrap}>
      <ShieldCheck className="size-[34px] text-[#2F66C8]" strokeWidth={1.75} aria-hidden />
    </div>
  );
}

export function TrustFooter() {
  return (
    <div className="flex w-full items-center gap-10 border-t border-[#EEF2F8] py-10">
      {FOOTER_ITEMS.map((item, index) => (
        <div key={item.label} className="flex flex-1 items-center gap-10">
          <div className="flex items-center gap-5">
            <FooterIcon type={item.icon} />
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#0F172A]">{item.label}</span>
              <span className="text-[14px] text-[#44516A]">{item.desc}</span>
            </div>
          </div>
          {index < FOOTER_ITEMS.length - 1 ? <div className="h-[70px] w-px bg-[#D9E1EF]" /> : null}
        </div>
      ))}
    </div>
  );
}
