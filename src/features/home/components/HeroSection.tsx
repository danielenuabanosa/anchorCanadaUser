import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Bookmark,
  Briefcase,
  Leaf,
  Ban,
  BadgeCheck,
  Zap,
  Send,
  Users,
} from 'lucide-react';
import heroBg   from '@assets/images/herobg.png';
import compassIcon from '@assets/icons/compass.png';

/* --- Static data ------------------------------------------ */
const TRUST_ITEMS = [
  { icon: Ban, label: 'No spam' },
  { icon: BadgeCheck, label: 'Verified opportunities' },
  { icon: Zap, label: 'Free to use' },
] as const;

const SNAPSHOT_STATS = [
  { Icon: Send,     label: 'Applications', value: '24', trend: '16%' },
  { Icon: Users,    label: 'Matches',       value: '15', trend: '12%' },
  { Icon: Bookmark, label: 'Saved',         value: '8',  trend: '8%'  },
] as const;

/* --- Reusable mini card pieces ----------------------------- */
function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: 'blue' | 'green' | 'purple';
}) {
  const styles = {
    blue:   'bg-[#EEF3FF] text-[#1B4FCA]',
    green:  'bg-[#DCFCE7] text-[#15803D]',
    purple: 'bg-[#F3E8FF] text-[#7E22CE]',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${styles[color]}`}
    >
      {children}
    </span>
  );
}

function Tag({
  children,
  color,
}: {
  children: React.ReactNode;
  color: 'blue' | 'green' | 'purple';
}) {
  const styles = {
    blue:   'bg-[#EEF3FF] text-[#1B4FCA]',
    green:  'text-[#15803D] font-semibold',
    purple: 'bg-[#F3E8FF] text-[#7E22CE]',
  };
  return (
    <span className={`mt-3 inline-block rounded-md px-2.5 py-1 text-[11px] font-medium ${styles[color]}`}>
      {children}
    </span>
  );
}

/* --- Trust strip -------------------------------------------- */
function TrustStrip({ variant }: { variant: 'mobile' | 'desktop' }) {
  const isMobile = variant === 'mobile';

  if (isMobile) {
    return (
      <div
        aria-label="Platform trust highlights"
        className="mt-7 flex items-center justify-between gap-2 rounded-[10px] border border-[#D9E1EF] bg-[#F8FAFC]/60 p-5 backdrop-blur-[5px]"
      >
        {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
          <Fragment key={label}>
            <div className="flex flex-1 flex-col items-center justify-center gap-2.5 text-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-[0.6px] border-[#D9E1EF] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
                <Icon className="h-[21px] w-[21px] text-[#2F66C8]" aria-hidden="true" />
              </div>
              <span className="font-sans text-[12px] font-normal leading-normal text-[#0F172A]">
                {label}
              </span>
            </div>
            {i < TRUST_ITEMS.length - 1 && (
              <div className="h-[30px] w-px shrink-0 bg-[#D9E1EF]" aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-label="Platform trust highlights"
      className="mt-9 inline-flex flex-nowrap items-center gap-6 rounded-md border border-[#D9E1EF] bg-[#F8FAFC]/60 px-8 py-4 backdrop-blur-sm"
    >
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#D9E1EF] bg-white">
            <Icon className="h-5 w-5 text-[#2F66C8]" aria-hidden="true" />
          </div>
          <span className="whitespace-nowrap font-sans text-[14px] font-normal leading-none text-[#0F172A]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}


/* ─── Main component ─────────────────────────────────────── */
export function HeroSection() {
  return (
    <>
      {/* =====================================================
          MOBILE HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#f4f7fd] lg:hidden">
        <div className="relative z-10 flex flex-col">

          {/* Column 1: Content */}
          <div className="px-5 pb-6 pt-10">

            {/* Eyebrow */}
            <span className="flex items-center justify-center bg-[#FFFFFF] border border-[#D9E1EF] rounded-md px-8 py-2">
              <p className="text-[14px] font-semibold uppercase text-[#2F66C8] font-sans">
                Welcome to Anchor Canada
              </p>
            </span>

            {/* Heading */}
            <h3 className="mt-3 leading-[1.12] text-[#0F172A] text-center">
              <span className="block text-[36px] font-regular leading-[56px] font-serif font-[400] text-[#0F172A]">Your Next</span>
              <span className="block">
                <span className="text-[52px] leading-[56px] font-serif font-[400] italic text-[#1B4FCA]">
                  Opportunities
                </span>
                <span
                  aria-hidden="true"
                  className="cursor-blink ml-0.5 inline-block h-[32px] w-[2px] rounded-sm bg-[#E8242B] align-middle"
                />
              </span>
              <span className="block text-[36px] font-regular leading-[56px] font-serif font-[400] text-[#0F172A]">Starts Here</span>
            </h3>

            {/* Body */}
            <p className="mt-4 text-[14px] leading-normal text-[#8C97AD] font-sans text-center">
              Whether you&apos;re searching for jobs, grants, training, housing support, or ways to
              create impact. Anchor helps you move forward with confidence
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-sm bg-[#2F66C8] px-7 text-[12px] text-[#FFFFFF]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-sm border border-[#D9E1EF] bg-[#EEF2F8] px-7 text-[12px] font-medium text-[#2F66C8] shadow-sm transition-colors hover:bg-neutral-50"
              >
                Explore First
                <Image src={compassIcon} alt="" width={14} height={14} className="shrink-0" />
              </Link>
            </div>

            <TrustStrip variant="mobile" />
          </div>

          {/* Column 2: Hero background, pinned to the bottom of the section */}
          <div className="flex items-end justify-center px-5" aria-hidden="true">
            <Image
              src={heroBg}
              alt=""
              width={560}
              height={560}
              className="w-full max-w-[420px] h-auto object-contain opacity-70"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          DESKTOP HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative hidden min-h-[calc(100vh-64px)] overflow-hidden bg-[#EFF4FF] lg:flex lg:items-center">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-10 px-10 py-16 xl:gap-16">

          {/* --- LEFT PANEL --------------------------------- */}
          <div>
            <span className="inline-block bg-[#FFFFFF] border border-[#D9E1EF] rounded-md px-8 py-2 ">
              <p className="text-[14px] font-semibold  leading-100% uppercase tracking-[0.2em] text-[#2F66C8] font-sans">
                Welcome to Anchor Canada
              </p>
            </span>

            <h1 className="mt-4 leading-[56px] text-[#0F172A] font-serif font-[400] text-[60px]">
              Your Next {''}
              <span className="text-[70px] font-bold italic text-[#2F66C8] font-serif leading-[73.57px]">
                Opportunities
              </span>
              <span
                aria-hidden="true"
                className="cursor-blink ml-1 inline-block h-[48px] w-[3px] rounded-sm bg-[#E8242B] align-middle xl:h-[54px]"
              />
              <span className="block text-[60px] text-[#0F172A] font-serif font-[400] leading-[56px]">Starts Here</span>
            </h1>

            <p className="mt-5 max-w-[688px] text-[16px] leading-100% text-[#8C97AD]">
              Whether you&apos;re searching for jobs, grants, training, housing support, or ways to
              create impact. Anchor helps you move forward with confidence
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-sm bg-[#2F66C8] px-7 text-[16px]  text-[#FFFFFF] "
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-sm border border-[#D9E1EF] bg-[#EEF2F8] px-7 text-[15px] font-medium text-[#2F66C8] shadow-sm transition-colors hover:bg-neutral-50"
              >
                Explore First
                <Image src={compassIcon} alt="" width={20} height={20} className="shrink-0" />
              </Link>
            </div>

            <TrustStrip variant="desktop" />
          </div>

          {/* --- RIGHT PANEL - floating cards --------------- */}
          <div className="relative h-[520px] w-full">

            {/* herobg.png - concentric ring decoration, centered */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <Image
                src={heroBg}
                alt=""
                width={560}
                height={560}
                className="h-full w-full object-contain opacity-70"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}