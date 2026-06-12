'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Check, MapPin, Briefcase, Clock,
  FileText, Download, MessageSquare, Calendar, Send,
  MoreVertical, X, RefreshCw, AlertCircle, CheckCircle2,
  ChevronLeft, Paperclip, Image as ImageIcon,
} from 'lucide-react';

/* - Types - - */

type AppStatus =
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Accepted'
  | 'Withdrawn'
  | 'Rejected'
  | 'Submitted';

type DetailTab = 'Overview' | 'Documents' | 'Timeline' | 'Messages';
type FilterTab = 'All' | 'Active' | 'Shortlisted' | 'Offers' | 'Withdrawn';

interface ProgressStep {
  label: string;
  date: string | null;
  status: 'done' | 'active' | 'pending';
}

interface Document {
  name: string;
  type: string;
  size: string;
  uploadedOn: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'submitted' | 'update' | 'interview' | 'offer' | 'message';
}

interface Message {
  id: string;
  sender: string;
  senderInitial: string;
  senderColor: string;
  content: string;
  timestamp: string;
  isMe?: boolean;
}

interface Application {
  id: string;
  status: AppStatus;
  appliedDate: string;
  logoInitial: string;
  logoColor: string;
  title: string;
  company: string;
  verified: boolean;
  location: string;
  type: string;
  matchPct?: number;
  steps: ProgressStep[];
  documents: Document[];
  timeline: TimelineEvent[];
  messages: Message[];
  offerDetails?: {
    salary: string;
    startDate: string;
    deadline: string;
    offerLetter: string;
  };
  withdrawalReason?: string;
}

/* - Mock data  - */

