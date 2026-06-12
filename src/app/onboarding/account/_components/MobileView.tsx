'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { Footer } from './Footer';

import mailIcon from '@assets/icons/mail.png';
import lockIcon from '@assets/icons/lock.png';
import retypePwdIcon from '@assets/icons/retype-pwd.png';
import googleIcon from '@assets/icons/google.png';
import shieldValidIcon from '@assets/icons/shield-valid.png';

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

export default function MobileView() {
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

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={4} />
      </div>

      <main className="flex-1 px-5 pb-4 pt-8">
        <h1 className="font-instrument-serif text-[28px] font-normal leading-tight text-[#0F172A]">
          Create Your{' '}
          <span className="italic text-[#2F66C8]">Anchor</span>
          <span className="block">Account</span>
        </h1>
        <p className="mt-2.5 text-[12px] leading-relaxed text-[#8C97AD]">
          Your personalized opportunities are almost ready, secure your account to continue.
        </p>

        <div className="mt-6">
          <label className="block text-[13px] font-semibold text-[#0F172A]">
            Email Address <span className="text-[#E8242B]">*</span>
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={mailIcon} alt="" width={15} height={15} className="opacity-50" />
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
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
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
              <Image src={lockIcon} alt="" width={15} height={15} className="opacity-50" />
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
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {strength && (
            <div className="mt-2">
              <div className="flex items-center gap-1.5">
                {strength.barColors.map((color, i) => (
                  <div key={i} className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: color }} />
                ))}
                <span className="ml-1 text-[10px] font-medium text-neutral-500">
                  Strength:{' '}
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
              <p className="mt-1 text-[10px] text-neutral-400">Use letters, numbers, and symbols for a stronger password.</p>
            </div>
          )}
        </div>

        <div className="mt-5">
          <label className="block text-[13px] font-semibold text-[#0F172A]">
            Confirm Password <span className="text-[#E8242B]">*</span>
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={retypePwdIcon} alt="" width={15} height={15} className="opacity-50" />
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
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
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
                <>✕ Passwords do not match</>
              )}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3">
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
            <span className="text-[12px] text-neutral-600">
              I agree to the{' '}
              <Link href="/terms" className="font-medium text-[#2F66C8]">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-[#2F66C8]">
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
            <span className="text-[12px] text-neutral-600">
              Notify me about new opportunities, programs and updates.
            </span>
          </label>
        </div>

        <div className="relative my-5 flex items-center">
          <div className="flex-1 border-t border-neutral-200" />
          <span className="mx-4 text-[11px] text-neutral-400">Or continue with</span>
          <div className="flex-1 border-t border-neutral-200" />
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-neutral-200 bg-white px-4 py-2.5 text-[13px] font-medium text-neutral-700"
        >
          <Image src={googleIcon} alt="Google" width={18} height={18} className="object-contain" />
          Google
        </button>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-neutral-100 bg-[#F8FAFF] px-4 py-3">
          <Image src={shieldValidIcon} alt="" width={28} height={28} className="shrink-0 object-contain" />
          <div>
            <p className="text-[12px] font-semibold text-[#0F172A]">Your security is our priority</p>
            <p className="mt-0.5 text-[10px] text-neutral-400">Your information is encrypted, secure and private.</p>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-[#D9E1EF] bg-white px-5 pb-8 pt-4">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
              canContinue ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
            }`}
          >
            Create an Account <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/onboarding/profile"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
        <p className="mt-4 text-center text-[12px] text-[#8C97AD]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#2F66C8] underline-offset-2 hover:underline">
            Log In
          </Link>
        </p>
        <div className="mt-4">
          <Footer variant="mobile" />
        </div>
      </div>
    </div>
  );
}
