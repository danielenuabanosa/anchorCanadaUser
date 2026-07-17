'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BellRing,
  Check,
  ChevronDown,
  Clock,
  Copy,
  FolderClosed,
  Minus,
  Plus,
  Rocket,
  Send,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

import briefcaseIcon from '@assets/icons/briefcase.png';
import activationHeroDesktop from '@assets/images/activation-hero-desktop.png';
import activationHeroMobile from '@assets/images/activation-hero-mobile.png';
import { cn } from '@/lib/utils';

export const ACTIVATION_INFO_MESSAGE =
  'Thank you for helping create opportunities and stronger communities across Canada 💙';

export const ACTIVATION_HEADING = {
  line1: 'Your Organization Is',
  line2: 'Ready 🎉',
  description: [
    'Your provider workspace has been successfully created and your organization is now part of the Anchor ecosystem.',
    'You can now publish opportunities, manage applications, and collaborate with your team.',
  ],
};

export const ACTIVATION_FEATURES = [
  {
    title: 'Publish Opportunities',
    description: 'Create and manage jobs, grants, programs and community initiatives.',
    icon: briefcaseIcon,
    iconBg: '#E3EBFE',
    href: '/opportunities/create/category',
  },
  {
    title: 'Manage Applications',
    description: 'Review applicants, track submissions, and organize workflows.',
    icon: null,
    lucideIcon: FolderClosed,
    iconBg: '#E3F3E8',
    href: '/applications',
  },
  {
    title: 'Collaborate With Your Team',
    description: 'Assign roles, manage tasks, and operate efficiently together.',
    icon: null,
    lucideIcon: Users,
    iconBg: '#EBE5FC',
    href: '/dashboard',
  },
] as const;

export const ORGANIZATION_STATUS_ROWS = [
  { label: 'Organization Status', value: 'Active', tone: 'success' as const },
  { label: 'Verification Status', value: 'Under Review', tone: 'warning' as const },
  { label: 'Team Members Added', value: '4', tone: 'neutral' as const },
  { label: 'Workspace Created', value: 'May 20, 2026', tone: 'neutral' as const },
];

export const RECOMMENDED_STEPS = [
  {
    title: 'Complete your provider profile',
    description: 'Add branding, contact details, and organization information.',
  },
  {
    title: 'Publish your first opportunity',
    description: 'Start reaching qualified applicants across Canada.',
  },
  {
    title: 'Invite additional team members',
    description: 'Collaborate with recruiters and coordinators.',
  },
  {
    title: 'Explore provider analytics',
    description: 'Track views, applications, and engagement trends.',
  },
];

