'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, MapPin, Bookmark, Share2, CheckCircle2,
  Calendar, Users, Clock, Briefcase, ChevronDown,
  ChevronRight, X, Mail, Link2,
} from 'lucide-react';

/* ─ Types  ─ */
type Tab = 'overview' | 'requirements' | 'benefits' | 'organization' | 'faqs';

/* ─ Mock opportunity  ─ */
const OPP = {
  id: '1',
  matchPct: 94,
  category: 'Internship',
  title: 'UX Design Intern',
  company: 'Shopify',
  verified: true,
  location: 'Toronto, Ontario, Canada',
  workType: 'Hybrid',
  pay: '$20 / hr',
  tags: ['Internship', 'Entry Level', 'Product Design', 'May – Aug 2026'],
  logoInitial: 'S',
  logoColor: 'bg-green-500',
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
    'Paid Internship ($20 / hr)',
    'Mentorship (Learn from industry experts)',
    'Flexible Schedule (Hybrid work model)',
    'Professional Growth (Develop your career)',
    'Team Events (Fun & Inclusive)',
  ],
  jobDetails: [
    { label: 'Job Function',      value: 'Design' },
    { label: 'Industries',        value: 'E-commerce, Technology' },
    { label: 'Work Arrangement',  value: 'Hybrid' },
    { label: 'Career Level',      value: 'Entry Level' },
    { label: 'Salary',            value: '$20 / hr' },
    { label: 'Visa Sponsorship',  value: 'Not Available' },
  ],
  requirements: [
    { label: 'Resume',              required: true },
    { label: 'Portfolio / Work Samples', required: true },
    { label: 'Cover Letter',        required: false },
    { label: 'Availability',        required: true },
  ],
  similar: [
    { id: '2', category: 'Internship', title: 'Product Design Intern',    company: 'Stripe', logoInitial: 'St', logoColor: 'bg-indigo-600', location: 'Hybrid • Toronto, ON', pay: '$20 / hr', closesInDays: 8,  matchPct: 92 },
    { id: '3', category: 'Internship', title: 'UX Research Intern',       company: 'Uber',   logoInitial: 'U',  logoColor: 'bg-black',      location: 'Hybrid • Toronto, ON', pay: '$20 / hr', closesInDays: 10, matchPct: 90 },
    { id: '4', category: 'Internship', title: 'Interaction Design Intern',company: 'Google', logoInitial: 'G',  logoColor: 'bg-red-500',    location: 'Hybrid • Waterloo, ON',pay: '$20 / hr', closesInDays: 15, matchPct: 89 },
  ],
};

