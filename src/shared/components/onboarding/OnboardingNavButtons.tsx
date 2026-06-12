'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardingNavButtonsProps {
  backHref?: string;
  onBack?: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
  footer?: React.ReactNode;
}

export function OnboardingNavButtons({
  backHref = '/',
  onBack,
  onContinue,
  continueDisabled = false,
  continueLabel = 'Continue',
  footer,
}: OnboardingNavButtonsProps) {
  const backClassName =
    'inline-flex h-[52px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-6 text-[16px] text-[#2F66C8] transition-colors hover:bg-[#EFF4FF] fomt-san';

  return (
    <div className="border-t border-[#D9E1EF] bg-[#EFF4FF] px-5 py-5 md:px-10 md:py-10">
      <div className="mx-auto flex max-w-[1548px] items-center justify-between gap-4">
        {onBack ? (
          <button type="button" onClick={onBack} className={backClassName}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <Link href={backHref} className={backClassName}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        )}
        <button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled}
          className={`inline-flex h-[52px] w-full max-w-[180px] items-center justify-center gap-2.5 rounded-[6px] text-[16px] text-white transition-colors md:w-[180px] ${
            continueDisabled
              ? 'cursor-not-allowed bg-[#2F66C8]/40'
              : 'bg-[#2F66C8] hover:bg-[#2454A4]'
          }`}
        >
          {continueLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {footer}
    </div>
  );
}
