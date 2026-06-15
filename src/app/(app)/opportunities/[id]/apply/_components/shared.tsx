'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Info,
  Link2,
  Lock,
  MapPin,
  Upload,
  X,
} from 'lucide-react';
import type { ApplyStep, FlowType } from './types';
import {
  ENTRY_CHECKLIST,
  EXPRESS_TIMELINE,
  EXTERNAL_NEEDS,
  EXTERNAL_PROGRESS,
  INTERNAL_NEXT_STEPS,
  INTERNAL_QUESTIONS,
  OPP,
  PROFILE,
} from './data';
import {
  EXPRESS_STEP_LABELS,
  EXTERNAL_STEP_LABELS,
  INTERNAL_STEP_LABELS,
} from './types';

/* ── Layout primitives ─────────────────────────────────────────────── */

export function SerifTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-instrument-serif text-[28px] leading-tight text-[#0F172A] md:text-[28px] ${className}`}>
      {children}
    </h2>
  );
}

export function ProgressHeader({
  step,
  total,
  backLabel,
  onBack,
  showOpportunityBack = false,
  opportunityId,
}: {
  step: number;
  total: number;
  backLabel: string;
  onBack: () => void;
  showOpportunityBack?: boolean;
  opportunityId: string;
}) {
  const pct = (step / total) * 100;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        {showOpportunityBack ? (
          <Link
            href={`/opportunities/${opportunityId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2F66C8] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunity
          </Link>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2F66C8] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </button>
        )}
        <span className="text-sm text-[#8C97AD]">
          Step {step} of {total}
        </span>
      </div>
      <div className="h-3 rounded-full bg-[#EEF2F8] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#2F66C8] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function OppSummaryCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] ${compact ? 'p-4' : 'p-5'}`}>
      <p className="text-sm font-medium text-[#8C97AD] mb-3">You&apos;re applying for</p>
      <div className="flex items-start gap-4">
        <div
          className={`flex items-center justify-center rounded-xl text-white font-bold shrink-0 ${OPP.logoColor} ${compact ? 'w-10 h-10 text-sm' : 'w-12 h-12 text-base'}`}
        >
          {OPP.logoInitial}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-instrument-serif text-[#0F172A] ${compact ? 'text-xl' : 'text-[28px] leading-tight'}`}>
            {OPP.title}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-sm text-[#44516A]">{OPP.company}</span>
            {OPP.verified && (
              <svg className="h-4 w-4 text-[#2F66C8] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#44516A]">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {OPP.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              {OPP.pay}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bookmark className="h-3.5 w-3.5" />
              {OPP.type}
            </span>
            <span className="inline-flex items-center gap-1 text-[#EF4444] font-medium">
              <Clock className="h-3.5 w-3.5" />
              Closes in {OPP.closesInDays} days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequiredBadge() {
  return (
    <span className="rounded-[2px] bg-[#EFF4FF] px-2 py-0.5 text-xs font-medium text-[#2F66C8]">
      Required
    </span>
  );
}

function ChecklistRow({ label, required }: { label: string; required: boolean }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-[#EEF2F8] last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ECFDF5]">
          <CheckCircle2 className="h-4 w-4 text-[#15803D]" />
        </div>
        <span className="text-sm font-medium text-[#0F172A]">{label}</span>
      </div>
      {required && <RequiredBadge />}
    </div>
  );
}

export function FlowFooter({
  onBack,
  onPrimary,
  backLabel = 'Back',
  primaryLabel,
  primaryDisabled = false,
  secondaryLabel,
  onSecondary,
  variant = 'inline',
}: {
  onBack?: () => void;
  onPrimary: () => void;
  backLabel?: string;
  primaryLabel: string;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
  variant?: 'inline' | 'desktop';
}) {
  const barClass =
    variant === 'desktop'
      ? '-mx-[26px] mt-7 border-t border-[#EEF2F8] bg-[#F8FAFC] px-[26px] py-[26px]'
      : 'pt-2';

  return (
    <div className={`flex items-center justify-end gap-5 ${barClass}`}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-md border border-[#EEF2F8] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC] transition-colors"
        >
          {backLabel}
        </button>
      )}
      {secondaryLabel && onSecondary && (
        <button
          type="button"
          onClick={onSecondary}
          className="px-5 py-3 rounded-md border border-[#EEF2F8] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC] transition-colors"
        >
          {secondaryLabel}
        </button>
      )}
      <button
        type="button"
        onClick={onPrimary}
        disabled={primaryDisabled}
        className="px-5 py-3 rounded-md bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {primaryLabel}
      </button>
    </div>
  );
}

/* ── Step 1: Entry Checklist (653:22245 / 653:23470) ─────────────── */

export function EntryChecklistStep({
  onContinue,
  onCancel,
  opportunityId,
}: {
  onContinue: () => void;
  onCancel: () => void;
  opportunityId: string;
}) {
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader
        step={1}
        total={4}
        backLabel="Back"
        onBack={onCancel}
        showOpportunityBack
        opportunityId={opportunityId}
      />
      <OppSummaryCard />
      <div>
        <SerifTitle>Application Checklist</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">Please review all requirement before starting.</p>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-4">
        {ENTRY_CHECKLIST.map((item) => (
          <ChecklistRow key={item.label} label={item.label} required={item.required} />
        ))}
      </div>
      <FlowFooter
        onBack={onCancel}
        backLabel="Cancel"
        onPrimary={onContinue}
        primaryLabel="Start Application"
        variant="desktop"
      />
    </div>
  );
}

/* ── Internal flow steps ─────────────────────────────────────────── */

export function InternalDocumentsStep({
  files,
  onReplace,
  onBack,
  onContinue,
}: {
  files: Record<string, string>;
  onReplace: (key: string, name: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const slots: { key: string; label: string; hint: string; optional?: boolean }[] = [
    { key: 'resume', label: 'Resume', hint: 'PDF, DOC, DOCX (Max 10MB)' },
    { key: 'cover', label: 'Cover Letter', hint: 'PDF, DOC, DOCX (Max 10MB)' },
    { key: 'portfolio', label: 'Portfolio', hint: 'PDF or Link (Max 20MB)' },
    { key: 'caseStudy', label: 'Portfolio', hint: 'PDF or Link (Max 20MB)', optional: true },
  ];

  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={2} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Upload Documents</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">Upload all required documents for your application.</p>
      </div>
      <div className="flex flex-col gap-6">
        {slots.map(({ key, label, hint, optional }) => {
          const uploaded = files[key];
          return (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0F172A]">
                {label}
                {!optional && <span className="text-[#EF4444] ml-0.5">*</span>}
              </label>
              <p className="text-xs text-[#8C97AD]">{hint}</p>
              {uploaded ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-1 items-center gap-3 rounded-md border border-[#D9E1EF] bg-white px-4 py-3">
                    <FileText className="h-5 w-5 text-[#2F66C8] shrink-0" />
                    <span className="text-sm text-[#0F172A] truncate">{uploaded}</span>
                    <CheckCircle2 className="h-5 w-5 text-[#15803D] ml-auto shrink-0" />
                  </div>
                  <label className="shrink-0 cursor-pointer rounded-md border border-[#2F66C8] px-4 py-3 text-sm font-medium text-[#2F66C8] hover:bg-[#EFF4FF] transition-colors">
                    Replace File
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        const name = e.target.files?.[0]?.name;
                        if (name) onReplace(key, name);
                      }}
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#D9E1EF] bg-[#F8FAFC] p-8 cursor-pointer hover:border-[#2F66C8] hover:bg-[#EFF4FF]/30 transition-colors">
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      const name = e.target.files?.[0]?.name;
                      if (name) onReplace(key, name);
                    }}
                  />
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#EFF4FF]">
                    <Upload className="h-5 w-5 text-[#2F66C8]" />
                  </div>
                  <p className="text-sm font-medium text-[#44516A]">Upload Document</p>
                  <p className="text-xs text-[#8C97AD]">Drag &amp; drop or click to browse</p>
                </label>
              )}
            </div>
          );
        })}
      </div>
      <FlowFooter
        onBack={onBack}
        secondaryLabel="Save Progress"
        onSecondary={onContinue}
        onPrimary={onContinue}
        primaryLabel="Continue"
        variant="desktop"
      />
    </div>
  );
}

export function InternalQuestionsStep({
  answers,
  onChange,
  onBack,
  onContinue,
}: {
  answers: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={3} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Application Questions</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">Answer all required questions for this application.</p>
      </div>
      <div className="flex flex-col gap-5">
        {INTERNAL_QUESTIONS.map((q, i) => (
          <div key={q.id} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0F172A]">
              {i + 1}. {q.label}
              <span className="text-[#EF4444] ml-0.5">*</span>
            </label>
            <textarea
              rows={3}
              value={answers[q.id] ?? q.defaultValue}
              onChange={(e) => onChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              className="anchor-textarea"
            />
          </div>
        ))}
      </div>
      <FlowFooter onBack={onBack} onPrimary={onContinue} primaryLabel="Continue" variant="desktop" />
    </div>
  );
}

export function InternalReviewStep({
  files,
  answers,
  agreed,
  onAgreedChange,
  onBack,
  onSubmit,
}: {
  files: Record<string, string>;
  answers: Record<string, string>;
  agreed: boolean;
  onAgreedChange: (v: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={4} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Review Your Application</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">Please review all information before submitting.</p>
      </div>
      <ReviewSection title="Documents" onEdit={onBack}>
        {Object.values(files)
          .filter(Boolean)
          .map((name) => (
            <div key={name} className="flex items-center gap-2 py-2 text-sm text-[#0F172A]">
              <FileText className="h-4 w-4 text-[#EF4444] shrink-0" />
              {name}
            </div>
          ))}
      </ReviewSection>
      <ReviewSection title="Your Answers" onEdit={onBack}>
        {INTERNAL_QUESTIONS.map((q) => (
          <div key={q.id} className="py-3 border-b border-[#EEF2F8] last:border-0">
            <p className="text-sm font-medium text-[#0F172A]">{q.label}</p>
            <p className="text-sm text-[#8C97AD] mt-1 leading-relaxed">{answers[q.id] ?? q.defaultValue}</p>
          </div>
        ))}
      </ReviewSection>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[#D9E1EF] text-[#2F66C8] focus:ring-[#2F66C8]"
        />
        <span className="text-sm text-[#44516A]">
          I certify that the information provided is accurate and complete to the best of my knowledge.
        </span>
      </label>
      <FlowFooter
        onBack={onBack}
        onPrimary={onSubmit}
        primaryLabel="Submit Application"
        primaryDisabled={!agreed}
        variant="desktop"
      />
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-semibold text-[#0F172A]">{title}</h4>
        <button type="button" onClick={onEdit} className="text-sm font-medium text-[#2F66C8] hover:opacity-80">
          Edit
        </button>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-4">{children}</div>
    </div>
  );
}

export function InternalSuccessStep({
  layout = 'panel',
}: {
  opportunityId: string;
  layout?: 'panel' | 'page';
}) {
  const footerClass =
    layout === 'panel'
      ? '-mx-[26px] border-t border-[#EEF2F8] bg-[#F8FAFC] px-[26px] py-[26px] mt-2'
      : 'border-t border-[#EEF2F8] pt-6 mt-6';
  return (
    <div className="flex flex-col items-center gap-8 py-4 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#15803D] text-white shadow-sm">
        <Check className="h-10 w-10" />
      </div>
      <div>
        <h3 className="font-instrument-serif text-[28px] text-[#0F172A] leading-tight">
          Application{' '}
          <span className="font-instrument-serif italic text-[#2F66C8] text-[36px]">Submitted!</span>
        </h3>
        <p className="text-sm text-[#44516A] mt-3 max-w-md mx-auto leading-relaxed">
          Your application for {OPP.title} at {OPP.company} has been successfully submitted.
        </p>
      </div>
      <div className="w-full rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5 text-left">
        <p className="text-base font-semibold text-[#0F172A] mb-4">What happens next?</p>
        <ul className="flex flex-col gap-3">
          {INTERNAL_NEXT_STEPS.map((step) => (
            <li key={step} className="flex items-start gap-3 text-sm text-[#44516A]">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ECFDF5] shrink-0 mt-0.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
              </div>
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className={`flex flex-col gap-3 w-full ${footerClass}`}>
        <Link
          href="/opportunities"
          className="w-full text-center px-6 py-3 rounded-md border border-[#EEF2F8] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC] transition-colors"
        >
          Browse More Opportunities
        </Link>
        <Link
          href="/applications"
          className="w-full text-center px-6 py-3 rounded-md bg-[#2F66C8] text-white text-sm font-semibold hover:bg-[#2454A4] transition-colors"
        >
          View My Application
        </Link>
      </div>
    </div>
  );
}

/* ── External flow steps ─────────────────────────────────────────── */

export function ExternalOverviewStep({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={2} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Apply on Provider Website</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">
          This opportunity is managed externally by the provider. You&apos;ll complete your application on their
          website.
        </p>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#EFF4FF] shrink-0">
            <span className="text-lg font-bold text-[#2F66C8]">{OPP.logoInitial}</span>
          </div>
          <div>
            <p className="text-base font-semibold text-[#0F172A]">{OPP.title}</p>
            <p className="text-sm text-[#44516A]">{OPP.company}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#44516A]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {OPP.location}
              </span>
              <span>{OPP.type}</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {OPP.applyDate}
              </span>
            </div>
            <p className="text-xs text-[#8C97AD] mt-2 inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              20 – 30 Minutes (To apply)
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-[10px] border border-[#D9E1EF] bg-[#EFF4FF] p-4">
        <div className="flex items-start gap-3">
          <Globe className="h-5 w-5 text-[#2F66C8] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">External Application</p>
            <p className="text-xs text-[#44516A] mt-1 leading-relaxed">
              This application will be completed on the provider&apos;s website. Anchor Canada cannot manage
              application stages, interview updates, or final decisions.
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-base font-semibold text-[#0F172A] mb-3">What you&apos;ll need</p>
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white px-4">
          {EXTERNAL_NEEDS.map((item) => (
            <ChecklistRow key={item.label} label={item.label} required={item.required} />
          ))}
        </div>
        <p className="text-xs text-[#8C97AD] mt-2">Requirements are provided by the opportunity provider.</p>
      </div>
      <FlowFooter
        onBack={onBack}
        onPrimary={onContinue}
        primaryLabel="Continue to Provider Website"
        variant="desktop"
      />
    </div>
  );
}

export function ExternalRedirectStep({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={3} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Ready to Apply</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">
          You&apos;ll be redirected to {OPP.company}&apos;s official careers portal to complete your application.
        </p>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4">
        <p className="text-sm font-semibold text-[#0F172A] mb-3">What to expect:</p>
        <ul className="flex flex-col gap-2">
          {[
            `Visit ${OPP.externalUrl.replace('https://', '')}`,
            'Create an account or log in to their portal',
            'Upload your prepared documents',
            'Submit your application on their site',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#44516A]">
              <CheckCircle2 className="h-4 w-4 text-[#2F66C8] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <FlowFooter
        onBack={onBack}
        onPrimary={onContinue}
        primaryLabel="Go to Provider Website"
        variant="desktop"
      />
    </div>
  );
}

export function LeavingAnchorModal({
  open,
  onClose,
  onContinue,
  dontShowAgain,
  onDontShowAgainChange,
}: {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  dontShowAgain: boolean;
  onDontShowAgainChange: (v: boolean) => void;
}) {
  if (!open) return null;
  return (
    <ModalShell onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-4 px-2">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#EFF4FF]">
          <Link2 className="h-6 w-6 text-[#2F66C8]" />
        </div>
        <h3 className="font-instrument-serif text-[28px] text-[#0F172A] leading-tight">
          You Are Leaving{' '}
          <span className="font-instrument-serif italic text-[#2F66C8]">Anchor Canada</span>
        </h3>
        <p className="text-sm text-[#44516A] leading-relaxed max-w-md">
          This application will be completed on the provider&apos;s website. Anchor cannot track application
          stages, interview updates, or final decision for this opportunity.
        </p>
        <div className="w-full rounded-[10px] border border-[#D9E1EF] bg-[#EFF4FF] p-4 text-left">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-[#2F66C8] shrink-0 mt-0.5" />
            <p className="text-xs text-[#44516A] leading-relaxed">
              <span className="font-semibold text-[#0F172A]">Just know:</span> You can return later and let us
              know if you completed the application.
            </p>
          </div>
        </div>
        <label className="flex items-center gap-2 self-start cursor-pointer">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(e) => onDontShowAgainChange(e.target.checked)}
            className="h-4 w-4 rounded border-[#D9E1EF] text-[#2F66C8]"
          />
          <span className="text-sm text-[#44516A]">Don&apos;t show this again</span>
        </label>
      </div>
      <div className="flex items-center justify-end gap-4 mt-6 pt-4 border-t border-[#EEF2F8]">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-3 rounded-md border border-[#EEF2F8] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC] transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="px-5 py-3 rounded-md bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4] transition-colors"
        >
          Continue to Provider Website
        </button>
      </div>
    </ModalShell>
  );
}

export function SelfReportedTrackingModal({
  open,
  onClose,
  onNotYet,
  onApplied,
}: {
  open: boolean;
  onClose: () => void;
  onNotYet: () => void;
  onApplied: () => void;
}) {
  if (!open) return null;
  return (
    <ModalShell onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-4 px-2">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#EFF4FF]">
          <FileText className="h-6 w-6 text-[#2F66C8]" />
        </div>
        <h3 className="font-instrument-serif text-[28px] text-[#0F172A] leading-tight">
          Did You Complete Your{' '}
          <span className="font-instrument-serif italic text-[#2F66C8]">Application</span>
        </h3>
        <p className="text-sm text-[#44516A] leading-relaxed max-w-md">
          We can&apos;t verify applications submitted outside Anchor. Help us keep your opportunity tracker up to
          date.
        </p>
        <div className="w-full rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-4 text-left">
          <div className="flex items-start gap-2">
            <Lock className="h-4 w-4 text-[#2F66C8] shrink-0 mt-0.5" />
            <p className="text-xs text-[#44516A] leading-relaxed">
              <span className="font-semibold text-[#0F172A]">Just know:</span> Your response only affects your
              personal tracker
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-6 pt-4 border-t border-[#EEF2F8]">
        <button
          type="button"
          onClick={onNotYet}
          className="text-sm font-medium text-[#2F66C8] hover:opacity-80"
        >
          Not Yet
        </button>
        <button
          type="button"
          onClick={onApplied}
          className="px-5 py-3 rounded-md bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4] transition-colors"
        >
          Yes, I Applied
        </button>
      </div>
    </ModalShell>
  );
}

export function ExternalTrackingStep({
  onBack,
  onOpenTracking,
}: {
  onBack: () => void;
  onOpenTracking: () => void;
}) {
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={4} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Track Your Application</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">
          Let us know once you&apos;ve applied on the provider&apos;s website so we can update your tracker.
        </p>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
        <p className="text-base font-semibold text-[#0F172A]">{OPP.title}</p>
        <p className="text-sm text-[#44516A]">By {OPP.company}</p>
        <p className="text-sm text-[#8C97AD] mt-3">
          External applications are self-reported. Anchor cannot verify status with the provider.
        </p>
      </div>
      <FlowFooter
        onBack={onBack}
        onPrimary={onOpenTracking}
        primaryLabel="Update Application Status"
        variant="desktop"
      />
    </div>
  );
}

export function ExternalSuccessStep({
  layout = 'panel',
}: {
  opportunityId: string;
  layout?: 'panel' | 'page';
}) {
  const footerClass =
    layout === 'panel'
      ? '-mx-[26px] border-t border-[#EEF2F8] bg-[#F8FAFC] px-[26px] py-[26px] mt-2'
      : 'border-t border-[#EEF2F8] pt-6 mt-6';
  return (
    <div className="flex flex-col items-center gap-8 py-4 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#15803D] text-white shadow-sm">
        <Check className="h-10 w-10" />
      </div>
      <div>
        <h3 className="font-instrument-serif text-[28px] text-[#0F172A] leading-tight">
          Application{' '}
          <span className="font-instrument-serif italic text-[#2F66C8] text-[36px]">Recorded</span>
        </h3>
        <p className="text-sm text-[#44516A] mt-3 max-w-md mx-auto leading-relaxed">
          We&apos;ve marked this opportunity as externally applied. Future updates will depend on
          communication from the provider.
        </p>
      </div>
      <div className="w-full rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5 text-left">
        <p className="text-base font-semibold text-[#0F172A] mb-4">Application Progress</p>
        <div className="flex flex-col">
          {EXTERNAL_PROGRESS.map((item, i) => (
            <ProgressTimelineItem
              key={item.label}
              label={item.label}
              status={item.status}
              isLast={i === EXTERNAL_PROGRESS.length - 1}
            />
          ))}
        </div>
      </div>
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-5 w-full ${footerClass}`}>
        <Link
          href="/opportunities"
          className="px-5 py-3 rounded-md border border-[#EEF2F8] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC] transition-colors"
        >
          Browse More Opportunities
        </Link>
        <Link
          href="/applications"
          className="px-5 py-3 rounded-md bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4] transition-colors"
        >
          View In My Application
        </Link>
      </div>
    </div>
  );
}

function ProgressTimelineItem({
  label,
  status,
  isLast,
}: {
  label: string;
  status: 'complete' | 'future';
  isLast: boolean;
}) {
  const isComplete = status === 'complete';
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-[14px] shrink-0 ${
            isComplete ? 'bg-[#15803D] text-white' : 'border-2 border-[#D9E1EF] bg-white'
          }`}
        >
          {isComplete ? <Check className="h-3.5 w-3.5" /> : null}
        </div>
        {!isLast && <div className="w-px flex-1 min-h-[40px] bg-[#D9E1EF] my-1" />}
      </div>
      <div className={`pb-4 ${isLast ? 'pb-0' : ''}`}>
        <p className="text-sm font-medium text-[#44516A]">{label}</p>
      </div>
    </div>
  );
}

/* ── Express flow steps ──────────────────────────────────────────── */

export function ExpressProfileStep({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={2} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Your Profile Preview</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">This is what the provider will see when you express interest.</p>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2F66C8] text-white text-lg font-bold shrink-0">
            {PROFILE.initials}
          </div>
          <div>
            <p className="text-base font-semibold text-[#0F172A]">{PROFILE.name}</p>
            <p className="text-sm text-[#44516A]">{PROFILE.role}</p>
            <p className="text-xs text-[#8C97AD] mt-0.5 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {PROFILE.location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {PROFILE.skills.map((skill) => (
            <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-[#EFF4FF] text-[#2F66C8] font-medium">
              {skill}
            </span>
          ))}
        </div>
        <div className="border-t border-[#EEF2F8] pt-3 text-sm text-[#44516A] leading-relaxed">
          <p className="font-medium text-[#0F172A] mb-1">About</p>
          <p>{PROFILE.about}</p>
        </div>
      </div>
      <div className="rounded-[10px] border border-[#D9E1EF] bg-[#EFF4FF] p-3">
        <p className="text-xs text-[#44516A]">
          Only your public profile information will be shared.{' '}
          <span className="font-semibold text-[#2F66C8]">Edit Profile</span>
        </p>
      </div>
      <FlowFooter onBack={onBack} onPrimary={onContinue} primaryLabel="Looks Good" variant="desktop" />
    </div>
  );
}

export function ExpressMessageStep({
  message,
  availability,
  startDate,
  notify,
  onMessageChange,
  onAvailabilityChange,
  onStartDateChange,
  onNotifyChange,
  onBack,
  onContinue,
}: {
  message: string;
  availability: string;
  startDate: string;
  notify: boolean;
  onMessageChange: (v: string) => void;
  onAvailabilityChange: (v: string) => void;
  onStartDateChange: (v: string) => void;
  onNotifyChange: (v: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const MAX = 300;
  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader step={3} total={4} backLabel="Back" onBack={onBack} opportunityId={OPP.id} />
      <div>
        <SerifTitle>Your Message</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">Add a personal note to stand out. Completely optional.</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-[#0F172A]">
          Message to Provider <span className="font-normal text-[#8C97AD]">(Optional)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value.slice(0, MAX))}
          placeholder="Briefly share why you're interested and what makes you a great fit..."
          rows={5}
          className="anchor-textarea"
        />
        <p className={`text-xs text-right ${message.length >= MAX ? 'text-[#EF4444]' : 'text-[#8C97AD]'}`}>
          {message.length}/{MAX}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <ChipGroup
          label="Availability"
          options={['Full-time', 'Part-time', 'Flexible']}
          value={availability}
          onChange={onAvailabilityChange}
        />
        <ChipGroup
          label="Earliest Start Date"
          options={['Immediately', 'Within 1 month', 'Within 3 months', 'Flexible']}
          value={startDate}
          onChange={onStartDateChange}
        />
        <div className="flex items-center justify-between p-4 rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC]">
          <div>
            <p className="text-sm font-medium text-[#0F172A]">Notify me when reviewed</p>
            <p className="text-xs text-[#8C97AD] mt-0.5">Get an email when the provider views your interest</p>
          </div>
          <Toggle checked={notify} onChange={onNotifyChange} />
        </div>
      </div>
      <FlowFooter onBack={onBack} onPrimary={onContinue} primaryLabel="Continue" variant="desktop" />
    </div>
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F172A]">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
              value === opt
                ? 'border-[#2F66C8] bg-[#EFF4FF] text-[#2F66C8]'
                : 'border-[#D9E1EF] text-[#44516A] hover:border-[#2F66C8]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  );
}

export function ExpressTrackStep({
  opportunityId,
  layout = 'panel',
}: {
  opportunityId: string;
  layout?: 'panel' | 'page';
}) {
  const footerClass =
    layout === 'panel'
      ? '-mx-[26px] border-t border-[#EEF2F8] bg-[#F8FAFC] px-[26px] py-[26px]'
      : 'border-t border-[#EEF2F8] pt-6 mt-6';

  return (
    <div className="flex flex-col gap-7">
      <ProgressHeader
        step={4}
        total={4}
        backLabel="Back"
        onBack={() => {}}
        showOpportunityBack
        opportunityId={opportunityId}
      />
      <div>
        <SerifTitle>Track your interest</SerifTitle>
        <p className="text-sm text-[#44516A] mt-1">
          You can track the status of this opportunity in My Interest.
        </p>
      </div>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-5">
        <p className="text-base font-semibold text-[#0F172A]">{OPP.title}</p>
        <p className="text-sm text-[#44516A]">By {OPP.company}</p>
        <div className="mt-6 flex flex-col">
          {EXPRESS_TIMELINE.map((item, i) => (
            <TimelineItem key={item.title} item={item} isLast={i === EXPRESS_TIMELINE.length - 1} />
          ))}
        </div>
      </div>
      <div className={`flex items-center justify-end gap-5 ${footerClass}`}>
        <Link
          href="/opportunities"
          className="px-5 py-3 rounded-md border border-[#EEF2F8] bg-white text-sm font-medium text-[#2F66C8] hover:bg-[#F8FAFC] transition-colors"
        >
          Explore More
        </Link>
        <Link
          href="/applications"
          className="px-5 py-3 rounded-md bg-[#2F66C8] text-sm font-medium text-white hover:bg-[#2454A4] transition-colors"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  isLast,
}: {
  item: (typeof EXPRESS_TIMELINE)[number];
  isLast: boolean;
}) {
  const isComplete = item.status === 'complete';
  const isPending = item.status === 'pending';
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-2xl shrink-0 ${
            isComplete
              ? 'bg-[#15803D] text-white'
              : isPending
                ? 'border-2 border-[#2F66C8] bg-white'
                : 'border-2 border-[#D9E1EF] bg-white'
          }`}
        >
          {isComplete ? (
            <Check className="h-4 w-4" />
          ) : (
            <span
              className={`w-2 h-2 rounded-full ${isPending ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'}`}
            />
          )}
        </div>
        {!isLast && <div className="w-px flex-1 min-h-[60px] bg-[#D9E1EF] my-1" />}
      </div>
      <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
        <p className="text-base font-medium text-[#0F172A]">{item.title}</p>
        {'date' in item && item.date && (
          <p className="text-sm text-[#8C97AD] mt-1">{item.date}</p>
        )}
        {isPending && (
          <span className="inline-block mt-1 rounded-[2px] bg-[#FEF3C7] px-1 py-0.5 text-sm text-[#B45309]">
            Pending
          </span>
        )}
        <p className="text-sm text-[#44516A] mt-1">{item.description}</p>
      </div>
    </div>
  );
}

/* ── Modal shell ─────────────────────────────────────────────────── */

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-[5px]" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-lg rounded-[20px] border border-[#D9E1EF] bg-white p-6 shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#8C97AD] hover:text-[#0F172A] transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function stepLabelFor(flow: FlowType, step: ApplyStep): string {
  const labels =
    flow === 'internal'
      ? INTERNAL_STEP_LABELS
      : flow === 'external'
        ? EXTERNAL_STEP_LABELS
        : EXPRESS_STEP_LABELS;
  return labels[step - 1] ?? 'Apply';
}