export function ActivationHeading({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="text-center">
        <p className="font-serif text-[48px] leading-[56px] text-[#0F172A]">{ACTIVATION_HEADING.line1}</p>
        <p className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">{ACTIVATION_HEADING.line2}</p>
        <div className="mt-2.5 space-y-1 text-[14px] leading-normal text-[#8C97AD]">
          {ACTIVATION_HEADING.description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="flex flex-wrap items-baseline justify-center gap-x-2.5">
        <span className="font-serif text-[60px] leading-[56px] text-[#0F172A]">{ACTIVATION_HEADING.line1}</span>
        <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">
          {ACTIVATION_HEADING.line2}
        </span>
      </h1>
      <div className="mx-auto mt-6 max-w-[856px] space-y-1 text-[16px] leading-normal text-[#8C97AD]">
        {ACTIVATION_HEADING.description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

/** Figma hero block — composite illustration with team, stats, and dashboard preview. */
export function ActivationHeroIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-[#EFF4FF]',
        compact ? 'h-[371px]' : 'h-[371px]',
      )}
    >
      <Image
        src={compact ? activationHeroMobile : activationHeroDesktop}
        alt="Your organization workspace is ready"
        fill
        className="object-cover object-center"
        priority
        sizes={compact ? '400px' : '1160px'}
      />
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  lucideIcon: LucideIcon,
  iconBg,
  href,
  compact = false,
}: {
  title: string;
  description: string;
  icon?: typeof briefcaseIcon | null;
  lucideIcon?: typeof Users;
  iconBg: string;
  href: string;
  compact?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#EEF2F8] bg-white">
      <div className={cn('flex flex-col items-center text-center', compact ? 'gap-5 p-[30px]' : 'gap-5 p-[30px]')}>
        <div
          className="flex h-[100px] w-[100px] items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          {icon ? (
            <Image src={icon} alt="" width={40} height={40} className="object-contain" />
          ) : LucideIcon ? (
            <LucideIcon className="h-10 w-10 text-[#2F66C8]" strokeWidth={1.75} />
          ) : null}
        </div>
        <div className="w-full">
          <p className="font-serif text-[28px] leading-[56px] text-[#0F172A]">{title}</p>
          <p className="text-[16px] leading-normal text-[#44516A]">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-3 py-2.5 text-[16px] font-medium text-[#2F66C8] transition-colors hover:text-[#2454A4]"
        >
          Learn more
          <ArrowRight className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

export function ActivationFeatureCards({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col gap-5">
        {ACTIVATION_FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} compact />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      {ACTIVATION_FEATURES.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}

function StatusValue({ value, tone }: { value: string; tone: 'success' | 'warning' | 'neutral' }) {
  if (tone === 'success') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#15803D]">
        <span className="h-3 w-3 rounded-full bg-[#22C55E]" />
        {value}
      </span>
    );
  }
  if (tone === 'warning') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#C2410C]">
        <Clock className="h-4 w-4" />
        {value}
      </span>
    );
  }
  return <span className="text-[14px] font-medium text-[#0F172A]">{value}</span>;
}

