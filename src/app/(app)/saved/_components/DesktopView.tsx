'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bookmark, CalendarDays, ChevronDown, EllipsisVertical, ArrowRight, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

import shopifyLogo from '@/../assets/images/saved-shopify.png';
import uberLogo from '@/../assets/images/saved-uber.png';
import googleLogo from '@/../assets/images/saved-google.png';
import rbcLogo from '@/../assets/images/saved-rbc.png';
import mitacsLogo from '@/../assets/images/saved-mitacs.png';
import wwfLogo from '@/../assets/images/saved-wwf.png';
import notionLogo from '@/../assets/images/saved-notion.png';
import tdbankLogo from '@/../assets/images/saved-tdbank.png';
import hubspotLogo from '@/../assets/images/saved-hubspot.png';
import canvaLogo from '@/../assets/images/saved-canva.png';

const TYPE_STYLES: Record<string, { bg: string; text: string }> = {
  Internship: { bg: 'bg-[#f2edff]', text: 'text-[#4a13f1]' },
  Grant: { bg: 'bg-[#fff3f0]', text: 'text-[#ee5c34]' },
  'Full-time': { bg: 'bg-[#ecf0ff]', text: 'text-[#144bff]' },
  'Part-time': { bg: 'bg-[#fdf5e9]', text: 'text-[#b45309]' },
};

const savedOpportunities = [
  {
    id: 1, type: 'Internship', title: 'UX Design Intern', company: 'Shopify', verified: true,
    location: 'Toronto, ON', mode: 'Hybrid', tag: 'Design', closes: 'Closes in 12 days',
    saved: 'Saved 3d ago', logo: shopifyLogo,
  },
  {
    id: 2, type: 'Internship', title: 'Product Design Intern', company: 'Uber', verified: true,
    location: 'Toronto, ON', mode: 'On-site', tag: 'Design', closes: 'Closes in 10 days',
    saved: 'Saved 5d ago', logo: uberLogo,
  },
  {
    id: 3, type: 'Internship', title: 'UX Research Intern', company: 'Google', verified: true,
    location: 'Waterloo, ON', mode: 'Hybrid', tag: 'Research', closes: 'Closes in 15 days',
    saved: 'Saved 1wk ago', logo: googleLogo,
  },
  {
    id: 4, type: 'Grant', title: 'Youth Innovation Grant', company: 'RBC Foundation', verified: true,
    location: 'Canada-wide', mode: 'Remote', tag: 'Funding', closes: 'Closes in 12 days',
    saved: 'Saved 1wk ago', logo: rbcLogo,
  },
  {
    id: 5, type: 'Full-time', title: 'Marketing Coordinator', company: 'Mitacs', verified: true,
    location: 'Ottawa, ON', mode: 'Hybrid', tag: 'Marketing', closes: 'Closes in 18 days',
    saved: 'Saved 2wks ago', logo: mitacsLogo,
  },
  {
    id: 6, type: 'Part-time', title: 'Research Assistant', company: 'WWF Canada', verified: true,
    location: 'Vancouver, BC', mode: 'On-site', tag: 'Research', closes: 'Closes in 20 days',
    saved: 'Saved 2wks ago', logo: wwfLogo,
  },
];

const suggestedOpportunities = [
  { id: 1, type: 'Internship', title: 'Community Manager', company: 'Notion', location: 'Toronto, ON', mode: 'Hybrid', logo: notionLogo },
  { id: 2, type: 'Internship', title: 'Sustainability Intern', company: 'TD Bank Group', location: 'Toronto, ON', mode: 'Hybrid', logo: tdbankLogo },
  { id: 3, type: 'Internship', title: 'Content Marketing I...', company: 'Hubspot', location: 'Remote', mode: 'Contract', logo: hubspotLogo },
  { id: 4, type: 'Internship', title: 'Brand Design Intern', company: 'Canva', location: 'Remote', mode: 'Contract', logo: canvaLogo },
];

const TABS = [
  { label: 'All', count: 14 },
  { label: 'Jobs', count: 7 },
  { label: 'Grants', count: 3 },
  { label: 'Housing', count: 2 },
  { label: 'Training', count: 1 },
  { label: 'Volunteer', count: 1 },
];

