'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Check } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { Footer } from './Footer';

import mailIcon from '@assets/icons/mail.png';
import lockIcon from '@assets/icons/lock.png';
import retypePwdIcon from '@assets/icons/retype-pwd.png';
import googleIcon from '@assets/icons/google.png';
import shieldValidIcon from '@assets/icons/shield-valid.png';
import mail3Icon from '@assets/icons/mail3.png';
import boxIcon from '@assets/icons/box.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import avatarImg from '@assets/images/w1.png';

const PREVIEW_BADGES = [
  { label: 'STUDENT', bg: '#EEF3FF', text: '#2F66C8', dot: '🎓' },
  { label: 'NEWCOMER', bg: '#DFFAF3', text: '#059669', dot: '✦' },
  { label: 'ENTREPRENEUR', bg: '#FFF5EC', text: '#E8812A', dot: '🚀' },
];

type StrengthInfo = { label: string; bars: number; barColors: string[] } | null;

function getStrength(pwd: string): StrengthInfo {
  if (!pwd) return null;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { label: 'Weak', bars: 1, barColors: ['#EF4444', '#E5E7EB', '#E5E7EB'] };
  if (score === 2) return { label: 'Fair', bars: 2, barColors: ['#F59E0B', '#F59E0B', '#E5E7EB'] };
  if (score === 3) return { label: 'Good', bars: 3, barColors: ['#EF4444', '#F59E0B', '#22C55E'] };
  return { label: 'Strong', bars: 3, barColors: ['#EF4444', '#F59E0B', '#16A34A'] };
}

