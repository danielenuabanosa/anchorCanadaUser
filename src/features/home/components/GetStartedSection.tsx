import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import searchImg  from '@assets/images/search.png';
import buildImg   from '@assets/images/build.png';
import compassImg from '@assets/images/compass.png';
import shieldIcon from '@assets/icons/shield-check.png';

/* ─── Card data ──────────────────────────────────────────── */
const CARDS = [
  {
    title:  'Find Opportunities',
    body:   'Discover jobs, grants, training and community support tailored to your journey.',
    cta:    'Continue',
    href:   '/register',
    image:  searchImg,
    imgAlt: 'Magnifying glass illustration',
    /* how the image sits inside the card */
    imgClass: 'w-[190px] lg:w-[210px]',
    imgWrapClass: 'bottom-[-28px] right-[-12px]',
  },
  {
    title:  'Publish Opportunities',
    body:   'Share opportunities and connect with the people who need them most.',
    cta:    'Continue',
    href:   '/register?role=business',
    image:  buildImg,
    imgAlt: 'Building illustration',
    imgClass: 'w-[150px] lg:w-[165px]',
    imgWrapClass: 'bottom-[-32px] right-[-10px]',
  },
  {
    title:  'Explore First',
    body:   'Browse opportunities, stories, and resources before creating an account.',
    cta:    'Explore',
    href:   '/opportunities',
    image:  compassImg,
    imgAlt: 'Compass illustration',
    imgClass: 'w-[170px] lg:w-[188px]',
    imgWrapClass: 'bottom-[-36px] right-[-14px]',
  },
] as const;

/* ─── Component ──────────────────────────────────────────── */
export function GetStartedSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ──────────────────────────────────── */}
        <div className="mb-12 text-center">
          <h2 className="text-[26px] font-medium leading-snug text-[#0F172A] lg:text-[32px]">
            How Would You Like To
          </h2>
          <h2 className="mt-0.5 leading-snug">
            <span
              style={{ fontFamily: 'var(--font-playfair)' }}
              className="text-[26px] font-bold italic text-[#1B4FCA] lg:text-[32px]"
            >
              Get Started?
            </span>
            <span className="ml-2 text-[26px] lg:text-[30px]" aria-hidden="true">🚩</span>
          </h2>
          <p className="mt-3 text-[13px] text-neutral-400 lg:text-[14px]">
            You can switch paths anytime.
          </p>
        </div>

        {/* ── Cards grid ──────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {CARDS.map(({ title, body, cta, href, image, imgAlt, imgClass, imgWrapClass }) => (
            <div
              key={title}
              className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-neutral-100 bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.06)] lg:min-h-[300px]"
            >
              {/* Text content */}
              <div className="relative z-10 max-w-[58%]">
                <h3
                  style={{ fontFamily: 'var(--font-playfair)' }}
                  className="text-[20px] font-bold italic leading-snug text-[#1B4FCA] lg:text-[22px]"
                >
                  {title}
                </h3>
                <p className="mt-3 text-[12px] leading-relaxed text-neutral-400 lg:text-[13px]">
                  {body}
                </p>
                <Link
                  href={href}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-[12px] font-medium text-[#0F172A] shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4FCA]/30"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Overflowing illustration */}
              <div
                className={`pointer-events-none absolute z-0 select-none ${imgWrapClass}`}
                aria-hidden="true"
              >
                <Image
                  src={image}
                  alt={imgAlt}
                  className={`${imgClass} h-auto object-contain drop-shadow-md`}
                  priority={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer trust strip ──────────────────────── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 sm:flex-row">
          <div className="flex items-center gap-2 text-[12px] text-neutral-400 lg:text-[13px]">
            <Image
              src={shieldIcon}
              alt=""
              width={18}
              height={18}
              className="shrink-0 opacity-80"
            />
            Your data is safe with us. We never share your information
          </div>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#1B4FCA] transition-opacity hover:opacity-75 lg:text-[13px]"
          >
            Learn more about our Privacy Policy
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
