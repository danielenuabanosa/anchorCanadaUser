'use client';

import { Archive, Monitor, Smartphone, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/shared/components/ui/Avatar';
import { photoSrc } from '@/shared/lib/photoSrc';
import { useAuthStore } from '@/store/authStore';
import { profileService } from '@/features/profile/services/profile.service';
import { TAB_PANEL_META } from './settingsData';
import type { SettingsHub } from './useSettingsHub';
import {
  ActionRow,
  BorderedToggleGroup,
  BorderedToggleItem,
  FieldCell,
  FieldGroup,
  FieldLabel,
  SectionLabel,
  SelectField,
  SettingsPanelShell,
  TextInput,
} from './SettingsShared';
import {
  CURRENCY_OPTIONS,
  DATE_FORMAT_OPTIONS,
  LANGUAGE_OPTIONS,
  TIME_FORMAT_OPTIONS,
  TIME_ZONE_OPTIONS,
  WEEK_START_OPTIONS,
} from './settingsData';

function updateGeneral(hub: SettingsHub, patch: Partial<typeof hub.general>) {
  hub.setGeneral({ ...hub.general, ...patch });
  hub.markDirty();
}

function updateOrganization(hub: SettingsHub, patch: Partial<typeof hub.organization>) {
  hub.setOrganization({ ...hub.organization, ...patch });
  hub.markDirty();
}

function updateChannels(hub: SettingsHub, patch: Partial<typeof hub.notificationChannels>) {
  hub.setNotificationChannels({ ...hub.notificationChannels, ...patch });
  hub.markDirty();
}

function updateTypes(hub: SettingsHub, patch: Partial<typeof hub.notificationTypes>) {
  hub.setNotificationTypes({ ...hub.notificationTypes, ...patch });
  hub.markDirty();
}

export function SettingsTabPanel({ hub, mobile = false }: { hub: SettingsHub; mobile?: boolean }) {
  const meta = TAB_PANEL_META[hub.activeTab];

  if (hub.activeTab === 'integrations') {
    return (
      <SettingsPanelShell title={meta.title} subtitle={meta.subtitle} mobile={mobile}>
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <span className="rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8] px-1.5 py-0.5 text-xs text-[#5D6B86]">
            Soon
          </span>
          <p className="text-sm text-[#44516A]">Integrations will be available in a future update.</p>
        </div>
      </SettingsPanelShell>
    );
  }

  return (
    <SettingsPanelShell
      title={meta.title}
      subtitle={meta.subtitle}
      hasFooter={meta.hasFooter}
      onReset={hub.resetTab}
      onSave={hub.saveChanges}
      mobile={mobile}
    >
      {hub.activeTab === 'general' && <GeneralPanel hub={hub} mobile={mobile} />}
      {hub.activeTab === 'organization' && <OrganizationPanel hub={hub} />}
      {hub.activeTab === 'security' && <SecurityPanel hub={hub} />}
      {hub.activeTab === 'notifications' && <NotificationsPanel hub={hub} />}
      {hub.activeTab === 'danger' && <DangerPanel hub={hub} mobile={mobile} />}
    </SettingsPanelShell>
  );
}

function GeneralPanel({ hub, mobile }: { hub: SettingsHub; mobile?: boolean }) {
  const rows = [
    [
      {
        label: 'Organization Name',
        node: (
          <TextInput
            value={hub.general.organizationName}
            onChange={(v) => updateGeneral(hub, { organizationName: v })}
            placeholder="Enter organization name"
          />
        ),
      },
      {
        label: 'Time Zone',
        node: (
          <SelectField
            value={hub.general.timeZone}
            options={TIME_ZONE_OPTIONS}
            onChange={(v) => updateGeneral(hub, { timeZone: v })}
          />
        ),
      },
    ],
    [
      {
        label: 'Organization Email',
        node: (
          <TextInput
            value={hub.general.organizationEmail}
            onChange={(v) => updateGeneral(hub, { organizationEmail: v })}
            placeholder="name@organization.ca"
          />
        ),
      },
      {
        label: 'Currency',
        node: (
          <SelectField
            value={hub.general.currency}
            options={CURRENCY_OPTIONS}
            onChange={(v) => updateGeneral(hub, { currency: v })}
          />
        ),
      },
    ],
    [
      {
        label: 'Default Language',
        node: (
          <SelectField
            value={hub.general.defaultLanguage}
            options={LANGUAGE_OPTIONS}
            onChange={(v) => updateGeneral(hub, { defaultLanguage: v })}
          />
        ),
      },
      {
        label: 'Time Format',
        node: (
          <SelectField
            value={hub.general.timeFormat}
            options={TIME_FORMAT_OPTIONS}
            onChange={(v) => updateGeneral(hub, { timeFormat: v })}
          />
        ),
      },
    ],
    [
      {
        label: 'Date Format',
        node: (
          <SelectField
            value={hub.general.dateFormat}
            options={DATE_FORMAT_OPTIONS}
            onChange={(v) => updateGeneral(hub, { dateFormat: v })}
          />
        ),
      },
      {
        label: 'Week Starts On',
        node: (
          <SelectField
            value={hub.general.weekStartsOn}
            options={WEEK_START_OPTIONS}
            onChange={(v) => updateGeneral(hub, { weekStartsOn: v })}
          />
        ),
      },
    ],
  ];

  return (
    <div className="flex flex-col gap-5">
      {rows.map((pair, rowIdx) =>
        mobile ? (
          <div key={rowIdx} className="flex flex-col gap-2.5">
            {pair.map((field) => (
              <FieldCell key={field.label}>
                <FieldLabel>{field.label}</FieldLabel>
                {field.node}
              </FieldCell>
            ))}
          </div>
        ) : (
          <FieldGroup key={rowIdx}>
            {pair.map((field) => (
              <FieldCell key={field.label}>
                <FieldLabel>{field.label}</FieldLabel>
                {field.node}
              </FieldCell>
            ))}
          </FieldGroup>
        ),
      )}
    </div>
  );
}

function OrganizationPanel({ hub }: { hub: SettingsHub }) {
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);

  return (
    <div className="flex flex-col gap-5">
      <FieldCell>
        <FieldLabel>Your profile photo</FieldLabel>
        <div className="flex items-center justify-between">
          <Avatar src={photoSrc(user?.avatarUrl)} fallback={user?.name || 'You'} size="md" />
          <label className="cursor-pointer rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]">
            Change
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (!file) return;
                void profileService.uploadAvatar(file).then((result) => {
                  updateUser({ avatarUrl: result.avatarUrl });
                });
              }}
            />
          </label>
        </div>
      </FieldCell>
      <FieldCell>
        <FieldLabel>Logo</FieldLabel>
        <div className="flex items-center justify-between">
          <div className="rounded-[10px] border border-[#D9E1EF] bg-white p-2.5">
            {hub.organization.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hub.organization.logoUrl}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-[10px] object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#EEF2F8] text-xs text-[#8C97AD]">
                Logo
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <label className="cursor-pointer rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]">
              {hub.uploadingLogo ? 'Uploading…' : 'Change'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={hub.uploadingLogo}
                onChange={(e) => {
                  void hub.uploadLogo(e.target.files?.[0] ?? null);
                  e.target.value = '';
                }}
              />
            </label>
            <p className="text-xs text-[#44516A]">JPG, PNG up to 2MB</p>
          </div>
        </div>
      </FieldCell>

      <FieldCell>
        <FieldLabel>Cover Image</FieldLabel>
        <div className="flex items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-2.5">
          {hub.organization.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hub.organization.coverUrl}
              alt=""
              width={240}
              height={80}
              className="h-20 w-[240px] max-w-[55%] rounded-[10px] object-cover"
            />
          ) : (
            <div className="flex h-20 w-[240px] max-w-[55%] items-center justify-center rounded-[10px] bg-[#EEF2F8] text-xs text-[#8C97AD]">
              Cover image
            </div>
          )}
          <div className="flex flex-col items-end gap-2">
            <label className="cursor-pointer rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]">
              {hub.uploadingCover ? 'Uploading…' : 'Change'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={hub.uploadingCover}
                onChange={(e) => {
                  void hub.uploadCover(e.target.files?.[0] ?? null);
                  e.target.value = '';
                }}
              />
            </label>
            <p className="text-xs text-[#44516A]">Recommended 1980x480px</p>
          </div>
        </div>
      </FieldCell>

      <FieldCell>
        <FieldLabel>Public Profile URL</FieldLabel>
        <div className="flex items-center gap-2.5 rounded-[10px] border border-[#D9E1EF] bg-white p-4 transition-colors focus-within:border-[#2F66C8]">
          <input
            type="text"
            value={hub.organization.publicProfileUrl}
            onChange={(e) => updateOrganization(hub, { publicProfileUrl: e.target.value })}
            placeholder="https://www.yourorganization.ca"
            className="no-anchor-field min-w-0 flex-1 border-0 bg-transparent p-0 text-base text-[#0F172A] shadow-none outline-none placeholder:text-[#8C97AD] focus:border-0 focus:shadow-none"
          />
          <button
            type="button"
            onClick={() => {
              if (hub.organization.publicProfileUrl) {
                void navigator.clipboard?.writeText(hub.organization.publicProfileUrl);
              }
            }}
            className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-[#8C97AD]">This is how your organization appears publicly.</p>
      </FieldCell>
    </div>
  );
}

