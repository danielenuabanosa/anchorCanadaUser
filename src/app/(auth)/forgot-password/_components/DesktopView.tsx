'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import mailIcon from '@assets/icons/mail.png';
import shieldIcon from '@assets/icons/shield-check.png';
import headphonesIcon from '@assets/icons/hear-phone.png';
import validLockImg from '@assets/images/valid-lock.png';
import cityImg from '@assets/images/city.png';

export default function ForgotPasswordDesktopView() {
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

  const securityFeatures = [
    {
      label: 'Encrypted Access',
      desc: 'All recovery links are encrypted and time-sensitive.',
      iconBg: 'bg-[#e3f3ee]',
      icon: (
        <svg className="w-6 h-6 text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
    },
    {
      label: 'Verified Identity',
      desc: 'We verify your identity before any changes are made.',
      iconBg: 'bg-[#e1ebfe]',
      icon: (
        <svg className="w-6 h-6 text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          <path d="M16 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'Secure Password Recovery',
      desc: 'Reset your password safely with one-time secure links.',
      iconBg: 'bg-[#e5e0fd]',
      icon: (
        <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-[1548px] mx-auto flex flex-col gap-10">
      <div className="flex gap-10 items-start">

        {/* -- Left column: form -- */}
        <div className="flex flex-col gap-10 items-start shrink-0 w-[886px]">

          {/* Heading */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-2.5 items-baseline whitespace-nowrap">
              <span className="font-serif text-[60px] leading-[56px] text-[#0f172a]">Recover Your</span>
              <span className="font-serif italic text-[78px] leading-[73px] text-[#2f66c8]">Account</span>
            </div>
            <p className="text-base text-[#8c97ad]">
              Enter the email connected to your provider account and we&apos;ll send secure recovery instructions.
            </p>
          </div>

          <div className="flex flex-col gap-[60px] w-full">
            {submitted ? (
              /* -- Success state -- */
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-5 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-5">
                  <div className="flex items-center justify-center w-[52px] h-[52px] rounded-[26px] bg-[#d1fae5] shrink-0">
                    <svg className="h-6 w-6 text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-[#15803d]">Recovery link sent!</p>
                    <p className="text-sm text-[#15803d]/80">
                      We sent a recovery link to <strong>{email}</strong>. Check your inbox — it usually arrives in less than 30 seconds.
                    </p>
                  </div>
                </div>
                <Link
                  href="/login"
                  className="bg-[#2f66c8] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-base text-white hover:bg-[#2454a4] transition-colors self-start"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Sign In
                </Link>
              </div>
            ) : (
              /* -- Form -- */
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-10 w-[886px]">
                  {/* Email field */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex gap-1 items-baseline text-base">
                      <span className="font-semibold text-[#0f172a]">Email Address</span>
                      <span className="text-[#ef4444]">*</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Image src={mailIcon} alt="" width={18} height={18} className="opacity-60" />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your mail"
                        className="anchor-field anchor-field--icon-left"
                        autoComplete="email"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-[#8c97ad] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                      </svg>
                      <span className="text-sm text-[#8c97ad]">We&apos;ll send a recovery link to reset your password.</span>
                    </div>
                  </div>

                  {/* Don't remember row */}
                  <div className="flex items-start justify-between">
                    <span className="text-base text-[#44516a]">Don&apos;t remember your email?</span>
                    <a href="mailto:support@anchorcanada.ca" className="flex items-center gap-3 text-base font-medium text-[#2f66c8] hover:underline">
                      Contact Support
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>

                  {/* Security card + info */}
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-white rounded-[10px] flex gap-5 items-center p-5 w-full">
                      <div className="bg-[#eff4ff] rounded-[34px] flex items-center justify-center p-[17px] shrink-0 size-[68px]">
                        <Image src={shieldIcon} alt="" width={34} height={34} />
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <span className="font-semibold text-lg text-[#0f172a]">Recovery links expire after 15 minutes</span>
                        <span className="text-base text-[#44516a]">for your protection</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-[#8c97ad] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                      </svg>
                      <span className="text-sm text-[#8c97ad]">Usually arrives in less than 30 seconds.</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
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
                    disabled={!emailValid || isSubmitting}
                    className="bg-[#2f66c8] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-white hover:bg-[#2454a4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                </div>
              </form>
            )}
          </div>
        </div>

        {/* -- Right column: security card -- */}
        <div className="flex-1 min-w-0 bg-[#eff4ff] border border-[#e0ebff] rounded-[10px] overflow-hidden flex flex-col">
          <div className="flex flex-col gap-10 px-[37px] py-[60px]">
            {/* Title + 3D image */}
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="font-serif text-[36px] leading-[56px] text-[#0f172a]">Your Account is<br />Safe With Us</h2>
                <p className="text-base text-[#44516a]">
                  We use bank-level security to keep your provider information and listings protected.
                </p>
              </div>
              <div className="shrink-0 w-[162px] h-[200px] relative">
                <Image src={validLockImg} alt="Secure account" fill className="object-contain" />
              </div>
            </div>

            {/* Security features */}
            <div className="border-t border-[#e0ebff] flex flex-col">
              {securityFeatures.map((feat) => (
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

          {/* City landscape at bottom */}
          <div className="relative h-[255px] w-full shrink-0">
            <Image src={cityImg} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* -- Support footer -- */}
      <div className="border-t border-[#eef2f8] flex items-center justify-between py-10 w-full">
        <div className="flex gap-5 items-center">
          <div className="bg-[#eff4ff] rounded-[34px] flex items-center justify-center p-[17px] shrink-0 size-[68px]">
            <Image src={headphonesIcon} alt="" width={34} height={34} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-base text-[#0f172a]">Need help?</span>
            <span className="text-sm text-[#44516a]">Our support team is here for you.</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-[#44516a]">Mon – Fri: 9:00 AM – 6:00 PM EST</span>
          <a href="mailto:support@anchorcanada.ca" className="font-medium text-[#2f66c8] hover:underline">
            support@anchorcanada.ca
          </a>
        </div>
      </div>
    </div>
  );
}
