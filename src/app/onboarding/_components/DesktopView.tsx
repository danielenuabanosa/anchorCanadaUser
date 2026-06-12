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

import card1Img from '@assets/images/card1.png';
import card3Img from '@assets/images/card3.png';
import userIcon from '@assets/icons/user.png';
import eyeIcon from '@assets/icons/eye.png';

type JourneyId = 'onboard' | 'explore';

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
    id: 'onboard',
    title: 'Start Onboarding',
    body: 'Discover jobs, grants, training, housing, and community support.',
    tags: ['Jobs', 'Grants', 'Training', 'Support'],
    tagBg: '#EFF4FF',
    tagColor: '#2F66C8',
    statIconSrc: userIcon,
    statIconBg: 'bg-[#EFF4FF]',
    statBold: '10,000+ opportunities discovered',
    statMuted: 'every week by people like you.',
    image: card1Img,
  },
  {
    id: 'explore',
    title: 'Explore First',
    body: 'Browse opportunities, stories, and resources before using the platform.',
    tags: ['Browse', 'Learn', 'Discover'],
    tagBg: '#F5F0FC',
    tagColor: '#6C34C7',
    statIconSrc: eyeIcon,
    statIconBg: 'bg-[#F5F0FC]',
    statBold: 'Explore freely with no commitment.',
    statMuted: "Create an account when you're ready.",
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
            <h3 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">
              {card.title}
            </h3>
            <p className="text-[16px] leading-normal text-[#44516A] font-sans">{card.body}</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[4px] px-1 py-0.5 text-[14px] font-sans"
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
            <p className="text-[16px] font-medium text-[#0F172A] font-sans">{card.statBold}</p>
            <p className="text-[14px] text-[#44516A] font-sans">{card.statMuted}</p>
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
    router.push('/onboarding/interest');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#EFF4FF]">
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
          <p className="mt-6 text-[16px] text-[#8C97AD] font-sans">
            Choose the path that best matches your goals.
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
