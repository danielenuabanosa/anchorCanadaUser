'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Pencil } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';

import cameraIcon from '@assets/icons/camera.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import questionIcon from '@assets/icons/question-mark.png';
import { Footer } from './Footer';
import { ProfilePreviewCard } from './ProfilePreviewCard';
import avatarImg from '@assets/images/w1.png';

const PRONOUN_OPTIONS = ['He / Him', 'She / Her', 'They / Them', 'Prefer not to say'];

export default function MobileView() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pronoun, setPronoun] = useState<string | null>(null);
  const [customPronoun, setCustomPronoun] = useState('');
  const [customMode, setCustomMode] = useState(false);
  const [bio, setBio] = useState('');
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={3} />
      </div>

      <main className="px-5 pb-4 pt-6">
        <h1 className="font-serif text-[28px] font-normal leading-tight text-[#0F172A]">
          Let&apos;s Make Anchor
          <span className="block font-serif text-[32px] italic text-[#2F66C8]">Yours</span>
        </h1>
        <p className="mt-2.5 text-[12px] leading-relaxed text-[#8C97AD]">
          Add a few details so your opportunities, recommendations, and community feel personal from day one.
        </p>

        <div className="mt-6">
          <p className="text-[14px] font-semibold text-[#0F172A]">
            1. Add a profile photo{' '}
            <span className="font-normal text-[#8C97AD]">(Optional)</span>
          </p>
          <p className="mt-0.5 text-[11px] text-[#8C97AD]">A photo helps build trust and community.</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-3 flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#D9E1EF] bg-white transition-colors hover:border-[#2F66C8]"
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <>
                <Image src={cameraIcon} alt="Upload" width={22} height={22} className="object-contain" />
                <span className="mt-1 text-center text-[9px] text-[#8C97AD]">Upload photo</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-[14px] font-semibold text-[#0F172A]">2. What&apos;s your name?</p>
          <div className="mt-3 flex flex-col gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#0F172A]">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="mt-1.5 anchor-field"
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
                className="mt-1.5 anchor-field"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[12px] font-medium text-[#0F172A]">
                Display Name <span className="font-normal text-[#8C97AD]">(Optional)</span>
                <Image src={questionIcon} alt="" width={13} height={13} className="opacity-40" />
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How should people know you?"
                className="mt-1.5 anchor-field"
              />
              <p className="mt-1 text-[11px] text-[#8C97AD]">This is how your profile will appear.</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[14px] font-semibold text-[#0F172A]">
            3. Pronouns{' '}
            <span className="font-normal italic text-[#8C97AD]">(Optional)</span>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {PRONOUN_OPTIONS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => { setPronoun(p); setCustomMode(false); }}
                className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                  pronoun === p && !customMode
                    ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                    : 'border-[#D9E1EF] bg-white text-[#44516A]'
                }`}
              >
                {p}
              </button>
            ))}
            {customMode ? (
              <input
                autoFocus
                type="text"
                value={customPronoun}
                onChange={(e) => { setCustomPronoun(e.target.value); setPronoun(e.target.value); }}
                placeholder="Type pronouns…"
                className="rounded-full border border-[#2F66C8] bg-[#EFF4FF] px-3.5 py-1.5 text-[12px] text-[#2F66C8] focus:outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => { setCustomMode(true); setPronoun(null); }}
                className="flex items-center gap-1.5 rounded-full border border-[#D9E1EF] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#44516A]"
              >
                <Pencil className="h-3 w-3" /> Custom
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[14px] font-semibold text-[#0F172A]">
            4. One line about yourself{' '}
            <span className="font-normal italic text-[#8C97AD]">(Optional)</span>
          </p>
          <div className="relative mt-2.5">
            <textarea
              value={bio}
              onChange={(e) => { if (e.target.value.length <= 80) setBio(e.target.value); }}
              placeholder="Example: Passionate about building a career in Canada."
              rows={3}
              className="anchor-textarea mt-1.5"
            />
            <span className="absolute bottom-3 right-3 text-[11px] text-[#8C97AD]">{bio.length} / 80</span>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="flex w-full items-center justify-between rounded-2xl border border-[#D9E1EF] bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#D9E1EF] bg-[#FFF9EC]">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <Image src={avatarImg} alt="avatar" fill className="object-cover" />
                )}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-[#0F172A]">Hello, {displayedName}! 👋</p>
                <div className="flex items-center gap-1 text-[11px] text-[#8C97AD]">
                  <Image src={locationPinIcon} alt="" width={10} height={10} className="opacity-50" />
                  Toronto, Ontario, Canada
                  <Image src={canadaFlagIcon} alt="" width={13} height={9} className="rounded-sm object-cover" />
                </div>
              </div>
            </div>
            <ArrowRight className={`h-4 w-4 text-[#8C97AD] transition-transform ${previewOpen ? 'rotate-90' : ''}`} />
          </button>
          {previewOpen && (
            <div className="mt-2">
              <ProfilePreviewCard
                displayName={displayedName}
                pronounLabel={pronounLabel}
                avatarSrc={avatarSrc}
                compact
              />
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pt-6 pb-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
                canContinue ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding/location"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>
          <Footer variant="mobile" />
        </div>
      </main>
    </div>
  );
}
