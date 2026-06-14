'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';

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
import { Footer } from './Footer';

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
      className={`relative flex items-center gap-3 rounded-sm bg-[#FFFFFF] border border-[#D9E1EF] px-3 py-3.5 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md'
          : 'border border-[#D9E1EF] shadow-sm'
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

      <p className="truncate pr-7 text-[12px] font-normal leading-[56px] text-[#0F172A] font-serif">{item.name}</p>
    </button>
  );
}

export default function MobileView() {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      {/* Steps bar */}
      <div className="px-5 pb-3 pt-4">
        <StepProgress current={1} />
      </div>

      {/* Main content */}
      <main className="px-5 pb-6 pt-6">
        <div className="text-center">
          <h1 className="font-serif text-[48px] font-normal leading-[56px] text-[#0F172A]">
            What{' '}
            <span className="italic text-[#2F66C8] font-serif text-[52px] leading-[56px]">Opportunities</span>
            <span className=" ml-px text-[#E8242B]">|</span>
            <br />
            Matter Most To You?
          </h1>
          <p className="mt-3 text-[14px] leading-[100%] text-[#8C97AD] font-sans">
            Select everything that matches your current goals.
            <br />
            The more you share, the better Anchor can personalize your experience.
          </p>
        </div>

        {/* Search + counter */}
        <div className="mt-6 rounded-sm border border-[#D9E1EF] bg-[]#FFFFFF px-5 py-4 shadow-sm">
          <div className="relative flex items-center gap-3">
            <Search className="h-4 w-4 shrink-0 text-[#8C97AD]" />
            <input
              type="text"
              placeholder="Search interests..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-sm border-0 bg-[#FFFFFF] p-x-5 text-[14px] text-[#0F172A] outline-none ring-0 placeholder:text-[#8C97AD] focus:ring-0"
            />
          </div>
          <div className="mt-3">
            <div
              className={`inline-flex items-center gap-2 rounded-sm font-sans border px-4 py-2 text-[14px] font-medium transition-colors ${
                hasSelected
                  ? 'border-[#2F66C8] text-[#2F66C8]'
                  : 'border-[#D9E1EF] text-[#8C97AD]'
              }`}
            >
              <Image
                src={circleCheckIcon}
                alt=""
                width={14}
                height={14}
                className={`object-contain ${hasSelected ? 'opacity-100' : 'opacity-40'}`}
              />
              {hasSelected ? `${count} selected` : 'None Selected'}
            </div>
          </div>
        </div>

        {/* 2-col grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {filtered.map((item) => (
            <MobileCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pt-6 pb-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!hasSelected}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-[6px] text-[15px] font-semibold text-white transition-colors ${
                hasSelected ? 'bg-[#2F66C8] hover:bg-[#2454A4]' : 'cursor-not-allowed bg-[#2F66C8]/40'
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
