'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

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
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { FileUploadZone } from '@/app/onboarding/organization-info/_components/FormFields';
import { WhyVerifiedPanel } from './WhyVerifiedPanel';
import { clearUploadState, type UploadState } from '@/shared/lib/simulateFileUpload';
import { uploadVerificationDoc } from '@/features/provider/lib/uploadVerificationDoc';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';
import { useProviderOnboardingStore } from '@/store/onboardingStore';

import shieldCheckIcon from '@assets/icons/shield-check.png';
import bookIcon from '@assets/icons/book-open.png';
import folderIcon from '@assets/icons/folder.png';

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
  void uploadVerificationDoc(docId, file, (state) => {
    setDocs((prev) => ({ ...prev, [docId]: state }));
  }).catch(() => {
    setDocs((prev) => ({ ...prev, [docId]: clearUploadState(prev[docId]) }));
  });
}

function handleDocRemove(
  docId: VerificationDocumentId,
  setDocs: React.Dispatch<React.SetStateAction<DocUploadState>>,
) {
  setDocs((prev) => ({ ...prev, [docId]: clearUploadState(prev[docId]) }));
}

export default function DesktopView() {
  const router = useRouter();
  const [verificationType, setVerificationType] = useState<VerificationTypeId | null>(null);
  const [documents, setDocuments] = useState<DocUploadState>(INITIAL_DOCS);

  const uploadDocs = VERIFICATION_DOCUMENTS.filter((doc) => doc.id !== 'supportingDocuments');

  function goToAccount() {
    useProviderOnboardingStore.getState().setOnboardingData({
      verificationType,
    });
    void saveOnboardingDraft('verification').catch(() => undefined);
    router.push('/onboarding/account');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar showSignIn />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={4} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-10">
        <div className="flex flex-col items-center gap-[100px]">
          <div className="flex max-w-[772px] flex-col items-center gap-6 text-center">
            <h1 className="font-serif text-[60px] leading-[56px] text-[#0F172A]">
              <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Verify</span> Your
              Organization
            </h1>
            <div className="font-sans text-[16px] text-[#8C97AD]">
              {VERIFICATION_SUBTITLE.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="flex w-full items-start gap-5">
            <div className="flex min-w-0 flex-1 flex-col gap-[60px]">
              <div className="flex flex-col gap-5">
                <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                  <div className="flex items-center gap-[18px]">
                    <Image src={shieldCheckIcon} alt="" width={24} height={24} className="object-contain" />
                    <p className="font-sans text-[18px] font-semibold leading-[1.8] text-[#0F172A]">
                      1. Select Verification Type
                    </p>
                  </div>
                  <div className="mt-5 grid grid-cols-4 gap-2.5">
                    {VERIFICATION_TYPES.map((type) => {
                      const selected = verificationType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setVerificationType(type.id)}
                          className={`relative overflow-hidden rounded-[20px] border bg-white px-5 py-[30px] text-left transition-colors ${
                            selected ? 'border-[#2F66C8] ring-1 ring-[#2F66C8]' : 'border-[#EEF2F8]'
                          }`}
                        >
                          <span
                            className={`absolute right-5 top-5 flex size-6 items-center justify-center rounded-full border ${
                              selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
                            }`}
                          >
                            {selected && <Check className="size-3.5 text-white" strokeWidth={3} />}
                          </span>
                          <div
                            className="flex size-20 items-center justify-center rounded-[24px] p-6"
                            style={{ backgroundColor: type.iconBg }}
                          >
                            <Image src={type.icon} alt="" width={32} height={32} className="object-contain" />
                          </div>
                          <p className="mt-5 font-serif text-[24px] leading-[56px] text-[#0F172A]">{type.title}</p>
                          <p className="font-sans text-[16px] text-[#44516A]">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                  <div className="flex items-center gap-[18px]">
                    <Image src={bookIcon} alt="" width={24} height={24} className="object-contain" />
                    <p className="font-sans text-[18px] font-semibold leading-[1.8] text-[#0F172A]">
                      2. Upload Verification Documents
                    </p>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-5">
                    {uploadDocs.map((doc) => (
                      <div key={doc.id}>
                        <div className="mb-2.5">
                          <p className="font-sans text-[16px] font-medium leading-[1.8] text-[#0F172A]">
                            {doc.title}{' '}
                            <span className="font-normal text-[#8C97AD]">(Optional)</span>
                          </p>
                          <p className="font-sans text-[14px] text-[#8C97AD]">{doc.description}</p>
                        </div>
                        <FileUploadZone
                          compact={documents[doc.id].progress !== 100}
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
                </div>

                <div className="flex items-center justify-between rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                  <div className="flex items-center gap-[18px]">
                    <div className="flex size-[60px] items-center justify-center rounded-[30px] bg-[#FEEADE] p-[18px]">
                      <Image src={folderIcon} alt="" width={24} height={24} className="object-contain" />
                    </div>
                    <div>
                      <p className="font-sans text-[18px] font-semibold leading-[1.8] text-[#0F172A]">
                        3. Supporting Documents <span className="font-normal text-[#8C97AD]">(Optional)</span>
                      </p>
                      <p className="font-sans text-[14px] text-[#8C97AD]">
                        Any additional documents that support your verification.
                      </p>
                    </div>
                  </div>
                  <div className="w-[260px] shrink-0">
                    <FileUploadZone
                      compact
                      helperLines={['Drag and drop or', 'Browse Files']}
                      fileName={documents.supportingDocuments.fileName}
                      progress={documents.supportingDocuments.progress}
                      previewUrl={documents.supportingDocuments.previewUrl}
                      onFileSelect={(file) => handleDocUpload('supportingDocuments', file, setDocuments)}
                      onRemove={() => handleDocRemove('supportingDocuments', setDocuments)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <WhyVerifiedPanel />
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/organization-info"
        onContinue={goToAccount}
        onSkip={goToAccount}
        continueDisabled={false}
        continueLabel="Continue"
        footer={<OnboardingInfoBar message={VERIFICATION_INFO_MESSAGE} />}
      />
    </div>
  );
}