export function OrganizationStatusPanel({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(!compact);

  const header = (
    <div className="flex items-center gap-[18px]">
      <ShieldCheck className="h-6 w-6 shrink-0 text-[#2F66C8]" />
      <h3 className="text-[16px] font-semibold leading-[1.8] text-[#0F172A]">Organization Status</h3>
    </div>
  );

  const rows = (
    <div className={cn('space-y-0', compact ? 'mt-5 space-y-0 border-t border-[#EEF2F8] pt-5' : 'mt-[30px]')}>
      {ORGANIZATION_STATUS_ROWS.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 py-2.5">
          <span className="text-[14px] text-[#44516A]">{row.label}</span>
          <StatusValue value={row.value} tone={row.tone} />
        </div>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-5 py-[30px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3"
        >
          {header}
          <ChevronDown className={cn('h-6 w-6 shrink-0 text-[#44516A] transition-transform', open && 'rotate-180')} />
        </button>
        {open ? rows : null}
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-5 py-[30px]">
      {header}
      {rows}
    </div>
  );
}

export function RecommendedStepsPanel({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(!compact);

  const header = (
    <div className="flex items-center gap-[18px]">
      <Rocket className="h-6 w-6 shrink-0 text-[#2F66C8]" />
      <h3 className="text-[16px] font-semibold leading-[1.8] text-[#0F172A]">Recommended First Steps</h3>
    </div>
  );

  const steps = (
    <div className={cn(compact ? 'mt-5 border-t border-[#EEF2F8] pt-5' : 'mt-[30px]', 'space-y-5')}>
      {RECOMMENDED_STEPS.map((step) => (
        <div key={step.title} className="flex gap-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-[#22C55E]">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </span>
          <div>
            <p className="text-[14px] font-medium text-[#0F172A]">{step.title}</p>
            <p className="mt-1 text-[12px] leading-normal text-[#8C97AD]">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-5 py-[30px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3"
        >
          {header}
          <ChevronDown className={cn('h-6 w-6 shrink-0 text-[#44516A] transition-transform', open && 'rotate-180')} />
        </button>
        {open ? steps : null}
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-5 py-[30px]">
      {header}
      {steps}
    </div>
  );
}

export function ActivationActionButtons({
  onDashboard,
  onCreateOpportunity,
  compact = false,
}: {
  onDashboard: () => void;
  onCreateOpportunity?: () => void;
  compact?: boolean;
}) {
  const router = useRouter();

  function handleCreate() {
    if (onCreateOpportunity) {
      onCreateOpportunity();
      return;
    }
    router.push('/opportunities/create/category');
  }

  const createButton = (
    <button
      type="button"
      onClick={handleCreate}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white text-[#2F66C8] transition-colors hover:bg-[#EFF4FF]',
        compact ? 'h-12 w-full px-6 text-[14px]' : 'h-[52px] px-6 text-[16px]',
      )}
    >
      Create First Opportunity
      <Plus className="h-4 w-4" />
    </button>
  );

  const dashboardButton = (
    <button
      type="button"
      onClick={onDashboard}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-[6px] bg-[#2F66C8] text-white transition-colors hover:bg-[#2454A4]',
        compact ? 'h-12 w-full px-6 text-[14px]' : 'h-[52px] px-6 text-[16px]',
      )}
    >
      Go to Provider Dashboard
      <ArrowRight className="h-4 w-4" />
    </button>
  );

  if (compact) {
    return (
      <div className="flex w-full flex-col gap-5">
        {dashboardButton}
        {createButton}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {createButton}
      {dashboardButton}
    </div>
  );
}

/** Decorative browser preview used inside the loading/personalization phase on desktop. */
export function ActivationDashboardPreview({ compact = false }: { compact?: boolean }) {
  const stats = [
    { label: 'Opportunities', value: '12', sub: 'Active Listings' },
    { label: 'Applications', value: '35', sub: 'New this week' },
    { label: 'Team Members', value: '4', sub: 'Active Members' },
  ];

  const activity = [
    { label: 'New application received', time: '2m ago', icon: BellRing, bg: '#FFF2EC' },
    { label: 'Opportunity published', time: '1h ago', icon: Send, bg: '#FFF7E4' },
    { label: 'Team member invited', time: '3h ago', icon: Users, bg: '#E1FFF9' },
  ];

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-[#EEF2F8] bg-white shadow-[0_4px_6px_rgba(0,0,0,0.08)]',
        compact ? 'w-full' : 'w-[444px]',
      )}
    >
      <div className="flex items-center justify-between bg-[#122F66] px-4 py-4">
        <div className="h-7 w-7 rounded bg-white/10" />
        <div className="flex items-center gap-3 text-white/80">
          <Minus className="h-3.5 w-3.5" />
          <Copy className="h-3.5 w-3.5" />
          <X className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="space-y-5 bg-[#F8FAFC] p-4">
        <p className="text-[15px] font-semibold text-[#0F172A]">Welcome Back!</p>
        <div className="flex gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 flex-1 rounded-lg border border-[#EEF2F8] bg-white p-3 shadow-[0_2px_3px_rgba(0,0,0,0.05)]"
            >
              <p className="truncate text-[11px] font-medium text-[#44516A]">{stat.label}</p>
              <p className="text-[26px] font-semibold text-[#0F172A]">{stat.value}</p>
              <p className="truncate text-[10px] text-[#8C97AD]">{stat.sub}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[#EEF2F8] bg-white p-4">
          <p className="mb-3 text-[13px] font-semibold text-[#0F172A]">Recent Activity</p>
          <div className="space-y-2">
            {activity.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-2 py-1">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: item.bg }}
                  >
                    <item.icon className="h-3.5 w-3.5 text-[#44516A]" />
                  </span>
                  <span className="truncate text-[11px] font-medium text-[#44516A]">{item.label}</span>
                </div>
                <span className="shrink-0 text-[11px] text-[#8C97AD]">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <span className="rounded bg-[#2F66C8] px-4 py-2 text-[11px] text-white">Go to Dashboard</span>
        </div>
      </div>
    </div>
  );
}
