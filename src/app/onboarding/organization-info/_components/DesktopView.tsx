'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import {
  ORG_INFO_INFO_MESSAGE,
  ORG_INFO_SUBTITLE,
  ORG_SIZES,
  OPERATING_REGIONS,
  SOCIAL_FIELDS,
} from '@/features/onboarding/lib/organizationInfoData';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';
import {
  uploadOrganizationCoverFile,
  uploadOrganizationLogoFile,
} from '@/features/provider/lib/uploadOrganizationAssets';
import {
  FieldLabel,
  FileUploadZone,
  IconInput,
  IconSelect,
  SectionHeader,
  SocialUrlInput,
} from './FormFields';
import { TrustPanel } from './TrustPanel';

import infoIcon from '@assets/icons/info.png';
import briefcaseIcon from '@assets/icons/briefcase2.png';
import mailIcon from '@assets/icons/mail.png';
import globeIcon from '@assets/icons/compass.png';
import phoneIcon from '@assets/icons/hear-phone.png';
import bookIcon from '@assets/icons/book-open.png';
import usersIcon from '@assets/icons/user.png';
import locationIcon from '@assets/icons/location2.png';
import imageIcon from '@assets/icons/image.png';
import shareIcon from '@assets/icons/send.png';
import linkedinIcon from '@assets/icons/linkedin.png';
import xIcon from '@assets/icons/x.png';
import facebookIcon from '@assets/icons/facebook.png';
import instagramIcon from '@assets/icons/instagram.png';

const SOCIAL_ICONS = {
  linkedin: linkedinIcon,
  twitter: xIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
} as const;

type UploadState = {
  fileName?: string;
  progress?: number;
  previewUrl?: string;
};