const APPS: Application[] = [
  {
    id: '1',
    status: 'Under Review',
    appliedDate: 'May 6, 2026',
    logoInitial: 'S',
    logoColor: '#95BF47',
    title: 'UX Designer Intern',
    company: 'Shopify',
    verified: true,
    location: 'Hybrid • Toronto, ON',
    type: 'Internship',
    matchPct: 87,
    steps: [
      { label: 'Submitted', date: 'May 3', status: 'done' },
      { label: 'Under Review', date: 'May 5', status: 'active' },
      { label: 'Shortlisted', date: null, status: 'pending' },
      { label: 'Interview', date: null, status: 'pending' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'May 3, 2026' },
      { name: 'Cover_Letter_Shopify.pdf', type: 'PDF', size: '156 KB', uploadedOn: 'May 3, 2026' },
      { name: 'Portfolio.zip', type: 'ZIP', size: '4.2 MB', uploadedOn: 'May 3, 2026' },
    ],
    timeline: [
      { date: 'May 5, 2026', title: 'Application Under Review', description: 'Shopify\'s hiring team has started reviewing your application.', type: 'update' },
      { date: 'May 3, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted to Shopify.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'Shopify Recruiter', senderInitial: 'S', senderColor: '#95BF47', content: 'Hi! Thank you for applying to the UX Designer Intern role. We\'ll be in touch soon.', timestamp: 'May 5, 2:30 PM' },
    ],
  },
  {
    id: '2',
    status: 'Shortlisted',
    appliedDate: 'Apr 28, 2026',
    logoInitial: 'R',
    logoColor: '#003A70',
    title: 'Youth Innovation Grant',
    company: 'RBC Foundation',
    verified: true,
    location: 'Canada-wide • Remote',
    type: 'Grant',
    matchPct: 92,
    steps: [
      { label: 'Submitted', date: 'Apr 28', status: 'done' },
      { label: 'Under Review', date: 'May 8', status: 'done' },
      { label: 'Shortlisted', date: 'May 14', status: 'active' },
      { label: 'Interview', date: null, status: 'pending' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Business_Plan.pdf', type: 'PDF', size: '1.1 MB', uploadedOn: 'Apr 28, 2026' },
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Apr 28, 2026' },
    ],
    timeline: [
      { date: 'May 14, 2026', title: 'Shortlisted!', description: 'Congratulations! You have been shortlisted for the Youth Innovation Grant.', type: 'update' },
      { date: 'May 8, 2026', title: 'Under Review', description: 'RBC Foundation team is reviewing your application.', type: 'update' },
      { date: 'Apr 28, 2026', title: 'Application Submitted', description: 'Your grant application was successfully submitted.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'RBC Foundation', senderInitial: 'R', senderColor: '#003A70', content: 'Congratulations! Your application has been shortlisted. Please upload additional documentation by May 18.', timestamp: 'May 14, 10:00 AM' },
      { id: 'm2', sender: 'Me', senderInitial: 'M', senderColor: '#2F66C8', content: 'Thank you! I will upload the requested documents by the deadline.', timestamp: 'May 14, 11:15 AM', isMe: true },
    ],
  },
  {
    id: '3',
    status: 'Interview',
    appliedDate: 'Apr 25, 2026',
    logoInitial: 'G',
    logoColor: '#4285F4',
    title: 'Product Design Intern',
    company: 'Google',
    verified: true,
    location: 'Hybrid • Toronto, ON',
    type: 'Internship',
    matchPct: 95,
    steps: [
      { label: 'Submitted', date: 'Apr 25', status: 'done' },
      { label: 'Under Review', date: 'Apr 27', status: 'done' },
      { label: 'Shortlisted', date: 'May 2', status: 'done' },
      { label: 'Interview', date: 'May 12', status: 'active' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Apr 25, 2026' },
      { name: 'Portfolio_Google.pdf', type: 'PDF', size: '8.7 MB', uploadedOn: 'Apr 25, 2026' },
    ],
    timeline: [
      { date: 'May 12, 2026', title: 'Interview Scheduled', description: 'Virtual interview scheduled for May 20 at 10:00 AM EST.', type: 'interview' },
      { date: 'May 2, 2026', title: 'Shortlisted', description: 'Your application has been shortlisted by Google\'s design team.', type: 'update' },
      { date: 'Apr 25, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted to Google.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'Google Recruiting', senderInitial: 'G', senderColor: '#4285F4', content: 'We\'d like to invite you for a virtual interview on May 20 at 10:00 AM EST. Please confirm availability.', timestamp: 'May 12, 9:00 AM' },
      { id: 'm2', sender: 'Me', senderInitial: 'M', senderColor: '#2F66C8', content: 'I confirm my availability for May 20 at 10:00 AM EST. Looking forward to it!', timestamp: 'May 12, 9:45 AM', isMe: true },
    ],
  },
  {
    id: '4',
    status: 'Accepted',
    appliedDate: 'Apr 10, 2026',
    logoInitial: 'T',
    logoColor: '#FF0000',
    title: 'Data Analyst',
    company: 'TikTok Canada',
    verified: true,
    location: 'Toronto, ON • On-site',
    type: 'Full-time',
    matchPct: 89,
    steps: [
      { label: 'Submitted', date: 'Apr 10', status: 'done' },
      { label: 'Under Review', date: 'Apr 14', status: 'done' },
      { label: 'Interview', date: 'Apr 22', status: 'done' },
      { label: 'Offer', date: 'May 1', status: 'done' },
      { label: 'Accepted', date: 'May 5', status: 'active' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Apr 10, 2026' },
      { name: 'Offer_Letter_TikTok.pdf', type: 'PDF', size: '312 KB', uploadedOn: 'May 1, 2026' },
    ],
    timeline: [
      { date: 'May 5, 2026', title: 'Offer Accepted', description: 'You accepted the Data Analyst offer from TikTok Canada.', type: 'offer' },
      { date: 'May 1, 2026', title: 'Offer Received', description: 'You received an official job offer from TikTok Canada.', type: 'offer' },
      { date: 'Apr 10, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted.', type: 'submitted' },
    ],
    messages: [
      { id: 'm1', sender: 'TikTok Recruiting', senderInitial: 'T', senderColor: '#FF0000', content: 'Congratulations! We are thrilled to extend an offer for the Data Analyst position.', timestamp: 'May 1, 3:00 PM' },
    ],
    offerDetails: {
      salary: '$72,000 / year',
      startDate: 'June 9, 2026',
      deadline: 'May 10, 2026',
      offerLetter: 'Offer_Letter_TikTok.pdf',
    },
  },
  {
    id: '5',
    status: 'Withdrawn',
    appliedDate: 'Mar 15, 2026',
    logoInitial: 'M',
    logoColor: '#7C3AED',
    title: 'Marketing Coordinator',
    company: 'Mitacs',
    verified: true,
    location: 'Hybrid • Ottawa, ON',
    type: 'Full-time',
    matchPct: 74,
    steps: [
      { label: 'Submitted', date: 'Mar 15', status: 'done' },
      { label: 'Under Review', date: 'Mar 20', status: 'done' },
      { label: 'Withdrawn', date: 'Apr 5', status: 'done' },
      { label: 'Interview', date: null, status: 'pending' },
      { label: 'Decision', date: null, status: 'pending' },
    ],
    documents: [
      { name: 'Resume_2026.pdf', type: 'PDF', size: '234 KB', uploadedOn: 'Mar 15, 2026' },
      { name: 'Cover_Letter_Mitacs.pdf', type: 'PDF', size: '178 KB', uploadedOn: 'Mar 15, 2026' },
    ],
    timeline: [
      { date: 'Apr 5, 2026', title: 'Application Withdrawn', description: 'You withdrew your application from Mitacs Marketing Coordinator role.', type: 'update' },
      { date: 'Mar 15, 2026', title: 'Application Submitted', description: 'Your application was successfully submitted to Mitacs.', type: 'submitted' },
    ],
    messages: [],
    withdrawalReason: 'Accepted a competing offer that better aligned with my career goals.',
  },
];

/* - Constants -- - */

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Active', label: 'Active' },
  { key: 'Shortlisted', label: 'Shortlisted' },
  { key: 'Offers', label: 'Offers' },
  { key: 'Withdrawn', label: 'Withdrawn' },
];

const DETAIL_TABS: DetailTab[] = ['Overview', 'Documents', 'Timeline', 'Messages'];

const STATUS_STYLES: Record<AppStatus, { bg: string; text: string; dot: string }> = {
  'Under Review': { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400' },
  'Shortlisted':  { bg: 'bg-[#EFF4FF]',  text: 'text-[#2F66C8]',  dot: 'bg-[#2F66C8]' },
  'Interview':    { bg: 'bg-purple-50',  text: 'text-purple-700',  dot: 'bg-purple-500' },
  'Accepted':     { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Withdrawn':    { bg: 'bg-[#F8FAFC]',  text: 'text-[#8C97AD]',  dot: 'bg-[#8C97AD]' },
  'Rejected':     { bg: 'bg-red-50',     text: 'text-red-700',     dot: 'bg-red-500' },
  'Submitted':    { bg: 'bg-sky-50',     text: 'text-sky-700',     dot: 'bg-sky-500' },
};

const DOC_ICON_COLOR: Record<string, string> = {
  PDF: 'text-red-500 bg-red-50',
  ZIP: 'text-orange-500 bg-orange-50',
  DOC: 'text-blue-500 bg-blue-50',
};

const TIMELINE_ICON: Record<TimelineEvent['type'], { icon: typeof Send; bg: string; color: string }> = {
  submitted: { icon: Send,         bg: 'bg-sky-50',     color: 'text-sky-600' },
  update:    { icon: RefreshCw,    bg: 'bg-amber-50',   color: 'text-amber-600' },
  interview: { icon: Calendar,     bg: 'bg-purple-50',  color: 'text-purple-600' },
  offer:     { icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  message:   { icon: MessageSquare,bg: 'bg-[#EFF4FF]',  color: 'text-[#2F66C8]' },
};

/* - Helper  - */

function filterApps(apps: Application[], tab: FilterTab, search: string): Application[] {
  let list = apps;
  if (tab === 'Active')      list = apps.filter(a => ['Under Review', 'Submitted', 'Interview'].includes(a.status));
  if (tab === 'Shortlisted') list = apps.filter(a => a.status === 'Shortlisted');
  if (tab === 'Offers')      list = apps.filter(a => a.status === 'Accepted');
  if (tab === 'Withdrawn')   list = apps.filter(a => ['Withdrawn', 'Rejected'].includes(a.status));
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q)
    );
  }
  return list;
}

/* - Progress Steps (compact) --------------- */

function MobileProgressTimeline({ steps }: { steps: ProgressStep[] }) {
  const visible = steps.slice(0, 4);
  return (
    <div className="flex items-start w-full">
      {visible.map((step, i) => (
        <div key={i} className="flex items-start flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div className={`flex-1 h-px ${step.status !== 'pending' ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'}`} />
              )}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.status === 'done'
                  ? 'bg-[#2F66C8]'
                  : step.status === 'active'
                    ? 'border-2 border-[#2F66C8] bg-white'
                    : 'border-2 border-[#D9E1EF] bg-white'
              }`}>
                {step.status === 'done' && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                {step.status === 'active' && <div className="w-2 h-2 rounded-full bg-[#2F66C8]" />}
              </div>
              {i < visible.length - 1 && (
                <div className={`flex-1 h-px ${steps[i + 1]?.status !== 'pending' ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'}`} />
              )}
            </div>
            <p className={`text-[9px] font-medium mt-1 text-center leading-tight max-w-[40px] ${
              step.status === 'pending' ? 'text-[#8C97AD]' : 'text-[#0F172A]'
            }`}>{step.label}</p>
            {step.date && <p className="text-[9px] text-[#8C97AD] mt-0.5">{step.date}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* - App Card  - */

function AppCard({ app, onClick }: { app: Application; onClick: () => void }) {
  const st = STATUS_STYLES[app.status];
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-[#EEF2F8] rounded-2xl p-4 flex flex-col gap-3 shadow-[0_1px_4px_0_rgba(0,0,0,0.04)] active:scale-[0.99] transition-transform"
    >
      {/* Top */}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: app.logoColor }}
        >
          {app.logoInitial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#0F172A] truncate">{app.title}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <p className="text-xs text-[#8C97AD] truncate">{app.company}</p>
            {app.verified && (
              <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-[#2F66C8] flex-shrink-0">
                <Check className="w-1.5 h-1.5 text-white" strokeWidth={3} />
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#8C97AD] mt-0.5 truncate">{app.location} · {app.type}</p>
        </div>
        {app.matchPct && (
          <div className="flex-shrink-0 text-right">
            <p className="text-sm font-bold text-[#2F66C8]">{app.matchPct}%</p>
            <p className="text-[10px] text-[#8C97AD]">match</p>
          </div>
        )}
      </div>

      {/* Status + date */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${st.bg} ${st.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
          {app.status}
        </span>
        <span className="text-[11px] text-[#8C97AD]">Applied {app.appliedDate}</span>
      </div>

      {/* Progress */}
      <div className="pt-2 border-t border-[#EEF2F8]">
        <MobileProgressTimeline steps={app.steps} />
      </div>
    </button>
  );
}

/* - Detail: Overview - - */

function MobileOverviewTab({ app }: { app: Application }) {
  if (app.status === 'Accepted' && app.offerDetails) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800">Offer Accepted!</p>
            <p className="text-xs text-emerald-700 mt-0.5">Congratulations on your new role at {app.company}!</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Compensation', value: app.offerDetails.salary },
            { label: 'Start Date', value: app.offerDetails.startDate },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#F8FAFC] rounded-xl p-3 border border-[#EEF2F8]">
              <p className="text-[10px] text-[#8C97AD]">{label}</p>
              <p className="text-xs font-semibold text-[#0F172A] mt-1">{value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white border border-[#EEF2F8] rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
            <FileText className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#0F172A] truncate">{app.offerDetails.offerLetter}</p>
            <p className="text-[10px] text-[#8C97AD]">Offer Letter</p>
          </div>
          <button className="p-2 rounded-lg border border-[#D9E1EF] text-[#44516A]">
            <Download className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-white border border-[#EEF2F8] rounded-2xl p-4">
          <p className="text-sm font-semibold text-[#0F172A] mb-4">Journey</p>
          <MobileProgressTimeline steps={app.steps} />
        </div>
      </div>
    );
  }

  if (app.status === 'Withdrawn' && app.withdrawalReason) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-[#F8FAFC] border border-[#D9E1EF] rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF2F8] flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-[#8C97AD]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#44516A]">Withdrawn</p>
            <p className="text-xs text-[#8C97AD] mt-1">{app.withdrawalReason}</p>
          </div>
        </div>
        <div className="bg-white border border-[#EEF2F8] rounded-2xl p-4">
          <p className="text-sm font-semibold text-[#0F172A] mb-4">Journey</p>
          <MobileProgressTimeline steps={app.steps} />
        </div>
        <div className="bg-[#EFF4FF] border border-[#D9E1EF] rounded-2xl p-4">
          <p className="text-sm font-semibold text-[#0F172A]">Changed your mind?</p>
          <p className="text-xs text-[#44516A] mt-0.5 mb-3">You can reapply to a new position at {app.company}.</p>
          <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold">
            <RefreshCw className="w-4 h-4" />Reapply Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-[#EEF2F8] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-[#0F172A]">Progress</p>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[app.status].bg} ${STATUS_STYLES[app.status].text}`}>
            {app.status}
          </span>
        </div>
        <MobileProgressTimeline steps={app.steps} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Location', value: app.location, icon: MapPin },
          { label: 'Type', value: app.type, icon: Briefcase },
          { label: 'Applied', value: app.appliedDate, icon: Clock },
          { label: 'Match', value: app.matchPct ? `${app.matchPct}%` : 'N/A', icon: CheckCircle2 },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-[#F8FAFC] border border-[#EEF2F8] rounded-xl p-3 flex items-start gap-2">
            <Icon className="w-3.5 h-3.5 text-[#8C97AD] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#8C97AD]">{label}</p>
              <p className="text-xs font-medium text-[#0F172A] mt-0.5 leading-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#EFF4FF] border border-[#D9E1EF] rounded-2xl p-4">
        <p className="text-xs font-semibold text-[#2F66C8] mb-1">What happens next?</p>
        <p className="text-xs text-[#44516A] leading-relaxed">
          {app.status === 'Submitted' && 'The hiring team will review your application and update you within 5–10 business days.'}
          {app.status === 'Under Review' && 'The team is actively reviewing your application. You\'ll be notified if shortlisted.'}
          {app.status === 'Shortlisted' && 'Great news! Expect an interview invitation soon. Keep your contact details updated.'}
          {app.status === 'Interview' && 'Prepare by reviewing the company\'s mission, values, and role requirements.'}
        </p>
      </div>
    </div>
  );
}

/* - Detail: Documents  - */

function MobileDocumentsTab({ app }: { app: Application }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-[#0F172A]">{app.documents.length} Documents</p>
      {app.documents.map((doc, i) => {
        const iconClass = DOC_ICON_COLOR[doc.type] ?? 'text-[#8C97AD] bg-[#F8FAFC]';
        return (
          <div key={i} className="bg-white border border-[#EEF2F8] rounded-xl p-3.5 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}>
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#0F172A] truncate">{doc.name}</p>
              <p className="text-[10px] text-[#8C97AD] mt-0.5">{doc.size} · {doc.uploadedOn}</p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#8C97AD]">
              <Download className="w-4 h-4" />
            </button>
          </div>
        );
      })}
      <div className="border-2 border-dashed border-[#D9E1EF] rounded-2xl p-5 flex flex-col items-center gap-2">
        <Paperclip className="w-6 h-6 text-[#2F66C8]" />
        <p className="text-xs font-medium text-[#44516A]">Upload documents</p>
        <p className="text-[10px] text-[#8C97AD]">PDF, DOC, ZIP up to 10MB</p>
      </div>
    </div>
  );
}

/* - Detail: Timeline - - */

function MobileTimelineTab({ app }: { app: Application }) {
  return (
    <div className="flex flex-col gap-1">
      {app.timeline.map((event, i) => {
        const cfg = TIMELINE_ICON[event.type];
        const Icon = cfg.icon;
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
              </div>
              {i < app.timeline.length - 1 && (
                <div className="w-px flex-1 bg-[#EEF2F8] my-1" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-[#0F172A]">{event.title}</p>
                <p className="text-[10px] text-[#8C97AD] whitespace-nowrap flex-shrink-0">{event.date}</p>
              </div>
              <p className="text-xs text-[#44516A] mt-0.5 leading-relaxed">{event.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* - Detail: Messages - - */

function MobileMessagesTab({ app }: { app: Application }) {
  const [draft, setDraft] = useState('');

  if (app.messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EFF4FF] flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[#2F66C8]" />
        </div>
        <p className="text-sm font-semibold text-[#0F172A]">No messages yet</p>
        <p className="text-xs text-[#8C97AD] max-w-[200px] leading-relaxed">
          Messages from {app.company} will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {app.messages.map(msg => (
        <div key={msg.id} className={`flex gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
            style={{ backgroundColor: msg.senderColor }}
          >
            {msg.senderInitial}
          </div>
          <div className={`max-w-[80%] flex flex-col gap-0.5 ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${
              msg.isMe
                ? 'bg-[#2F66C8] text-white rounded-tr-sm'
                : 'bg-[#F8FAFC] border border-[#EEF2F8] text-[#0F172A] rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
            <p className="text-[9px] text-[#8C97AD] px-1">{msg.timestamp}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-2 mt-2 border-t border-[#EEF2F8] pt-3">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 anchor-field"
        />
        <button
          onClick={() => setDraft('')}
          disabled={!draft.trim()}
          className="px-3 py-2 rounded-xl bg-[#2F66C8] text-white text-xs font-semibold disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* - Detail Screen -- - */

function DetailScreen({
  app,
  onBack,
}: {
  app: Application;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>('Overview');
  const st = STATUS_STYLES[app.status];

  return (
    <div className="fixed inset-0 z-30 bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#EEF2F8] px-4 pt-4 pb-0 flex-shrink-0">
        {/* Back + actions */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#2F66C8]"
          >
            <ChevronLeft className="w-4 h-4" />Back
          </button>
          <button className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#8C97AD]">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Company info */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: app.logoColor }}
          >
            {app.logoInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0F172A]">{app.title}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <p className="text-xs text-[#44516A]">{app.company}</p>
              {app.verified && (
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#2F66C8]">
                  <Check className="w-2 h-2 text-white" strokeWidth={3} />
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#8C97AD] mt-0.5">{app.location} · {app.type}</p>
          </div>
          <span className={`flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${st.bg} ${st.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            {app.status}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center overflow-x-auto -mx-1 px-1 border-t border-[#EEF2F8]">
          {DETAIL_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? 'border-[#2F66C8] text-[#2F66C8]'
                  : 'border-transparent text-[#8C97AD]'
              }`}
            >
              {tab}
              {tab === 'Messages' && app.messages.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#2F66C8] text-white text-[9px] font-bold flex items-center justify-center">
                  {app.messages.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {activeTab === 'Overview'  && <MobileOverviewTab  app={app} />}
        {activeTab === 'Documents' && <MobileDocumentsTab app={app} />}
        {activeTab === 'Timeline'  && <MobileTimelineTab  app={app} />}
        {activeTab === 'Messages'  && <MobileMessagesTab  app={app} />}
      </div>

      {/* BottomNav provided by app layout */}
    </div>
  );
}

/* - Main Mobile View - - */

export default function MobileView() {
  const [filterTab, setFilterTab] = useState<FilterTab>('All');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filterApps(APPS, filterTab, search);
  const selected = APPS.find(a => a.id === selectedId) ?? null;

  const counts: Record<FilterTab, number> = {
    All: APPS.length,
    Active: APPS.filter(a => ['Under Review', 'Submitted', 'Interview'].includes(a.status)).length,
    Shortlisted: APPS.filter(a => a.status === 'Shortlisted').length,
    Offers: APPS.filter(a => a.status === 'Accepted').length,
    Withdrawn: APPS.filter(a => ['Withdrawn', 'Rejected'].includes(a.status)).length,
  };

  return (
    <>
      {/* Detail screen (full-screen overlay) */}
      {selected && (
        <DetailScreen app={selected} onBack={() => setSelectedId(null)} />
      )}

      {/* List screen */}
      <div className="flex flex-col gap-4 pb-24">
        {/* Header */}
        <div>
          <h1 className="font-['Instrument_Serif'] text-3xl text-[#0F172A]">Applications</h1>
          <p className="text-sm text-[#8C97AD] mt-1">Track every opportunity you've gone after.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total', value: APPS.length, color: 'text-[#2F66C8]', bg: 'bg-[#EFF4FF]' },
            { label: 'Active', value: counts.Active, color: 'text-amber-700', bg: 'bg-amber-50' },
            { label: 'Shortlisted', value: counts.Shortlisted, color: 'text-purple-700', bg: 'bg-purple-50' },
            { label: 'Offers', value: counts.Offers, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-2xl p-3.5 flex flex-col gap-1 ${bg}`}>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-[#44516A]">{label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C97AD]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search applications…"
            className="anchor-field anchor-field--icon-left anchor-field--icon-right"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C97AD]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {FILTER_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterTab(key)}
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filterTab === key
                  ? 'bg-[#2F66C8] text-white'
                  : 'bg-white border border-[#D9E1EF] text-[#44516A]'
              }`}
            >
              {label}
              <span className={`text-[10px] font-semibold ${filterTab === key ? 'text-white/80' : 'text-[#8C97AD]'}`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Count label */}
        <p className="text-xs text-[#8C97AD]">{filtered.length} applications</p>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <Search className="w-8 h-8 text-[#D9E1EF]" />
              <p className="text-sm font-medium text-[#44516A]">No applications found</p>
              <p className="text-xs text-[#8C97AD]">Try adjusting your filter.</p>
            </div>
          ) : (
            filtered.map(app => (
              <AppCard key={app.id} app={app} onClick={() => setSelectedId(app.id)} />
            ))
          )}
        </div>
      </div>

      {/* BottomNav provided by app layout */}
    </>
  );
}