function SecurityPanel({ hub }: { hub: SettingsHub }) {
  return (
    <div className="flex flex-col gap-5">
      <ActionRow
        title="Change Password"
        description="Last changed 43 days ago"
        actionLabel="Change"
        onAction={() => hub.setModal('changePassword')}
      />
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
        {(hub.sessions.length ? hub.sessions : []).map((session, i, list) => {
          const Icon = session.device.toLowerCase().includes('iphone') || session.device.toLowerCase().includes('mobile')
            ? Smartphone
            : Monitor;
          return (
            <div
              key={session.id}
              className={cn(
                'flex items-center gap-5 bg-white p-5',
                i < list.length - 1 && 'border-b border-[#EEF2F8]',
              )}
            >
              <div className="flex min-w-0 flex-1 items-center gap-[26px]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6.667px] bg-[#EEF2F8] p-3">
                  <Icon className="h-6 w-6 text-[#44516A]" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#0F172A]">
                    {session.device}
                    {session.isCurrent ? ' (Current)' : ''}
                  </p>
                  <p className="mt-2 truncate whitespace-pre text-xs text-[#44516A]">{session.details}</p>
                </div>
              </div>
              {!session.isCurrent ? (
                <button
                  type="button"
                  onClick={() => {
                    void hub.revokeSession(session.id);
                  }}
                  className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
                >
                  Sign Out
                </button>
              ) : (
                <span className="shrink-0 rounded-[6px] bg-[#ECFDF5] px-2.5 py-1.5 text-sm font-medium text-[#15803D]">
                  Active
                </span>
              )}
            </div>
          );
        })}
        {hub.sessions.length === 0 ? (
          <p className="bg-white p-5 text-sm text-[#44516A]">No active sessions found.</p>
        ) : null}
        <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] px-4 py-4 text-center">
          <button type="button" className="text-sm font-medium text-[#2F66C8]">
            View all sessions
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsPanel({ hub }: { hub: SettingsHub }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <SectionLabel>Communication Channels</SectionLabel>
        <BorderedToggleGroup>
          <BorderedToggleItem
            title="Email Notifications"
            description="Receive updates via email"
            on={hub.notificationChannels.emailNotifications}
            onChange={(v) => updateChannels(hub, { emailNotifications: v })}
          />
          <BorderedToggleItem
            title="Push notifications"
            description="Receive in-app notifications"
            on={hub.notificationChannels.pushNotifications}
            onChange={(v) => updateChannels(hub, { pushNotifications: v })}
          />
        </BorderedToggleGroup>
      </div>
      <div className="flex flex-col gap-2.5">
        <SectionLabel>Notification Types</SectionLabel>
        <BorderedToggleGroup>
          <BorderedToggleItem
            title="Application Updates"
            description="Get notiified about new and existing applications."
            on={hub.notificationTypes.applicationUpdates}
            onChange={(v) => updateTypes(hub, { applicationUpdates: v })}
          />
          <BorderedToggleItem
            title="Opportunity Updates"
            description="Get notified about your listed opportunities"
            on={hub.notificationTypes.opportunityUpdates}
            onChange={(v) => updateTypes(hub, { opportunityUpdates: v })}
          />
          <BorderedToggleItem
            title="Analytics Reports"
            description="Receive weekly performance reports"
            on={hub.notificationTypes.analyticsReports}
            onChange={(v) => updateTypes(hub, { analyticsReports: v })}
          />
          <BorderedToggleItem
            title="Security Alerts"
            description="Important security and login alerts"
            on={hub.notificationTypes.securityAlerts}
            onChange={(v) => updateTypes(hub, { securityAlerts: v })}
          />
          <BorderedToggleItem
            title="Marketing & Tips"
            description="Product updates and helpful tips"
            on={hub.notificationTypes.marketingTips}
            onChange={(v) => updateTypes(hub, { marketingTips: v })}
          />
        </BorderedToggleGroup>
      </div>
    </div>
  );
}

function DangerPanel({ hub, mobile }: { hub: SettingsHub; mobile?: boolean }) {
  const actions = [
    { id: 'archive', label: 'Archive Organization', button: 'Archive', icon: Archive, modal: 'archiveOrganization' as const },
    { id: 'delete', label: 'Delete Organization', button: 'Delete', icon: Trash2, modal: 'deleteOrganization' as const },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className={cn('grid gap-2.5', mobile ? 'grid-cols-1' : 'grid-cols-2')}>
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              className="flex flex-col items-center gap-5 rounded-[10px] border border-[#EEF2F8] bg-white px-2.5 py-4"
            >
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[6.667px] bg-[#FEF2F2] p-[6.667px]">
                  <Icon className="h-6 w-6 text-[#B91C1C]" strokeWidth={1.75} />
                </div>
                <p className="text-center text-xs font-medium leading-normal text-[#0F172A]">{action.label}</p>
              </div>
              <button
                type="button"
                onClick={() => hub.setModal(action.modal)}
                className="w-full rounded-[4px] border border-[#FEE2E2] bg-[#FEF2F2] px-2.5 py-1.5 text-sm font-medium text-[#B91C1C]"
              >
                {action.button}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
