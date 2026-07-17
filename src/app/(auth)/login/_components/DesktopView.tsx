'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

function isValidLoginEmail(email: string) {
  if (isStaticMode()) return email.trim().length > 0;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginDesktopView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
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
      const { user, token } = await authService.login({
        email: loginEmail,
        password,
      });
      setAuth(user, token);
      router.push('/dashboard');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sign-in failed. Please try again.'));
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col gap-10">
      <div className="flex w-full flex-col items-stretch gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="type-page-title">Welcome</span>
            <span className="type-page-accent">Back</span>
            <span className="type-page-accent" aria-hidden="true">
              👋
            </span>
          </div>
          <p className="type-subtitle">Your provider workspace is waiting.</p>
        </div>

        <div className="flex w-full flex-col gap-10">
          <div className="flex w-full flex-col gap-8">
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

            <form id="login-form" onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline gap-1 type-label">
                  <span className="font-semibold text-[#0f172a]">Email Address</span>
                  <span className="text-[#ef4444]">*</span>
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
                    <Image src={mailIcon} alt="" width={18} height={18} className="opacity-60" />
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
                    <div className="pointer-events-none absolute top-1/2 right-3.5 flex shrink-0 -translate-y-1/2 items-center justify-center rounded-[10px] bg-[#15803d] p-1.5">
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
                <div className="flex items-baseline gap-1 type-label">
                  <span className="font-semibold text-[#0f172a]">Password</span>
                  <span className="text-[#ef4444]">*</span>
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
                    <Image src={lockIcon} alt="" width={18} height={18} className="opacity-60" />
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
                    className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#8c97ad] hover:text-[#44516a]"
                  >
                    {showPassword ? (
                      <Eye className="h-[18px] w-[18px]" />
                    ) : (
                      <EyeOff className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>
                {capsLock && (
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#15803d]" />
                    <span className="text-sm text-[#15803d]">Caps Lock is on</span>
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between gap-4">
                <label className="flex cursor-pointer items-start gap-3 select-none">
                  <div
                    onClick={() => setKeepSignedIn((v) => !v)}
                    className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded border-[0.72px] transition-colors ${keepSignedIn ? 'border-[#2f66c8] bg-[#2f66c8]' : 'border-[#d9e1ef] bg-[#eef2f8]'}`}
                  >
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="sr-only"
                    />
                    {keepSignedIn && (
                      <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
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
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-[#0f172a]">Keep me signed in</span>
                    <span className="text-sm text-[#44516a]">Only on private devices</span>
                  </div>
                </label>
                <Link
                  href="/forgot-password"
                  className="shrink-0 text-sm font-medium text-[#2f66c8] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <div className="h-px flex-1 bg-[#d9e1ef]" />
                  <span className="text-base whitespace-nowrap text-[#44516a]">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-[#d9e1ef]" />
                </div>
                <div className="flex w-full cursor-pointer items-center justify-center gap-5 rounded-[6px] border border-[#d9e1ef] bg-white px-6 py-4 transition-colors hover:bg-[#f8fafc]">
                  <Image src={googleIcon} alt="" width={24} height={24} />
                  <span className="text-base font-medium text-[#0f172a]">Google</span>
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-4">
                <Link
                  href="/guest"
                  className="flex items-center gap-2.5 rounded-[6px] border border-[#d9e1ef] bg-white px-5 py-3.5 text-sm text-[#2f66c8] transition-colors hover:bg-[#f8fafc]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M19 12H5M12 19l-7-7 7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back
                </Link>
                <button
                  type="submit"
                  form="login-form"
                  disabled={!canSubmit}
                  className="flex items-center gap-2.5 rounded-[6px] bg-[#2f66c8] px-5 py-3.5 text-sm text-white transition-colors hover:bg-[#2454a4] disabled:cursor-not-allowed disabled:opacity-60"
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
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <div className="flex w-full items-center gap-4 rounded-[10px] bg-white p-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#eff4ff]">
                  <Image src={shieldIcon} alt="" width={28} height={28} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-base font-semibold text-[#0f172a]">
                    Secure, encrypted, and protected.
                  </span>
                  <span className="text-sm text-[#44516a]">
                    Your data is safe with bank-level encryption.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-[10px] bg-[#eff4ff] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Image src={lightBulbIcon} alt="" width={20} height={20} className="mt-0.5 shrink-0" />
          <span className="text-sm text-[#44516a]">
            You can edit your profile anytime in your account settings.
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2 pl-8 sm:pl-0">
          <span className="text-sm text-[#8c97ad]">New to Anchor?</span>
          <Link
            href="/onboarding"
            className="flex items-center gap-1.5 text-sm font-medium text-[#2f66c8] hover:underline"
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
