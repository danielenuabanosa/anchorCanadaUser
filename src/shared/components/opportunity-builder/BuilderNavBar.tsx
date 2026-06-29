'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CircleHelp } from 'lucide-react';
import { BUILDER_STEP_LABELS, BUILDER_STEPS } from '@/features/opportunity-builder/lib/builderData';
import type { BuilderNavAction } from '@/features/opportunity-builder/context/BuilderNavContext';

interface BuilderNavBarProps {
  step: number;
  backHref: string;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
  showMobileHelp?: boolean;
  headerVariant?: 'default' | 'review';
  secondaryAction?: BuilderNavAction;
}

export function BuilderNavBar({
  step,
  backHref,
  onContinue,
  continueDisabled = false,
  continueLabel = 'Continue',
  headerVariant = 'default',
  secondaryAction,
}: BuilderNavBarProps) {
  const stepLabel = BUILDER_STEP_LABELS[step] ?? BUILDER_STEPS[step];
  const isReview = headerVariant === 'review';

  return (
    <>
      {/* Desktop — Figma 448:8613 */}
      <div className="hidden items-center justify-between gap-4 md:flex">
        <div className="flex items-center gap-5">
          <Link
            href={backHref}
            className="inline-flex h-[45px] items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-[14px] text-[#2F66C8] transition-colors hover:bg-[#EFF4FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <p className="font-serif text-[28px] text-[#0F172A]">Opportunity Builder</p>
        </div>

        <div className="flex items-center gap-10">
          <Link
            href="/dashboard#support"
            className="flex items-center gap-5 text-[16px] text-[#44516A] hover:text-[#2F66C8]"
          >
            Need Help?
            <CircleHelp className="h-[21px] w-[21px]" strokeWidth={1.75} />
          </Link>

          {isReview ? (
            <div className="flex items-center gap-5">
              {secondaryAction ? (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                  className="inline-flex h-[45px] items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white px-4 text-[14px] font-medium text-[#2F66C8] disabled:opacity-50"
                >
                  {secondaryAction.label}
                </button>
              ) : null}
              <button
                type="button"
                onClick={onContinue}
                disabled={continueDisabled}
                className={`inline-flex h-[45px] items-center justify-center rounded-[6px] px-4 text-[14px] font-medium text-white ${
                  continueDisabled ? 'cursor-not-allowed bg-[#2F66C8]/40' : 'bg-[#2F66C8] hover:bg-[#2454A4]'
                }`}
              >
                {continueLabel}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onContinue}
              disabled={continueDisabled}
              className={`inline-flex h-[52px] min-w-[180px] items-center justify-center gap-2.5 rounded-[6px] px-6 text-[16px] font-medium text-white transition-colors ${
                continueDisabled
                  ? 'cursor-not-allowed bg-[#2F66C8]/40'
                  : 'bg-[#2F66C8] hover:bg-[#2454A4]'
              }`}
            >
              {continueLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile — Figma 460:8540 review / 168:4131 default */}
      <div className="flex flex-col gap-5 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="font-serif text-[28px] leading-[56px] text-[#0F172A]">Opportunity Builder</p>
          <div className="shrink-0 text-right">
            <p className="text-sm leading-[18px] text-[#44516A]">
              Step {step + 1} of {BUILDER_STEPS.length}
            </p>
            <p className="text-sm font-semibold leading-[18px] text-[#2F66C8]">{stepLabel}</p>
          </div>
        </div>

        {isReview ? (
          <div className="flex items-center gap-3.5">
            <Link
              href={backHref}
              className="inline-flex h-[50px] flex-1 items-center justify-center gap-2.5 rounded-[6px] border border-[#EEF2F8] bg-white px-4 text-sm text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Back
            </Link>
            <button
              type="button"
              onClick={onContinue}
              disabled={continueDisabled}
              className={`inline-flex h-[50px] flex-[1.4] items-center justify-center rounded-[6px] px-4 text-sm font-medium text-white ${
                continueDisabled ? 'cursor-not-allowed bg-[#2F66C8]/40' : 'bg-[#2F66C8]'
              }`}
            >
              {continueLabel}
            </button>
            {secondaryAction ? (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
                className="inline-flex h-[50px] flex-1 items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white px-3 text-sm text-[#2F66C8] disabled:opacity-50"
              >
                {secondaryAction.label}
              </button>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center gap-3.5">
            <Link
              href={backHref}
              className="inline-flex h-[50px] flex-1 items-center justify-center gap-2.5 rounded-[6px] border border-[#EEF2F8] bg-white px-6 text-sm text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Back
            </Link>
            <button
              type="button"
              onClick={onContinue}
              disabled={continueDisabled}
              className={`inline-flex h-[50px] flex-1 items-center justify-center gap-2.5 rounded-[6px] px-6 text-sm text-white ${
                continueDisabled ? 'cursor-not-allowed bg-[#2F66C8]/40' : 'bg-[#2F66C8]'
              }`}
            >
              {continueLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function BuilderMobileHelpBar() {
  return (
    <div className="rounded-[10px] bg-[#EFF4FF] p-5 md:hidden">
      <Link
        href="/dashboard#support"
        className="flex items-center justify-center gap-5 text-base text-[#44516A]"
      >
        Need Help?
        <CircleHelp className="h-[21px] w-[21px] text-[#44516A]" strokeWidth={1.75} />
      </Link>
    </div>
  );
}
