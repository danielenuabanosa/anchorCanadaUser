'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { Footer } from './Footer';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';

import mailIcon from '@assets/icons/mail.png';
import lockIcon from '@assets/icons/lock.png';
import googleIcon from '@assets/icons/google.png';
import shieldValidIcon from '@assets/icons/shield-valid.png';
import briefcaseIcon from '@assets/icons/briefcase2.png';

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
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const storedEmail = useProviderOnboardingStore((s) => s.organizationEmail);
  const storedName = useProviderOnboardingStore((s) => s.organizationName);
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  const [email, setEmail] = useState(storedEmail);
  const [orgName, setOrgName] = useState(storedName);
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (storedEmail) setEmail(storedEmail);
    if (storedName) setOrgName(storedName);
  }, [storedEmail, storedName]);

  const strength = getStrength(password);
  const passwordsMatch = password.length > 0 && confirmPwd === password;
  const canContinue =
    Boolean(token) ||
    (email.trim() !== '' && orgName.trim() !== '' && password.length >= 8 && passwordsMatch && terms);

  async function handleContinue() {
    if (!canContinue || isSubmitting) return;
    if (token) {
      setOnboardingData({
        verificationEmail: email.trim().toLowerCase(),
        organizationEmail: email.trim().toLowerCase(),
        organizationName: orgName.trim(),
      });
      router.push('/onboarding/activation');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const name = orgName.trim() || normalizedEmail.split('@')[0] || 'Provider';
      setOnboardingData({
        verificationEmail: normalizedEmail,
        organizationEmail: normalizedEmail,
        organizationName: orgName.trim(),
      });

      const result = await authService.register({
        name,
        email: email.trim(),
        password,
        role: 'provider',
      });

      if ('requiresEmailConfirmation' in result) {
        sessionStorage.setItem('provider_signup_email', result.email);
        sessionStorage.setItem('provider_signup_next', '/onboarding/org-ready');
        router.push('/onboarding/activation');
        return;
      }

      setAuth(result.user, result.token, result.refreshToken);
      await saveOnboardingDraft('account').catch(() => undefined);
      router.push('/onboarding/activation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-5 pb-3 pt-4">
        <StepProgress current={5} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] px-5 pb-4 pt-8">
        <h2 className="text-center font-serif text-[45px] font-normal leading-[56px] text-[#0F172A]">
          Create Your <span className="type-page-accent-mobile">Anchor</span>
          <span className="block type-page-title-mobile text-center">Account</span>
        </h2>
        <p className="mt-2.5 text-center font-sans text-[14px] font-normal leading-normal text-[#8C97AD]">
          Your provider workspace is almost ready. Secure your account to continue.
        </p>

        <div className="mt-6">
          {error ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          ) : null}

          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">
            Organization Email{' '}
            <span className="font-sans text-[14px] font-normal leading-[180%] text-[#EF4444]">*</span>
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={mailIcon} alt="" width={15} height={15} className="opacity-50" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@yourorganization.ca"
              className="anchor-field anchor-field--icon-left"
            />
          </div>
          <p className="mt-1.5 flex items-center gap-1 font-sans text-[11px] text-[#16A34A]">
            We&apos;ll never share your email.
          </p>
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">
            Organization Name{' '}
            <span className="font-sans text-[14px] font-normal leading-[180%] text-[#EF4444]">*</span>
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={briefcaseIcon} alt="" width={15} height={15} className="opacity-50" />
            </span>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Enter organization name"
              className="anchor-field anchor-field--icon-left"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">
            Create Password <span className="font-sans text-[14px] font-normal leading-[180%] text-[#EF4444]">*</span>
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
          {strength ? (
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
                        strength.label === 'Strong'
                          ? '#16A34A'
                          : strength.label === 'Good'
                            ? '#22C55E'
                            : strength.label === 'Fair'
                              ? '#F59E0B'
                              : '#EF4444',
                    }}
                  >
                    {strength.label}
                  </span>
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">
            Confirm Password <span className="font-sans text-[14px] font-normal leading-[180%] text-[#EF4444]">*</span>
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={lockIcon} alt="" width={15} height={15} className="opacity-50" />
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
          {confirmPwd.length > 0 ? (
            <p
              className={`mt-1.5 flex items-center gap-1 text-[11px] font-medium ${
                passwordsMatch ? 'text-emerald-600' : 'text-red-500'
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
          ) : null}
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
              {terms ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
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
              {notifications ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
            </button>
            <span className="text-[12px] text-neutral-600">Notify me about applications, programs and updates.</span>
          </label>
        </div>

        <div className="relative my-5 flex items-center">
          <div className="flex-1 border-t border-[#D9E1EF]" />
          <span className="mx-4 font-sans text-[11px] text-[#44516A]">Or continue with</span>
          <div className="flex-1 border-t border-[#D9E1EF]" />
        </div>
        <button
          type="button"
          className="flex h-[58.56px] w-full items-center justify-center gap-3 rounded-sm border border-[#D9E1EF] bg-white px-4 py-2.5 font-sans text-[13px] font-medium text-[#0F172A]"
        >
          <Image src={googleIcon} alt="Google" width={18} height={18} className="object-contain" />
          Google
        </button>

        <div className="mt-4 flex h-[101.6px] items-center gap-3 rounded-2xl border border-[#D9E1EF] bg-[#F8FAFC] px-4 py-3">
          <Image src={shieldValidIcon} alt="" width={28} height={28} className="shrink-0 object-contain" />
          <div>
            <p className="font-sans text-[12px] font-semibold text-[#0F172A]">Your security is our priority</p>
            <p className="mt-0.5 font-sans text-[10px] text-[#44516A]">Your information is encrypted, secure and private.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pb-8 pt-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue || isSubmitting}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
                canContinue && !isSubmitting ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              {token ? 'Continue' : isSubmitting ? 'Creating account…' : 'Create an Account'} <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding/verification"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>
          <p className="mt-4 text-center font-sans text-[12px] text-[#8C97AD]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#2F66C8] underline-offset-2 hover:underline">
              Log In
            </Link>
          </p>
          <div className="mt-4">
            <Footer variant="mobile" />
          </div>
        </div>
      </main>
    </div>
  );
}
