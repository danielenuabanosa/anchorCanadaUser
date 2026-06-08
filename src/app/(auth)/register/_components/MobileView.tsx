'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ChevronRight, Check, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

import mailIcon        from '@/../assets/icons/mail.png';
import lockIcon        from '@/../assets/icons/lock2.png';
import userIcon        from '@/../assets/icons/user.png';
import shieldIcon      from '@/../assets/icons/shield-check.png';
import googleIcon      from '@/../assets/icons/google.png';
import circleCheckIcon from '@/../assets/icons/circle-check.png';

type Role = 'individual' | 'business' | 'expert';

function getStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 8)          score++;
  if (/[A-Z]/.test(pwd))        score++;
  if (/[0-9]/.test(pwd))        score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const colors = ['bg-[#EEF2F8]', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-[#22C55E]'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, color: colors[score], label: labels[score] };
}

export default function RegisterMobile() {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
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
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      {/* Progress bar */}
      <div className="h-1 bg-[#EEF2F8] w-full">
        <div
          className="h-full bg-[#2F66C8] transition-all duration-500"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>

      <div className="flex-1 flex flex-col px-5 pt-6 pb-8 gap-6">
        {/* Back + step */}
        <div className="flex items-center justify-between">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-[#44516A]">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs text-[#8C97AD]">Step {step} of 2</span>
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-serif text-[38px] leading-[1.1] text-[#0F172A]">
            {step === 1 ? 'Create your' : 'Almost'}
          </h1>
          <p className="font-serif italic text-[46px] leading-[1.1] text-[#2F66C8]">
            {step === 1 ? 'Account ✨' : 'There! 🎉'}
          </p>
          <p className="text-sm text-[#8C97AD] mt-2">
            {step === 1
              ? 'Join thousands of Canadians unlocking opportunities.'
              : 'Set your password and role to finish up.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {step === 1 ? (
            <>
              {/* First name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">First Name *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image src={userIcon} alt="" width={16} height={16} className="opacity-40" />
                  </div>
                  <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                    className="anchor-field pl-11"
                  />
                </div>
              </div>
              {/* Last name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Last Name *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image src={userIcon} alt="" width={16} height={16} className="opacity-40" />
                  </div>
                  <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                    className="anchor-field pl-11"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Email Address *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image src={mailIcon} alt="" width={17} height={17} className="opacity-50" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="anchor-field pl-11 pr-11"
                  />
                  {emailValid && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Image src={circleCheckIcon} alt="" width={17} height={17} />
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#D9E1EF]" />
                <span className="text-xs text-[#8C97AD]">Or sign up with</span>
                <div className="flex-1 h-px bg-[#D9E1EF]" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="flex items-center justify-center gap-3 h-12 rounded-2xl border border-[#D9E1EF] bg-white text-sm font-medium text-[#0F172A]"
              >
                <Image src={googleIcon} alt="" width={20} height={20} />
                Continue with Google
              </button>
            </>
          ) : (
            <>
              {/* Role */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0F172A]">I am a… *</label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: 'individual', label: 'Individual',     desc: 'Looking for jobs, grants & opportunities', emoji: '👤' },
                    { value: 'business',   label: 'Organization',   desc: 'Post opportunities & find talent',          emoji: '🏢' },
                    { value: 'expert',     label: 'Expert/Advisor', desc: 'Provide mentorship & consulting',           emoji: '🎓' },
                  ].map(r => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value as Role)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all ${
                        role === r.value
                          ? 'border-[#2F66C8] bg-[#EFF4FF]'
                          : 'border-[#D9E1EF] bg-white'
                      }`}
                    >
                      <span className="text-2xl shrink-0">{r.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0F172A]">{r.label}</p>
                        <p className="text-xs text-[#8C97AD] truncate">{r.desc}</p>
                      </div>
                      {role === r.value && <Check className="h-4 w-4 text-[#2F66C8] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Password *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image src={lockIcon} alt="" width={17} height={17} className="opacity-50" />
                  </div>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="anchor-field pl-11 pr-11"
                  />
                  <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C97AD]">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex gap-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`flex-1 h-1 rounded-full ${strength.score >= i ? strength.color : 'bg-[#EEF2F8]'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[#44516A]">{strength.label}</span>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Confirm Password *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image src={lockIcon} alt="" width={17} height={17} className="opacity-50" />
                  </div>
                  <input
                    type={showCnf ? 'text' : 'password'}
                    value={confirmPwd}
                    onChange={e => setConfirmPwd(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className={`anchor-field pl-11 pr-11 ${confirmPwd && !pwdMatch ? 'border-red-400' : ''}`}
                  />
                  <button type="button" onClick={() => setShowCnf(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C97AD]">
                    {showCnf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPwd && !pwdMatch && <p className="text-xs text-red-500">Passwords don&apos;t match</p>}
                {pwdMatch && <p className="flex items-center gap-1 text-xs text-[#22C55E]"><Check className="h-3 w-3" /> Passwords match</p>}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreed(v => !v)}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${agreed ? 'bg-[#2F66C8] border-[#2F66C8]' : 'bg-white border-[#D9E1EF]'}`}
                >
                  {agreed && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-[#44516A]">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#2F66C8] font-medium">Terms</Link>
                  {' '}&amp;{' '}
                  <Link href="/privacy" className="text-[#2F66C8] font-medium">Privacy Policy</Link>
                </span>
              </label>

              {/* Security */}
              <div className="flex items-start gap-3 rounded-2xl border border-[#EEF2F8] bg-[#EFF4FF] p-3">
                <Image src={shieldIcon} alt="" width={20} height={20} className="shrink-0 mt-0.5" />
                <p className="text-xs text-[#44516A]">Your data is protected with industry-standard encryption.</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  {error}
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <button
            type="submit"
            disabled={
              (step === 1 && (!firstName || !lastName || !emailValid)) ||
              (step === 2 && (isSubmitting || !agreed || !pwdMatch || strength.score < 2))
            }
            className="flex items-center justify-center gap-2 h-13 rounded-2xl bg-[#2F66C8] hover:bg-[#2454A4] text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1 py-3.5"
          >
            {isSubmitting ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/></svg>
            ) : (
              <>{step === 1 ? 'Continue' : 'Create Account'} <ChevronRight className="h-4 w-4" /></>
            )}
          </button>

          <p className="text-center text-sm text-[#8C97AD]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#2F66C8] font-semibold">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
