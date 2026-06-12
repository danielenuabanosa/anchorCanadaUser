'use client';

import Image from 'next/image';

import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';
import graduationIcon from '@assets/icons/graduation-cap.png';
import flashIcon from '@assets/icons/flash.png';
import briefcaseIcon from '@assets/icons/briefcase.png';
import cityBannerImg from '@assets/images/profile_bg.png';
import avatarImg from '@assets/images/w1.png';

const PREVIEW_BADGES = [
  { label: 'STUDENT', bg: '#F0EBFF', text: '#7C3AED', icon: graduationIcon },
  { label: 'NEWCOMER', bg: '#EEF3FF', text: '#2F66C8', icon: flashIcon },
  { label: 'ENTREPRENEUR', bg: '#E6F7EF', text: '#059669', icon: briefcaseIcon },
] as const;

const FOCUS_CHIPS = [
  { label: 'Finding Employment', bg: '#EEF3FF', text: '#2F66C8' },
  { label: 'Accessing Funding', bg: '#E6F7EF', text: '#059669' },
  { label: 'Support my community', bg: '#F0EBFF', text: '#7C3AED' },
] as const;

interface ProfilePreviewCardProps {
  displayName: string;
  pronounLabel: string;
  avatarSrc: string | null;
  compact?: boolean;
}

export function ProfilePreviewCard({
  displayName,
  pronounLabel,
  avatarSrc,
  compact = false,
}: ProfilePreviewCardProps) {
  const avatarSize = compact ? 'h-14 w-14 border-[3px]' : 'h-[72px] w-[72px] border-4';
  const bannerHeight = compact ? 'h-[100px]' : 'h-[140px]';
  const contentPadding = compact ? 'px-3 pb-3 pt-9' : 'px-5 pt-12';

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-[#D9E1EF] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] ${
        compact ? '' : 'h-[875.7px]'
      }`}
    >
      <div className={`relative w-full shrink-0 ${bannerHeight}`}>
        <div className={`absolute inset-0 overflow-hidden ${compact ? 'rounded-t-2xl' : 'rounded-t-2xl'}`}>
          <Image src={cityBannerImg} alt="city skyline" fill className=" w-[542px] h-[242px]" priority />
        </div>
        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
          <div
            className={`relative overflow-hidden rounded-full border-white bg-[#FFF9EC] shadow-sm ${avatarSize}`}
          >
            {avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <Image src={avatarImg} alt="avatar" fill className="object-cover" sizes="72px" />
            )}
          </div>
        </div>
      </div>

      <div className={`flex flex-1 flex-col text-center ${contentPadding}`}>
        <p
          className={`font-serif text-[#0F172A] ${
            compact ? 'text-[36px] leading-[56px]' : 'text-[36px] leading-tight'
          }`}
        >
          Hello, {displayName}! 👋
        </p>
        <p className={`mt-1 text-[#8C97AD] ${compact ? 'text-[14px] leading-100%' : 'text-[13px]'}`}>{pronounLabel}</p>

        <div className={`flex flex-wrap justify-center ${compact ? 'mt-2 gap-1' : 'mt-3 gap-1.5'}`}>
          {PREVIEW_BADGES.map((badge) => (
            <span
              key={badge.label}
              className={`inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wide ${
                compact ? 'px-2 py-0.5 text-[8px]' : 'px-2.5 py-1 text-[9px]'
              }`}
              style={{ background: badge.bg, color: badge.text }}
            >
              <Image
                src={badge.icon}
                alt=""
                width={compact ? 10 : 12}
                height={compact ? 10 : 12}
                className="object-contain"
              />
              {badge.label}
            </span>
          ))}
        </div>

        <div
          className={`flex items-center justify-center gap-1.5 text-[#8C97AD] ${
            compact ? 'mt-2 text-[10px]' : 'mt-3 text-[12px]'
          }`}
        >
          <Image src={locationPinIcon} alt="" width={compact ? 10 : 12} height={compact ? 10 : 12} className="opacity-60" />
          Toronto, Ontario, Canada
          <Image
            src={canadaFlagIcon}
            alt="Canada"
            width={compact ? 14 : 18}
            height={compact ? 10 : 12}
            className="rounded-sm object-cover"
          />
        </div>

        <div className={`border-t border-[#EEF2F8] ${compact ? 'my-3' : 'my-4'}`} />

        <p className={`font-medium uppercase tracking-[0.12em] text-[#8C97AD] ${compact ? 'text-[9px]' : 'text-[11px]'}`}>
          Focused on:
        </p>
        <div className={`flex flex-wrap justify-center ${compact ? 'mt-1.5 gap-1' : 'mt-2 gap-1.5'}`}>
          {FOCUS_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className={`rounded-full font-medium ${compact ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[11px]'}`}
              style={{ background: chip.bg, color: chip.text }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      <div className={`mt-auto flex shrink-0 items-start gap-3 bg-[#EFF4FF] ${compact ? 'px-3 py-3' : 'px-4 py-4'}`}>
        <div
          className={`flex shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${
            compact ? 'h-7 w-7' : 'h-9 w-9'
          }`}
        >
          <Image
            src={lightBulbIcon}
            alt=""
            width={compact ? 14 : 18}
            height={compact ? 14 : 18}
            className="object-contain"
          />
        </div>
        <p className={`text-left leading-relaxed text-[#44516A] ${compact ? 'text-[10px]' : 'text-[12px]'}`}>
          Great choice! We&apos;ll personalize your dashboard and recommendations based on your selections.
        </p>
      </div>
    </div>
  );
}
