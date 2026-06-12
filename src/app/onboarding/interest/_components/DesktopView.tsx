'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Check } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { Footer } from './Footer';

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
      className={`relative flex flex-col rounded-2xl bg-[#FFFFFF] p-4 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md bg-[#DCE7FF]'
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

      <p className="mt-3 pr-6 text-[28px] font-regular leading-[56px] text-[#0F172A] font-serif">{item.name}</p>
      <p className="mt-1 text-[16px] leading-100% text-[#8C97AD] font-sans  ">{item.desc}</p>

      {item.popular && (
        <div className="mt-2.5">
          <span className="rounded-full bg-[#EFF4FF] px-2.5 py-0.5 text-[10.69px] font-bold uppercase tracking-widest text-[#2F66C8] font-sans">
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#FFFFFF] to-[#F2F7FF] to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={1} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
        <div className="text-center">
          <h1 className="font-serif text-[60px] font-normal leading-tight text-[#0F172A]">
            What{' '}
            <span className="italic text-[#2F66C8] font-serif text-[78.83px]">Opportunities</span>
            <span className=" ml-px text-[#EF4444] w-[5.26px] h-[78.83px] inline-block">|</span>
            {/* <span className="cursor-blink ml-px text-[#E8242B]">|</span> */}
            {' '}Matter Most To You?
          </h1>
          <p className="mt-2.5 text-[16px] leading-relaxed text-[#8C97AD] font-sans">
            Select everything that matches your current goals.
            <br />
            The more you share, the better Anchor can personalize your experience.
          </p>
        </div>

        {/* Search + counter */}
        <div className="mt-8 flex w-full max-w-[1548px]  justify-between rounded-2xl border border-[#D9E1EF] bg-white px-5 py-3.5 shadow-sm">
  <div className="relative flex-1">
    <Search className="absolute left-0 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#8C97AD]" />
    <input
      type="text"
      placeholder="Search interests..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="anchor-field anchor-field--icon-left w-full border-0 bg-transparent pl-7 shadow-none"
    />
  </div>
  <div className="flex items-center gap-3">
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
</div>

        <div className="mt-5 grid w-full  max-w-[1548px]  grid-cols-5 gap-4">
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

      <OnboardingNavButtons
        backHref="/onboarding"
        onContinue={handleContinue}
        continueDisabled={!hasSelected}
        footer={<Footer />}
      />
    </div>
  );
}
