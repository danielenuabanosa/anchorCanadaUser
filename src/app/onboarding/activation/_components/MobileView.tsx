'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Clock, Pencil, X } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OtpInput } from '@/shared/components/onboarding/OtpInput';
import { Footer } from './Footer';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';

import mailIcon from '@assets/icons/mail.png';
import sendIcon from '@assets/icons/send.png';
import shieldCheckIcon from '@assets/icons/shield-check.png';

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

function resolveEmail() {
  const store = useProviderOnboardingStore.getState();
  const authEmail = useAuthStore.getState().user?.email;
  const sessionEmail =
    typeof window !== 'undefined' ? sessionStorage.getItem('provider_signup_email') : null;
  return (
    store.verificationEmail?.trim() ||
    store.organizationEmail?.trim() ||
    authEmail?.trim() ||
    sessionEmail?.trim() ||
    ''
  );
}

export default function MobileView() {
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  const [emailMode, setEmailMode] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [digits, setDigits] = useState<string[]>(Array(DIGITS_COUNT).fill(''));
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const filledDigits = digits.filter(Boolean).length;
  const canVerify = filledDigits === DIGITS_COUNT && Boolean(savedEmail);

  useEffect(() => {
    const email = resolveEmail();
    if (email) {
      setSavedEmail(email);
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  function handleSaveEmail() {
    if (!userEmail.trim()) return;
    const next = userEmail.trim();
    setSavedEmail(next);
    setOnboardingData({ verificationEmail: next });
    setEmailMode(false);
    setDigits(Array(DIGITS_COUNT).fill(''));
  }

  async function handleVerify() {
    if (!canVerify || !savedEmail || isVerifying) return;
    setError('');
    setIsVerifying(true);

    try {
      const result = await authService.verifyEmailOtp(savedEmail, digits.join(''));
      useAuthStore.getState().setAuth(result.user, result.token, result.refreshToken);
      setOnboardingData({ verificationEmail: savedEmail });
      await saveOnboardingDraft('activation').catch(() => undefined);
      setShowToast(true);
      setTimeout(() => router.push('/onboarding/org-ready'), 1600);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code.');
      setIsVerifying(false);
    }
  }

  async function handleResendCode() {
    if (!savedEmail) return;
    setError('');
    setResendMessage('');
    try {
      await authService.resendSignupOtp(savedEmail);
      setResendMessage('A new code was sent. Check your inbox and spam folder.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not resend code.');
    }
  }

  function EmailCard() {
    if (emailMode) {
      return (
        <div className="flex w-full flex-col gap-5 rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] p-[11.5px]">
                <Image src={mailIcon} alt="" width={23} height={23} className="object-contain" />
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
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image src={mailIcon} alt="" width={16} height={16} className="opacity-60" />
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
      );
    }

    return (
      <div className="flex w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] p-[11.5px]">
            <Image src={mailIcon} alt="" width={23} height={23} className="object-contain" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Sent To:</p>
            <p className="truncate font-sans text-[14px] text-[#44516A]">{savedEmail || 'Add your email'}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEmailMode(true)}
          className="ml-2 flex shrink-0 items-center gap-2 font-sans text-[14px] text-[#2F66C8]"
        >
          Edit
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {showToast ? (
        <div className="fixed left-4 right-4 top-20 z-50 flex items-center gap-3 rounded-xl border border-[#D1FAE5] bg-gradient-to-r from-[#DEFFEB] to-white px-4 py-3 shadow-[0_6px_8px_rgba(0,0,0,0.08)]">
          <div className="flex size-9 items-center justify-center rounded-full bg-white/60">
            <div className="flex size-6 items-center justify-center rounded-xl bg-[#22C55E]">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="type-label">Email Verified!</p>
            <p className="font-sans text-[14px] text-[#8C97AD]">Email verified successfully.</p>
          </div>
          <button type="button" onClick={() => setShowToast(false)} className="text-[#8C97AD]">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-[1548px] px-5 pb-3 pt-4">
        <StepProgress current={6} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] px-5 pb-4 pt-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="type-page-title-mobile">Confirm Your</h1>
          <p className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Email</p>
          <div className="mt-2.5 font-sans text-[14px] text-[#8C97AD]">
            <p>We&apos;ve sent a secure verification code to your inbox.</p>
            <p>Enter it below to activate your Anchor experience.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <EmailCard />

          <div className="flex flex-col gap-2.5">
            <p className="font-sans text-[14px] font-semibold leading-[1.8] text-[#0F172A]">Enter the 6-digit code</p>
            <OtpInput digits={digits} onChange={setDigits} variant="mobile" />
            {error ? <p className="font-sans text-sm text-red-600">{error}</p> : null}
            {resendMessage ? <p className="font-sans text-sm text-[#15803D]">{resendMessage}</p> : null}
            <p className="flex items-center gap-1.5 font-sans text-[12px] text-[#8C97AD]">
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
              Verification codes expire in <span className="font-medium text-[#2F66C8]">10 minutes.</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 py-5">
            <DividerLabel>Didn&apos;t get the code?</DividerLabel>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleResendCode}
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
              <Image src={shieldCheckIcon} alt="" width={26} height={26} className="object-contain" />
            </div>
            <div>
              <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Your security matters</p>
              <p className="mt-1 font-sans text-[14px] text-[#44516A]">
                We verify every account to keep opportunities real, safe, and spam-free.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#D9E1EF] pb-8 pt-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleVerify}
              disabled={!canVerify || isVerifying}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] font-sans text-[14px] text-white transition-colors ${
                canVerify && !isVerifying ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              {isVerifying ? 'Verifying…' : 'Verify & Continue'} <ArrowRight className="h-4 w-4" />
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
      </main>
    </div>
  );
}
