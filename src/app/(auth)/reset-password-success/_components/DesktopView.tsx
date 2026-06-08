'use client';

import Image from 'next/image';
import Link from 'next/link';

import canadaFlag from '@/../assets/icons/canada-flag.png';
import confettiBg from '@assets/images/valid-bg.png';
import shieldSuccess from '@/../assets/images/rpwds-shield-3d.png';

const checklistItems = [
  'Password updated successfully',
  'Previous recovery link has expired',
  'Account protection is restored',
  'Personalized access is re-enabled',
];

const footerItems = [
  {
    label: 'Secure & Encrypted',
    desc: 'Your information is encrypted and kept safe.',
    icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    label: 'Proudly Canadian',
    desc: 'Built in Canada for people across the country.',
    icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    label: 'Here for You',
    desc: 'Our support team is always ready to help.',
    icon: <svg className="w-[34px] h-[34px] text-[#2f66c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
];

export default function ResetPasswordSuccessDesktopView() {
  return (
    <div className="w-full max-w-[886px] mx-auto flex flex-col items-center gap-10">

      {/* Hero illustration */}
      <div className="relative w-full overflow-hidden" style={{ height: '270px' }}>
        <Image src={confettiBg} alt="" fill className="object-cover object-center" priority />
        {/* 3D green shield centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[192px] h-[187px]">
            <Image src={shieldSuccess} alt="Password updated" fill className="object-contain drop-shadow-xl" />
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-serif text-[60px] leading-[56px] text-[#0f172a]">You&apos;re Back In! 🎉</h1>
        <p className="text-base text-[#8c97ad] max-w-[480px]">
          Your password has been updated and your Anchor account is secure again.
        </p>
      </div>

      {/* Main checklist card */}
      <div className="w-full bg-white border border-[#d9e1ef] rounded-[20px] p-5 flex flex-col gap-5">
        {/* Lock badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#eef2f8] rounded px-1.5 py-1 self-start">
          <svg className="h-4 w-4 text-[#5d6b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span className="text-sm text-[#5d6b86]">You can update your password anytime in settings.</span>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-4">
          {checklistItems.map(item => (
            <div key={item} className="flex items-center gap-5 h-6">
              <div className="bg-[#22c55e] rounded-full flex items-center justify-center p-1.5 shrink-0 size-6">
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-base font-medium text-[#0f172a]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Green location card */}
      <div className="w-full flex items-center gap-5 bg-[#ecfdf5] border border-[#d1fae5] rounded-[10px] p-5">
        <div className="bg-[#d1fae5] rounded-[34px] flex items-center justify-center p-[17px] shrink-0 size-[68px]">
          <svg className="w-[34px] h-[34px] text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg text-[#15803d]">Signed in from Toronto, Ontario</span>
            <Image src={canadaFlag} alt="Canada" width={24} height={15} className="object-cover rounded-sm" />
          </div>
          <p className="text-base text-[#44516a]">Your trusted devices remain connected.</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-[#2f66c8] hover:bg-[#f8fafc] transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
        <Link
          href="/login"
          className="bg-[#2f66c8] rounded-[6px] flex items-center gap-2.5 px-6 py-4 text-base text-white hover:bg-[#2454a4] transition-colors"
        >
          Return to Anchor
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Footer bar */}
      <div className="border-t border-[#eef2f8] flex items-center gap-10 py-10 w-full">
        {footerItems.map((item, i) => (
          <div key={item.label} className="flex items-center gap-10 flex-1">
            <div className="flex gap-5 items-center">
              <div className="bg-[#eff4ff] rounded-[34px] flex items-center justify-center p-[17px] shrink-0 size-[68px]">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-base text-[#0f172a]">{item.label}</span>
                <span className="text-sm text-[#44516a]">{item.desc}</span>
              </div>
            </div>
            {i < footerItems.length - 1 && <div className="h-[70px] w-px bg-[#d9e1ef]" />}
          </div>
        ))}
      </div>
    </div>
  );
}
