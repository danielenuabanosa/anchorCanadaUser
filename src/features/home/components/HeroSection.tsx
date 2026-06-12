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

/* --- Static data ------------------------------------------ */
const TRUST_ITEMS = ['Verified Opportunities', 'Free to Use', 'Built in Canada'] as const;

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

/* ─── Avatar circle ──────────────────────────────────────── */
function Avatar({ src, size = 66 }: { src: string; size?: number }) {
  return (
    <div
      className="overflow-hidden rounded-full border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
      style={{ width: size, height: size }}
    >
      <Image src={src} alt="" width={size} height={size} className="object-cover w-full h-full" />
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

      {/* =====================================================
          DESKTOP HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative hidden min-h-[calc(100vh-64px)] overflow-hidden bg-[#f4f7fd] lg:flex lg:items-center">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-10 px-10 py-16 xl:gap-16">

          {/* --- LEFT PANEL --------------------------------- */}
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

            {/* Soft lavender blob — center */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dde6ff]/55 blur-sm"
            />

            {/* ── JOB CARD — top left ── */}
            <div className="absolute left-2 top-[28px] w-[208px] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <Badge color="blue">
                <Briefcase className="h-3 w-3" /> JOB
              </Badge>
              <p className="mt-3 text-[14px] font-bold leading-snug text-neutral-900">
                Customer Support Specialist
              </p>
              <div className="mt-2 flex items-center gap-1 text-[12px] text-neutral-400">
                <MapPin className="h-3 w-3 shrink-0" /> Toronto, ON
              </div>
              <Tag color="blue">Full-time</Tag>
            </div>

            {/* ── GRANT CARD — top right ── */}
            <div className="absolute right-2 top-[42px] w-[222px] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <Badge color="green">
                  <Leaf className="h-3 w-3" /> GRANT
                </Badge>
                <Bookmark className="h-4 w-4 text-neutral-300" />
              </div>
              <p className="mt-3 text-[14px] font-bold leading-snug text-neutral-900">
                Newcomer Entrepreneur Fund
              </p>
              <div className="mt-2 flex items-center gap-1 text-[12px] text-neutral-400">
                <MapPin className="h-3 w-3 shrink-0" /> Canada-wide
              </div>
              <Tag color="green">Up to $10,000</Tag>
            </div>

            {/* ── TRAINING CARD — bottom left ── */}
            <div className="absolute bottom-[55px] left-0 w-[202px] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <Badge color="purple">
                  <BookOpen className="h-3 w-3" /> TRAINING
                </Badge>
                <Bookmark className="h-4 w-4 text-neutral-300" />
              </div>
              <p className="mt-3 text-[14px] font-bold leading-snug text-neutral-900">
                Digital Skills Programs
              </p>
              <div className="mt-2 flex items-center gap-1 text-[12px] text-neutral-400">
                <MapPin className="h-3 w-3 shrink-0" /> Online
              </div>
              <Tag color="purple">Self paced</Tag>
            </div>

            {/* ── SNAPSHOT CARD — bottom right ── */}
            <div className="absolute bottom-[42px] right-0 w-[262px] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-neutral-900">Your Snapshot</span>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-500"
                >
                  This Week <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1">
                {SNAPSHOT_STATS.map(({ Icon, label, value, trend }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9]">
                      <Icon className="h-4 w-4 text-[#64748B]" />
                    </div>
                    <span className="mt-0.5 text-[10px] text-neutral-400">{label}</span>
                    <span className="text-[20px] font-bold leading-tight text-neutral-900">{value}</span>
                    <span className="text-[10px] font-medium text-[#16a34a]">↑ {trend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── AVATAR — top center (woman) ── */}
            <div className="absolute top-[-4px]" style={{ left: 'calc(50% - 8px)' }}>
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=130&h=130&fit=crop&crop=faces"
                size={64}
              />
            </div>

            {/* ── AVATAR — left middle (man) ── */}
            <div className="absolute" style={{ top: 238, left: -32 }}>
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=130&h=130&fit=crop&crop=faces"
                size={68}
              />
            </div>

            {/* ── AVATAR — right middle (woman) ── */}
            <div className="absolute" style={{ top: 210, right: -28 }}>
              <Avatar
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=130&h=130&fit=crop&crop=faces"
                size={68}
              />
            </div>

            {/* ── AVATAR — bottom center (man with cap) ── */}
            <div className="absolute bottom-[6px]" style={{ left: 'calc(50% - 6px)' }}>
              <Avatar
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=130&h=130&fit=crop&crop=faces"
                size={64}
              />
            </div>

            {/* ── Scattered blue dots ── */}
            <div aria-hidden="true" className="pointer-events-none">
              <span className="absolute right-[78px] top-[7px]  h-2.5 w-2.5 rounded-full bg-[#1B4FCA]  block" />
              <span className="absolute bottom-[155px] left-[-18px] h-2 w-2 rounded-full bg-[#1B4FCA] block" />
              <span className="absolute bottom-[65px] left-[165px] h-2 w-2 rounded-full bg-[#1B4FCA] block" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}