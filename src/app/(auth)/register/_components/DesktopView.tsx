'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ChevronRight, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

import mailIcon        from '@/../assets/icons/mail.png';
import lockIcon        from '@/../assets/icons/lock2.png';
import userIcon        from '@/../assets/icons/user.png';
import shieldIcon      from '@/../assets/icons/shield-check.png';
import googleIcon      from '@/../assets/icons/google.png';
import circleCheckIcon from '@/../assets/icons/circle-check.png';
import lightBulbIcon   from '@/../assets/icons/light-bulb.png';
import locationIcon    from '@/../assets/icons/location.png';
import canadaFlag      from '@/../assets/icons/canada-flag.png';
import scholarshipIcon from '@/../assets/icons/scholarship.png';
import heartIcon       from '@/../assets/icons/heart-handshake.png';
import flashIcon       from '@/../assets/icons/flash.png';
import cardBg          from '@/../assets/images/lp2.png';
import avatarImg       from '@/../assets/images/image3.png';

/* - Role options -- - */

const ROLES = [
  {
    value: 'individual',
    label: 'Individual',
    desc: 'Looking for jobs, grants & opportunities',
    iconBg: 'bg-[#EFF4FF]',
    iconColor: 'text-[#2F66C8]',
  },
  {
    value: 'business',
    label: 'Organization',
    desc: 'Post opportunities & find talent',
    iconBg: 'bg-[#ECFDF5]',
    iconColor: 'text-[#22C55E]',
  },
  {
    value: 'expert',
    label: 'Expert / Advisor',
    desc: 'Provide mentorship & consulting',
    iconBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#F97316]',
  },
] as const;

type Role = 'individual' | 'business' | 'expert';

/* - Password strength  - */

function getStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { label: '',       color: 'bg-neutral-200' },
    { label: 'Weak',   color: 'bg-red-400' },
    { label: 'Fair',   color: 'bg-amber-400' },
    { label: 'Good',   color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-[#22C55E]' },
  ];
  return { score, ...map[score] };
}

/* - Component -- - */

