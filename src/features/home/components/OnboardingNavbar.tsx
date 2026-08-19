'use client';

import Image from 'next/image';
import Link from 'next/link';
import anchorLogoFull from '@assets/icons/anchor-logo-full.png';
import questionIcon from '@assets/icons/question-mark.png';
import { LANDING_URL } from '@/shared/constants';
import { useHelpCenterStore } from '@/store/helpCenterStore';

interface OnboardingNavbarProps {
  onHelpClick?: () => void;
  showSignIn?: boolean;
}

export function OnboardingNavbar({ onHelpClick, showSignIn = false }: OnboardingNavbarProps = {}) {
  const openHelpCenter = useHelpCenterStore((s) => s.open);

  function handleHelpClick() {
    if (onHelpClick) {
      onHelpClick();
      return;
    }
    openHelpCenter();
  }

  return (
    <header className="relative z-10 border-b border-[rgba(217,225,239,0.8)] bg-white md:sticky md:top-0 md:z-50 md:backdrop-blur-[5px]">
      <div className="mx-auto flex max-w-[1728px] items-center justify-between px-5 py-5 md:px-10 md:py-10">
        <a href={LANDING_URL} aria-label="Anchor Canada home">
          <Image
            src={anchorLogoFull}
            alt="Anchor Canada"
            width={153}
            height={50}
            priority
            style={{ height: '50px', width: 'auto' }}
          />
        </a>

        <div className="flex items-center gap-5">
          <Link
            href="/help"
            onClick={(event) => {
              event.preventDefault();
              handleHelpClick();
            }}
            className="flex items-center gap-5 focus:outline-none"
            aria-label="Open help center"
          >
            <span className="font-dm-sans text-[16px] text-[#44516A]">Need Help?</span>
            <Image
              src={questionIcon}
              alt=""
              width={21}
              height={21}
              className="opacity-80 transition-opacity hover:opacity-100"
            />
          </Link>

          {showSignIn && (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-sm border border-[#D9E1EF] bg-white px-5 font-dm-sans text-[14px] font-medium text-[#2F66C8] transition-colors hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F66C8]/40"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
