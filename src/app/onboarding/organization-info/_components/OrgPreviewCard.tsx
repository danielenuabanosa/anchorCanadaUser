'use client';

import Image from 'next/image';
import locationPinIcon from '@assets/icons/location2.png';
import mailIcon from '@assets/icons/mail2.png';
import defaultLogo from '@assets/images/prov-utoronto.png';

interface OrgPreviewCardProps {
  orgName: string;
  description: string;
  city: string;
  province: string;
  email: string;
  logoSrc?: string | null;
}

export function OrgPreviewCard({
  orgName,
  description,
  city,
  province,
  email,
  logoSrc,
}: OrgPreviewCardProps) {
  const locationLabel = [city, province].filter(Boolean).join(', ') || 'Toronto, ON';
  const displayName = orgName.trim() || 'Your Organization';
  const displayDesc = description.trim() || 'Tell people about your organization and the opportunities you offer.';

  return (
    <div className="overflow-hidden rounded-2xl border border-[#D9E1EF] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
      <div className="h-[100px] bg-gradient-to-r from-[#EFF4FF] to-[#DCE7FF]" />

      <div className="relative px-5 pb-5">
        <div className="-mt-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm">
          {logoSrc ? (
            <img src={logoSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <Image src={defaultLogo} alt="" width={64} height={64} className="object-contain" />
          )}
        </div>

        <h3 className="mt-4 font-serif text-[28px] leading-tight text-[#0F172A]">{displayName}</h3>
        <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#44516A]">{displayDesc}</p>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 font-sans text-[13px] text-[#8C97AD]">
            <Image src={locationPinIcon} alt="" width={14} height={14} className="opacity-60" />
            {locationLabel}
          </div>
          {email.trim() && (
            <div className="flex items-center gap-2 font-sans text-[13px] text-[#8C97AD]">
              <Image src={mailIcon} alt="" width={14} height={14} className="opacity-60" />
              {email}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#EFF4FF] px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest text-[#2F66C8]">
            Verified Provider
          </span>
        </div>
      </div>
    </div>
  );
}
