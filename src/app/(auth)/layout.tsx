import type { Metadata } from 'next';
import Image from 'next/image';
import anchorLogoFull from '@assets/icons/anchor-logo-full.png';
import questionIcon from '@assets/icons/question-mark.png';
import { LANDING_URL } from '@/shared/constants';

export const metadata: Metadata = {
  title: { template: '%s | Provider Portal', default: 'Provider Portal' },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[rgba(217,225,239,0.8)] bg-white/90 px-5 py-5 backdrop-blur-[5px] md:px-10 md:py-10">
        <a href={LANDING_URL} aria-label="Anchor Canada home">
          <Image
            src={anchorLogoFull}
            alt="Anchor Canada"
            width={153}
            height={50}
            priority
            loading="eager"
            style={{ height: '50px', width: 'auto' }}
          />
        </a>
        <div className="flex items-center gap-5">
          <span className="font-dm-sans text-[16px] text-[#44516A]">Need Help?</span>
          <Image
            src={questionIcon}
            alt=""
            width={21}
            height={21}
            className="opacity-80 transition-opacity hover:opacity-100"
          />
        </div>
      </header>
      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6 pb-[160px] pt-[100px] md:pt-[170px]">
        {children}
      </main>
    </div>
  );
}
