'use client';

import Image from 'next/image';
import infoIcon from '@assets/icons/info.png';
import { cn } from '@/lib/utils';

interface FooterProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function Footer({ variant = 'desktop', className }: FooterProps) {
  const message = 'Your dashboard will open automatically once setup is complete.';

  if (variant === 'mobile') {
    return (
      <div className={cn('mt-4 rounded-[10px] bg-[#EFF4FF] p-4', className)}>
        <div className="flex items-start gap-2 text-[11px] text-[#44516A]">
          <Image src={infoIcon} alt="" width={15} height={15} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto mt-5 w-full max-w-[1548px] rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex items-center gap-3 text-[16px] text-[#44516A]">
        <Image src={infoIcon} alt="" width={24} height={24} className="shrink-0" />
        {message}
      </div>
    </div>
  );
}
