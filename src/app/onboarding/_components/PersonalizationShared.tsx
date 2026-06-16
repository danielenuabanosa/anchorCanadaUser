'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

import caseIcon from '@assets/icons/case.png';
import grantIcon from '@assets/icons/grant-funding.png';
import briefcaseIcon from '@assets/icons/briefcase.png';
import heartHandshake from '@assets/icons/heart-handshake.png';
import start3Icon from '@assets/icons/start3.png';
import star2Icon from '@assets/icons/star2.png';
import locationPinIcon from '@assets/icons/location2.png';
import canadaFlagIcon from '@assets/icons/canada-flag.png';
import shieldCheckIcon from '@assets/icons/shield-valid.png';
import lockIcon from '@assets/icons/lock.png';
import mapBgImg from '@assets/images/map-bg.png';
import validBgImg from '@assets/images/valid-bg.png';
import plainBg2Img from '@assets/images/plain-bg2.png';
import orgLogoImg from '@assets/images/prov-utoronto.png';

import { PREVIEW_BADGES, FOCUS_CHIPS, DEFAULT_PROFILE } from '@/shared/components/onboarding/profilePreviewData';
import { cn } from '@/lib/utils';

export const FEED_STEPS = [
  { label: 'Organization synced', sub: 'Your organization details have been securely saved.' },
  { label: 'Categories configured', sub: 'Jobs, Grants, Training, Community' },
  { label: 'Verification complete', sub: 'Your organization is verified on Anchor.' },
  { label: 'Setting up publishing tools…', sub: 'Preparing your opportunity management dashboard.' },
  { label: 'Configuring reach analytics…', sub: 'Track how Canadians discover your listings.' },
  { label: 'Preparing team access…', sub: 'Admin and editor permissions are ready.' },
  { label: 'Launching provider portal…', sub: 'Almost ready!' },
] as const;

export const MAP_CARDS = [
  {
    icon: caseIcon,
    bg: '#E0E9FE',
    title: 'Software Developer Role',
    loc: 'Toronto, ON',
    badge: 'Ready to Publish',
    badgeBg: '#DCE8FD',
    badgeText: '#0012E5',
    style: { top: '4%', left: '18%' },
  },
  {
    icon: grantIcon,
    bg: '#E7F5EF',
    title: 'Community Grant Program',
    loc: 'Ontario',
    badge: 'Draft Saved',
    badgeBg: '#E7F5ED',
    badgeText: '#046F47',
    style: { top: '8%', right: '2%' },
  },
  {
    icon: heartHandshake,
    bg: '#FCE7EB',
    title: 'Volunteer Training',
    loc: 'Canada-wide',
    badge: 'Scheduled',
    badgeBg: '#F1ECFC',
    badgeText: '#4E28B8',
    style: { bottom: '22%', left: '2%' },
  },
  {
    icon: briefcaseIcon,
    bg: '#FEF1DC',
    title: 'Internship Program',
    loc: 'Toronto, ON',
    badge: 'Ready to Publish',
    badgeBg: '#FDF2DD',
    badgeText: '#D86B02',
    style: { bottom: '2%', right: '2%' },
  },
] as const;

export const FEATURE_CARDS = [
  { icon: caseIcon, bg: '#EFF4FF', title: 'Publish Opportunities', desc: 'Post jobs, grants, training, and community programs.' },
  { icon: grantIcon, bg: '#E2F2EB', title: 'Manage Listings', desc: 'Edit, schedule, and track all your published opportunities.' },
  { icon: heartHandshake, bg: '#F0EEFD', title: 'Team Collaboration', desc: 'Invite colleagues to help manage your organization.' },
  { icon: briefcaseIcon, bg: '#FCE7EB', title: 'Reach Analytics', desc: 'See how Canadians discover and engage with your listings.' },
] as const;

export const PROGRESS_ITEMS: Array<{
  label: string;
  sub: string;
  cta?: boolean;
}> = [
  { label: 'Organization registered', sub: 'Great start!' },
  { label: 'Email verified', sub: "You're all set" },
  { label: 'Categories configured', sub: 'Ready to publish' },
  { label: 'Provider dashboard ready', sub: "Let's go!", cta: true },
];

