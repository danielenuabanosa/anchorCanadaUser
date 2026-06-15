'use client';

import { Suspense, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DEFAULT_FILES, INTERNAL_QUESTIONS, OPP } from './data';
import { useApplyRouting } from './useApplyRouting';
import {
  EntryChecklistStep,
  ExpressMessageStep,
  ExpressProfileStep,
  ExpressTrackStep,
  ExternalOverviewStep,
  ExternalRedirectStep,
  ExternalSuccessStep,
  ExternalTrackingStep,
  InternalDocumentsStep,
  InternalQuestionsStep,
  InternalReviewStep,
  InternalSuccessStep,
  LeavingAnchorModal,
  SelfReportedTrackingModal,
  stepLabelFor,
} from './shared';

function ApplyMobileContent({ mode = 'page' }: { mode?: 'overlay' | 'page' }) {
  const { flow, step, totalSteps, progressPct, opportunityId, goToStep, goBack, closeApply } =
    useApplyRouting(mode);

  const [files, setFiles] = useState<Record<string, string>>({ ...DEFAULT_FILES });
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(INTERNAL_QUESTIONS.map((q) => [q.id, q.defaultValue])),
  );
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [externalDone, setExternalDone] = useState(false);

  const [message, setMessage] = useState('');
  const [availability, setAvailability] = useState('Full-time');
  const [startDate, setStartDate] = useState('Immediately');
  const [notify, setNotify] = useState(true);

  const [showLeavingModal, setShowLeavingModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [dontShowLeaving, setDontShowLeaving] = useState(false);

  const isTerminal =
    (submitted && flow === 'internal') ||
    (externalDone && flow === 'external') ||
    (flow === 'express' && step === 4);

  const handleExternalRedirect = () => {
    if (dontShowLeaving) {
      window.open(OPP.externalUrl, '_blank', 'noopener,noreferrer');
      goToStep(4);
      setTimeout(() => setShowTrackingModal(true), 600);
      return;
    }
    setShowLeavingModal(true);
  };

  const confirmLeaving = () => {
    setShowLeavingModal(false);
    window.open(OPP.externalUrl, '_blank', 'noopener,noreferrer');
    goToStep(4);
    setTimeout(() => setShowTrackingModal(true), 600);
  };

  const renderBody = () => {
    if (submitted && flow === 'internal')
      return <InternalSuccessStep opportunityId={opportunityId} layout="page" />;
    if (externalDone && flow === 'external')
      return <ExternalSuccessStep opportunityId={opportunityId} layout="page" />;
    if (flow === 'express' && step === 4)
      return <ExpressTrackStep opportunityId={opportunityId} layout="page" />;

    if (step === 1) {
      return (
        <EntryChecklistStep
          opportunityId={opportunityId}
          onContinue={() => goToStep(2)}
          onCancel={closeApply}
        />
      );
    }

    if (flow === 'internal') {
      if (step === 2) {
        return (
          <InternalDocumentsStep
            files={files}
            onReplace={(key, name) => setFiles((p) => ({ ...p, [key]: name }))}
            onBack={goBack}
            onContinue={() => goToStep(3)}
          />
        );
      }
      if (step === 3) {
        return (
          <InternalQuestionsStep
            answers={answers}
            onChange={(id, value) => setAnswers((p) => ({ ...p, [id]: value }))}
            onBack={goBack}
            onContinue={() => goToStep(4)}
          />
        );
      }
      return (
        <InternalReviewStep
          files={files}
          answers={answers}
          agreed={agreed}
          onAgreedChange={setAgreed}
          onBack={goBack}
          onSubmit={() => setSubmitted(true)}
        />
      );
    }

    if (flow === 'external') {
      if (step === 2) return <ExternalOverviewStep onBack={goBack} onContinue={() => goToStep(3)} />;
      if (step === 3) return <ExternalRedirectStep onBack={goBack} onContinue={handleExternalRedirect} />;
      return <ExternalTrackingStep onBack={goBack} onOpenTracking={() => setShowTrackingModal(true)} />;
    }

    if (step === 2) return <ExpressProfileStep onBack={goBack} onContinue={() => goToStep(3)} />;
    return (
      <ExpressMessageStep
        message={message}
        availability={availability}
        startDate={startDate}
        notify={notify}
        onMessageChange={setMessage}
        onAvailabilityChange={setAvailability}
        onStartDateChange={setStartDate}
        onNotifyChange={setNotify}
        onBack={goBack}
        onContinue={() => goToStep(4)}
      />
    );
  };

  if (isTerminal) {
    return (
      <div className="min-h-screen bg-white px-4 py-8">
        {renderBody()}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white pb-6">
      {!isTerminal && (
        <div className="sticky top-0 z-20 border-b border-[#EEF2F8] bg-white">
          <div className="flex items-center gap-3 px-4 py-3">
            <button type="button" onClick={goBack} className="p-1 -ml-1 text-[#44516A]" aria-label="Go back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="flex-1 truncate text-sm font-semibold text-[#0F172A]">
              {stepLabelFor(flow, step)}
            </span>
            <span className="shrink-0 text-xs text-[#8C97AD]">
              {step}/{totalSteps}
            </span>
          </div>
          <div className="h-1 bg-[#EEF2F8]">
            <div className="h-full bg-[#2F66C8] transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}

      <div className="flex-1 px-4 pt-5">{renderBody()}</div>

      <LeavingAnchorModal
        open={showLeavingModal}
        onClose={() => setShowLeavingModal(false)}
        onContinue={confirmLeaving}
        dontShowAgain={dontShowLeaving}
        onDontShowAgainChange={setDontShowLeaving}
      />
      <SelfReportedTrackingModal
        open={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        onNotYet={() => setShowTrackingModal(false)}
        onApplied={() => {
          setShowTrackingModal(false);
          setExternalDone(true);
        }}
      />
    </div>
  );
}

export function ApplyMobileOverlay() {
  return (
    <Suspense fallback={null}>
      <ApplyMobileContent mode="overlay" />
    </Suspense>
  );
}

export default function ApplyMobile() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <ApplyMobileContent />
    </Suspense>
  );
}
