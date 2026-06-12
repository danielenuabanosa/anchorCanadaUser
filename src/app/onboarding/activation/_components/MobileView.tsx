'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { Footer } from './Footer';

import caseIcon from '@assets/icons/case.png';
import grantIcon from '@assets/icons/grant-funding.png';
import loveIcon from '@assets/icons/love.png';
import graduationIcon from '@assets/icons/graduation-cap.png';
import heartHandshake from '@assets/icons/heart-handshake.png';
import start3Icon from '@assets/icons/start3.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import mapBgImg from '@assets/images/map-bg.png';
import validBgImg from '@assets/images/valid-bg.png';
import avatarImg from '@assets/images/image.png';

const BRAND = '#2F66C8';

const PREVIEW_BADGES = [
  { label: 'STUDENT', bg: '#EEF3FF', text: BRAND, dot: '🎓' },
  { label: 'NEWCOMER', bg: '#DFFAF3', text: '#059669', dot: '✦' },
  { label: 'ENTREPRENEUR', bg: '#FFF5EC', text: '#E8812A', dot: '🚀' },
];

const FEED_STEPS = [
  { label: 'Profile synced', sub: 'Your profile has been securely saved.' },
  { label: 'Location detected', sub: 'Toronto, Ontario, Canada 🍁' },
  { label: 'Interests matched', sub: 'Entrepreneurship, Grants, Community' },
  { label: 'Finding opportunities in Toronto…', sub: 'Scanning verified opportunities in your area.' },
  { label: 'Matching grants for entrepreneurs…', sub: 'Checking programs you may qualify for' },
  { label: 'Connecting community resources…', sub: 'Finding services and support near you.' },
  { label: 'Preparing your dashboard…', sub: 'Almost ready!' },
];

const MAP_CARDS = [
  {
    icon: caseIcon,
    bg: '#EEF3FF',
    title: 'UX Design Internship',
    loc: 'Toronto, ON',
    badge: 'New Match',
    badgeBg: '#EEF3FF',
    badgeText: BRAND,
    style: { top: '6%', left: '52%' },
  },
  {
    icon: grantIcon,
    bg: '#DFFAF3',
    title: 'Startup Grant Program',
    loc: 'Ontario',
    badge: 'Highly Matched',
    badgeBg: '#DFFAF3',
    badgeText: '#059669',
    style: { top: '6%', right: '2%' },
  },
  {
    icon: loveIcon,
    bg: '#FFF0F6',
    title: 'Community Support',
    loc: 'Downtown Toronto',
    badge: 'Recommended',
    badgeBg: '#F3E8FF',
    badgeText: '#9333EA',
    style: { bottom: '25%', left: '2%' },
  },
  {
    icon: graduationIcon,
    bg: '#FFF5EC',
    title: 'Scholarships for Newcomers',
    loc: 'Canada-wide',
    badge: 'New Match',
    badgeBg: '#FFF5EC',
    badgeText: '#E8812A',
    style: { bottom: '2%', right: '2%' },
  },
];

const FEATURE_CARDS = [
  { icon: caseIcon, bg: '#EEF3FF', title: 'Personalized Jobs', desc: 'Opportunities matched to your goals and skills.' },
  { icon: grantIcon, bg: '#DFFAF3', title: 'Grants & Funding', desc: 'Programs you qualify for, all in one place.' },
  { icon: heartHandshake, bg: '#E6F7EF', title: 'Community Support', desc: 'Connect with services and people near you.' },
  { icon: loveIcon, bg: '#FFF0F6', title: 'Saved Opportunities', desc: 'Save, track and manage what means to you.' },
];

const PROGRESS_ITEMS = [
  { label: 'Profile created', sub: 'Great start!' },
  { label: 'Email verified', sub: "You're all set" },
  { label: 'Personalized for you', sub: 'Personalized for you' },
  { label: 'Dashboard ready', sub: "Let's explore!", cta: true },
];

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin text-[#2F66C8]" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      />
    </svg>
  );
}

