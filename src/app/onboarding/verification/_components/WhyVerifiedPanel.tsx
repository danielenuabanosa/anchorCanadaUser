'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';

import { WHY_VERIFIED_BENEFITS } from '@/features/onboarding/lib/verificationData';
import { cn } from '@/lib/utils';

import verifyIllustration from '@assets/images/rpwds-shield-3d.png';
import lockIcon from '@assets/icons/lock2.png';

interface WhyVerifiedPanelProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function WhyVerifiedPanel({ variant = 'desktop', className }: WhyVerifiedPanelProps) {
  const isMobile = variant === 'mobile';

  return (
    <div
      className={cn(
        'rounded-[10px] border border-[#EEF2F8] bg-white p-5',
        !isMobile && 'sticky top-24 w-[368px] shrink-0',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-5 pt-5">
        <div className="relative h-[158px] w-[243px]">
          <Image src={verifyIllustration} alt="" fill className="object-contain" />
        </div>
        <h3 className="text-center font-serif text-[28px] leading-[56px] text-[#0F172A]">Why Get Verified?</h3>
      </div>

      <ul className="mt-5 flex flex-col gap-4">
        {WHY_VERIFIED_BENEFITS.map((item) => (
          <li key={item.label} className="flex items-center gap-5">
            <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] p-[6.5px]">
              <Image src={item.icon} alt="" width={13} height={13} className="object-contain" />
            </span>
            <span className="font-sans text-[14px] text-[#0F172A]">{item.label}</span>
          </li>
        ))}
      </ul>

      {!isMobile && (
        <div className="mt-5 flex items-center gap-4 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-4">
          <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] p-3">
            <Image src={lockIcon} alt="" width={26} height={26} className="object-contain" />
          </div>
          <p className="font-sans text-[14px] leading-normal text-[#44516A]">
            <span className="font-semibold text-[#0F172A]">Your security is our priority.</span>{' '}
            All documents are encrypted, secured and reviewed privately.
          </p>
        </div>
      )}

      {isMobile && (
        <div className="mt-5 flex items-center gap-4 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-4">
          <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] p-3">
            <Image src={lockIcon} alt="" width={26} height={26} className="object-contain" />
          </div>
          <p className="font-sans text-[14px] leading-normal text-[#44516A]">
            <span className="font-semibold text-[#0F172A]">Your security is our priority.</span>{' '}
            All documents are encrypted, secured and reviewed privately.
          </p>
        </div>
      )}
    </div>
  );
}