const TOTAL_DURATION = 7000;
const FEED_DELAYS = [0, 700, 1400, 2200, 3200, 4300, 5400];

export function usePersonalizationProgress(onComplete?: () => void) {
  const [feedStep, setFeedStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setFeedStep(0);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 100 / (TOTAL_DURATION / 80);
      });
    }, 80);

    const timers = FEED_DELAYS.map((delay, i) => setTimeout(() => setFeedStep(i), delay));
    const doneTimer = setTimeout(() => {
      setProgress(100);
      onCompleteRef.current?.();
    }, TOTAL_DURATION + 50);

    return () => {
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, []);

  function stepStatus(i: number): 'done' | 'loading' | 'pending' {
    if (i < feedStep) return 'done';
    if (i === feedStep) return 'loading';
    return 'pending';
  }

  return { feedStep, progress, stepStatus };
}

function FeedStepIcon({ status }: { status: 'done' | 'loading' | 'pending' }) {
  if (status === 'done') {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-[#15803D]">
        <Check className="h-4 w-4 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (status === 'loading') {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] border-[#2F66C8] bg-white">
        <Loader2 className="h-4 w-4 animate-spin text-[#2F66C8]" />
      </div>
    );
  }
  return <div className="h-8 w-8 shrink-0 rounded-full border-2 border-[#EEF2F8] bg-white" />;
}

function FeedConnector({ active }: { active?: boolean }) {
  return (
    <div
      className={cn(
        'ml-4 h-12 w-0 border-l-2 border-dashed',
        active ? 'border-[#D1FAE5]' : 'border-[#EEF2F8]',
      )}
    />
  );
}