export default function MobileView() {
  const router = useRouter();
  const [phase, setPhase] = useState<'loading' | 'welcome'>('loading');
  const [feedStep, setFeedStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== 'loading') return;

    const TOTAL_DURATION = 7000;
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 100 / (TOTAL_DURATION / 80);
      });
    }, 80);

    const delays = [0, 700, 1400, 2200, 3200, 4300, 5400];
    const timers = delays.map((delay, i) => setTimeout(() => setFeedStep(i), delay));

    const doneTimer = setTimeout(() => {
      setProgress(100);
      setPhase('welcome');
    }, TOTAL_DURATION);

    return () => {
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [phase]);

  function stepStatus(i: number): 'done' | 'loading' | 'pending' {
    if (i < feedStep) return 'done';
    if (i === feedStep) return 'loading';
    return 'pending';
  }

  if (phase === 'loading') {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
        <OnboardingNavbar />

        <div className="px-5 pb-3 pt-4">
          <StepProgress current={6} />
        </div>

        <main className="flex-1 px-5 pb-4 pt-8">
          <h1 className="font-instrument-serif text-[26px] font-normal leading-tight text-[#0F172A]">
            Personalizing Your
            <span className="block text-[28px] italic text-[#2F66C8]">Anchor</span>
            Experience
          </h1>
          <p className="mt-2 text-[12px] text-[#8C97AD]">
            We&apos;re matching opportunities based on your goals, interests, and location.
          </p>

          <div className="relative mt-5 h-[240px] overflow-hidden rounded-2xl">
            <Image src={mapBgImg} alt="Canada map" fill className="object-contain" />
            {MAP_CARDS.slice(0, 2).map((card, i) => (
              <div
                key={i}
                className="absolute z-10 flex min-w-[130px] items-start gap-2 rounded-xl border border-neutral-100 bg-white p-2.5 shadow-md"
                style={card.style}
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: card.bg }}
                >
                  <Image src={card.icon} alt="" width={12} height={12} className="object-contain" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#0F172A]">{card.title}</p>
                  <p className="text-[9px] text-[#8C97AD]">{card.loc}</p>
                  <span
                    className="mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold"
                    style={{ backgroundColor: card.badgeBg, color: card.badgeText }}
                  >
                    {card.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-[#D9E1EF] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Image src={start3Icon} alt="" width={14} height={14} className="object-contain" />
              <p className="text-[12px] font-semibold text-[#0F172A]">Live personalization feed</p>
            </div>
            <div className="flex flex-col gap-3">
              {FEED_STEPS.map((step, i) => {
                const status = stepStatus(i);
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                      {status === 'done' ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                      ) : status === 'loading' ? (
                        <Spinner />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-neutral-200 bg-white" />
                      )}
                    </div>
                    <div className="flex flex-1 items-start justify-between">
                      <div>
                        <p
                          className={`text-[12px] font-semibold ${status === 'pending' ? 'text-neutral-300' : 'text-[#0F172A]'}`}
                        >
                          {step.label}
                        </p>
                        <p className={`text-[10px] ${status === 'pending' ? 'text-neutral-300' : 'text-[#8C97AD]'}`}>
                          {step.sub}
                        </p>
                      </div>
                      {status === 'done' && (
                        <span className="ml-2 text-[10px] font-semibold text-emerald-500">Done</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-[#D9E1EF] bg-white p-4 shadow-sm">
            <p className="mb-2.5 text-[12px] font-semibold text-[#0F172A]">Preparing your first recommendations…</p>
            <div className="h-2 overflow-hidden rounded-full bg-[#EEF2F8]">
              <div
                className="h-full rounded-full bg-[#2F66C8] transition-all duration-200 ease-linear"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-[10px] text-[#8C97AD]">This usually takes less than 10 seconds.</p>
              <p className="text-[10px] font-semibold text-[#2F66C8]">{Math.round(Math.min(progress, 100))}%</p>
            </div>
          </div>
        </main>

        <div className="border-t border-[#D9E1EF] bg-white px-5 py-4">
          <Footer phase="loading" variant="mobile" className="mt-0" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={6} />
      </div>

      <main className="flex-1 px-5 pb-4 pt-6">
        <div className="relative h-[160px] w-full overflow-hidden rounded-2xl">
          <Image src={validBgImg} alt="celebration" fill className="object-cover" />
        </div>

        <h1 className="font-instrument-serif text-[26px] font-normal text-[#0F172A]">Welcome to Anchor! 🎉</h1>
        <p className="mt-2 text-[12px] leading-relaxed text-[#8C97AD]">
          Your account is verified, your profile is ready, and your personalized opportunities are waiting.
        </p>

        <div className="mt-4 rounded-2xl border border-[#D9E1EF] bg-white p-4 shadow-sm">
          <div className="mb-2.5 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
              <ArrowRight className="h-3 w-3 text-emerald-600" />
            </span>
            <p className="text-[11px] font-semibold text-emerald-600">Your profile is now active.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-neutral-100 bg-[#FFF9EC]">
              <Image src={avatarImg} alt="avatar" fill className="object-cover" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0F172A]">Jacob Sullivan</p>
              <div className="mt-0.5 flex flex-wrap gap-1">
                {PREVIEW_BADGES.map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
                    style={{ background: b.bg, color: b.text }}
                  >
                    {b.dot} {b.label}
                  </span>
                ))}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#8C97AD]">
                <Image src={locationPinIcon} alt="" width={9} height={9} className="opacity-50" />
                Toronto, Ontario, Canada
                <Image src={canadaFlagIcon} alt="" width={12} height={8} className="rounded-sm object-cover" />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-[13px] font-bold text-[#0F172A]">Here&apos;s what&apos;s waiting for you</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-4 text-center shadow-sm"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: card.bg }}
              >
                <Image src={card.icon} alt="" width={20} height={20} className="object-contain" />
              </div>
              <p className="mt-2 text-[11px] font-bold text-[#0F172A]">{card.title}</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-[#8C97AD]">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {PROGRESS_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl px-3 py-2.5 ${item.cta ? 'bg-[#EEF3FF]' : ''}`}
            >
              {item.cta ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2F66C8] text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              ) : (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
              )}
              <div>
                <p className={`text-[12px] font-semibold ${item.cta ? 'text-[#2F66C8]' : 'text-[#0F172A]'}`}>
                  {item.label}
                </p>
                <p className={`mt-0.5 text-[11px] ${item.cta ? 'font-medium text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-[#D9E1EF] bg-white px-5 pb-8 pt-4">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => router.push('/onboarding/dashboard-transition')}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] text-[15px] font-semibold text-white transition-colors hover:bg-[#2454A4]"
          >
            Enter My Dashboard <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPhase('loading')}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
        <Footer phase="success" variant="mobile" />
      </div>
    </div>
  );
}
