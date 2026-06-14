'use client';

import Image from 'next/image';
import { Pencil } from 'lucide-react';

import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import avatarImg from '@assets/images/w1.png';

import {
  DEFAULT_PROFILE,
  FOCUS_CHIPS,
  PREVIEW_BADGES,
} from './profilePreviewData';

interface ProfileSummaryProps {
  displayName?: string;
  pronounLabel?: string;
  location?: string;
  avatarSrc?: string | null;
  onEditAvatar?: () => void;
}

export function ProfileSummary({
  displayName = DEFAULT_PROFILE.displayName,
  pronounLabel = DEFAULT_PROFILE.pronounLabel,
  location = DEFAULT_PROFILE.location,
  avatarSrc = null,
  onEditAvatar,
}: ProfileSummaryProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-[3px] border-white bg-[#FFF9EC] shadow-sm">
          {avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <Image src={avatarImg} alt="" fill className="object-cover" sizes="128px" />
          )}
        </div>
        <button
          type="button"
          onClick={onEditAvatar}
          aria-label="Edit profile photo"
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#2F66C8] shadow-sm transition-colors hover:bg-[#F8FAFC]"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      {/* Name + pronouns */}
      <p className="mt-4 font-serif text-[28px] leading-none text-[#0F172A]">{displayName}</p>
      <p className="mt-1 font-sans text-[12px] leading-[100%] text-[#8C97AD]">{pronounLabel}</p>

      {/* Badges */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {PREVIEW_BADGES.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide"
            style={{ background: badge.bg, color: badge.text }}
          >
            <Image src={badge.icon} alt="" width={14} height={14} className="object-contain" />
            {badge.label}
          </span>
        ))}
      </div>

      {/* Location */}
      <div className="mt-4 flex items-center justify-center gap-2 font-sans text-[14px] text-[#8C97AD]">
        <Image src={locationPinIcon} alt="" width={16} height={16} className="opacity-60" />
        <span className="truncate">{location}</span>
        <Image
          src={canadaFlagIcon}
          alt="Canada"
          width={20}
          height={14}
          className="shrink-0 rounded-sm object-cover"
        />
      </div>

      {/* Divider */}
      <div className="mt-5 w-full border-t border-[#E2E8F0]" />

      {/* Focused on */}
      <div className="mt-4 w-full">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#8C97AD]">
          Focused on:
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {FOCUS_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="rounded-full px-2.5 py-1 font-sans text-[10px] font-medium"
              style={{ background: chip.bg, color: chip.text }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}