/* ─ Component  ─ */
export default function OpportunityDesktop() {
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab]     = useState<Tab>('overview');
  const [saved, setSaved]             = useState(false);
  const [showShare, setShowShare]     = useState(false);
  const [showAllReqs, setShowAllReqs] = useState(false);
  const [copied, setCopied]           = useState(false);

  const opp = OPP; // In production, fetch by params.id

  const TABS: { key: Tab; label: string }[] = [
    { key: 'overview',      label: 'Overview' },
    { key: 'requirements',  label: 'Requirements' },
    { key: 'benefits',      label: 'Benefits' },
    { key: 'organization',  label: 'Organization' },
    { key: 'faqs',          label: 'FAQs' },
  ];

  function copyLink() {
    navigator.clipboard.writeText(`https://anchorcanada.ca/opportunities/${opp.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <Link href="/opportunities" className="inline-flex items-center gap-1.5 text-sm text-[#44516A] hover:text-[#0F172A] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to results
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-[#EEF2F8] p-6 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
        <div className="flex items-start gap-5">
          {/* Logo */}
          <div className={`flex items-center justify-center w-[72px] h-[72px] rounded-2xl text-white text-xl font-bold shrink-0 ${opp.logoColor}`}>
            {opp.logoInitial}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#2F66C8] bg-[#EFF4FF] px-2.5 py-1 rounded-full">
                {opp.matchPct}% Match
              </span>
              <span className="text-xs font-semibold text-[#44516A] bg-[#F8FAFC] border border-[#EEF2F8] px-2.5 py-1 rounded-full">
                {opp.category}
              </span>
            </div>
            <h1 className="font-serif text-[28px] leading-tight text-[#0F172A]">{opp.title}</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-sm font-medium text-[#44516A]">{opp.company}</span>
              {opp.verified && (
                <svg className="h-4 w-4 text-[#2F66C8]" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
                </svg>
              )}
              <span className="text-[#D9E1EF]">•</span>
              <span className="flex items-center gap-1 text-sm text-[#44516A]">
                <MapPin className="h-3.5 w-3.5" />
                {opp.location}
              </span>
              <span className="text-[#D9E1EF]">•</span>
              <span className="text-sm text-[#44516A]">{opp.workType}</span>
              <span className="text-[#D9E1EF]">•</span>
              <span className="text-sm text-[#44516A]">{opp.pay}</span>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {opp.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs text-[#44516A] bg-[#F8FAFC] border border-[#EEF2F8] px-3 py-1 rounded-full">
                  <Briefcase className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/opportunities/${params.id}/apply`}
              className="px-5 py-2.5 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setSaved(v => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                saved ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] bg-white text-[#44516A] hover:border-[#2F66C8]'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-[#2F66C8]' : ''}`} />
              {saved ? 'Saved' : 'Save Search'}
            </button>
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D9E1EF] bg-white text-sm font-medium text-[#44516A] hover:border-[#2F66C8] transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-6 mt-5 pt-5 border-t border-[#EEF2F8]">
          <div className="flex items-center gap-2 text-sm text-[#44516A]">
            <Calendar className="h-4 w-4 text-[#2F66C8]" />
            <div>
              <span className={`font-semibold ${opp.closesInDays <= 7 ? 'text-red-500' : 'text-[#0F172A]'}`}>
                Closes in {opp.closesInDays} days
              </span>
              <span className="text-[#8C97AD] ml-1">· {opp.closesDate}</span>
            </div>
          </div>
          <div className="w-px h-5 bg-[#EEF2F8]" />
          <div className="flex items-center gap-2 text-sm text-[#44516A]">
            <Users className="h-4 w-4 text-[#2F66C8]" />
            <div>
              <span className="font-semibold text-[#0F172A]">{opp.applicants} Applicants</span>
              <span className="text-[#8C97AD] ml-1">· {opp.shortlisted} shortlisted</span>
            </div>
          </div>
          <div className="w-px h-5 bg-[#EEF2F8]" />
          <div className="flex items-center gap-2 text-sm text-[#44516A]">
            <Clock className="h-4 w-4 text-[#2F66C8]" />
            <div>
              <span className="font-semibold text-[#0F172A]">Posted {opp.postedDaysAgo} days ago</span>
              <span className="text-[#8C97AD] ml-1">· {opp.postedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-[#EEF2F8] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex border-b border-[#EEF2F8]">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-[#2F66C8] text-[#2F66C8]'
                  : 'border-transparent text-[#44516A] hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-5 gap-8">
              {/* Left: content */}
              <div className="col-span-3 flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-semibold text-[#0F172A] mb-2">About the Role</h3>
                  <p className="text-sm text-[#44516A] leading-relaxed">{opp.aboutRole}</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0F172A] mb-3">What You&apos;ll Do</h3>
                  <ul className="flex flex-col gap-2">
                    {opp.whatYoullDo.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#44516A]">
                        <CheckCircle2 className="h-4 w-4 text-[#2F66C8] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0F172A] mb-2">Who Can Apply</h3>
                  <p className="text-sm text-[#44516A]">{opp.whoCanApply}</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0F172A] mb-3">Benefits &amp; Perks</h3>
                  <ul className="flex flex-col gap-2">
                    {opp.benefits.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-[#44516A]">
                        <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: sidebar */}
              <div className="col-span-2 flex flex-col gap-5">
                {/* Job details */}
                <div className="rounded-xl border border-[#EEF2F8] overflow-hidden">
                  <h3 className="text-sm font-semibold text-[#0F172A] px-4 py-3 border-b border-[#EEF2F8] bg-[#F8FAFC]">
                    What You&apos;ll Do
                  </h3>
                  <div className="divide-y divide-[#EEF2F8]">
                    {opp.jobDetails.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                        <span className="text-[#8C97AD]">{label}</span>
                        <span className="font-medium text-[#0F172A]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="rounded-xl border border-[#EEF2F8] overflow-hidden">
                  <h3 className="text-sm font-semibold text-[#0F172A] px-4 py-3 border-b border-[#EEF2F8] bg-[#F8FAFC]">
                    What You&apos;ll Do
                  </h3>
                  <div className="divide-y divide-[#EEF2F8]">
                    {(showAllReqs ? opp.requirements : opp.requirements.slice(0, 3)).map(({ label, required }) => (
                      <div key={label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                        <span className="text-[#44516A]">{label}</span>
                        <span className={`text-xs font-semibold ${required ? 'text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
                          {required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllReqs(v => !v)}
                    className="flex items-center gap-1 px-4 py-3 text-xs font-medium text-[#2F66C8] hover:text-[#2454A4] transition-colors w-full"
                  >
                    {showAllReqs ? 'Show less' : 'View all requirements'}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAllReqs ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Apply CTA */}
                <Link
                  href={`/opportunities/${params.id}/apply`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors"
                >
                  Apply Now
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* ── REQUIREMENTS ── */}
          {activeTab === 'requirements' && (
            <div className="max-w-2xl flex flex-col gap-4">
              <p className="text-sm text-[#44516A]">Please ensure you have the following ready before applying:</p>
              {[...opp.requirements,
                { label: '2 Application Questions', required: true },
                { label: 'Availability Information', required: true },
              ].map(({ label, required }) => (
                <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
                  <CheckCircle2 className="h-5 w-5 text-[#22C55E] shrink-0" />
                  <span className="flex-1 text-sm font-medium text-[#0F172A]">{label}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${required ? 'text-[#2F66C8] bg-[#EFF4FF]' : 'text-[#8C97AD] bg-[#F8FAFC] border border-[#EEF2F8]'}`}>
                    {required ? 'Required' : 'Optional'}
                  </span>
                </div>
              ))}
              <Link
                href={`/opportunities/${params.id}/apply`}
                className="flex items-center justify-center gap-2 mt-2 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors"
              >
                Start Application
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* ── BENEFITS ── */}
          {activeTab === 'benefits' && (
            <div className="max-w-2xl flex flex-col gap-3">
              {opp.benefits.map(b => (
                <div key={b} className="flex items-center gap-3 p-4 rounded-xl border border-[#EEF2F8]">
                  <CheckCircle2 className="h-5 w-5 text-[#22C55E] shrink-0" />
                  <span className="text-sm text-[#44516A]">{b}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── ORGANIZATION ── */}
          {activeTab === 'organization' && (
            <div className="max-w-2xl flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#EEF2F8]">
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-white text-lg font-bold shrink-0 ${opp.logoColor}`}>
                  {opp.logoInitial}
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">{opp.company}</p>
                  <p className="text-sm text-[#8C97AD]">E-commerce · Technology · 10,000+ employees</p>
                </div>
              </div>
              <p className="text-sm text-[#44516A] leading-relaxed">
                Shopify is a leading global commerce company, providing trusted tools to start, grow, market, and manage a retail business of any size. Shopify makes commerce better for everyone with a platform and services that are engineered for reliability, while delivering a better shopping experience for consumers everywhere.
              </p>
            </div>
          )}

          {/* ── FAQs ── */}
          {activeTab === 'faqs' && (
            <div className="max-w-2xl flex flex-col gap-3">
              {[
                { q: 'Is this position remote?', a: 'This is a hybrid position based in Toronto, ON. You are expected to work on-site at least 2 days per week.' },
                { q: 'What is the application deadline?', a: `The deadline is ${opp.closesDate}. We recommend applying early as positions fill quickly.` },
                { q: 'Do I need to be a Canadian citizen?', a: 'Applicants must have valid work authorization in Canada. We do not offer visa sponsorship for this role.' },
                { q: 'How long does the hiring process take?', a: 'Typically 2–3 weeks from application to offer. You will hear back within 5 business days of applying.' },
              ].map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-[#EEF2F8] overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer text-sm font-medium text-[#0F172A] list-none">
                    {q}
                    <ChevronDown className="h-4 w-4 text-[#8C97AD] group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="px-4 pb-4 text-sm text-[#44516A] border-t border-[#EEF2F8] pt-3">{a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Similar Opportunities */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#0F172A]">Similar Opportunities</h2>
          <Link href="/opportunities" className="flex items-center gap-1 text-sm font-medium text-[#2F66C8] hover:text-[#2454A4]">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {opp.similar.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-[#EEF2F8] p-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-[#2F66C8] bg-[#EFF4FF] px-2.5 py-1 rounded-full">{s.category}</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg text-[#8C97AD] hover:bg-[#F8FAFC] transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-white text-sm font-bold shrink-0 ${s.logoColor}`}>
                  {s.logoInitial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{s.title}</p>
                  <p className="text-xs text-[#8C97AD]">{s.company} · {s.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#EEF2F8]">
                <span className={`text-xs font-semibold ${s.closesInDays <= 7 ? 'text-red-500' : 'text-[#8C97AD]'}`}>
                  Closes in {s.closesInDays} days
                </span>
                <span className="text-xs font-bold text-[#22C55E]">{s.matchPct}% Match</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0F172A]/50" onClick={() => setShowShare(false)} />
          <div className="relative bg-white rounded-2xl shadow-[0_6px_32px_0_rgba(0,0,0,0.15)] w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-[#0F172A]">Share Opportunity</h3>
              <button onClick={() => setShowShare(false)} className="p-1.5 rounded-lg text-[#8C97AD] hover:bg-[#F8FAFC]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-[#8C97AD] mb-4">Help someone discover the opportunity</p>
            {/* Preview card */}
            <div className="rounded-xl border border-[#EEF2F8] p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#2F66C8] bg-[#EFF4FF] px-2 py-0.5 rounded-full">{opp.category}</span>
                <span className="text-xs text-[#8C97AD] ml-auto">#APP-2026-00231</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-white text-sm font-bold ${opp.logoColor}`}>
                  {opp.logoInitial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{opp.title}</p>
                  <p className="text-xs text-[#8C97AD]">{opp.company} · {opp.workType} · {opp.location}</p>
                </div>
                <span className="ml-auto text-xs text-red-500 font-medium">Deadline: {opp.closesDate}</span>
              </div>
            </div>
            {/* Share icons */}
            <div className="flex items-center justify-around mb-4">
              {[
                { label: 'LinkedIn',  icon: <Link2 className="h-5 w-5" />,  bg: 'bg-blue-600',   color: 'text-white' },
                { label: 'Email',     icon: <Mail className="h-5 w-5" />,   bg: 'bg-purple-500', color: 'text-white' },
                { label: 'WhatsApp',  icon: <Link2 className="h-5 w-5" />,  bg: 'bg-green-500',  color: 'text-white' },
                { label: 'Instagram', icon: <Link2 className="h-5 w-5" />,  bg: 'bg-pink-500',   color: 'text-white' },
                { label: 'More',      icon: <span className="text-lg">···</span>, bg: 'bg-[#F8FAFC]', color: 'text-[#44516A]' },
              ].map(({ label, icon, bg, color }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <button className={`flex items-center justify-center w-12 h-12 rounded-full ${bg} ${color}`}>
                    {icon}
                  </button>
                  <span className="text-xs text-[#44516A]">{label}</span>
                </div>
              ))}
            </div>
            {/* Copy link */}
            <p className="text-xs font-medium text-[#0F172A] mb-2">Link</p>
            <div className="flex items-center gap-2 rounded-xl border border-[#D9E1EF] px-3 py-2.5">
              <span className="flex-1 text-sm text-[#8C97AD] truncate">
                https://anchorcanada.ca/opportunities/{opp.id}
              </span>
              <button
                onClick={copyLink}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EFF4FF] text-xs font-semibold text-[#2F66C8] hover:bg-[#2F66C8] hover:text-white transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-[#8C97AD] text-center mt-3">Shared links open the opportunity details page directly.</p>
          </div>
        </div>
      )}
    </div>
  );
}
