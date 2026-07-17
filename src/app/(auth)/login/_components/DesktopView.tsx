'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/features/auth/services/auth.service';
import { getApiErrorMessage } from '@/lib/apiError';
import { isStaticMode } from '@/lib/staticMode';
import { useAuthStore } from '@/store/authStore';

import mailIcon from '@assets/icons/mail.png';
import lockIcon from '@assets/icons/lock2.png';
import shieldIcon from '@assets/icons/shield-check.png';
import briefcaseIcon from '@assets/icons/briefcase.png';
import handCoinsIcon from '@assets/icons/hand-coins.png';
import starIcon from '@assets/icons/star2.png';
import { AuthSignupBar } from '@/features/auth/components/AuthSignupBar';
import { SocialAuthButtons } from '@/features/auth/components/SocialAuthButtons';
import locationIcon from '@assets/icons/location.png';
import canadaFlag from '@assets/icons/canada-flag.png';
import loginBg from '@assets/images/login-toronto-bg.png';

export default function LoginDesktopView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const setAuth = useAuthStore(s => s.setAuth);
  const emailValid = isStaticMode()
    ? email.trim().length > 0
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = isStaticMode() ? password.length > 0 : password.length >= 8;
  const canSubmit = emailValid && passwordValid && !isSubmitting;

  function handleKeyDown(e: React.KeyboardEvent) {
    setCapsLock(e.getModifierState('CapsLock'));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const result = await authService.login({ email, password });
      setAuth(result.user, result.token);
      router.push('/dashboard');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid email or password.'));
      setIsSubmitting(false);
    }
  }

  const stats = [
    { icon: briefcaseIcon, count: 3, label: 'New Application Submitted', iconBg: 'bg-[#eff4ff]' },
    { icon: handCoinsIcon, count: 2, label: 'Listings Published', iconBg: 'bg-[#e8f5f0]' },
    { icon: starIcon, count: 1, label: 'Opportunity Saved', iconBg: 'bg-[#f4f1fe]' },
  ];

  return (
    <div className="w-full max-w-[1548px] min-w-[1200px] mx-auto flex flex-col gap-10">
      {/* Main 2-column layout */}
      <div className="flex gap-10 items-start">

        {/* -- Left column: form -- */}
        <div className="flex flex-col gap-10 items-start shrink-0 w-[886px]">

          {/* Heading */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-2.5 items-baseline whitespace-nowrap">
              <span className="font-serif text-[60px] leading-[56px] text-[#0f172a]">Welcome</span>
              <span className="font-serif italic text-[78px] leading-[73px] text-[#2f66c8]">Back 👋</span>
            </div>
            <p className="text-base text-[#8c97ad]">Your provider workspace is waiting with some new updates.</p>
          </div>

          <div className="flex flex-col gap-[60px] w-full">
            <div className="flex flex-col gap-10 w-full">

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                  </svg>
                  {error}
                </div>
              )}

                <form id="login-form" onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
                {/* Email field */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-1 items-baseline text-base">
                    <span className="font-semibold text-[#0f172a]">Email Address</span>
                    <span className="text-[#ef4444]">*</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Image src={mailIcon} alt="" width={18} height={18} className="opacity-60" />
                    </span>
                    <input
                      type={isStaticMode() ? 'text' : 'email'}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={isStaticMode() ? 'Any email or username' : 'Enter your mail'}
                      className={`anchor-field anchor-field--icon-left${emailValid ? ' anchor-field--icon-right' : ''}`}
                      autoComplete="email"
                    />
                    {emailValid && (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none shrink-0 bg-[#15803d] rounded-[10px] p-1.5 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-1 items-baseline text-base">
                    <span className="font-semibold text-[#0f172a]">Password</span>
                    <span className="text-[#ef4444]">*</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Image src={lockIcon} alt="" width={18} height={18} className="opacity-60" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        isStaticMode() ? 'Any password' : 'Minimum 8 characters'
                      }
                      className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                      autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad] hover:text-[#44516a]">
                      {showPassword ? <Eye className="h-[18px] w-[18px]" /> : <EyeOff className="h-[18px] w-[18px]" />}
                    </button>
                  </div>
                  {capsLock && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#15803d] shrink-0" />
                      <span className="text-sm text-[#15803d]">Caps Lock is on</span>
                    </div>
                  )}
                </div>

                {/* Keep signed in + Forgot password */}
                <div className="flex items-start justify-between">
                  <label className="flex gap-5 items-start cursor-pointer select-none">
                    <div
                      onClick={() => setKeepSignedIn(v => !v)}
                      className={`w-6 h-6 rounded border-[0.72px] flex items-center justify-center shrink-0 transition-colors cursor-pointer ${keepSignedIn ? 'bg-[#2f66c8] border-[#2f66c8]' : 'bg-[#eef2f8] border-[#d9e1ef]'}`}
                    >
                      <input type="checkbox" checked={keepSignedIn} onChange={e => setKeepSignedIn(e.target.checked)} className="sr-only" />
                      {keepSignedIn && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-medium text-[#0f172a]">Keep me signed in</span>
                      <span className="text-base text-[#44516a]">Only on private devices</span>
                    </div>
                  </label>
                  <Link href="/forgot-password" className="text-base font-medium text-[#2f66c8] hover:underline whitespace-nowrap">
                    Forgot you password?
                  </Link>
                </div>

                <SocialAuthButtons variant="desktop" />

                {/* Security card */}
                <div className="bg-white rounded-[10px] flex gap-5 items-center p-5 w-full">
                  <div className="bg-[#eff4ff] rounded-[34px] flex items-center justify-center p-[17px] shrink-0 size-[68px]">
                    <Image src={shieldIcon} alt="" width={34} height={34} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-lg text-[#0f172a]">Secure, encrypted, and protected.</span>
                    <span className="text-base text-[#44516a]">Your data is safe with bank-level encryption.</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between w-full">
              <Link
                href="/guest"
                className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-[#2f66c8] hover:bg-[#f8fafc] transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </Link>
              <button
                type="submit"
                form="login-form"
                disabled={!canSubmit}
                className="bg-[#2f66c8] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-white hover:bg-[#2454a4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/>
                  </svg>
                ) : (
                  <>
                    Enter Anchor
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* -- Right column: preview card -- */}
        <div className="flex-1 min-w-0 rounded-[10px] overflow-hidden relative" style={{ minHeight: '1067px' }}>
          <Image src={loginBg} alt="Toronto skyline" fill className="object-cover w-[622px] h-[1067px]" priority />
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col p-[60px] gap-10">
            {/* Welcome text */}
            <div className="flex flex-col gap-2">
              <p className="text-[#0f172a] text-xl font-medium">👋 Welcome back,</p>
              <p className="font-serif text-[36px] leading-[56px] text-[#0f172a]">Your organization</p>
              <p className="text-base text-[#44516a]">Here&apos;s what&apos;s new since your last visit.</p>
            </div>
            {/* Stats card */}
            <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden shadow-[0px_12px_32px_0px_rgba(0,64,245,0.10)]">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`flex items-center justify-between p-5 ${i < stats.length - 1 ? 'border-b border-[#eef2f8]' : ''}`}>
                  <div className="flex gap-5 items-center">
                    <div className={`${stat.iconBg} rounded-[10px] flex items-center justify-center p-2.5 size-[60px]`}>
                      <Image src={stat.icon} alt="" width={24} height={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-2xl font-medium text-[#0f172a]">{stat.count}</span>
                      <span className="text-sm text-[#44516a]">{stat.label}</span>
                    </div>
                  </div>
                  <svg className="h-[18px] w-[18px] text-[#8c97ad]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ))}
              {/* Footer */}
              <div className="bg-[#f8fafc] border-t border-[#eef2f8] px-5 py-[26px] flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <Image src={locationIcon} alt="" width={16} height={16} className="opacity-70" />
                  <span className="text-sm text-[#8c97ad]">Toronto, Ontario, Canada</span>
                   <Image src={canadaFlag} alt="Canada" width={32} height={20} className="object-cover rounded-sm" />
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthSignupBar />
      
    </div>
  );
}
