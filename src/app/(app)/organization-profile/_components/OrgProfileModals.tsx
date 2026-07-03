'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { ORG_PROFILE } from './orgProfileData';

export function EditProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: ORG_PROFILE.name,
    about: ORG_PROFILE.about,
    mission: ORG_PROFILE.mission,
    vision: ORG_PROFILE.vision,
    website: ORG_PROFILE.website,
    email: ORG_PROFILE.email,
    phone: ORG_PROFILE.phone,
    address: ORG_PROFILE.address,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center md:p-4">
      <div className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-[16px] bg-white md:max-w-[640px] md:rounded-[10px] md:shadow-xl">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-5 py-4">
          <h2 className="text-lg font-medium text-[#0F172A]">Edit Profile</h2>
          <button type="button" onClick={onClose} className="text-[#8C97AD]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {[
            ['Organization Name', 'name'],
            ['Website', 'website'],
            ['Email', 'email'],
            ['Phone', 'phone'],
            ['Address', 'address'],
          ].map(([label, key]) => (
            <label key={key} className="block">
              <span className="mb-2 block text-sm font-medium text-[#0F172A]">{label}</span>
              <input
                type="text"
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="h-11 w-full rounded-[8px] border border-[#D9E1EF] px-3 text-sm outline-none focus:border-[#2F66C8]"
              />
            </label>
          ))}
          {[
            ['About Organization', 'about'],
            ['Mission', 'mission'],
            ['Vision', 'vision'],
          ].map(([label, key]) => (
            <label key={key} className="block">
              <span className="mb-2 block text-sm font-medium text-[#0F172A]">{label}</span>
              <textarea
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                rows={3}
                className="w-full resize-none rounded-[8px] border border-[#D9E1EF] p-3 text-sm outline-none focus:border-[#2F66C8]"
              />
            </label>
          ))}
        </div>
        <div className="flex gap-3 border-t border-[#EEF2F8] p-5">
          <button type="button" onClick={onClose} className="flex-1 rounded-[6px] border border-[#EEF2F8] py-3 text-sm font-medium text-[#44516A]">
            Cancel
          </button>
          <button type="button" onClick={onClose} className="flex-1 rounded-[6px] bg-[#2F66C8] py-3 text-sm font-medium text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrgActionMenu({
  open,
  onClose,
  onEdit,
}: {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
}) {
  if (!open) return null;

  const items = [
    { label: 'Edit Profile', action: onEdit },
    { label: 'Manage Verification', action: onClose },
    { label: 'Update Branding', action: onClose },
    { label: 'Download Profile', action: onClose },
    { label: 'Share Public Link', action: onClose },
  ];

  return (
    <>
      <button type="button" className="fixed inset-0 z-40" onClick={onClose} aria-label="Close menu" />
      <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden rounded-[8px] border border-[#EEF2F8] bg-white py-1 shadow-lg">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              item.action();
              onClose();
            }}
            className="flex w-full px-4 py-2.5 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
