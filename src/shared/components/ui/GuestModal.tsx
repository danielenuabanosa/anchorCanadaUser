'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Lock, Bookmark, Send, FileText, ShieldCheck, User } from 'lucide-react';

/* - useGuestModal hook ----------------- */

export function useGuestModal() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}

/* - Props - - */

export interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* - Feature bullets  - */

const FEATURES = [
  {
    icon: Bookmark,
    iconBg: 'bg-[#EFF4FF]',
    iconColor: 'text-[#2f66c8]',
    label: 'Save opportunities',
    desc: 'Keep track of opportunities you\'re interested in.',
  },
  {
    icon: Send,
    iconBg: 'bg-[#ECFDF5]',
    iconColor: 'text-[#22C55E]',
    label: 'Apply with ease',
    desc: 'Submit applications quickly and securely.',
  },
  {
    icon: FileText,
    iconBg: 'bg-[#FEF9C3]',
    iconColor: 'text-amber-500',
    label: 'Track your progress',
    desc: 'Monitor your applications and stay updated.',
  },
] as const;

/* - Icon Cluster Illustration ---------------- */

function IconCluster({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const isLg = size === 'lg';
  return (
    <div className={`relative flex items-center justify-center ${isLg ? 'h-48 w-full' : 'h-36 w-full'}`}>
      {/* Outer ring */}
      <div
        className={`absolute rounded-full bg-[#EFF4FF]/60 ${isLg ? 'h-40 w-40' : 'h-32 w-32'}`}
      />
      {/* Inner ring */}
      <div
        className={`absolute rounded-full bg-[#EFF4FF]/40 ${isLg ? 'h-28 w-28' : 'h-24 w-24'}`}
      />
      {/* Center lock */}
      <div className={`relative z-10 flex items-center justify-center rounded-2xl bg-[#2f66c8] shadow-md ${isLg ? 'h-14 w-14' : 'h-11 w-11'}`}>
        <Lock className={`text-white ${isLg ? 'h-7 w-7' : 'h-5 w-5'}`} />
      </div>
      {/* Bookmark – top right */}
      <div className={`absolute z-20 flex items-center justify-center rounded-full bg-rose-100 shadow-sm border-2 border-white ${isLg ? 'top-3 right-[calc(50%-56px)] h-10 w-10' : 'top-4 right-[calc(50%-44px)] h-8 w-8'}`}>
        <Bookmark className={`text-rose-500 ${isLg ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
      </div>
      {/* Document – left */}
      <div className={`absolute z-20 flex items-center justify-center rounded-xl bg-amber-50 shadow-sm border border-amber-100 ${isLg ? 'left-[calc(50%-72px)] bottom-6 h-10 w-10' : 'left-[calc(50%-52px)] bottom-4 h-8 w-8'}`}>
        <FileText className={`text-amber-500 ${isLg ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
      </div>
      {/* Send – bottom right */}
      <div className={`absolute z-20 flex items-center justify-center rounded-full bg-emerald-50 shadow-sm border border-emerald-100 ${isLg ? 'right-[calc(50%-60px)] bottom-4 h-9 w-9' : 'right-[calc(50%-48px)] bottom-2 h-7 w-7'}`}>
        <Send className={`text-emerald-500 ${isLg ? 'h-4 w-4' : 'h-3 w-3'}`} />
      </div>
    </div>
  );
}

/* - Auth buttons (shared between desktop right panel and mobile) ---- */

function AuthButtons({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Create account CTA */}
      <Link
        href="/register"
        onClick={onClose}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f66c8] py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#2558b0]"
      >
        <User className="h-4 w-4" />
        Create an account
      </Link>

      {/* Log in CTA */}
      <Link
        href="/login"
        onClick={onClose}
        className="mb-5 flex w-full items-center justify-center rounded-xl border border-[#D9E1EF] bg-white py-3 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]"
      >
        Log in to your account
      </Link>

      {/* Divider */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D9E1EF]" />
        <span className="text-xs text-[#8C97AD]">Or continue with</span>
        <div className="h-px flex-1 bg-[#D9E1EF]" />
      </div>

      {/* OAuth buttons */}
      <div className="space-y-2.5">
        {/* Google */}
        <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]">
          <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>

        {/* Apple */}
        <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]">
          <svg className="h-[18px] w-[18px] shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
          Apple
        </button>

        {/* Microsoft */}
        <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition hover:bg-[#F8FAFC]">
          <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#f25022" d="M1 1h10v10H1z" />
            <path fill="#00a4ef" d="M13 1h10v10H13z" />
            <path fill="#7fba00" d="M1 13h10v10H1z" />
            <path fill="#ffb900" d="M13 13h10v10H13z" />
          </svg>
          Microsoft
        </button>
      </div>

      {/* Terms */}
      <p className="mt-5 text-center text-[11px] leading-relaxed text-[#8C97AD]">
        By continuing you agree to the{' '}
        <Link href="/terms" className="text-[#2f66c8] hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-[#2f66c8] hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
}

/* - GuestModal  - */

export function GuestModal({ isOpen, onClose }: GuestModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* -- DESKTOP modal (md+) -- */}
      <div className="relative z-10 hidden md:flex w-full max-w-[840px] overflow-hidden rounded-2xl bg-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08)]">

        {/* Left panel */}
        <div className="flex flex-[1.1] flex-col justify-between p-10">
          {/* Illustration */}
          <IconCluster size="lg" />

          {/* Heading */}
          <div className="mt-2">
            <h2
              id="guest-modal-title"
              className="mb-3 text-2xl font-semibold leading-snug text-[#0F172A]"
            >
              Create an account to{' '}
              <em className="not-italic font-['Instrument_Serif'] italic text-[#2f66c8]">
                Unlock
              </em>{' '}
              this action
            </h2>
            <p className="mb-7 text-sm leading-relaxed text-[#44516A]">
              Join Anchor Canada to save opportunities, apply, and track your
              applications, all in one place.
            </p>

            {/* Features */}
            <ul className="space-y-4">
              {FEATURES.map(({ icon: Icon, iconBg, iconColor, label, desc }) => (
                <li key={label} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{label}</p>
                    <p className="text-xs text-[#8C97AD]">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy note */}
          <div className="mt-8 flex items-center gap-2 text-xs text-[#8C97AD]">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Your data is secure with us. We respect your privacy and never share your information.</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex w-[320px] shrink-0 flex-col border-l border-[#EEF2F8] p-10">
          <h3 className="mb-1 text-lg font-semibold text-[#0F172A]">
            Sign up or log in to continue
          </h3>
          <p className="mb-7 text-sm text-[#8C97AD]">It only takes a minute</p>

          <AuthButtons onClose={onClose} />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#8C97AD] transition hover:bg-[#EEF2F8] hover:text-[#0F172A]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* -- MOBILE modal -- */}
      <div className="relative z-10 flex md:hidden w-full max-w-[440px] flex-col overflow-y-auto rounded-2xl bg-white shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#8C97AD] transition hover:bg-[#EEF2F8] hover:text-[#0F172A] z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {/* Illustration */}
          <IconCluster size="sm" />

          {/* Heading */}
          <h2
            id="guest-modal-title-mobile"
            className="mt-4 mb-1 text-center text-xl font-semibold leading-snug text-[#0F172A]"
          >
            Sign up or log in to continue
          </h2>
          <p className="mb-6 text-center text-sm text-[#8C97AD]">It only takes a minute</p>

          <AuthButtons onClose={onClose} />

          {/* Privacy note */}
          <div className="mt-4 flex items-center gap-2 text-xs text-[#8C97AD]">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Your data is secure with us. We respect your privacy and never share your information.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
