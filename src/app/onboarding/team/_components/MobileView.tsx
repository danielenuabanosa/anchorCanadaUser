'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { TEAM_INFO_MESSAGE } from '@/features/onboarding/lib/teamData';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import {
  InviteMembersSection,
  OrganizationOwnerSection,
  RolePermissionsSection,
  TeamPageHeading,
  useTeamMembers,
} from './TeamShared';

export default function MobileView() {
  const router = useRouter();
  const { members, setMembers } = useTeamMembers(1);

  function handleContinue() {
    router.push('/onboarding/activation');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={5} />
      </div>

      <main className="px-5 pb-6 pt-6">
        <TeamPageHeading compact />

        <div className="mt-6 flex flex-col gap-4">
          <InviteMembersSection members={members} onChange={setMembers} compact />
          <RolePermissionsSection compact />
          <OrganizationOwnerSection compact />
        </div>

        <div className="mt-8 border-t border-[#D9E1EF] pb-8 pt-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] text-[15px] font-semibold text-white hover:bg-[#2454A4]"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/onboarding/verification"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white text-[15px] font-medium text-[#2F66C8]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <button
              type="button"
              onClick={handleContinue}
              className="text-[15px] font-medium text-[#2F66C8]"
            >
              Skip for Now
            </button>
          </div>

          <OnboardingInfoBar
            variant="mobile"
            message={TEAM_INFO_MESSAGE}
            linkText="Save & Continue Later"
            linkHref="/onboarding"
          />
        </div>
      </main>
    </div>
  );
}
