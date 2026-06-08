'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, ArrowRight, Check, X, Trash2 } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingFooter } from '@/shared/components/onboarding/OnboardingFooter';

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
      className={`relative flex flex-col rounded-2xl bg-white p-4 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md'
          : 'border border-[#D9E1EF] shadow-sm hover:border-[#2F66C8]/30 hover:shadow-md'
      }`}
    >
      <div className="absolute right-3 top-3">
        <RadioDot selected={selected} />
      </div>
      <Image src={p.flag} alt={p.name} width={64} height={42} className="rounded-sm object-cover" />
      <p className="mt-3 pr-8 text-[14px] font-bold leading-snug text-[#0F172A]">{p.name}</p>
      <p className="mt-1 whitespace-pre-line text-[11px] leading-relaxed text-[#8C97AD]">{p.cities}</p>
      <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-[#EFF4FF] px-2.5 py-1">
        <Image src={locationPinIcon} alt="" width={11} height={11} className="object-contain" />
        <span className="text-[10px] font-bold text-[#44516A]">{p.code}</span>
      </div>
    </button>
  );
}

function SpecialCard({ s, selected, onToggle }: { s: SpecialDef; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex min-h-[185px] flex-col rounded-2xl bg-white p-5 text-left transition-all ${
        selected
          ? 'border-2 border-[#2F66C8] shadow-md'
          : 'border border-[#D9E1EF] shadow-sm hover:border-[#2F66C8]/30 hover:shadow-md'
      }`}
    >
      <div className="absolute right-3 top-3 z-10">
        <RadioDot selected={selected} />
      </div>
      <p className="font-instrument-serif pr-8 text-[18px] font-normal italic leading-snug text-[#2F66C8]">
        {s.title}
      </p>
      <p className="mt-2 max-w-[65%] text-[12px] leading-relaxed text-[#8C97AD]">{s.body}</p>
      <div className="pointer-events-none absolute bottom-0 right-0 h-[145px] w-[175px] translate-y-[32%]">
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
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar onHelpClick={() => setShowTooltip((v) => !v)} />

      {showTooltip && (
        <div className="fixed right-8 top-[72px] z-50 w-72">
          <TooltipCard onClose={() => setShowTooltip(false)} />
        </div>
      )}

      {/* Steps bar */}
      <div className="border-b border-[#D9E1EF] bg-white">
        <div className="mx-auto max-w-5xl px-10 pb-3 pt-4">
          <StepProgress current={2} />
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center px-10 py-10">
        <div className="text-center">
          <h1 className="font-instrument-serif text-[46px] font-normal leading-tight text-[#0F172A]">
            Where Should Anchor
            <br />
            Focus Your{' '}
            <span className="italic text-[#2F66C8]">Opportunities</span>
            <span className="cursor-blink ml-px text-[#E8242B]">|</span>
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-[#8C97AD]">
            Choose your current location, or where you&apos;d like to discover opportunities.
            <br />
            You can update this anytime.
          </p>
        </div>

        {/* Search + counter */}
        <div className="mt-8 flex w-full max-w-4xl items-center justify-between rounded-2xl border border-[#D9E1EF] bg-white px-5 py-3.5 shadow-sm">
          <div className="flex flex-1 items-center gap-3">
            <Search className="h-[15px] w-[15px] shrink-0 text-[#8C97AD]" />
            <input
              type="text"
              placeholder="Search city, province or region..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 ${hasSelected ? 'text-[#2F66C8]' : 'text-[#8C97AD]'}`}>
              <Image
                src={circleCheckIcon}
                alt=""
                width={16}
                height={16}
                className={`object-contain ${hasSelected ? 'opacity-100' : 'opacity-40'}`}
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
        <div className="mt-8 w-full max-w-4xl">
          <p className="mb-4 text-[14px] font-bold text-[#0F172A]">Popular Provinces</p>
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
        <div className="mt-10 w-full max-w-4xl pb-16">
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
      </main>

      {/* Bottom nav */}
      <div className="border-t border-[#D9E1EF] bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-10 py-5">
          <Link
            href="/onboarding/interest"
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

        <div className="mx-auto max-w-4xl border-t border-[#EEF2F8] px-10 py-4">
          <div className="flex items-center gap-2 text-[12px] text-[#44516A]">
            <Image src={lightBulbIcon} alt="" width={16} height={16} className="shrink-0 object-contain" />
            <span>
              <strong className="font-medium text-[#0F172A]">Not sure yet?</strong>{' '}
              You can update your location anytime in your account settings.
            </span>
          </div>
          <OnboardingFooter />
        </div>
      </div>
    </div>
  );
}
