'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/auth.service';
import { getApiErrorMessage } from '@/lib/apiError';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { useAuthStore } from '@/store/authStore';
import { completeProviderOnboarding } from '@/features/provider/lib/completeOnboarding';

const SIGNUP_NEXT_KEY = 'provider_signup_next';

function getSignupNextPath() {
  if (typeof window === 'undefined') return '/onboarding/organization-type';
  const fromQuery = new URLSearchParams(window.location.search).get('next');
  return fromQuery ?? '/onboarding/organization-type';
}

export function AccountRegistrationForm() {
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);
  const setAuth = useAuthStore((s) => s.setAuth);

  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await authService.register({
        name: organizationName,
        email,
        password,
        role: 'provider',
      });

      setOnboardingData({ organizationName, organizationEmail: email });

      const nextPath = getSignupNextPath();
      sessionStorage.setItem(SIGNUP_NEXT_KEY, nextPath);

      if ('requiresEmailConfirmation' in result) {
        sessionStorage.setItem('provider_signup_email', result.email);
        router.push('/onboarding/verify-email');
        return;
      }

      setAuth(result.user, result.token, result.refreshToken);

      if (nextPath === '/dashboard') {
        try {
          await completeProviderOnboarding();
        } catch (saveErr) {
          setError(getApiErrorMessage(saveErr, 'Account created but onboarding could not be saved.'));
          setIsSubmitting(false);
          return;
        }
      }

      router.push(nextPath);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Registration failed.'));
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[520px] flex-col gap-5">
      {error ? (
        <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <label className="flex flex-col gap-2 text-sm text-[#44516A]">
        Organization name
        <input
          required
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          className="rounded-[10px] border border-[#D9E1EF] px-4 py-3 text-[#0F172A]"
          placeholder="Maple Future Nonprofit"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-[#44516A]">
        Work email
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-[10px] border border-[#D9E1EF] px-4 py-3 text-[#0F172A]"
          placeholder="you@organization.ca"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-[#44516A]">
        Password
        <input
          required
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-[10px] border border-[#D9E1EF] px-4 py-3 text-[#0F172A]"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-[#44516A]">
        Confirm password
        <input
          required
          type="password"
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-[10px] border border-[#D9E1EF] px-4 py-3 text-[#0F172A]"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex h-[50px] items-center justify-center rounded-[6px] bg-[#2F66C8] px-6 text-sm font-medium text-white disabled:opacity-60"
      >
        {isSubmitting ? 'Creating account…' : 'Create provider account'}
      </button>
    </form>
  );
}
