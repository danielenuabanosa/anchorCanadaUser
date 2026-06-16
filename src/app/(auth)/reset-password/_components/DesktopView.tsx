'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

import lockIcon from '@assets/icons/lock2.png';
import validLockIcon from '@assets/images/valid-lock.png';
import cityImg from '@assets/images/city.png';

interface Req { label: string; test: (p: string) => boolean; }

const requirements: Req[] = [
  { label: 'At least 8 characters', test: p => p.length >= 8 },
  { label: 'One uppercase letter (A-Z)', test: p => /[A-Z]/.test(p) },
  { label: 'One number (0-9)', test: p => /[0-9]/.test(p) },
  { label: 'One special character (e.g. !@#$%)', test: p => /[^A-Za-z0-9]/.test(p) },
];

const savedItems = [
  { label: 'Active Listings', desc: 'Your published opportunities stay protected.', iconBg: 'bg-[#e1ebfe]', icon: <svg className="w-6 h-6 text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { label: 'Application Pipeline', desc: 'All applicant submissions remain secure.', iconBg: 'bg-[#e3f3ee]', icon: <svg className="w-6 h-6 text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13l2 2 4-4"/></svg> },
  { label: 'Provider Profile', desc: 'Your organization details are encrypted and secure.', iconBg: 'bg-[#e5e0fd]', icon: <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" strokeLinecap="round"/></svg> },
  { label: 'Analytics & Insights', desc: 'Your performance data stays private and protected.', iconBg: 'bg-[#f5ddea]', icon: <svg className="w-6 h-6 text-[#be185d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> },
];

const footerItems = [
  { label: 'Secure & Encrypted', desc: 'Your information is protected with bank-level encryption', iconBg: 'bg-[#eff4ff]', icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: 'Private & Confidential', desc: "We'll never share your data with anyone.", iconBg: 'bg-[#eff4ff]', icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { label: 'Proudly Canadian', desc: 'Built in Canada for providers across the country.', iconBg: 'bg-[#eff4ff]', icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
];

export default function ResetPasswordDesktopView() {
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
    <div className="w-full max-w-[1548px] mx-auto flex flex-col gap-10">
      <div className="flex gap-10 items-start">

        {/* -- Left column: form -- */}
        <div className="flex flex-col gap-10 items-start shrink-0 w-[886px]">

          {/* Heading */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-2.5 items-baseline whitespace-nowrap">
              <span className="font-serif text-[60px] leading-[56px] text-[#0f172a]">Create Your</span>
              <span className="font-serif italic text-[78px] leading-[73px] text-[#2f66c8]">New Password</span>
            </div>
            <p className="text-base text-[#8c97ad]">Choose a secure password to regain access to your provider account.</p>
          </div>

          <div className="flex flex-col gap-[60px] w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-10 w-[886px]">

                {/* New password */}
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
                      placeholder="Minimum 8 characters"
                      className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad]">
                      {showNew ? <Eye className="h-[18px] w-[18px]" /> : <EyeOff className="h-[18px] w-[18px]" />}
                    </button>
                  </div>
                </div>

                {/* Password requirements */}
                <div className="flex flex-col gap-5">
                  <span className="font-semibold text-base leading-[1.8] text-[#0f172a]">Password requirements</span>
                  <div className="flex flex-col gap-4">
                    {requirements.map(({ label, test }) => {
                      const met = test(newPassword);
                      return (
                        <div key={label} className="flex items-center gap-5 h-6">
                          <div className={`rounded-full flex items-center justify-center p-1.5 shrink-0 size-6 ${met ? 'bg-[#22c55e]' : 'bg-[#d9e1ef]'}`}>
                            {met ? (
                              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-base ${met ? 'text-[#22c55e]' : 'text-[#44516a]'}`}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Confirm password */}
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
                      placeholder="Re-enter your password"
                      className={`anchor-field anchor-field--icon-left anchor-field--icon-right${confirmPassword && !passwordsMatch ? ' anchor-field--error' : ''}`}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c97ad]">
                      {showConfirm ? <Eye className="h-[18px] w-[18px]" /> : <EyeOff className="h-[18px] w-[18px]" />}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-sm text-[#ef4444]">Passwords do not match.</p>
                  )}
                </div>
              </div>

              {/* Buttons + shield hint */}
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center justify-between w-full">
                  <Link
                    href="/login"
                    className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-[#2f66c8] hover:bg-[#f8fafc] transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back to Sign In
                  </Link>
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="bg-[#2f66c8] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-white hover:bg-[#2454a4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-[#8c97ad] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span className="text-sm text-[#8c97ad]">Your new password takes effect immediately.</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* -- Right column: security card -- */}
        <div className="flex-1 min-w-0 w-full max-w-[541px] bg-[#eff4ff] border border-[#e0ebff] rounded-[10px] overflow-hidden flex flex-col">
          <div className="flex flex-col gap-10 px-[37px] py-[60px]">
            {/* Title + 3D image */}
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h2 className="font-serif text-[36px] leading-[56px] text-[#0f172a] whitespace-nowrap">
                  Keeping Your<br />Account Secure
                </h2>
                <p className="text-base text-[#44516a]">Your new password protects what matters most.</p>
              </div>
              <div className="shrink-0 w-[162px] h-[200px] relative">
                <Image src={validLockIcon} alt="Secure password" fill className="object-contain" />
              </div>
            </div>

            {/* Saved items */}
            <div className="border-t border-[#e0ebff] flex flex-col">
              {savedItems.map((item) => (
                <div key={item.label} className="flex items-center gap-5 px-5 py-[26px]">
                  <div className={`${item.iconBg} rounded-[10px] flex items-center justify-center p-2.5 size-[60px] shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="font-semibold text-base text-[#0f172a]">{item.label}</span>
                    <span className="text-sm text-[#44516a]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* City landscape */}
          <div className="relative h-[255px] w-full shrink-0">
            <Image src={cityImg} alt="" fill className="object-cover" />
          </div>
        </div>
        </div>

      {/* -- Footer bar -- */}
      <div className="border-t border-[#eef2f8] flex items-center gap-10 py-10 w-full">
        {footerItems.map((item, i) => (
          <div key={item.label} className="flex items-center gap-10 flex-1">
            <div className="flex gap-5 items-center">
              <div className={`${item.iconBg} rounded-[34px] flex items-center justify-center p-[17px] shrink-0 size-[68px]`}>
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-base text-[#0f172a]">{item.label}</span>
                <span className="text-sm text-[#44516a]">{item.desc}</span>
              </div>
            </div>
            {i < footerItems.length - 1 && <div className="h-[70px] w-px bg-[#d9e1ef]" />}
          </div>
        ))}
      </div>
    </div>
  );
}
