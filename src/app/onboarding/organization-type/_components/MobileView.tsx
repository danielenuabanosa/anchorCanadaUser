'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { Footer } from './Footer';

import heartHandshakeIcon from '@assets/icons/heart-handshake.png';
import briefcaseIcon from '@assets/icons/briefcase2.png';
import shieldIcon from '@assets/icons/shield.png';
import graduationIcon from '@assets/icons/graduation-cap.png';
import userGreenIcon from '@assets/icons/user-green.png';
import folderIcon from '@assets/icons/folder.png';

interface OrgTypeDef {
  id: string;
  name: string;
  icon: StaticImageData;
  circleBg: string;
}

const ORG_TYPES: OrgTypeDef[] = [
  { id: 'nonprofit', name: 'Non-profit', icon: heartHandshakeIcon, circleBg: '#E6F7EF' },
  { id: 'business', name: 'Business / Corporation', icon: briefcaseIcon, circleBg: '#EEF3FF' },
  { id: 'government', name: 'Government', icon: shieldIcon, circleBg: '#FFF6E0' },
  { id: 'education', name: 'Educational Institution', icon: graduationIcon, circleBg: '#F0EBFF' },
  { id: 'community', name: 'Community Organization', icon: userGreenIcon, circleBg: '#DFFAF3' },
  { id: 'other', name: 'Other', icon: folderIcon, circleBg: '#FFF0EC' },
];

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div
      className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
        selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
      }`}
    >
      {selected && <Check className="h-3 w-3 text-white" strokeWidth={3.5} />}
    </div>
  );
}

function MobileCard({
  item,
  selected,
  onSelect,
}: {
  item: OrgTypeDef;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex items-center gap-3 rounded-sm border px-3 py-3.5 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] bg-[#DCE7FF] shadow-md'
          : 'border-[#D9E1EF] bg-white shadow-sm'
      }`}
    >
      <div className="absolute right-2.5 top-2.5">
        <RadioDot selected={selected} />
      </div>

      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: item.circleBg }}
      >
        <Image src={item.icon} alt="" width={18} height={18} className="object-contain" />
      </div>

      <p className="truncate pr-7 font-serif text-[12px] font-normal leading-[56px] text-[#0F172A]">{item.name}</p>
    </button>
  );
}

export default function MobileView() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (!selected) return;
    router.push('/onboarding/categories');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={1} />
      </div>

      <main className="px-5 pb-6 pt-6">
        <div className="text-center">
          <h1 className="font-serif text-[48px] font-normal leading-[56px] text-[#0F172A]">
            What Type of{' '}
            <span className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Organization</span>
            <br />
            Are You?
          </h1>
          <p className="mt-3 font-sans text-[14px] leading-[100%] text-[#8C97AD]">
            Select the category that best describes your organization.
            <br />
            This helps us tailor your provider experience.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {ORG_TYPES.map((item) => (
            <MobileCard
              key={item.id}
              item={item}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          ))}
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pb-8 pt-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selected}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
                selected ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
              }`}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <Footer variant="mobile" />
        </div>
      </main>
    </div>
  );
}
