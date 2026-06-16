'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { CANADIAN_PROVINCES } from '@/shared/constants';
import { Footer } from './Footer';
import { OrgPreviewCard } from './OrgPreviewCard';

import mailIcon from '@assets/icons/mail.png';
import locationIcon from '@assets/icons/location2.png';
import hearPhoneIcon from '@assets/icons/hear-phone.png';

export default function DesktopView() {
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

  const canContinue = orgName.trim() !== '' && email.trim() !== '';

  function handleContinue() {
    if (canContinue) router.push('/onboarding/verification');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={3} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-20">
        <div className="flex w-full gap-12">
          <div className="flex w-[886px] max-w-[886px] flex-1 flex-col">
            <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
              Tell Us About Your{' '}
              <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Organization</span>
            </h1>
            <p className="mt-3 font-sans text-[16px] font-normal leading-normal text-[#8C97AD]">
              Add your organization details so people can find and trust your opportunities.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div>
                <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                  Organization Name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Enter organization name"
                  className="mt-1.5 anchor-field h-[53px]"
                />
              </div>

              <div>
                <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                  Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourorganization.ca"
                  className="mt-1.5 anchor-field h-[53px]"
                />
              </div>

              <div>
                <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => { if (e.target.value.length <= 300) setDescription(e.target.value); }}
                  placeholder="Describe your organization and mission"
                  rows={4}
                  className="anchor-textarea mt-1.5"
                />
              </div>

              <div>
                <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                  Address
                </label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <Image src={locationIcon} alt="" width={16} height={16} className="opacity-50" />
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address"
                    className="anchor-field anchor-field--icon-left h-[53px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="mt-1.5 anchor-field h-[53px]"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">Province</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="mt-1.5 anchor-field h-[53px]"
                  >
                    <option value="">Select province</option>
                    {CANADIAN_PROVINCES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="A1A 1A1"
                    className="mt-1.5 anchor-field h-[53px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">Phone</label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Image src={hearPhoneIcon} alt="" width={16} height={16} className="opacity-50" />
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 555-5555"
                      className="anchor-field anchor-field--icon-left h-[53px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-[16px] font-medium leading-[180%] text-[#0F172A]">
                    Email <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Image src={mailIcon} alt="" width={16} height={16} className="opacity-50" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@organization.ca"
                      className="anchor-field anchor-field--icon-left h-[53px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[622px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-[#D9E1EF] bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold leading-snug text-[#0F172A]">
                  Here&apos;s how your organization will look
                </p>
                <span className="flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Live Preview
                </span>
              </div>
              <div className="mt-4">
                <OrgPreviewCard
                  orgName={orgName}
                  description={description}
                  city={city}
                  province={CANADIAN_PROVINCES.find((p) => p.value === province)?.label ?? province}
                  email={email}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/categories"
        onContinue={handleContinue}
        continueDisabled={!canContinue}
        footer={<Footer />}
      />
    </div>
  );
}
