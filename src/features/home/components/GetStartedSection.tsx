import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import searchImg  from '@assets/images/search.png';
import buildImg   from '@assets/images/build.png';
import compassImg from '@assets/images/compass.png';
import shieldIcon from '@assets/icons/shield-check.png';
import folderIcon from '@assets/icons/folder.png'


/* - Card data ---------------- */
const CARDS = [
  {
    title:  'Find Opportunities',
    body:   'Discover jobs, grants, training and community support tailored to your journey.',
    cta:    'Continue',
    href:   '/onboarding',
    image:  searchImg,
    imgAlt: 'Magnifying glass illustration',
    /* how the image sits inside the card */
    imgClass: 'w-[220.48px] lg:w-[188.98px] h-[224.95px] lg:h-[262.45px]',
    imgWrapClass: 'bottom-[-28px] right-[-12px]',
  },
  {
    title:  'Publish Opportunities',
    body:   'Share opportunities and connect with the people who need them most.',
    cta:    'Continue',
    href:   '/onboarding',
    image:  buildImg,
    imgAlt: 'Building illustration',
    imgClass: 'w-[150px] lg:w-[165px] h-[261.4994812011719px] lg:h-[287px] ',
    imgWrapClass: 'bottom-[-32px] right-[-10px]',
  },
  
] as const;

/* - Component ---------------- */
export function GetStartedSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">

        {/* -- Header ------------ */}
        <div className="mb-12 text-center">
          <h2 className="text-[36px] font-normal leading-[56px] text-[#0F172A] lg:text-[48px] font-serif">
            How Would You Like To
          </h2>
          
          <span className="mt-0.5 flex text-center item-center justify-center leading-[56px] font-serif font-[400] text-[48px] lg:text-[60px] text-[#2F66C8]">
             Get Started{' '}
             <Image src={folderIcon} alt="Folder icon" width={40} height={40} className="ml-1 w-[32.2px] h-[32.2px] lg:w-[40px] lg:h-[40px] mt-[14px] lg:mt-[11px]"/>
          </span>
          <p className="mt-3 text-[14px] lg:text-[16px] text-[#8C97AD]  font-sans font-[400] leading-[100%]">
            You can switch paths anytime.
          </p>
        </div>

        {/* -- Cards grid ------------ */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 sm:h-[480px]">
          {CARDS.map(({ title, body, cta, href, image, imgAlt, imgClass, imgWrapClass }) => (
            <div
              key={title}
              className="relative flex min-h-[480px] flex-col overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-[#F8FAFC] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.06)] lg:min-h-[300px]"
            >
              {/* Text content */}
              <div className="relative z-10 max-w-[674px]">
                <h2
                  className="text-[48px] font-[400] italic leading-[56px] text-[#1B4FCA] lg:text-[48px] font-serif"
                >
                  {title}
                </h2>
                <p className="mt-3 text-[14px] lg:text-[16px] leading-[100%] text-[#8C97AD] lg:text-[16px]">
                  {body}
                </p>
                <Link
                  href={href}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-sm border border-[#D9E1EF] bg-[#FFFFF] px-4 py-2 text-[12px] font-normal text-[#2F66C8] "
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

        {/* -- Footer trust strip (mobile) -------- */}
        <div className="mx-auto mt-10 w-full h-[80px] rounded-[10px] bg-[#EFF4FF] p-5 lg:hidden">
          <Link href="/privacy" className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src={shieldIcon}
                alt=""
                width={40}
                height={40}
                className="shrink-0 opacity-80"
              />
              <div className="font-sans text-[14px] font-normal leading-normal text-[#44516A]">
                <p className="mb-0">Your data is safe with us.</p>
                <p>We never share your information</p>
              </div>
            </div>
            <ChevronRight className="h-6 w-6 shrink-0 text-[#2F66C8]" aria-hidden="true" />
          </Link>
        </div>

        {/* -- Footer trust strip (desktop) -------- */}
        <div className="mx-auto mt-10 hidden w-full h-[80px] items-center justify-between gap-6 rounded-sm bg-[#EFF4FF] px-20 py-10 lg:flex">
          <div className="flex items-center gap-2 text-neutral-400">
            <Image
              src={shieldIcon}
              alt=""
              width={24}
              height={24}
              className="shrink-0 opacity-80 w-[24px] h-[24px]"
            />
            <span className="font-sans text-[16px] font-normal leading-none text-[#1B4FCA]">
              Your data is safe with us. We never share your information
            </span>
          </div>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1 font-sans text-[16px] font-medium leading-none text-[#2F66C8]"
          >
            Learn more about our Privacy Policy
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}