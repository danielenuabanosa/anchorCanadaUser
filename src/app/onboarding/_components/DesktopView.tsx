'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingFooter } from '@/shared/components/onboarding/OnboardingFooter';

import ac1Img from '@assets/images/ac1.png';
import ac3Img from '@assets/images/ac3.png';
import userIcon from '@assets/icons/user.png';
import eyeIcon from '@assets/icons/eye.png';

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
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
        selected ? 'bg-[#2F66C8]' : 'bg-neutral-200'
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
      className={`relative flex flex-col overflow-hidden rounded-2xl bg-white text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md'
          : 'border-2 border-[#D9E1EF] shadow-sm hover:shadow-md'
      }`}
    >
      {/* Banner */}
      <div
        className="relative h-[165px] w-full overflow-hidden"
        style={{ backgroundColor: card.bannerBg }}
      >
        <Image src={card.image} alt={card.title} fill className="object-contain" sizes="33vw" />
        {/* Radio circle — absolute top-right on banner */}
        <div className="absolute right-3 top-3">
          <RadioCircle selected={selected} />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col p-5">
        <h3 className="text-[17px] font-bold text-[#0F172A]">{card.title}</h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#8C97AD]">{card.body}</p>

        <div className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
              style={{ backgroundColor: card.tagBg, color: card.tagColor }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 border-t border-[#EEF2F8] pt-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${card.statIconBg}`}
            >
              <Image src={card.statIconSrc} alt="" width={18} height={18} className="object-contain" />
            </div>
            <div>
              <p className="text-[12px] font-bold leading-snug text-[#0F172A]">{card.statBold}</p>
              <p className="mt-0.5 text-[11px] text-[#8C97AD]">{card.statMuted}</p>
            </div>
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {/* Steps bar */}
      <div className="border-b border-[#D9E1EF] bg-white mt-4">
        <div className="mx-auto max-w-5xl px-10 pb-3 pt-4">
          <StepProgress current={0} />
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center px-10 py-12">
        <div className="text-center">
          <h1 className="font-instrument-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
            How Would You Like To Use
            <span className="block font-instrument-serif text-[78px] font-normal italic leading-[73px] text-[#2F66C8]">
              Anchor?
            </span>
          </h1>
          <p className="mt-4 text-[13px] leading-relaxed text-[#8C97AD]">
            Choose the path that best matches your goals.
            <br />
            You can switch anytime.
          </p>
        </div>

        <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-8">
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

      {/* Bottom nav */}
      <div className="border-t border-[#D9E1EF] bg-white px-10 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-[#D9E1EF] bg-white px-6 text-[14px] font-medium text-[#0F172A] transition-colors hover:bg-[#EFF4FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selected}
            className={`inline-flex h-10 items-center gap-2 rounded-xl px-8 text-[14px] font-semibold text-white transition-colors ${
              selected
                ? 'bg-[#2F66C8] hover:bg-[#1B4FCA] cursor-pointer'
                : 'bg-[#2F66C8]/40 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <OnboardingFooter />
      </div>
    </div>
  );
}
