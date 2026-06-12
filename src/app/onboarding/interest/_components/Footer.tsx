'use client';

import Image from 'next/image';
import infoIcon from '@assets/icons/info.png';
import { cn } from '@/lib/utils';

interface FooterProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function Footer({ variant = 'desktop', className }: FooterProps) {
  const message = (
    <>
      <strong className="font-medium text-[#0F172A]  font-sans text-[16px] leading-[100%]">Not sure what to choose?</strong><br/>
      You can update your interests anytime in your account settings.
    </>
  );

  if (variant === 'mobile') {
    return (
      <div className={cn('mt-4 rounded-[10px] bg-[#EFF4FF] p-4', className)}>
      <div className="flex items-start gap-3 text-[13px] leading-relaxed text-[#44516A]">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#2F66C8]">
          <Image src={infoIcon} alt="" width={40} height={40} className="object-contain" />
        </div>
        <span>
         ` {/* <strong className="block text-[15px] font-bold text-[#0F172A]">Not sure what to choose?</strong>` */}
          {message}
        </span>
      </div>
    </div>
    );
  }

  return (
    <div className={cn('mx-auto mt-5 w-full max-w-[1548px] rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex items-start gap-3 text-[16px] text-[#44516A]">
        <Image src={infoIcon} alt="" width={40} height={40} className="mt-0.5 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}
