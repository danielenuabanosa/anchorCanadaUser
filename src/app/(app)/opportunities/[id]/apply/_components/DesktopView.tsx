'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, CheckCircle2, ChevronRight, Upload,
  FileText, Trash2, Eye, Send, Clock, MapPin,
  ExternalLink, User, Bell, Star, Calendar,
  Shield, Globe, Zap, Info, AlertCircle,
} from 'lucide-react';

/* ─ Types  ─ */
type FlowType = 'internal' | 'external' | 'express';
type InternalStep = 1 | 2 | 3 | 4;
type ExternalStep = 1 | 2 | 3 | 4;
type ExpressStep = 1 | 2 | 3 | 4 | 5 | 6;

/* ─ Mock opportunity data ──────────────── */
const OPP = {
  id: '1',
  title: 'UX Design Intern',
  company: 'Shopify',
  verified: true,
  location: 'Toronto, ON • Hybrid',
  pay: '$20 / hr',
  type: 'Internship',
  closesInDays: 12,
  logoInitial: 'S',
  logoColor: 'bg-green-500',
  externalUrl: 'https://careers.shopify.com',
};

const INTERNAL_CHECKLIST = [
  { label: 'Resume',                   required: true,  ready: true  },
  { label: 'Cover Letter',             required: true,  ready: false },
  { label: 'Portfolio',                required: true,  ready: true  },
  { label: '2 Application Questions',  required: true,  ready: false },
  { label: 'Availability Information', required: true,  ready: false },
];

const INTERNAL_STEP_LABELS = ['Checklist', 'Your Details', 'Documents', 'Review & Submit'];
const EXTERNAL_STEP_LABELS = ['Overview', 'Your Profile', 'Documents', 'Redirect'];
const EXPRESS_STEP_LABELS  = ['Overview', 'Your Profile', 'Message', 'Availability', 'Review', 'Success'];

/* ─ Shared: Opportunity strip ─────────────── */
function OppStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-start gap-4 ${compact ? 'py-3' : 'py-4'} border-b border-[#EEF2F8] mb-5`}>
      <div className={`flex items-center justify-center rounded-xl text-white font-bold shrink-0 ${OPP.logoColor} ${compact ? 'w-10 h-10 text-sm' : 'w-12 h-12 text-base'}`}>
        {OPP.logoInitial}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-[#0F172A] ${compact ? 'text-base' : 'text-lg'}`}>{OPP.title}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-sm text-[#44516A]">{OPP.company}</span>
          {OPP.verified && (
            <svg className="h-4 w-4 text-[#2F66C8] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#44516A]">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{OPP.location}</span>
          <span className="flex items-center gap-1">💰 {OPP.pay}</span>
          <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" />{OPP.type}</span>
          <span className="flex items-center gap-1 text-red-500 font-medium"><Clock className="h-3.5 w-3.5" />Closes in {OPP.closesInDays} days</span>
        </div>
      </div>
    </div>
  );
}

/* ─ Shared: Step header  ─ */
function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3>
      <p className="text-sm text-[#8C97AD] mt-0.5">{subtitle}</p>
    </div>
  );
}

/* ─ Shared: Nav buttons  ─ */
function NavRow({
  onBack, onNext, backLabel = 'Back', nextLabel = 'Continue',
  nextIcon, disabled = false, isLink, href,
}: {
  onBack?: () => void; onNext?: () => void;
  backLabel?: string; nextLabel?: string;
  nextIcon?: React.ReactNode; disabled?: boolean;
  isLink?: boolean; href?: string;
}) {
  return (
    <div className="flex items-center justify-between pt-4">
      {onBack ? (
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A] hover:bg-[#F8FAFC] transition-colors">
          <ArrowLeft className="h-4 w-4" />{backLabel}
        </button>
      ) : <div />}
      {isLink && href ? (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors">
          {nextIcon}{nextLabel}
        </a>
      ) : (
        <button onClick={onNext} disabled={disabled}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {nextIcon}{nextLabel}
        </button>
      )}
    </div>
  );
}

