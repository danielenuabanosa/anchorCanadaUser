import Image from 'next/image';
import { Lightbulb } from 'lucide-react';

import shieldValidIcon from '@assets/icons/shield-valid.png';
import mail3Icon from '@assets/icons/mail3.png';
import boxIcon from '@assets/icons/box.png';
import { ProfileSummary } from '@/shared/components/onboarding/ProfileSummary';

const NEXT_UP_ITEMS = [
  {
    icon: mail3Icon,
    title: 'Email Verification',
    description: 'Verify your email to activate your account',
  },
  {
    icon: boxIcon,
    title: 'Access your Dashboard',
    description: 'Discover opportunities tailored for you.',
  },
] as const;

export function AccountExperiencePanel() {
  return (
    <div className="rounded-2xl border border-[#D9E1EF] bg-white p-8 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EFF4FF]">
          <Image src={shieldValidIcon} alt="" width={40} height={40} className="object-contain" />
        </div>
        <h2 className="mt-4 font-sans text-[22px] font-bold leading-tight text-[#0F172A]">
          Your Anchor Experience is
          <br />
          almost ready!
        </h2>
        <p className="mt-2 font-sans text-[15px] leading-normal text-[#94A3B8]">
          Here&apos;s what&apos;s next after creating your account.
        </p>
      </div>

      {/* Profile preview */}
      <div className="mt-6">
        <ProfileSummary />
      </div>

      {/* Next up */}
      <div className="mt-6">
        <p className="text-center font-sans text-[16px] font-semibold text-[#0F172A]">
          Next up:
        </p>
        <div className="mt-4 divide-y divide-[#E2E8F0] rounded-2xl border border-[#E2E8F0]">
          {NEXT_UP_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFF4FF]">
                <Image src={item.icon} alt="" width={20} height={20} className="object-contain" />
              </div>
              <div>
                <p className="font-sans text-[15px] font-semibold text-[#0F172A]">{item.title}</p>
                <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#94A3B8]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#EEF3FF] p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#2F66C8]">
          <Lightbulb className="h-4 w-4" />
        </div>
        <p className="font-sans text-[14px] leading-relaxed text-[#64748B]">
          You&apos;re one step away from a world of opportunities tailored just for you.
        </p>
      </div>
    </div>
  );
}