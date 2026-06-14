'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Check, X, Trash2 } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { Footer } from './Footer';

import ontarioFlag from '@assets/icons/ontario.png';
import bcFlag from '@assets/icons/british-columbia.png';
import quebecFlag from '@assets/icons/quebec.png';
import albertaFlag from '@assets/icons/alberta.png';
import manitobaFlag from '@assets/icons/manitoba.png';
import saskatchewanFlag from '@assets/icons/Saskatchewan.png';
import novaScotiaFlag from '@assets/icons/Nova-Scotia.png';
import newBrunswickFlag from '@assets/icons/New-Brunswick.png';
import locationPinIcon from '@assets/icons/location2.png';
import circleCheckIcon from '@assets/icons/circle-check.png';
import lightBulbIcon from '@assets/icons/light-bulb.png';
import worldImg from '@assets/images/world.png';
import remoteImg from '@assets/images/remote.png';
import travelImg from '@assets/images/travel.png';
import locationAlertImg from '@assets/images/location-alert.png';

interface ProvinceDef {
  id: string;
  name: string;
  code: string;
  cities: string;
  flag: StaticImageData;
}

interface SpecialDef {
  id: string;
  title: string;
  body: string;
  img: StaticImageData;
}

const PROVINCES: ProvinceDef[] = [
  { id: 'on', name: 'Ontario',          code: 'ON', cities: 'Toronto • Ottawa\nHamilton • London',       flag: ontarioFlag      },
  { id: 'bc', name: 'British Columbia', code: 'BC', cities: 'Vancouver • Victoria\nSurrey • Kelowna',    flag: bcFlag           },
  { id: 'qc', name: 'Quebec',           code: 'QC', cities: 'Montreal • Quebec City\nLaval • Gatineau',  flag: quebecFlag       },
  { id: 'ab', name: 'Alberta',          code: 'AB', cities: 'Calgary • Edmonton\nRed Deer • Lethbridge', flag: albertaFlag      },
  { id: 'mb', name: 'Manitoba',         code: 'MB', cities: 'Winnipeg • Brandon\nSteinbach',             flag: manitobaFlag     },
  { id: 'sk', name: 'Saskatchewan',     code: 'SK', cities: 'Saskatoon • Regina\nPrince Albert',         flag: saskatchewanFlag },
  { id: 'ns', name: 'Nova Scotia',      code: 'NS', cities: 'Halifax • Sydney\nDartmouth',               flag: novaScotiaFlag   },
  { id: 'nb', name: 'New Brunswick',    code: 'NB', cities: 'Fredericton • Moncton\nSaint John',         flag: newBrunswickFlag },
];