export default function DesktopView() {
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [operatingRegion, setOperatingRegion] = useState('');
  const [logo, setLogo] = useState<UploadState>({});
  const [cover, setCover] = useState<UploadState>({});
  const [social, setSocial] = useState({ linkedin: '', twitter: '', facebook: '', instagram: '' });
  const [saving, setSaving] = useState(false);

  const canContinue =
    orgName.trim() !== '' &&
    email.trim() !== '' &&
    website.trim() !== '' &&
    phone.trim() !== '' &&
    description.trim() !== '' &&
    orgSize !== '' &&
    operatingRegion !== '' &&
    logo.progress === 100;

  async function handleContinue() {
    if (!canContinue || saving) return;
    setSaving(true);
    setOnboardingData({
      organizationName: orgName.trim(),
      organizationEmail: email.trim(),
      organizationWebsite: website.trim(),
      organizationDescription: description.trim(),
      organizationPhone: phone.trim(),
      organizationProvince: operatingRegion,
      organizationSize: orgSize,
      social,
      verificationEmail: email.trim().toLowerCase(),
      logoUrl: logo.previewUrl ?? null,
      coverUrl: cover.previewUrl ?? null,
    });
    try {
      await saveOnboardingDraft('organization-info');
    } catch {
      // Draft save is best-effort when authenticated
    }
    router.push('/onboarding/verification');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={3} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-10">
        <div className="flex flex-col items-center gap-[100px]">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
              Tell Us About Your{' '}
              <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Organization</span>
            </h1>
            <p className="max-w-[772px] font-sans text-[16px] text-[#8C97AD]">{ORG_INFO_SUBTITLE}</p>
          </div>

          <div className="flex w-full items-start gap-5">
            <div className="flex min-w-0 flex-1 flex-col gap-[60px]">
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="flex w-[670px] flex-col gap-5">
                    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                      <SectionHeader number={1} title="Basic Information" icon={infoIcon} />
                      <div className="mt-5 flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <FieldLabel label="Organization Name" required />
                            <IconInput
                              icon={briefcaseIcon}
                              value={orgName}
                              onChange={setOrgName}
                              placeholder="Enter organization name"
                              className="mt-2.5"
                            />
                          </div>
                          <div>
                            <FieldLabel label="Organization Email" required />
                            <IconInput
                              icon={mailIcon}
                              type="email"
                              value={email}
                              onChange={setEmail}
                              placeholder="name@yourorganization.ca"
                              className="mt-2.5"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <FieldLabel label="Organization Website" required />
                            <IconInput
                              icon={globeIcon}
                              type="url"
                              value={website}
                              onChange={setWebsite}
                              placeholder="https://yourorganization.ca"
                              className="mt-2.5"
                            />
                          </div>
                          <div>
                            <FieldLabel label="Phone Number" required />
                            <IconInput
                              icon={phoneIcon}
                              type="tel"
                              value={phone}
                              onChange={setPhone}
                              placeholder="(123) 456-7890"
                              className="mt-2.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                      <SectionHeader number={2} title="Organization Details" icon={bookIcon} />
                      <div className="mt-5 flex flex-col gap-5">
                        <div>
                          <FieldLabel label="Organization Description" required />
                          <textarea
                            value={description}
                            onChange={(e) => {
                              if (e.target.value.length <= 500) setDescription(e.target.value);
                            }}
                            placeholder="Briefly describe your mission, what your organization does, and the communities you serve."
                            rows={5}
                            className="anchor-textarea mt-2.5 min-h-[193px] rounded-[10px]"
                          />
                          <p className="mt-2.5 text-right font-sans text-[16px] text-[#8C97AD]">
                            {description.length} / 500
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <FieldLabel label="Organization Size" required />
                            <IconSelect
                              icon={usersIcon}
                              value={orgSize}
                              onChange={setOrgSize}
                              placeholder="Select organization size"
                              options={ORG_SIZES}
                              className="mt-2.5"
                            />
                          </div>
                          <div>
                            <FieldLabel label="Operating Region" required />
                            <IconSelect
                              icon={locationIcon}
                              value={operatingRegion}
                              onChange={setOperatingRegion}
                              placeholder="Select operating region"
                              options={OPERATING_REGIONS}
                              className="mt-2.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                    <SectionHeader number={3} title="Branding" icon={imageIcon} />
                    <div className="mt-5 flex flex-1 flex-col gap-5">
                      <div className="flex flex-1 flex-col">
                        <FieldLabel label="Organization Logo" required />
                        <p className="mt-1 font-sans text-[14px] text-[#8C97AD]">
                          This will appear on your public profile and opportunities
                        </p>
                        <FileUploadZone
                          className="mt-2.5"
                          helperLines={[
                            'Drag and drop your logo here',
                            'or click to browse',
                            'PNG or JPG or SVG (Max 2MB)',
                          ]}
                          fileName={logo.fileName}
                          progress={logo.progress}
                          previewUrl={logo.previewUrl}
                          onFileSelect={(file) => {
                            void uploadOrganizationLogoFile(file, setLogo).catch(() => setLogo({}));
                          }}
                          onRemove={() => {
                            setLogo({});
                            setOnboardingData({ logoUrl: null });
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <FieldLabel label="Cover Banner" optional />
                        <p className="mt-1 font-sans text-[14px] text-[#8C97AD]">Recommended size: 1200 x 400px</p>
                        <FileUploadZone
                          className="mt-2.5"
                          helperLines={[
                            'Drag and drop banner here',
                            'or click to browse',
                            'PNG or JPG (Max 5MB)',
                          ]}
                          fileName={cover.fileName}
                          progress={cover.progress}
                          previewUrl={cover.previewUrl}
                          onFileSelect={(file) => {
                            void uploadOrganizationCoverFile(file, setCover).catch(() => setCover({}));
                          }}
                          onRemove={() => {
                            setCover({});
                            setOnboardingData({ coverUrl: null });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                  <SectionHeader number={4} title="Social & Online Presence" optional icon={shareIcon} />
                  <div className="mt-5 grid grid-cols-2 gap-5">
                    {SOCIAL_FIELDS.map((field) => (
                      <SocialUrlInput
                        key={field.id}
                        icon={SOCIAL_ICONS[field.id]}
                        label={field.label}
                        value={social[field.id]}
                        onChange={(value) => setSocial((prev) => ({ ...prev, [field.id]: value }))}
                        placeholder={field.placeholder}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <TrustPanel />
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/categories"
        onContinue={handleContinue}
        continueDisabled={!canContinue}
        footer={<OnboardingInfoBar message={ORG_INFO_INFO_MESSAGE} />}
      />
    </div>
  );
}
