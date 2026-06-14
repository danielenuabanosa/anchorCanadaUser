'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pencil } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { Footer } from './Footer';
import { ProfilePreviewCard } from './ProfilePreviewCard';

import cameraIcon from '@assets/icons/camera.png';
import questionIcon from '@assets/icons/question-mark.png';

const PRONOUN_OPTIONS = ['He / Him', 'She / Her', 'They / Them', 'Prefer not to say'];

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

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={3} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-20">
        <div className="flex w-full gap-12">

          {/* Left: form */}
          <div className="flex w-[886px]  max-w-[886px] flex-1 flex-col">
            <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
              Let&apos;s Make Anchor{' '}
              <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Yours</span>
            </h1>
            <p className="mt-3 font-sans text-[16px] font-normal leading-[100%] text-[#8C97AD]">
              Add a few details so your opportunities, recommendations, and <br/>
              community feel personal from day one.
            </p>

            {/* 1. Profile photo */}
            <div className="mt-8">
              <p className="font-serif text-[28px] font-normal leading-[56px] text-[#0F172A]">
                1. Add a profile photo{' '}
                <span className="font-serif text-[28px] font-normal italic leading-[56px] text-[#8C97AD]">(Optional)</span>
              </p>
              <p className="mt-1 font-sans text-[16px] font-normal leading-[180%] text-[#8C97AD]">A photo helps build trust and community.</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-3 flex h-[140px] w-[140px] flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#D9E1EF] bg-white transition-colors hover:border-[#2F66C8] hover:bg-[#EFF4FF]"
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <Image src={cameraIcon} alt="Upload" width={26} height={26} className="object-contain" />
                    <span className="mt-1.5 text-center font-sans text-[9px] font-medium leading-[100%] text-[#0F172A]">
                      Upload photo<br /><span className="font-sans text-[8px] font-normal leading-[100%] text-[#44516A]">JPG, PNG • Max 5MB</span>
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* 2. Name */}
            <div className="mt-8">
            <p className="font-serif text-[28px] font-normal leading-[56px] text-[#0F172A]">2. What&apos;s your name?</p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                    First Name <span className="font-sans text-[16px] font-normal leading-[180%] text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1.5 anchor-field h-[53px"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                    Last Name <span className="font-sans text-[16px] font-normal leading-[180%] text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="mt-1.5 anchor-field h-[53px"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="flex items-center gap-1.5 text-[12px] font-medium text-[#0F172A]">
                  Display Name{' '} 
                  <span className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">(Optional)</span>
                  <Image src={questionIcon} alt="info" width={14} height={14} className="opacity-40" />
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should people know you?"
                  className="mt-1.5 anchor-field h-[53px"
                />
                <p className="mt-1 text-[11px] text-[#8C97AD]">This is how your profile will appear.</p>
              </div>
            </div>

            {/* 3. Pronouns */}
            <div className="mt-8">
               <p className="font-serif text-[28px] font-normal leading-[56px] text-[#0F172A]">
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
                    className="rounded-full border border-[#2F66C8] bg-[#EFF4FF] px-4 py-1.5 text-[13px] text-[#2F66C8] focus:outline-none h-[53px"
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
               <p className="font-serif text-[28px] font-normal leading-[56px] text-[#0F172A]">
                4. One line about yourself{' '}
                <span className="font-normal italic text-[#8C97AD]">(Optional)</span>
              </p>
              <div className="relative mt-3">
                <textarea
                  value={bio}
                  onChange={(e) => { if (e.target.value.length <= 80) setBio(e.target.value); }}
                  placeholder="Example: Passionate about building a career in Canada."
                  rows={4}
                  className="anchor-textarea mt-1.5"
                />
                <span className="absolute bottom-3 right-3.5 text-[11px] text-[#8C97AD]">
                  {bio.length} / 80
                </span>
              </div>
            </div>
          </div>

          {/* Right: live preview */}
          <div className="w-[622px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold leading-snug text-[#0F172A]">
                  Here&apos;s how your profile will look
                </p>
                <span className="flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Live Preview
                </span>
              </div>
              <div className="mt-4">
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

      <OnboardingNavButtons
        backHref="/onboarding/location"
        onContinue={handleContinue}
        continueDisabled={!canContinue}
        footer={<Footer />}
      />
    </div>
  );
}
