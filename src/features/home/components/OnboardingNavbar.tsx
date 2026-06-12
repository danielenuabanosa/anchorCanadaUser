import Image from 'next/image';
import Link from 'next/link';
import anchorLogo from '@assets/icons/anchor-logo.png';
import questionIcon from '@assets/icons/question-mark.png';

interface OnboardingNavbarProps {
  onHelpClick?: () => void;
}

export function OnboardingNavbar({ onHelpClick }: OnboardingNavbarProps = {}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D9E1EF]/80 bg-white/95 backdrop-blur-[5px]">
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
          <span className="text-[16px] text-[#44516A]">Need Help?</span>
          <button
            type="button"
            onClick={onHelpClick}
            className="focus:outline-none font-sans"
            aria-label="Why we ask for this information"
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
