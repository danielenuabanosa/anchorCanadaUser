'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Pencil } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingFooter } from '@/shared/components/onboarding/OnboardingFooter';

import cameraIcon from '@assets/icons/camera.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';
import questionIcon from '@assets/icons/question-mark.png';
import cityBannerImg from '@assets/images/w1.png';
import avatarImg from '@assets/images/image.png';

const PRONOUN_OPTIONS = ['He / Him', 'She / Her', 'They / Them', 'Prefer not to say'];

const PREVIEW_BADGES = [
  { label: 'STUDENT',      bg: '#EEF3FF', text: '#2F66C8', dot: '🎓' },
  { label: 'NEWCOMER',     bg: '#DFFAF3', text: '#059669', dot: '✦' },
  { label: 'ENTREPRENEUR', bg: '#FFF5EC', text: '#E8812A', dot: '🚀' },
];

const FOCUS_CHIPS = [
  { label: 'Finding Employment',   color: '#2F66C8' },
  { label: 'Accessing Funding',    color: '#9333EA' },
  { label: 'Support my community', color: '#059669' },
];

function ProfilePreviewCard({
  displayName,
  pronounLabel,
  avatarSrc,
}: {
  displayName: string;
  pronounLabel: string;
  avatarSrc: string | null;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#D9E1EF]">
      <div className="relative h-[130px] w-full overflow-hidden">
        <Image src={cityBannerImg} alt="city skyline" fill className="object-cover" />
        <div className="absolute bottom-[-28px] left-1/2 h-16 w-16 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-[#FFF9EC]">
          {avatarSrc ? (
            <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <Image src={avatarImg} alt="avatar" fill className="object-cover" />
          )}
        </div>
      </div>
      <div className="px-4 pb-4 pt-10 text-center">
        <p className="text-[16px] font-bold text-[#0F172A]">Hello, {displayName}! 👋</p>
        <p className="mt-0.5 text-[11px] text-[#8C97AD]">{pronounLabel}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {PREVIEW_BADGES.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9px] font-bold"
              style={{ background: b.bg, color: b.text }}
            >
              <span>{b.dot}</span> {b.label}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#8C97AD]">
          <Image src={locationPinIcon} alt="" width={11} height={11} className="opacity-60" />
          Toronto, Ontario, Canada
          <Image src={canadaFlagIcon} alt="🍁" width={16} height={11} className="rounded-sm object-cover" />
        </div>
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-[#8C97AD]">
          Focused on:
        </p>
        <div className="mt-1.5 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {FOCUS_CHIPS.map((c) => (
            <span key={c.label} className="text-[11px] font-medium" style={{ color: c.color }}>
              {c.label}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#EFF4FF] px-3 py-2.5 text-left">
          <Image src={lightBulbIcon} alt="" width={13} height={13} className="mt-0.5 shrink-0 opacity-70" />
          <p className="text-[11px] leading-relaxed text-[#44516A]">
            Great choice! We&apos;ll personalize your dashboard and recommendations based on your selections.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DesktopView() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pronoun, setPronoun] = useState<string | null>(null);
  const [customPronoun, setCustomPronoun] = useState('');
  const [customMode, setCustomMode] = useState(false);
  const [bio, setBio] = useState('');
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarSrc(URL.createObjectURL(file));
  }, []);

  const canContinue = firstName.trim() !== '' && lastName.trim() !== '';
  const displayedName = displayName.trim() || firstName.trim() || 'Jacob';
  const pronounLabel = customMode ? customPronoun || 'He / Him' : pronoun ?? 'He / Him';

  function handleContinue() {
    if (canContinue) router.push('/onboarding/account');
  }

  function PronounPill({ label }: { label: string }) {
    const active = pronoun === label && !customMode;
    return (
      <button
        type="button"
        onClick={() => { setPronoun(label); setCustomMode(false); }}
        className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
          active
            ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
            : 'border-[#D9E1EF] bg-white text-[#44516A] hover:border-[#2F66C8]/30'
        }`}
      >
        {active && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2F66C8]">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
        {label}
      </button>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {/* Steps bar */}
      <div className="border-b border-[#D9E1EF] bg-white mt-4">
        <div className="mx-auto max-w-5xl px-10 pb-3 pt-4">
          <StepProgress current={3} />
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 px-10 py-10">
        <div className="mx-auto flex w-full max-w-5xl gap-12">

          {/* Left: form */}
          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="font-instrument-serif text-[46px] font-normal leading-[1.1] text-[#0F172A]">
              Let&apos;s Make Anchor{' '}
              <span className="italic text-[#2F66C8]">Yours</span>
            </h1>
            <p className="mt-3 text-[13px] leading-relaxed text-[#8C97AD]">
              Add a few details so your opportunities, recommendations, and
              community feel personal from day one.
            </p>

            {/* 1. Profile photo */}
            <div className="mt-8">
              <p className="text-[15px] font-semibold text-[#0F172A]">
                1. Add a profile photo{' '}
                <span className="font-normal italic text-[#8C97AD]">(Optional)</span>
              </p>
              <p className="mt-1 text-[12px] text-[#8C97AD]">A photo helps build trust and community.</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-3 flex h-[86px] w-[86px] flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#D9E1EF] bg-white transition-colors hover:border-[#2F66C8] hover:bg-[#EFF4FF]"
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <Image src={cameraIcon} alt="Upload" width={26} height={26} className="object-contain" />
                    <span className="mt-1.5 text-center text-[9px] leading-tight text-[#8C97AD]">
                      Upload photo<br /><span className="text-[8px]">JPG, PNG • Max 4MB</span>
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* 2. Name */}
            <div className="mt-8">
              <p className="text-[15px] font-semibold text-[#0F172A]">2. What&apos;s your name?</p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#0F172A]">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1.5 w-full rounded-xl border border-[#D9E1EF] bg-white px-3.5 py-2.5 text-[13px] text-[#0F172A] placeholder:text-[#8C97AD] focus:border-[#2F66C8] focus:outline-none focus:ring-1 focus:ring-[#2F66C8]/30"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#0F172A]">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="mt-1.5 w-full rounded-xl border border-[#D9E1EF] bg-white px-3.5 py-2.5 text-[13px] text-[#0F172A] placeholder:text-[#8C97AD] focus:border-[#2F66C8] focus:outline-none focus:ring-1 focus:ring-[#2F66C8]/30"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="flex items-center gap-1.5 text-[12px] font-medium text-[#0F172A]">
                  Display Name{' '}
                  <span className="font-normal text-[#8C97AD]">(Optional)</span>
                  <Image src={questionIcon} alt="info" width={14} height={14} className="opacity-40" />
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should people know you?"
                  className="mt-1.5 w-full rounded-xl border border-[#D9E1EF] bg-white px-3.5 py-2.5 text-[13px] text-[#0F172A] placeholder:text-[#8C97AD] focus:border-[#2F66C8] focus:outline-none focus:ring-1 focus:ring-[#2F66C8]/30"
                />
                <p className="mt-1 text-[11px] text-[#8C97AD]">This is how your profile will appear.</p>
              </div>
            </div>

            {/* 3. Pronouns */}
            <div className="mt-8">
              <p className="text-[15px] font-semibold text-[#0F172A]">
                3. Pronouns{' '}
                <span className="font-normal italic text-[#8C97AD]">(Optional)</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRONOUN_OPTIONS.map((p) => <PronounPill key={p} label={p} />)}
                {customMode ? (
                  <input
                    autoFocus
                    type="text"
                    value={customPronoun}
                    onChange={(e) => { setCustomPronoun(e.target.value); setPronoun(e.target.value); }}
                    placeholder="Type pronouns…"
                    className="rounded-full border border-[#2F66C8] bg-[#EFF4FF] px-4 py-1.5 text-[13px] text-[#2F66C8] focus:outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => { setCustomMode(true); setPronoun(null); }}
                    className="flex items-center gap-1.5 rounded-full border border-[#D9E1EF] bg-white px-4 py-1.5 text-[13px] font-medium text-[#44516A] hover:border-[#2F66C8]/30 transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Custom
                  </button>
                )}
              </div>
            </div>

            {/* 4. Bio */}
            <div className="mt-8">
              <p className="text-[15px] font-semibold text-[#0F172A]">
                4. One line about yourself{' '}
                <span className="font-normal italic text-[#8C97AD]">(Optional)</span>
              </p>
              <div className="relative mt-3">
                <textarea
                  value={bio}
                  onChange={(e) => { if (e.target.value.length <= 80) setBio(e.target.value); }}
                  placeholder="Example: Passionate about building a career in Canada."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-[#D9E1EF] bg-white px-3.5 py-3 text-[13px] text-[#0F172A] placeholder:text-[#8C97AD] focus:border-[#2F66C8] focus:outline-none focus:ring-1 focus:ring-[#2F66C8]/30"
                />
                <span className="absolute bottom-3 right-3.5 text-[11px] text-[#8C97AD]">
                  {bio.length} / 80
                </span>
              </div>
            </div>
          </div>

          {/* Right: live preview */}
          <div className="w-[370px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-[#D9E1EF] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#0F172A]">
                  Here&apos;s how your profile will look
                </p>
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Live Preview
                </span>
              </div>
              <div className="mt-3">
                <ProfilePreviewCard
                  displayName={displayedName}
                  pronounLabel={pronounLabel}
                  avatarSrc={avatarSrc}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky bottom nav */}
      <div className="sticky bottom-0 border-t border-[#D9E1EF] bg-white px-10 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/onboarding/location"
            className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-[#D9E1EF] bg-white px-6 text-[14px] font-medium text-[#0F172A] transition-colors hover:bg-[#EFF4FF]"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className={`inline-flex h-10 items-center gap-2 rounded-xl px-8 text-[14px] font-semibold text-white transition-colors ${
              canContinue
                ? 'bg-[#2F66C8] hover:bg-[#1B4FCA] cursor-pointer'
                : 'bg-[#2F66C8]/40 cursor-not-allowed'
            }`}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mx-auto max-w-5xl border-t border-[#EEF2F8] px-0 pt-4">
          <div className="flex items-center gap-2 text-[12px] text-[#44516A]">
            <Image src={lightBulbIcon} alt="" width={16} height={16} className="shrink-0 object-contain" />
            <span>
              <strong className="font-medium text-[#0F172A]">Almost done!</strong>{' '}
              You can edit your profile anytime in your account settings.
            </span>
          </div>
          <OnboardingFooter />
        </div>
      </div>
    </div>
  );
}
