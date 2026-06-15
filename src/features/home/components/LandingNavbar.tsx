import Image from 'next/image';
import Link from 'next/link';
import anchorLogo from '@assets/icons/anchor-logo.png';
import questionIcon from '@assets/icons/question-mark.png';

export function LandingNavbar() {
  return (
    <header className="relative z-10 border-b border-[#D9E1EF]/80 bg-white md:sticky md:top-0 md:z-50 md:backdrop-blur-[5px]">
      <div className="mx-auto flex max-w-[1728px] items-center justify-between px-5 py-6 md:px-10 md:py-10">
        <Link href="/" aria-label="Anchor Canada home">
          <Image
            src={anchorLogo}
            alt="Anchor Canada"
            height={50}
            priority
            className="h-[50px] w-auto"
          />
        </Link>

        <div className="flex items-center gap-5">
          <span className="font-sans text-[16px] text-[#44516A]">Need Help?</span>
          <button
            type="button"
            className="font-sans focus:outline-none"
            aria-label="Get help"
          >
            <Image
              src={questionIcon}
              alt="Help"
              width={21}
              height={21}
              className="opacity-80 transition-opacity hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </header>
  );
}