function VerifiedBadge() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" fill="#2F66C8" />
      <path d="M3 5L4.5 6.5L7 3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OpportunityCard({ opp }: { opp: typeof savedOpportunities[0] }) {
  const typeStyle = TYPE_STYLES[opp.type] || { bg: 'bg-[#f2edff]', text: 'text-[#4a13f1]' };
  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] flex flex-col gap-5 p-5 flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <span className={cn('text-xs font-medium px-[10px] py-[6px] rounded-[6px]', typeStyle.bg, typeStyle.text)}>
          {opp.type}
        </span>
        <button className="text-[#8c97ad] hover:text-[#44516a]">
          <EllipsisVertical size={18} />
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-14 h-14 relative shrink-0 flex items-center justify-center">
          <Image src={opp.logo} alt={opp.company} width={55} height={55} className="object-contain" />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <p className="text-[#0f172a] font-medium text-base leading-tight">{opp.title}</p>
          <div className="flex items-center gap-[2px]">
            <span className="text-[#44516a] text-xs">{opp.company}</span>
            <VerifiedBadge />
          </div>
          <div className="flex items-center gap-[10px] text-[#44516a] text-xs">
            <span>{opp.location}</span>
            <span>•</span>
            <span>{opp.mode}</span>
          </div>
        </div>
      </div>
      <div>
        <span className="bg-[#f2f6fe] text-[#5a6598] text-xs px-1 py-0.5 rounded-[2px]">{opp.tag}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <CalendarDays size={14} className="text-[#b91c1c]" />
          <span className="text-[#b91c1c] text-xs">{opp.closes}</span>
        </div>
        <span className="text-[#8c97ad] text-xs">{opp.saved}</span>
      </div>
      <div className="flex gap-5 items-center">
        <button className="bg-[#2f66c8] text-white text-sm font-medium rounded-[6px] flex-1 h-[45px] flex items-center justify-center hover:bg-[#2558b3] transition-colors">
          Apply Now
        </button>
        <button className="bg-[#eff4ff] border border-[#2f66c8] rounded-[6px] p-3 flex items-center justify-center hover:bg-[#dce9ff] transition-colors">
          <Bookmark size={18} className="text-[#2f66c8]" />
        </button>
      </div>
    </div>
  );
}

function SuggestedCard({ opp }: { opp: typeof suggestedOpportunities[0] }) {
  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] flex-1 min-w-0 p-4 flex flex-col gap-3">
      <span className="text-xs font-medium text-[#4a13f1] bg-[#f2edff] px-[10px] py-[6px] rounded-[6px] self-start">
        {opp.type}
      </span>
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 relative shrink-0">
          <Image src={opp.logo} alt={opp.company} width={40} height={40} className="object-contain" />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-[#0f172a] font-medium text-sm leading-tight truncate">{opp.title}</p>
          <p className="text-[#44516a] text-xs">{opp.company}</p>
          <div className="flex items-center gap-2 text-[#44516a] text-xs">
            <span>{opp.location}</span>
            <span>•</span>
            <span>{opp.mode}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1 text-[#8c97ad] hover:text-[#44516a]">
          <Bookmark size={14} />
        </button>
        <button className="flex-1 border border-[#d9e1ef] rounded-[6px] py-[6px] text-sm text-[#0f172a] font-medium hover:bg-[#f8fafc] transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-['Instrument_Serif'] text-[36px] leading-[56px] text-[#0f172a]">Saved Opportunities</h1>
        <p className="text-[#44516a] text-base">Opportunities you&apos;re keeping an eye on.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[10px]">
              <Bookmark size={16} className="text-[#44516a]" />
              <span className="text-[#44516a] text-sm">14 saved opportunities</span>
            </div>
            <span className="bg-[#ecfdf5] text-[#15803d] text-sm font-medium px-2 py-1 rounded-[6px]">+3 this week</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[#44516a] text-sm">Sort by</span>
            <button className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center gap-[10px] px-5 py-[10px] text-sm text-[#0f172a]">
              Recently Saved
              <ChevronDown size={14} className="text-[#0f172a]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={cn(
                'flex items-center gap-[10px] px-[14px] py-2 rounded-[6px] text-sm font-medium transition-colors',
                activeTab === tab.label
                  ? 'bg-[#2f66c8] text-white'
                  : 'bg-white border border-[#d9e1ef] text-[#0f172a]'
              )}
            >
              {tab.label}
              <span className={cn(
                'text-xs font-medium px-[6px] py-0.5 rounded-full',
                activeTab === tab.label
                  ? 'bg-white/20 text-white'
                  : 'bg-[#eef2f8] text-[#0f172a]'
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#fdf5e9] rounded-[10px] flex items-center justify-between px-5 py-[18px]">
        <div className="flex items-center gap-[10px]">
          <TriangleAlert size={16} className="text-[#9b290e]" />
          <div className="flex items-center gap-1 text-sm text-[#9b290e]">
            <span className="font-medium">3 saved opportunities close this week.</span>
            <span>Don&apos;t miss your chance!</span>
          </div>
        </div>
        <button className="flex items-center gap-1 text-[#2f66c8] text-sm font-semibold">
          View Now
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {savedOpportunities.map((opp) => (
          <OpportunityCard key={opp.id} opp={opp} />
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#0f172a] font-medium text-lg">You might also like</h2>
            <p className="text-[#44516a] text-sm">Similar opportunities you may want to save.</p>
          </div>
          <button className="flex items-center gap-1 text-[#2f66c8] text-sm font-semibold">
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="flex gap-5">
          {suggestedOpportunities.map((opp) => (
            <SuggestedCard key={opp.id} opp={opp} />
          ))}
        </div>
      </div>
    </div>
  );
}
