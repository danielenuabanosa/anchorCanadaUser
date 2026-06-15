'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import {
  ArrowLeft, MapPin, Bookmark, Share2, Check,
  CalendarDays, Users, Clock, Briefcase, ChevronDown,
  ChevronRight, X, Mail, Copy, Lock,
  PenTool, Hourglass, UserStar, FileUser,
  Link2, MessageCircle, Camera, MoreHorizontal,
} from 'lucide-react';
import shopifyLogo from '@assets/images/w1.png';
import { ApplyMobileOverlay } from '../apply/_components/MobileView';
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
  requirements: [
    { label: 'Resume', required: true, icon: FileUser },
    { label: 'Portfolio / Work Samples', required: true, icon: Briefcase },
    { label: 'Cover Letter', required: false, icon: Bookmark },
    { label: 'Availability', required: true, icon: Clock },
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
  { q: 'What is the application deadline?', a: `The deadline is ${OPP.closesDate}.` },
  { q: 'Do I need to be a Canadian citizen?', a: 'Applicants must have valid work authorization in Canada.' },
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

function MobileStatCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-3.5 rounded-[10px] border border-[#EEF2F8] bg-white py-2.5 pl-2.5 pr-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#EEF2F8] bg-white">
        <Icon className="h-[18px] w-[18px] text-[#44516A]" />
      </div>
      <div className="whitespace-nowrap">
        <p className="text-sm font-medium text-[#0F172A]">{title}</p>
        <p className="text-xs text-[#44516A]">{subtitle}</p>
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
    { bg: 'bg-[#E7F1FD]', icon: <Link2 className="h-8 w-8 text-[#0A66C2]" />, onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank') },
    { bg: 'bg-[#EEEBFD]', icon: <Mail className="h-8 w-8 text-[#7C3AED]" />, onClick: () => window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`) },
    { bg: 'bg-[#E0F6EE]', icon: <MessageCircle className="h-8 w-8 text-[#25D366]" />, onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank') },
    { bg: 'bg-[#F6E0EE]', icon: <Camera className="h-8 w-8 text-[#E1306C]" />, onClick: copyLink },
    { bg: 'bg-[#ECEEF2]', icon: <MoreHorizontal className="h-8 w-8 text-[#44516A]" />, onClick: () => { if (navigator.share) navigator.share({ title: shareText, url: shareUrl }); else copyLink(); } },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-[#0F172A]/50" onClick={onClose} aria-hidden />
      <div className="relative max-h-[90vh] overflow-y-auto rounded-t-[20px] border border-[#D9E1EF] bg-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between border-b border-[#EEF2F8] p-5">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-medium text-[#0F172A]">Share Opportunity</h3>
            <p className="text-sm leading-relaxed text-[#44516A]">Help someone discover the opportunity</p>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white" aria-label="Close">
            <X className="h-5 w-5 text-[#44516A]" />
          </button>
        </div>

        <div className="flex flex-col gap-10 px-5 py-10">
          <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-md bg-[#F1EDFF] px-2.5 py-1.5 text-xs font-medium text-[#4A2BF9]">{opp.category}</span>
              <span className="text-xs text-[#2F66C8] underline">{opp.refId}</span>
            </div>
            <Image src={shopifyLogo} alt={opp.company} width={60} height={68} className="mb-6 h-[68px] w-[60px] object-contain" />
            <p className="text-lg font-medium text-[#0F172A]">{opp.title}</p>
            <div className="mt-2 flex items-center gap-0.5">
              <span className="text-xs text-[#44516A]">{opp.company}</span>
              {opp.verified && <VerifiedBadge />}
            </div>
            <p className="mt-1.5 text-xs text-[#44516A]">{opp.workType} • {opp.location}</p>
            <div className="mt-5 text-xs">
              <span className="text-[#8C97AD]">Deadline: </span>
              <span className="text-[#B91C1C]">{opp.closesDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {socialOptions.map(({ bg, icon, onClick }, i) => (
              <button key={i} onClick={onClick} className={`flex h-[60px] w-[60px] items-center justify-center rounded-full ${bg}`}>
                {icon}
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2.5 text-base font-medium text-[#0F172A]">Link</p>
            <div className="flex h-[53px] items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-[#F8FAFC] pl-4">
              <span className="max-w-[180px] truncate text-base text-[#8C97AD]">{shareUrl}</span>
              <button
                onClick={copyLink}
                className="flex h-[54px] shrink-0 items-center gap-2.5 rounded-md border border-[#D9E1EF] bg-white px-4 text-base font-medium text-[#2F66C8]"
              >
                <Copy className="h-[18px] w-[18px]" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] px-5 py-6">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-white">
            <Lock className="h-4 w-4 text-[#8C97AD]" />
          </span>
          <p className="text-[10px] leading-snug text-[#44516A]">Shared links open the opportunity details page directly.</p>
        </div>
      </div>
    </div>
  );
}

function RequirementsCard({ showAll, onToggle }: { showAll: boolean; onToggle: () => void }) {
  const items = showAll ? OPP.requirements : OPP.requirements.slice(0, 3);
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="border-b border-[#EEF2F8] p-5">
        <SectionHeading>Application Requirements</SectionHeading>
        <div className="mt-2.5 flex flex-col">
          {items.map(({ label, required, icon: Icon }) => (
            <div key={label} className="flex h-11 items-center gap-4">
              <div className="flex flex-1 items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#EEF2F8] bg-white">
                  <Icon className="h-4 w-4 text-[#44516A]" />
                </span>
                <span className="text-sm text-[#44516A]">{label}</span>
              </div>
              <span className="w-20 text-right text-sm text-[#8C97AD]">{required ? 'Required' : 'Optional'}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-center gap-2.5 p-5 text-sm font-medium text-[#2F66C8]"
      >
        {showAll ? 'Show less' : 'View all requirements'}
        <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}

export default function OpportunityMobile() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAllReqs, setShowAllReqs] = useState(false);

  const opp = OPP;
  const applyHref = buildApplyHref(params.id, opp.applyFlow);
  const isApplying = searchParams.get('apply') === '1';

  if (isApplying) {
    return <ApplyMobileOverlay />;
  }

  return (
    <div className="flex flex-col pb-36">
      <Link
        href="/opportunities"
        className="mb-5 inline-flex items-center gap-2.5 text-sm font-medium text-[#2F66C8]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to results
      </Link>

      {/* Hero */}
      <div className="mb-5 flex flex-col gap-5">
        <div className="flex items-start gap-10">
          <Image src={shopifyLogo} alt={opp.company} width={60} height={68} className="h-[68px] w-[60px] shrink-0 object-contain" />
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex flex-wrap items-start gap-2.5">
              <span className="rounded-sm bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">{opp.matchPct}% Match</span>
              <span className="rounded-sm bg-[#F1EDFF] px-1 py-0.5 text-xs text-[#4A2BF9]">{opp.category}</span>
            </div>
            <h1 className="font-serif text-[28px] leading-tight text-[#0F172A]">{opp.title}</h1>
            <div className="mt-1.5 flex items-center gap-1">
              <span className="text-xs text-[#44516A]">{opp.company}</span>
              {opp.verified && <VerifiedBadge />}
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-xs text-[#44516A]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {opp.location}
              </span>
              <span>•</span>
              <span>{opp.workType}</span>
              <span>•</span>
              <span>{opp.pay}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {opp.tags.map(({ label, icon: Icon }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded bg-[#EFF4FF] px-2 py-1 text-[10px] text-[#2F66C8]">
              <Icon className="h-3 w-3" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          <MobileStatCard icon={CalendarDays} title={`Closes in ${opp.closesInDays} days`} subtitle={opp.closesDate} />
          <MobileStatCard icon={Users} title={`${opp.applicants} Applicants`} subtitle={`${opp.shortlisted} shortlisted`} />
          <MobileStatCard icon={Clock} title={`Posted ${opp.postedDaysAgo} days ago`} subtitle={opp.postedDate} />
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href={applyHref}
            className="flex items-center justify-center rounded-md bg-[#2F66C8] px-4 py-2.5 text-sm font-medium text-white"
          >
            Apply Now
          </Link>
          <div className="flex gap-2.5">
            <button
              onClick={() => setSaved((v) => !v)}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-md border px-4 py-2.5 text-sm font-medium ${
                saved ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] bg-white text-[#0F172A]'
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-[#2F66C8]' : ''}`} />
              Save Search
            </button>
            <button
              onClick={() => setShowShare(true)}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-md border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A]"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="-mx-4 flex overflow-x-auto border-b border-[#D9E1EF] px-4 no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 px-3.5 py-3.5 text-base font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-b border-[#2F66C8] text-[#2F66C8]'
                : 'text-[#0F172A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex flex-col gap-5 pt-5">
        {activeTab === 'overview' && (
          <>
            <div className="rounded-[10px] border border-[#EEF2F8] bg-white">
              <div className="border-b border-[#EEF2F8] p-5">
                <SectionHeading>About the Role</SectionHeading>
                <p className={`mt-2.5 text-sm leading-[1.8] text-[#44516A] ${!expanded ? 'line-clamp-4' : ''}`}>
                  {opp.aboutRole}
                </p>
              </div>
              {!expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="flex w-full items-center justify-center gap-2.5 p-5 text-sm font-medium text-[#2F66C8]"
                >
                  Read more
                  <ChevronDown className="h-4 w-4" />
                </button>
              )}
              {expanded && (
                <>
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
                </>
              )}
            </div>

            <RequirementsCard showAll={showAllReqs} onToggle={() => setShowAllReqs((v) => !v)} />
          </>
        )}

        {activeTab === 'requirements' && (
          <RequirementsCard showAll onToggle={() => {}} />
        )}

        {activeTab === 'benefits' && (
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <ul className="flex flex-col gap-2.5">
              {opp.benefits.map((b) => (
                <li key={b} className="flex items-center gap-4 text-sm text-[#44516A]">
                  <BrandCheck />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'organization' && (
          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <div className="mb-4 flex items-center gap-3 rounded-[10px] border border-[#EEF2F8] p-4">
              <Image src={shopifyLogo} alt={opp.company} width={48} height={48} className="h-12 w-12 object-contain" />
              <div>
                <p className="font-semibold text-[#0F172A]">{opp.company}</p>
                <p className="text-xs text-[#8C97AD]">E-commerce · Technology · 10,000+ employees</p>
              </div>
            </div>
            <p className="text-sm leading-[1.8] text-[#44516A]">
              Shopify is a leading global commerce company, providing trusted tools to start, grow, market, and manage a retail business of any size.
            </p>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="flex flex-col gap-2">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm font-medium text-[#0F172A]">
                  {q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#8C97AD] transition-transform group-open:rotate-180" />
                </summary>
                <p className="border-t border-[#EEF2F8] px-4 pb-4 pt-3 text-sm text-[#44516A]">{a}</p>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-[68px] left-0 right-0 z-30 flex gap-3 border-t border-[#EEF2F8] bg-white px-4 py-3 md:hidden">
        <button
          onClick={() => setSaved((v) => !v)}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md border ${
            saved ? 'border-[#2F66C8] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A]'
          }`}
          aria-label="Save"
        >
          <Bookmark className={`h-5 w-5 ${saved ? 'fill-[#2F66C8]' : ''}`} />
        </button>
        <Link
          href={applyHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#2F66C8] py-3 text-sm font-semibold text-white"
        >
          Apply Now
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <ShareModal open={showShare} onClose={() => setShowShare(false)} opp={opp} opportunityId={params.id} />
    </div>
  );
}
