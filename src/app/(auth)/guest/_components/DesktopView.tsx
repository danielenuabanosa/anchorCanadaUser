'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

import shieldIcon from '@assets/icons/shield-check.png';
import googleIcon from '@assets/icons/google.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';
import briefcaseIcon from '@assets/icons/briefcase.png';
import chatIcon from '@assets/icons/chat.png';
import eyeIcon from '@assets/icons/eye.png';
import locationIcon from '@assets/icons/location.png';
import canadaFlag from '@assets/icons/canada-flag.png';
import loginBg from '@assets/images/login-toronto-bg.png';

const GUEST_USER = {
  id: 'guest-provider-001',
  name: 'Guest Provider',
  email: 'guest@provider.anchorcanada.ca',
  role: 'provider' as const,
};

export default function GuestDesktopView() {
  const [isContinuing, setIsContinuing] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  async function handleContinueAsGuest() {
    setIsContinuing(true);
    await new Promise((r) => setTimeout(r, 600));
    setAuth(GUEST_USER, 'guest-token-provider-2026');
    router.push('/dashboard');
  }

  const stats = [
    { icon: briefcaseIcon, count: 12, label: 'Active listings', iconBg: 'bg-[#eff4ff]' },
    { icon: chatIcon, count: 47, label: 'Applications received', iconBg: 'bg-[#e8f5f0]' },
    { icon: eyeIcon, count: 324, label: 'Profile views', iconBg: 'bg-[#f4f1fe]' },
  ];

  return (
    <div className="mx-auto flex w-full min-w-[1200px] max-w-[1548px] flex-col gap-10">
      <div className="flex items-start gap-10">
        <div className="flex w-[886px] shrink-0 flex-col items-start gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline gap-2.5 whitespace-nowrap">
              <span className="font-serif text-[60px] leading-[56px] text-[#0f172a]">Explore the</span>
              <span className="font-serif text-[78px] italic leading-[73px] text-[#2f66c8]">Portal</span>
            </div>
            <p className="max-w-[640px] text-base text-[#8c97ad]">
              Preview the Provider Portal without full registration. Browse tools, explore the dashboard, and decide when you&apos;re ready to onboard.
            </p>
          </div>

          <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-1 text-base">
                <span className="font-semibold text-[#0f172a]">Guest Access</span>
                <span className="text-[#ef4444]">*</span>
              </div>
              <p className="text-base text-[#44516a]">
                Continue without signing in to preview listings, applications, and provider dashboard tools.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <div className="flex-1 h-px bg-[#d9e1ef]" />
                <span className="whitespace-nowrap text-base text-[#44516a]">Or continue with</span>
                <div className="flex-1 h-px bg-[#d9e1ef]" />
              </div>
              <div className="flex w-full cursor-pointer items-center justify-center gap-5 rounded-[6px] border border-[#d9e1ef] bg-white px-6 py-4 transition-colors hover:bg-[#f8fafc]">
                <Image src={googleIcon} alt="" width={24} height={24} />
                <span className="text-base font-medium text-[#0f172a]">Google</span>
              </div>
            </div>

            <div className="flex w-full items-center gap-5 rounded-[10px] bg-white p-5">
              <div className="flex size-[68px] shrink-0 items-center justify-center rounded-[34px] bg-[#eff4ff] p-[17px]">
                <Image src={shieldIcon} alt="" width={34} height={34} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-lg font-semibold text-[#0f172a]">Limited guest access</span>
                <span className="text-base text-[#44516a]">
                  Some features require a provider account. You can upgrade anytime from the dashboard.
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <Link
              href="/login"
              className="flex items-center gap-2.5 rounded-[6px] border border-[#d9e1ef] bg-white px-6 py-4 text-base text-[#2f66c8] transition-colors hover:bg-[#f8fafc]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </Link>
            <button
              type="button"
              onClick={handleContinueAsGuest}
              disabled={isContinuing}
              className="flex items-center gap-2.5 rounded-[6px] bg-[#2f66c8] px-6 py-4 text-base text-white transition-colors hover:bg-[#2454a4] disabled:cursor-not-allowed disabled:opacity-60"
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
          </div>
        </div>

        <div className="relative min-h-[1067px] min-w-0 flex-1 overflow-hidden rounded-[10px]">
          <Image src={loginBg} alt="Toronto skyline" fill className="object-cover" priority />
          <div className="absolute inset-0 flex flex-col gap-10 p-[60px]">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-medium text-[#0f172a]">👋 Explore as guest,</p>
              <p className="font-serif text-[36px] leading-[56px] text-[#0f172a]">Provider Portal</p>
              <p className="text-base text-[#44516a]">Here&apos;s a preview of what you can manage as a provider.</p>
            </div>
            <div className="overflow-hidden rounded-[10px] border border-[#eef2f8] bg-white shadow-[0px_12px_32px_0px_rgba(0,64,245,0.10)]">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-center justify-between p-5 ${i < stats.length - 1 ? 'border-b border-[#eef2f8]' : ''}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`${stat.iconBg} flex size-[60px] items-center justify-center rounded-[10px] p-2.5`}>
                      <Image src={stat.icon} alt="" width={24} height={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-2xl font-medium text-[#0f172a]">{stat.count}</span>
                      <span className="text-sm text-[#44516a]">{stat.label}</span>
                    </div>
                  </div>
                  <svg className="h-[18px] w-[18px] text-[#8c97ad]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-[#eef2f8] bg-[#f8fafc] px-5 py-[26px]">
                <div className="flex items-center gap-[10px]">
                  <Image src={locationIcon} alt="" width={16} height={16} className="opacity-70" />
                  <span className="text-sm text-[#8c97ad]">Toronto, Ontario, Canada</span>
                  <Image src={canadaFlag} alt="Canada" width={32} height={20} className="rounded-sm object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between rounded-[10px] bg-[#eff4ff] p-2">
        <div className="flex items-center gap-3">
          <Image src={lightBulbIcon} alt="" width={24} height={24} className="shrink-0" />
          <span className="text-base text-[#44516a]">
            Ready to publish listings? Complete onboarding to unlock full provider features.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base text-[#8c97ad]">New provider?</span>
          <Link href="/onboarding" className="flex items-center gap-3 text-base font-medium text-[#2f66c8] hover:underline">
            Create Provider Account
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