const SPECIALS: SpecialDef[] = [
  { id: 'canada-wide',   title: 'Canada Wide',      body: 'Show me opportunities available across all provinces and territories.',    img: worldImg  },
  { id: 'remote-only',   title: 'Remote Only',      body: "I'm interested in remote jobs, online training and virtual support.",     img: remoteImg },
  { id: 'moving-canada', title: 'Moving to Canada', body: "I'm planning to move to Canada and want newcomer-friendly opportunities.", img: travelImg },
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

function ProvinceCard({ p, selected, onToggle }: { p: ProvinceDef; selected: boolean; onToggle: () => void }) {
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
      <Image src={p.flag} alt={p.name} width={96} height={60} className="rounded-sm object-cover" />
      <p className="mt-3 pr-8 text-[20px] font-normal leading-[56px] text-[#0F172A] font-serif">{p.name}</p>
      <p className="mt-1 whitespace-pre-line text-[16px] leading-[180%] text-[#8C97AD] font-sans font-normal">{p.cities}</p>
      <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-[#DCE7FF] px-2.5 py-1">
        <Image src={locationPinIcon} alt="" width={11} height={11} className="object-contain" />
        <span className="text-[10.69px] font-bold text-[#44516A] font-sans font-normal">{p.code}</span>
      </div>
    </button>
  );
}

function SpecialCard({ s, selected, onToggle }: { s: SpecialDef; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      
      className={`relative flex min-h-[185px] flex-col overflow-hidden rounded-sm bg-[#FFFFFF] p-5 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md bg-[#DCE7FF]'
          : 'border border-[#D9E1EF] shadow-sm hover:border-[#2F66C8]/30 hover:shadow-md'
      }`}
    >
      <div className="absolute right-3 top-3 z-10">
        <RadioDot selected={selected} />
      </div>
      <p className="font-serif pr-8 text-[28px] font-normal italic leading-[56px] text-[#2F66C8]">
        {s.title}
      </p>
      <p className="mt-2 max-w-[65%] text-[16px] leading-[100%] text-[#8C97AD] font-sans font-normal">{s.body}</p>
      <div className="pointer-events-none absolute bottom-0 right-0 h-[120px] w-[140px]">
        <Image src={s.img} alt="" fill className="object-contain object-right-bottom" />
      </div>
    </button>
  );
}

function TooltipCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-[#D9E1EF]">
      <div className="relative h-16 w-12 shrink-0">
        <Image src={locationAlertImg} alt="" fill className="object-contain" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-bold text-[#0F172A]">Why we ask for your location</p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-[#8C97AD] transition-colors hover:text-[#44516A]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#8C97AD]">
          It helps us show you relevant opportunities, programs, and support available in your area.
        </p>
      </div>
    </div>
  );
}

export default function DesktopView() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filteredProvinces = useMemo(
    () =>
      PROVINCES.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.cities.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const count = selected.size;
  const hasSelected = count > 0;

  function handleContinue() {
    if (!hasSelected) return;
    router.push('/onboarding/profile');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#FFFFFF] to-[#F2F7FF] to-[#f2f7ff]">
      <OnboardingNavbar onHelpClick={() => setShowTooltip((v) => !v)} />

      {showTooltip && (
        <div className="fixed right-8 top-[72px] z-50 w-72">
          <TooltipCard onClose={() => setShowTooltip(false)} />
        </div>
      )}

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={2} />
      </div>

      <main className="mx-auto flex w-full max-w-[1548px] flex-1 flex-col items-center px-10 pb-16 pt-10">
        <div className="text-center">
          <h1 className="font-serif text-[60px] font-normal leading-tight text-[#0F172A]">
            Where Should Anchor
            <br />
            Focus Your{' '}
            <span className="italic text-[#2F66C8] font-serif text-[78.83px]">Opportunities</span>
            <span className="ml-px text-[#EF4444] w-[5.26px] h-[78.83px] inline-block">|</span>
          </h1>
          <p className="mt-2.5 text-[16px] leading-relaxed text-[#8C97AD] font-sans">
            Choose your current location, or where you&apos;d like to discover opportunities.
            <br />
            You can update this anytime.
          </p>
        </div>

        {/* Search + counter */}
        <div className="mt-8 flex w-full max-w-[1548px] justify-between rounded-2xl border border-[#D9E1EF] bg-white px-5 py-3.5 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-0 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#8C97AD]" />
            <input
              type="text"
              placeholder="Search city, province or region..."
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
                {hasSelected ? `${count} locations selected` : 'None Selected'}
              </span>
            </div>
            {hasSelected && (
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="flex items-center gap-1 text-[12px] font-semibold text-red-500 transition-opacity hover:opacity-75"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Popular Provinces */}
        <div className="mt-5 w-full max-w-[1548px]">
          <p className="mb-4 text-[18px] font-semibold text-[#0F172A] font-sans leading-[100%]">Popular Provinces</p>
          <div className="grid grid-cols-4 gap-4">
            {filteredProvinces.map((p) => (
              <ProvinceCard
                key={p.id}
                p={p}
                selected={selected.has(p.id)}
                onToggle={() => toggle(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Other ways */}
        <div className="mt-10 w-full max-w-[1548px]">
          <p className="mb-4 text-[14px] font-bold text-[#0F172A]">Other ways to find opportunities</p>
          <div className="grid grid-cols-3 gap-4">
            {SPECIALS.map((s) => (
              <SpecialCard
                key={s.id}
                s={s}
                selected={selected.has(s.id)}
                onToggle={() => toggle(s.id)}
              />
              
            ))}
          </div>
        </div>

        {/* <div className="mt-8 flex w-full max-w-[1548px] items-center gap-2 text-[12px] text-[#44516A]">
          <Image src={lightBulbIcon} alt="" width={16} height={16} className="shrink-0 object-contain" />
          <span>
            <strong className="font-medium text-[#0F172A]">Not sure yet?</strong>{' '}
            You can update your location anytime in your account settings.
          </span>
        </div> */}
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/interest"
        onContinue={handleContinue}
        continueDisabled={!hasSelected}
        footer={<Footer />}
      />
    </div>
  );
}