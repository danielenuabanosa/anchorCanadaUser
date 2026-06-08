'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, MapPin, Bookmark, Share2, CheckCircle2,
  Calendar, Users, Clock, ChevronRight, ChevronDown, X,
} from 'lucide-react';

type Tab = 'overview' | 'requirements' | 'benefits' | 'organization' | 'faqs';

const OPP = {
  id: '1',
  matchPct: 94,
  category: 'Internship',
  title: 'UX Design Intern',
  company: 'Shopify',
  verified: true,
  location: 'Toronto, ON',
  workType: 'Hybrid',
  pay: '$20 / hr',
  logoInitial: 'S',
  logoColor: 'bg-green-500',
  closesInDays: 12,
  closesDate: 'May 21, 2026',
  applicants: 288,
  shortlisted: 18,
  postedDaysAgo: 4,
  aboutRole: `We're looking for a curious and creative UX Design Intern to join our design team for the Summer 2026 term. You'll work on real projects that impact millions of entrepreneurs worldwide.`,
  whatYoullDo: [
    'Assist in user research and usability testing.',
    'Create wireframes, prototypes, and user flows',
    'Collaborate with product managers and engineers',
    'Contribute to design systems and UI components',
    'Help improve the merchant onboarding experience',
  ],
  benefits: ['Paid Internship ($20 / hr)', 'Mentorship', 'Flexible Schedule', 'Professional Growth', 'Team Events'],
  requirements: [
    { label: 'Resume',           required: true  },
    { label: 'Cover Letter',     required: false },
    { label: 'Portfolio',        required: true  },
    { label: 'Availability',     required: true  },
  ],
};

