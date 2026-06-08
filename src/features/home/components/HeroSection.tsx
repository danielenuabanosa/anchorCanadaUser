import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Bookmark,
  Briefcase,
  Leaf,
  BookOpen,
  Send,
  Users,
  ChevronDown,
} from 'lucide-react';
import heroBg   from '@assets/images/herobg.png';
import validIcon from '@assets/icons/valid.png';
import compassIcon from '@assets/icons/compass.png';

/* ─── Static data ────────────────────────────────────────── */
const TRUST_ITEMS = ['Verified Opportunities', 'Free to Use', 'Built in Canada'] as const;

const SNAPSHOT_STATS = [
  { Icon: Send,     label: 'Applications', value: '24', trend: '16%' },
  { Icon: Users,    label: 'Matches',       value: '15', trend: '12%' },
  { Icon: Bookmark, label: 'Saved',         value: '8',  trend: '8%'  },
] as const;

/* ─── Reusable mini card pieces ─────────────────────────── */
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




/* ─── Main component ─────────────────────────────────────── */
export function HeroSection() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          MOBILE HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#EFF4FF] lg:hidden">
        <div className="px-5 pb-6 pt-10">

          {/* Eyebrow */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B4FCA]">
            Welcome to Anchor Canada
          </p>

          {/* Heading */}
          <h1 className="mt-3 leading-[1.12] text-[#0F172A]">
            <span className="block text-[30px] font-bold">Your Next</span>
            <span className="block">
              <span
                style={{ fontFamily: 'var(--font-playfair)' }}
                className="text-[32px] font-bold italic text-[#1B4FCA]"
              >
                Opportunities
              </span>
              <span
                aria-hidden="true"
                className="cursor-blink ml-0.5 inline-block h-[32px] w-[2px] rounded-sm bg-[#E8242B] align-middle"
              />
            </span>
            <span className="block text-[30px] font-bold">Starts Here</span>
          </h1>

          {/* Body */}
          <p className="mt-4 text-[13px] leading-relaxed text-[#8C97AD]">
            Whether you&apos;re searching for jobs, grants, training, housing support, or ways to
            create impact. Anchor helps you move forward with confidence
          </p>

          {/* CTAs */}
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1B3570] px-5 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#15295B]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 text-[13px] font-medium text-[#0F172A] transition-colors hover:bg-neutral-50"
            >
              <Image src={compassIcon} alt="" width={18} height={18} className="shrink-0" />
              Explore First
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-7 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item}
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-neutral-100 bg-white px-3 py-2 text-[10px] font-medium text-[#0F172A] shadow-sm"
              >
                <Image src={validIcon} alt="" width={13} height={13} className="shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Cards peek (mobile) */}
        <div className="relative mt-4 h-[230px] overflow-hidden px-4">
          {/* Fade-out gradient at bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#f4f7fd] to-transparent" />

          {/* JOB card */}
          <div className="absolute left-4 top-4 w-[172px] rounded-2xl border border-neutral-100 bg-white p-3.5 shadow-md">
            <Badge color="blue">
              <Briefcase className="h-2.5 w-2.5" /> JOB
            </Badge>
            <p className="mt-2 text-[12px] font-bold leading-snug text-neutral-900">
              Customer Support Specialist
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-[10px] text-neutral-400">
              <MapPin className="h-2.5 w-2.5 shrink-0" /> Toronto, ON
            </p>
            <span className="mt-2 inline-block rounded-md bg-[#EEF3FF] px-2 py-0.5 text-[9px] font-medium text-[#1B4FCA]">
              Full-time
            </span>
          </div>

          {/* GRANT card */}
          <div className="absolute right-4 top-12 w-[172px] rounded-2xl border border-neutral-100 bg-white p-3.5 shadow-md">
            <div className="flex items-center justify-between">
              <Badge color="green">
                <Leaf className="h-2.5 w-2.5" /> GRANT
              </Badge>
              <Bookmark className="h-3 w-3 text-neutral-300" />
            </div>
            <p className="mt-2 text-[12px] font-bold leading-snug text-neutral-900">
              Newcomer Entrepreneur Fund
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-[10px] text-neutral-400">
              <MapPin className="h-2.5 w-2.5 shrink-0" /> Canada-wide
            </p>
            <p className="mt-2 text-[11px] font-semibold text-[#15803D]">Up to $10,000</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DESKTOP HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative hidden min-h-[calc(100vh-64px)] overflow-hidden bg-[#EFF4FF] lg:flex lg:items-center">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-10 px-10 py-16 xl:gap-16">

          {/* ─── LEFT PANEL ─────────────────────────────── */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B4FCA]">
              Welcome to Anchor Canada
            </p>

            <h1 className="mt-4 leading-[1.1] text-[#0F172A]">
              <span className="block text-[46px] font-bold xl:text-[52px]">Your Next</span>
              <span className="block">
                <span
                  style={{ fontFamily: 'var(--font-playfair)' }}
                  className="text-[48px] font-bold italic text-[#1B4FCA] xl:text-[54px]"
                >
                  Opportunities
                </span>
                <span
                  aria-hidden="true"
                  className="cursor-blink ml-1 inline-block h-[48px] w-[3px] rounded-sm bg-[#E8242B] align-middle xl:h-[54px]"
                />
              </span>
              <span className="block text-[46px] font-bold xl:text-[52px]">Starts Here</span>
            </h1>

            <p className="mt-5 max-w-[430px] text-[15px] leading-relaxed text-[#8C97AD]">
              Whether you&apos;re searching for jobs, grants, training, housing support, or ways to
              create impact. Anchor helps you move forward with confidence
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#1B3570] px-7 text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-[#15295B]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-7 text-[15px] font-medium text-[#0F172A] shadow-sm transition-colors hover:bg-neutral-50"
              >
                <Image src={compassIcon} alt="" width={20} height={20} className="shrink-0" />
                Explore First
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-neutral-100 bg-white px-4 py-2.5 text-[13px] font-medium text-[#0F172A] shadow-sm"
                >
                  <Image src={validIcon} alt="" width={16} height={16} className="shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT PANEL — floating cards ───────────── */}
          <div className="relative h-[520px] w-full">

            {/* herobg.png — concentric ring decoration, centered */}
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
