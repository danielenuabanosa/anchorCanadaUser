'use client';

import { Suspense, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import lockIcon from '@assets/icons/lock2.png';
import shieldIcon from '@assets/icons/shield-check.png';
import { providerApi } from '@/features/provider/services/providerApi';
import { getApiErrorMessage } from '@/lib/apiError';

interface Req { label: string; test: (p: string) => boolean; }

const requirements: Req[] = [
  { label: 'At least 8 characters', test: p => p.length >= 8 },
  { label: 'One uppercase letter (A-Z)', test: p => /[A-Z]/.test(p) },
  { label: 'One number (0-9)', test: p => /[0-9]/.test(p) },
  { label: 'One special character (e.g. !@#$%)', test: p => /[^A-Za-z0-9]/.test(p) },
];

function ResetPasswordMobileForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token')?.trim() ?? '';
  const email = searchParams.get('email')?.trim() ?? '';

  const allMet = requirements.every(r => r.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const canSubmit = allMet && passwordsMatch && Boolean(token && email);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError('');
    try {
      await providerApi.completePasswordReset({ email, token, password: newPassword });
      router.push('/reset-password-success');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not reset password. The link may have expired.'));
      setIsSubmitting(false);
    }
  }, [canSubmit, email, token, newPassword, router]);

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-2.5 items-center text-center">
        <div className="flex flex-col gap-2.5 items-center leading-[56px]">
          <span className="font-serif text-[48px] text-[#0f172a]">Create Your</span>
          <span className="font-serif text-[52px] italic text-[#2f66c8]">New Password</span>
        </div>
        <p className="text-sm text-[#8c97ad]">Choose a secure password to regain access to your Anchor account.</p>
      </div>

      {!token || !email ? (
        <div className="rounded-[10px] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Missing reset link details.{' '}
          <Link href="/forgot-password" className="font-medium underline">Request a new one</Link>.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[10px] border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-1 items-baseline text-sm">
              <span className="font-semibold text-[#0f172a]">New Password</span>
              <span className="text-[#ef4444]">*</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={lockIcon} alt="" width={18} height={18} className="opacity-60" />
              </span>
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="anchor-field anchor-field--icon-left pr-12"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNew(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad]"
              >
                {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {requirements.map((r) => {
                const ok = r.test(newPassword);
                return (
                  <li key={r.label} className={`text-xs ${ok ? 'text-[#15803d]' : 'text-[#8c97ad]'}`}>
                    {ok ? '✓' : '○'} {r.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex gap-1 items-baseline text-sm">
              <span className="font-semibold text-[#0f172a]">Confirm Password</span>
              <span className="text-[#ef4444]">*</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={lockIcon} alt="" width={18} height={18} className="opacity-60" />
              </span>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="anchor-field anchor-field--icon-left pr-12"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad]"
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-[10px] bg-[#eff4ff] p-4">
            <Image src={shieldIcon} alt="" width={24} height={24} />
            <p className="text-sm text-[#44516a]">Use a unique password you don&apos;t reuse elsewhere.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="bg-[#2f66c8] rounded-[6px] px-6 py-4 text-base text-white disabled:opacity-60"
          >
            {isSubmitting ? 'Saving…' : 'Reset Password'}
          </button>
          <Link href="/login" className="text-center text-sm font-medium text-[#2f66c8]">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordMobileView() {
  return (
    <Suspense fallback={<p className="p-6 text-sm text-[#8C97AD]">Loading…</p>}>
      <ResetPasswordMobileForm />
    </Suspense>
  );
}
