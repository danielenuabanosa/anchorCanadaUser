'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import mailIcon from '@/../assets/icons/mail.png';
import shieldIcon from '@/../assets/icons/shield-check.png';

export default function ForgotPasswordMobileView() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-10">

      {/* Heading */}
      <div className="flex flex-col gap-2.5 items-center text-center">
        <div className="flex gap-2.5 items-baseline whitespace-nowrap">
          <span className="font-serif text-[48px] leading-[56px] text-[#0f172a]">Recover Your</span>
          <span className="font-serif italic text-[52px] leading-[56px] text-[#2f66c8]">Account</span>
        </div>
        <p className="text-sm text-[#8c97ad]">
          Enter the email connected to your Anchor account and we&apos;ll send secure recovery instructions.
        </p>
      </div>

      <div className="flex flex-col gap-[60px] w-full">
        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-5">
              <div className="flex items-center justify-center w-[52px] h-[52px] rounded-[26px] bg-[#d1fae5] shrink-0">
                <svg className="h-6 w-6 text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-[#15803d]">Recovery link sent!</p>
                <p className="text-xs text-[#15803d]/80">
                  We sent a link to <strong>{email}</strong>. Check your inbox — arrives in under 30 seconds.
                </p>
              </div>
            </div>
            <Link
              href="/login"
              className="bg-[#2f66c8] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-white hover:bg-[#2454a4] transition-colors w-full"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Sign In
            </Link>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-5 w-full">
              {/* Email field */}
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-1 items-baseline text-sm">
                  <span className="font-semibold text-[#0f172a]">Email Address</span>
                  <span className="text-[#ef4444]">*</span>
                </div>
                <div className="bg-white border border-[#d9e1ef] rounded-[10px] flex items-center gap-2.5 p-4 w-full">
                  <Image src={mailIcon} alt="" width={16} height={16} className="shrink-0 opacity-60" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your mail"
                    className="flex-1 min-w-0 text-sm text-[#0f172a] placeholder:text-[#8c97ad] bg-transparent outline-none"
                    autoComplete="email"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-[#8c97ad] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                  </svg>
                  <span className="text-xs text-[#8c97ad]">We&apos;ll send a recovery link to reset your password.</span>
                </div>
              </div>

              {/* Don't remember row */}
              <div className="flex items-start justify-between">
                <span className="text-xs text-[#44516a]">Don&apos;t remember your email?</span>
                <a href="mailto:support@anchorcanada.ca" className="flex items-center gap-1.5 text-xs font-medium text-[#2f66c8] hover:underline">
                  Contact Support
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Security card */}
              <div className="bg-white rounded-[10px] flex gap-5 items-center p-5 w-full">
                <div className="bg-[#eff4ff] rounded-[26px] flex items-center justify-center p-[13px] shrink-0 size-[52px]">
                  <Image src={shieldIcon} alt="" width={26} height={26} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-semibold text-sm text-[#0f172a]">Recovery links expire after</span>
                  <span className="text-xs text-[#44516a]">15 minutes for your protection</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-5 w-full">
              <button
                type="submit"
                disabled={!emailValid || isSubmitting}
                className="bg-[#2f66c8] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-white w-full hover:bg-[#2454a4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/>
                  </svg>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z" strokeLinejoin="round"/>
                    </svg>
                    Send Recovery Link
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
        )}
      </div>

      {/* Security features card */}
      <div className="bg-white border border-[#eef2f8] rounded-[10px] overflow-hidden w-full">
        <div className="flex items-center justify-center py-5 border-b border-[#eef2f8]">
          <span className="font-semibold text-base text-[#0f172a]">Your Account is Safe With Us</span>
        </div>
        <div className="flex">
          {[
            { label: 'Encrypted\nAccess', iconBg: 'bg-[#e3f3ee]', icon: <svg className="w-6 h-6 text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
            { label: 'Verified\nIdentity', iconBg: 'bg-[#e1ebfe]', icon: <svg className="w-6 h-6 text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 11l2 2 4-4" strokeLinecap="round"/></svg> },
            { label: 'Secure\nRecovery', iconBg: 'bg-[#e5e0fd]', icon: <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" strokeLinecap="round"/></svg> },
          ].map(feat => (
            <div key={feat.label} className="flex flex-1 flex-col items-center gap-5 px-5 py-[26px]">
              <div className={`${feat.iconBg} rounded-[10px] flex items-center justify-center p-2.5 size-[60px] shrink-0`}>
                {feat.icon}
              </div>
              <span className="font-semibold text-sm text-[#0f172a] text-center whitespace-pre-line">{feat.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#eef2f8] flex items-center gap-5 p-5">
          <div className="bg-[#eff4ff] rounded-[26px] flex items-center justify-center p-[13px] shrink-0 size-[52px]">
            <Image src={shieldIcon} alt="" width={26} height={26} />
          </div>
          <p className="text-xs text-[#44516a] flex-1">
            We use bank-level security to protect your information and opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}
