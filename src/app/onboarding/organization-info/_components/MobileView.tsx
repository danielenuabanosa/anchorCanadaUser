'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react';

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

type SectionId = 'basic' | 'details' | 'branding' | 'social';

type UploadState = {
  fileName?: string;
  progress?: number;
  previewUrl?: string;
};

const SECTION_META: { id: SectionId; number: number; title: string; optional?: boolean; icon: typeof infoIcon }[] = [
  { id: 'basic', number: 1, title: 'Basic Information', icon: infoIcon },
  { id: 'details', number: 2, title: 'Organization Details', icon: bookIcon },
  { id: 'branding', number: 3, title: 'Branding', icon: imageIcon },
  { id: 'social', number: 4, title: 'Social & Online Presence', optional: true, icon: shareIcon },
];

export default function MobileView() {
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);

  const [openSection, setOpenSection] = useState<SectionId>('basic');
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

  const basicComplete = orgName && email && website && phone;
  const detailsComplete = description && orgSize && operatingRegion;
  const brandingComplete = logo.progress === 100;
  const socialComplete = true;

  const sectionComplete: Record<SectionId, boolean> = {
    basic: Boolean(basicComplete),
    details: Boolean(detailsComplete),
    branding: brandingComplete,
    social: socialComplete,
  };

  const canContinue = basicComplete && detailsComplete && brandingComplete;

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
      // best-effort
    }
    router.push('/onboarding/verification');
  }

  function renderSectionContent(id: SectionId) {
    switch (id) {
      case 'basic':
        return (
          <div className="flex flex-col gap-5">
            <div>
              <FieldLabel label="Organization Name" required className="text-[14px]" />
              <IconInput icon={briefcaseIcon} value={orgName} onChange={setOrgName} placeholder="Enter organization name" className="mt-2 [&_input]:h-[50px] [&_input]:text-[14px]" />
            </div>
            <div>
              <FieldLabel label="Organization Email" required className="text-[14px]" />
              <IconInput icon={mailIcon} type="email" value={email} onChange={setEmail} placeholder="name@yourorganization.ca" className="mt-2 [&_input]:h-[50px] [&_input]:text-[14px]" />
            </div>
            <div>
              <FieldLabel label="Organization Website" required className="text-[14px]" />
              <IconInput icon={globeIcon} type="url" value={website} onChange={setWebsite} placeholder="https://yourorganization.ca" className="mt-2 [&_input]:h-[50px] [&_input]:text-[14px]" />
            </div>
            <div>
              <FieldLabel label="Phone Number" required className="text-[14px]" />
              <IconInput icon={phoneIcon} type="tel" value={phone} onChange={setPhone} placeholder="(123) 456-7890" className="mt-2 [&_input]:h-[50px] [&_input]:text-[14px]" />
            </div>
          </div>
        );
      case 'details':
        return (
          <div className="flex flex-col gap-5">
            <div>
              <FieldLabel label="Organization Description" required className="text-[14px]" />
              <textarea
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setDescription(e.target.value);
                }}
                placeholder="Briefly describe your mission, what your organization does, and the communities you serve."
                rows={4}
                className="anchor-textarea mt-2 min-h-[140px] rounded-[10px] text-[14px]"
              />
              <p className="mt-2 text-right font-sans text-[14px] text-[#8C97AD]">{description.length} / 500</p>
            </div>
            <div>
              <FieldLabel label="Organization Size" required className="text-[14px]" />
              <IconSelect icon={usersIcon} value={orgSize} onChange={setOrgSize} placeholder="Select organization size" options={ORG_SIZES} className="mt-2 [&_select]:h-[50px] [&_select]:text-[14px]" />
            </div>
            <div>
              <FieldLabel label="Operating Region" required className="text-[14px]" />
              <IconSelect icon={locationIcon} value={operatingRegion} onChange={setOperatingRegion} placeholder="Select operating region" options={OPERATING_REGIONS} className="mt-2 [&_select]:h-[50px] [&_select]:text-[14px]" />
            </div>
          </div>
        );
      case 'branding':
        return (
          <div className="flex flex-col gap-5">
            <div>
              <FieldLabel label="Organization Logo" required className="text-[14px]" />
              <p className="mt-1 font-sans text-[12px] text-[#8C97AD]">This will appear on your public profile and opportunities</p>
              <FileUploadZone
                helperLines={['Drag and drop your logo here', 'or click to browse', 'PNG or JPG or SVG (Max 2MB)']}
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
            <div>
              <FieldLabel label="Cover Banner" optional className="text-[14px]" />
              <p className="mt-1 font-sans text-[12px] text-[#8C97AD]">Recommended size: 1200 x 400px</p>
              <FileUploadZone
                helperLines={['Drag and drop banner here', 'or click to browse', 'PNG or JPG (Max 5MB)']}
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
        );
      case 'social':
        return (
          <div className="flex flex-col gap-4">
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
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={3} />
      </div>

      <main className="px-5 pb-8 pt-6">
        <div className="flex flex-col items-center gap-10">
          <div className="text-center">
            <h1 className="font-serif text-[48px] leading-[56px] text-[#0F172A]">Tell Us About Your</h1>
            <p className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Organization</p>
            <p className="mt-2.5 font-sans text-[14px] text-[#8C97AD]">{ORG_INFO_SUBTITLE}</p>
          </div>

          <div className="flex w-full max-w-[400px] flex-col gap-5">
            {SECTION_META.map((section) => {
              const isOpen = openSection === section.id;
              return (
                <div key={section.id} className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
                  <button
                    type="button"
                    onClick={() => setOpenSection((prev) => (prev === section.id ? 'basic' : section.id))}
                    className="flex w-full items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-[18px] text-left">
                      <Image src={section.icon} alt="" width={24} height={24} className="shrink-0 object-contain" />
                      <div className="font-sans text-[18px] font-semibold leading-[1.8] text-[#0F172A]">
                        {section.number}. {section.title}
                        {section.optional && <span className="block text-[14px] font-normal text-[#8C97AD]">(Optional)</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      {sectionComplete[section.id] && (
                        <span className="flex size-5 items-center justify-center rounded-[10px] bg-[#22C55E] p-[5px]">
                          <Check className="size-2.5 text-white" strokeWidth={3} />
                        </span>
                      )}
                      <ChevronDown className={`size-6 text-[#8C97AD] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {isOpen && <div className="mt-5">{renderSectionContent(section.id)}</div>}
                </div>
              );
            })}

            <TrustPanel variant="mobile" />

            <div className="flex flex-col gap-3 border-t border-[#D9E1EF] pt-6">
              <button
                type="button"
                onClick={handleContinue}
                disabled={!canContinue}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[14px] text-white ${
                  canContinue ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
                }`}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/onboarding/categories"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[14px] text-[#2F66C8]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <OnboardingInfoBar variant="mobile" message={ORG_INFO_INFO_MESSAGE} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
