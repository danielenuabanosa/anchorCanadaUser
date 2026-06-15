'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import {
  ArrowLeft, MapPin, Bookmark, Share2, Check,
  CalendarDays, Users, Clock, Briefcase, ChevronDown,
  ChevronRight, X, Mail, Copy, Lock, Heart,
  PenTool, Hourglass, UserStar, FileUser, ArrowRight,
  Link2, MessageCircle, Camera, MoreHorizontal,
} from 'lucide-react';
import shopifyLogo from '@assets/images/w1.png';
import { ApplyDesktopOverlay } from '../apply/_components/DesktopView';
import { buildApplyHref } from '../apply/_components/useApplyRouting';

type Tab = 'overview' | 'requirements' | 'benefits' | 'organization' | 'faqs';
type ApplyFlow = 'internal' | 'external' | 'express';

const OPP = {
  id: '1',
  refId: '#APP-2026-00231',
  applyFlow: 'internal' as ApplyFlow,
  matchPct: 94,
  category: 'Internship',
  title: 'UX Design Intern',
  company: 'Shopify',
  verified: true,
  location: 'Toronto, Ontario, Canada',
  workType: 'Hybrid',
  pay: '$20 / hr',
  tags: [
    { label: 'Internship', icon: Briefcase },
    { label: 'Entry Level', icon: UserStar },
    { label: 'Product Design', icon: PenTool },
    { label: 'May – Aug 2026', icon: Hourglass },
  ],
  closesInDays: 12,
  closesDate: 'May 21, 2026',
  applicants: 288,
  shortlisted: 18,
  postedDaysAgo: 4,
  postedDate: 'May 5, 2026',
  aboutRole: `We're looking for a curious and creative UX Design Intern to join our design team for the Summer 2026 term. You'll work on real projects that impact millions of entrepreneurs worldwide. This is a hands-on opportunity to grow your skills, collaborate with designers and engineers, and help shape the future of commerce.`,
  whatYoullDo: [
    'Assist in user research and usability testing.',
    'Create wireframes, prototypes, and user flows',
    'Collaborate with product managers and engineers',
    'Contribute to design systems and UI components',
    'Help improve the merchant onboarding experience',
  ],
  whoCanApply: 'Students or recent graduates pursuing a degree in Design, HCI, or related field.',
  benefits: [
    'Paid Internships ($20 / hr)',
    'Mentorship (Learn from industry experts)',
    'Flexible Schedule (Hybrid work model)',
    'Professional Growth (Develop your career)',
    'Team Events (Fun & Inclusive)',
  ],
  jobDetails: [
    { label: 'Job Function', value: 'Design' },
    { label: 'Industries', value: 'E-commerce, Technology' },
    { label: 'Work Arrangement', value: 'Hybrid' },
    { label: 'Career Level', value: 'Entry Level' },
    { label: 'Salary', value: '$20 / hr' },
    { label: 'Visa Sponsorship', value: 'Not Available' },
  ],
  requirements: [
    { label: 'Resume', required: true, icon: FileUser },
    { label: 'Portfolio / Work Samples', required: true, icon: Briefcase },
    { label: 'Cover Letter', required: false, icon: Bookmark },
    { label: 'Availability', required: true, icon: Clock },
  ],
  similar: [
    { id: '2', category: 'Internship', title: 'Product Design Intern', company: 'Stripe', verified: true, workType: 'Hybrid', location: 'Toronto, ON', pay: '$20 / hr', closesInDays: 8, matchPct: 92, logo: shopifyLogo },
    { id: '3', category: 'Internship', title: 'UX Research Intern', company: 'Uber', verified: true, workType: 'On-site', location: 'Toronto, ON', pay: '$20 / hr', closesInDays: 10, matchPct: 90, logo: shopifyLogo },
    { id: '4', category: 'Internship', title: 'Interaction Design Intern', company: 'Google', verified: true, workType: 'Hybrid', location: 'Waterloo, ON', pay: '$20 / hr', closesInDays: 15, matchPct: 89, logo: shopifyLogo },
  ],
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'requirements', label: 'Requirements' },
  { key: 'benefits', label: 'Benefits' },
  { key: 'organization', label: 'Organization' },
  { key: 'faqs', label: 'FAQs' },
];

