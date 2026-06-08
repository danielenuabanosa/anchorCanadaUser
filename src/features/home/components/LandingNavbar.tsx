import Image from 'next/image';
import Link from 'next/link';
import anchorLogo from '@assets/icons/anchor-logo.png';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" aria-label="Anchor Canada home">
          <Image
            src={anchorLogo}
            alt="Anchor Canada"
            height={44}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-neutral-400 sm:block">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[#1B4FCA] px-5 text-sm font-medium text-[#1B4FCA] transition-colors hover:bg-[#EEF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4FCA]/40"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}
