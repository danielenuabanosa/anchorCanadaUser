'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, CheckCircle2, ChevronRight, Upload,
  FileText, Trash2, Send, Clock, MapPin, Eye,
  ExternalLink, User, Bell, Star, Calendar,
  Shield, Globe, Zap, Info, AlertCircle,
} from 'lucide-react';

/* ─ Types  ─ */
type FlowType = 'internal' | 'external' | 'express';
type InternalStep = 1 | 2 | 3 | 4;
type ExternalStep = 1 | 2 | 3 | 4;
type ExpressStep  = 1 | 2 | 3 | 4 | 5 | 6;

/* ─ Mock opportunity data ──────────────── */
const OPP = {
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

const INTERNAL_STEP_LABELS = ['Checklist', 'Details',   'Documents', 'Review'];
const EXTERNAL_STEP_LABELS = ['Overview',  'Profile',   'Documents', 'Redirect'];
const EXPRESS_STEP_LABELS  = ['Overview',  'Profile',   'Message',   'Availability', 'Review', 'Done'];

/* ─ Compact opp strip (mobile) ────────────── */
function OppMiniStrip() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#EEF2F8] mb-4">
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-white text-sm font-bold shrink-0 ${OPP.logoColor}`}>
        {OPP.logoInitial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0F172A] truncate">{OPP.title}</p>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-[#8C97AD]">
          <span>{OPP.company}</span>
          {OPP.verified && (
            <svg className="h-3.5 w-3.5 text-[#2F66C8] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          )}
          <span>·</span>
          <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{OPP.location}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-red-500 font-medium shrink-0">
        <Clock className="h-3 w-3" />
        {OPP.closesInDays}d
      </div>
    </div>
  );
}

/* ─ Shared: section heading ──────────────── */
function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
      {subtitle && <p className="text-xs text-[#8C97AD] mt-0.5 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ApplyMobile() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [flow, setFlow]             = useState<FlowType | null>(null);
  const [internalStep, setIntStep]  = useState<InternalStep>(1);
  const [externalStep, setExtStep]  = useState<ExternalStep>(1);
  const [expressStep, setExpStep]   = useState<ExpressStep>(1);
  const [submitted, setSubmitted]   = useState(false);

  /* Form state (lifted) */
  const [availability, setAvail]    = useState('Full-time');
  const [startDate, setStartDate]   = useState('Immediately');
  const [coverText, setCoverText]   = useState('');
  const [message, setMessage]       = useState('');
  const [notify, setNotify]         = useState(true);
  const [agreed, setAgreed]         = useState(false);
  const [files, setFiles]           = useState<Record<string, string[]>>({
    resume: ['Sarah_Sullivan_Resume.pdf'], cover: [], portfolio: [],
  });

  const addFile    = (key: string, name: string) => setFiles(p => ({ ...p, [key]: [...(p[key] ?? []), name] }));
  const removeFile = (key: string, name: string) => setFiles(p => ({ ...p, [key]: (p[key] ?? []).filter(f => f !== name) }));

  /* Step labels & progress */
  const stepLabels  = flow === 'internal' ? INTERNAL_STEP_LABELS : flow === 'external' ? EXTERNAL_STEP_LABELS : EXPRESS_STEP_LABELS;
  const currentStep = flow === 'internal' ? internalStep : flow === 'external' ? externalStep : expressStep;
  const totalSteps  = flow === 'express' ? 6 : 4;
  const progressPct = !flow ? 0 : (currentStep / totalSteps) * 100;

  /* Header title */
  const headerTitle = (() => {
    if (!flow)  return 'How to Apply';
    if (flow === 'internal') return INTERNAL_STEP_LABELS[internalStep - 1] ?? 'Apply';
    if (flow === 'external') return EXTERNAL_STEP_LABELS[externalStep - 1] ?? 'Apply on Website';
    return EXPRESS_STEP_LABELS[expressStep - 1] ?? 'Express Interest';
  })();

  /* Back handler */
  const handleBack = () => {
    if (!flow) { router.back(); return; }
    if (flow === 'internal') { if (internalStep > 1) setIntStep(s => Math.max(s - 1, 1) as InternalStep); else setFlow(null); return; }
    if (flow === 'external') { if (externalStep > 1) setExtStep(s => Math.max(s - 1, 1) as ExternalStep); else setFlow(null); return; }
    if (expressStep > 1) setExpStep(s => Math.max(s - 1, 1) as ExpressStep); else setFlow(null);
  };

  const resetFlow = (f: FlowType) => {
    setFlow(f); setIntStep(1); setExtStep(1); setExpStep(1); setSubmitted(false);
  };

  const isSuccess = submitted || (flow === 'express' && expressStep === 6);
  const showProgress = !!flow && !isSuccess;
  const showStepCount = !!flow && !isSuccess;

  /* ─ Success / done screen ─ */
  if (isSuccess) {
    const msgs: Record<FlowType, { title: string; body: string; bg: string; icon: React.ReactNode }> = {
      internal: { title: 'Application Submitted!', body: `Your application for ${OPP.title} has been submitted. We'll notify you of any updates.`, bg: 'bg-[#ECFDF5]', icon: <CheckCircle2 className="h-10 w-10 text-[#22C55E]" /> },
      external: { title: 'Redirected!',            body: `Head to Shopify's careers portal to complete your application. Return here to track status.`,   bg: 'bg-[#EFF4FF]', icon: <ExternalLink className="h-10 w-10 text-[#2F66C8]" /> },
      express:  { title: 'Interest Expressed!',    body: `${OPP.company} has been notified. You'll hear back within 3–5 business days.`,                  bg: 'bg-[#ECFDF5]', icon: <CheckCircle2 className="h-10 w-10 text-[#22C55E]" /> },
    };
    const m = msgs[flow ?? 'internal'];
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-14 text-center px-6">
        <div className={`flex items-center justify-center w-20 h-20 rounded-full ${m.bg}`}>{m.icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-[#0F172A]">{m.title}</h3>
          <p className="text-sm text-[#44516A] mt-2 leading-relaxed">{m.body}</p>
        </div>
        {flow === 'express' && (
          <div className="w-full rounded-xl border border-[#EEF2F8] bg-[#F8FAFC] p-4 text-left">
            <p className="text-xs font-semibold text-[#0F172A] mb-2">What happens next?</p>
            {['Shopify reviews your profile', "You'll get notified of their decision", 'You can still apply directly at any time'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#44516A] mb-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2F66C8] shrink-0" />{s}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <Link href="/applications" className="w-full text-center px-6 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold">View My Applications</Link>
          <Link href="/opportunities" className="w-full text-center px-6 py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">Explore More</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-28">
      {/* ─ Sticky header ─ */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#EEF2F8]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={handleBack} className="p-1 -ml-1 text-[#44516A]">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-[#0F172A] flex-1 truncate">{headerTitle}</span>
          {showStepCount && (
            <span className="text-xs text-[#8C97AD] shrink-0">
              {currentStep}/{totalSteps}
            </span>
          )}
        </div>
        {showProgress && (
          <div className="h-1 bg-[#EEF2F8]">
            <div
              className="h-full bg-[#2F66C8] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>

      {/* ─ Scrollable content ─ */}
      <div className="px-4 pt-5 flex flex-col gap-5">

        {/* ══ FLOW SELECTOR ══ */}
        {!flow && (
          <>
            <OppMiniStrip />
            <SectionHead title="How would you like to apply?" subtitle="Choose the application method that works best for you." />
            <div className="flex flex-col gap-3">
              {[
                { type: 'internal' as FlowType, icon: <Shield className="h-5 w-5 text-[#2F66C8]" />, iconBg: 'bg-[#EFF4FF]', title: 'Apply via Anchor', badge: 'Recommended', badgeCls: 'bg-[#EFF4FF] text-[#2F66C8]', desc: 'Submit your application entirely within Anchor Canada.', steps: '4 steps' },
                { type: 'external' as FlowType, icon: <Globe className="h-5 w-5 text-[#44516A]" />,   iconBg: 'bg-[#F8FAFC]',  title: 'Apply on Provider Website', badge: null, badgeCls: '', desc: "We guide you, then redirect you to Shopify's portal.", steps: '4 steps' },
                { type: 'express'  as FlowType, icon: <Zap className="h-5 w-5 text-[#22C55E]" />,    iconBg: 'bg-[#ECFDF5]',  title: 'Express Interest', badge: 'Quick · 2 min', badgeCls: 'bg-[#ECFDF5] text-[#16A34A]', desc: 'Share your profile — provider will reach out if interested.', steps: '6 steps' },
              ].map(({ type, icon, iconBg, title, badge, badgeCls, desc, steps }) => (
                <button
                  key={type}
                  onClick={() => resetFlow(type)}
                  className="flex items-start gap-3 p-4 rounded-2xl border-2 border-[#EEF2F8] hover:border-[#2F66C8] transition-all text-left group"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${iconBg}`}>{icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-[#0F172A]">{title}</p>
                      {badge && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeCls}`}>{badge}</span>}
                    </div>
                    <p className="text-xs text-[#8C97AD] leading-relaxed">{desc}</p>
                    <p className="text-[10px] text-[#8C97AD] mt-1 font-medium">{steps}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#D9E1EF] group-hover:text-[#2F66C8] mt-0.5 shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════
            INTERNAL FLOW
            ══════════════════════════════════════════════════ */}

        {/* Internal Step 1: Checklist */}
        {flow === 'internal' && internalStep === 1 && (
          <>
            <OppMiniStrip />
            <SectionHead title="Application Checklist" subtitle="Review all requirements before starting your application." />
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#EFF4FF] border border-[#D9E1EF]">
              <p className="text-xs font-medium text-[#0F172A]">Ready items</p>
              <span className="text-xs font-bold text-[#2F66C8]">
                {INTERNAL_CHECKLIST.filter(i => i.ready).length} / {INTERNAL_CHECKLIST.length}
              </span>
            </div>
            <div className="rounded-2xl border border-[#EEF2F8] overflow-hidden divide-y divide-[#EEF2F8]">
              {INTERNAL_CHECKLIST.map(item => (
                <div key={item.label} className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`h-4.5 w-4.5 ${item.ready ? 'text-[#22C55E]' : 'text-[#D9E1EF]'}`} />
                    <span className="text-sm font-medium text-[#0F172A]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.required && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#2F66C8]">Required</span>}
                    {!item.ready && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600">To do</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF7ED] border border-amber-200">
              <Info className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700">You can still start — you&apos;ll upload documents in later steps.</p>
            </div>
          </>
        )}

        {/* Internal Step 2: Details */}
        {flow === 'internal' && internalStep === 2 && (
          <div className="flex flex-col gap-4">
            <SectionHead title="Your Details" subtitle="Confirm your personal information for this application." />
            {[
              { label: 'First Name', ph: 'First name',          value: 'Sarah',                     type: 'text'  },
              { label: 'Last Name',  ph: 'Last name',           value: 'Sullivan',                  type: 'text'  },
              { label: 'Email',      ph: 'your@email.com',      value: 'sarahsullivan@gmail.com',   type: 'email' },
              { label: 'Phone',      ph: '+1 (555) 000-0000',   value: '',                          type: 'tel'   },
              { label: 'LinkedIn',   ph: 'https://linkedin.com/in/...', value: '',                  type: 'url'   },
              { label: 'Portfolio',  ph: 'https://...',          value: '',                          type: 'url'   },
            ].map(({ label, ph, value, type }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">{label}</label>
                <input
                  type={type}
                  defaultValue={value}
                  placeholder={ph}
                  className="h-11 rounded-xl border border-[#D9E1EF] px-3 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#2F66C8] focus:ring-2 focus:ring-[#2F66C8]/20 transition"
                />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Availability</label>
              <div className="flex gap-2 flex-wrap">
                {['Full-time', 'Part-time', 'Flexible'].map(opt => (
                  <button
                    key={opt} type="button"
                    onClick={() => setAvail(opt)}
                    className={`px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${availability === opt ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A]'}`}
                  >{opt}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Cover Letter</label>
              <textarea
                value={coverText}
                onChange={e => setCoverText(e.target.value)}
                placeholder="Tell us why you're a great fit..."
                rows={4}
                className="rounded-xl border border-[#D9E1EF] px-3 py-2.5 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#2F66C8] resize-none transition"
              />
            </div>
          </div>
        )}

        {/* Internal Step 3: Documents */}
        {flow === 'internal' && internalStep === 3 && (
          <div className="flex flex-col gap-4">
            <SectionHead title="Upload Documents" subtitle="Upload your documents to complete the application." />
            {[
              { key: 'resume',    label: 'Resume',      required: true  },
              { key: 'cover',     label: 'Cover Letter', required: true  },
              { key: 'portfolio', label: 'Portfolio',    required: false },
            ].map(({ key, label, required }) => (
              <div key={key} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#0F172A]">{label}</span>
                  {required
                    ? <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#2F66C8]">Required</span>
                    : <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#F8FAFC] text-[#8C97AD]">Optional</span>
                  }
                </div>
                {(files[key] ?? []).map(name => (
                  <div key={name} className="flex items-center gap-3 rounded-xl border border-[#D9E1EF] bg-[#F8FAFC] px-3 py-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EFF4FF] shrink-0">
                      <FileText className="h-4 w-4 text-[#2F66C8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] truncate">{name}</p>
                      <p className="text-xs text-[#8C97AD]">PDF · ~1.2 MB</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-[#8C97AD]"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => removeFile(key, name)} className="p-1.5 text-[#8C97AD]"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
                <label className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[#D9E1EF] bg-[#F8FAFC] p-4 cursor-pointer">
                  <input type="file" className="sr-only" onChange={e => { const n = e.target.files?.[0]?.name; if (n) addFile(key, n); }} />
                  <Upload className="h-5 w-5 text-[#2F66C8]" />
                  <p className="text-xs text-[#44516A]"><span className="font-semibold text-[#2F66C8]">Tap to upload</span> or drag and drop</p>
                  <p className="text-[10px] text-[#8C97AD]">PDF, DOC up to 10 MB</p>
                </label>
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-1">
              <h4 className="text-xs font-semibold text-[#0F172A]">Application Questions</h4>
              {[
                'Why are you interested in this UX Design Intern role at Shopify?',
                'Describe a design project where you improved user experience.',
              ].map((q, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#44516A]">Q{i + 1}. {q}</label>
                  <textarea
                    rows={3}
                    placeholder="Your answer..."
                    className="rounded-xl border border-[#D9E1EF] px-3 py-2.5 text-sm focus:outline-none focus:border-[#2F66C8] resize-none transition"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal Step 4: Review */}
        {flow === 'internal' && internalStep === 4 && (
          <div className="flex flex-col gap-4">
            <SectionHead title="Review & Submit" subtitle="Review your application before submitting." />
            <OppMiniStrip />
            {[
              { title: 'Personal Info', rows: [['Name', 'Sarah Sullivan'], ['Email', 'sarahsullivan@gmail.com'], ['Availability', availability]] },
              { title: 'Documents', rows: [['Resume', 'Sarah_Sullivan_Resume.pdf'], ['Portfolio', 'Portfolio_2025.pdf']] },
              { title: 'Questions', rows: [['Q1', "I'm passionate about accessible design..."], ['Q2', 'At TechCorp I redesigned the onboarding flow...']] },
            ].map(section => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold text-[#0F172A] mb-1.5">{section.title}</h4>
                <div className="rounded-xl border border-[#EEF2F8] divide-y divide-[#EEF2F8] overflow-hidden">
                  {section.rows.map(([label, value]) => (
                    <div key={label} className="flex items-start gap-3 px-3 py-2.5">
                      <span className="text-xs text-[#8C97AD] w-20 shrink-0 mt-0.5">{label}</span>
                      <span className="text-xs font-medium text-[#0F172A] flex-1 leading-relaxed">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-[#EEF2F8]">
              <div
                onClick={() => setAgreed(v => !v)}
                className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${agreed ? 'bg-[#2F66C8] border-[#2F66C8]' : 'bg-white border-[#D9E1EF]'}`}
              >
                {agreed && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span className="text-xs text-[#44516A]">I confirm all information is accurate. False information may result in disqualification.</span>
            </label>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            EXTERNAL FLOW
            ══════════════════════════════════════════════════ */}

        {/* External Step 1: Overview */}
        {flow === 'external' && externalStep === 1 && (
          <>
            <OppMiniStrip />
            <SectionHead title="Apply on Provider Website" subtitle="We'll prepare you, then redirect you to Shopify's official careers portal." />
            <div className="flex flex-col gap-2.5">
              {[
                'Review the opportunity requirements',
                'Prepare your resume, cover letter, and portfolio',
                'Confirm your profile details are up to date',
                'Click "Go to Shopify" to open their careers portal',
                'Complete and submit your application on their site',
                'Return here to track your application status',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#2F66C8] text-white text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-xs text-[#44516A]">{text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* External Step 2: Your Profile */}
        {flow === 'external' && externalStep === 2 && (
          <>
            <SectionHead title="Your Profile" subtitle="This information will be associated with your external application." />
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC]">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2F66C8] text-white font-bold shrink-0">SS</div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Sarah Sullivan</p>
                <p className="text-xs text-[#44516A]">sarahsullivan@gmail.com</p>
                <p className="text-[10px] text-[#8C97AD] mt-0.5">UX Designer · Toronto, ON</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#EEF2F8] divide-y divide-[#EEF2F8] overflow-hidden">
              {[['Full Name', 'Sarah Sullivan'], ['Email', 'sarahsullivan@gmail.com'], ['Phone', '+1 (555) 000-0000'], ['Availability', 'Full-time']].map(([label, value]) => (
                <div key={label} className="flex items-start gap-3 px-3 py-2.5">
                  <span className="text-xs text-[#8C97AD] w-20 shrink-0 mt-0.5">{label}</span>
                  <span className="text-xs font-medium text-[#0F172A] flex-1">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EFF4FF] border border-[#D9E1EF]">
              <Info className="h-4 w-4 text-[#2F66C8] shrink-0" />
              <p className="text-xs text-[#44516A]">Profile will be visible to Shopify when you apply on their portal.</p>
            </div>
          </>
        )}

        {/* External Step 3: Documents */}
        {flow === 'external' && externalStep === 3 && (
          <>
            <SectionHead title="Prepare Your Documents" subtitle="Have these ready before visiting Shopify's careers portal." />
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Resume',       note: 'Up-to-date PDF format recommended',        required: true,  ready: true  },
                { label: 'Cover Letter', note: 'Tailored to the UX Design Intern role',     required: true,  ready: false },
                { label: 'Portfolio',    note: 'Link or PDF showcasing your design work',   required: false, ready: true  },
              ].map(({ label, note, required, ready }) => (
                <div key={label} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${ready ? 'bg-[#ECFDF5]' : 'bg-amber-50'}`}>
                    <FileText className={`h-4 w-4 ${ready ? 'text-[#22C55E]' : 'text-amber-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-[#0F172A]">{label}</p>
                      {required && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#2F66C8] font-semibold">Required</span>}
                    </div>
                    <p className="text-[10px] text-[#8C97AD] mt-0.5">{note}</p>
                  </div>
                  {ready ? <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0" /> : <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700">You&apos;ll upload documents directly on Shopify&apos;s portal.</p>
            </div>
          </>
        )}

        {/* External Step 4: Redirect */}
        {flow === 'external' && externalStep === 4 && (
          <div className="flex flex-col items-center text-center gap-5 py-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100">
              <ExternalLink className="h-7 w-7 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0F172A]">You&apos;re leaving Anchor Canada</h3>
              <p className="text-sm text-[#44516A] mt-2 leading-relaxed">
                You&apos;ll be redirected to <strong>Shopify&apos;s</strong> official careers portal to complete your application.
              </p>
            </div>
            <div className="w-full rounded-xl border border-[#EEF2F8] bg-[#F8FAFC] p-4 text-left">
              <p className="text-xs font-semibold text-[#0F172A] mb-2">What to expect:</p>
              {['Visit careers.shopify.com', 'Log in or create an account', 'Upload your documents', 'Submit your application there'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#44516A] mb-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2F66C8] shrink-0" />{item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            EXPRESS INTEREST FLOW
            ══════════════════════════════════════════════════ */}

        {/* Express Step 1: Overview */}
        {flow === 'express' && expressStep === 1 && (
          <>
            <OppMiniStrip />
            <SectionHead title="Express Your Interest" subtitle="Share your profile and a quick note — no formal application required yet." />
            <div className="rounded-2xl border border-[#EEF2F8] bg-[#EFF4FF]/30 p-4">
              <p className="text-xs font-semibold text-[#0F172A] mb-3">What is Express Interest?</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: <User className="h-4 w-4 text-[#2F66C8]" />,     text: 'Your Anchor profile is shared with the provider' },
                  { icon: <Calendar className="h-4 w-4 text-[#2F66C8]" />, text: 'Provider reviews your profile in 3–5 business days' },
                  { icon: <Bell className="h-4 w-4 text-[#2F66C8]" />,     text: "You'll be notified if they'd like you to apply" },
                  { icon: <Star className="h-4 w-4 text-[#2F66C8]" />,     text: 'You can still apply directly at any time' },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EFF4FF] shrink-0">{icon}</div>
                    <p className="text-xs text-[#44516A]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Express Step 2: Profile Preview */}
        {flow === 'express' && expressStep === 2 && (
          <>
            <SectionHead title="Your Profile Preview" subtitle="This is what the provider will see when you express interest." />
            <div className="rounded-2xl border border-[#EEF2F8] bg-[#F8FAFC] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2F66C8] text-white font-bold shrink-0">SS</div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Sarah Sullivan</p>
                  <p className="text-xs text-[#44516A]">UX Designer</p>
                  <p className="text-[10px] text-[#8C97AD] flex items-center gap-0.5 mt-0.5"><MapPin className="h-3 w-3" />Toronto, ON</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Figma', 'User Research', 'Prototyping', 'Accessibility'].map(skill => (
                  <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#2F66C8] font-medium">{skill}</span>
                ))}
              </div>
              <div className="border-t border-[#EEF2F8] pt-3 text-xs text-[#44516A] leading-relaxed">
                <p className="font-medium text-[#0F172A] mb-1">About</p>
                <p>UX designer with 2 years of experience creating user-centered digital experiences.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EFF4FF] border border-[#D9E1EF]">
              <Info className="h-4 w-4 text-[#2F66C8] shrink-0" />
              <p className="text-xs text-[#44516A]">Only your public profile is shared. <span className="font-semibold text-[#2F66C8]">Edit Profile</span></p>
            </div>
          </>
        )}

        {/* Express Step 3: Message */}
        {flow === 'express' && expressStep === 3 && (
          <>
            <SectionHead title="Your Message" subtitle="Add a personal note to stand out. Completely optional." />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Message to Provider <span className="font-normal text-[#8C97AD]">(Optional)</span></label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value.slice(0, 300))}
                placeholder="Briefly share why you're interested and what makes you a great fit..."
                rows={5}
                className="rounded-xl border border-[#D9E1EF] px-3 py-2.5 text-sm text-[#0F172A] placeholder-[#8C97AD] focus:outline-none focus:border-[#2F66C8] resize-none transition"
              />
              <p className={`text-xs text-right ${message.length >= 300 ? 'text-red-500' : 'text-[#8C97AD]'}`}>{message.length}/300</p>
            </div>
            <div className="rounded-xl border border-[#EEF2F8] bg-[#F8FAFC] p-3">
              <p className="text-[10px] font-semibold text-[#0F172A] mb-1">Example:</p>
              <p className="text-[10px] text-[#8C97AD] italic leading-relaxed">&quot;Hi, I&apos;m Sarah — a UX designer passionate about accessible design. I&apos;d love to contribute to Shopify&apos;s design team.&quot;</p>
            </div>
          </>
        )}

        {/* Express Step 4: Availability */}
        {flow === 'express' && expressStep === 4 && (
          <>
            <SectionHead title="Availability & Preferences" subtitle="Let the provider know when and how you can start." />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Availability</label>
              <div className="flex gap-2 flex-wrap">
                {['Full-time', 'Part-time', 'Flexible'].map(opt => (
                  <button
                    key={opt} type="button"
                    onClick={() => setAvail(opt)}
                    className={`px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${availability === opt ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A]'}`}
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
                    className={`px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${startDate === opt ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]' : 'border-[#D9E1EF] text-[#44516A]'}`}
                  >{opt}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#EEF2F8] bg-[#F8FAFC]">
              <div>
                <p className="text-xs font-medium text-[#0F172A]">Notify me when reviewed</p>
                <p className="text-[10px] text-[#8C97AD] mt-0.5">Email when provider views your interest</p>
              </div>
              <button
                type="button"
                onClick={() => setNotify(v => !v)}
                className={`relative w-9 h-5 rounded-full transition-colors ${notify ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notify ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </>
        )}

        {/* Express Step 5: Review */}
        {flow === 'express' && expressStep === 5 && (
          <div className="flex flex-col gap-4">
            <SectionHead title="Review Your Expression" subtitle="Confirm everything looks correct before sending." />
            <OppMiniStrip />
            {[
              { title: 'Profile Shared', rows: [['Name', 'Sarah Sullivan'], ['Email', 'sarahsullivan@gmail.com'], ['Availability', availability], ['Start', startDate]] },
              { title: 'Message', rows: [['To Provider', message || '(No message added)']] },
              { title: 'Settings', rows: [['Notifications', notify ? 'Enabled' : 'Disabled']] },
            ].map(section => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold text-[#0F172A] mb-1.5">{section.title}</h4>
                <div className="rounded-xl border border-[#EEF2F8] divide-y divide-[#EEF2F8] overflow-hidden">
                  {section.rows.map(([label, value]) => (
                    <div key={label} className="flex items-start gap-3 px-3 py-2.5">
                      <span className="text-xs text-[#8C97AD] w-20 shrink-0 mt-0.5">{label}</span>
                      <span className="text-xs font-medium text-[#0F172A] flex-1 leading-relaxed">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─ Fixed bottom CTA ─ */}
      {!isSuccess && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#EEF2F8] px-4 py-3">
          {!flow && (
            <Link href={`/opportunities/${params.id}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">
              <ArrowLeft className="h-4 w-4" /> Back to Opportunity
            </Link>
          )}

          {/* Internal CTAs */}
          {flow === 'internal' && (
            <div className="flex gap-3">
              {internalStep > 1 ? (
                <button onClick={() => setIntStep(s => Math.max(s - 1, 1) as InternalStep)} className="px-4 py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">
                  Back
                </button>
              ) : (
                <button onClick={() => setFlow(null)} className="px-4 py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">
                  Cancel
                </button>
              )}
              {internalStep < 4 && (
                <button
                  onClick={() => setIntStep(s => Math.min(s + 1, 4) as InternalStep)}
                  className="flex-1 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {internalStep === 1 ? 'Start Application' : 'Continue'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {internalStep === 4 && (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!agreed}
                  className="flex-1 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" /> Submit Application
                </button>
              )}
            </div>
          )}

          {/* External CTAs */}
          {flow === 'external' && (
            <div className="flex gap-3">
              {externalStep > 1 ? (
                <button onClick={() => setExtStep(s => Math.max(s - 1, 1) as ExternalStep)} className="px-4 py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">
                  Back
                </button>
              ) : (
                <button onClick={() => setFlow(null)} className="px-4 py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">
                  Cancel
                </button>
              )}
              {externalStep < 4 && (
                <button
                  onClick={() => setExtStep(s => Math.min(s + 1, 4) as ExternalStep)}
                  className="flex-1 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {externalStep === 4 && (
                <a
                  href={OPP.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" /> Go to Shopify
                </a>
              )}
            </div>
          )}

          {/* Express CTAs */}
          {flow === 'express' && (
            <div className="flex gap-3">
              {expressStep > 1 ? (
                <button onClick={() => setExpStep(s => Math.max(s - 1, 1) as ExpressStep)} className="px-4 py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">
                  Back
                </button>
              ) : (
                <button onClick={() => setFlow(null)} className="px-4 py-3 rounded-xl border border-[#D9E1EF] text-sm font-medium text-[#44516A]">
                  Cancel
                </button>
              )}
              {expressStep < 5 && (
                <button
                  onClick={() => setExpStep(s => Math.min(s + 1, 5) as ExpressStep)}
                  className="flex-1 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {expressStep === 1 ? 'Get Started' : 'Continue'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              {expressStep === 5 && (
                <button
                  onClick={() => setExpStep(6)}
                  className="flex-1 py-3 rounded-xl bg-[#2F66C8] text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send Expression
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
