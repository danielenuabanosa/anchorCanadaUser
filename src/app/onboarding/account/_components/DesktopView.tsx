'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Check } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { Footer } from './Footer';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';

import mailIcon from '@assets/icons/mail.png';
import lockIcon from '@assets/icons/lock.png';
import googleIcon from '@assets/icons/google.png';
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

function strengthColor(label: string) {
  if (label === 'Strong') return '#16A34A';
  if (label === 'Good') return '#22C55E';
  if (label === 'Fair') return '#F59E0B';
  return '#EF4444';
}

export default function DesktopView() {
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={5} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-20">
        <div className="mx-auto flex w-full max-w-[886px] flex-col">
            <h1 className="type-page-title">
              Create Your <span className="type-page-accent">Anchor</span>
              <span className="block type-page-title">Account</span>
            </h1>
            <p className="mt-3 type-subtitle">
              Your provider workspace is almost ready. Secure your account to continue.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              ) : null}

              <div>
                <label className="block type-label">
                  Organization Email <span className="text-[14px] text-[#EF4444]">*</span>
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <Image src={mailIcon} alt="" width={16} height={16} className="opacity-50" />
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

              <div>
                <label className="block type-label">
                  Organization Name <span className="text-[14px] text-[#EF4444]">*</span>
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <Image src={briefcaseIcon} alt="" width={16} height={16} className="opacity-50" />
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

              <div>
                <label className="block type-label">
                  Create Password <span className="text-[14px] text-[#EF4444]">*</span>
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C97AD] hover:text-[#44516A]"
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {strength ? (
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
                ) : null}
              </div>

              <div>
                <label className="block type-label">
                  Confirm Password <span className="text-[14px] text-[#EF4444]">*</span>
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <Image src={lockIcon} alt="" width={16} height={16} className="opacity-50" />
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C97AD] hover:text-[#44516A]"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPwd.length > 0 ? (
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
                ) : null}
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
                    {terms ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
                  </button>
                  <span className="type-body font-medium">
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
                    {notifications ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
                  </button>
                  <span className="type-body">Notify me about applications, programs and updates.</span>
                </label>
              </div>

              <div className="relative flex items-center">
                <div className="flex-1 border-t border-[#D9E1EF]" />
                <span className="mx-4 type-body">Or continue with</span>
                <div className="flex-1 border-t border-[#D9E1EF]" />
              </div>

              <button
                type="button"
                className="flex h-[56.6px] w-full items-center justify-center gap-3 rounded-sm border border-[#D9E1EF] bg-white px-4 py-3 type-label transition-colors hover:bg-[#F8FAFC]"
              >
                <Image src={googleIcon} alt="Google" width={20} height={20} className="object-contain" />
                Google
              </button>

              <div className="flex h-[108px] items-center gap-4 rounded-sm border border-[#D9E1EF] bg-[#F8FAFC] px-5 py-4">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#EFF4FF]">
                  <Image src={lockIcon} alt="" width={34} height={34} className="object-contain" />
                </div>
                <div>
                  <p className="type-section-title font-semibold">Your security is our priority</p>
                  <p className="mt-1 type-body">Your information is encrypted, secure and private.</p>
                </div>
              </div>
            </div>
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/verification"
        onContinue={handleContinue}
        continueDisabled={!canContinue || isSubmitting}
        continueLabel={token ? 'Continue' : isSubmitting ? 'Creating account…' : 'Create an Account'}
        footer={<Footer />}
      />
    </div>
  );
}
