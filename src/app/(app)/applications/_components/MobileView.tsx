'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Check, ChevronDown, ChevronLeft, Download, Send,
  MoreVertical, X, RefreshCw, AlertCircle, CheckCircle2,
  Paperclip, FileText, MessageSquare, Calendar, Clock, Star,
  Flag, Undo2, Hash, Briefcase, MapPin, Info, ChevronRight,
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

function MobileProgressStepper({ steps }: { steps: ProgressStep[] }) {
  const visible = steps.slice(0, 4);
  return (
    <div className="flex items-start w-full">
      {visible.map((step, i) => (
        <div key={i} className="flex items-start flex-1 min-w-0">
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div className={`flex-1 h-px ${step.status !== 'pending' ? 'bg-[#15803D]' : 'bg-[#D9E1EF]'}`} />
              )}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.status === 'done' ? 'bg-[#15803D]'
                  : step.status === 'active' ? 'border-2 border-[#2F66C8] bg-white'
                    : step.status === 'closed' ? 'bg-[#ECECEF]'
                      : 'border-2 border-[#D9E1EF] bg-white'
              }`}>
                {step.status === 'done' && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                {step.status === 'active' && <div className="w-2 h-2 rounded-full bg-[#2F66C8]" />}
                {step.status === 'closed' && <X className="w-2.5 h-2.5 text-[#8C97AD]" />}
              </div>
              {i < visible.length - 1 && (
                <div className={`flex-1 h-px ${steps[i + 1]?.status !== 'pending' ? 'bg-[#15803D]' : 'bg-[#D9E1EF]'}`} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileAppCard({
  app, menuOpen, onMenuToggle, onClick, onReport, onWithdraw,
}: {
  app: Application;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onClick: () => void;
  onReport: () => void;
  onWithdraw: () => void;
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
    <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium ${st.bg} ${st.text}`}>
          {app.status}
        </span>
        <div className="relative" ref={menuRef}>
          <button onClick={onMenuToggle} className="p-1 text-[#8C97AD]">
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 z-20 bg-white border border-[#EEF2F8] rounded-xl shadow-lg py-1 min-w-[180px]">
              {[
                { label: 'Report Issue', action: onReport },
                { label: 'Withdraw', action: onWithdraw, hide: app.status === 'Withdrawn' || app.status === 'Accepted' },
              ].filter(i => !i.hide).map(({ label, action }) => (
                <button key={label} onClick={() => { action(); onMenuToggle(); }} className="w-full text-left px-4 py-2 text-xs text-[#44516A] hover:bg-[#F8FAFC]">
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button onClick={onClick} className="w-full text-left">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: app.logoColor }}
          >
            {app.logoInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0F172A]">{app.title}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <p className="text-xs text-[#44516A]">{app.company}</p>
              {app.verified && (
                <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-[#2F66C8]">
                  <Check className="w-1.5 h-1.5 text-white" strokeWidth={3} />
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#44516A] mt-0.5">{app.location} • {app.type}</p>
            <p className="text-[11px] text-[#8C97AD] mt-1">Applied {app.appliedDate}</p>
          </div>
        </div>
        <MobileProgressStepper steps={app.steps} />
      </button>

      {app.status === 'Withdrawn' && app.withdrawnOn && (
        <div className="bg-[#EFF4FF] rounded-lg px-3 py-2.5 flex items-start gap-2 mt-3">
          <Info className="w-3.5 h-3.5 text-[#2F66C8] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#44516A]">You withdrew this application on {app.withdrawnOn}.</p>
        </div>
      )}
    </div>
  );
}

function OverviewChart() {
  const points = '0,80 40,70 80,55 120,60 160,35 200,25 240,15';
  const area = `M0,100 L0,80 ${points.split(' ').map(p => {
    const [x, y] = p.split(',');
    return `L${x},${y}`;
  }).join(' ')} L240,100 Z`;

  return (
    <div className="h-[140px] relative">
      <svg viewBox="0 0 240 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mobileChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F66C8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2F66C8" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#mobileChartGrad)" />
        <polyline points={points} fill="none" stroke="#2F66C8" strokeWidth="2" />
      </svg>
      <div className="flex justify-between px-6 mt-1">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
          <span key={m} className="text-[9px] text-[#8C97AD]">{m}</span>
        ))}
      </div>
    </div>
  );
}

function MobileOverviewTab({ app }: { app: Application }) {
  if (app.status === 'Accepted' && app.offerDetails) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-[10px] p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#15803D] flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#15803D]">Offer Accepted!</p>
            <p className="text-xs text-[#15803D] mt-0.5">Congratulations on your new role at {app.company}!</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Compensation', value: app.offerDetails.salary },
            { label: 'Start Date', value: app.offerDetails.startDate },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#F8FAFC] rounded-lg p-3 border border-[#EEF2F8]">
              <p className="text-[10px] text-[#8C97AD]">{label}</p>
              <p className="text-xs font-semibold text-[#0F172A] mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (app.status === 'Withdrawn') {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-[#F8FAFC] border border-[#EEF2F8] rounded-[10px] p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#8C97AD]" />
          <div>
            <p className="text-sm font-semibold text-[#252D46]">Withdrawn</p>
            <p className="text-xs text-[#8C97AD] mt-1">{app.withdrawalReason}</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md bg-[#2F66C8] text-white text-sm font-medium">
          <RefreshCw className="w-4 h-4" />Browse Opportunities
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-4">
        <p className="text-sm font-medium text-[#0F172A] mb-4">Application Status</p>
        <MobileProgressStepper steps={app.steps} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Hash, label: 'Application ID', value: app.appId },
          { icon: Calendar, label: 'Submitted Date', value: app.appliedOnLabel ?? app.appliedDate },
          { icon: Calendar, label: 'Deadline', value: app.deadline },
          { icon: Briefcase, label: 'Type', value: app.type },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white border border-[#EEF2F8] rounded-[10px] p-3">
            <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] flex items-center justify-center mb-2">
              <Icon className="w-3.5 h-3.5 text-[#2F66C8]" />
            </div>
            <p className="text-xs font-semibold text-[#0F172A] leading-tight">{value}</p>
            <p className="text-[10px] text-[#8C97AD] mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      {app.submittedAnswers && (
        <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#0F172A]">Submitted Information</p>
            <button className="text-xs font-semibold text-[#2F66C8]">View All</button>
          </div>
          <p className="text-xs text-[#44516A] leading-relaxed line-clamp-3">{app.submittedAnswers[0]?.answer}</p>
        </div>
      )}
    </div>
  );
}

