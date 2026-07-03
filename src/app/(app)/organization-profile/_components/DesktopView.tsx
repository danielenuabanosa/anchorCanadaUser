'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  ChevronDown,
  ExternalLink,
  SquarePen,
} from 'lucide-react';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { Avatar } from '@/shared/components/ui/Avatar';
import orgAvatar from '@assets/images/prov-sickkids.png';
import { ORG_DETAIL_ROWS, ORG_PROFILE, ORG_PROFILE_STATS } from './orgProfileData';
import { EditProfileModal, OrgActionMenu } from './OrgProfileModals';

function FocusTag({ label }: { label: string }) {
  return (
    <span className="rounded border border-[#DCE7FF] bg-[#EFF4FF] px-1.5 py-0.5 text-sm font-medium text-[#2F66C8]">
      {label}
    </span>
  );
}

function AboutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[#EEF2F8] px-4 py-2.5">
        <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
      </div>
      <div className="px-4 py-4 text-sm text-[#0F172A]">{children}</div>
    </div>
  );
}

export default function DesktopView() {
  const [editOpen, setEditOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Organization Profile</h1>
          <p className="text-base text-[#44516A]">
            Manage your organizations information, branding, verification, and public presence.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="inline-flex items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#2F66C8]"
          >
            <SquarePen className="h-[18px] w-[18px]" />
            Edit Profile
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setActionOpen((o) => !o)}
              className="inline-flex w-[120px] items-center justify-between rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
            >
              Action
              <ChevronDown className="h-[18px] w-[18px]" />
            </button>
            <OrgActionMenu
              open={actionOpen}
              onClose={() => setActionOpen(false)}
              onEdit={() => setEditOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {ORG_PROFILE_STATS.map((stat) => (
          <HubStatCard key={stat.label} {...stat} subtext="from last month" />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[500px_1fr_364px]">
        {/* Identity card */}
        <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
          <div className="flex gap-10">
            <Avatar src={orgAvatar.src} fallback={ORG_PROFILE.name} className="h-[120px] w-[120px]" />
            <div className="min-w-0 flex-1">
              {ORG_PROFILE.verified ? (
                <span className="inline-flex items-center gap-1 rounded bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">
                  <BadgeCheck className="h-3 w-3" />
                  Verified
                </span>
              ) : null}
              <h2 className="mt-2 font-serif text-[28px] text-[#0F172A]">{ORG_PROFILE.name}</h2>
              <p className="mt-1 text-sm text-[#44516A]">{ORG_PROFILE.type}</p>
              <div className="mt-2 flex flex-wrap gap-4">
                {ORG_PROFILE.categories.map(({ label, icon: Icon }) => (
                  <span key={label} className="inline-flex items-center gap-2 text-sm text-[#44516A]">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {ORG_DETAIL_ROWS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex h-[68px] items-center gap-2.5 rounded-[10px] border border-[#EEF2F8] p-2.5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#EEF2F8]">
                  <Icon className="h-5 w-5 text-[#44516A]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-[#44516A]">{label}</p>
                  <p className="truncate text-base font-medium text-[#0F172A]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="mb-2.5 flex items-center justify-between text-sm font-medium text-[#0F172A]">
              <span>Profile Completion</span>
              <span>{ORG_PROFILE.completion}%</span>
            </div>
            <div className="h-3 rounded-full bg-[#EEF2F8]">
              <div
                className="h-2.5 rounded-full bg-[#2F66C8]"
                style={{ width: `${ORG_PROFILE.completion}%` }}
              />
            </div>
            <p className="mt-2.5 text-xs text-[#44516A]">Complete your verification to reach 100%</p>
          </div>
        </div>

        {/* About card */}
        <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <AboutSection title="About Organization">{ORG_PROFILE.about}</AboutSection>
          <AboutSection title="Mission">{ORG_PROFILE.mission}</AboutSection>
          <AboutSection title="Vision">{ORG_PROFILE.vision}</AboutSection>
          <div>
            <div className="border-b border-[#EEF2F8] px-4 py-2.5">
              <h3 className="text-sm font-semibold text-[#0F172A]">Focus Area</h3>
            </div>
            <div className="flex flex-wrap gap-2.5 p-4">
              {ORG_PROFILE.focusAreas.map((area) => (
                <FocusTag key={area} label={area} />
              ))}
            </div>
          </div>
        </div>

        {/* Contact card */}
        <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <div className="border-b border-[#EEF2F8] p-4">
            <h3 className="text-sm font-semibold text-[#0F172A]">Organization Information</h3>
          </div>
          <div className="space-y-7 p-4">
            <div>
              <p className="text-xs text-[#44516A]">Website</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium text-[#0F172A]">{ORG_PROFILE.website}</p>
                <ExternalLink className="h-4 w-4 text-[#8C97AD]" />
              </div>
            </div>
            <div>
              <p className="text-xs text-[#44516A]">Email</p>
              <p className="mt-2 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.email}</p>
            </div>
            <div>
              <p className="text-xs text-[#44516A]">Phone</p>
              <p className="mt-2 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.phone}</p>
            </div>
            <div>
              <p className="text-xs text-[#44516A]">Address</p>
              <p className="mt-2 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.address}</p>
            </div>
            <div>
              <p className="text-xs text-[#44516A]">Socials</p>
              <div className="mt-2 flex gap-2">
                {ORG_PROFILE.socials.map((social) => (
                  <button
                    key={social.id}
                    type="button"
                    aria-label={social.label}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${social.color}`}
                  >
                    {social.label.charAt(0)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
