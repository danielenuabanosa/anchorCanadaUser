'use client';

import Image from 'next/image';
import lightBulbIcon from '@assets/icons/light-bulb.png';
import { cn } from '@/lib/utils';

interface FooterProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function Footer({ variant = 'desktop', className }: FooterProps) {
  const message = (
    <>
      <strong className="font-medium text-[#0F172A]">Not sure yet?</strong>{' '}
      You can update your location anytime in your account settings.
    </>
  );

  if (variant === 'mobile') {
    return (
      <div className={cn('mt-4 rounded-[10px] bg-[#EFF4FF] p-4', className)}>
        <div className="flex items-start gap-2 text-[11px] text-[#44516A]">
          <Image src={lightBulbIcon} alt="" width={15} height={15} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto mt-5 w-full max-w-[1548px] rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex items-start gap-3 text-[16px] text-[#44516A]">
        <Image src={lightBulbIcon} alt="" width={24} height={24} className="mt-0.5 shrink-0 object-contain" />
        <span>{message}</span>
      </div>
    </div>
  );
}
