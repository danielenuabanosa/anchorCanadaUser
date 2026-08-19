'use client';

import { ArrowUp, Building, ChevronDown, ExternalLink, FileBadge, UserStar } from 'lucide-react';
import type { ElementType } from 'react';
import { cn } from '@/lib/utils';
import { HubStatCard } from '@/app/(app)/opportunities/_components/HubStatCard';
import { Avatar } from '@/shared/components/ui/Avatar';
import { useOrgProfileDisplay } from './OrgProfileDisplayContext';

export function FocusTag({ label }: { label: string }) {
  return (
    <span className="rounded border border-[#DCE7FF] bg-[#EFF4FF] px-1.5 py-0.5 text-sm font-medium text-[#2F66C8]">
      {label}
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-xs text-[#15803D]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.5L6 8.885L2.91 10.5L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
          fill="#15803D"
        />
      </svg>
      Verified
    </span>
  );
}

export function OrgDetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ElementType;
}) {
  return (
    <div className="flex h-[68px] items-center gap-2.5 rounded-[10px] border border-[#EEF2F8] bg-white p-2.5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#EEF2F8] p-[13px]">
        <Icon className="h-[22px] w-[22px] text-[#44516A]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-[#44516A]">{label}</p>
        <p className="truncate text-base font-medium text-[#0F172A]">{value}</p>
      </div>
    </div>
  );
}

