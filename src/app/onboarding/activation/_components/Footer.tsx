'use client';

import Image from 'next/image';
import lightBulbIcon from '@assets/icons/light-bulb.png';
import infoIcon from '@assets/icons/info.png';
import { cn } from '@/lib/utils';

interface FooterProps {
  variant?: 'desktop' | 'mobile';
  phase?: 'loading' | 'success';
  className?: string;
}

export function Footer({ variant = 'desktop', phase = 'success', className }: FooterProps) {
  const loadingMessage = 'Your personalized recommendations are being prepared securely.';
  const successMessage = 'You can update your preferences anytime.';

  const message = phase === 'loading' ? loadingMessage : successMessage;
  const icon = phase === 'loading' ? infoIcon : lightBulbIcon;

  if (variant === 'mobile') {
    return (
      <div className={cn('mt-4 rounded-[10px] bg-[#EFF4FF] p-4', className)}>
        <div className="flex items-start gap-2 text-[11px] text-[#44516A]">
          <Image
            src={icon}
            alt=""
            width={15}
            height={15}
            className={cn('mt-0.5 shrink-0', phase === 'success' && 'opacity-60')}
          />
          <span className={phase === 'success' ? 'text-[#8C97AD]' : undefined}>{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto mt-5 w-full max-w-[1548px] rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex items-center gap-3 text-[16px] text-[#44516A]">
        <Image src={icon} alt="" width={24} height={24} className="shrink-0 object-contain" />
        {message}
      </div>
    </div>
  );
}
