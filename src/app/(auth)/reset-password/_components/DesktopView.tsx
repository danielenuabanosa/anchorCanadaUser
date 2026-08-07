'use client';

import { Suspense, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import lockIcon from '@assets/icons/lock2.png';
import validLockIcon from '@assets/images/valid-lock.png';
import cityImg from '@assets/images/city.png';
import { providerApi } from '@/features/provider/services/providerApi';
import { getApiErrorMessage } from '@/lib/apiError';

interface Req { label: string; test: (p: string) => boolean; }

const requirements: Req[] = [
  { label: 'At least 8 characters', test: p => p.length >= 8 },
  { label: 'One uppercase letter (A-Z)', test: p => /[A-Z]/.test(p) },
  { label: 'One number (0-9)', test: p => /[0-9]/.test(p) },
  { label: 'One special character (e.g. !@#$%)', test: p => /[^A-Za-z0-9]/.test(p) },
];

const savedItems = [
  { label: 'Saved Opportunities', desc: 'Your jobs, grants and programs stay protected.', iconBg: 'bg-[#e1ebfe]', icon: <svg className="w-6 h-6 text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { label: 'Application History', desc: 'All your activity and progress remain safe.', iconBg: 'bg-[#e3f3ee]', icon: <svg className="w-6 h-6 text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13l2 2 4-4"/></svg> },
  { label: 'Profile Data', desc: 'Your personal information is encrypted and secure.', iconBg: 'bg-[#e5e0fd]', icon: <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" strokeLinecap="round"/></svg> },
  { label: 'Personalized Recommendations', desc: 'We\'ll continue matching you with the right opportunities.', iconBg: 'bg-[#f5ddea]', icon: <svg className="w-6 h-6 text-[#be185d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
];

const footerItems = [
  { label: 'Secure & Encrypted', desc: 'Your information is protected with bank-level encryption', iconBg: 'bg-[#eff4ff]', icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: 'Private & Confidential', desc: 'We never share your data with anyone.', iconBg: 'bg-[#eff4ff]', icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { label: 'Proudly Canadian', desc: 'Built in Canada for people across the country.', iconBg: 'bg-[#eff4ff]', icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
];

function ResetPasswordDesktopForm() {
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
    <div className="w-full max-w-[1548px] mx-auto flex flex-col gap-10">
      <div className="flex gap-10 items-start">
        <div className="flex flex-col gap-10 items-start shrink-0 w-[886px]">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2.5 items-baseline whitespace-nowrap">
              <span className="font-serif text-[60px] leading-[56px] text-[#0f172a]">Create Your</span>
              <span className="font-serif italic text-[78px] leading-[73px] text-[#2f66c8]">New Password</span>
            </div>
            <p className="text-base text-[#8c97ad]">Choose a secure password to regain access to your Anchor account.</p>
          </div>

          {!token || !email ? (
            <div className="rounded-[10px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              This reset link is missing required parameters. Request a new recovery email from{' '}
              <Link href="/forgot-password" className="font-medium underline">Forgot Password</Link>.
            </div>
          ) : null}

          {error ? (
            <div className="rounded-[10px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          ) : null}

          <div className="flex flex-col gap-[60px] w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-10 w-[886px]">
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-1 items-baseline text-base">
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
                      aria-label={showNew ? 'Hide password' : 'Show password'}
                    >
                      {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <ul className="mt-1 flex flex-col gap-1.5">
                    {requirements.map((r) => {
                      const ok = r.test(newPassword);
                      return (
                        <li key={r.label} className={`text-sm ${ok ? 'text-[#15803d]' : 'text-[#8c97ad]'}`}>
                          {ok ? '✓' : '○'} {r.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-1 items-baseline text-base">
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
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch ? (
                    <p className="text-sm text-[#ef4444]">Passwords do not match.</p>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <Link
                  href="/login"
                  className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-[#2f66c8] hover:bg-[#f8fafc] transition-colors"
                >
                  Back to Sign In
                </Link>
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="bg-[#2f66c8] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-white hover:bg-[#2454a4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving…' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-1 min-w-0 bg-[#eff4ff] border border-[#e0ebff] rounded-[10px] overflow-hidden flex flex-col">
          <div className="flex flex-col gap-10 px-[37px] py-[60px]">
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="font-serif text-[36px] leading-[56px] text-[#0f172a]">Your Account is<br />Safe With Us</h2>
                <p className="text-base text-[#44516a]">
                  We use bank-level security to keep your information and opportunities protected.
                </p>
              </div>
              <div className="shrink-0 w-[162px] h-[200px] relative">
                <Image src={validLockIcon} alt="Secure account" fill className="object-contain" />
              </div>
            </div>
            <div className="border-t border-[#e0ebff] flex flex-col">
              {savedItems.map((feat) => (
                <div key={feat.label} className="flex items-center gap-5 px-5 py-[26px]">
                  <div className={`${feat.iconBg} rounded-[10px] flex items-center justify-center p-2.5 size-[60px] shrink-0`}>
                    {feat.icon}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-base text-[#0f172a]">{feat.label}</span>
                    <span className="text-sm text-[#44516a]">{feat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[255px] w-full shrink-0">
            <Image src={cityImg} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="border-t border-[#eef2f8] flex items-center gap-10 py-10 w-full">
        {footerItems.map((item) => (
          <div key={item.label} className="flex gap-5 items-center flex-1">
            <div className={`${item.iconBg} rounded-[34px] flex items-center justify-center p-[17px] shrink-0 size-[68px]`}>
              {item.icon}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-base text-[#0f172a]">{item.label}</span>
              <span className="text-sm text-[#44516a]">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResetPasswordDesktopView() {
  return (
    <Suspense fallback={<p className="p-10 text-sm text-[#8C97AD]">Loading…</p>}>
      <ResetPasswordDesktopForm />
    </Suspense>
  );
}
