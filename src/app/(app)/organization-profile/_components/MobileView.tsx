'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  Building2,
  ChevronDown,
  ExternalLink,
  SquarePen,
} from 'lucide-react';
import { MobileHubPageHero } from '@/app/(app)/opportunities/_components/MobileHubPageHero';
import { MobileHubStatGrid } from '@/app/(app)/opportunities/_components/MobileHubStatGrid';
import { Avatar } from '@/shared/components/ui/Avatar';
import orgAvatar from '@assets/images/prov-sickkids.png';
import { ORG_DETAIL_ROWS, ORG_PROFILE, ORG_PROFILE_STATS } from './orgProfileData';
import { EditProfileModal, OrgActionMenu } from './OrgProfileModals';

export default function MobileView() {
  const [editOpen, setEditOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 pb-4">
      <MobileHubPageHero
        title="Organization Profile"
        subtitle="Manage your organizations information, branding, verification, and public presence."
        action={
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-sm font-medium text-[#2F66C8]"
            >
              <SquarePen className="h-4 w-4" />
              Edit Profile
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setActionOpen((o) => !o)}
                className="inline-flex items-center justify-center gap-1 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A]"
              >
                Action
                <ChevronDown className="h-4 w-4" />
              </button>
              <OrgActionMenu
                open={actionOpen}
                onClose={() => setActionOpen(false)}
                onEdit={() => setEditOpen(true)}
              />
            </div>
          </div>
        }
      />

      <MobileHubStatGrid stats={ORG_PROFILE_STATS.map((s) => ({ ...s, subtext: 'from last month' }))} />

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <div className="flex flex-col items-center text-center">
          <Avatar src={orgAvatar.src} fallback={ORG_PROFILE.name} className="h-20 w-20" />
          {ORG_PROFILE.verified ? (
            <span className="mt-3 inline-flex items-center gap-1 rounded bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          ) : null}
          <h2 className="mt-2 font-serif text-2xl text-[#0F172A]">{ORG_PROFILE.name}</h2>
          <p className="mt-1 text-sm text-[#44516A]">{ORG_PROFILE.type}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {ORG_PROFILE.categories.map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-sm text-[#44516A]">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {ORG_DETAIL_ROWS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-[8px] border border-[#EEF2F8] p-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#EEF2F8]">
                <Icon className="h-4 w-4 text-[#44516A]" />
              </span>
              <div>
                <p className="text-xs text-[#44516A]">{label}</p>
                <p className="text-sm font-medium text-[#0F172A]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#0F172A]">
            <span>Profile Completion</span>
            <span>{ORG_PROFILE.completion}%</span>
          </div>
          <div className="h-3 rounded-full bg-[#EEF2F8]">
            <div
              className="h-2.5 rounded-full bg-[#2F66C8]"
              style={{ width: `${ORG_PROFILE.completion}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#44516A]">Complete your verification to reach 100%</p>
        </div>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">About Organization</h3>
        <p className="mt-3 text-sm text-[#0F172A]">{ORG_PROFILE.about}</p>
        <h3 className="mt-5 text-sm font-semibold text-[#0F172A]">Mission</h3>
        <p className="mt-2 text-sm text-[#0F172A]">{ORG_PROFILE.mission}</p>
        <h3 className="mt-5 text-sm font-semibold text-[#0F172A]">Vision</h3>
        <p className="mt-2 text-sm text-[#0F172A]">{ORG_PROFILE.vision}</p>
        <h3 className="mt-5 text-sm font-semibold text-[#0F172A]">Focus Area</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {ORG_PROFILE.focusAreas.map((area) => (
            <span
              key={area}
              className="rounded border border-[#DCE7FF] bg-[#EFF4FF] px-1.5 py-0.5 text-sm font-medium text-[#2F66C8]"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">Organization Information</h3>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-xs text-[#44516A]">Website</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-medium text-[#0F172A]">{ORG_PROFILE.website}</p>
              <ExternalLink className="h-4 w-4 text-[#8C97AD]" />
            </div>
          </div>
          <div>
            <p className="text-xs text-[#44516A]">Email</p>
            <p className="mt-1 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.email}</p>
          </div>
          <div>
            <p className="text-xs text-[#44516A]">Phone</p>
            <p className="mt-1 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.phone}</p>
          </div>
          <div>
            <p className="text-xs text-[#44516A]">Address</p>
            <p className="mt-1 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.address}</p>
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

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