export function PersonalizationHeading({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="text-center">
        <p className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Setting Up Your</p>
        <p className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Provider</p>
        <p className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Portal</p>
        <p className="mt-2.5 font-sans text-[14px] leading-normal text-[#8C97AD]">
          We&apos;re configuring your dashboard based on your organization type and categories.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0 font-serif text-[60px] leading-[56px] text-[#0F172A]">
        <span>Setting Up Your</span>
        <span className="italic text-[#2F66C8]">Provider</span>
        <span>Portal</span>
      </h1>
      <p className="mt-6 font-sans text-[16px] text-[#8C97AD]">
        We&apos;re configuring your dashboard based on your organization type and categories.
      </p>
    </div>
  );
}

export function MapWithCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('relative w-full overflow-hidden', compact ? 'h-[284px]' : 'h-[632px]')}>
      <Image src={mapBgImg} alt="Canada map" fill className="object-contain" priority />
      {MAP_CARDS.map((card) => (
        <div
          key={card.title}
          className={cn(
            'absolute z-10 flex items-start gap-2.5 rounded-xl border border-[#D9E1EF] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]',
            compact ? 'min-w-[120px] p-2' : 'min-w-[240px] p-5',
          )}
          style={card.style}
        >
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-full',
              compact ? 'h-7 w-7 p-1.5' : 'h-14 w-14 p-3.5',
            )}
            style={{ backgroundColor: card.bg }}
          >
            <Image src={card.icon} alt="" width={compact ? 14 : 28} height={compact ? 14 : 28} className="object-contain" />
          </div>
          <div>
            <p className={cn('font-semibold text-[#0F172A]', compact ? 'text-[10px]' : 'text-[15px]')}>{card.title}</p>
            <p className={cn('text-[#44516A]', compact ? 'text-[9px]' : 'text-[14px]')}>{card.loc}</p>
            <span
              className={cn(
                'mt-1 inline-block rounded px-2 py-0.5 font-bold',
                compact ? 'text-[8px]' : 'text-[10px]',
              )}
              style={{ backgroundColor: card.badgeBg, color: card.badgeText }}
            >
              {card.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LiveFeedPanel({
  stepStatus,
  compact = false,
}: {
  stepStatus: (i: number) => 'done' | 'loading' | 'pending';
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-[#D9E1EF] bg-white',
        compact ? 'p-5' : 'sticky top-24 p-10',
      )}
    >
      <div className="mb-8 inline-flex items-center gap-2 rounded bg-[#EFF4FF] px-1.5 py-1">
        <Image src={start3Icon} alt="" width={16} height={16} className="object-contain" />
        <p className="text-[14px] font-medium text-[#2F66C8]">Live setup feed</p>
      </div>

      <div className="flex flex-col">
        {FEED_STEPS.map((step, i) => {
          const status = stepStatus(i);
          const isLast = i === FEED_STEPS.length - 1;
          return (
            <div key={step.label}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-5">
                  <FeedStepIcon status={status} />
                  <div>
                    <p
                      className={cn(
                        'font-semibold',
                        compact ? 'text-[14px]' : 'text-[16px]',
                        status === 'pending' ? 'text-[#8C97AD]' : 'text-[#0F172A]',
                      )}
                    >
                      {step.label}
                    </p>
                    <p
                      className={cn(
                        'mt-1',
                        compact ? 'text-[12px]' : 'text-[14px]',
                        status === 'pending' ? 'text-[#8C97AD]' : 'text-[#44516A]',
                      )}
                    >
                      {step.sub}
                    </p>
                  </div>
                </div>
                {status === 'done' && (
                  <span className={cn('shrink-0 font-medium text-[#15803D]', compact ? 'text-[14px]' : 'text-[16px]')}>
                    Done
                  </span>
                )}
              </div>
              {!isLast && <FeedConnector active={status === 'done'} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProgressBarSection({
  progress,
  compact = false,
}: {
  progress: number;
  compact?: boolean;
}) {
  const pct = Math.round(Math.min(progress, 100));

  return (
    <div
      className={cn(
        'flex items-center gap-5 rounded-[10px] border border-[#D9E1EF] bg-white',
        compact ? 'p-4' : 'p-5',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-[#EFF4FF]',
          compact ? 'h-16 w-16' : 'h-[100px] w-[100px]',
        )}
      >
        <Image src={star2Icon} alt="" width={compact ? 28 : 40} height={compact ? 28 : 40} className="object-contain" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn('font-semibold text-[#0F172A]', compact ? 'text-[14px]' : 'text-[16px]')}>
          Setting up your provider dashboard…
        </p>
        <div className="mt-3 flex items-center gap-4">
          <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-[#EEF2F8]">
            <div
              className="h-full rounded-full bg-[#2F66C8] transition-all duration-200 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className={cn('shrink-0 font-semibold text-[#0F172A]', compact ? 'text-[14px]' : 'text-[18px]')}>
            {pct}%
          </span>
        </div>
        <p className={cn('mt-2 text-[#44516A]', compact ? 'text-[12px]' : 'text-[14px]')}>
          This usually takes less than 10 seconds.
        </p>
      </div>
    </div>
  );
}

export function VerificationShieldFooter({
  variant = 'desktop',
  className,
}: {
  variant?: 'desktop' | 'mobile';
  className?: string;
}) {
  if (variant === 'mobile') {
    return (
      <div className={cn('rounded-[10px] bg-[#EFF4FF] p-5', className)}>
        <div className="flex items-start gap-3">
          <Image src={shieldCheckIcon} alt="" width={40} height={40} className="shrink-0 object-contain" />
          <p className="text-[14px] leading-normal text-[#44516A]">
            Only verified organizations can publish opportunities on Anchor.
          </p>
        </div>
        <Link
          href="/privacy"
          className="mt-5 inline-flex items-center gap-3 text-[14px] text-[#2F66C8] transition-opacity hover:opacity-75"
        >
          Learn more about our Privacy Policy
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src={shieldCheckIcon} alt="" width={24} height={24} className="shrink-0 object-contain" />
          <p className="text-[16px] text-[#44516A]">Only verified organizations can publish opportunities on Anchor.</p>
        </div>
        <Link
          href="/privacy"
          className="inline-flex items-center gap-3 text-[16px] text-[#2F66C8] transition-opacity hover:opacity-75"
        >
          Learn more about our Privacy Policy
          <ArrowRight className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

export function WelcomeHero({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className={cn('relative w-full', compact ? 'h-[140px]' : 'h-[270px]')}>
        <Image src={validBgImg} alt="" fill className="object-cover object-center" priority />
      </div>
      <div
        className={cn(
          'relative -mt-16 flex items-center justify-center rounded-full bg-[#F1FFEE]',
          compact ? 'h-[140px] w-[140px]' : 'h-[200px] w-[200px]',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-[#D1FAE5]',
            compact ? 'h-[112px] w-[112px]' : 'h-[160px] w-[160px]',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center rounded-full bg-[#15803D]',
              compact ? 'h-14 w-14' : 'h-20 w-20',
            )}
          >
            <Check className={cn('text-white', compact ? 'h-7 w-7' : 'h-10 w-10')} strokeWidth={3} />
          </div>
        </div>
      </div>
      <h1
        className={cn(
          'mt-6 text-center font-serif text-[#0F172A]',
          compact ? 'text-[48px] leading-[56px]' : 'text-[60px] leading-[56px]',
        )}
      >
        Welcome to Anchor Provider! 🎉
      </h1>
      <p
        className={cn(
          'mt-4 max-w-xl text-center font-sans text-[#8C97AD]',
          compact ? 'text-[14px]' : 'text-[16px]',
        )}
      >
        Your organization is verified, your profile is ready, and your provider dashboard is waiting.
      </p>
    </div>
  );
}

export function OrganizationActiveCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-[#D9E1EF] bg-white',
        compact ? 'rounded-[10px] p-5' : 'p-5',
      )}
    >
      <div className="inline-flex items-center gap-1.5 rounded bg-[#ECFDF5] px-1.5 py-1">
        <Image src={shieldCheckIcon} alt="" width={16} height={16} className="object-contain" />
        <p className="text-[14px] font-medium text-[#15803D]">Your organization is now active.</p>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <div className={cn('relative shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-sm', compact ? 'h-20 w-20' : 'h-28 w-28')}>
          <Image src={orgLogoImg} alt="Organization logo" fill className="object-contain p-2" />
        </div>
        <div className="min-w-0">
          <p className={cn('font-serif text-[#0F172A]', compact ? 'text-[20px]' : 'text-[36px] leading-[56px]')}>
            {DEFAULT_PROFILE.displayName}
          </p>
          <p className={cn('font-sans text-[#8C97AD]', compact ? 'text-[12px]' : 'text-[14px]')}>
            {DEFAULT_PROFILE.pronounLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PREVIEW_BADGES.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase"
                style={{ background: badge.bg, color: badge.text }}
              >
                <Image src={badge.icon} alt="" width={10} height={10} className="object-contain" />
                {badge.label}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {FOCUS_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium"
                style={{ background: chip.bg, color: chip.text }}
              >
                {chip.label}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 text-[#8C97AD]">
            <Image src={locationPinIcon} alt="" width={compact ? 14 : 16} height={compact ? 14 : 16} />
            <span className={compact ? 'text-[12px]' : 'text-[14px]'}>{DEFAULT_PROFILE.location}</span>
            <Image src={canadaFlagIcon} alt="Canada" width={compact ? 24 : 32} height={compact ? 15 : 20} className="rounded-sm object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use OrganizationActiveCard */
export const ProfileActiveCard = OrganizationActiveCard;

export function OpportunityBanner({ compact = false }: { compact?: boolean }) {
  if (compact) return null;

  return (
    <div className="flex h-[240px] overflow-hidden rounded-[20px] border border-[#EEF2F8] bg-[#EFF4FF]">
      <div className="flex flex-1 items-start gap-5 p-5 md:p-10">
        <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-white">
          <Image src={briefcaseIcon} alt="" width={34} height={34} className="object-contain" />
        </div>
        <div>
          <p className="font-serif text-[28px] leading-[1.4] text-[#0F172A]">
            Your publishing tools are ready.
          </p>
          <p className="mt-3 text-[16px] text-[#8C97AD]">
            Based on your categories, you can start posting opportunities to Canadians today.
          </p>
        </div>
      </div>
      <div className="relative hidden w-[370px] shrink-0 md:block">
        <Image src={plainBg2Img} alt="Toronto skyline" fill className="object-cover" />
      </div>
    </div>
  );
}

function ProgressChecklistItem({
  item,
  index,
  compact,
}: {
  item: { label: string; sub: string; cta?: boolean };
  index: number;
  compact?: boolean;
}) {
  return (
    <div className="flex gap-5">
      {item.cta ? (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-[#2F66C8] text-[10.5px] font-semibold text-white">
          {index + 1}
        </div>
      ) : (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-[#15803D]">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      )}
      <div>
        <p
          className={cn(
            'font-medium',
            compact ? 'text-[14px]' : 'text-[16px]',
            item.cta ? 'font-semibold text-[#0F172A]' : 'text-[#44516A]',
          )}
        >
          {item.label}
        </p>
        <p className={cn('mt-1', compact ? 'text-[12px]' : 'text-[14px]', item.cta ? 'text-[#2F66C8]' : 'text-[#44516A]')}>
          {item.sub}
        </p>
      </div>
    </div>
  );
}

export function FeatureGridWithProgress({
  compact = false,
  showDescriptions = true,
}: {
  compact?: boolean;
  showDescriptions?: boolean;
}) {
  return (
    <div className={cn('rounded-[20px] border border-[#D9E1EF] bg-white', compact ? 'rounded-[10px] p-5' : 'p-10')}>
      <p
        className={cn(
          'text-center font-semibold text-[#0F172A]',
          compact ? 'text-[16px]' : 'text-[20px] leading-[1.6]',
        )}
      >
        Here&apos;s what&apos;s waiting for your organization
      </p>

      <div className={cn('grid grid-cols-2 gap-3', compact ? 'mt-5' : 'mt-10 gap-5')}>
        {FEATURE_CARDS.map((card) => (
          <div
            key={card.title}
            className={cn(
              'flex flex-col items-center rounded-[10px] border border-[#D9E1EF] bg-white text-center',
              compact ? 'gap-3 p-5' : 'gap-5 p-5',
            )}
          >
            <div
              className={cn(
                'flex items-center justify-center rounded-full',
                compact ? 'h-[60px] w-[60px] p-4' : 'h-20 w-20 p-5',
              )}
              style={{ backgroundColor: card.bg }}
            >
              <Image src={card.icon} alt="" width={compact ? 30 : 40} height={compact ? 30 : 40} className="object-contain" />
            </div>
            <p className={cn('font-semibold text-[#0F172A]', compact ? 'text-[14px]' : 'text-[16px]')}>{card.title}</p>
            {showDescriptions && !compact && (
              <p className="text-[14px] leading-normal text-[#44516A]">{card.desc}</p>
            )}
          </div>
        ))}
      </div>

      <div className={cn('border-t border-[#EEF2F8]', compact ? 'mt-5 pt-5' : 'mt-10 pt-10')}>
        {!compact && (
          <p className="mb-6 text-center text-[16px] font-medium text-[#0F172A]">Your progress</p>
        )}
        <div className="flex flex-col">
          {PROGRESS_ITEMS.map((item, i) => {
            const isLast = i === PROGRESS_ITEMS.length - 1;
            return (
              <div key={item.label}>
                <ProgressChecklistItem item={item} index={i} compact={compact} />
                {!isLast && (
                  <div className="ml-3 h-8 border-l-2 border-dashed border-[#D1FAE5]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PreferencesFooter({
  variant = 'desktop',
  className,
}: {
  variant?: 'desktop' | 'mobile';
  className?: string;
}) {
  if (variant === 'mobile') {
    return (
      <div className={cn('rounded-[10px] bg-[#EFF4FF] p-5', className)}>
        <div className="flex items-center gap-3">
          <Image src={lockIcon} alt="" width={24} height={24} className="shrink-0 object-contain" />
          <p className="text-[14px] text-[#44516A]">Your organization profile can be updated anytime in settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-[10px] bg-[#EFF4FF] p-5', className)}>
      <div className="flex items-center gap-3 text-[16px] text-[#44516A]">
        <Image src={lockIcon} alt="" width={24} height={24} className="shrink-0 object-contain" />
        Your organization profile can be updated anytime in settings.
      </div>
    </div>
  );
}
