'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';

import ac1Img from '@assets/images/ac1.png';
import ac3Img from '@assets/images/ac3.png';
import userIcon from '@assets/icons/user.png';
import eyeIcon from '@assets/icons/eye.png';
import infoIcon from '@assets/icons/info.png';

type JourneyId = 'onboard' | 'explore';

interface CardDef {
  id: JourneyId;
  title: string;
  body: string;
  tags: string[];
  bannerBg: string;
  tagColor: string;
  tagBg: string;
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
    bannerBg: '#EEF3FF',
    tagBg: '#EFF4FF',
    tagColor: '#2F66C8',
    statIconSrc: userIcon,
    statIconBg: 'bg-[#EFF4FF]',
    statBold: '10,000+ opportunities discovered',
    statMuted: 'every week by people like you.',
    image: ac1Img,
  },
  {
    id: 'explore',
    title: 'Explore First',
    body: 'Browse opportunities, stories, and resources before using the platform.',
    tags: ['Browse', 'Learn', 'Discover'],
    bannerBg: '#F5F0FC',
    tagBg: '#F5F0FC',
    tagColor: '#6C34C7',
    statIconSrc: eyeIcon,
    statIconBg: 'bg-[#F5F0FC]',
    statBold: 'Explore freely with no commitment.',
    statMuted: "Create an account when you're ready.",
    image: ac3Img,
  },
];

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
        selected ? 'bg-[#2F66C8]' : 'bg-neutral-200'
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
      className={`relative flex items-start gap-4 rounded-2xl bg-white p-4 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md'
          : 'border-2 border-[#D9E1EF] shadow-sm'
      }`}
    >
      {/* Icon circle */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: card.bannerBg }}
      >
        <Image src={card.image} alt={card.title} width={28} height={28} className="object-contain" />
      </div>

      <div className="flex-1 pr-8">
        <p className="text-[14px] font-bold text-[#0F172A]">{card.title}</p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-[#8C97AD]">{card.body}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: card.tagBg, color: card.tagColor }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-4">
        <RadioCircle selected={selected} />
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

      {/* Steps bar */}
      <div className="px-5 pb-2 pt-4">
        <StepProgress current={0} />
      </div>

      {/* Main content */}
      <main className="flex-1 px-5 pb-4 pt-8">
        <div className="text-center">
          <h1 className="font-instrument-serif">
            <span className="block text-[28px] font-normal text-[#0F172A]">
              How Would You Like To Use
            </span>
            <span className="block text-[32px] font-normal italic text-[#2F66C8]">
              Anchor?
            </span>
          </h1>
          <p className="mt-3 text-[12px] leading-relaxed text-[#8C97AD]">
            Choose the path that best matches your goals.
            <br />
            You can switch anytime.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
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

      {/* Sticky bottom nav */}
      <div className="sticky bottom-0 border-t border-[#D9E1EF] bg-white px-5 pb-8 pt-4">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selected}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white transition-colors ${
              selected
                ? 'bg-[#2F66C8] hover:bg-[#1B4FCA] cursor-pointer'
                : 'bg-[#2F66C8]/50 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#D9E1EF] bg-white text-[15px] font-medium text-[#0F172A] transition-colors hover:bg-[#EFF4FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
        <div className="mt-4 flex items-start gap-2 text-[11px] text-[#44516A]">
          <Image src={infoIcon} alt="" width={15} height={15} className="mt-0.5 shrink-0" />
          Your journey can be updated anytime in your account settings.
        </div>
      </div>
    </div>
  );
}
