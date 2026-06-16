'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Plus, Trash2, UserPlus } from 'lucide-react';

import { OnboardingNavbar } from '@/features/home/components/OnboardingNavbar';
import { StepProgress } from '@/shared/components/onboarding/StepProgress';
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

export default function MobileView() {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f2f7ff]">
      <OnboardingNavbar />

      <div className="px-5 pb-3 pt-4">
        <StepProgress current={5} />
      </div>

      <main className="px-5 pb-6 pt-6">
        <div>
          <h1 className="font-serif text-[48px] font-normal leading-[56px] text-[#0F172A]">
            Invite Your{' '}
            <span className="font-serif text-[52px] italic leading-[56px] text-[#2F66C8]">Team</span>
          </h1>
          <p className="mt-3 font-sans text-[14px] leading-[100%] text-[#8C97AD]">
            Add team members who will help manage your organization&apos;s opportunities.
            You can always invite more people later.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#D9E1EF] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF4FF]">
              <UserPlus className="h-4 w-4 text-[#2F66C8]" />
            </div>
            <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Add team member</p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <Image src={mailIcon} alt="" width={14} height={14} className="opacity-50" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@organization.ca"
                className="anchor-field anchor-field--icon-left h-[48px] text-[14px]"
              />
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="anchor-field h-[48px] text-[14px]"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddMember}
              disabled={!email.trim()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#2F66C8] text-[14px] font-medium text-white disabled:bg-[#2F66C8]/40"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>

        {members.length > 0 ? (
          <div className="mt-5 flex flex-col gap-3">
            <p className="font-sans text-[14px] font-medium text-[#0F172A]">
              Invited members ({members.length})
            </p>
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF4FF]">
                    <Image src={userIcon} alt="" width={16} height={16} className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-sans text-[14px] font-medium text-[#0F172A]">{member.email}</p>
                    <span className="inline-block rounded-full bg-[#EFF4FF] px-2 py-0.5 font-sans text-[11px] font-medium text-[#2F66C8]">
                      {member.role}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(member.id)}
                  className="shrink-0 text-[#8C97AD] hover:text-[#EF4444]"
                  aria-label={`Remove ${member.email}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[10px] border border-dashed border-[#D9E1EF] bg-[#F8FAFC] px-4 py-6 text-center">
            <p className="font-sans text-[13px] text-[#8C97AD]">
              No team members added yet. You can skip and invite later.
            </p>
          </div>
        )}

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
          </div>

          <Footer variant="mobile" />
        </div>
      </main>
    </div>
  );
}
