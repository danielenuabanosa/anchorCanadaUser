'use client';

import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { TEAM_INFO_MESSAGE } from '@/features/onboarding/lib/teamData';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import {
  InviteMembersSection,
  OrganizationOwnerSection,
  RolePermissionsSection,
  TeamPageHeading,
  TeamSidebarPanel,
  useTeamMembers,
} from './TeamShared';

export default function DesktopView() {
  const router = useRouter();
  const { members, setMembers } = useTeamMembers(1);

  function handleContinue() {
    router.push('/onboarding/activation');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={5} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-10">
        <TeamPageHeading />

        <div className="mt-[100px] flex items-start gap-5">
          <div className="flex min-w-0 flex-1 flex-col gap-[60px]">
            <InviteMembersSection members={members} onChange={setMembers} />
            <RolePermissionsSection />
            <OrganizationOwnerSection />
          </div>
          <TeamSidebarPanel />
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/verification"
        onContinue={handleContinue}
        onSkip={handleContinue}
        footer={
          <OnboardingInfoBar
            message={TEAM_INFO_MESSAGE}
            linkText="Save & Continue Later"
            linkHref="/onboarding"
          />
        }
      />
    </div>
  );
}
