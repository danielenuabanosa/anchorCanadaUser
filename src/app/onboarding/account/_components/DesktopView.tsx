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
import { AccountExperiencePanel } from './AccountExperiencePanel';

import mailIcon from '@assets/icons/mail.png';
import lockIcon from '@assets/icons/lock.png';
import retypePwdIcon from '@assets/icons/retype-pwd.png';
import googleIcon from '@assets/icons/google.png';

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

function strengthColor(label: string) {
  if (label === 'Strong') return '#16A34A';
  if (label === 'Good') return '#22C55E';
  if (label === 'Fair') return '#F59E0B';
  return '#EF4444';
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

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-20">
        <div className="flex w-full items-start gap-12">
          <div className="flex w-[886px] max-w-[886px] flex-1 flex-col">
            <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
              Create Your{' '}
              <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">
                Anchor
              </span>
              <span className="block font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
                Account
              </span>
            </h1>
            <p className="mt-3 font-sans text-[16px] font-normal leading-[100%] text-[#8C97AD]">
              Your personalized opportunities are almost ready, secure your account to continue.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              <div>
                <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                  Email Address{' '}
                  <span className="font-sans text-[16px] font-normal leading-[180%] text-[#EF4444]">*</span>
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
                    className="anchor-field anchor-field--icon-left h-[53px]"
                  />
                </div>
                <p className="mt-1.5 flex items-center gap-1 font-sans text-[11px] text-[#16A34A]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="5" stroke="#16A34A" strokeWidth="1.5" />
                    <path
                      d="M4 6l1.5 1.5L8 4.5"
                      stroke="#16A34A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  We&apos;ll never share your email.
                </p>
              </div>

              <div>
                <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                  Create Password{' '}
                  <span className="font-sans text-[16px] font-normal leading-[180%] text-[#EF4444]">*</span>
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
                    className="anchor-field anchor-field--icon-left anchor-field--icon-right h-[53px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C97AD] hover:text-[#44516A]"
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {strength && (
                  <div className="mt-2">
                    <div className="flex items-center gap-1.5">
                      {strength.barColors.map((color, i) => (
                        <div
                          key={i}
                          className="h-1.5 flex-1 rounded-full transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <span className="ml-1 font-sans text-[11px] font-medium text-[#8C97AD]">
                        Password Strength:{' '}
                        <span style={{ color: strengthColor(strength.label) }}>{strength.label}</span>
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-[11px] text-[#8C97AD]">
                      Use letters, numbers, and symbols for a stronger password.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                  Confirm Password{' '}
                  <span className="font-sans text-[16px] font-normal leading-[180%] text-[#EF4444]">*</span>
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
                    className="anchor-field anchor-field--icon-left anchor-field--icon-right h-[53px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C97AD] hover:text-[#44516A]"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPwd.length > 0 && (
                  <p
                    className={`mt-1.5 flex items-center gap-1 font-sans text-[11px] font-medium ${
                      passwordsMatch ? 'text-[#16A34A]' : 'text-[#EF4444]'
                    }`}
                  >
                    {passwordsMatch ? (
                      <>
                        <Check className="h-3 w-3" /> Password Match
                      </>
                    ) : (
                      <>Passwords do not match</>
                    )}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setTerms(!terms)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      terms ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
                    }`}
                  >
                    {terms && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </button>
                  <span className="font-sans text-[16px] font-medium leading-[100%] text-[#44516A]">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#2F66C8] hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-[#2F66C8] hover:underline">
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
                      notifications ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
                    }`}
                  >
                    {notifications && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </button>
                  <span className="font-sans text-[16px] font-normal leading-[100%] text-[#44516A]">
                    Notify me about new opportunities, programs and updates.
                  </span>
                </label>
              </div>

              <div className="relative flex items-center">
                <div className="flex-1 border-t border-[#D9E1EF]" />
                <span className="mx-4 font-sans text-[16px] font-normal leading-[100%] text-[#44516A]">
                  Or continue with
                </span>
                <div className="flex-1 border-t border-[#D9E1EF]" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-sm border border-[#D9E1EF] bg-white px-4 py-3 font-sans text-[16px] font-medium leading-[100%] text-[#0F172A] transition-colors hover:bg-[#F8FAFC] h-[56.6px]"
              >
                <Image src={googleIcon} alt="Google" width={20} height={20} className="object-contain" />
                Google
              </button>
                  
              <div className="flex items-center gap-4 rounded-sm border border-[#D9E1EF] bg-[#F8FAFC] px-5 py-4 h-[108px]">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF]">
                  <Image src={lockIcon} alt="" width={34} height={34} className="object-contain" />
                </div>
                <div>
                  <p className="font-sans text-[18px] font-semibold leading-[100%] text-[#0F172A]"> 
                    Your security is our priority
                  </p>
                  <p className="mt-1 font-sans text-[16px] font-normal leading-[100%] text-[#44516A]">
                    Your information is encrypted, secure and private.
                  </p>
                </div>
              </div>
                    
            </div>
          </div>

          <div className="w-[622px] shrink-0">
            <div className="sticky top-24">
              <AccountExperiencePanel />
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