function MobileDocumentsTab({ app }: { app: Application }) {
  return (
    <div className="flex flex-col gap-3">
      {app.documents.map((doc, i) => {
        const iconClass = DOC_ICON[doc.type] ?? 'text-[#8C97AD] bg-[#F8FAFC]';
        return (
          <div key={i} className="bg-white border border-[#EEF2F8] rounded-[10px] p-3.5 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconClass}`}>
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#0F172A] truncate">{doc.name}</p>
              <p className="text-[10px] text-[#8C97AD]">{doc.size}</p>
            </div>
            <button className="p-1.5 text-[#8C97AD]"><Download className="w-4 h-4" /></button>
          </div>
        );
      })}
      <div className="border-2 border-dashed border-[#D9E1EF] rounded-[10px] p-5 flex flex-col items-center gap-2">
        <Paperclip className="w-5 h-5 text-[#2F66C8]" />
        <p className="text-xs font-medium text-[#44516A]">Upload documents</p>
      </div>
    </div>
  );
}

function MobileTimelineTab({ app }: { app: Application }) {
  const icons: Record<string, typeof Send> = {
    submitted: Send, update: RefreshCw, interview: Calendar, offer: CheckCircle2, message: MessageSquare,
  };
  const colors: Record<string, string> = {
    submitted: 'bg-[#EFF4FF] text-[#2F66C8]',
    update: 'bg-[#FFF3DB] text-[#F88101]',
    interview: 'bg-[#ECDFFF] text-[#763DE7]',
    offer: 'bg-[#ECFDF5] text-[#15803D]',
    message: 'bg-[#EFF4FF] text-[#2F66C8]',
  };

  return (
    <div className="flex flex-col gap-1">
      {app.timeline.map((event, i) => {
        const Icon = icons[event.type];
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[event.type]}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              {i < app.timeline.length - 1 && <div className="w-px flex-1 bg-[#EEF2F8] my-1" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-[#0F172A]">{event.title}</p>
                <p className="text-[10px] text-[#8C97AD] whitespace-nowrap">{event.date}</p>
              </div>
              <p className="text-xs text-[#44516A] mt-0.5 leading-relaxed">{event.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileMessagesTab({ app }: { app: Application }) {
  const [draft, setDraft] = useState('');
  if (app.messages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <MessageSquare className="w-8 h-8 text-[#2F66C8]" />
        <p className="text-sm font-semibold text-[#0F172A]">No messages yet</p>
        <p className="text-xs text-[#8C97AD]">Messages from {app.company} will appear here.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {app.messages.map(msg => (
        <div key={msg.id} className={`flex gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: msg.senderColor }}>
            {msg.senderInitial}
          </div>
          <div className={`max-w-[80%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
            <div className={`rounded-2xl px-3 py-2 text-xs ${msg.isMe ? 'bg-[#2F66C8] text-white' : 'bg-[#F8FAFC] border border-[#EEF2F8]'}`}>
              {msg.content}
            </div>
            <p className="text-[9px] text-[#8C97AD]">{msg.timestamp}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-2 mt-2 border-t border-[#EEF2F8] pt-3">
        <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Type a message…" className="flex-1 anchor-field" />
        <button disabled={!draft.trim()} className="px-3 py-2 rounded-md bg-[#2F66C8] text-white disabled:opacity-40">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function MobileDetailScreen({
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
    <div className="fixed inset-0 z-30 bg-[#F8FAFC] flex flex-col">
      <div className="bg-white border-b border-[#EEF2F8] px-4 pt-4 pb-0 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-medium text-[#2F66C8]">
            <ChevronLeft className="w-4 h-4" />Back
          </button>
          <div className="flex gap-2">
            <button onClick={onReport} className="p-1.5 text-[#8C97AD]"><Flag className="w-4 h-4" /></button>
            {app.status !== 'Withdrawn' && app.status !== 'Accepted' && (
              <button onClick={onWithdraw} className="p-1.5 text-[#8C97AD]"><Undo2 className="w-4 h-4" /></button>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: app.logoColor }}>
            {app.logoInitial}
          </div>
          <div className="flex-1 min-w-0">
            {app.typeBadgeBg && (
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium mb-1 ${app.typeBadgeBg} ${app.typeBadgeText ?? ''}`}>{app.type}</span>
            )}
            <h1 className="font-serif text-[28px] leading-tight text-[#0F172A]">{app.title}</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <p className="text-xs text-[#44516A]">{app.company}</p>
              {app.verified && (
                <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-[#2F66C8]">
                  <Check className="w-1.5 h-1.5 text-white" strokeWidth={3} />
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#8C97AD] mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{app.location}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${st.bg} ${st.text}`}>
              <span className={`w-1 h-1 rounded-full ${st.dot}`} />{app.status}
            </span>
            <p className="text-[10px] text-[#8C97AD] mt-1">Applied {app.appliedOnLabel ?? app.appliedDate}</p>
          </div>
        </div>

        <div className="flex overflow-x-auto -mx-1 px-1 border-t border-[#EEF2F8] no-scrollbar">
          {DETAIL_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-2.5 text-xs font-medium border-b-2 -mb-px ${
                activeTab === tab ? 'border-[#2F66C8] text-[#2F66C8]' : 'border-transparent text-[#8C97AD]'
              }`}
            >
              {tab}
              {tab === 'Messages' && app.messages.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#2F66C8] text-white text-[9px] font-bold flex items-center justify-center">{app.messages.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28">
        {activeTab === 'Overview' && <MobileOverviewTab app={app} />}
        {activeTab === 'Documents' && <MobileDocumentsTab app={app} />}
        {activeTab === 'Timeline' && <MobileTimelineTab app={app} />}
        {activeTab === 'Messages' && <MobileMessagesTab app={app} />}
      </div>
    </div>
  );
}

function MobileReportModal({ app, onClose }: { app: Application; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[rgba(15,23,42,0.6)] p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[400px] max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between p-5 border-b border-[#EEF2F8]">
          <div>
            <p className="text-base font-medium text-[#0F172A]">Report a Problem</p>
            <p className="text-xs text-[#44516A] mt-1">Let us know what happened.</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-[#EEF2F8] flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="bg-[#F8FAFC] border border-[#EEF2F8] rounded-[10px] p-4">
            <div className="flex justify-between mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded ${STATUS_STYLES[app.status].bg} ${STATUS_STYLES[app.status].text}`}>{app.status}</span>
              <span className="text-[10px] text-[#2F66C8] underline">#{app.appId}</span>
            </div>
            <p className="text-sm font-medium">{app.title}</p>
            <p className="text-xs text-[#44516A]">{app.company}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">What went wrong?</p>
            <select className="w-full anchor-field"><option>Select a reason</option></select>
          </div>
          <textarea placeholder="Enter your message here..." className="w-full h-28 anchor-field resize-none" />
        </div>
        <div className="flex gap-3 p-5 border-t border-[#EEF2F8] bg-[#F8FAFC]">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-md border border-[#EEF2F8] text-sm font-medium text-[#44516A] bg-white">Cancel</button>
          <button className="flex-1 py-2.5 rounded-md bg-[#EF4444] text-white text-sm font-medium">Report Issue</button>
        </div>
      </div>
    </div>
  );
}

function MobileWithdrawModal({ app, onClose, onConfirm }: { app: Application; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[rgba(15,23,42,0.6)] p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[400px]">
        <div className="flex justify-end p-4"><button onClick={onClose} className="w-9 h-9 rounded-full border border-[#EEF2F8] flex items-center justify-center"><X className="w-4 h-4" /></button></div>
        <div className="px-5 pb-5 flex flex-col items-center gap-4">
          <div className="w-[120px] h-[120px] rounded-full bg-[#FFF3DB] flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-[#F88101]" />
          </div>
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-serif text-2xl text-[#0F172A]">Withdraw</span>
              <span className="font-serif italic text-3xl text-[#2F66C8]">Application</span>
            </div>
            <p className="text-xs text-[#44516A] mt-2">You are about to withdraw your application for?</p>
          </div>
          <div className="w-full bg-[#F8FAFC] border border-[#EEF2F8] rounded-[10px] p-4">
            <p className="text-sm font-medium">{app.title}</p>
            <p className="text-xs text-[#44516A]">{app.company}</p>
          </div>
          <select className="w-full anchor-field"><option>Select a reason</option></select>
        </div>
        <div className="flex gap-3 p-5 border-t border-[#EEF2F8] bg-[#F8FAFC]">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-md border text-sm font-medium text-[#44516A] bg-white">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-md bg-[#EF4444] text-white text-sm font-medium">Withdraw</button>
        </div>
      </div>
    </div>
  );
}

function MobileWithdrawnModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[400px] p-6 flex flex-col items-center gap-4">
        <div className="w-[120px] h-[120px] rounded-full bg-[#E3F6EA] flex items-center justify-center">
          <CheckCircle2 className="w-14 h-14 text-[#15803D]" />
        </div>
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-serif text-2xl text-[#0F172A]">Application</span>
            <span className="font-serif italic text-3xl text-[#2F66C8]">Withdrawn</span>
          </div>
          <p className="text-xs text-[#44516A] mt-2">Your application has been successfully withdrawn</p>
        </div>
        <div className="w-full bg-[#E9F9F0] rounded-[10px] p-3 flex gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
          <p className="text-xs text-[#44516A]">Explore similar opportunities on Anchor.</p>
        </div>
        <div className="flex gap-3 w-full">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-md border text-sm font-medium">Cancel</button>
          <Link href="/opportunities" className="flex-1 py-2.5 rounded-md bg-[#2F66C8] text-white text-sm font-medium text-center">Browse</Link>
        </div>
      </div>
    </div>
  );
}

export default function MobileView() {
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

  return (
    <>
      {selected && (
        <MobileDetailScreen
          app={selected}
          onBack={() => setSelectedId(null)}
          onReport={() => openModal(selected, 'report')}
          onWithdraw={() => openModal(selected, 'withdraw')}
        />
      )}

      <div className="flex flex-col gap-5 pb-24">
        <div>
          <h1 className="font-serif text-[36px] leading-tight text-[#0F172A]">Your Applications</h1>
          <p className="text-sm text-[#44516A] mt-1">Track every opportunity you&apos;ve gone after.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {STAT_SUMMARY.map(({ label, value, iconBg }) => (
            <div key={label} className="bg-white border border-[#EEF2F8] rounded-[10px] p-3.5 flex items-center justify-between">
              <div>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${iconBg}`}>
                  {label === 'Submitted' && <Send className="w-3.5 h-3.5 text-white" />}
                  {label === 'Under Review' && <Clock className="w-3.5 h-3.5 text-white" />}
                  {label === 'Shortlisted' && <Star className="w-3.5 h-3.5 text-white" />}
                  {label === 'Accepted' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <p className="text-xl font-bold text-[#0F172A]">{value}</p>
                <p className="text-xs text-[#44516A]">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {FILTER_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setFilterTab(key); setPage(1); }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                filterTab === key ? 'bg-[#2F66C8] text-white' : 'bg-white border border-[#D9E1EF] text-[#44516A]'
              }`}
            >
              {label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filterTab === key ? 'bg-white/20' : 'bg-[#EEF2F8] text-[#0F172A]'}`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        <p className="text-xs text-[#8C97AD]">
          Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} applications
        </p>

        <div className="flex flex-col gap-3">
          {paginated.map(app => (
            <MobileAppCard
              key={app.id}
              app={app}
              menuOpen={openMenuId === app.id}
              onMenuToggle={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
              onClick={() => setSelectedId(app.id)}
              onReport={() => openModal(app, 'report')}
              onWithdraw={() => openModal(app, 'withdraw')}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-md text-xs font-medium ${page === p ? 'bg-[#2F66C8] text-white' : 'border border-[#D9E1EF] text-[#44516A]'}`}
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button onClick={() => setPage(p => p + 1)} className="text-xs text-[#2F66C8] font-medium flex items-center gap-0.5">
                Next <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        <div className="bg-white border border-[#EEF2F8] rounded-[10px] overflow-hidden">
          <div className="p-4 border-b border-[#EEF2F8]">
            <h2 className="font-serif text-2xl text-[#0F172A] mb-4">Application Overview</h2>
            <OverviewChart />
          </div>
          <div className="flex divide-x divide-[#EEF2F8]">
            {[
              { value: '68%', label: 'Response Rate' },
              { value: '5.2', label: 'Avg. Days' },
              { value: '12', label: 'This month' },
            ].map(({ value, label }) => (
              <div key={label} className="flex-1 p-3 text-center">
                <p className="text-lg font-semibold text-[#0F172A]">{value}</p>
                <p className="text-[10px] text-[#44516A] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#EEF2F8] rounded-[10px] p-4">
          <h2 className="font-serif text-2xl text-[#0F172A] mb-4">Action Required</h2>
          <div className="flex flex-col gap-3">
            {ACTION_ITEMS.map(item => (
              <button key={item.title} className="flex items-center justify-between gap-3 w-full text-left">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                    <Calendar className="w-4 h-4 text-[#2F66C8]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0F172A]">{item.title}</p>
                    <p className="text-xs text-[#44516A]">{item.subtitle}</p>
                    {item.urgent && (
                      <p className={`text-[10px] mt-0.5 ${item.urgent === 'Due in 2 days' ? 'text-[#B91C1C]' : 'text-[#8C97AD]'}`}>{item.urgent}</p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8C97AD] flex-shrink-0" />
              </button>
            ))}
          </div>
          <button className="text-sm font-semibold text-[#2F66C8] mt-4">View all actions →</button>
        </div>
      </div>

      {modalType === 'report' && modalApp && <MobileReportModal app={modalApp} onClose={() => setModalType(null)} />}
      {modalType === 'withdraw' && modalApp && (
        <MobileWithdrawModal app={modalApp} onClose={() => setModalType(null)} onConfirm={() => setModalType('withdrawn-success')} />
      )}
      {modalType === 'withdrawn-success' && <MobileWithdrawnModal onClose={() => setModalType(null)} />}
    </>
  );
}
