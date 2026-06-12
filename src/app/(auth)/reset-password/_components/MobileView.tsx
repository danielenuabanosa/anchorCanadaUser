'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

import lockIcon from '@/../assets/icons/lock2.png';
import shieldIcon from '@/../assets/icons/shield-check.png';

interface Req { label: string; test: (p: string) => boolean; }

const requirements: Req[] = [
  { label: 'At least 8 characters', test: p => p.length >= 8 },
  { label: 'One uppercase letter (A-Z)', test: p => /[A-Z]/.test(p) },
  { label: 'One number (0-9)', test: p => /[0-9]/.test(p) },
  { label: 'One special character (e.g. !@#$%)', test: p => /[^A-Za-z0-9]/.test(p) },
];

export default function ResetPasswordMobileView() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const allMet = requirements.every(r => r.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const canSubmit = allMet && passwordsMatch;

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    router.push('/reset-password-success');
  }, [canSubmit, router]);

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-10">

      {/* Heading */}
      <div className="flex flex-col gap-2.5 items-center text-center">
        <div className="flex gap-2.5 items-baseline whitespace-nowrap">
          <span className="font-serif text-[48px] leading-[56px] text-[#0f172a]">Create Your</span>
          <span className="font-serif italic text-[52px] leading-[56px] text-[#2f66c8]">New Password</span>
        </div>
        <p className="text-sm text-[#8c97ad]">Choose a secure password to regain access to your Anchor account.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-5 w-full">

          {/* New password */}
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-1 items-baseline text-sm">
              <span className="font-semibold text-[#0f172a]">New Password</span>
              <span className="text-[#ef4444]">*</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={lockIcon} alt="" width={16} height={16} className="opacity-60" />
              </span>
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad]">
                {showNew ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Password requirements */}
          <div className="flex flex-col gap-4">
            {requirements.map(({ label, test }) => {
              const met = test(newPassword);
              return (
                <div key={label} className="flex items-center gap-3 h-6">
                  <div className={`rounded-full flex items-center justify-center p-1 shrink-0 size-5 ${met ? 'bg-[#22c55e]' : 'bg-[#d9e1ef]'}`}>
                    {met ? (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs ${met ? 'text-[#22c55e]' : 'text-[#44516a]'}`}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-1 items-baseline text-sm">
              <span className="font-semibold text-[#0f172a]">Confirm Password</span>
              <span className="text-[#ef4444]">*</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image src={lockIcon} alt="" width={16} height={16} className="opacity-60" />
              </span>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={`anchor-field anchor-field--icon-left anchor-field--icon-right${confirmPassword && !passwordsMatch ? ' anchor-field--error' : ''}`}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad]">
                {showConfirm ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-[#ef4444]">Passwords do not match.</p>
            )}
          </div>

          {/* Security card */}
          <div className="bg-white rounded-[10px] flex gap-5 items-center p-5 w-full">
            <div className="bg-[#eff4ff] rounded-[26px] flex items-center justify-center p-[13px] shrink-0 size-[52px]">
              <Image src={shieldIcon} alt="" width={26} height={26} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-semibold text-sm text-[#0f172a]">Your password is secure.</span>
              <span className="text-xs text-[#44516a]">Changes take effect immediately.</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-5 w-full">
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="bg-[#2f66c8] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-white w-full hover:bg-[#2454a4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/>
              </svg>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Update Password
              </>
            )}
          </button>
          <Link
            href="/login"
            className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-[#2f66c8] w-full hover:bg-[#f8fafc] transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
