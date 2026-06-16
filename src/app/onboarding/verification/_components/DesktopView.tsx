'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Clock, X } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { OtpInput } from '@/shared/components/onboarding/OtpInput';
import { Footer } from './Footer';
import {
  DEFAULT_PROFILE,
  PREVIEW_BADGES,
} from '@/shared/components/onboarding/profilePreviewData';

import mail3Icon from '@assets/icons/mail3.png';
import hearPhoneIcon from '@assets/icons/hear-phone.png';
import sendIcon from '@assets/icons/send.png';
import boxIcon from '@assets/icons/box.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';
import starIcon from '@assets/icons/star.png';
import shield3Icon from '@assets/icons/shield3.png';
import editIcon from '@assets/icons/edit.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import shieldValidIcon from '@assets/icons/shield-valid.png';
import validBannerImg from '@assets/images/valid-bg.png';
import validLockIcon from '@assets/images/valid-lock.png';
import orgLogoImg from '@assets/images/prov-utoronto.png';

const NEXT_UP_ITEMS = [
  { icon: boxIcon, title: 'Provider Dashboard', desc: 'Manage your published opportunities.' },
  { icon: lightBulbIcon, title: 'Publish Opportunities', desc: 'Post jobs, grants, and training programs.' },
  { icon: starIcon, title: 'Team Collaboration', desc: 'Invite colleagues to help manage listings.' },
] as const;

const DIGITS_COUNT = 6;

function DividerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-5">
      <div className="h-px flex-1 bg-[#D9E1EF]" />
      <p className="shrink-0 font-sans text-[16px] text-[#44516A]">{children}</p>
      <div className="h-px flex-1 bg-[#D9E1EF]" />
    </div>
  );
}

