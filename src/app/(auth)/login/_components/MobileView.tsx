'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

import mailIcon from '@/../assets/icons/mail.png';
import lockIcon from '@/../assets/icons/lock2.png';
import shieldIcon from '@/../assets/icons/shield-check.png';
import googleIcon from '@/../assets/icons/google.png';
import lightBulbIcon from '@/../assets/icons/light-bulb.png';

const DEMO_CREDENTIALS = {
  email: 'demo@anchorcanada.ca',
  password: 'Demo@1234',
  user: {
    id: 'demo-001',
    name: 'Sarah Sullivan',
    email: 'demo@anchorcanada.ca',
    role: 'individual' as const,
  },
};

export default function LoginMobileView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const setAuth = useAuthStore(s => s.setAuth);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function handleKeyDown(e: React.KeyboardEvent) {
    setCapsLock(e.getModifierState('CapsLock'));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    if (
      email.toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      setAuth(DEMO_CREDENTIALS.user, 'demo-token-anchor-2026');
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Use the demo credentials below.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-10">

      {/* Demo credentials banner */}
      <div className="flex items-center gap-3 rounded-[10px] border border-[#2f66c8]/20 bg-[#EFF4FF] px-4 py-3">
        <svg className="h-4 w-4 text-[#2f66c8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
        </svg>
        <div className="text-xs text-[#44516A] flex-1">
          <p className="font-semibold text-[#2f66c8] mb-0.5">Demo credentials</p>
          <p>Email: <span className="font-mono font-semibold text-[#0F172A]">demo@anchorcanada.ca</span></p>
          <p>Password: <span className="font-mono font-semibold text-[#0F172A]">Demo@1234</span></p>
        </div>
        <button
          type="button"
          onClick={() => { setEmail('demo@anchorcanada.ca'); setPassword('Demo@1234'); }}
          className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#2f66c8] text-white text-xs font-semibold hover:bg-[#2454a4] transition-colors"
        >Auto-fill</button>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2.5 items-center text-center">
        <div className="flex gap-2.5 items-baseline whitespace-nowrap">
          <span className="font-serif text-[48px] leading-[56px] text-[#0f172a]">Welcome</span>
          <span className="font-serif italic text-[52px] leading-[56px] text-[#2f66c8]">Back 👋</span>
        </div>
        <p className="text-sm text-[#8c97ad]">Your personalized opportunities are waiting.</p>
      </div>

      <div className="flex flex-col gap-[60px] w-full">
        <div className="flex flex-col gap-5 w-full">

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full" id="login-form-mobile">
            {/* Email field */}
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-1 items-baseline text-sm">
                <span className="font-semibold text-[#0f172a]">Email Address</span>
                <span className="text-[#ef4444]">*</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={mailIcon} alt="" width={16} height={16} className="opacity-60" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your mail"
                  className={`anchor-field anchor-field--icon-left${emailValid ? ' anchor-field--icon-right' : ''}`}
                  autoComplete="email"
                />
                {emailValid && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none shrink-0 bg-[#15803d] rounded-[9px] p-1 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-1 items-baseline text-sm">
                <span className="font-semibold text-[#0f172a]">Password</span>
                <span className="text-[#ef4444]">*</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={lockIcon} alt="" width={16} height={16} className="opacity-60" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Minimum 8 characters"
                  className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad]">
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              {capsLock && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#15803d] shrink-0" />
                  <span className="text-xs text-[#15803d]">Caps Lock is on</span>
                </div>
              )}
            </div>

            {/* Keep signed in + Forgot password */}
            <div className="flex items-start justify-between">
              <label className="flex gap-5 items-start cursor-pointer select-none">
                <div
                  onClick={() => setKeepSignedIn(v => !v)}
                  className={`w-5 h-5 rounded border-[0.6px] flex items-center justify-center shrink-0 cursor-pointer transition-colors ${keepSignedIn ? 'bg-[#2f66c8] border-[#2f66c8]' : 'bg-[#eef2f8] border-[#d9e1ef]'}`}
                >
                  <input type="checkbox" checked={keepSignedIn} onChange={e => setKeepSignedIn(e.target.checked)} className="sr-only" />
                  {keepSignedIn && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-[#0f172a]">Keep me signed in</span>
                  <span className="text-xs text-[#44516a]">Only on private devices</span>
                </div>
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-[#2f66c8] hover:underline whitespace-nowrap mt-0.5">
                Forgot your password?
              </Link>
            </div>

            {/* Security card */}
            <div className="bg-white rounded-[10px] flex gap-5 items-center p-5 w-full">
              <div className="bg-[#eff4ff] rounded-[26px] flex items-center justify-center p-[13px] shrink-0 size-[52px]">
                <Image src={shieldIcon} alt="" width={26} height={26} />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-semibold text-base text-[#0f172a]">Secure, encrypted, and protected.</span>
                <span className="text-sm text-[#44516a]">Your data is safe with bank-level encryption.</span>
              </div>
            </div>

            {/* Or continue with */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <div className="flex-1 h-px bg-[#d9e1ef]" />
                <span className="text-sm text-[#44516a] whitespace-nowrap">Or continue with</span>
                <div className="flex-1 h-px bg-[#d9e1ef]" />
              </div>
              <div className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center justify-center px-6 py-4 w-full cursor-pointer hover:bg-[#f8fafc] transition-colors">
                <Image src={googleIcon} alt="Google" width={24} height={24} />
              </div>
            </div>
          </form>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-5 w-full">
          <button
            type="submit"
            form="login-form-mobile"
            disabled={isSubmitting}
            className="bg-[#2f66c8] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-white w-full hover:bg-[#2454a4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
          <Link
            href="/"
            className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-[#2f66c8] w-full hover:bg-[#f8fafc] transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
        </div>
      </div>

      {/* Bottom info */}
      <div className="bg-[#eff4ff] flex flex-col gap-5 items-center p-5 rounded-[10px] w-full">
        <div className="flex gap-3 items-start w-full">
          <Image src={lightBulbIcon} alt="" width={40} height={40} className="shrink-0" />
          <p className="text-sm text-[#44516a]">You can edit your profile anytime in your account settings.</p>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm text-[#8c97ad]">New to Anchor?</span>
          <Link href="/register" className="flex items-center gap-2 text-sm font-medium text-[#2f66c8] hover:underline">
            Create Account
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
