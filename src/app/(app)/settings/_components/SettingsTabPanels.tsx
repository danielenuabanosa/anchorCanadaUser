'use client';

import Image from 'next/image';
import { Archive, ArrowRightLeft, Laptop, Monitor, Smartphone, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ACTIVE_SESSIONS, TAB_PANEL_META } from './settingsData';
import type { SettingsHub } from './useSettingsHub';
import {
  ActionRow,
  BorderedToggleGroup,
  BorderedToggleItem,
  ColorField,
  FieldCell,
  FieldGroup,
  FieldLabel,
  IntegrationCardView,
  SectionLabel,
  SelectField,
  SettingsPanelShell,
  TextInput,
  ToggleRow,
} from './SettingsShared';
import {
  CURRENCY_OPTIONS,
  DATE_FORMAT_OPTIONS,
  INVITATION_EXPIRY_OPTIONS,
  LANGUAGE_OPTIONS,
  MAX_APPS_OPTIONS,
  REVIEWER_ASSIGNMENT_OPTIONS,
  TEAM_ROLE_OPTIONS,
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

function updateTeam(hub: SettingsHub, patch: Partial<typeof hub.team>) {
  hub.setTeam({ ...hub.team, ...patch });
  hub.markDirty();
}

function updateDanger(hub: SettingsHub, patch: Partial<typeof hub.danger>) {
  hub.setDanger({ ...hub.danger, ...patch });
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

  if (hub.activeTab === 'billing') {
    return (
      <SettingsPanelShell title={meta.title} subtitle={meta.subtitle} mobile={mobile}>
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <span className="rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8] px-1.5 py-0.5 text-xs text-[#5D6B86]">
            Soon
          </span>
          <p className="text-sm text-[#44516A]">Billing management will be available in a future update.</p>
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
      {hub.activeTab === 'organization' && <OrganizationPanel hub={hub} mobile={mobile} />}
      {hub.activeTab === 'security' && <SecurityPanel hub={hub} />}
      {hub.activeTab === 'notifications' && <NotificationsPanel hub={hub} />}
      {hub.activeTab === 'teams' && <TeamsPanel hub={hub} />}
      {hub.activeTab === 'integrations' && <IntegrationsPanel hub={hub} mobile={mobile} />}
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

function OrganizationPanel({ hub, mobile }: { hub: SettingsHub; mobile?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <FieldCell>
        <FieldLabel>Logo</FieldLabel>
        <div className="flex items-center justify-between">
          <div className="rounded-[10px] border border-[#D9E1EF] bg-white p-2.5">
            <Image
              src={hub.organization.logo}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-[10px] object-cover"
            />
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              className="rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
            >
              Change
            </button>
            <p className="text-xs text-[#44516A]">JPG, PNG up to 2MB</p>
          </div>
        </div>
      </FieldCell>

      <FieldCell>
        <FieldLabel>Cover Image</FieldLabel>
        <div className="flex items-center justify-between rounded-[10px] border border-[#D9E1EF] bg-white p-2.5">
          <Image
            src={hub.organization.coverImage}
            alt=""
            width={240}
            height={80}
            className="h-20 w-[240px] max-w-[55%] rounded-[10px] object-cover"
          />
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              className="rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
            >
              Change
            </button>
            <p className="text-xs text-[#44516A]">Recommended 1980x48px</p>
          </div>
        </div>
      </FieldCell>

      {mobile ? (
        <>
          <ColorField
            label="Primary Brand Color"
            value={hub.organization.primaryBrandColor}
            onChange={(v) => updateOrganization(hub, { primaryBrandColor: v })}
          />
          <ColorField
            label="Secondary Color"
            value={hub.organization.secondaryColor}
            onChange={(v) => updateOrganization(hub, { secondaryColor: v })}
          />
        </>
      ) : (
        <FieldGroup>
          <ColorField
            label="Primary Brand Color"
            value={hub.organization.primaryBrandColor}
            onChange={(v) => updateOrganization(hub, { primaryBrandColor: v })}
          />
          <ColorField
            label="Secondary Color"
            value={hub.organization.secondaryColor}
            onChange={(v) => updateOrganization(hub, { secondaryColor: v })}
          />
        </FieldGroup>
      )}

      <FieldCell>
        <FieldLabel>Public Profile URL</FieldLabel>
        <div className="flex h-[50px] items-center gap-2.5 anchor-field pl-4 pr-2">
          <input
            type="text"
            value={hub.organization.publicProfileUrl}
            onChange={(e) => updateOrganization(hub, { publicProfileUrl: e.target.value })}
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-[#0F172A] shadow-none outline-none focus:border-0 focus:shadow-none"
          />
          <button
            type="button"
            className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-[#8C97AD]">This how your organization appears publicly.</p>
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
      <ToggleRow
        title="Two-factor Authentication"
        description="Add an extra layer of security"
        on={hub.twoFactorEnabled}
        onChange={(v) => {
          if (v) hub.setModal('enable2FA');
          else {
            hub.setTwoFactorEnabled(false);
            hub.markDirty();
          }
        }}
      />
      <div className="overflow-hidden rounded-[10px] border border-[#EEF2F8]">
        {ACTIVE_SESSIONS.map((session, i) => {
          const Icon = session.isCurrent ? Laptop : session.device.includes('iPhone') ? Smartphone : Monitor;
          return (
            <div
              key={session.id}
              className={cn('flex items-center gap-5 bg-white p-5', i < ACTIVE_SESSIONS.length - 1 && 'border-b border-[#EEF2F8]')}
            >
              <div className="flex min-w-0 flex-1 items-center gap-[26px]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6.667px] bg-[#EEF2F8] p-3">
                  <Icon className="h-6 w-6 text-[#44516A]" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#0F172A]">{session.device}</p>
                  <p className="mt-2 truncate whitespace-pre text-xs text-[#44516A]">{session.details}</p>
                </div>
              </div>
              {session.isCurrent ? (
                <span className="shrink-0 rounded-[4px] border border-[#D1FAE5] bg-[#ECFDF5] px-1.5 py-0.5 text-sm font-medium text-[#15803D]">
                  Active Now
                </span>
              ) : (
                <button
                  type="button"
                  className="shrink-0 rounded-[6px] border border-[#D9E1EF] bg-white px-2.5 py-1.5 text-sm font-medium text-[#2F66C8]"
                >
                  Sign Out
                </button>
              )}
            </div>
          );
        })}
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
            title="Team Activity"
            description="Get notified about team actions and updates"
            on={hub.notificationTypes.teamActivity}
            onChange={(v) => updateTypes(hub, { teamActivity: v })}
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

function TeamsPanel({ hub }: { hub: SettingsHub }) {
  return (
    <div className="flex flex-col gap-5">
      <FieldCell>
        <FieldLabel>Default Team Role</FieldLabel>
        <SelectField
          value={hub.team.defaultTeamRole}
          options={TEAM_ROLE_OPTIONS}
          onChange={(v) => updateTeam(hub, { defaultTeamRole: v })}
        />
      </FieldCell>
      <FieldCell>
        <FieldLabel>Invitation Expiration</FieldLabel>
        <SelectField
          value={hub.team.invitationExpiration}
          options={INVITATION_EXPIRY_OPTIONS}
          onChange={(v) => updateTeam(hub, { invitationExpiration: v })}
        />
      </FieldCell>
      <ToggleRow
        title="Require approval for invitations"
        description="New eam members must be approved before joining"
        on={hub.team.requireApprovalForInvitations}
        onChange={(v) => updateTeam(hub, { requireApprovalForInvitations: v })}
      />
      <FieldCell>
        <FieldLabel>Reviewer Assignment</FieldLabel>
        <SelectField
          value={hub.team.reviewerAssignment}
          options={REVIEWER_ASSIGNMENT_OPTIONS}
          onChange={(v) => updateTeam(hub, { reviewerAssignment: v })}
        />
      </FieldCell>
      <ToggleRow
        title="Auto-assign Roles"
        description="Distribute applications evenly among reviewers"
        on={hub.team.autoAssignRoles}
        onChange={(v) => updateTeam(hub, { autoAssignRoles: v })}
      />
      <FieldCell>
        <FieldLabel>Max Applications Per Reviewer</FieldLabel>
        <SelectField
          value={hub.team.maxApplicationsPerReviewer}
          options={MAX_APPS_OPTIONS}
          onChange={(v) => updateTeam(hub, { maxApplicationsPerReviewer: v })}
        />
      </FieldCell>
    </div>
  );
}

function IntegrationsPanel({ hub, mobile }: { hub: SettingsHub; mobile?: boolean }) {
  const pairs: (typeof hub.integrations)[] = [];
  for (let i = 0; i < hub.integrations.length; i += 2) {
    pairs.push(hub.integrations.slice(i, i + 2));
  }

  return (
    <div className="flex flex-col gap-5">
      {pairs.map((row, idx) => (
        <div key={idx} className={cn('grid gap-5', mobile ? 'grid-cols-1' : 'grid-cols-2')}>
          {row.map((item) => (
            <IntegrationCardView
              key={item.id}
              name={item.name}
              description={item.description}
              icon={item.icon}
              connected={item.connected}
              onToggle={() => hub.toggleIntegration(item.id)}
            />
          ))}
        </div>
      ))}
      <ActionRow
        title="API Access"
        description="Generate and manage API keys"
        actionLabel="Manage API Keys"
        onAction={() => {}}
      />
    </div>
  );
}

function DangerPanel({ hub, mobile }: { hub: SettingsHub; mobile?: boolean }) {
  const toggles = [
    { key: 'showOrganizationPublicly' as const, title: 'Show Organization Publicly', description: 'Toggle to make your organization visible to applicants.' },
    { key: 'allowSearchIndexing' as const, title: 'Allow Search Indexing', description: 'Toggle to make your organization appear in search.' },
    { key: 'displayTeamMembers' as const, title: 'Display Team Members', description: 'Show team members on public profile' },
    { key: 'publicAnalytics' as const, title: 'Public Analytics', description: 'Allow aggregated data to be used for insights.' },
    { key: 'showActiveOpportunitiesCount' as const, title: 'Show Active Opportunities Count', description: 'Display number of active opportunities publicly.' },
  ];

  const actions = [
    { id: 'archive', label: 'Archive Organization', button: 'Archive', icon: Archive, modal: 'archiveOrganization' as const },
    { id: 'transfer', label: 'Transfer Ownership', button: 'Transfer', icon: ArrowRightLeft, modal: null },
    { id: 'delete', label: 'Delete Organization', button: 'Delete', icon: Trash2, modal: 'deleteOrganization' as const },
  ];

  return (
    <div className="flex flex-col gap-5">
      {toggles.map((item) => (
        <ToggleRow
          key={item.key}
          title={item.title}
          description={item.description}
          on={hub.danger[item.key]}
          onChange={(v) => updateDanger(hub, { [item.key]: v })}
        />
      ))}
      <div className={cn('grid gap-2.5', mobile ? 'grid-cols-1' : 'grid-cols-3')}>
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
                onClick={() => action.modal && hub.setModal(action.modal)}
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
