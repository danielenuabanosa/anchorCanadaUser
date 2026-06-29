'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { StaticImageData } from 'next/image';
import { ArrowRight } from 'lucide-react';

import infoIcon from '@assets/icons/info.png';
import { cn } from '@/lib/utils';

interface OnboardingInfoBarProps {
  message: string;
  variant?: 'desktop' | 'mobile';
  className?: string;
  icon?: StaticImageData;
  linkText?: string;
  linkHref?: string;
}

export function OnboardingInfoBar({
  message,
  variant = 'desktop',
  className,
  icon = infoIcon,
  linkText = 'Learn more about our Privacy Policy',
  linkHref = '/privacy',
}: OnboardingInfoBarProps) {
  if (variant === 'mobile') {
    return (
      <div className={cn('mt-4 rounded-[10px] bg-[#EFF4FF] p-4', className)}>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2 text-[11px] text-[#44516A]">
            <Image src={icon} alt="" width={15} height={15} className="mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
          {linkText ? (
            <Link href={linkHref} className="flex items-center gap-2 text-[11px] text-[#2F66C8]">
              {linkText}
              <ArrowRight className="h-3 w-3" />
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto mt-5 w-full max-w-[1548px] rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3 text-[16px] text-[#44516A]">
          <Image src={icon} alt="" width={24} height={24} className="shrink-0" />
          {message}
        </div>
        {linkText ? (
          <Link href={linkHref} className="flex items-center gap-3 text-[16px] text-[#2F66C8]">
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
