'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';

import { VERIFIED_ORG_BENEFITS } from '@/features/onboarding/lib/organizationInfoData';
import { cn } from '@/lib/utils';

import shieldIcon from '@assets/icons/shield-valid.png';
import lockIcon from '@assets/icons/lock.png';

interface TrustPanelProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function TrustPanel({ variant = 'desktop', className }: TrustPanelProps) {
  const isMobile = variant === 'mobile';

  return (
    <div
      className={cn(
        'rounded-[10px] border border-[#EEF2F8] bg-white',
        isMobile ? 'p-5' : 'sticky top-24 w-[368px] shrink-0 p-5',
        className,
      )}
    >
      <div className={cn('flex flex-col items-center border-b border-[#EEF2F8] pb-5', isMobile ? 'gap-4' : 'gap-5 py-5')}>
        <div className="flex size-[100px] items-center justify-center rounded-full bg-[#EFF4FF] px-[30px] py-5">
          <Image src={shieldIcon} alt="" width={40} height={40} className="object-contain" />
        </div>
        <div className="text-center">
          <p className="font-sans text-[18px] font-semibold text-[#0F172A]">Build Trust. Grow Impact.</p>
          <p className="mt-2.5 font-sans text-[14px] leading-[1.6] text-[#44516A]">
            A complete and verified profile helps you connect with the right people and communities
          </p>
        </div>
      </div>

      <div className="mt-[26px] flex flex-col gap-5">
        <p className="font-sans text-[16px] font-medium leading-[1.8] text-[#0F172A]">
          Verified organization receive:
        </p>
        <ul className="flex flex-col gap-4">
          {VERIFIED_ORG_BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-center gap-5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-[10px] bg-[#22C55E] p-[5px]">
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
              <span className="font-sans text-[14px] text-[#0F172A]">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[26px] flex items-center gap-5 rounded-[10px] bg-[#EFF4FF] p-4">
        <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-white p-3">
          <Image src={lockIcon} alt="" width={26} height={26} className="object-contain" />
        </div>
        <p className="font-sans text-[12px] leading-normal text-[#44516A]">
          Your information is secure and will only be used to improve your experience on Anchor Canada.
        </p>
      </div>
    </div>
  );
}
