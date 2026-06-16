'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, UserPlus } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
import { OnboardingNavButtons } from '@/shared/components/onboarding/OnboardingNavButtons';
import { Footer } from './Footer';

import mailIcon from '@assets/icons/mail.png';
import userIcon from '@assets/icons/user.png';

const ROLES = ['Admin', 'Editor', 'Viewer'] as const;
type Role = (typeof ROLES)[number];

interface TeamMember {
  id: string;
  email: string;
  role: Role;
}

export default function DesktopView() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Editor');
  const [members, setMembers] = useState<TeamMember[]>([]);

  function handleAddMember() {
    const trimmed = email.trim();
    if (!trimmed || members.some((m) => m.email === trimmed)) return;
    setMembers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), email: trimmed, role },
    ]);
    setEmail('');
  }

  function handleRemove(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function handleContinue() {
    router.push('/onboarding/activation');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="mx-auto w-full max-w-[1548px] px-10 pt-10">
        <StepProgress current={5} />
      </div>

      <main className="mx-auto w-full max-w-[1548px] flex-1 px-10 pb-16 pt-20">
        <div className="max-w-[886px]">
          <h1 className="font-serif text-[60px] font-normal leading-[56px] text-[#0F172A]">
            Invite Your{' '}
            <span className="font-serif text-[78.83px] italic leading-[73.57px] text-[#2F66C8]">Team</span>
          </h1>
          <p className="mt-3 font-sans text-[16px] text-[#8C97AD]">
            Add team members who will help manage your organization&apos;s opportunities.
            You can always invite more people later.
          </p>

          <div className="mt-10 rounded-2xl border border-[#D9E1EF] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF4FF]">
                <UserPlus className="h-5 w-5 text-[#2F66C8]" />
              </div>
              <div>
                <p className="font-sans text-[18px] font-semibold text-[#0F172A]">Add team member</p>
                <p className="font-sans text-[14px] text-[#8C97AD]">Send an invitation to join your organization</p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <Image src={mailIcon} alt="" width={16} height={16} className="opacity-50" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@organization.ca"
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddMember(); }}
                  className="anchor-field anchor-field--icon-left h-[53px]"
                />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="anchor-field h-[53px] w-[160px]"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddMember}
                disabled={!email.trim()}
                className="inline-flex h-[53px] shrink-0 items-center gap-2 rounded-[6px] bg-[#2F66C8] px-6 font-sans text-[16px] text-white transition-colors hover:bg-[#2454A4] disabled:cursor-not-allowed disabled:bg-[#2F66C8]/40"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          {members.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 font-sans text-[16px] font-medium text-[#0F172A]">
                Invited members ({members.length})
              </p>
              <div className="flex flex-col gap-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white px-5 py-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF4FF]">
                        <Image src={userIcon} alt="" width={20} height={20} className="object-contain" />
                      </div>
                      <div>
                        <p className="font-sans text-[16px] font-medium text-[#0F172A]">{member.email}</p>
                        <span className="mt-0.5 inline-block rounded-full bg-[#EFF4FF] px-2.5 py-0.5 font-sans text-[12px] font-medium text-[#2F66C8]">
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(member.id)}
                      className="text-[#8C97AD] transition-colors hover:text-[#EF4444]"
                      aria-label={`Remove ${member.email}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {members.length === 0 && (
            <div className="mt-6 rounded-[10px] border border-dashed border-[#D9E1EF] bg-[#F8FAFC] px-5 py-8 text-center">
              <p className="font-sans text-[14px] text-[#8C97AD]">
                No team members added yet. You can skip this step and invite people later.
              </p>
            </div>
          )}
        </div>
      </main>

      <OnboardingNavButtons
        backHref="/onboarding/verification"
        onContinue={handleContinue}
        footer={<Footer />}
      />
    </div>
  );
}
