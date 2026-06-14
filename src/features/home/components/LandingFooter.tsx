import Link from 'next/link';
import Image from 'next/image';
import anchorLogoFull from '@assets/icons/anchor-logo-full.png';
import circleWatermark from '@assets/images/circle.png';
import facebookIcon from '@assets/icons/facebook.png';
import linkedinIcon from '@assets/icons/linkedin.png';
import xIcon from '@assets/icons/x.png';
import instagramIcon from '@assets/icons/instagram.png';

const NAV = [
  {
    heading: 'Opportunities',
    links: [
      { label: 'Jobs', href: '/opportunities?category=jobs' },
      { label: 'Grants', href: '/opportunities?category=grants' },
      { label: 'Volunteer', href: '/opportunities?category=volunteer' },
      { label: 'Internships', href: '/opportunities?category=internships' },
      { label: 'Browse All', href: '/opportunities' },
    ],
  },
  {
    heading: 'For Providers',
    links: [
      { label: 'Become a Provider', href: '/register?role=business' },
      { label: 'Provider Resources', href: '/providers' },
      { label: 'How it Works', href: '/#how-it-works' },
      { label: 'Partner With Us', href: '/contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
] as const;

const SOCIALS = [
  { src: facebookIcon, alt: 'Facebook', href: 'https://facebook.com' },
  { src: linkedinIcon, alt: 'LinkedIn', href: 'https://linkedin.com' },
  { src: xIcon, alt: 'Twitter / X', href: 'https://x.com' },
  { src: instagramIcon, alt: 'Instagram', href: 'https://instagram.com' },
] as const;

function FooterMobile() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#BCD1FF] to-[#EFF4FF] lg:hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={circleWatermark}
          alt=""
          width={500}
          height={500}
          className="absolute -right-8 bottom-0 opacity-20"
        />
      </div>

      <div className="relative px-5 pb-8 pt-10">
        <Link href="/" className="inline-block">
          <Image
            src={anchorLogoFull}
            alt="Anchor Canada"
            width={150}
            height={50}
            className="h-auto w-[150px]"
            priority={false}
          />
        </Link>

        <p className="mt-4 max-w-[320px] font-sans text-[12px] leading-relaxed text-[#44516A]">
          Connecting immigrants with verified opportunities that cut across jobs, growth, volunteer
          and more within Canada.
        </p>

        <div className="mt-5 flex items-center gap-4">
          {SOCIALS.map((social) => (
            <Link
              key={social.alt}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.alt}
            >
              <Image
                src={social.src}
                alt={social.alt}
                width={25}
                height={25}
                className="h-[25px] w-[25px] opacity-80 transition-opacity hover:opacity-100"
              />
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-8 border-t border-[#C4D4F0] pt-8">
          {NAV.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-2 font-serif text-[26px] font-normal leading-[40px] text-[#0F172A]">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[16px] text-[#44516A] transition-colors hover:text-[#0F172A]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[#C4D4F0] pt-5">
          <p className="text-center font-sans text-[11px] text-[#8C97AD]">
            &copy; 2026 Anchor Canada. All Rights Reserved.
          </p>
          <div className="mt-3 flex items-center justify-center gap-5">
            <Link
              href="/privacy"
              className="font-sans text-[11px] text-[#8C97AD] transition-colors hover:text-[#44516A]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-[11px] text-[#8C97AD] transition-colors hover:text-[#44516A]"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="font-sans text-[11px] text-[#8C97AD] transition-colors hover:text-[#44516A]"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterDesktop() {
  return (
    <footer className="relative hidden overflow-hidden bg-gradient-to-r from-[#BCD1FF] to-[#EFF4FF] lg:block">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={circleWatermark}
          alt=""
          width={850}
          height={850}
          className="absolute right-[-50px] top-0 h-[850px] w-[850px] opacity-[0.23]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-[260px_1fr] gap-16 py-20">
          <div>
            <Link href="/">
              <Image
                src={anchorLogoFull}
                alt="Anchor Canada"
                width={180}
                height={60}
                className="h-auto w-[180px]"
                priority={false}
              />
            </Link>
            <p className="mt-5 max-w-[260px] font-sans text-[12px] leading-relaxed text-[#44516A]">
              Connecting immigrants with verified opportunities that cut across jobs, growth, and
              volunteer and more within Canada.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map((social) => (
                <Link
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.alt}
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={20}
                    height={20}
                    className="h-5 w-5 opacity-80 transition-opacity hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-end gap-12 xl:gap-16">
            {NAV.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-2 font-serif text-[24px] font-normal leading-normal text-[#0F172A]">
                  {col.heading}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-[16px] text-[#44516A] transition-colors hover:text-[#0F172A]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#D9E1EF] py-6">
          <p className="font-sans text-[16px] font-normal leading-none text-[#8C97AD]">
            &copy; 2026 Anchor Canada. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="font-sans text-[13px] text-[#8C97AD] transition-colors hover:text-[#44516A]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-[13px] text-[#8C97AD] transition-colors hover:text-[#44516A]"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="font-sans text-[13px] text-[#8C97AD] transition-colors hover:text-[#44516A]"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingFooter() {
  return (
    <>
      <FooterMobile />
      <FooterDesktop />
    </>
  );
}
