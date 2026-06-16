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

import card2Img from '@assets/images/card2.png';
import card3Img from '@assets/images/card3.png';
import briefcaseIcon from '@assets/icons/briefcase.png';
import eyeIcon from '@assets/icons/eye.png';

type JourneyId = 'register' | 'explore';

interface CardDef {
  id: JourneyId;
  title: string;
  body: string;
  tags: string[];
  tagBg: string;
  tagColor: string;
  statIconSrc: StaticImageData;
  statIconBg: string;
  statBold: string;
  statMuted: string;
  image: StaticImageData;
}

const CARDS: CardDef[] = [
  {
    id: 'register',
    title: 'Register as Provider',
    body: 'Publish jobs, grants, training, and community opportunities to Canadians nationwide.',
    tags: ['Jobs', 'Grants', 'Training', 'Community'],
    tagBg: '#EFF4FF',
    tagColor: '#2F66C8',
    statIconSrc: briefcaseIcon,
    statIconBg: 'bg-[#EFF4FF]',
    statBold: 'Reach thousands of Canadians',
    statMuted: 'looking for opportunities every week.',
    image: card2Img,
  },
  {
    id: 'explore',
    title: 'Explore First',
    body: 'Browse the provider portal, resources, and tools before registering your organization.',
    tags: ['Browse', 'Learn', 'Discover'],
    tagBg: '#F5F0FC',
    tagColor: '#6C34C7',
    statIconSrc: eyeIcon,
    statIconBg: 'bg-[#F5F0FC]',
    statBold: 'Explore freely with no commitment.',
    statMuted: 'Register when your organization is ready to publish.',
    image: card3Img,
  },
];

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
        selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white'
      }`}
    >
      {selected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
    </div>
  );
}

function SelectionCard({
  card,
  selected,
  onSelect,
}: {
  card: CardDef;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex w-full max-w-[490px] flex-col overflow-hidden rounded-[20px] bg-white text-left shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] transition-all ${
        selected ? 'border-2 border-[#2F66C8]' : 'border border-[#D9E1EF]'
      }`}
    >
      <div className="relative h-[240px] w-full overflow-hidden bg-[#EFF4FF]">
        <Image src={card.image} alt={card.title} fill className="object-contain object-bottom" sizes="490px" />
        <div className="absolute right-5 top-5">
          <RadioCircle selected={selected} />
        </div>
      </div>

      <div className="flex h-[273px] flex-col justify-between p-5">
        <div className="flex flex-col gap-7">
          <div>
            <h3 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">{card.title}</h3>
            <p className="font-sans text-[16px] leading-normal text-[#44516A]">{card.body}</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[4px] px-1 py-0.5 font-sans text-[14px]"
                style={{ backgroundColor: card.tagBg, color: card.tagColor }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[24px] p-2.5 ${card.statIconBg}`}>
            <Image src={card.statIconSrc} alt="" width={29} height={29} className="object-contain" />
          </div>
          <div>
            <p className="font-sans text-[16px] font-medium text-[#0F172A]">{card.statBold}</p>
            <p className="font-sans text-[14px] text-[#44516A]">{card.statMuted}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function DesktopView() {
  const [selected, setSelected] = useState<JourneyId | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (!selected) return;
    router.push('/onboarding/organization-type');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={0} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-[120px]">
        <div className="max-w-[688px] text-center">
          <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
            How Would You Like To Use
          </h1>
          <p className="font-serif text-[78px] font-normal italic leading-[74px] text-[#2F66C8]">
            Anchor?
          </p>
          <p className="mt-6 font-sans text-[16px] text-[#8C97AD]">
            Choose the path that best matches your organization&apos;s goals.
            <br />
            You can switch anytime.
          </p>
        </div>

        <div className="mt-[100px] flex w-full flex-wrap items-center justify-center gap-10">
          {CARDS.map((card) => (
            <SelectionCard
              key={card.id}
              card={card}
              selected={selected === card.id}
              onSelect={() => setSelected(card.id)}
            />
          ))}
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/"
        onContinue={handleContinue}
        continueDisabled={!selected}
        footer={<Footer />}
      />
    </div>
  );
}
