'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import infoIcon from '@assets/icons/info.png';
import { cn } from '@/lib/utils';

interface FooterProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function Footer({ variant = 'desktop', className }: FooterProps) {
  const message = 'Your journey can be updated anytime in your account settings.';

  if (variant === 'mobile') {
    return (
      <div className={cn('mt-4 rounded-[10px] bg-[#EFF4FF] p-4', className)}>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2 text-[11px] text-[#44516A]">
            <Image src={infoIcon} alt="" width={15} height={15} className="mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 text-[11px] text-[#2F66C8] transition-opacity hover:opacity-75"
          >
            Learn more about our Privacy Policy
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto mt-5 w-full max-w-[1548px] rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-[16px] text-[#44516A]">
          <Image src={infoIcon} alt="" width={24} height={24} className="shrink-0" />
          {message}
        </div>
        <Link
          href="/privacy"
          className="inline-flex items-center gap-3 text-[16px] text-[#2F66C8] transition-opacity hover:opacity-75"
        >
          Learn more about our Privacy Policy
          <ArrowRight className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
