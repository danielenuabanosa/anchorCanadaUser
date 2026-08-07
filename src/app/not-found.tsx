import Image from 'next/image';
import Link from 'next/link';
import type { StaticImageData } from 'next/image';
import anchorLogo from '@assets/icons/anchor-logo.png';
import notFoundImg from '@assets/images/not-found/404.png';
import decorativeImg from '@assets/images/not-found/404-2.png';
import houseIcon from '@assets/images/not-found/house.png';
import searchImg from '@assets/images/not-found/tracking.png';
import caseImg from '@assets/images/not-found/case.png';
import anchorImg from '@assets/images/not-found/cross.png';
import questionImg from '@assets/images/not-found/question-mark.png';
import linkIcon from '@assets/images/not-found/link.png';

type HelpfulLink = {
  href: string;
  line1: string;
  line2: string;
  description: string;
  image: StaticImageData;
  flip?: boolean;
};

const HELPFUL_LINKS: HelpfulLink[] = [
  {
    href: '/opportunities',
    line1: 'Manage',
    line2: 'Opportunities',
    description: 'Publish, edit, and track programs your organization offers.',
    image: searchImg,
    flip: true,
  },
  {
    href: '/applications',
    line1: 'Review',
    line2: 'Applications',
    description: 'See applicant submissions and move reviews forward.',
    image: caseImg,
  },
  {
    href: '/dashboard',
    line1: 'Back to',
    line2: 'Dashboard',
    description: 'Return to your provider home and key metrics.',
    image: anchorImg,
  },
  {
    href: '/team',
    line1: 'Provider',
    line2: 'Team',
    description: 'Invite teammates and manage roles for your organization.',
    image: questionImg,
  },
];

function HelpfulCard({ link, compact }: { link: HelpfulLink; compact?: boolean }) {
  return (
    <Link
      href={link.href}
      className="group relative overflow-hidden rounded-2xl border border-[#dbe3ef] bg-[#F8FAFC] shadow-[0_4px_16px_rgba(11,38,91,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(11,38,91,0.10)]"
    >
      <div className={`relative p-5 ${compact ? 'min-h-[200px]' : 'min-h-[260px]'}`}>
        <h2 className="font-instrument-serif text-[18px] font-normal text-[#0F172A]">{link.line1}</h2>
        <span
          className={`mt-1 font-instrument-serif italic leading-none text-[#2F66C8] ${
            compact ? 'text-[32px]' : 'text-[28px]'
          }`}
        >
          {link.line2}
        </span>
        <p
          className={`mt-2 text-[11px] leading-relaxed text-[#8C97AD] ${
            compact ? 'max-w-[55%]' : 'max-w-[160px]'
          }`}
        >
          {link.description}
        </p>
        <Image
          src={link.image}
          alt=""
          width={compact ? 180 : 160}
          height={compact ? 180 : 160}
          className={`pointer-events-none absolute bottom-0 right-0 h-auto object-contain object-bottom ${
            compact ? 'w-[44%]' : 'w-[52%]'
          } ${link.flip ? 'scale-x-[-1]' : ''}`}
        />
      </div>
    </Link>
  );
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eef3fc]">
      <section className="bg-white px-4 py-2 lg:bg-[#eef3fc] lg:px-6 lg:py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/dashboard" aria-label="Anchor Canada home">
            <Image src={anchorLogo} alt="Anchor Canada" height={46} className="h-[46px] w-auto" priority />
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#2F66C8] transition-colors hover:text-[#2558b0]"
          >
            Dashboard
          </Link>
        </div>
      </section>

      <div className="flex flex-1 flex-col overflow-hidden px-4 py-8 lg:px-10 lg:py-0">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
          <div className="flex flex-col items-center text-center lg:hidden">
            <div className="relative mb-8 flex w-full items-center justify-center">
              <Image
                src={notFoundImg}
                alt="404 Not Found"
                width={400}
                height={240}
                className="h-auto w-full max-w-[280px] object-contain"
                priority
              />
            </div>
            <h1 className="font-instrument-serif text-[48px] text-[#0F172A]">Page Not Found</h1>
            <p className="font-[400] text-[16px] text-[#8C97AD]">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <div className="mx-auto mb-12 mt-8 flex w-full max-w-[320px] flex-row gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#2F66C8] px-5 py-4 text-[14px] font-[400] text-white"
              >
                <Image src={houseIcon} alt="" width={16} height={16} className="inline-block" />
                Go to Dashboard
              </Link>
              <Link
                href="/applications"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-300 bg-transparent px-5 py-4 text-[14px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Review Applications
              </Link>
            </div>
            <div className="flex w-full items-end justify-center">
              <Image
                src={decorativeImg}
                alt=""
                width={300}
                height={180}
                className="h-auto w-full max-w-[280px] object-contain"
              />
            </div>
          </div>

          <div className="hidden min-h-[calc(100vh-90px)] flex-row items-end gap-0 lg:flex">
            <div className="flex w-[45%] shrink-0 flex-col justify-center pb-16">
              <Image
                src={notFoundImg}
                alt="404 Not Found"
                width={420}
                height={240}
                className="mb-6 h-auto w-full max-w-[380px] object-contain"
                priority
              />
              <h1 className="mb-3 font-instrument-serif text-[42px] font-normal leading-tight text-[#0F172A]">
                Page Not Found
              </h1>
              <p className="mb-8 max-w-[300px] text-[14px] leading-relaxed text-[#8C97AD]">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#2F66C8] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#2558b0]"
                >
                  <Image src={houseIcon} alt="" width={16} height={16} className="inline-block" />
                  Go to Dashboard
                </Link>
                <Link
                  href="/applications"
                  className="inline-flex items-center gap-2 rounded-sm border border-[#D9E1EF] bg-white px-6 py-3 text-[14px] font-medium text-[#0F172A] transition-colors hover:bg-[#eef3fc]"
                >
                  Review Applications
                </Link>
              </div>
            </div>
            <div className="flex w-[55%] items-end justify-end">
              <Image
                src={decorativeImg}
                alt=""
                width={680}
                height={460}
                className="h-auto w-full max-w-[620px] object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white px-4 py-14 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center lg:mb-14">
            <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
              <h3 className="font-instrument-serif text-[36px] font-normal text-[#0F172A] lg:text-[48px]">
                Here Are Some
              </h3>
              <div className="flex flex-row items-center gap-2">
                <h2 className="font-instrument-serif text-[48px] font-normal italic text-[#2F66C8] lg:text-[60px]">
                  Helpful Links
                </h2>
                <Image
                  src={linkIcon}
                  alt=""
                  width={40}
                  height={40}
                  className="inline-block h-[32px] w-[32px] lg:h-[40px] lg:w-[40px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:hidden">
            {HELPFUL_LINKS.map((link) => (
              <HelpfulCard key={link.href} link={link} compact />
            ))}
          </div>

          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-5">
            {HELPFUL_LINKS.map((link) => (
              <HelpfulCard key={link.href} link={link} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
