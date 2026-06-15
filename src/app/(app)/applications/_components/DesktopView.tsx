'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Check, ChevronDown, ChevronRight, ChevronLeft, Download, Send,
  MoreVertical, X, RefreshCw, AlertCircle, CheckCircle2,
  Paperclip, FileText, MessageSquare, Calendar, Clock, Star,
  Flag, Undo2, Hash, Briefcase, MapPin, Info, ArrowUp,
} from 'lucide-react';
import {
  APPS, FILTER_TABS, DETAIL_TABS, STAT_SUMMARY, ACTION_ITEMS,
  STATUS_STYLES, filterApps, getFilterCounts,
  type Application, type DetailTab, type FilterTab, type ProgressStep,
} from './applicationsData';

const DOC_ICON: Record<string, string> = {
  PDF: 'text-red-500 bg-red-50',
  DOC: 'text-blue-500 bg-blue-50',
  ZIP: 'text-orange-500 bg-orange-50',
};

const PAGE_SIZE = 5;

/* ── Progress stepper ─────────────────────────────────────── */

function ProgressStepper({ steps, compact }: { steps: ProgressStep[]; compact?: boolean }) {
  const sz = compact ? 'w-6 h-6' : 'w-8 h-8';
  const iconSz = compact ? 'w-3 h-3' : 'w-4 h-4';
  const dotSz = compact ? 'w-2 h-2' : 'w-2.5 h-2.5';

  return (
    <div className="flex items-start w-full">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start flex-1 min-w-0">
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div className={`flex-1 h-0.5 ${step.status !== 'pending' ? 'bg-[#15803D]' : 'bg-[#D9E1EF]'}`} />
              )}
              <div className={`${sz} rounded-full flex items-center justify-center flex-shrink-0 ${
                step.status === 'done'
                  ? 'bg-[#15803D]'
                  : step.status === 'active'
                    ? 'border-2 border-[#2F66C8] bg-white'
                    : step.status === 'closed'
                      ? 'border-2 border-[#8C97AD] bg-[#ECECEF]'
                      : 'border-2 border-[#D9E1EF] bg-white'
              }`}>
                {step.status === 'done' && <Check className={`${iconSz} text-white`} strokeWidth={2.5} />}
                {step.status === 'active' && <div className={`${dotSz} rounded-full bg-[#2F66C8]`} />}
                {step.status === 'closed' && <X className={`${iconSz} text-[#8C97AD]`} strokeWidth={2} />}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${steps[i + 1]?.status !== 'pending' ? 'bg-[#15803D]' : 'bg-[#D9E1EF]'}`} />
              )}
            </div>
            <div className="mt-2 text-center px-0.5">
              <p className={`text-[10px] font-medium leading-tight truncate w-full ${
                step.status === 'pending' ? 'text-[#8C97AD]' : 'text-[#0F172A]'
              }`}>{step.label}</p>
              {step.date && <p className="text-[9px] text-[#8C97AD] mt-0.5">{step.date}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Application card (list) ─────────────────────────────── */

function ApplicationCard({
  app, menuOpen, onMenuToggle, onViewDetails, onReport, onWithdraw, onDownload,
}: {
  app: Application;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onViewDetails: () => void;
  onReport: () => void;
  onWithdraw: () => void;
  onDownload: () => void;
}) {
  const st = STATUS_STYLES[app.status];
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onMenuToggle();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen, onMenuToggle]);

  return (
    <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${st.bg} ${st.text}`}>
          {app.status}
        </span>
        <span className="text-xs text-[#8C97AD]">Applied {app.appliedDate}</span>
      </div>

      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
          style={{ backgroundColor: app.logoColor }}
        >
          {app.logoInitial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-[#0F172A]">{app.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-xs text-[#44516A]">{app.company}</p>
            {app.verified && (
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#2F66C8]">
                <Check className="w-2 h-2 text-white" strokeWidth={3} />
              </span>
            )}
          </div>
          <p className="text-xs text-[#44516A] mt-1">{app.location} • {app.type}</p>
        </div>
      </div>

      <div className="mb-5">
        <ProgressStepper steps={app.steps} compact />
      </div>

      {app.status === 'Withdrawn' && app.withdrawnOn && (
        <div className="bg-[#EFF4FF] border border-[#D9E1EF] rounded-lg px-4 py-3 flex items-start gap-2 mb-4">
          <Info className="w-4 h-4 text-[#2F66C8] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#44516A]">You withdrew this application on {app.withdrawnOn}.</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-[#EEF2F8]">
        <button
          onClick={onViewDetails}
          className="text-sm font-medium text-[#2F66C8] hover:underline"
        >
          View Details
        </button>
        <div className="relative" ref={menuRef}>
          <button
            onClick={onMenuToggle}
            className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#8C97AD]"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 bg-white border border-[#EEF2F8] rounded-xl shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] py-1.5 min-w-[200px]">
              {[
                { label: 'Report Issue', action: onReport },
                { label: 'Withdraw Application', action: onWithdraw, hide: app.status === 'Withdrawn' || app.status === 'Accepted' },
                { label: 'Download Submission', action: onDownload },
              ].filter(i => !i.hide).map(({ label, action }) => (
                <button
                  key={label}
                  onClick={() => { action(); onMenuToggle(); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#44516A] hover:bg-[#F8FAFC]"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar: chart + stats ──────────────────────────────── */

function OverviewChart() {
  const points = '0,80 40,70 80,55 120,60 160,35 200,25 240,15';
  const area = `M0,100 L0,80 ${points.split(' ').map((p, i) => {
    const [x, y] = p.split(',');
    return `L${x},${y}`;
  }).join(' ')} L240,100 Z`;

  return (
    <div className="h-[180px] relative">
      <svg viewBox="0 0 240 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F66C8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2F66C8" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="30" y1={y} x2="240" y2={y} stroke="#EEF2F8" strokeWidth="0.5" />
        ))}
        <path d={area} fill="url(#chartGrad)" />
        <polyline points={points} fill="none" stroke="#2F66C8" strokeWidth="2" />
      </svg>
      <div className="flex justify-between px-8 mt-1">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
          <span key={m} className="text-[10px] text-[#8C97AD]">{m}</span>
        ))}
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="flex flex-col gap-5 w-[368px] flex-shrink-0">
      <div className="bg-white border border-[#EEF2F8] rounded-[10px] overflow-hidden">
        <div className="p-5 border-b border-[#EEF2F8]">
          <h2 className="font-serif text-2xl text-[#0F172A] mb-5">Application Overview</h2>
          <OverviewChart />
        </div>
        <div className="flex divide-x divide-[#EEF2F8]">
          {[
            { value: '68%', label: 'Response Rate' },
            { value: '5.2', label: 'Avg. Days to respond' },
            { value: '12', label: 'Opportunities this month' },
          ].map(({ value, label }) => (
            <div key={label} className="flex-1 p-4 text-center">
              <p className="text-xl font-semibold text-[#0F172A]">{value}</p>
              <p className="text-xs text-[#44516A] mt-1 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-5">
        <h2 className="font-serif text-2xl text-[#0F172A] mb-5">Action Required</h2>
        <div className="flex flex-col gap-4">
          {ACTION_ITEMS.map(item => (
            <button key={item.title} className="flex items-center justify-between gap-3 w-full text-left group">
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                  <Calendar className="w-5 h-5 text-[#2F66C8]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#0F172A]">{item.title}</p>
                  <p className="text-xs text-[#44516A] mt-0.5">{item.subtitle}</p>
                  {item.urgent && (
                    <p className={`text-[10px] mt-0.5 ${item.urgent === 'Due in 2 days' ? 'text-[#B91C1C]' : 'text-[#8C97AD]'}`}>
                      {item.urgent}
                    </p>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C97AD] group-hover:text-[#44516A] flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Detail tabs content ─────────────────────────────────── */

function OverviewTabContent({ app }: { app: Application }) {
  if (app.status === 'Accepted' && app.offerDetails) {
    return (
      <div className="flex flex-col gap-5">
        <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-[10px] p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#15803D]">Offer Accepted!</p>
            <p className="text-xs text-[#15803D] mt-0.5">
              You&apos;ve accepted the offer from {app.company}. Congratulations on your new role!
            </p>
          </div>
        </div>
        <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-5">
          <p className="text-sm font-semibold text-[#0F172A] mb-4">Offer Details</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Compensation', value: app.offerDetails.salary },
              { label: 'Start Date', value: app.offerDetails.startDate },
              { label: 'Response Deadline', value: app.offerDetails.deadline },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F8FAFC] rounded-lg p-3 border border-[#EEF2F8]">
                <p className="text-xs text-[#8C97AD]">{label}</p>
                <p className="text-sm font-semibold text-[#0F172A] mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0F172A] truncate">{app.offerDetails.offerLetter}</p>
            <p className="text-xs text-[#8C97AD]">Offer Letter</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#D9E1EF] text-xs font-medium text-[#44516A] hover:bg-[#F8FAFC]">
            <Download className="w-3.5 h-3.5" />Download
          </button>
        </div>
      </div>
    );
  }

  if (app.status === 'Withdrawn') {
    return (
      <div className="flex flex-col gap-5">
        <div className="bg-[#F8FAFC] border border-[#EEF2F8] rounded-[10px] p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#ECECEF] flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-[#8C97AD]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#252D46]">Application Withdrawn</p>
            <p className="text-xs text-[#8C97AD] mt-1">{app.withdrawalReason}</p>
          </div>
        </div>
        <div className="bg-[#EFF4FF] border border-[#D9E1EF] rounded-[10px] p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">Changed your mind?</p>
            <p className="text-xs text-[#44516A] mt-0.5">You can reapply to a new position at {app.company}.</p>
          </div>
          <button className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2F66C8] text-white text-sm font-medium hover:bg-[#2558B6]">
            <RefreshCw className="w-4 h-4" />Reapply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {app.submittedAnswers && (
        <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-medium text-[#0F172A]">Submitted Information</p>
            <button className="text-sm font-semibold text-[#2F66C8]">View All Answers</button>
          </div>
          <div className="flex flex-col gap-4">
            {app.submittedAnswers.map(({ question, answer }) => (
              <div key={question}>
                <p className="text-sm font-medium text-[#0F172A] mb-1">{question}</p>
                <p className="text-sm text-[#44516A] leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-5">
        <p className="text-base font-medium text-[#0F172A] mb-4">Provider Information</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: app.logoColor }}
            >
              {app.logoInitial}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-[#0F172A]">{app.company}</p>
                {app.verified && (
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#2F66C8]">
                    <Check className="w-2 h-2 text-white" strokeWidth={3} />
                  </span>
                )}
              </div>
              <p className="text-xs text-[#44516A]">{app.providerType}</p>
              <p className="text-xs text-[#8C97AD]">{app.location.split('•')[1]?.trim() ?? app.location}</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-md border border-[#D9E1EF] text-sm font-medium text-[#44516A] hover:bg-[#F8FAFC]">
            View Provider Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentsTabContent({ app }: { app: Application }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-[#0F172A]">Documents Submitted</p>
        <button className="flex items-center gap-1.5 text-sm font-medium text-[#2F66C8]">
          <Download className="w-4 h-4" />Download All
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {app.documents.map((doc, i) => {
          const iconClass = DOC_ICON[doc.type] ?? 'text-[#8C97AD] bg-[#F8FAFC]';
          return (
            <div key={i} className="bg-white border border-[#EEF2F8] rounded-[10px] p-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${iconClass}`}>
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-[#0F172A] truncate">{doc.name}</p>
              <p className="text-xs text-[#8C97AD] mt-0.5">{doc.size}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#EEF2F8]">
                <button className="p-1.5 rounded hover:bg-[#F8FAFC] text-[#8C97AD]">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-[#F8FAFC] text-[#8C97AD]">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-2 border-dashed border-[#D9E1EF] rounded-[10px] p-6 flex flex-col items-center gap-2 hover:border-[#2F66C8] cursor-pointer">
        <Paperclip className="w-6 h-6 text-[#2F66C8]" />
        <p className="text-sm font-medium text-[#44516A]">Upload additional documents</p>
        <p className="text-xs text-[#8C97AD]">PDF, DOC, ZIP up to 10MB</p>
      </div>
    </div>
  );
}

function TimelineTabContent({ app }: { app: Application }) {
  const icons: Record<string, { icon: typeof Send; bg: string; color: string }> = {
    submitted: { icon: Send, bg: 'bg-[#EFF4FF]', color: 'text-[#2F66C8]' },
    update: { icon: RefreshCw, bg: 'bg-[#FFF3DB]', color: 'text-[#F88101]' },
    interview: { icon: Calendar, bg: 'bg-[#ECDFFF]', color: 'text-[#763DE7]' },
    offer: { icon: CheckCircle2, bg: 'bg-[#ECFDF5]', color: 'text-[#15803D]' },
    message: { icon: MessageSquare, bg: 'bg-[#EFF4FF]', color: 'text-[#2F66C8]' },
  };

  return (
    <div className="flex flex-col gap-1">
      {app.timeline.map((event, i) => {
        const cfg = icons[event.type];
        const Icon = cfg.icon;
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
              </div>
              {i < app.timeline.length - 1 && <div className="w-px flex-1 bg-[#EEF2F8] my-1" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-[#0F172A]">{event.title}</p>
                <p className="text-xs text-[#8C97AD] whitespace-nowrap">{event.date}</p>
              </div>
              <p className="text-xs text-[#44516A] mt-1 leading-relaxed">{event.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MessagesTabContent({ app }: { app: Application }) {
  const [draft, setDraft] = useState('');

  if (app.messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EFF4FF] flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[#2F66C8]" />
        </div>
        <p className="text-sm font-semibold text-[#0F172A]">No messages yet</p>
        <p className="text-xs text-[#8C97AD] max-w-[240px]">
          Messages from {app.company} will appear here once communication begins.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {app.messages.map(msg => (
        <div key={msg.id} className={`flex gap-2.5 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: msg.senderColor }}
          >
            {msg.senderInitial}
          </div>
          <div className={`max-w-[75%] flex flex-col gap-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.isMe
                ? 'bg-[#2F66C8] text-white rounded-tr-sm'
                : 'bg-[#F8FAFC] border border-[#EEF2F8] text-[#0F172A] rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
            <p className="text-[10px] text-[#8C97AD] px-1">{msg.timestamp}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-2 mt-4 border-t border-[#EEF2F8] pt-4">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 anchor-field"
        />
        <button
          onClick={() => setDraft('')}
          disabled={!draft.trim()}
          className="px-4 py-2.5 rounded-md bg-[#2F66C8] text-white text-sm font-medium disabled:opacity-40 flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />Send
        </button>
      </div>
    </div>
  );
}

/* ── Detail view ─────────────────────────────────────────── */

function DetailView({
  app, onBack, onReport, onWithdraw,
}: {
  app: Application;
  onBack: () => void;
  onReport: () => void;
  onWithdraw: () => void;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>('Overview');
  const st = STATUS_STYLES[app.status];

  return (
    <div className="flex flex-col gap-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-[#2F66C8] w-fit">
        <ChevronLeft className="w-4 h-4" />My Applications
      </button>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                  style={{ backgroundColor: app.logoColor }}
                >
                  {app.logoInitial}
                </div>
                <div>
                  {app.typeBadgeBg && (
                    <span className={`inline-flex px-2.5 py-0.5 rounded text-xs font-medium mb-2 ${app.typeBadgeBg} ${app.typeBadgeText ?? 'text-[#763DE7]'}`}>
                      {app.type}
                    </span>
                  )}
                  <h1 className="font-serif text-[36px] leading-tight text-[#0F172A]">{app.title}</h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-sm text-[#44516A]">{app.company}</p>
                    {app.verified && (
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#2F66C8]">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="flex items-center gap-1 text-xs text-[#8C97AD] mt-1">
                    <MapPin className="w-3 h-3" />{app.location}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${st.bg} ${st.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                  {app.status}
                </span>
                <p className="text-xs text-[#8C97AD] mt-2">Applied on {app.appliedOnLabel ?? app.appliedDate}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Hash, label: 'Application ID', value: `# ${app.appId}` },
              { icon: Calendar, label: 'Submitted Date', value: app.appliedOnLabel ?? app.appliedDate },
              { icon: Calendar, label: 'Opportunity Deadline', value: app.deadline },
              { icon: Briefcase, label: 'Application Type', value: app.type },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white border border-[#EEF2F8] rounded-[10px] p-4">
                <div className="w-9 h-9 rounded-lg bg-[#EFF4FF] flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#2F66C8]" />
                </div>
                <p className="text-sm font-semibold text-[#0F172A]">{value}</p>
                <p className="text-xs text-[#8C97AD] mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#EEF2F8] rounded-[10px] overflow-hidden">
            <div className="flex border-b border-[#EEF2F8]">
              {DETAIL_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    activeTab === tab
                      ? 'border-[#2F66C8] text-[#2F66C8]'
                      : 'border-transparent text-[#8C97AD] hover:text-[#44516A]'
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
            <div className="p-6">
              {activeTab === 'Overview' && <OverviewTabContent app={app} />}
              {activeTab === 'Documents' && <DocumentsTabContent app={app} />}
              {activeTab === 'Timeline' && <TimelineTabContent app={app} />}
              {activeTab === 'Messages' && <MessagesTabContent app={app} />}
            </div>
          </div>
        </div>

        <div className="w-[320px] flex-shrink-0 flex flex-col gap-5">
          <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-5">
            <p className="text-base font-medium text-[#0F172A] mb-5">Application Status</p>
            <div className="flex flex-col gap-0">
              {app.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'done' ? 'bg-[#15803D]'
                        : step.status === 'active' ? 'border-2 border-[#2F66C8] bg-white'
                          : step.status === 'closed' ? 'bg-[#ECECEF]'
                            : 'border-2 border-[#D9E1EF] bg-white'
                    }`}>
                      {step.status === 'done' && <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />}
                      {step.status === 'active' && <div className="w-2 h-2 rounded-full bg-[#2F66C8]" />}
                      {step.status === 'closed' && <X className="w-3 h-3 text-[#8C97AD]" />}
                    </div>
                    {i < app.steps.length - 1 && <div className="w-px h-8 bg-[#EEF2F8]" />}
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${step.status === 'pending' ? 'text-[#8C97AD]' : 'text-[#0F172A]'}`}>
                        {step.label}
                      </p>
                      {step.status === 'active' && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FFF3DB] text-[#F88101]">Current</span>
                      )}
                    </div>
                    {step.date && <p className="text-xs text-[#8C97AD] mt-0.5">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-5">
            <p className="text-base font-medium text-[#0F172A] mb-4">Quick Actions</p>
            <div className="flex flex-col gap-1">
              {[
                { label: 'Report an Issue', icon: Flag, color: 'text-[#EF4444]', bg: 'bg-red-50', action: onReport },
                { label: 'Withdraw Application', icon: Undo2, color: 'text-[#763DE7]', bg: 'bg-[#ECDFFF]', action: onWithdraw, hide: app.status === 'Withdrawn' || app.status === 'Accepted' },
                { label: 'Download Submission', icon: Download, color: 'text-[#15803D]', bg: 'bg-[#ECFDF5]', action: () => {} },
              ].filter(a => !a.hide).map(({ label, icon: Icon, color, bg, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex items-center justify-between w-full px-3 py-3 rounded-lg hover:bg-[#F8FAFC] group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <span className="text-sm text-[#44516A]">{label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8C97AD] group-hover:text-[#44516A]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Modals ──────────────────────────────────────────────── */

function ReportModal({ app, onClose }: { app: Application; onClose: () => void }) {
  const [selected, setSelected] = useState('Application Tracking');
  const categories = ['Application Tracking', 'Account Configuration', 'Provider Listings', 'Opportunity Timeline', 'Other'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur-[5px] p-4">
      <div className="bg-white border border-[#D9E1EF] rounded-[20px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] w-full max-w-[720px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b border-[#EEF2F8]">
          <div>
            <p className="text-lg font-medium text-[#0F172A]">Report a Problem</p>
            <p className="text-sm text-[#44516A] mt-1 leading-relaxed">
              Having trouble with your workspace? Let us know what happened so we can help resolve the issue quickly.
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-[#EEF2F8] flex items-center justify-center hover:bg-[#F8FAFC]">
            <X className="w-5 h-5 text-[#44516A]" />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div className="bg-[#F8FAFC] border border-[#EEF2F8] rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[app.status].bg} ${STATUS_STYLES[app.status].text}`}>
                {app.status}
              </span>
              <span className="text-xs text-[#2F66C8] underline">#{app.appId}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: app.logoColor }}>
                {app.logoInitial}
              </div>
              <div>
                <p className="text-lg font-medium text-[#0F172A]">{app.title}</p>
                <p className="text-xs text-[#44516A]">{app.company} • {app.location}</p>
                <p className="text-xs text-[#8C97AD] mt-1">Applied {app.appliedDate}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-base font-medium text-[#0F172A] mb-3">What went wrong?</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded text-sm font-medium ${
                    selected === cat ? 'bg-[#2F66C8] text-white' : 'bg-[#EFF4FF] text-[#2F66C8]'
                  }`}
                >
                  {cat}
                  {selected === cat && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-base font-medium text-[#0F172A] mb-3">Describe your issue with this section. We will review it shortly.</p>
            <textarea
              placeholder="Enter your message here..."
              className="w-full h-40 anchor-field resize-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#EEF2F8] bg-[#F8FAFC]">
          <button onClick={onClose} className="px-5 py-3 rounded-md border border-[#EEF2F8] text-sm font-medium text-[#44516A] bg-white">Cancel</button>
          <button className="px-5 py-3 rounded-md bg-[#EF4444] text-white text-sm font-medium shadow-sm">Report Issue</button>
        </div>
      </div>
    </div>
  );
}

function WithdrawModal({ app, onClose, onConfirm }: { app: Application; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur-[5px] p-4">
      <div className="bg-white border border-[#D9E1EF] rounded-[20px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] w-full max-w-[720px]">
        <div className="flex justify-end p-6 border-b border-[#EEF2F8]">
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-[#EEF2F8] flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="w-[130px] h-[130px] rounded-full bg-[#FFF3DB] flex items-center justify-center">
            <AlertCircle className="w-14 h-14 text-[#F88101]" />
          </div>
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="font-serif text-[28px] text-[#0F172A]">Withdraw</span>
              <span className="font-serif italic text-[36px] text-[#2F66C8]">Application</span>
            </div>
            <p className="text-sm text-[#44516A] mt-2">You are about to withdraw your application for?</p>
          </div>
          <div className="w-full bg-[#F8FAFC] border border-[#EEF2F8] rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[app.status].bg} ${STATUS_STYLES[app.status].text}`}>{app.status}</span>
              <span className="text-xs text-[#2F66C8] underline">#{app.appId}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: app.logoColor }}>{app.logoInitial}</div>
              <div>
                <p className="text-lg font-medium text-[#0F172A]">{app.title}</p>
                <p className="text-xs text-[#44516A]">{app.company}</p>
                <p className="text-xs text-[#8C97AD]">Applied {app.appliedDate}</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#FFF3DB] border border-[#FEF4E0] rounded-[10px] p-4 flex gap-3">
            <Info className="w-5 h-5 text-[#F88101] flex-shrink-0" />
            <p className="text-sm text-[#44516A]">
              <span className="font-semibold text-[#F88101]">Important: </span>
              This action cannot be undone from your account. You may need to contact the organization directly if you wish to reapply.
            </p>
          </div>
          <div className="w-full">
            <p className="text-sm text-[#44516A] mb-2">Why are you withdrawing? (Optional)</p>
            <div className="relative">
              <select className="w-full anchor-field appearance-none pr-10">
                <option>Select a reason</option>
                <option>Accepted another offer</option>
                <option>No longer interested</option>
                <option>Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C97AD] pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#EEF2F8] bg-[#F8FAFC]">
          <button onClick={onClose} className="px-5 py-3 rounded-md border border-[#EEF2F8] text-sm font-medium text-[#44516A] bg-white">Cancel</button>
          <button onClick={onConfirm} className="px-5 py-3 rounded-md bg-[#EF4444] text-white text-sm font-medium">Withdraw Application</button>
        </div>
      </div>
    </div>
  );
}

function WithdrawnSuccessModal({ app, onClose }: { app: Application; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur-[5px] p-4">
      <div className="bg-white border border-[#D9E1EF] rounded-[20px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] w-full max-w-[720px]">
        <div className="flex justify-end p-6">
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-[#EEF2F8] flex items-center justify-center"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-8 pb-8 flex flex-col items-center gap-6">
          <div className="w-[130px] h-[130px] rounded-full bg-[#E3F6EA] flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-[#15803D]" />
          </div>
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="font-serif text-[28px] text-[#0F172A]">Application</span>
              <span className="font-serif italic text-[36px] text-[#2F66C8]">Withdrawn</span>
            </div>
            <p className="text-sm text-[#44516A] mt-2">Your application has been successfully withdrawn</p>
          </div>
          <div className="w-full bg-[#E9F9F0] border border-[#E0F6EA] rounded-[10px] p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#15803D] flex-shrink-0" />
            <p className="text-sm text-[#44516A]">You can still view the opportunity and explore similar opportunities on Anchor.</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 p-6 border-t border-[#EEF2F8] bg-[#F8FAFC]">
          <button onClick={onClose} className="px-5 py-3 rounded-md border border-[#EEF2F8] text-sm font-medium text-[#44516A] bg-white">Cancel</button>
          <Link href="/opportunities" className="px-5 py-3 rounded-md bg-[#2F66C8] text-white text-sm font-medium shadow-sm">Browse Opportunities</Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────── */

export default function DesktopView() {
  const [filterTab, setFilterTab] = useState<FilterTab>('All');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalApp, setModalApp] = useState<Application | null>(null);
  const [modalType, setModalType] = useState<'report' | 'withdraw' | 'withdrawn-success' | null>(null);

  const filtered = filterApps(APPS, filterTab);
  const counts = getFilterCounts(APPS);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selected = APPS.find(a => a.id === selectedId) ?? null;

  const openModal = (app: Application, type: typeof modalType) => {
    setModalApp(app);
    setModalType(type);
  };

  if (selected) {
    return (
      <>
        <DetailView
          app={selected}
          onBack={() => setSelectedId(null)}
          onReport={() => openModal(selected, 'report')}
          onWithdraw={() => openModal(selected, 'withdraw')}
        />
        {modalType === 'report' && modalApp && <ReportModal app={modalApp} onClose={() => setModalType(null)} />}
        {modalType === 'withdraw' && modalApp && (
          <WithdrawModal app={modalApp} onClose={() => setModalType(null)} onConfirm={() => setModalType('withdrawn-success')} />
        )}
        {modalType === 'withdrawn-success' && modalApp && <WithdrawnSuccessModal app={modalApp} onClose={() => setModalType(null)} />}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Your Applications</h1>
            <p className="text-base text-[#44516A] mt-1">Track every opportunity you&apos;ve gone after.</p>
          </div>
          <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-md border border-[#D9E1EF] bg-white text-base font-medium text-[#0F172A] hover:bg-[#F8FAFC]">
            <Download className="w-[18px] h-[18px]" />Export Report
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {STAT_SUMMARY.map(({ label, value, trend, iconBg, noTrendBg }) => (
            <div key={label} className="bg-white border border-[#EEF2F8] rounded-lg p-5 flex items-start justify-between">
              <div>
                <p className="text-[10px] text-[#44516A]">{label}</p>
                <p className="text-xl font-bold text-[#0F172A] mt-1">{value}</p>
                <div className={`inline-flex items-center gap-1 mt-2 px-1 py-0.5 rounded text-[10px] ${noTrendBg ? 'bg-[#EEF2F8] text-[#44516A]' : 'bg-[#ECFDF5] text-[#15803D]'}`}>
                  {!noTrendBg && <ArrowUp className="w-2.5 h-2.5" />}{trend}
                </div>
              </div>
              <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ${iconBg}`}>
                {label === 'Submitted' && <Send className="w-4 h-4 text-white" />}
                {label === 'Under Review' && <Clock className="w-4 h-4 text-white" />}
                {label === 'Shortlisted' && <Star className="w-4 h-4 text-white" />}
                {label === 'Accepted' && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => { setFilterTab(key); setPage(1); }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterTab === key
                      ? 'bg-[#2F66C8] text-white'
                      : 'bg-white border border-[#D9E1EF] text-[#8C97AD] hover:text-[#44516A]'
                  }`}
                >
                  {label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    filterTab === key ? 'bg-white/20 text-white' : 'bg-[#EEF2F8] text-[#0F172A]'
                  }`}>
                    {counts[key]}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-[#8C97AD]">
              Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} applications
            </p>

            <div className="flex flex-col gap-4">
              {paginated.map(app => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  menuOpen={openMenuId === app.id}
                  onMenuToggle={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
                  onViewDetails={() => setSelectedId(app.id)}
                  onReport={() => openModal(app, 'report')}
                  onWithdraw={() => openModal(app, 'withdraw')}
                  onDownload={() => {}}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-md text-sm font-medium ${
                      page === p ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] text-[#44516A] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                {page < totalPages && (
                  <button onClick={() => setPage(p => p + 1)} className="flex items-center gap-1 px-3 py-2 text-sm text-[#2F66C8] font-medium">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          <RightSidebar />
        </div>
      </div>

      {modalType === 'report' && modalApp && <ReportModal app={modalApp} onClose={() => setModalType(null)} />}
      {modalType === 'withdraw' && modalApp && (
        <WithdrawModal app={modalApp} onClose={() => setModalType(null)} onConfirm={() => setModalType('withdrawn-success')} />
      )}
      {modalType === 'withdrawn-success' && modalApp && <WithdrawnSuccessModal app={modalApp} onClose={() => setModalType(null)} />}
    </>
  );
}