export function ProfileCompletionBar({
  completion,
  onCompleteVerification,
}: {
  completion: number;
  onCompleteVerification?: () => void;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between text-sm font-medium text-[#0F172A]">
        <span>Profile Completion</span>
        <span>{completion}%</span>
      </div>
      <div className="flex h-3 flex-col justify-center rounded-full bg-[#EEF2F8] pr-[45px]">
        <div
          className="h-2.5 rounded-full bg-[#2F66C8]"
          style={{ width: `${completion}%` }}
        />
      </div>
      {onCompleteVerification && completion < 100 ? (
        <button
          type="button"
          onClick={onCompleteVerification}
          className="mt-2.5 text-left text-xs text-[#2F66C8] underline-offset-2 hover:underline"
        >
          Complete your verification to reach 100%
        </button>
      ) : (
        <p className="mt-2.5 text-xs text-[#44516A]">Complete your verification to reach 100%</p>
      )}
    </div>
  );
}

export function OrgIdentityCard({
  avatarSrc,
  mobile,
}: {
  avatarSrc: string;
  mobile?: boolean;
}) {
  const { profile: ORG_PROFILE } = useOrgProfileDisplay();
  return (
    <div className="flex flex-col gap-5">
      <div className={cn('flex items-center', mobile ? 'gap-5' : 'gap-10')}>
        <Avatar
          src={avatarSrc}
          fallback={ORG_PROFILE.name}
          className={cn('shrink-0', mobile ? 'h-[100px] w-[100px]' : 'h-[120px] w-[120px]')}
        />
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          {ORG_PROFILE.verified ? <VerifiedBadge /> : null}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[28px] leading-none font-serif text-[#0F172A]">
              {ORG_PROFILE.name || 'Your Organization'}
            </h2>
            <p className="text-sm text-[#44516A]">{ORG_PROFILE.type || 'Organization'}</p>
          </div>
        </div>
      </div>
      <div className={cn('flex flex-wrap items-center', mobile ? 'gap-2.5' : 'gap-4')}>
        {ORG_PROFILE.categories.map(({ label, icon: Icon }) => (
          <span key={label} className="inline-flex items-center gap-2 text-sm text-[#44516A]">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function OrgStatsRow({ mobile }: { mobile?: boolean }) {
  const { stats: baseStats } = useOrgProfileDisplay();
  const stats = baseStats.map((s) => ({ ...s, subtext: 'from last month' }));

  if (mobile) {
    return (
      <div className="grid h-[326px] grid-cols-2 grid-rows-2 gap-2.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col justify-between rounded-[8px] border border-[#EEF2F8] bg-white p-4"
          >
            <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl', stat.iconBg)}>
              <stat.icon className={cn('h-4 w-4', stat.iconColor)} strokeWidth={1.75} />
            </span>
            <div className="flex h-20 flex-col justify-between">
              <div className="space-y-1.5">
                <p className="text-xs leading-none text-[#44516A]">{stat.label}</p>
                <p className="text-2xl font-bold leading-none text-[#0F172A]">{stat.value}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-[2px] bg-[#ECFDF5] px-1 py-0.5 text-[10px] leading-none text-[#15803D]">
                  <ArrowUp className="h-2.5 w-2.5" strokeWidth={2.5} />
                  {stat.change}
                </span>
                <span className="text-[10px] leading-none text-[#8C97AD]">{stat.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
      {stats.map((stat) => (
        <HubStatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

export function AboutOrganizationCard({ mobile }: { mobile?: boolean }) {
  const { profile } = useOrgProfileDisplay();
  const sections = [
    { id: 'about', title: 'About Organization', content: profile.about || 'No description added yet.' },
    { id: 'mission', title: 'Mission', content: profile.mission || 'No mission added yet.' },
    { id: 'vision', title: 'Vision', content: profile.vision || 'No vision added yet.' },
  ];
  const [first, ...rest] = sections;
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="border-b border-[#EEF2F8] p-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">{first.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-[#0F172A]">{first.content}</p>
      </div>
      {rest.map((section) => (
        <div key={section.id}>
          <div className="px-4 py-2.5">
            <h3 className="text-sm font-semibold text-[#0F172A]">{section.title}</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-[#0F172A]">{section.content}</p>
          </div>
        </div>
      ))}
      <div className="px-4 py-2.5">
        <h3 className="text-sm font-semibold text-[#0F172A]">Focus Area</h3>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2.5">
          {profile.focusAreas.length ? (
            profile.focusAreas.map((area) => <FocusTag key={area} label={area} />)
          ) : (
            <p className="text-sm text-[#44516A]">No focus areas added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function OrganizationInfoCard({ mobile }: { mobile?: boolean }) {
  const { profile: ORG_PROFILE } = useOrgProfileDisplay();
  const content = (
    <div className="space-y-[29px]">
      <div>
        <p className="text-xs text-[#44516A]">Website</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          {ORG_PROFILE.website ? (
            <a
              href={
                ORG_PROFILE.website.startsWith('http')
                  ? ORG_PROFILE.website
                  : `https://${ORG_PROFILE.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm font-medium text-[#2F66C8] hover:underline"
            >
              {ORG_PROFILE.website}
            </a>
          ) : (
            <p className="text-sm font-medium text-[#0F172A]">—</p>
          )}
          {ORG_PROFILE.website ? (
            <a
              href={
                ORG_PROFILE.website.startsWith('http')
                  ? ORG_PROFILE.website
                  : `https://${ORG_PROFILE.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open website in new tab"
              className="shrink-0 text-[#8C97AD] hover:text-[#2F66C8]"
            >
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            </a>
          ) : (
            <ExternalLink className="h-4 w-4 shrink-0 text-[#8C97AD]" strokeWidth={1.75} />
          )}
        </div>
      </div>
      <div>
        <p className="text-xs text-[#44516A]">Email</p>
        <p className="mt-2 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.email || '—'}</p>
      </div>
      <div>
        <p className="text-xs text-[#44516A]">Phone</p>
        <p className="mt-2 text-sm font-medium text-[#0F172A]">{ORG_PROFILE.phone || '—'}</p>
      </div>
      <div>
        <p className="text-xs text-[#44516A]">Address</p>
        <p className="mt-2 text-sm font-medium leading-[18px] text-[#0F172A]">
          {ORG_PROFILE.address || '—'}
        </p>
      </div>
      <div>
        <p className="text-xs text-[#44516A]">Socials</p>
        <div className="mt-2 flex flex-wrap gap-2.5">
          {ORG_PROFILE.socials.length ? (
            ORG_PROFILE.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={cn(
                  'flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[10px] font-bold text-white',
                  social.color,
                )}
              >
                {social.label}
              </a>
            ))
          ) : (
            <p className="text-sm text-[#44516A]">—</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
      <div className="border-b border-[#EEF2F8] p-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">Organization Information</h3>
      </div>
      <div className="p-4">{content}</div>
    </div>
  );
}

export function IdentityDetailsCard({
  avatarSrc,
  mobile,
  onCompleteVerification,
}: {
  avatarSrc?: string;
  mobile?: boolean;
  onCompleteVerification?: () => void;
}) {
  const { profile } = useOrgProfileDisplay();
  const detailRows = [
    { label: 'Member Since', value: profile.memberSince || '—', icon: UserStar },
    { label: 'Org. Size', value: profile.orgSize || '—', icon: Building },
    { label: 'Reg. Number', value: profile.regNumber || '—', icon: FileBadge },
  ];
  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <OrgIdentityCard avatarSrc={avatarSrc || profile.logoUrl || ''} mobile={mobile} />
      <div className="mt-5 space-y-2.5">
        {detailRows.map((row) => (
          <OrgDetailRow key={row.label} {...row} />
        ))}
      </div>
      <div className="mt-5">
        <ProfileCompletionBar
          completion={profile.completion}
          onCompleteVerification={onCompleteVerification}
        />
      </div>
    </div>
  );
}

export function PageHeaderActions({
  onEdit,
  onToggleAction,
  actionOpen,
  children,
}: {
  onEdit: () => void;
  onToggleAction: () => void;
  actionOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">Organization Profile</h1>
        <p className="text-base text-[#44516A]">
          Manage your organizations information, branding, verification, and public presence.
        </p>
      </div>
      <div className="relative flex flex-wrap gap-2.5">
        {/* <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#2F66C8]"
        >
          <SquarePen className="h-[18px] w-[18px]" strokeWidth={1.75} />
          Edit Profile
        </button> */}
        <button
          type="button"
          onClick={onToggleAction}
          aria-expanded={actionOpen}
          className="inline-flex w-[120px] items-center justify-between rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-base font-medium text-[#0F172A]"
        >
          Action
          <ChevronDown className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
        {children}
      </div>
    </div>
  );
}
