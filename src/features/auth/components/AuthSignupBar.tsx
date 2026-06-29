'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import lightBulbIcon from '@assets/icons/light-bulb.png';
import { cn } from '@/lib/utils';

interface AuthSignupBarProps {
  message?: string;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function AuthSignupBar({
  message = 'You can edit your profile anytime in your account settings.',
  variant = 'desktop',
  className,
}: AuthSignupBarProps) {
  if (variant === 'mobile') {
    return (
      <div className={cn('rounded-[10px] bg-[#EFF4FF] p-5', className)}>
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <Image src={lightBulbIcon} alt="" width={40} height={40} className="shrink-0" />
            <p className="text-sm text-[#44516a]">{message}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#8c97ad]">New to Anchor?</span>
            <Link href="/onboarding" className="flex items-center gap-2 text-sm font-medium text-[#2f66c8] hover:underline">
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mx-auto w-full max-w-[1548px] rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3 text-base text-[#44516a]">
          <Image src={lightBulbIcon} alt="" width={24} height={24} className="shrink-0" />
          {message}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base text-[#8c97ad]">New to Anchor?</span>
          <Link href="/onboarding" className="flex items-center gap-3 text-base font-medium text-[#2f66c8] hover:underline">
            Create Account
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
