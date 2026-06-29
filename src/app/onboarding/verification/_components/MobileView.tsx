'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import {
  VERIFICATION_DOCUMENTS,
  VERIFICATION_INFO_MESSAGE,
  VERIFICATION_SUBTITLE,
  VERIFICATION_TYPES,
  type VerificationDocumentId,
  type VerificationTypeId,
} from '@/features/onboarding/lib/verificationData';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { FileUploadZone } from '@/app/onboarding/organization-info/_components/FormFields';
import { WhyVerifiedPanel } from './WhyVerifiedPanel';
import {
  clearUploadState,
  simulateFileUpload,
  type UploadState,
} from '@/shared/lib/simulateFileUpload';

import shieldCheckIcon from '@assets/icons/shield-check.png';
import bookIcon from '@assets/icons/book-open.png';

type DocUploadState = Record<VerificationDocumentId, UploadState>;

const INITIAL_DOCS: DocUploadState = {
  registrationCertificate: {},
  proofOfOrganization: {},
  authorizedRepId: {},
  supportingDocuments: {},
};

function handleDocUpload(
  docId: VerificationDocumentId,
  file: File,
  setDocs: React.Dispatch<React.SetStateAction<DocUploadState>>,
) {
  simulateFileUpload(file, (state) => {
    setDocs((prev) => ({ ...prev, [docId]: state }));
  });
}

function handleDocRemove(
  docId: VerificationDocumentId,
  setDocs: React.Dispatch<React.SetStateAction<DocUploadState>>,
) {
  setDocs((prev) => ({ ...prev, [docId]: clearUploadState(prev[docId]) }));
}

export default function MobileView() {
  const router = useRouter();
  const [verificationType, setVerificationType] = useState<VerificationTypeId | null>(null);
  const [documents, setDocuments] = useState<DocUploadState>(INITIAL_DOCS);
  const [typeOpen, setTypeOpen] = useState(true);
  const [docsOpen, setDocsOpen] = useState(true);

  const requiredDocs = VERIFICATION_DOCUMENTS.filter((doc) => doc.required);
  const requiredComplete = requiredDocs.every((doc) => documents[doc.id].progress === 100);
  const typeComplete = verificationType !== null;
  const canSubmit = typeComplete && requiredComplete;

  function handleSubmit() {
    if (!canSubmit) return;
    router.push('/onboarding/team');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={4} />
      </div>

      <main className="px-5 pb-8 pt-6">
        <div className="mx-auto flex max-w-[400px] flex-col gap-10">
          <div className="text-center">
            <p className="font-serif text-[48px] italic leading-[56px] text-[#2F66C8]">Verify</p>
            <h1 className="font-serif text-[52px] leading-[56px] text-[#0F172A]">Your Organization</h1>
            <div className="mt-2.5 font-sans text-[14px] text-[#8C97AD]">
              {VERIFICATION_SUBTITLE.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <button
              type="button"
              onClick={() => setTypeOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3"
            >
              <div className="flex items-center gap-[18px]">
                <Image src={shieldCheckIcon} alt="" width={24} height={24} className="object-contain" />
                <p className="font-sans text-[18px] font-semibold leading-[1.8] text-[#0F172A]">
                  1. Select Verification Type
                </p>
              </div>
              <div className="flex items-center gap-5">
                {typeComplete && (
                  <span className="flex size-5 items-center justify-center rounded-[10px] bg-[#22C55E] p-[5px]">
                    <Check className="size-2.5 text-white" strokeWidth={3} />
                  </span>
                )}
                <ChevronDown className={`size-6 text-[#8C97AD] transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {typeOpen && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {VERIFICATION_TYPES.map((type) => {
                  const selected = verificationType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setVerificationType(type.id)}
                      className={`relative rounded-[20px] border bg-white p-4 text-left ${
                        selected ? 'border-[#2F66C8] ring-1 ring-[#2F66C8]' : 'border-[#EEF2F8]'
                      }`}
                    >
                      <span
                        className={`absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border ${
                          selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF]'
                        }`}
                      >
                        {selected && <Check className="size-3 text-white" strokeWidth={3} />}
                      </span>
                      <div
                        className="flex size-14 items-center justify-center rounded-[20px]"
                        style={{ backgroundColor: type.iconBg }}
                      >
                        <Image src={type.icon} alt="" width={24} height={24} className="object-contain" />
                      </div>
                      <p className="mt-3 font-serif text-[18px] leading-tight text-[#0F172A]">{type.title}</p>
                      <p className="mt-1 font-sans text-[12px] text-[#44516A]">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
            <button
              type="button"
              onClick={() => setDocsOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3"
            >
              <div className="flex items-center gap-[18px] text-left">
                <Image src={bookIcon} alt="" width={24} height={24} className="object-contain" />
                <div>
                  <p className="font-sans text-[18px] font-semibold leading-[1.8] text-[#0F172A]">
                    2. Upload Verification Documents
                  </p>
                  <p className="font-sans text-[12px] text-[#8C97AD]">3 required • 1 optional</p>
                </div>
              </div>
              <ChevronDown className={`size-6 shrink-0 text-[#8C97AD] transition-transform ${docsOpen ? 'rotate-180' : ''}`} />
            </button>

            {docsOpen && (
              <div className="mt-5 flex flex-col gap-5">
                {VERIFICATION_DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="border-t border-[#EEF2F8] pt-4 first:border-0 first:pt-0">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-sans text-[14px] font-medium text-[#0F172A]">
                          {doc.title}
                          {doc.required && <span className="text-[#EF4444]"> *</span>}
                          {!doc.required && <span className="font-normal text-[#8C97AD]"> (Optional)</span>}
                        </p>
                        <p className="mt-1 font-sans text-[12px] text-[#8C97AD]">{doc.description}</p>
                      </div>
                      {documents[doc.id].progress === 100 && (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                          <Check className="size-3 text-white" strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <FileUploadZone
                      compact
                      helperLines={['Drag and drop or', 'Browse Files']}
                      fileName={documents[doc.id].fileName}
                      progress={documents[doc.id].progress}
                      previewUrl={documents[doc.id].previewUrl}
                      onFileSelect={(file) => handleDocUpload(doc.id, file, setDocuments)}
                      onRemove={() => handleDocRemove(doc.id, setDocuments)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <WhyVerifiedPanel variant="mobile" />

          <div className="flex flex-col gap-3 border-t border-[#D9E1EF] pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[14px] text-white ${
                canSubmit ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              Submit Verification
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding/organization-info"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[14px] text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <OnboardingInfoBar variant="mobile" message={VERIFICATION_INFO_MESSAGE} />
          </div>
        </div>
      </main>
    </div>
  );
}
