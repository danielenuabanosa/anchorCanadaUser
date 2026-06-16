import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import anchorLogo from '@assets/icons/anchor-logo.png';

export const metadata: Metadata = {
  title: { template: '%s | Provider Portal', default: 'Provider Portal' },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[rgba(217,225,239,0.8)] bg-white/80 backdrop-blur-md px-10 py-5">
        <Link href="https://anchorcanada.ca">
          <Image src={anchorLogo} alt="Anchor Canada" height={50} className="h-[50px] w-auto" />
        </Link>
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <span>Need Help?</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </div>
      </header>
      {/* Main content */}
      <main className="flex flex-1 items-center justify-center pt-[130px] pb-[160px] px-6">
        {children}
      </main>
    </div>
  );
}
