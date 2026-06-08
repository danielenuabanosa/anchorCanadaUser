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

export default function ResetPasswordSuccessMobileView() {
  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col items-center gap-10">

      {/* Hero illustration */}
      <div className="relative w-full overflow-hidden rounded-[10px]" style={{ height: '200px' }}>
        <Image src={confettiBg} alt="" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[140px] h-[136px]">
            <Image src={shieldSuccess} alt="Password updated" fill className="object-contain drop-shadow-xl" />
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-serif text-[48px] leading-[56px] text-[#0f172a]">You&apos;re Back In! 🎉</h1>
        <p className="text-sm text-[#8c97ad]">
          Your password has been updated and your Anchor account is secure again.
        </p>
      </div>

      {/* Checklist card */}
      <div className="w-full bg-white border border-[#d9e1ef] rounded-[20px] p-5 flex flex-col gap-5">
        <div className="inline-flex items-center gap-2 bg-[#eef2f8] rounded px-1.5 py-1 self-start">
          <svg className="h-3.5 w-3.5 text-[#5d6b86]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span className="text-xs text-[#5d6b86]">You can update your password anytime in settings.</span>
        </div>
        <div className="flex flex-col gap-4">
          {checklistItems.map(item => (
            <div key={item} className="flex items-center gap-4 h-6">
              <div className="bg-[#22c55e] rounded-full flex items-center justify-center p-1 shrink-0 size-5">
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-[#0f172a]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Green location card */}
      <div className="w-full flex items-center gap-4 bg-[#ecfdf5] border border-[#d1fae5] rounded-[10px] p-4">
        <div className="bg-[#d1fae5] rounded-full flex items-center justify-center p-3 shrink-0 size-12">
          <svg className="w-6 h-6 text-[#15803d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-[#15803d]">Signed in from Toronto, Ontario</span>
            <Image src={canadaFlag} alt="Canada" width={20} height={13} className="object-cover rounded-sm" />
          </div>
          <p className="text-xs text-[#44516a]">Your trusted devices remain connected.</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full">
        <Link
          href="/login"
          className="bg-[#2f66c8] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-white w-full hover:bg-[#2454a4] transition-colors"
        >
          Return to Anchor
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link
          href="/"
          className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-[#2f66c8] w-full hover:bg-[#f8fafc] transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
      </div>

      {/* Footer trust items */}
      <div className="flex items-center justify-center gap-4 text-xs text-[#8c97ad]">
        <span>Secure &amp; Encrypted</span>
        <span className="text-[#d9e1ef]">|</span>
        <span>Proudly Canadian</span>
        <span className="text-[#d9e1ef]">|</span>
        <span>Here for You</span>
      </div>
    </div>
  );
}
