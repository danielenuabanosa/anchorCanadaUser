'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from './shared';

function ApplyDesktopContent() {
  const router = useRouter();
  const { flow, step, opportunityId, goToStep, goBack } = useApplyRouting();

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

  const handleEntryContinue = () => goToStep(2);

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

  const renderStep = () => {
    if (submitted && flow === 'internal')
      return <InternalSuccessStep opportunityId={opportunityId} layout="panel" />;
    if (externalDone && flow === 'external')
      return <ExternalSuccessStep opportunityId={opportunityId} layout="panel" />;
    if (flow === 'express' && step === 4)
      return <ExpressTrackStep opportunityId={opportunityId} layout="panel" />;

    if (step === 1) {
      return (
        <EntryChecklistStep
          opportunityId={opportunityId}
          onContinue={handleEntryContinue}
          onCancel={() => router.push(`/opportunities/${opportunityId}`)}
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
      if (step === 2) {
        return <ExternalOverviewStep onBack={goBack} onContinue={() => goToStep(3)} />;
      }
      if (step === 3) {
        return <ExternalRedirectStep onBack={goBack} onContinue={handleExternalRedirect} />;
      }
      return (
        <ExternalTrackingStep
          onBack={goBack}
          onOpenTracking={() => setShowTrackingModal(true)}
        />
      );
    }

    if (step === 2) {
      return <ExpressProfileStep onBack={goBack} onContinue={() => goToStep(3)} />;
    }
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

  return (
    <>
      <div className="fixed inset-0 z-40 flex justify-end p-2.5 pointer-events-none">
        <div className="pointer-events-auto flex h-[calc(100vh-20px)] w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
          <div className="flex-1 overflow-y-auto px-[26px] py-10">{renderStep()}</div>
        </div>
      </div>
      <div className="fixed inset-0 z-30 bg-[#0F172A]/60 backdrop-blur-[5px]" aria-hidden />

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
    </>
  );
}

export default function ApplyDesktop() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <ApplyDesktopContent />
    </Suspense>
  );
}