export default function OpportunityMobile() {
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [saved, setSaved]         = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [expanded, setExpanded]   = useState(false);

  const TABS: { key: Tab; label: string }[] = [
    { key: 'overview',     label: 'Overview' },
    { key: 'requirements', label: 'Requirements' },
    { key: 'benefits',     label: 'Benefits' },
    { key: 'organization', label: 'Organization' },
    { key: 'faqs',         label: 'FAQs' },
  ];

  return (
    <div className="flex flex-col pb-24">
      {/* Back */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#EEF2F8] px-4 py-3">
        <Link href="/opportunities" className="flex items-center gap-1.5 text-sm text-[#44516A]">
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </Link>
      </div>

      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-white text-lg font-bold shrink-0 ${OPP.logoColor}`}>
            {OPP.logoInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-semibold text-[#2F66C8] bg-[#EFF4FF] px-2 py-0.5 rounded-full">{OPP.matchPct}% Match</span>
              <span className="text-xs text-[#44516A] bg-[#F8FAFC] border border-[#EEF2F8] px-2 py-0.5 rounded-full">{OPP.category}</span>
            </div>
            <h1 className="font-serif text-xl text-[#0F172A] leading-tight">{OPP.title}</h1>
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
              <span className="text-sm text-[#44516A]">{OPP.company}</span>
              {OPP.verified && (
                <svg className="h-3.5 w-3.5 text-[#2F66C8]" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
                </svg>
              )}
              <span className="text-[#D9E1EF]">·</span>
              <span className="text-xs text-[#8C97AD] flex items-center gap-0.5">
                <MapPin className="h-3 w-3" />{OPP.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setSaved(v => !v)} className="p-2 rounded-xl border border-[#D9E1EF] bg-white">
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-[#2F66C8] text-[#2F66C8]' : 'text-[#44516A]'}`} />
            </button>
            <button onClick={() => setShowShare(true)} className="p-2 rounded-xl border border-[#D9E1EF] bg-white">
              <Share2 className="h-4 w-4 text-[#44516A]" />
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex overflow-x-auto gap-3 pb-1 no-scrollbar">
          {[
            { icon: Calendar, text: `Closes in ${OPP.closesInDays}d`, urgent: OPP.closesInDays <= 7 },
            { icon: Users,    text: `${OPP.applicants} applicants`,  urgent: false },
            { icon: Clock,    text: `Posted ${OPP.postedDaysAgo}d ago`, urgent: false },
          ].map(({ icon: Icon, text, urgent }) => (
            <div key={text} className="flex items-center gap-1.5 shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-[#EEF2F8] bg-[#F8FAFC]">
              <Icon className={`h-3.5 w-3.5 ${urgent ? 'text-red-500' : 'text-[#2F66C8]'}`} />
              <span className={urgent ? 'text-red-500 font-semibold' : 'text-[#44516A]'}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-[#EEF2F8] no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium shrink-0 border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? 'border-[#2F66C8] text-[#2F66C8]'
                : 'border-transparent text-[#44516A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 py-5 flex flex-col gap-5">
        {activeTab === 'overview' && (
          <>
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2">About the Role</h3>
              <p className={`text-sm text-[#44516A] leading-relaxed ${!expanded ? 'line-clamp-4' : ''}`}>
                {OPP.aboutRole}
              </p>
              <button onClick={() => setExpanded(v => !v)} className="text-xs font-medium text-[#2F66C8] mt-1">
                {expanded ? 'Show less' : 'Read more'}
              </button>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2">What You&apos;ll Do</h3>
              <ul className="flex flex-col gap-2">
                {OPP.whatYoullDo.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#44516A]">
                    <CheckCircle2 className="h-4 w-4 text-[#2F66C8] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2">Benefits &amp; Perks</h3>
              <ul className="flex flex-col gap-1.5">
                {OPP.benefits.map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-[#44516A]">
                    <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === 'requirements' && (
          <div className="flex flex-col gap-3">
            {[...OPP.requirements, { label: '2 Application Questions', required: true }, { label: 'Availability Information', required: true }].map(({ label, required }) => (
              <div key={label} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
                <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0" />
                <span className="flex-1 text-sm font-medium text-[#0F172A]">{label}</span>
                <span className={`text-xs font-semibold ${required ? 'text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
                  {required ? 'Required' : 'Optional'}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="flex flex-col gap-2">
            {OPP.benefits.map(b => (
              <div key={b} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#EEF2F8]">
                <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0" />
                <span className="text-sm text-[#44516A]">{b}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'organization' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-[#EEF2F8]">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-white text-base font-bold shrink-0 ${OPP.logoColor}`}>
                {OPP.logoInitial}
              </div>
              <div>
                <p className="font-semibold text-[#0F172A]">{OPP.company}</p>
                <p className="text-xs text-[#8C97AD]">E-commerce · Technology · 10,000+ employees</p>
              </div>
            </div>
            <p className="text-sm text-[#44516A] leading-relaxed">
              Shopify is a leading global commerce company, providing trusted tools to start, grow, market, and manage a retail business of any size.
            </p>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="flex flex-col gap-2">
            {[
              { q: 'Is this position remote?', a: 'This is a hybrid position based in Toronto, ON.' },
              { q: 'What is the application deadline?', a: `The deadline is ${OPP.closesDate}.` },
              { q: 'Do I need to be a Canadian citizen?', a: 'Applicants must have valid work authorization in Canada.' },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-[#EEF2F8]">
                <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer text-sm font-medium text-[#0F172A] list-none">
                  {q}
                  <ChevronDown className="h-4 w-4 text-[#8C97AD] group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="px-4 pb-4 text-sm text-[#44516A] border-t border-[#EEF2F8] pt-3">{a}</p>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Bottom sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#EEF2F8] px-4 py-3 flex gap-3">
        <button onClick={() => setSaved(v => !v)} className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${saved ? 'border-[#2F66C8] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A]'}`}>
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-[#2F66C8]' : ''}`} />
          Save
        </button>
        <Link href={`/opportunities/${params.id}/apply`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors">
          Apply Now <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Share bottom sheet */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#0F172A]/50" onClick={() => setShowShare(false)} />
          <div className="relative bg-white rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#0F172A]">Share Opportunity</h3>
              <button onClick={() => setShowShare(false)}><X className="h-5 w-5 text-[#8C97AD]" /></button>
            </div>
            <div className="flex items-center justify-around mb-6">
              {['LinkedIn', 'Email', 'WhatsApp', 'Instagram', 'More'].map(s => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#EEF2F8] flex items-center justify-center text-sm font-bold text-[#44516A]">
                    {s[0]}
                  </div>
                  <span className="text-xs text-[#8C97AD]">{s}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#D9E1EF] px-3 py-2.5">
              <span className="flex-1 text-sm text-[#8C97AD] truncate">https://anchorcanada.ca/opportunities/{OPP.id}</span>
              <button className="px-3 py-1.5 rounded-lg bg-[#EFF4FF] text-xs font-semibold text-[#2F66C8]">Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