const FAQS = [
  { q: 'Is this position remote?', a: 'This is a hybrid position based in Toronto, ON. You are expected to work on-site at least 2 days per week.' },
  { q: 'What is the application deadline?', a: `The deadline is ${OPP.closesDate}. We recommend applying early as positions fill quickly.` },
  { q: 'Do I need to be a Canadian citizen?', a: 'Applicants must have valid work authorization in Canada. We do not offer visa sponsorship for this role.' },
  { q: 'How long does the hiring process take?', a: 'Typically 2–3 weeks from application to offer. You will hear back within 5 business days of applying.' },
];

function VerifiedBadge() {
  return (
    <svg className="h-3 w-3 shrink-0 text-[#2F66C8]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

function BrandCheck() {
  return (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[9px] bg-[#2F66C8]">
      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-serif text-2xl text-[#0F172A]">{children}</h3>;
}

function StatCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-3.5 rounded-[10px] border border-[#EEF2F8] bg-white p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#EEF2F8] bg-white">
        <Icon className="h-5 w-5 text-[#44516A]" />
      </div>
      <div>
        <p className="text-base font-medium text-[#0F172A]">{title}</p>
        <p className="text-sm text-[#44516A]">{subtitle}</p>
      </div>
    </div>
  );
}

function ShareModal({
  open,
  onClose,
  opp,
  opportunityId,
}: {
  open: boolean;
  onClose: () => void;
  opp: typeof OPP;
  opportunityId: string;
}) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/opportunities/${opportunityId}`
      : `https://anchorcanada.ca/opportunities/${opportunityId}`;

  const shareText = `${opp.title} at ${opp.company}`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const socialOptions = [
    {
      label: 'LinkedIn',
      bg: 'bg-[#E7F1FD]',
      icon: <Link2 className="h-9 w-9 text-[#0A66C2]" />,
      onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank'),
    },
    {
      label: 'Email',
      bg: 'bg-[#EEEBFD]',
      icon: <Mail className="h-9 w-9 text-[#7C3AED]" />,
      onClick: () => window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`),
    },
    {
      label: 'WhatsApp',
      bg: 'bg-[#E0F6EE]',
      icon: <MessageCircle className="h-9 w-9 text-[#25D366]" />,
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank'),
    },
    {
      label: 'Instagram',
      bg: 'bg-[#F6E0EE]',
      icon: <Camera className="h-9 w-9 text-[#E1306C]" />,
      onClick: copyLink,
    },
    {
      label: 'More',
      bg: 'bg-[#ECEEF2]',
      icon: <MoreHorizontal className="h-9 w-9 text-[#44516A]" />,
      onClick: () => {
        if (navigator.share) navigator.share({ title: shareText, url: shareUrl });
        else copyLink();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0F172A]/50" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-[732px] overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between border-b border-[#EEF2F8] p-[26px]">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-medium text-[#0F172A]">Share Opportunity</h3>
            <p className="text-sm leading-relaxed text-[#44516A]">Help someone discover the opportunity</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] transition-colors hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-10 px-[26px] py-10">
          <div className="w-full rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-md bg-[#F1EDFF] px-2.5 py-1.5 text-xs font-medium text-[#4A2BF9]">
                {opp.category}
              </span>
              <span className="text-xs text-[#2F66C8] underline">{opp.refId}</span>
            </div>
            <div className="flex items-end gap-5">
              <Image src={shopifyLogo} alt={opp.company} width={60} height={68} className="h-[68px] w-[60px] shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-medium text-[#0F172A]">{opp.title}</p>
                <div className="mt-2 flex items-center gap-0.5">
                  <span className="text-xs text-[#44516A]">{opp.company}</span>
                  {opp.verified && <VerifiedBadge />}
                </div>
                <p className="mt-1.5 text-xs text-[#44516A]">
                  {opp.workType} • {opp.location}
                </p>
              </div>
              <div className="shrink-0 text-right text-xs">
                <span className="text-[#8C97AD]">Deadline: </span>
                <span className="text-[#B91C1C]">{opp.closesDate}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            {socialOptions.map(({ label, bg, icon, onClick }) => (
              <button key={label} onClick={onClick} className="flex w-[100px] flex-col items-center gap-2.5">
                <span className={`flex h-[72px] w-[72px] items-center justify-center rounded-full ${bg}`}>
                  {icon}
                </span>
                <span className="text-base text-[#0F172A]">{label}</span>
              </button>
            ))}
          </div>

          <div className="w-full">
            <p className="mb-2.5 text-base font-medium text-[#0F172A]">Link</p>
            <div className="flex h-[53px] items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-[#F8FAFC] pl-4">
              <span className="truncate text-base text-[#8C97AD]">{shareUrl}</span>
              <button
                onClick={copyLink}
                className="flex h-[54px] shrink-0 items-center gap-2.5 rounded-md border border-[#D9E1EF] bg-white px-4 text-base font-medium text-[#2F66C8] transition-colors hover:bg-[#EFF4FF]"
              >
                <Copy className="h-[18px] w-[18px]" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[71px] items-center justify-center border-t border-[#EEF2F8] bg-[#F8FAFC] px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-white">
              <Lock className="h-4 w-4 text-[#8C97AD]" />
            </span>
            <p className="text-sm text-[#44516A]">Shared links open the opportunity details page directly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimilarCard({ item }: { item: (typeof OPP.similar)[0] }) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col gap-5 rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-[#FDF2E5] px-2.5 py-1.5 text-xs font-medium text-[#F7620E]">
          {item.category}
        </span>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setSaved((v) => !v)}
            className="rounded-md border border-[#D9E1EF] bg-white p-3 text-[#44516A] transition-colors hover:border-[#2F66C8]"
            aria-label="Save"
          >
            <Bookmark className={`h-5 w-5 ${saved ? 'fill-[#2F66C8] text-[#2F66C8]' : ''}`} />
          </button>
          <button
            onClick={() => setLiked((v) => !v)}
            className="rounded-md border border-[#D9E1EF] bg-white p-3 text-[#44516A] transition-colors hover:border-[#2F66C8]"
            aria-label="Like"
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Image src={item.logo} alt={item.company} width={60} height={61} className="h-[61px] w-[60px] object-contain" />
        <div className="min-w-0 flex-1">
          <Link href={`/opportunities/${item.id}`} className="text-lg font-medium text-[#0F172A] hover:text-[#2F66C8]">
            {item.title}
          </Link>
          <div className="mt-2 flex items-center gap-0.5">
            <span className="text-xs text-[#44516A]">{item.company}</span>
            {item.verified && <VerifiedBadge />}
          </div>
          <p className="mt-1.5 text-xs text-[#44516A]">
            {item.workType} • {item.location} • {item.pay}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#8C97AD]">Closes in {item.closesInDays} days</span>
        <span className="rounded-sm bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">{item.matchPct}% Match</span>
      </div>
    </div>
  );
}

export default function OpportunityDesktop() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showAllReqs, setShowAllReqs] = useState(false);

  const opp = OPP;
  const applyHref = buildApplyHref(params.id, opp.applyFlow);
  const isApplying = searchParams.get('apply') === '1';

  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-2.5 text-sm font-medium text-[#2F66C8] transition-colors hover:text-[#2454A4]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to results
      </Link>

      {/* Hero */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <Image src={shopifyLogo} alt={opp.company} width={100} height={114} className="h-[114px] w-[100px] shrink-0 object-contain" />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <span className="rounded-sm bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">{opp.matchPct}% Match</span>
                <span className="rounded-sm bg-[#F1EDFF] px-1 py-0.5 text-xs text-[#4A2BF9]">{opp.category}</span>
              </div>
              <h1 className="font-serif text-[36px] leading-none text-[#0F172A]">{opp.title}</h1>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-[#44516A]">{opp.company}</span>
                  {opp.verified && <VerifiedBadge />}
                </div>
                <div className="flex items-center gap-4 text-sm text-[#44516A]">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {opp.location}
                  </span>
                  <span>•</span>
                  <span>{opp.workType}</span>
                  <span>•</span>
                  <span>{opp.pay}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-[476px] shrink-0 items-center gap-2.5">
            <Link
              href={applyHref}
              className="flex flex-1 items-center justify-center rounded-md bg-[#2F66C8] px-4 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#2454A4]"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setSaved((v) => !v)}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-md border px-4 py-2.5 text-base font-medium transition-colors ${
                saved
                  ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                  : 'border-[#D9E1EF] bg-white text-[#0F172A] hover:border-[#2F66C8]'
              }`}
            >
              <Bookmark className={`h-[18px] w-[18px] ${saved ? 'fill-[#2F66C8]' : ''}`} />
              Save Search
            </button>
            <button
              onClick={() => setShowShare(true)}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-md border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A] transition-colors hover:border-[#2F66C8]"
            >
              <Share2 className="h-[18px] w-[18px]" />
              Share
            </button>
          </div>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {opp.tags.map(({ label, icon: Icon }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded bg-[#EFF4FF] px-2 py-1 text-sm text-[#2F66C8]">
              <Icon className="h-4 w-4" />
              {label}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex max-w-[800px] gap-5">
          <StatCard icon={CalendarDays} title={`Closes in ${opp.closesInDays} days`} subtitle={opp.closesDate} />
          <StatCard icon={Users} title={`${opp.applicants} Applicants`} subtitle={`${opp.shortlisted} shortlisted`} />
          <StatCard icon={Clock} title={`Posted ${opp.postedDaysAgo} days ago`} subtitle={opp.postedDate} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-10">
        <div className="flex gap-2.5 border-b border-[#D9E1EF]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-3.5 text-base font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-b border-[#2F66C8] text-[#2F66C8]'
                  : 'text-[#0F172A] hover:text-[#2F66C8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {activeTab === 'overview' && (
          <div className="flex items-start gap-5">
            <div className="flex-1 rounded-[10px] border border-[#EEF2F8] bg-white">
              <div className="border-b border-[#EEF2F8] p-5">
                <SectionHeading>About the Role</SectionHeading>
                <p className="mt-2.5 text-sm leading-[1.8] text-[#44516A]">{opp.aboutRole}</p>
              </div>
              <div className="border-b border-[#EEF2F8] p-5">
                <SectionHeading>What You&apos;ll Do</SectionHeading>
                <ul className="mt-2.5 flex flex-col gap-2.5">
                  {opp.whatYoullDo.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-sm text-[#44516A]">
                      <BrandCheck />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-b border-[#EEF2F8] p-5">
                <SectionHeading>Who Can Apply</SectionHeading>
                <p className="mt-2.5 text-sm leading-[1.8] text-[#44516A]">{opp.whoCanApply}</p>
              </div>
              <div className="p-5">
                <SectionHeading>Benefits &amp; Perks</SectionHeading>
                <ul className="mt-2.5 flex flex-col gap-2.5">
                  {opp.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-4 text-sm text-[#44516A]">
                      <BrandCheck />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex w-[569px] shrink-0 flex-col gap-5">
              <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                <SectionHeading>Job Details</SectionHeading>
                <div className="mt-2.5 flex flex-col">
                  {opp.jobDetails.map(({ label, value }) => (
                    <div key={label} className="flex h-10 items-center gap-4 text-sm">
                      <span className="flex-1 text-[#44516A]">{label}</span>
                      <span className="flex-1 text-right font-medium text-[#0F172A]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
                <div className="border-b border-[#EEF2F8] p-5">
                  <SectionHeading>Application Requirements</SectionHeading>
                  <div className="mt-2.5 flex flex-col">
                    {(showAllReqs ? opp.requirements : opp.requirements.slice(0, 3)).map(({ label, required, icon: Icon }) => (
                      <div key={label} className="flex h-11 items-center gap-4">
                        <div className="flex flex-1 items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#EEF2F8] bg-white">
                            <Icon className="h-4 w-4 text-[#44516A]" />
                          </span>
                          <span className="text-sm text-[#44516A]">{label}</span>
                        </div>
                        <span className="flex-1 text-right text-sm text-[#8C97AD]">{required ? 'Required' : 'Optional'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setShowAllReqs((v) => !v)}
                  className="flex w-full items-center justify-center gap-2.5 p-5 text-sm font-medium text-[#2F66C8] hover:text-[#2454A4]"
                >
                  {showAllReqs ? 'Show less' : 'View all requirements'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllReqs ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link
                href={applyHref}
                className="flex items-center justify-center gap-2 rounded-md bg-[#2F66C8] py-3 text-base font-medium text-white transition-colors hover:bg-[#2454A4]"
              >
                Apply Now
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="max-w-2xl rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <p className="mb-4 text-sm text-[#44516A]">Please ensure you have the following ready before applying:</p>
            <div className="flex flex-col gap-3">
              {[
                ...opp.requirements,
                { label: '2 Application Questions', required: true, icon: FileUser },
                { label: 'Availability Information', required: true, icon: Clock },
              ].map(({ label, required, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#EEF2F8] bg-white">
                    <Icon className="h-4 w-4 text-[#44516A]" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-[#0F172A]">{label}</span>
                  <span className={`text-sm ${required ? 'text-[#8C97AD]' : 'text-[#8C97AD]'}`}>
                    {required ? 'Required' : 'Optional'}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={applyHref}
              className="mt-5 flex items-center justify-center gap-2 rounded-md bg-[#2F66C8] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2454A4]"
            >
              Start Application
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="max-w-2xl rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="flex flex-col gap-3">
              {opp.benefits.map((b) => (
                <div key={b} className="flex items-center gap-4 rounded-[10px] border border-[#EEF2F8] p-4">
                  <BrandCheck />
                  <span className="text-sm text-[#44516A]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'organization' && (
          <div className="max-w-2xl rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="mb-4 flex items-center gap-4 rounded-[10px] border border-[#EEF2F8] p-4">
              <Image src={shopifyLogo} alt={opp.company} width={56} height={56} className="h-14 w-14 object-contain" />
              <div>
                <p className="font-semibold text-[#0F172A]">{opp.company}</p>
                <p className="text-sm text-[#8C97AD]">E-commerce · Technology · 10,000+ employees</p>
              </div>
            </div>
            <p className="text-sm leading-[1.8] text-[#44516A]">
              Shopify is a leading global commerce company, providing trusted tools to start, grow, market, and manage a retail business of any size. Shopify makes commerce better for everyone with a platform and services that are engineered for reliability, while delivering a better shopping experience for consumers everywhere.
            </p>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="max-w-2xl flex flex-col gap-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium text-[#0F172A]">
                  {q}
                  <ChevronDown className="h-4 w-4 text-[#8C97AD] transition-transform group-open:rotate-180" />
                </summary>
                <p className="border-t border-[#EEF2F8] px-5 pb-4 pt-3 text-sm leading-relaxed text-[#44516A]">{a}</p>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Similar Opportunities */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#0F172A]">Similar Opportunities</h2>
          <Link href="/opportunities" className="flex items-center gap-3 text-base font-medium text-[#2F66C8] hover:text-[#2454A4]">
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {opp.similar.map((s) => (
            <SimilarCard key={s.id} item={s} />
          ))}
        </div>
      </div>

      <ShareModal open={showShare} onClose={() => setShowShare(false)} opp={opp} opportunityId={params.id} />
      {isApplying && <ApplyDesktopOverlay />}
    </div>
  );
}
