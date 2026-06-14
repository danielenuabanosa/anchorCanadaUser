'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { Footer } from './Footer';

import caseIcon from '@assets/icons/case.png';
import grantIcon from '@assets/icons/grant-funding.png';
import loveIcon from '@assets/icons/love.png';
import graduationIcon from '@assets/icons/graduation-cap.png';
import heartHandshake from '@assets/icons/heart-handshake.png';
import star2Icon from '@assets/icons/star2.png';
import start3Icon from '@assets/icons/start3.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import mapBgImg from '@assets/images/map-bg.png';
import validBgImg from '@assets/images/valid-bg.png';
import plainBg2Img from '@assets/images/plain-bg2.png';
import avatarImg from '@assets/images/w1.png';

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

export default function DesktopView() {
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

        <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
          <StepProgress current={6} />
        </div>

        <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 py-12">
            <div className="mb-8 text-center">
              <h1 className="font-serif text-[46px] font-normal leading-[1.1] text-[#0F172A]">
                Personalizing Your{' '}
                <span className="italic text-[#2F66C8]">Anchor</span>{' '}
                Experience
              </h1>
              <p className="mt-3 text-[14px] text-[#8C97AD]">
                We&apos;re matching opportunities based on your goals, interests, and location.
              </p>
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
                <div className="mb-5 flex items-center gap-2">
                  <Image src={start3Icon} alt="" width={16} height={16} className="object-contain" />
                  <p className="text-[13px] font-semibold text-[#0F172A]">Live personalization feed</p>
                </div>
                <div className="flex flex-col gap-4">
                  {FEED_STEPS.map((step, i) => {
                    const status = stepStatus(i);
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                          {status === 'done' ? (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                            </div>
                          ) : status === 'loading' ? (
                            <Spinner />
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-neutral-200 bg-white" />
                          )}
                        </div>
                        <div className="flex flex-1 items-start justify-between">
                          <div>
                            <p
                              className={`text-[13px] font-semibold ${
                                status === 'pending' ? 'text-neutral-300' : 'text-[#0F172A]'
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className={`mt-0.5 text-[11px] ${status === 'pending' ? 'text-neutral-300' : 'text-[#8C97AD]'}`}>
                              {step.sub}
                            </p>
                          </div>
                          {status === 'done' && (
                            <span className="ml-3 text-[11px] font-semibold text-emerald-500">Done</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative h-[420px] w-[460px] shrink-0 overflow-hidden rounded-2xl">
                <Image src={mapBgImg} alt="Canada map" fill className="object-contain" />
                {MAP_CARDS.map((card, i) => (
                  <div
                    key={i}
                    className="absolute z-10 flex min-w-[160px] items-start gap-2.5 rounded-2xl border border-neutral-100 bg-white p-3 shadow-md"
                    style={card.style}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: card.bg }}
                    >
                      <Image src={card.icon} alt="" width={16} height={16} className="object-contain" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#0F172A]">{card.title}</p>
                      <p className="text-[10px] text-[#8C97AD]">{card.loc}</p>
                      <span
                        className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                        style={{ backgroundColor: card.badgeBg, color: card.badgeText }}
                      >
                        {card.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Image src={star2Icon} alt="" width={16} height={16} className="object-contain" />
                <p className="text-[13px] font-semibold text-[#0F172A]">Preparing your first recommendations…</p>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#EEF2F8]">
                <div
                  className="h-full rounded-full bg-[#2F66C8] transition-all duration-200 ease-linear"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[11px] text-[#8C97AD]">This usually takes less than 10 seconds.</p>
                <p className="text-[11px] font-semibold text-[#2F66C8]">{Math.round(Math.min(progress, 100))}%</p>
              </div>
            </div>
        </main>

        <div className="border-t border-[#D9E1EF] bg-white px-5 py-5 md:px-10 md:py-10">
          <div className="mx-auto max-w-[1548px]">
            <Footer phase="loading" className="mt-0" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={6} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-10">
        <div className="flex w-full gap-12">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="relative h-[200px] w-full overflow-hidden rounded-2xl">
              <Image src={validBgImg} alt="celebration" fill className="object-cover" />
            </div>

            <h1 className="mt-6 font-serif text-[46px] font-normal leading-[1.1] text-[#0F172A]">
              Welcome to Anchor! 🎉
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-[#8C97AD]">
              Your account is verified, your profile is ready, and your personalized opportunities are waiting.
            </p>

            <div className="mt-6 rounded-2xl border border-[#D9E1EF] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  <ArrowRight className="h-3 w-3 text-emerald-600" />
                </span>
                <p className="text-[12px] font-semibold text-emerald-600">Your profile is now active.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-neutral-100 bg-[#FFF9EC]">
                  <Image src={avatarImg} alt="avatar" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A]">Jacob Sullivan</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {PREVIEW_BADGES.map((b) => (
                      <span
                        key={b.label}
                        className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[8px] font-bold"
                        style={{ background: b.bg, color: b.text }}
                      >
                        {b.dot} {b.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-[#8C97AD]">
                    <Image src={locationPinIcon} alt="" width={9} height={9} className="opacity-50" />
                    Toronto, Ontario, Canada
                    <Image src={canadaFlagIcon} alt="🍁" width={13} height={9} className="rounded-sm object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between overflow-hidden rounded-2xl border border-[#D9E1EF] bg-white shadow-sm">
              <div className="p-4">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Image src={locationPinIcon} alt="" width={14} height={14} className="opacity-60" />
                  <p className="text-[14px] font-bold text-[#0F172A]">We&apos;re already finding opportunities for you.</p>
                </div>
                <p className="text-[12px] text-[#8C97AD]">
                  Based on your profile, we&apos;ve started matching opportunities in Toronto
                </p>
              </div>
              <div className="relative h-[100px] w-[140px] shrink-0 overflow-hidden">
                <Image src={plainBg2Img} alt="Toronto" fill className="object-cover" />
              </div>
            </div>
          </div>

          <div className="w-[360px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-sm">
              <p className="text-[14px] font-bold text-[#0F172A]">Here&apos;s what&apos;s waiting for you</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {FEATURE_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-[#F8FAFF] p-4 text-center"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: card.bg }}
                    >
                      <Image src={card.icon} alt="" width={20} height={20} className="object-contain" />
                    </div>
                    <p className="mt-2.5 text-[12px] font-bold text-[#0F172A]">{card.title}</p>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#8C97AD]">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#8C97AD]">Your progress</p>
                <div className="flex flex-col gap-3">
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
                        <p className={`text-[13px] font-semibold ${item.cta ? 'text-[#2F66C8]' : 'text-[#0F172A]'}`}>
                          {item.label}
                        </p>
                        <p className={`mt-0.5 text-[11px] ${item.cta ? 'font-medium text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        onBack={() => setPhase('loading')}
        onContinue={() => router.push('/onboarding/dashboard-transition')}
        continueLabel="Enter My Dashboard"
        footer={<Footer phase="success" />}
      />
    </div>
  );
}