function ProfileSummary() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-neutral-100 bg-[#FFF9EC]">
          <Image src={avatarImg} alt="avatar" fill className="object-cover" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-[#0F172A]">Jacob Sullivan</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {PREVIEW_BADGES.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[8px] font-bold"
                style={{ background: b.bg, color: b.text }}
              >
                {b.dot} {b.label}
              </span>
            ))}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-400">
            <Image src={locationPinIcon} alt="" width={9} height={9} className="opacity-50" />
            Toronto, Ontario, Canada
            <Image src={canadaFlagIcon} alt="🍁" width={13} height={9} className="rounded-sm object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesktopView() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const strength = getStrength(password);
  const passwordsMatch = password.length > 0 && confirmPwd === password;
  const canContinue = email.trim() !== '' && password.length >= 8 && passwordsMatch && terms;

  function handleContinue() {
    if (canContinue) router.push('/onboarding/verification');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={4} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-10">
        <div className="flex w-full gap-12">
          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="font-instrument-serif text-[46px] font-normal leading-[1.1] text-[#0F172A]">
              Create Your{' '}
              <span className="italic text-[#2F66C8]">Anchor</span>
              <span className="block">Account</span>
            </h1>
            <p className="mt-3 text-[13px] leading-relaxed text-[#8C97AD]">
              Your personalized opportunities are almost ready, secure your account to continue.
            </p>

            <div className="mt-8">
              <label className="block text-[13px] font-semibold text-[#0F172A]">
                Email Address <span className="text-[#E8242B]">*</span>
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <Image src={mailIcon} alt="" width={16} height={16} className="opacity-50" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your mail"
                  className="anchor-field anchor-field--icon-left"
                />
              </div>
              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-600">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#16A34A" strokeWidth="1.5" />
                  <path d="M4 6l1.5 1.5L8 4.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                We&apos;ll never share your email.
              </p>
            </div>

            <div className="mt-5">
              <label className="block text-[13px] font-semibold text-[#0F172A]">
                Create Password <span className="text-[#E8242B]">*</span>
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <Image src={lockIcon} alt="" width={16} height={16} className="opacity-50" />
                </span>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {strength && (
                <div className="mt-2">
                  <div className="flex items-center gap-1.5">
                    {strength.barColors.map((color, i) => (
                      <div key={i} className="h-1.5 flex-1 rounded-full transition-colors" style={{ backgroundColor: color }} />
                    ))}
                    <span className="ml-1 text-[11px] font-medium text-neutral-500">
                      Password Strength:{' '}
                      <span
                        style={{
                          color:
                            strength.label === 'Strong' ? '#16A34A' :
                            strength.label === 'Good' ? '#22C55E' :
                            strength.label === 'Fair' ? '#F59E0B' : '#EF4444',
                        }}
                      >
                        {strength.label}
                      </span>
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-400">
                    Use letters, numbers, and symbols for a stronger password.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5">
              <label className="block text-[13px] font-semibold text-[#0F172A]">
                Confirm Password <span className="text-[#E8242B]">*</span>
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <Image src={retypePwdIcon} alt="" width={16} height={16} className="opacity-50" />
                </span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  placeholder="Re-enter your password"
                  className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPwd.length > 0 && (
                <p className={`mt-1.5 flex items-center gap-1 text-[11px] font-medium ${passwordsMatch ? 'text-emerald-600' : 'text-red-500'}`}>
                  {passwordsMatch ? (
                    <>
                      <Check className="h-3 w-3" /> Password Match
                    </>
                  ) : (
                    <>
                      <span className="font-bold">✕</span> Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <label className="flex cursor-pointer items-start gap-3">
                <button
                  type="button"
                  onClick={() => setTerms(!terms)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    terms ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-neutral-300 bg-white'
                  }`}
                >
                  {terms && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </button>
                <span className="text-[13px] text-neutral-600">
                  I agree to the{' '}
                  <Link href="/terms" className="font-medium text-[#2F66C8] underline-offset-2 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-medium text-[#2F66C8] underline-offset-2 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    notifications ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-neutral-300 bg-white'
                  }`}
                >
                  {notifications && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </button>
                <span className="text-[13px] text-neutral-600">
                  Notify me about new opportunities, programs and updates.
                </span>
              </label>
            </div>

            <div className="relative my-6 flex items-center">
              <div className="flex-1 border-t border-neutral-200" />
              <span className="mx-4 text-[12px] text-neutral-400">Or continue with</span>
              <div className="flex-1 border-t border-neutral-200" />
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-neutral-200 bg-white px-4 py-2.5 text-[14px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <Image src={googleIcon} alt="Google" width={20} height={20} className="object-contain" />
              Google
            </button>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-neutral-100 bg-[#F8FAFF] px-4 py-3.5">
              <Image src={shieldValidIcon} alt="" width={32} height={32} className="shrink-0 object-contain" />
              <div>
                <p className="text-[13px] font-semibold text-[#0F172A]">Your security is our priority</p>
                <p className="mt-0.5 text-[11px] text-neutral-400">Your information is encrypted, secure and private.</p>
              </div>
            </div>
          </div>

          <div className="w-[360px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF3FF]">
                  <Image src={shieldValidIcon} alt="" width={32} height={32} className="object-contain" />
                </div>
                <h2 className="mt-3 text-[16px] font-bold leading-snug text-[#0F172A]">
                  Your Anchor Experience
                  <br />
                  is almost ready!
                </h2>
                <p className="mt-1 text-[12px] text-neutral-400">
                  Here&apos;s what&apos;s next after creating your account.
                </p>
              </div>

              <div className="mt-5">
                <ProfileSummary />
              </div>

              <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Next up:</p>
                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF]">
                      <Image src={mail3Icon} alt="" width={16} height={16} className="object-contain" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0F172A]">Email Verification</p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">Verify your email to activate your account</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF]">
                      <Image src={boxIcon} alt="" width={16} height={16} className="object-contain" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0F172A]">Access your Dashboard</p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">Discover opportunities tailored for you.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/profile"
        onContinue={handleContinue}
        continueDisabled={!canContinue}
        continueLabel="Create an Account"
        footer={<Footer />}
      />
    </div>
  );
}
