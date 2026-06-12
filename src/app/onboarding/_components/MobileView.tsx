'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';

import card1Img from '@assets/images/card1.png';
import card3Img from '@assets/images/card3.png';
import userIcon from '@assets/icons/user.png';
import eyeIcon from '@assets/icons/eye.png';
import { Footer } from './Footer';

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
      {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </div>
  );
}

function MobileCard({
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
      className={`relative w-full overflow-hidden rounded-[20px] bg-white text-left shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] transition-all ${
        selected ? 'border-2 border-[#2F66C8]' : 'border border-[#D9E1EF]'
      }`}
    >
      <div className="relative h-[180px] w-full overflow-hidden bg-[#EFF4FF]">
        <Image src={card.image} alt={card.title} fill className="object-contain object-bottom" sizes="100vw" />
        <div className="absolute right-4 top-4">
          <RadioCircle selected={selected} />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3 className="font-instrument-serif text-[22px] leading-tight text-[#0F172A]">{card.title}</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#44516A]">{card.body}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[4px] px-1 py-0.5 text-[12px]"
              style={{ backgroundColor: card.tagBg, color: card.tagColor }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-[#EEF2F8] pt-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.statIconBg}`}>
            <Image src={card.statIconSrc} alt="" width={18} height={18} className="object-contain" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#0F172A]">{card.statBold}</p>
            <p className="text-[12px] text-[#44516A]">{card.statMuted}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function MobileView() {
  const [selected, setSelected] = useState<JourneyId | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (!selected) return;
    router.push('/onboarding/interest');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-2 pt-4">
        <StepProgress current={0} />
      </div>

      <main className="flex-1 px-5 pb-4 pt-8">
        <div className="text-center">
          <h1 className="font-instrument-serif text-[26px] leading-tight text-[#0F172A]">
            How Would You Like To Use
          </h1>
          <p className="font-instrument-serif text-[30px] italic leading-tight text-[#2F66C8]">Anchor?</p>
          <p className="mt-3 text-[12px] leading-relaxed text-[#8C97AD]">
            Choose the path that best matches your goals.
            <br />
            You can switch anytime.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {CARDS.map((card) => (
            <MobileCard
              key={card.id}
              card={card}
              selected={selected === card.id}
              onSelect={() => setSelected(card.id)}
            />
          ))}
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-[#D9E1EF] bg-white px-5 pb-8 pt-4">
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
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <Footer variant="mobile" />
      </div>
    </div>
  );
}
