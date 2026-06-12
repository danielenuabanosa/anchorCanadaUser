'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, X, Check } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OtpInput } from '@/shared/components/onboarding/OtpInput';

import mail3Icon from '@assets/icons/mail3.png';
import sendIcon from '@assets/icons/send.png';
import { Footer } from './Footer';
import shield3Icon from '@assets/icons/shield3.png';
import shieldValidIcon from '@assets/icons/shield-valid.png';
import editIcon from '@assets/icons/edit.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import validBannerImg from '@assets/images/w2.png';
import avatarImg from '@assets/images/image.png';

const PREVIEW_BADGES = [
  { label: 'STUDENT', bg: '#EEF3FF', text: '#2F66C8', dot: '🎓' },
  { label: 'NEWCOMER', bg: '#DFFAF3', text: '#059669', dot: '✦' },
  { label: 'ENTREPRENEUR', bg: '#FFF5EC', text: '#E8812A', dot: '🚀' },
];

const DIGITS_COUNT = 6;

export default function MobileView() {
  const router = useRouter();

  const [emailMode, setEmailMode] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
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

  function VerificationForm() {
    return (
      <div className="flex flex-col gap-4">
        {emailMode ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-[#0F172A]">Email Address</p>
                <p className="mt-0.5 text-[11px] text-neutral-400">Provide email to 6-digit send code</p>
              </div>
              <button
                type="button"
                onClick={handleSaveEmail}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-[#2F66C8] transition-opacity hover:opacity-75"
              >
                Save
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="#2F66C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="relative mt-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <Image src={mail3Icon} alt="" width={14} height={14} className="opacity-60" />
              </span>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email address"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEmail();
                }}
                className="anchor-field anchor-field--icon-left"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FF]">
                <Image src={mail3Icon} alt="" width={16} height={16} className="object-contain" />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#0F172A]">Sent To:</p>
                <p className="text-[12px] text-neutral-500">{savedEmail}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEmailMode(true)}
              className="flex items-center gap-1 text-[12px] font-semibold text-[#2F66C8] hover:opacity-75"
            >
              Edit
              <Image src={editIcon} alt="" width={12} height={12} className="opacity-70" />
            </button>
          </div>
        )}

        <div>
          <p className="mb-3 text-[13px] font-semibold text-[#0F172A]">Enter the 6-digit code</p>
          <OtpInput digits={digits} onChange={setDigits} />
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-neutral-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.2" />
              <path d="M6 4v3M6 8v.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Verification codes expire in{' '}
            <span className="font-medium text-[#2F66C8]">10 minutes.</span>
          </p>
        </div>

        <div>
          <p className="mb-2 text-[12px] text-neutral-400">Didn&apos;t get the code?</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-4 py-2 text-[12px] font-semibold text-[#0F172A] transition-colors hover:bg-neutral-50"
            >
              <Image src={sendIcon} alt="" width={14} height={14} className="opacity-70" />
              Resend Code
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl border-2 border-neutral-200 bg-white px-4 py-2 text-[12px] font-medium text-neutral-500 transition-colors hover:bg-neutral-50"
            >
              OR Check your spam folder
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-[#F0FDF4] px-4 py-3.5">
          <Image src={shield3Icon} alt="" width={28} height={28} className="shrink-0 object-contain" />
          <div>
            <p className="text-[13px] font-semibold text-[#0F172A]">Your security matters</p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              We verify every account to keep opportunities real, safe, and spam-free.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {showToast && (
        <div className="fixed left-4 right-4 top-20 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#0F172A]">Email Verified!</p>
            <p className="text-[11px] text-neutral-400">Email verified successfully.</p>
          </div>
          <button type="button" onClick={() => setShowToast(false)} className="ml-auto text-neutral-400 hover:text-neutral-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="px-5 pb-2 pt-4">
        <StepProgress current={5} />
      </div>

      <main className="flex-1 px-5 pb-4 pt-8">
        <h1 className="font-instrument-serif text-[28px] font-normal leading-tight text-[#0F172A]">
          Confirm Your
          <span className="block text-[32px] italic text-[#2F66C8]">Email</span>
        </h1>
        <p className="mt-2.5 text-[12px] leading-relaxed text-[#8C97AD]">
          We&apos;ve sent a secure verification code to your inbox. Enter it below to activate your Anchor experience.
        </p>

        <div className="mt-6">
          <VerificationForm />
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-neutral-100 bg-[#FFF9EC]">
                <Image src={avatarImg} alt="avatar" fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-[#0F172A]">🎉 Almost There!</p>
                <p className="text-[11px] text-neutral-400">Your profile is ready.</p>
              </div>
            </div>
            <ArrowRight className={`h-4 w-4 text-neutral-400 transition-transform ${previewOpen ? 'rotate-90' : ''}`} />
          </button>

          {previewOpen && (
            <div className="mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative h-[110px] w-full overflow-hidden">
                <Image src={validBannerImg} alt="city" fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#FFF9EC]">
                    <Image src={avatarImg} alt="avatar" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0F172A]">Jacob Sullivan</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {PREVIEW_BADGES.map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
                          style={{ background: b.bg, color: b.text }}
                        >
                          {b.dot} {b.label}
                        </span>
                      ))}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[10px] text-neutral-400">
                      <Image src={locationPinIcon} alt="" width={9} height={9} className="opacity-50" />
                      Toronto, Ontario, Canada
                      <Image src={canadaFlagIcon} alt="" width={12} height={8} className="rounded-sm object-cover" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#F0FDF4] px-3 py-2">
                  <Image src={shieldValidIcon} alt="" width={13} height={13} className="shrink-0 object-contain" />
                  <p className="text-[10px] font-semibold text-emerald-700">
                    Secure. Private. Trusted.{' '}
                    <span className="font-normal text-neutral-400">
                      Your information is protected with bank-level encryption.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-[#D9E1EF] bg-white px-5 pb-8 pt-4">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleVerify}
            disabled={!canVerify}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
              canVerify ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
            }`}
          >
            Verify &amp; Continue <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/onboarding/account"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
        <Footer variant="mobile" />
      </div>
    </div>
  );
}