export default function DesktopView() {
  const router = useRouter();

  const [verifyMethod, setVerifyMethod] = useState<'email' | 'phone'>('email');
  const [editMode, setEditMode] = useState(false);
  const [userEmail, setUserEmail] = useState('contact@organization.ca');
  const [savedEmail, setSavedEmail] = useState('contact@organization.ca');
  const [userPhone, setUserPhone] = useState('(416) 555-0100');
  const [savedPhone, setSavedPhone] = useState('(416) 555-0100');
  const [digits, setDigits] = useState<string[]>(Array(DIGITS_COUNT).fill(''));
  const [showToast, setShowToast] = useState(false);

  const filledDigits = digits.filter(Boolean).length;
  const canVerify = filledDigits === DIGITS_COUNT;

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  function handleSaveContact() {
    if (verifyMethod === 'email') {
      if (!userEmail.trim()) return;
      setSavedEmail(userEmail.trim());
    } else {
      if (!userPhone.trim()) return;
      setSavedPhone(userPhone.trim());
    }
    setEditMode(false);
    setDigits(Array(DIGITS_COUNT).fill(''));
  }

  function handleVerify() {
    if (!canVerify) return;
    setShowToast(true);
    setTimeout(() => router.push('/onboarding/team'), 1600);
  }

  function ContactCard() {
    const isEmail = verifyMethod === 'email';
    const icon = isEmail ? mail3Icon : hearPhoneIcon;
    const label = isEmail ? 'Email Address' : 'Phone Number';
    const saved = isEmail ? savedEmail : savedPhone;

    if (editMode) {
      return (
        <div className="flex w-full flex-col gap-5 rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="flex size-[68px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] p-[17px]">
                <Image src={icon} alt="" width={34} height={34} className="object-contain" />
              </div>
              <div>
                <p className="font-sans text-[18px] font-semibold text-[#0F172A]">{label}</p>
                <p className="mt-1 font-sans text-[16px] text-[#44516A]">Provide {isEmail ? 'email' : 'phone'} to send 6-digit code</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveContact}
              className="flex shrink-0 items-center gap-2.5 font-sans text-[16px] text-[#2F66C8] transition-opacity hover:opacity-75"
            >
              Save &amp; Send
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M3 2h10l2 2v11a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
                  stroke="#2F66C8"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path d="M13 2v3H5V2" stroke="#2F66C8" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M7 10h4M7 13h4" stroke="#2F66C8" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image src={icon} alt="" width={18} height={18} className="opacity-60" />
            </span>
            <input
              type={isEmail ? 'email' : 'tel'}
              value={isEmail ? userEmail : userPhone}
              onChange={(e) => isEmail ? setUserEmail(e.target.value) : setUserPhone(e.target.value)}
              placeholder={isEmail ? 'Enter your email address' : 'Enter your phone number'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveContact();
              }}
              className="anchor-field anchor-field--icon-left h-[53px] rounded-[10px] border-[#2F66C8] focus:border-[#2F66C8]"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-5">
          <div className="flex size-[68px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF] p-[17px]">
            <Image src={icon} alt="" width={34} height={34} className="object-contain" />
          </div>
          <div>
            <p className="font-sans text-[18px] font-semibold text-[#0F172A]">Sent To:</p>
            <p className="mt-1 font-sans text-[16px] text-[#44516A]">{saved}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditMode(true)}
          className="flex items-center gap-2.5 font-sans text-[16px] text-[#2F66C8] transition-opacity hover:opacity-75"
        >
          Edit
          <Image src={editIcon} alt="" width={18} height={18} className="opacity-80" />
        </button>
      </div>
    );
  }

  function VerificationForm() {
    return (
      <div className="flex w-full flex-col gap-10">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => { setVerifyMethod('email'); setEditMode(false); setDigits(Array(DIGITS_COUNT).fill('')); }}
            className={`rounded-[6px] px-5 py-2.5 font-sans text-[14px] font-medium transition-colors ${
              verifyMethod === 'email' ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] bg-white text-[#44516A]'
            }`}
          >
            Verify by Email
          </button>
          <button
            type="button"
            onClick={() => { setVerifyMethod('phone'); setEditMode(false); setDigits(Array(DIGITS_COUNT).fill('')); }}
            className={`rounded-[6px] px-5 py-2.5 font-sans text-[14px] font-medium transition-colors ${
              verifyMethod === 'phone' ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] bg-white text-[#44516A]'
            }`}
          >
            Verify by Phone
          </button>
        </div>

        <ContactCard />

        <div className="flex flex-col items-center gap-2.5">
          <p className="font-sans text-[16px] font-semibold leading-[1.8] text-[#0F172A]">
            Enter the 6-digit code
          </p>
          <OtpInput digits={digits} onChange={setDigits} variant="desktop" />
          <p className="flex items-center gap-1.5 font-sans text-[14px] text-[#8C97AD]">
            <Clock className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Verification codes expire in{' '}
            <span className="font-medium text-[#2F66C8]">10 minutes.</span>
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <DividerLabel>Didn&apos;t get the code?</DividerLabel>
          <div className="flex gap-5">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-5 rounded-[6px] border border-[#D9E1EF] bg-white px-6 py-4 font-sans text-[16px] font-medium text-[#2F66C8] transition-colors hover:bg-[#F8FAFC]"
            >
              <Image src={sendIcon} alt="" width={24} height={24} className="object-contain" />
              Resend Code
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center rounded-[6px] bg-[#EFF4FF] px-6 py-4 font-sans text-[16px] font-medium text-[#8C97AD] transition-colors hover:bg-[#E8EFFE]"
            >
              OR Check your spam folder
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5 rounded-[10px] border border-[#D1FAE5] bg-[#ECFDF5] p-5">
          <div className="flex size-[68px] shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] p-[17px]">
            <Image src={shield3Icon} alt="" width={34} height={34} className="object-contain" />
          </div>
          <div>
            <p className="font-sans text-[18px] font-semibold text-[#0F172A]">Your organization&apos;s security matters</p>
            <p className="mt-1 font-sans text-[16px] text-[#44516A]">
              We verify every provider to keep opportunities real, safe, and trustworthy.
            </p>
          </div>
        </div>
      </div>
    );
  }

  function RightPanel() {
    return (
      <div className="overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
        <div className="relative h-[140px] w-full overflow-hidden">
          <Image src={validBannerImg} alt="Toronto skyline" fill className="object-cover" priority />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src={shieldValidIcon} alt="" width={80} height={80} className="object-contain drop-shadow-md" />
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <div className="text-center">
            <p className="font-sans text-[20px] font-semibold leading-[1.6] text-[#0F172A]">🎉 Almost There!</p>
            <p className="mt-2 font-sans text-[14px] text-[#44516A]">Your organization profile is ready.</p>
          </div>

          <div className="mt-4 flex flex-col items-center py-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm">
              <Image src={orgLogoImg} alt="Organization logo" fill className="object-contain p-2" sizes="96px" />
            </div>
            <p className="mt-4 font-serif text-[28px] leading-none text-[#0F172A]">{DEFAULT_PROFILE.displayName}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {PREVIEW_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1 rounded-[5px] px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: badge.bg, color: badge.text }}
                >
                  <Image src={badge.icon} alt="" width={12} height={12} className="object-contain" />
                  {badge.label}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 font-sans text-[12px] text-[#8C97AD]">
              <Image src={locationPinIcon} alt="" width={14} height={14} className="opacity-60" />
              {DEFAULT_PROFILE.location}
              <Image src={canadaFlagIcon} alt="Canada" width={18} height={12} className="rounded-sm object-cover" />
            </div>
          </div>

          <div className="border-t border-[#EEF2F8] pt-5">
            <p className="text-center font-sans text-[14px] font-medium text-[#0F172A]">What to do next:</p>
            <div className="mt-4 overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
              {NEXT_UP_ITEMS.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center justify-between gap-3 p-2.5 ${
                    index < NEXT_UP_ITEMS.length - 1 ? 'border-b border-[#EEF2F8]' : ''
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex size-[60px] shrink-0 items-center justify-center rounded-[10px] bg-[#EFF4FF] p-2.5">
                      <Image src={item.icon} alt="" width={24} height={24} className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-[14px] font-medium text-[#0F172A]">{item.title}</p>
                      <p className="mt-1 font-sans text-[12px] text-[#44516A]">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 rounded-[10px] bg-[#EFF4FF] p-4">
              <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-white p-3 shadow-sm">
                <Image src={validLockIcon} alt="" width={26} height={26} className="object-contain" />
              </div>
              <div>
                <p className="font-sans text-[14px] font-semibold text-[#0F172A]">Secure. Private. Trusted.</p>
                <p className="mt-1 font-sans text-[12px] text-[#44516A]">
                  Your information is protected with bank-level encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {showToast && (
        <div className="fixed right-4 top-20 z-50 flex items-center gap-3 rounded-xl border border-[#D1FAE5] bg-gradient-to-r from-[#DEFFEB] to-white px-5 py-4 shadow-[0_6px_8px_rgba(0,0,0,0.08)]">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/60">
            <div className="flex size-6 items-center justify-center rounded-xl bg-[#22C55E]">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          </div>
          <div>
            <p className="font-sans text-[16px] font-medium text-[#0F172A]">
              {verifyMethod === 'email' ? 'Email Verified!' : 'Phone Verified!'}
            </p>
            <p className="font-sans text-[14px] text-[#8C97AD]">
              {verifyMethod === 'email' ? 'Email verified successfully.' : 'Phone verified successfully.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="ml-2 text-[#8C97AD] hover:text-[#44516A]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={4} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-20">
        <div className="flex w-full items-start gap-10">
          <div className="flex w-[886px] max-w-[886px] flex-1 flex-col">
            <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
              Verify Your{' '}
              <span className="font-serif italic text-[#2F66C8]">Organization</span>
            </h1>
            <div className="mt-6 font-sans text-[16px] text-[#8C97AD]">
              <p>We&apos;ve sent a secure verification code to your email or phone.</p>
              <p>Enter it below to verify your organization and continue setup.</p>
            </div>

            <div className="mt-10">
              <VerificationForm />
            </div>
          </div>

          <div className="w-[400px] shrink-0">
            <div className="sticky top-24">
              <RightPanel />
            </div>
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/organization-info"
        onContinue={handleVerify}
        continueDisabled={!canVerify}
        continueLabel="Verify & Continue"
        footer={<Footer />}
      />
    </div>
  );
}
