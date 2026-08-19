'use client';

import { useRouter } from 'next/navigation';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { TEAM_INFO_MESSAGE } from '@/features/onboarding/lib/teamData';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';
import {
  InviteMembersSection,
  OrganizationOwnerSection,
  RolePermissionsSection,
  TeamPageHeading,
  TeamSidebarPanel,
  useTeamMembers,
} from './TeamShared';

function continueAfterTeam(
  members: Array<{ id: string; email: string; role: string; fullName?: string }>,
  router: ReturnType<typeof useRouter>,
) {
  useProviderOnboardingStore.getState().setOnboardingData({
    teamMembers: members
      .filter((m) => m.email.trim() && m.role)
      .map((m) => ({
        id: m.id,
        fullName: m.fullName?.trim() || undefined,
        email: m.email.trim(),
        role: m.role as
          | 'Admin'
          | 'Recruiter'
          | 'Program Coordinator'
          | 'Viewer'
          | 'Editor',
      })),
  });
  void saveOnboardingDraft('team').catch(() => undefined);
  router.push('/onboarding/activation');
}

export default function DesktopView() {
  const router = useRouter();
  const { members, setMembers } = useTeamMembers(4);
  const completedMembers = members.filter(
    (member) => member.fullName.trim() && member.email.includes('@') && member.role,
  );
  const hasPartialMember = members.some((member) => {
    const hasAnyValue = Boolean(member.fullName.trim() || member.email.trim() || member.role);
    const isComplete = Boolean(
      member.fullName.trim() && member.email.includes('@') && member.role,
    );
    return hasAnyValue && !isComplete;
  });
  const canContinue = completedMembers.length > 0 && !hasPartialMember;

  function handleContinue() {
    if (!canContinue) return;
    continueAfterTeam(members, router);
  }

  function handleSkip() {
    continueAfterTeam([], router);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar showSignIn />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-20">
        <StepProgress current={5} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-[60px] pt-[120px]">
        <TeamPageHeading />

        <div className="mt-[100px] flex items-start gap-5">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
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
        onSkip={handleSkip}
        continueDisabled={!canContinue}
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
