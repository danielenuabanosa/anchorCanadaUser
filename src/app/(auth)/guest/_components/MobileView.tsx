'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

import shieldIcon from '@assets/icons/shield-check.png';
import googleIcon from '@assets/icons/google.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';

const GUEST_USER = {
  id: 'guest-provider-001',
  name: 'Guest Provider',
  email: 'guest@provider.anchorcanada.ca',
  role: 'provider' as const,
};

export default function GuestMobileView() {
  const [isContinuing, setIsContinuing] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  async function handleContinueAsGuest() {
    setIsContinuing(true);
    await new Promise((r) => setTimeout(r, 600));
    setAuth(GUEST_USER, 'guest-token-provider-2026');
    router.push('/dashboard');
  }

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col gap-10">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="flex items-baseline gap-2.5 whitespace-nowrap">
          <span className="font-serif text-[48px] leading-[56px] text-[#0f172a]">Explore the</span>
          <span className="font-serif text-[52px] italic leading-[56px] text-[#2f66c8]">Portal</span>
        </div>
        <p className="text-sm text-[#8c97ad]">
          Preview the Provider Portal without full registration. Browse tools and explore before you onboard.
        </p>
      </div>

      <div className="flex w-full flex-col gap-[60px]">
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline gap-1 text-sm">
              <span className="font-semibold text-[#0f172a]">Guest Access</span>
              <span className="text-[#ef4444]">*</span>
            </div>
            <p className="text-sm text-[#44516a]">
              Continue without signing in to preview listings, applications, and provider dashboard tools.
            </p>
          </div>

          <div className="flex w-full items-center gap-5 rounded-[10px] bg-white p-5">
            <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[26px] bg-[#eff4ff] p-[13px]">
              <Image src={shieldIcon} alt="" width={26} height={26} />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-base font-semibold text-[#0f172a]">Limited guest access</span>
              <span className="text-sm text-[#44516a]">
                Some features require a provider account. You can upgrade anytime.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <div className="h-px flex-1 bg-[#d9e1ef]" />
              <span className="whitespace-nowrap text-sm text-[#44516a]">Or continue with</span>
              <div className="h-px flex-1 bg-[#d9e1ef]" />
            </div>
            <div className="flex w-full cursor-pointer items-center justify-center rounded-[6px] border border-[#d9e1ef] bg-white px-6 py-4 transition-colors hover:bg-[#f8fafc]">
              <Image src={googleIcon} alt="Google" width={24} height={24} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-5">
          <button
            type="button"
            onClick={handleContinueAsGuest}
            disabled={isContinuing}
            className="flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-[#2f66c8] px-6 py-4 text-sm text-white transition-colors hover:bg-[#2454a4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isContinuing ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
              </svg>
            ) : (
              <>
                Continue as Guest
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#d9e1ef] bg-white px-6 py-4 text-sm text-[#2f66c8] transition-colors hover:bg-[#f8fafc]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
          <Link
            href="/onboarding"
            className="flex w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#2f66c8] bg-white px-6 py-4 text-sm text-[#2f66c8] transition-colors hover:bg-[#eff4ff]"
          >
            Create Provider Account
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-5 rounded-[10px] bg-[#eff4ff] p-5">
        <div className="flex w-full items-start gap-3">
          <Image src={lightBulbIcon} alt="" width={40} height={40} className="shrink-0" />
          <p className="text-sm text-[#44516a]">
            Ready to publish listings? Complete onboarding to unlock full provider features.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#8c97ad]">New provider?</span>
          <Link href="/onboarding" className="flex items-center gap-2 text-sm font-medium text-[#2f66c8] hover:underline">
            Start Onboarding
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