export default function RegisterDesktop() {
  const [step, setStep]             = useState<1 | 2>(1);
  const [role, setRole]             = useState<Role>('individual');
  const [firstName, setFirstName]   = useState('');
  const [lastName, setLastName]     = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd]       = useState(false);
  const [showCnf, setShowCnf]       = useState(false);
  const [agreed, setAgreed]         = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]           = useState('');

  const router  = useRouter();
  const setAuth = useAuthStore(s => s.setAuth);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const strength   = getStrength(password);
  const pwdMatch   = password === confirmPwd && confirmPwd.length > 0;

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !emailValid) return;
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!agreed) { setError('Please accept the terms to continue.'); return; }
    if (!pwdMatch) { setError('Passwords do not match.'); return; }
    if (strength.score < 2) { setError('Please choose a stronger password.'); return; }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setAuth(
      { id: `user-${Date.now()}`, name: `${firstName} ${lastName}`, email, role },
      `token-${Date.now()}`
    );
    router.push('/onboarding');
  }

  return (
    <div className="w-full max-w-[1548px] mx-auto flex gap-10 items-start">
      {/* -- Left column -- */}
      <div className="flex flex-col gap-8 w-full max-w-[860px]">

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="leading-none">
            <span className="block font-serif text-[56px] leading-[1.1] text-[#0F172A]">Create your</span>
            <span className="block font-serif italic text-[68px] leading-[1.1] text-[#2F66C8]">Account ✨</span>
          </h1>
          <p className="text-base text-[#8C97AD] mt-2">Join thousands of Canadians unlocking new opportunities.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                step >= s ? 'bg-[#2F66C8] text-white' : 'bg-[#EEF2F8] text-[#8C97AD]'
              }`}>
                {step > s ? <Check className="h-3.5 w-3.5" /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? 'text-[#0F172A]' : 'text-[#8C97AD]'}`}>
                {s === 1 ? 'Your Info' : 'Password & Role'}
              </span>
              {s < 2 && <div className="w-12 h-px bg-[#D9E1EF]" />}
            </div>
          ))}
        </div>

        {/* -- STEP 1 -- */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="flex flex-col gap-5">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'First Name', value: firstName, set: setFirstName, ph: 'First name' },
                { label: 'Last Name',  value: lastName,  set: setLastName,  ph: 'Last name'  },
              ].map(({ label, value, set, ph }) => (
                <div key={label} className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0F172A]">{label} *</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Image src={userIcon} alt="" width={17} height={17} className="opacity-40" />
                    </div>
                    <input
                      value={value}
                      onChange={e => set(e.target.value)}
                      placeholder={ph}
                      required
                      className="anchor-field anchor-field--icon-left"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0F172A]">Email Address *</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={mailIcon} alt="" width={18} height={18} className="opacity-50" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                  autoComplete="email"
                />
                {emailValid && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image src={circleCheckIcon} alt="valid" width={18} height={18} />
                  </div>
                )}
              </div>
            </div>

            {/* Google sign up */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#D9E1EF]" />
              <span className="text-xs text-[#8C97AD] whitespace-nowrap">Or sign up with</span>
              <div className="flex-1 h-px bg-[#D9E1EF]" />
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full h-12 rounded-2xl border border-[#D9E1EF] bg-white hover:bg-[#F8FAFC] transition-colors text-sm font-medium text-[#0F172A] shadow-xs"
            >
              <Image src={googleIcon} alt="" width={20} height={20} />
              Continue with Google
            </button>

            {/* Nav */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border border-[#D9E1EF] bg-white hover:bg-[#F8FAFC] transition-colors text-sm font-medium text-[#0F172A] shadow-xs"
              >
                Already have an account?
              </Link>
              <button
                type="submit"
                disabled={!firstName || !lastName || !emailValid}
                className="flex-1 flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-[#2F66C8] hover:bg-[#2454A4] transition-colors text-sm font-semibold text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* -- STEP 2 -- */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Role selection */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0F172A]">I am a… *</label>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex flex-col gap-2 p-4 rounded-2xl border-2 text-left transition-all ${
                      role === r.value
                        ? 'border-[#2F66C8] bg-[#EFF4FF]'
                        : 'border-[#D9E1EF] bg-white hover:border-[#2F66C8]/40'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${r.iconBg}`}>
                      <span className={`text-xl ${r.iconColor}`}>
                        {r.value === 'individual' ? '👤' : r.value === 'business' ? '🏢' : '🎓'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{r.label}</p>
                      <p className="text-xs text-[#8C97AD] mt-0.5 leading-tight">{r.desc}</p>
                    </div>
                    {role === r.value && (
                      <div className="absolute top-3 right-3">
                        <Check className="h-4 w-4 text-[#2F66C8]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0F172A]">Password *</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={lockIcon} alt="" width={18} height={18} className="opacity-50" />
                </div>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="anchor-field anchor-field--icon-left anchor-field--icon-right"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C97AD] hover:text-[#44516A] transition-colors"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          strength.score >= i ? strength.color : 'bg-[#EEF2F8]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${strength.score >= 3 ? 'text-[#22C55E]' : strength.score >= 2 ? 'text-amber-500' : 'text-red-500'}`}>
                    {strength.label}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                {[
                  { check: password.length >= 8,          label: '8+ characters' },
                  { check: /[A-Z]/.test(password),        label: 'Uppercase letter' },
                  { check: /[0-9]/.test(password),        label: 'Number' },
                  { check: /[^A-Za-z0-9]/.test(password), label: 'Special character' },
                ].map(({ check, label }) => (
                  <span key={label} className={`flex items-center gap-1 text-xs ${check ? 'text-[#22C55E]' : 'text-[#8C97AD]'}`}>
                    <Check className={`h-3 w-3 ${check ? 'opacity-100' : 'opacity-30'}`} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0F172A]">Confirm Password *</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={lockIcon} alt="" width={18} height={18} className="opacity-50" />
                </div>
                <input
                  type={showCnf ? 'text' : 'password'}
                  value={confirmPwd}
                  onChange={e => setConfirmPwd(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className={`anchor-field anchor-field--icon-left anchor-field--icon-right ${
                    confirmPwd && !pwdMatch ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCnf(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C97AD] hover:text-[#44516A] transition-colors"
                >
                  {showCnf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPwd && !pwdMatch && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}
              {pwdMatch && (
                <p className="flex items-center gap-1 text-xs text-[#22C55E]">
                  <Check className="h-3 w-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex-shrink-0 mt-0.5">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="sr-only" />
                <div
                  onClick={() => setAgreed(v => !v)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    agreed ? 'bg-[#2F66C8] border-[#2F66C8]' : 'bg-white border-[#D9E1EF]'
                  }`}
                >
                  {agreed && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm text-[#44516A]">
                I agree to the{' '}
                <Link href="/terms" className="text-[#2F66C8] hover:underline font-medium">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#2F66C8] hover:underline font-medium">Privacy Policy</Link>
              </span>
            </label>

            {/* Security card */}
            <div className="flex items-start gap-4 rounded-2xl border border-[#EEF2F8] bg-[#EFF4FF] p-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white">
                <Image src={shieldIcon} alt="" width={22} height={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Your data is safe with us.</p>
                <p className="text-xs text-[#8C97AD]">We use industry-standard encryption to protect your account. We never share your personal information.</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                {error}
              </div>
            )}

            {/* Nav */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border border-[#D9E1EF] bg-white hover:bg-[#F8FAFC] transition-colors text-sm font-medium text-[#0F172A] shadow-xs"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !agreed || !pwdMatch || strength.score < 2}
                className="flex-1 flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-[#2F66C8] hover:bg-[#2454A4] transition-colors text-sm font-semibold text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/></svg>
                ) : (
                  <>Create Account <ChevronRight className="h-4 w-4" /></>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Info banner */}
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC] p-4">
          <div className="flex items-center gap-3">
            <Image src={lightBulbIcon} alt="" width={20} height={20} className="flex-shrink-0 opacity-70" />
            <span className="text-xs text-[#8C97AD]">Your profile will be set up after creating your account — it only takes 2 minutes!</span>
          </div>
          <Link href="/login" className="flex items-center gap-1 text-xs font-semibold text-[#2F66C8] hover:underline whitespace-nowrap">
            Sign In
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* -- Right column: preview card -- */}
      <div className="flex-1 hidden xl:block">
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <div className="relative w-full h-[540px]">
            <Image src={cardBg} alt="Platform preview" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/65" />
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              {/* Top */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/40">
                  <Image src={avatarImg} alt="User" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold text-base">Welcome to Anchor Canada</p>
                  <p className="text-white/70 text-xs">Your opportunity hub</p>
                </div>
              </div>
              {/* Middle highlights */}
              <div className="flex flex-col gap-2">
                {[
                  { icon: scholarshipIcon, label: 'Scholarships & Grants', count: '500+', color: 'text-blue-300' },
                  { icon: heartIcon,       label: 'Community programs',    count: '200+', color: 'text-emerald-300' },
                  { icon: flashIcon,       label: 'New opportunities',     count: 'Daily', color: 'text-amber-300' },
                ].map(({ icon, label, count, color }) => (
                  <div key={label} className="flex items-center justify-between rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image src={icon} alt="" width={18} height={18} className="opacity-90" />
                      <span className="text-white text-sm font-medium">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${color}`}>{count}</span>
                      <ChevronRight className="h-4 w-4 text-white/60" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Bottom */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={locationIcon} alt="" width={16} height={16} className="opacity-80" />
                  <span className="text-white/80 text-xs">Serving all of Canada</span>
                </div>
                <Image src={canadaFlag} alt="Canada" width={24} height={16} className="rounded-sm opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
