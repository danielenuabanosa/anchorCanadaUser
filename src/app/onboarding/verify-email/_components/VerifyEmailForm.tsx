'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OtpInput } from '@/shared/components/onboarding/OtpInput';
import { authService } from '@/features/auth/services/auth.service';
import { getApiErrorMessage } from '@/lib/apiError';
import { useAuthStore } from '@/store/authStore';
import { completeProviderOnboarding } from '@/features/provider/lib/completeOnboarding';

const DIGITS = 6;

export function VerifyEmailForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState('');
  const [digits, setDigits] = useState<string[]>(Array(DIGITS).fill(''));
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('provider_signup_email');
    if (!saved) {
      router.replace('/onboarding/account');
      return;
    }
    setEmail(saved);
  }, [router]);

  async function handleVerify() {
    if (digits.some((d) => !d) || !email) return;
    setError('');
    setIsSubmitting(true);
    try {
      const result = await authService.verifyEmailOtp(email, digits.join(''));
      setAuth(result.user, result.token, result.refreshToken);
      sessionStorage.removeItem('provider_signup_email');
      const nextPath = sessionStorage.getItem('provider_signup_next') ?? '/onboarding/organization-type';
      sessionStorage.removeItem('provider_signup_next');

      if (nextPath === '/dashboard') {
        await completeProviderOnboarding();
      }

      router.push(nextPath);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid verification code.'));
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!email) return;
    setError('');
    try {
      await authService.resendSignupOtp(email);
      setMessage('A new code was sent. Check your backend console if LOG_OTP_TO_CONSOLE=true.');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not resend code.'));
    }
  }

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-6">
      <p className="text-sm text-[#44516A]">
        Enter the 6-digit code sent to <span className="font-medium text-[#0F172A]">{email}</span>
      </p>

      {error ? (
        <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      ) : null}
      {message ? (
        <div className="rounded-[10px] border border-[#DCE8FF] bg-[#EFF4FF] px-4 py-3 text-sm text-[#44516A]">
          {message}
        </div>
      ) : null}

      <OtpInput digits={digits} onChange={setDigits} />

      <button
        type="button"
        onClick={handleVerify}
        disabled={isSubmitting || digits.some((d) => !d)}
        className="inline-flex h-[50px] items-center justify-center rounded-[6px] bg-[#2F66C8] px-6 text-sm font-medium text-white disabled:opacity-60"
      >
        {isSubmitting ? 'Verifying…' : 'Verify email'}
      </button>

      <button type="button" onClick={handleResend} className="text-sm font-medium text-[#2F66C8] hover:underline">
        Resend code
      </button>
    </div>
  );
}
