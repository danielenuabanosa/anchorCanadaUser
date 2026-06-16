'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { CANADIAN_PROVINCES } from '@/shared/constants';
import { Footer } from './Footer';
import { OrgPreviewCard } from './OrgPreviewCard';

import mailIcon from '@assets/icons/mail.png';
import locationIcon from '@assets/icons/location2.png';
import hearPhoneIcon from '@assets/icons/hear-phone.png';
import shieldValidIcon from '@assets/icons/shield-valid.png';

export default function MobileView() {
  const router = useRouter();

  const [orgName, setOrgName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const canContinue = orgName.trim() !== '' && email.trim() !== '';

  function handleContinue() {
    if (canContinue) router.push('/onboarding/verification');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={3} />
      </div>

      <main className="px-5 pb-4 pt-8">
        <h2 className="text-center font-serif text-[45px] font-normal leading-[56px] text-[#0F172A]">
          Tell Us About Your{' '}
          <span className="font-serif text-[56px] italic leading-[50px] text-[#2F66C8]">Organization</span>
        </h2>
        <p className="mt-2.5 text-center font-sans text-[14px] font-normal leading-normal text-[#8C97AD]">
          Add your organization details so people can find and trust your opportunities.
        </p>

        <div className="mt-6">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">
            Organization Name{' '}
            <span className="font-sans text-[14px] font-normal leading-[180%] text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Enter organization name"
            className="anchor-field mt-2 h-[50px]"
          />
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">Website</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourorganization.ca"
            className="anchor-field mt-2 h-[50px]"
          />
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">Description</label>
          <textarea
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 300) setDescription(e.target.value);
            }}
            placeholder="Describe your organization and mission"
            rows={3}
            className="anchor-textarea mt-2 text-[14px]"
          />
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">Address</label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={locationIcon} alt="" width={15} height={15} className="opacity-50" />
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address"
              className="anchor-field anchor-field--icon-left h-[50px]"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="anchor-field mt-2 h-[50px]"
            />
          </div>
          <div>
            <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">Postal Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="A1A 1A1"
              className="anchor-field mt-2 h-[50px]"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">Province</label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="anchor-field mt-2 h-[50px]"
          >
            <option value="">Select province</option>
            {CANADIAN_PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">Phone</label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={hearPhoneIcon} alt="" width={15} height={15} className="opacity-50" />
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 555-5555"
              className="anchor-field anchor-field--icon-left h-[50px]"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block font-sans text-[14px] font-medium leading-[180%] text-[#0F172A]">
            Email{' '}
            <span className="font-sans text-[14px] font-normal leading-[180%] text-[#EF4444]">*</span>
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Image src={mailIcon} alt="" width={15} height={15} className="opacity-50" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@organization.ca"
              className="anchor-field anchor-field--icon-left h-[50px]"
            />
          </div>
          <p className="mt-1.5 flex items-center gap-1 font-sans text-[11px] text-[#16A34A]">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <circle cx="6" cy="6" r="5" stroke="#16A34A" strokeWidth="1.5" />
              <path
                d="M4 6l1.5 1.5L8 4.5"
                stroke="#16A34A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            We&apos;ll never share your contact email.
          </p>
        </div>

        <div className="mt-4 flex h-[101.6px] items-center gap-3 rounded-2xl border border-[#D9E1EF] bg-[#F8FAFC] px-4 py-3">
          <Image src={shieldValidIcon} alt="" width={28} height={28} className="shrink-0 object-contain" />
          <div>
            <p className="font-sans text-[12px] font-semibold text-[#0F172A]">Your organization&apos;s security is our priority</p>
            <p className="mt-0.5 font-sans text-[10px] text-[#44516A]">
              Your information is encrypted, secure and private.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pt-6 pb-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
                canContinue ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding/categories"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>
          <div className="mt-4">
            <Footer variant="mobile" />
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="flex w-full items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
          >
            <div className="text-left">
              <p className="font-serif text-[20px] text-[#0F172A]">Preview your organization</p>
              <p className="font-sans text-[12px] text-[#44516A]">See how your profile will appear to applicants.</p>
            </div>
            <ChevronRight
              className={`h-4 w-4 shrink-0 text-[#8C97AD] transition-transform ${previewOpen ? 'rotate-90' : ''}`}
            />
          </button>

          {previewOpen && (
            <div className="mt-2 overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <OrgPreviewCard
                orgName={orgName}
                description={description}
                city={city}
                province={CANADIAN_PROVINCES.find((p) => p.value === province)?.label ?? province}
                email={email}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
