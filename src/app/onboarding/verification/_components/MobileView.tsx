'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, X } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OtpInput } from '@/shared/components/onboarding/OtpInput';
import { Footer } from './Footer';
import {
  DEFAULT_PROFILE,
  PREVIEW_BADGES,
} from '@/shared/components/onboarding/profilePreviewData';

import mail3Icon from '@assets/icons/mail3.png';
import sendIcon from '@assets/icons/send.png';
import shield3Icon from '@assets/icons/shield3.png';
import shieldValidIcon from '@assets/icons/shield-valid.png';
import editIcon from '@assets/icons/edit.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import validLockIcon from '@assets/images/valid-lock.png';
import validBannerImg from '@assets/images/valid-bg.png';
import avatarImg from '@assets/images/w1.png';

const DIGITS_COUNT = 6;

function DividerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-5">
      <div className="h-px flex-1 bg-[#D9E1EF]" />
      <p className="shrink-0 font-sans text-[14px] text-[#44516A]">{children}</p>
      <div className="h-px flex-1 bg-[#D9E1EF]" />
    </div>
  );
}

export default function MobileView() {
  const router = useRouter();

  const [emailMode, setEmailMode] = useState(false);
  const [userEmail, setUserEmail] = useState('jacob.sullivan@gmail.com');
  const [savedEmail, setSavedEmail] = useState('jacob.sullivan@gmail.com');
  const [digits, setDigits] = useState<string[]>(Array(DIGITS_COUNT).fill(''));
  const [showToast, setShowToast] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const filledDigits = digits.filter(Boolean).length;
  const canVerify = filledDigits === DIGITS_COUNT;

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  function handleSaveEmail() {
    if (!userEmail.trim()) return;
    setSavedEmail(userEmail.trim());
    setEmailMode(false);
    setDigits(Array(DIGITS_COUNT).fill(''));
  }

  function handleVerify() {
    if (!canVerify) return;
    setShowToast(true);
    setTimeout(() => router.push('/onboarding/activation'), 1600);
  }

  function EmailCard() {
    if (emailMode) {
      return (
        <div className="flex w-full flex-col gap-5 rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] p-[11.5px]">
                <Image src={mail3Icon} alt="" width={23} height={23} className="object-contain" />
              </div>
              <div>
                <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Email Address:</p>
                <p className="mt-1 font-sans text-[14px] text-[#44516A]">Provide email to 6-digit send code</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveEmail}
              className="flex shrink-0 items-center gap-2 font-sans text-[14px] text-[#2F66C8]"
            >
              Save
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M3 2h10l2 2v11a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
                  stroke="#2F66C8"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path d="M13 2v3H5V2" stroke="#2F66C8" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image src={mail3Icon} alt="" width={16} height={16} className="opacity-60" />
            </span>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email address"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEmail();
              }}
              className="anchor-field anchor-field--icon-left h-[50px] rounded-[10px]"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] p-[11.5px]">
            <Image src={mail3Icon} alt="" width={23} height={23} className="object-contain" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Sent To:</p>
            <p className="truncate font-sans text-[14px] text-[#44516A]">{savedEmail}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEmailMode(true)}
          className="ml-2 flex shrink-0 items-center gap-2 font-sans text-[14px] text-[#2F66C8]"
        >
          Edit
          <Image src={editIcon} alt="" width={14} height={14} className="opacity-80" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {showToast && (
        <div className="fixed left-4 right-4 top-20 z-50 flex items-center gap-3 rounded-xl border border-[#D1FAE5] bg-gradient-to-r from-[#DEFFEB] to-white px-4 py-3 shadow-[0_6px_8px_rgba(0,0,0,0.08)]">
          <div className="flex size-9 items-center justify-center rounded-full bg-white/60">
            <div className="flex size-6 items-center justify-center rounded-xl bg-[#22C55E]">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[16px] font-medium text-[#0F172A]">Email Verified!</p>
            <p className="font-sans text-[14px] text-[#8C97AD]">Email verified successfully.</p>
          </div>
          <button type="button" onClick={() => setShowToast(false)} className="text-[#8C97AD]">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={5} />
      </div>

      <main className="px-5 pb-4 pt-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-[48px] font-normal leading-[56px] text-[#0F172A]">Confirm Your</h1>
          <p className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Email</p>
          <div className="mt-2.5 font-sans text-[14px] text-[#8C97AD]">
            <p>We&apos;ve sent a secure verification code to your inbox.</p>
            <p>Enter it below to activate your Anchor experience.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <EmailCard />

          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-[14px] font-semibold leading-[1.8] text-[#0F172A]">
              Enter the 6-digit code
            </p>
            <OtpInput digits={digits} onChange={setDigits} variant="mobile" />
            <p className="flex items-center gap-1.5 font-sans text-[12px] text-[#8C97AD]">
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
              Verification codes expire in{' '}
              <span className="font-medium text-[#2F66C8]">10 minutes.</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 py-5">
            <DividerLabel>Didn&apos;t get the code?</DividerLabel>
            <div className="flex gap-2.5">
              <button
                type="button"
                className="flex w-[176px] shrink-0 items-center justify-center gap-3 rounded-[6px] border border-[#D9E1EF] bg-white px-6 py-4 font-sans text-[14px] font-medium text-[#2F66C8]"
              >
                <Image src={sendIcon} alt="" width={20} height={20} className="object-contain" />
                Resend Code
              </button>
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center justify-center rounded-[6px] bg-[#EFF4FF] px-4 py-4 text-center font-sans text-[14px] font-medium text-[#8C97AD]"
              >
                OR Check your spam folder
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-5">
            <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] p-[13px]">
              <Image src={shield3Icon} alt="" width={26} height={26} className="object-contain" />
            </div>
            <div>
              <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Your security matters</p>
              <p className="mt-1 font-sans text-[14px] text-[#44516A]">
                We verify every account to keep opportunities real, safe, and spam-free.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#D9E1EF] pt-6 pb-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleVerify}
              disabled={!canVerify}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] font-sans text-[14px] text-white transition-colors ${
                canVerify ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              Verify &amp; Continue <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding/account"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white font-sans text-[14px] text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>
          <Footer variant="mobile" />
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="flex w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-4">
              <div className="relative size-[60px] shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#FFF9EC]">
                <Image src={avatarImg} alt="avatar" fill className="object-cover" sizes="60px" />
              </div>
              <div className="text-left">
                <p className="font-serif text-[20px] text-[#0F172A]">🎉 Almost There!</p>
                <p className="font-sans text-[12px] text-[#44516A]">Your profile is ready.</p>
              </div>
            </div>
            <ChevronRight
              className={`h-4 w-4 shrink-0 text-[#8C97AD] transition-transform ${previewOpen ? 'rotate-90' : ''}`}
            />
          </button>

          {previewOpen && (
            <div className="mt-2 overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="relative h-[110px] w-full overflow-hidden">
                <Image src={validBannerImg} alt="city" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src={shieldValidIcon} alt="" width={56} height={56} className="object-contain" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-[#FFF9EC]">
                    <Image src={avatarImg} alt="avatar" fill className="object-cover" sizes="64px" />
                  </div>
                  <p className="mt-3 font-serif text-[24px] text-[#0F172A]">{DEFAULT_PROFILE.displayName}</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {PREVIEW_BADGES.map((badge) => (
                      <span
                        key={badge.label}
                        className="inline-flex items-center gap-1 rounded-[5px] px-2 py-0.5 font-sans text-[9px] font-bold uppercase"
                        style={{ background: badge.bg, color: badge.text }}
                      >
                        <Image src={badge.icon} alt="" width={10} height={10} className="object-contain" />
                        {badge.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 font-sans text-[11px] text-[#8C97AD]">
                    <Image src={locationPinIcon} alt="" width={11} height={11} className="opacity-60" />
                    {DEFAULT_PROFILE.location}
                    <Image src={canadaFlagIcon} alt="Canada" width={14} height={10} className="rounded-sm object-cover" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-[10px] bg-[#EFF4FF] p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <Image src={validLockIcon} alt="" width={18} height={18} className="object-contain" />
                  </div>
                  <p className="text-left font-sans text-[11px] leading-relaxed text-[#44516A]">
                    <span className="font-semibold text-[#0F172A]">Secure. Private. Trusted.</span>{' '}
                    Your information is protected with bank-level encryption.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
