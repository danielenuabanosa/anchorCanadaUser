'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/features/auth/services/auth.service';
import { getApiErrorMessage } from '@/lib/apiError';
import { isStaticMode, resolveDevLoginEmail } from '@/lib/staticMode';
import { useAuthStore } from '@/store/authStore';

import mailIcon from '@assets/icons/mail.png';
import lockIcon from '@assets/icons/lock2.png';
import shieldIcon from '@assets/icons/shield-check.png';
import googleIcon from '@assets/icons/google.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';

const MIN_PASSWORD_LENGTH = 8;

function safeNextPath(raw: string | null) {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/dashboard';
  return raw;
}

function isValidLoginEmail(email: string) {
  if (isStaticMode()) return email.trim().length > 0;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginMobileView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const emailValid = isValidLoginEmail(email);
  const passwordValid = isStaticMode() ? password.length > 0 : password.length >= MIN_PASSWORD_LENGTH;
  const canSubmit = emailValid && passwordValid && !isSubmitting;

  function handleKeyDown(e: React.KeyboardEvent) {
    setCapsLock(e.getModifierState('CapsLock'));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!isValidLoginEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!isStaticMode() && password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const loginEmail = isStaticMode() ? resolveDevLoginEmail(email) : email.trim();
      const { user, token, refreshToken } = await authService.login({
        email: loginEmail,
        password,
      });
      setAuth(user, token, refreshToken);
      router.push(safeNextPath(searchParams.get('next')));
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sign-in failed. Please try again.'));
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col gap-10">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="flex items-baseline gap-2.5 whitespace-nowrap">
          <span className="type-page-title">Welcome</span>
          <span className="type-page-accent">Back 👋</span>
        </div>
        <p className="text-sm text-[#8c97ad]">Your provider workspace is waiting.</p>
      </div>

      <div className="flex w-full flex-col gap-[60px]">
        <div className="flex w-full flex-col gap-5">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <svg
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5" id="login-form-mobile">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-1 text-sm">
                <span className="font-semibold text-[#0f172a]">Email Address</span>
                <span className="text-[#ef4444]">*</span>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 z-[1] -translate-y-1/2">
                  <Image src={mailIcon} alt="" width={16} height={16} className="size-4 shrink-0" />
                </span>
                <input
                  type={isStaticMode() ? 'text' : 'email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isStaticMode() ? 'Any email or username' : 'Enter your email'}
                  className={`anchor-field anchor-field--icon-left${emailValid ? ' anchor-field--icon-right' : ''}`}
                  autoComplete="email"
                />
                {emailValid && (
                  <div className="pointer-events-none absolute top-1/2 right-3.5 z-[1] flex shrink-0 -translate-y-1/2 items-center justify-center rounded-[9px] bg-[#15803d] p-1">
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-1 text-sm">
                <span className="font-semibold text-[#0f172a]">Password</span>
                <span className="text-[#ef4444]">*</span>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 z-[1] -translate-y-1/2">
                  <Image src={lockIcon} alt="" width={16} height={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isStaticMode() ? 'Any password' : 'Minimum 8 characters'}
                  className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-3.5 z-[1] -translate-y-1/2 text-[#8c97ad]"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              {capsLock && (
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#15803d]" />
                  <span className="text-xs text-[#15803d]">Caps Lock is on</span>
                </div>
              )}
            </div>

            <div className="flex items-start justify-between">
              <label className="flex cursor-pointer items-start gap-5 select-none">
                <div
                  onClick={() => setKeepSignedIn((v) => !v)}
                  className={`flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border-[0.6px] transition-colors ${keepSignedIn ? 'border-[#2f66c8] bg-[#2f66c8]' : 'border-[#d9e1ef] bg-[#eef2f8]'}`}
                >
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="sr-only"
                  />
                  {keepSignedIn && (
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-[#0f172a]">Keep me signed in</span>
                  <span className="text-xs text-[#44516a]">Only on private devices</span>
                </div>
              </label>
              <Link
                href="/forgot-password"
                className="mt-0.5 whitespace-nowrap text-sm font-medium text-[#2f66c8] hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="flex w-full items-center gap-5 rounded-[10px] bg-white p-5">
              <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[26px] bg-[#eff4ff] p-[13px]">
                <Image src={shieldIcon} alt="" width={26} height={26} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-base font-semibold text-[#0f172a]">
                  Secure, encrypted, and protected.
                </span>
                <span className="text-sm text-[#44516a]">
                  Your data is safe with bank-level encryption.
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
                <Image src={googleIcon} alt="Google" width={24} height={24} className="size-6 shrink-0" />
              </div>
            </div>
          </form>
        </div>

        <div className="flex w-full flex-col gap-5">
          <button
            type="submit"
            form="login-form-mobile"
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-[#2f66c8] px-6 py-4 text-sm text-white transition-colors hover:bg-[#2454a4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
              </svg>
            ) : (
              <>
                Enter Anchor
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
          <Link
            href="/guest"
            className="flex w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#d9e1ef] bg-white px-6 py-4 text-sm text-[#2f66c8] transition-colors hover:bg-[#f8fafc]"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-5 rounded-[10px] bg-[#eff4ff] p-5">
        <div className="flex w-full items-start gap-3">
          <Image src={lightBulbIcon} alt="" width={40} height={40} className="shrink-0" />
          <p className="text-sm text-[#44516a]">
            You can edit your profile anytime in your account settings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#8c97ad]">New to Anchor?</span>
          <Link
            href="/onboarding"
            className="flex items-center gap-2 text-sm font-medium text-[#2f66c8] hover:underline"
          >
            Create Account
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
