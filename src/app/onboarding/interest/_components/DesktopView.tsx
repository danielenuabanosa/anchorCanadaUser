'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingFooter } from '@/shared/components/onboarding/OnboardingFooter';

import briefcaseIcon from '@assets/icons/briefcase.png';
import handCoinsIcon from '@assets/icons/hand-coins.png';
import graduationIcon from '@assets/icons/graduation-cap.png';
import locationIcon from '@assets/icons/location2.png';
import userGreenIcon from '@assets/icons/user-green.png';
import rocketIcon from '@assets/icons/rocket.png';
import scholarshipIcon from '@assets/icons/scholarship.png';
import loveIcon from '@assets/icons/love.png';
import bookOpenIcon from '@assets/icons/book-open.png';
import caseIcon from '@assets/icons/case.png';
import circleCheckIcon from '@assets/icons/circle-check.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';

interface InterestDef {
  id: string;
  name: string;
  desc: string;
  popular: boolean;
  icon: StaticImageData;
  circleBg: string;
}

const INTERESTS: InterestDef[] = [
  { id: 'jobs',         name: 'Jobs',              desc: 'Find employment opportunities.',  popular: true,  icon: briefcaseIcon,   circleBg: '#EEF3FF' },
  { id: 'grants',       name: 'Grants',            desc: 'Funding and financial support.',  popular: true,  icon: handCoinsIcon,   circleBg: '#DFFAF3' },
  { id: 'training',     name: 'Training',          desc: 'Courses and certifications.',     popular: true,  icon: graduationIcon,  circleBg: '#F0EBFF' },
  { id: 'housing',      name: 'Housing',           desc: 'Housing support programs.',       popular: false, icon: locationIcon,    circleBg: '#FFF0EC' },
  { id: 'community',    name: 'Community Support', desc: 'Social and community services.',  popular: false, icon: userGreenIcon,   circleBg: '#E6F7EF' },
  { id: 'entrepreneur', name: 'Entrepreneurship',  desc: 'Business and startup support.',   popular: false, icon: rocketIcon,      circleBg: '#FFF6E0' },
  { id: 'scholarships', name: 'Scholarships',      desc: 'Educational funding.',            popular: false, icon: scholarshipIcon, circleBg: '#FFF0F6' },
  { id: 'volunteer',    name: 'Volunteer',         desc: 'Volunteer opportunities.',        popular: false, icon: loveIcon,        circleBg: '#E6F7EF' },
  { id: 'mentorship',   name: 'Mentorship',        desc: 'Guidance and coaching.',          popular: false, icon: bookOpenIcon,    circleBg: '#EEF3FF' },
  { id: 'internships',  name: 'Internships',       desc: 'Hands-on work experience.',       popular: false, icon: caseIcon,        circleBg: '#F3EEFF' },
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

function InterestCard({
  item,
  selected,
  onToggle,
}: {
  item: InterestDef;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex flex-col rounded-2xl bg-white p-4 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md'
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

      <p className="mt-3 pr-6 text-[13px] font-bold leading-tight text-[#0F172A]">{item.name}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-[#8C97AD]">{item.desc}</p>

      {item.popular && (
        <div className="mt-2.5">
          <span className="rounded-full bg-[#EFF4FF] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#2F66C8]">
            Popular
          </span>
        </div>
      )}
    </button>
  );
}

export default function DesktopView() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const router = useRouter();

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = useMemo(
    () => INTERESTS.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const count = selected.size;
  const hasSelected = count > 0;

  function handleContinue() {
    if (!hasSelected) return;
    router.push('/onboarding/location');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {/* Steps bar */}
      <div className="border-b border-[#D9E1EF] bg-white">
        <div className="mx-auto max-w-5xl px-10 pb-3 pt-4">
          <StepProgress current={1} />
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center px-10 py-10">
        <div className="text-center">
          <h1 className="font-instrument-serif text-[46px] font-normal leading-tight text-[#0F172A]">
            What{' '}
            <span className="italic text-[#2F66C8]">Opportunities</span>
            <span className="cursor-blink ml-px text-[#E8242B]">|</span>
            {' '}Matter Most To You?
          </h1>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[#8C97AD]">
            Select everything that matches your current goals.
            <br />
            The more you share, the better Anchor can personalize your experience.
          </p>
        </div>

        {/* Search + counter */}
        <div className="mt-8 flex w-full max-w-4xl items-center justify-between rounded-2xl border border-[#D9E1EF] bg-white px-5 py-3.5 shadow-sm">
          <div className="flex flex-1 items-center gap-3">
            <Search className="h-[15px] w-[15px] shrink-0 text-[#8C97AD]" />
            <input
              type="text"
              placeholder="Search interests..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
          </div>
          <div className={`flex items-center gap-1.5 ${hasSelected ? 'text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
            <Image
              src={circleCheckIcon}
              alt=""
              width={16}
              height={16}
              className={`object-contain transition-opacity ${hasSelected ? 'opacity-100' : 'opacity-40'}`}
            />
            <span className="whitespace-nowrap text-[13px] font-medium">
              {hasSelected ? `${count} selected` : 'None Selected'}
            </span>
          </div>
        </div>

        {/* 5-col grid */}
        <div className="mt-5 grid w-full max-w-4xl grid-cols-5 gap-4">
          {filtered.map((item) => (
            <InterestCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </main>

      {/* Bottom nav */}
      <div className="border-t border-[#D9E1EF] bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-10 py-5">
          <Link
            href="/onboarding"
            className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-[#D9E1EF] bg-white px-6 text-[14px] font-medium text-[#0F172A] transition-colors hover:bg-[#EFF4FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!hasSelected}
            className={`inline-flex h-10 items-center gap-2 rounded-xl px-8 text-[14px] font-semibold text-white transition-colors ${
              hasSelected
                ? 'cursor-pointer bg-[#2F66C8] hover:bg-[#1B4FCA]'
                : 'cursor-not-allowed bg-[#2F66C8]/40'
            }`}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Footer strip */}
        <div className="mx-auto max-w-4xl border-t border-[#EEF2F8] px-10 py-4">
          <div className="flex items-center gap-2 text-[12px] text-[#44516A]">
            <Image src={lightBulbIcon} alt="" width={16} height={16} className="shrink-0 object-contain" />
            <span>
              <strong className="font-medium text-[#0F172A]">Not sure what to choose?</strong>{' '}
              You can update your interests anytime in your account settings.
            </span>
          </div>
          <OnboardingFooter />
        </div>
      </div>
    </div>
  );
}
