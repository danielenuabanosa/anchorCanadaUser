import Image from 'next/image';
import Link from 'next/link';
import anchorLogo from '@assets/icons/anchor-logo.png';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D9E1EF]/80 bg-white/90 backdrop-blur-[5px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-10">
        {/* Logo */}
        <Link href="/" aria-label="Anchor Canada home">
          <Image
            src={anchorLogo}
            alt="Anchor Canada"
            height={50}
            priority
            className="h-[42px] w-auto lg:h-[50px]"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <span className="hidden text-[16px] font-normal text-[#0F172A] font-sans lg:inline-block">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-[#EEF2F8] px-5 py-3 text-[14px] font-normal text-[#2F66C8] font-sans transition-colors hover:bg-[#E2E8F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4FCA]/40 lg:text-[16px]"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}