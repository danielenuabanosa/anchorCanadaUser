'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { providerApi } from '@/features/provider/services/providerApi';
import { getApiErrorMessage } from '@/lib/apiError';
import { useAuthStore } from '@/store/authStore';

type InvitePreview = {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationName: string;
  expiresAt: string | null;
};

function AcceptInviteContent() {
  const params = useSearchParams();
  const token = params.get('token')?.trim() ?? '';

  const [invite, setInvite] = useState<InvitePreview | null>(null);
  const [loadingInvite, setLoadingInvite] = useState(true);
  const [inviteError, setInviteError] = useState('');

  // form fields
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // submission
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setInviteError('This invitation link is missing a token.');
      setLoadingInvite(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await providerApi.getTeamInvite(token);
        if (!cancelled) {
          setInvite(data);
          setFullName(data.name ?? '');
        }
      } catch (err) {
        if (!cancelled) {
          setInviteError(err instanceof Error ? err.message : 'Could not load this invitation.');
        }
      } finally {
        if (!cancelled) setLoadingInvite(false);
      }
    })();

    return () => { cancelled = true; };
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!invite || !token) return;

    if (!fullName.trim()) {
      setFormError('Full name is required.');
      return;
    }
    if (password.length < 8) {
      setFormError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const result = await providerApi.registerFromInvite({
        token,
        name: fullName.trim(),
        password,
      });
      useAuthStore.getState().setAuth(result.user, result.token, result.refreshToken);
      setDone(true);
    } catch (err) {
      setFormError(getApiErrorMessage(err, 'Registration failed. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingInvite) {
    return (
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-4 py-16">
        <p className="text-sm text-[#8C97AD]">Loading invitation…</p>
      </div>
    );
  }

  if (inviteError) {
    return (
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-4 py-16">
        <div className="rounded-[10px] border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {inviteError}
        </div>
        <Link href="/login" className="text-center text-sm font-medium text-[#2F66C8] hover:underline">
          Go to sign in
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-5 backdrop-blur-[5px]">
        <div className="flex w-full max-w-[480px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
          <div className="flex justify-end border-b border-[#EEF2F8] p-[26px]" />

          <div className="flex flex-col items-center px-[26px] py-10 text-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#F1FFEE]">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#EDF9F1]">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="40" fill="#EDF9F1" />
                  <path d="M24 40l11 11 21-22" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline justify-center gap-1.5">
              <span className="font-serif text-[28px] text-[#0F172A] md:text-[36px]">Registration</span>
              <span className="font-serif text-[28px] italic text-[#2F66C8] md:text-[36px]">Complete!</span>
            </div>

            <p className="mt-4 text-base text-[#44516A]">
              You&apos;re on the team. This invitation link can no longer be used.
            </p>

            <div className="mt-5 flex w-full items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2F66C8] text-sm font-semibold text-white">
                {invite?.name?.charAt(0).toUpperCase() ?? '?'}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium text-[#0F172A]">{invite?.name}</p>
                <p className="truncate text-xs text-[#44516A]">{invite?.email}</p>
              </div>
              <span className="shrink-0 rounded-[4px] bg-[#EFF4FF] px-2 py-1 text-xs font-medium text-[#2F66C8]">
                {invite?.role}
              </span>
            </div>
          </div>

          <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#2454A4]"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-4 py-16">
      {/* Header */}
      <div>
        <h1 className="font-serif text-[36px] leading-[44px] text-[#0F172A]">Team invitation</h1>
        <p className="mt-2 text-base text-[#44516A]">
          Complete your registration to join{' '}
          <span className="font-medium text-[#0F172A]">{invite?.organizationName}</span>.
        </p>
      </div>

      {/* Invite details */}
      {invite ? (
        <div className="flex items-center justify-between rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] px-5 py-4">
          <div>
            <p className="text-xs text-[#8C97AD]">Organization</p>
            <p className="font-medium text-[#0F172A]">{invite.organizationName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#8C97AD]">Role</p>
            <p className="font-medium text-[#0F172A]">{invite.role}</p>
          </div>
        </div>
      ) : null}

      {/* Registration form */}
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-5">
        {formError ? (
          <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        ) : null}

        {/* Email — read-only */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#0F172A]">Email address</label>
          <div className="flex items-center gap-3 rounded-[10px] border border-[#D9E1EF] bg-[#F8FAFC] px-4 py-4">
            <Mail className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" />
            <span className="flex-1 truncate text-base text-[#44516A]">{invite?.email}</span>
          </div>
          <p className="mt-1.5 text-xs text-[#8C97AD]">This email is tied to your invitation and cannot be changed.</p>
        </div>

        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[#0F172A]">
            Full name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 rounded-[10px] border border-[#D9E1EF] bg-white px-4 py-4 transition-colors focus-within:border-[#2F66C8]">
            <User className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" />
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="no-anchor-field flex-1 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#0F172A]">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 rounded-[10px] border border-[#D9E1EF] bg-white px-4 py-4 transition-colors focus-within:border-[#2F66C8]">
            <Lock className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min. 8 characters)"
              required
              className="no-anchor-field flex-1 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="shrink-0 text-[#8C97AD] hover:text-[#44516A]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#0F172A]">
            Confirm password <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 rounded-[10px] border border-[#D9E1EF] bg-white px-4 py-4 transition-colors focus-within:border-[#2F66C8]">
            <Lock className="h-[18px] w-[18px] shrink-0 text-[#8C97AD]" />
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="no-anchor-field flex-1 bg-transparent text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="shrink-0 text-[#8C97AD] hover:text-[#44516A]"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full rounded-[10px] bg-[#2F66C8] px-6 py-4 text-base font-medium text-white transition-colors hover:bg-[#2454A4] disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Complete registration'}
        </button>

        <p className="text-center text-sm text-[#44516A]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#2F66C8] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function TeamAcceptPage() {
  return (
    <Suspense fallback={<p className="p-10 text-sm text-[#8C97AD]">Loading…</p>}>
      <AcceptInviteContent />
    </Suspense>
  );
}
