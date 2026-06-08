'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import infoIcon from '@assets/icons/info.png';

export function OnboardingFooter() {
  return (
    <div className="mx-auto mt-4 flex max-w-5xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-[12px] text-[#44516A]">
        <Image src={infoIcon} alt="" width={16} height={16} className="shrink-0" />
        Your journey can be updated anytime in your account settings.
      </div>
      <Link
        href="/privacy"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-[#2F66C8] transition-opacity hover:opacity-75"
      >
        Learn more about our Privacy Policy
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