/* ─ Flow selector ── ─ */
function FlowSelector({ onSelect }: { onSelect: (f: FlowType) => void }) {
  const options = [
    {
      type: 'internal' as FlowType,
      icon: <Shield className="h-5 w-5 text-[#2F66C8]" />,
      iconBg: 'bg-[#EFF4FF]',
      title: 'Apply via Anchor',
      desc: 'Complete your application entirely within Anchor Canada. Your documents are submitted directly to the provider.',
      badge: 'Recommended',
      badgeCls: 'bg-[#EFF4FF] text-[#2F66C8]',
      steps: '4 steps',
    },
    {
      type: 'external' as FlowType,
      icon: <Globe className="h-5 w-5 text-[#44516A]" />,
      iconBg: 'bg-[#F8FAFC]',
      title: 'Apply on Provider Website',
      desc: "We'll guide you through the process, then redirect you to Shopify's application portal to complete your application.",
      badge: null,
      badgeCls: '',
      steps: '4 steps',
    },
    {
      type: 'express' as FlowType,
      icon: <Zap className="h-5 w-5 text-[#22C55E]" />,
      iconBg: 'bg-[#ECFDF5]',
      title: 'Express Interest',
      desc: 'Not ready to apply yet? Share your profile and a quick message — the provider will reach out to you directly.',
      badge: 'Quick • 2 min',
      badgeCls: 'bg-[#ECFDF5] text-[#16A34A]',
      steps: '6 steps',
    },
  ] as const;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-medium text-[#8C97AD] uppercase tracking-wide mb-3">You&apos;re applying for</p>
        <OppStrip />
      </div>
      <div>
        <h3 className="text-base font-semibold text-[#0F172A] mb-1">How would you like to apply?</h3>
        <p className="text-sm text-[#8C97AD] mb-4">Choose the application method that works best for you.</p>
        <div className="flex flex-col gap-3">
          {options.map(({ type, icon, iconBg, title, desc, badge, badgeCls, steps }) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className="flex items-start gap-4 p-4 rounded-2xl border-2 border-[#EEF2F8] bg-white hover:border-[#2F66C8] hover:bg-[#EFF4FF]/20 transition-all text-left group"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${iconBg}`}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#0F172A]">{title}</p>
                  {badge && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeCls}`}>{badge}</span>}
                </div>
                <p className="text-xs text-[#8C97AD] leading-relaxed">{desc}</p>
                <p className="text-xs text-[#8C97AD] mt-1.5 font-medium">{steps}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-[#D9E1EF] group-hover:text-[#2F66C8] mt-0.5 shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   INTERNAL FLOW — 4 STEPS
   ═══════════════════════════════════════════════════════════════════════════ */

function InternalStep1({ onNext, onCancel }: { onNext: () => void; onCancel: () => void }) {
  const ready = INTERNAL_CHECKLIST.filter(i => i.ready).length;
  const total = INTERNAL_CHECKLIST.length;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-medium text-[#8C97AD] uppercase tracking-wide mb-3">You&apos;re applying for</p>
        <OppStrip />
      </div>
      <StepHeader title="Application Checklist" subtitle="Review all the requirements before starting your application." />
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#EFF4FF] border border-[#D9E1EF]">
        <p className="text-sm font-medium text-[#0F172A]">Ready items</p>
        <span className="text-sm font-bold text-[#2F66C8]">{ready} / {total}</span>
      </div>
      <div className="rounded-2xl border border-[#EEF2F8] overflow-hidden divide-y divide-[#EEF2F8]">
        {INTERNAL_CHECKLIST.map(item => (
          <div key={item.label} className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${item.ready ? 'bg-[#ECFDF5]' : 'bg-[#F8FAFC]'}`}>
                <CheckCircle2 className={`h-4.5 w-4.5 ${item.ready ? 'text-[#22C55E]' : 'text-[#D9E1EF]'}`} />
              </div>
              <span className="text-sm font-medium text-[#0F172A]">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.required && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#2F66C8]">Required</span>
              )}
              {!item.ready && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">To do</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF7ED] border border-amber-200">
        <Info className="h-4 w-4 text-amber-500 shrink-0" />
        <p className="text-xs text-amber-700">You can still start your application — you&apos;ll upload documents in later steps.</p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <button onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A] hover:bg-[#F8FAFC] transition-colors">
          Cancel
        </button>
        <button onClick={onNext} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors">
          Start Application <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function InternalStep2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [form, setForm] = useState({
    firstName: 'Sarah', lastName: 'Sullivan',
    email: 'sarahsullivan@gmail.com', phone: '+1 (555) 000-0000',
    linkedin: '', portfolio: '', availability: 'Full-time',
  });
  const field = (label: string, key: keyof typeof form, type = 'text', ph = '') => (
    <div key={key} className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#0F172A]">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        placeholder={ph}
        className="h-11 rounded-xl border border-[#D9E1EF] px-3 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#2F66C8] focus:ring-2 focus:ring-[#2F66C8]/20 transition"
      />
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <StepHeader title="Your Details" subtitle="Confirm your personal information for this application." />
      <div className="grid grid-cols-2 gap-3">
        {field('First Name', 'firstName', 'text', 'First name')}
        {field('Last Name', 'lastName', 'text', 'Last name')}
      </div>
      {field('Email Address', 'email', 'email', 'your@email.com')}
      {field('Phone Number', 'phone', 'tel', '+1 (555) 000-0000')}
      {field('LinkedIn Profile', 'linkedin', 'url', 'https://linkedin.com/in/...')}
      {field('Portfolio / Website', 'portfolio', 'url', 'https://...')}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A]">Availability</label>
        <div className="flex gap-2">
          {['Full-time', 'Part-time', 'Flexible'].map(opt => (
            <button
              key={opt} type="button"
              onClick={() => setForm(p => ({ ...p, availability: opt }))}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${form.availability === opt ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A] hover:border-[#2F66C8]'}`}
            >{opt}</button>
          ))}
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Continue" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function InternalStep3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [files, setFiles] = useState<Record<string, string[]>>({
    resume: ['Sarah_Sullivan_Resume.pdf'], cover: [], portfolio: [],
  });
  const addFile = (key: string, name: string) => setFiles(p => ({ ...p, [key]: [...(p[key] ?? []), name] }));
  const removeFile = (key: string, name: string) => setFiles(p => ({ ...p, [key]: (p[key] ?? []).filter(f => f !== name) }));

  const DOC_SLOTS = [
    { key: 'resume',    label: 'Resume',      required: true  },
    { key: 'cover',     label: 'Cover Letter', required: true  },
    { key: 'portfolio', label: 'Portfolio',    required: false },
  ] as const;

  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Upload Documents" subtitle="Upload your documents to complete the application." />
      {DOC_SLOTS.map(({ key, label, required }) => (
        <div key={key} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#0F172A]">{label}</span>
            {required ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#2F66C8]">Required</span>
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F8FAFC] text-[#8C97AD]">Optional</span>
            )}
          </div>
          {(files[key] ?? []).map(name => (
            <div key={name} className="flex items-center gap-3 rounded-xl border border-[#D9E1EF] bg-[#F8FAFC] px-4 py-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#EFF4FF] shrink-0">
                <FileText className="h-4 w-4 text-[#2F66C8]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0F172A] truncate">{name}</p>
                <p className="text-xs text-[#8C97AD]">PDF · ~1.2 MB</p>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg text-[#8C97AD] hover:text-[#2F66C8] transition-colors"><Eye className="h-4 w-4" /></button>
                <button onClick={() => removeFile(key, name)} className="p-1.5 rounded-lg text-[#8C97AD] hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
          <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D9E1EF] bg-[#F8FAFC] p-5 cursor-pointer hover:border-[#2F66C8] hover:bg-[#EFF4FF]/20 transition-colors">
            <input type="file" className="sr-only" onChange={e => { const n = e.target.files?.[0]?.name; if (n) addFile(key, n); }} />
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#EFF4FF]">
              <Upload className="h-5 w-5 text-[#2F66C8]" />
            </div>
            <p className="text-sm font-medium text-[#44516A]"><span className="text-[#2F66C8] font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-[#8C97AD]">PDF, DOC, DOCX up to 10 MB</p>
          </label>
        </div>
      ))}
      <div className="flex flex-col gap-3 pt-1">
        <h4 className="text-sm font-semibold text-[#0F172A]">Application Questions</h4>
        {[
          'Why are you interested in this UX Design Intern role at Shopify?',
          'Describe a design project where you improved user experience. What was your process?',
        ].map((q, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#44516A]">Q{i + 1}. {q}</label>
            <textarea rows={3} placeholder="Your answer..."
              className="rounded-xl border border-[#D9E1EF] px-3 py-2.5 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#2F66C8] focus:ring-2 focus:ring-[#2F66C8]/20 resize-none transition" />
          </div>
        ))}
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Continue" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function InternalStep4({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const SECTIONS = [
    { title: 'Personal Information', rows: [['Full Name', 'Sarah Sullivan'], ['Email', 'sarahsullivan@gmail.com'], ['Phone', '+1 (555) 000-0000'], ['Availability', 'Full-time']] },
    { title: 'Documents', rows: [['Resume', 'Sarah_Sullivan_Resume.pdf'], ['Cover Letter', 'Cover_Letter_Shopify.pdf'], ['Portfolio', 'Portfolio_2025.pdf']] },
    { title: 'Application Questions', rows: [['Q1', "I'm passionate about accessible design and Shopify's mission to democratize commerce..."], ['Q2', 'During my internship at TechCorp, I redesigned the onboarding flow reducing drop-off by 40%...']] },
  ];
  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Review & Submit" subtitle="Review your application carefully before submitting." />
      <div className="rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC] px-5 pt-0 pb-1">
        <OppStrip compact />
      </div>
      {SECTIONS.map(section => (
        <div key={section.title}>
          <h4 className="text-sm font-semibold text-[#0F172A] mb-2">{section.title}</h4>
          <div className="rounded-xl border border-[#EEF2F8] divide-y divide-[#EEF2F8] overflow-hidden">
            {section.rows.map(([label, value]) => (
              <div key={label} className="flex items-start gap-3 px-4 py-3">
                <span className="text-xs font-medium text-[#8C97AD] w-28 shrink-0 mt-0.5">{label}</span>
                <span className="text-sm text-[#0F172A] flex-1 leading-relaxed">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-[#EEF2F8] hover:bg-[#F8FAFC] transition-colors">
        <div
          onClick={() => setAgreed(v => !v)}
          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${agreed ? 'bg-[#2F66C8] border-[#2F66C8]' : 'bg-white border-[#D9E1EF]'}`}
        >
          {agreed && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <span className="text-sm text-[#44516A]">I confirm all information provided is accurate. I understand that false information may result in disqualification from this opportunity.</span>
      </label>
      <NavRow
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Submit Application"
        nextIcon={<Send className="h-4 w-4" />}
        disabled={!agreed}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXTERNAL FLOW — 4 STEPS
   ═══════════════════════════════════════════════════════════════════════════ */

function ExternalStep1({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-medium text-[#8C97AD] uppercase tracking-wide mb-3">You&apos;re applying for</p>
        <OppStrip />
      </div>
      <StepHeader title="Apply on Provider Website" subtitle="We'll prepare you, then redirect you to Shopify's official careers portal." />
      <div className="flex flex-col gap-2.5">
        {[
          { num: 1, text: 'Review the opportunity requirements listed below' },
          { num: 2, text: 'Prepare your resume, cover letter, and portfolio' },
          { num: 3, text: 'Confirm your profile details are up to date' },
          { num: 4, text: "Click \"Go to Shopify\" to open their careers portal" },
          { num: 5, text: 'Complete and submit your application on their site' },
          { num: 6, text: 'Return to Anchor Canada to track your application status' },
        ].map(({ num, text }) => (
          <div key={num} className="flex items-start gap-3 p-3.5 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2F66C8] text-white text-xs font-bold shrink-0 mt-0.5">{num}</div>
            <p className="text-sm text-[#44516A]">{text}</p>
          </div>
        ))}
      </div>
      <NavRow onBack={onBack} onNext={onNext} backLabel="Back" nextLabel="Continue" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function ExternalStep2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Your Profile" subtitle="This is the information that will be associated with your application." />
      <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC]">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2F66C8] text-white text-lg font-bold shrink-0">SS</div>
        <div>
          <p className="text-base font-semibold text-[#0F172A]">Sarah Sullivan</p>
          <p className="text-sm text-[#44516A]">sarahsullivan@gmail.com</p>
          <p className="text-xs text-[#8C97AD] mt-0.5">UX Designer · Toronto, ON</p>
        </div>
      </div>
      <div className="rounded-xl border border-[#EEF2F8] divide-y divide-[#EEF2F8] overflow-hidden">
        {[
          { label: 'Full Name', value: 'Sarah Sullivan' },
          { label: 'Email', value: 'sarahsullivan@gmail.com' },
          { label: 'Phone', value: '+1 (555) 000-0000' },
          { label: 'LinkedIn', value: 'linkedin.com/in/sarahsullivan' },
          { label: 'Availability', value: 'Full-time' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start gap-3 px-4 py-3">
            <span className="text-xs font-medium text-[#8C97AD] w-24 shrink-0 mt-0.5">{label}</span>
            <span className="text-sm text-[#0F172A] flex-1">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EFF4FF] border border-[#D9E1EF]">
        <Info className="h-4 w-4 text-[#2F66C8] shrink-0" />
        <p className="text-xs text-[#44516A]">This profile information will be visible to Shopify when you apply on their portal.</p>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Continue" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function ExternalStep3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Prepare Your Documents" subtitle="Have these ready before visiting Shopify's careers portal." />
      <div className="flex flex-col gap-3">
        {[
          { label: 'Resume', note: 'Up-to-date PDF format recommended', required: true, ready: true },
          { label: 'Cover Letter', note: 'Tailored to the UX Design Intern role', required: true, ready: false },
          { label: 'Portfolio', note: 'Link or PDF showcasing your design work', required: false, ready: true },
        ].map(({ label, note, required, ready }) => (
          <div key={label} className="flex items-center gap-4 p-4 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${ready ? 'bg-[#ECFDF5]' : 'bg-amber-50'}`}>
              <FileText className={`h-5 w-5 ${ready ? 'text-[#22C55E]' : 'text-amber-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-[#0F172A]">{label}</p>
                {required && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#2F66C8]">Required</span>}
              </div>
              <p className="text-xs text-[#8C97AD] mt-0.5">{note}</p>
            </div>
            {ready ? (
              <CheckCircle2 className="h-5 w-5 text-[#22C55E] shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
        <p className="text-xs text-amber-700">You&apos;ll need to upload these documents directly on Shopify&apos;s portal. Anchor won&apos;t submit them on your behalf.</p>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="I'm Ready" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function ExternalStep4({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center py-4 gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100">
          <ExternalLink className="h-7 w-7 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#0F172A]">You&apos;re leaving Anchor Canada</h3>
          <p className="text-sm text-[#44516A] mt-2 max-w-sm mx-auto leading-relaxed">
            You&apos;ll be redirected to <strong>Shopify&apos;s</strong> official careers portal. Complete and submit your application there, then return here to track your status.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC] p-4">
        <p className="text-xs font-semibold text-[#0F172A] mb-2">What to expect:</p>
        <ul className="flex flex-col gap-2">
          {[
            'You will be taken to careers.shopify.com',
            'Create an account or log in to their portal',
            'Upload your prepared documents',
            'Submit your application on their site',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#44516A]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#2F66C8] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2.5">
        <a
          href={OPP.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors"
        >
          <ExternalLink className="h-4 w-4" /> Go to Shopify Careers
        </a>
        <button onClick={onBack} className="px-6 py-2.5 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A] hover:bg-[#F8FAFC] transition-colors">
          Go Back
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPRESS INTEREST FLOW — 6 STEPS
   ═══════════════════════════════════════════════════════════════════════════ */

function ExpressStep1({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-medium text-[#8C97AD] uppercase tracking-wide mb-3">You&apos;re expressing interest in</p>
        <OppStrip />
      </div>
      <StepHeader title="Express Your Interest" subtitle="Share your profile and a quick note — no formal application required yet." />
      <div className="rounded-2xl border border-[#EEF2F8] bg-[#EFF4FF]/30 p-4">
        <p className="text-sm font-semibold text-[#0F172A] mb-3">What is Express Interest?</p>
        <div className="flex flex-col gap-2.5">
          {[
            { icon: <User className="h-4 w-4 text-[#2F66C8]" />, text: 'Your Anchor profile is shared directly with the provider' },
            { icon: <Calendar className="h-4 w-4 text-[#2F66C8]" />, text: 'Provider reviews your profile within 3–5 business days' },
            { icon: <Bell className="h-4 w-4 text-[#2F66C8]" />, text: "You'll receive a notification if they'd like you to formally apply" },
            { icon: <Star className="h-4 w-4 text-[#2F66C8]" />, text: 'You can still submit a full application at any time' },
          ].map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[#44516A]">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EFF4FF] shrink-0">{icon}</div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} backLabel="Back" nextLabel="Get Started" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function ExpressStep2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Your Profile Preview" subtitle="This is what the provider will see when you express interest." />
      <div className="rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC] p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2F66C8] text-white text-lg font-bold shrink-0">SS</div>
          <div>
            <p className="text-base font-semibold text-[#0F172A]">Sarah Sullivan</p>
            <p className="text-sm text-[#44516A]">UX Designer</p>
            <p className="text-xs text-[#8C97AD] mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" />Toronto, ON</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Figma', 'User Research', 'Prototyping', 'Accessibility', 'Design Systems'].map(skill => (
            <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-[#EFF4FF] text-[#2F66C8] font-medium">{skill}</span>
          ))}
        </div>
        <div className="text-xs text-[#44516A] leading-relaxed border-t border-[#EEF2F8] pt-3">
          <p className="font-medium text-[#0F172A] mb-1">About</p>
          <p>UX designer with 2 years of experience creating user-centered digital experiences. Passionate about accessibility and inclusive design.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EFF4FF] border border-[#D9E1EF]">
        <Info className="h-4 w-4 text-[#2F66C8] shrink-0" />
        <p className="text-xs text-[#44516A]">Only your public profile information will be shared. <span className="font-semibold text-[#2F66C8]">Edit Profile</span></p>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Looks Good" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function ExpressStep3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [message, setMessage] = useState('');
  const MAX = 300;
  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Your Message" subtitle="Add a personal note to stand out. Completely optional." />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A]">
          Message to Provider <span className="font-normal text-[#8C97AD]">(Optional)</span>
        </label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value.slice(0, MAX))}
          placeholder="Briefly share why you're interested in this role and what makes you a great fit..."
          rows={5}
          className="rounded-xl border border-[#D9E1EF] px-3 py-2.5 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#2F66C8] focus:ring-2 focus:ring-[#2F66C8]/20 resize-none transition"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#8C97AD]">Keep it concise and genuine.</p>
          <p className={`text-xs ${message.length >= MAX ? 'text-red-500' : 'text-[#8C97AD]'}`}>{message.length}/{MAX}</p>
        </div>
      </div>
      <div className="rounded-xl border border-[#EEF2F8] bg-[#F8FAFC] p-3">
        <p className="text-xs font-semibold text-[#0F172A] mb-1">Example message:</p>
        <p className="text-xs text-[#8C97AD] italic leading-relaxed">"Hi, I&apos;m Sarah — a UX designer passionate about building accessible digital products. I&apos;d love to learn more about this internship opportunity and how I can contribute to Shopify&apos;s design team."</p>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Continue" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function ExpressStep4({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [availability, setAvailability] = useState('Full-time');
  const [startDate, setStartDate] = useState('Immediately');
  const [notify, setNotify] = useState(true);
  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Availability & Preferences" subtitle="Let the provider know when and how you can start." />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A]">Availability</label>
        <div className="flex gap-2 flex-wrap">
          {['Full-time', 'Part-time', 'Flexible'].map(opt => (
            <button
              key={opt} type="button"
              onClick={() => setAvailability(opt)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${availability === opt ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A] hover:border-[#2F66C8]'}`}
            >{opt}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A]">Earliest Start Date</label>
        <div className="flex gap-2 flex-wrap">
          {['Immediately', 'Within 1 month', 'Within 3 months', 'Flexible'].map(opt => (
            <button
              key={opt} type="button"
              onClick={() => setStartDate(opt)}
              className={`px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${startDate === opt ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A] hover:border-[#2F66C8]'}`}
            >{opt}</button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
        <div>
          <p className="text-sm font-medium text-[#0F172A]">Notify me when reviewed</p>
          <p className="text-xs text-[#8C97AD] mt-0.5">Get an email when the provider views your interest</p>
        </div>
        <button
          type="button"
          onClick={() => setNotify(v => !v)}
          className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${notify ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notify ? 'translate-x-4' : 'translate-x-0'}`} />
        </button>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Continue" nextIcon={<ChevronRight className="h-4 w-4" />} />
    </div>
  );
}

function ExpressStep5({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <StepHeader title="Review Your Expression" subtitle="Confirm everything looks correct before sending." />
      <div className="rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC] px-5 pt-0 pb-1">
        <OppStrip compact />
      </div>
      {[
        { title: 'Profile Shared', rows: [['Name', 'Sarah Sullivan'], ['Email', 'sarahsullivan@gmail.com'], ['Role', 'UX Designer'], ['Location', 'Toronto, ON']] },
        { title: 'Preferences', rows: [['Availability', 'Full-time'], ['Start Date', 'Immediately'], ['Notifications', 'Enabled']] },
        { title: 'Message', rows: [['To Provider', 'Hi, I\'m Sarah — a UX designer passionate about building accessible digital products...']] },
      ].map(section => (
        <div key={section.title}>
          <h4 className="text-sm font-semibold text-[#0F172A] mb-2">{section.title}</h4>
          <div className="rounded-xl border border-[#EEF2F8] divide-y divide-[#EEF2F8] overflow-hidden">
            {section.rows.map(([label, value]) => (
              <div key={label} className="flex items-start gap-3 px-4 py-3">
                <span className="text-xs font-medium text-[#8C97AD] w-28 shrink-0 mt-0.5">{label}</span>
                <span className="text-sm text-[#0F172A] flex-1">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <NavRow
        onBack={onBack}
        onNext={onNext}
        nextLabel="Send Expression of Interest"
        nextIcon={<Send className="h-4 w-4" />}
      />
    </div>
  );
}

function ExpressStep6() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#ECFDF5]">
        <CheckCircle2 className="h-10 w-10 text-[#22C55E]" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-[#0F172A]">Interest Expressed!</h3>
        <p className="text-sm text-[#44516A] mt-2 max-w-sm mx-auto leading-relaxed">
          {OPP.company} has been notified of your interest in the <strong>{OPP.title}</strong> role. You&apos;ll hear back within 3–5 business days.
        </p>
      </div>
      <div className="w-full max-w-xs flex flex-col gap-3">
        <div className="rounded-xl border border-[#EEF2F8] bg-[#F8FAFC] p-4">
          <p className="text-xs font-semibold text-[#0F172A] mb-2">What happens next?</p>
          {[
            'Shopify reviews your profile',
            "You'll get notified of their decision",
            'You can still apply directly at any time',
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[#44516A] mb-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#2F66C8] shrink-0" />{s}
            </div>
          ))}
        </div>
        <Link href="/applications" className="w-full text-center px-6 py-2.5 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors">
          View My Applications
        </Link>
        <Link href="/opportunities" className="w-full text-center px-6 py-2.5 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A] hover:bg-[#F8FAFC] transition-colors">
          Explore More Opportunities
        </Link>
      </div>
    </div>
  );
}

/* ─ Success view (internal/external done) ──────────── */
function SuccessView({ type }: { type: FlowType }) {
  const msgs: Record<FlowType, { title: string; body: string; icon: React.ReactNode }> = {
    internal: {
      title: 'Application Submitted!',
      body: `Your application for ${OPP.title} at ${OPP.company} has been submitted successfully. You'll be notified of any updates.`,
      icon: <CheckCircle2 className="h-10 w-10 text-[#22C55E]" />,
    },
    external: {
      title: 'Redirected Successfully!',
      body: `You've been guided to Shopify's careers portal. Remember to return here to track your application status after submitting.`,
      icon: <ExternalLink className="h-10 w-10 text-[#2F66C8]" />,
    },
    express: {
      title: 'Interest Expressed!',
      body: `${OPP.company} has been notified of your interest. You'll hear back within 3–5 business days.`,
      icon: <CheckCircle2 className="h-10 w-10 text-[#22C55E]" />,
    },
  };
  const m = msgs[type];
  const bgCls = type === 'external' ? 'bg-[#EFF4FF]' : 'bg-[#ECFDF5]';
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
      <div className={`flex items-center justify-center w-20 h-20 rounded-full ${bgCls}`}>{m.icon}</div>
      <div>
        <h3 className="text-2xl font-semibold text-[#0F172A]">{m.title}</h3>
        <p className="text-sm text-[#44516A] mt-2 max-w-sm mx-auto leading-relaxed">{m.body}</p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Link href="/applications" className="w-full text-center px-6 py-2.5 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors">
          View My Applications
        </Link>
        <Link href="/opportunities" className="w-full text-center px-6 py-2.5 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A] hover:bg-[#F8FAFC] transition-colors">
          Explore More Opportunities
        </Link>
      </div>
    </div>
  );
}

/* ─ Step tab bar ─ ─ */
function StepTabs({ labels, current, total }: { labels: string[]; current: number; total: number }) {
  return (
    <div className="flex items-center gap-0 mb-5 border-b border-[#EEF2F8] overflow-x-auto">
      {labels.map((label, i) => {
        const s = i + 1;
        const isActive = current === s;
        const isDone = current > s;
        return (
          <div
            key={s}
            className={`flex items-center gap-1.5 px-3 pb-3 text-xs font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${isActive ? 'border-[#2F66C8] text-[#2F66C8]' : isDone ? 'border-transparent text-[#22C55E]' : 'border-transparent text-[#8C97AD]'}`}
          >
            {isDone ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${isActive ? 'bg-[#2F66C8] text-white' : 'bg-[#EEF2F8] text-[#8C97AD]'}`}>{s}</span>
            )}
            <span>{label}</span>
          </div>
        );
      })}
      <div className="ml-auto pl-3 pb-3 text-xs text-[#8C97AD] shrink-0">
        Step {current} of {total}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ApplyDesktop() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [flow, setFlow]               = useState<FlowType | null>(null);
  const [internalStep, setIntStep]    = useState<InternalStep>(1);
  const [externalStep, setExtStep]    = useState<ExternalStep>(1);
  const [expressStep, setExpStep]     = useState<ExpressStep>(1);
  const [submitted, setSubmitted]     = useState(false);

  /* Progress % */
  const progressPct = (() => {
    if (!flow) return 0;
    if (flow === 'internal') return (internalStep / 4) * 100;
    if (flow === 'external') return (externalStep / 4) * 100;
    if (flow === 'express')  return (expressStep  / 6) * 100;
    return 0;
  })();

  const stepLabels =
    flow === 'internal' ? INTERNAL_STEP_LABELS :
    flow === 'external' ? EXTERNAL_STEP_LABELS :
    EXPRESS_STEP_LABELS;

  const currentStep =
    flow === 'internal' ? internalStep :
    flow === 'external' ? externalStep :
    expressStep;

  const totalSteps = flow === 'express' ? 6 : 4;

  const resetFlow = (f: FlowType) => {
    setFlow(f);
    setIntStep(1);
    setExtStep(1);
    setExpStep(1);
    setSubmitted(false);
  };

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-start justify-center py-6 px-4">
      <div className="w-full max-w-2xl">
        {/* Back link */}
        {!submitted && (
          <Link
            href={`/opportunities/${params.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#44516A] hover:text-[#0F172A] mb-5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunity
          </Link>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#EEF2F8] shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-8">
          {/* ─ Success states ─ */}
          {submitted && flow !== 'express' && <SuccessView type={flow!} />}
          {flow === 'express' && expressStep === 6 && <ExpressStep6 />}

          {/* ─ Flow selector ─ */}
          {!flow && !submitted && <FlowSelector onSelect={resetFlow} />}

          {/* ─ Active flow with progress ─ */}
          {flow && !submitted && !(flow === 'express' && expressStep === 6) && (
            <>
              {/* Progress bar */}
              <div className="h-1.5 bg-[#EEF2F8] rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#2F66C8] rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Step tabs */}
              <StepTabs labels={stepLabels} current={currentStep} total={totalSteps} />

              {/* ── INTERNAL STEPS ── */}
              {flow === 'internal' && internalStep === 1 && (
                <InternalStep1 onNext={() => setIntStep(2)} onCancel={() => router.back()} />
              )}
              {flow === 'internal' && internalStep === 2 && (
                <InternalStep2 onNext={() => setIntStep(3)} onBack={() => setIntStep(1)} />
              )}
              {flow === 'internal' && internalStep === 3 && (
                <InternalStep3 onNext={() => setIntStep(4)} onBack={() => setIntStep(2)} />
              )}
              {flow === 'internal' && internalStep === 4 && (
                <InternalStep4 onBack={() => setIntStep(3)} onSubmit={() => setSubmitted(true)} />
              )}

              {/* ── EXTERNAL STEPS ── */}
              {flow === 'external' && externalStep === 1 && (
                <ExternalStep1 onNext={() => setExtStep(2)} onBack={() => setFlow(null)} />
              )}
              {flow === 'external' && externalStep === 2 && (
                <ExternalStep2 onNext={() => setExtStep(3)} onBack={() => setExtStep(1)} />
              )}
              {flow === 'external' && externalStep === 3 && (
                <ExternalStep3 onNext={() => setExtStep(4)} onBack={() => setExtStep(2)} />
              )}
              {flow === 'external' && externalStep === 4 && (
                <ExternalStep4 onBack={() => setExtStep(3)} />
              )}

              {/* ── EXPRESS STEPS ── */}
              {flow === 'express' && expressStep === 1 && (
                <ExpressStep1 onNext={() => setExpStep(2)} onBack={() => setFlow(null)} />
              )}
              {flow === 'express' && expressStep === 2 && (
                <ExpressStep2 onNext={() => setExpStep(3)} onBack={() => setExpStep(1)} />
              )}
              {flow === 'express' && expressStep === 3 && (
                <ExpressStep3 onNext={() => setExpStep(4)} onBack={() => setExpStep(2)} />
              )}
              {flow === 'express' && expressStep === 4 && (
                <ExpressStep4 onNext={() => setExpStep(5)} onBack={() => setExpStep(3)} />
              )}
              {flow === 'express' && expressStep === 5 && (
                <ExpressStep5 onNext={() => setExpStep(6)} onBack={() => setExpStep(4)} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
