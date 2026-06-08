import Image from 'next/image';
import Link from 'next/link';
import anchorLogo    from '@assets/icons/anchor-logo.png';
import questionIcon  from '@assets/icons/question-mark.png';

interface OnboardingNavbarProps {
  onHelpClick?: () => void;
}

export function OnboardingNavbar({ onHelpClick }: OnboardingNavbarProps = {}) {
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

        {/* Help */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-neutral-500">Need Help?</span>
          <button
            type="button"
            onClick={onHelpClick}
            className="focus:outline-none"
            aria-label="Why we ask for this information"
          >
            <Image
              src={questionIcon}
              alt="Help"
              width={28}
              height={28}
              className="opacity-60 transition-opacity hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
