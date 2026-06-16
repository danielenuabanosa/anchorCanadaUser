'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
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
  desc: string;
  icon: StaticImageData;
  circleBg: string;
}

const ORG_TYPES: OrgTypeDef[] = [
  { id: 'nonprofit', name: 'Non-profit', desc: 'Charitable and community-focused organizations.', icon: heartHandshakeIcon, circleBg: '#E6F7EF' },
  { id: 'business', name: 'Business / Corporation', desc: 'Private companies and enterprises.', icon: briefcaseIcon, circleBg: '#EEF3FF' },
  { id: 'government', name: 'Government', desc: 'Federal, provincial, or municipal agencies.', icon: shieldIcon, circleBg: '#FFF6E0' },
  { id: 'education', name: 'Educational Institution', desc: 'Schools, colleges, and universities.', icon: graduationIcon, circleBg: '#F0EBFF' },
  { id: 'community', name: 'Community Organization', desc: 'Local groups and grassroots initiatives.', icon: userGreenIcon, circleBg: '#DFFAF3' },
  { id: 'other', name: 'Other', desc: 'Other organization types not listed above.', icon: folderIcon, circleBg: '#FFF0EC' },
];

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div
      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
        selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
      }`}
    >
      {selected && <Check className="h-3 w-3 text-white" strokeWidth={3.5} />}
    </div>
  );
}

function OrgTypeCard({
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
      className={`relative flex flex-col rounded-2xl bg-white p-4 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] bg-[#DCE7FF] shadow-md'
          : 'border border-[#D9E1EF] shadow-sm hover:border-[#2F66C8]/30 hover:shadow-md'
      }`}
    >
      <div className="absolute right-3 top-3">
        <RadioDot selected={selected} />
      </div>

      <div
        className="flex h-[50px] w-[50px] items-center justify-center rounded-full"
        style={{ backgroundColor: item.circleBg }}
      >
        <Image src={item.icon} alt="" width={22} height={22} className="object-contain" />
      </div>

      <p className="mt-3 pr-6 font-serif text-[28px] font-normal leading-[56px] text-[#0F172A]">{item.name}</p>
      <p className="mt-1 font-sans text-[16px] leading-[100%] text-[#8C97AD]">{item.desc}</p>
    </button>
  );
}

export default function DesktopView() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (!selected) return;
    router.push('/onboarding/categories');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={1} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
        <div className="text-center">
          <h1 className="font-serif text-[60px] font-normal leading-tight text-[#0F172A]">
            What Type of{' '}
            <span className="font-serif text-[78.83px] italic text-[#2F66C8]">Organization</span>
            {' '}Are You?
          </h1>
          <p className="mt-2.5 font-sans text-[16px] leading-relaxed text-[#8C97AD]">
            Select the category that best describes your organization.
            <br />
            This helps us tailor your provider experience.
          </p>
        </div>

        <div className="mt-10 grid w-full max-w-[1548px] grid-cols-3 gap-4">
          {ORG_TYPES.map((item) => (
            <OrgTypeCard
              key={item.id}
              item={item}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          ))}
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding"
        onContinue={handleContinue}
        continueDisabled={!selected}
        footer={<Footer />}
      />
    </div>
  );
}
