'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { OnboardingInfoBar } from '@/features/onboarding/components/OnboardingInfoBar';
import { TEAM_INFO_MESSAGE } from '@/features/onboarding/lib/teamData';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { useProviderOnboardingStore } from '@/store/onboardingStore';
import { saveOnboardingDraft } from '@/features/provider/lib/completeOnboarding';
import {
  InviteMembersSection,
  OrganizationOwnerSection,
  RolePermissionsSection,
  TeamPageHeading,
  useTeamMembers,
} from './TeamShared';

export default function MobileView() {
  const router = useRouter();
  const { members, setMembers } = useTeamMembers(3);
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
    saveTeamMembers(members);
    router.push('/onboarding/activation');
  }

  function handleSkip() {
    saveTeamMembers([]);
    router.push('/onboarding/activation');
  }

  function saveTeamMembers(nextMembers: typeof members) {
    useProviderOnboardingStore.getState().setOnboardingData({
      teamMembers: nextMembers
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar showSignIn />

      <div className="px-5 pb-3 pt-10">
        <StepProgress current={5} />
      </div>

      <main className="px-5 pb-10 pt-[60px]">
        <TeamPageHeading compact />

        <div className="mt-10 flex flex-col gap-5">
          <InviteMembersSection members={members} onChange={setMembers} compact />
          <RolePermissionsSection compact />
          <OrganizationOwnerSection compact />
        </div>

        <div className="mt-[60px] pb-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] text-[15px] font-semibold text-white hover:bg-[#2454A4] disabled:cursor-not-allowed disabled:opacity-50"
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
              onClick={handleSkip}
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
