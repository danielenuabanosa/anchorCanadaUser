'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_COMPLETION_CHECKLIST,
  DEFAULT_GENERAL,
  DEFAULT_NOTIFICATION_CHANNELS,
  DEFAULT_NOTIFICATION_TYPES,
  DEFAULT_ORGANIZATION,
  type ActiveSession,
  type CompletionChecklistItem,
  type GeneralSettings,
  type NotificationChannelSettings,
  type NotificationTypeSettings,
  type OrganizationSettings,
  type SettingsModal,
  type SettingsTab,
  type SettingsToast,
} from './settingsData';
import { providerApi } from '@/features/provider/services/providerApi';
import { isStaticMode } from '@/lib/staticMode';

function cloneDefaults() {
  return {
    general: { ...DEFAULT_GENERAL },
    organization: { ...DEFAULT_ORGANIZATION },
    notificationChannels: { ...DEFAULT_NOTIFICATION_CHANNELS },
    notificationTypes: { ...DEFAULT_NOTIFICATION_TYPES },
  };
}

function mapApiSettingsToGeneral(settings: {
  organizationName?: string;
  organizationEmail?: string;
  timezone?: string;
  currency?: string;
  language?: string;
  timeFormat?: string;
  dateFormat?: string;
  weekStartsOn?: string;
}): Partial<GeneralSettings> {
  return {
    organizationName: settings.organizationName || undefined,
    organizationEmail: settings.organizationEmail || undefined,
    timeZone: settings.timezone || undefined,
    currency: settings.currency || undefined,
    defaultLanguage: settings.language || undefined,
    timeFormat:
      settings.timeFormat === '24h'
        ? '24 Hour (e.g. 14:30)'
        : settings.timeFormat === '12h'
          ? '12 Hour (e.g. 02:30 PM)'
          : undefined,
    dateFormat: settings.dateFormat || undefined,
    weekStartsOn:
      settings.weekStartsOn === 'sunday'
        ? 'Sunday'
        : settings.weekStartsOn === 'monday'
          ? 'Monday'
          : undefined,
  };
}

function checklistFromOrgVerification(
  items?: Array<{ id?: string; title?: string; status?: string }> | null,
): CompletionChecklistItem[] | null {
  if (!items?.length) return null;
  return items.map((item, index) => ({
    id: item.id || `item-${index}`,
    label: item.title || 'Verification item',
    completed: item.status !== 'not_submitted',
  }));
}

export function useSettingsHub() {
  const defaults = useMemo(() => cloneDefaults(), []);
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [modal, setModal] = useState<SettingsModal>(null);
  const [toast, setToast] = useState<SettingsToast>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const [general, setGeneral] = useState<GeneralSettings>(defaults.general);
  const [organization, setOrganization] = useState<OrganizationSettings>(defaults.organization);
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannelSettings>(
    defaults.notificationChannels,
  );
  const [notificationTypes, setNotificationTypes] = useState<NotificationTypeSettings>(
    defaults.notificationTypes,
  );
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [completionChecklist, setCompletionChecklist] = useState<CompletionChecklistItem[]>(
    DEFAULT_COMPLETION_CHECKLIST,
  );

  const load = useCallback(async () => {
    if (isStaticMode()) return;
    try {
      const [settings, org, prefs, sessionRes] = await Promise.all([
        providerApi.getSettings() as Promise<Record<string, string>>,
        providerApi.getOrganization() as Promise<{
          organizationName?: string;
          completion?: number;
          logoUrl?: string | null;
          coverUrl?: string | null;
          profile?: {
            email?: string;
            website?: string;
            logoUrl?: string | null;
            coverUrl?: string | null;
          };
          verification?: {
            items?: Array<{ id?: string; title?: string; status?: string }>;
          };
        } | null>,
        providerApi.getNotificationPreferences() as Promise<{
          emailEnabled?: boolean;
          pushEnabled?: boolean;
          categories?: Record<string, boolean>;
        }>,
        providerApi.listSessions(),
      ]);

      const mapped = mapApiSettingsToGeneral(settings);
      const nextGeneral: GeneralSettings = {
        ...defaults.general,
        ...Object.fromEntries(Object.entries(mapped).filter(([, v]) => Boolean(v))),
        organizationName:
          mapped.organizationName || org?.organizationName || defaults.general.organizationName,
        organizationEmail:
          mapped.organizationEmail || org?.profile?.email || defaults.general.organizationEmail,
      };
      setGeneral(nextGeneral);

      const nextOrg: OrganizationSettings = {
        logoUrl: org?.logoUrl || org?.profile?.logoUrl || null,
        coverUrl: org?.coverUrl || org?.profile?.coverUrl || null,
        publicProfileUrl: settings.website || org?.profile?.website || '',
      };
      setOrganization(nextOrg);

      const nextChannels: NotificationChannelSettings = {
        emailNotifications: prefs?.emailEnabled ?? true,
        pushNotifications: prefs?.pushEnabled ?? true,
      };
      if (prefs) {
        setNotificationChannels(nextChannels);
        const cats = prefs.categories ?? {};
        setNotificationTypes({
          applicationUpdates: cats.applicationUpdates ?? true,
          opportunityUpdates: cats.opportunityUpdates ?? true,
          analyticsReports: cats.analyticsReports ?? true,
          securityAlerts: cats.securityAlerts ?? true,
          marketingTips: cats.marketingTips ?? false,
        });
      }

      const nextSessions = (sessionRes?.data ?? []).map((s) => ({
        id: s.id,
        device: s.device,
        details: [s.location, s.lastActiveAt ? new Date(s.lastActiveAt).toLocaleString() : '']
          .filter(Boolean)
          .join('  •  '),
        isCurrent: Boolean(s.current),
      }));
      setSessions(nextSessions);

      setProfileCompletion(typeof org?.completion === 'number' ? org.completion : 0);
      setCompletionChecklist(
        checklistFromOrgVerification(org?.verification?.items) ?? DEFAULT_COMPLETION_CHECKLIST,
      );
    } catch {
      /* keep defaults */
    }
  }, [defaults.general]);

  useEffect(() => {
    void load();
  }, [load]);

  const markDirty = useCallback(() => {
    setDirty(true);
    setToast('unsaved');
  }, []);

  const saveChanges = useCallback(async () => {
    setSaving(true);
    try {
      if (!isStaticMode()) {
        await Promise.all([
          providerApi.updateSettings({
            organizationName: general.organizationName,
            organizationEmail: general.organizationEmail,
            timezone: general.timeZone,
            currency: general.currency,
            language: general.defaultLanguage,
            timeFormat: general.timeFormat.toLowerCase().includes('24') ? '24h' : '12h',
            dateFormat: general.dateFormat,
            weekStartsOn: general.weekStartsOn.toLowerCase().startsWith('sun')
              ? 'sunday'
              : 'monday',
            website: organization.publicProfileUrl,
          }),
          providerApi.updateOrganization({
            organizationName: general.organizationName,
            profile: {
              name: general.organizationName,
              email: general.organizationEmail,
              website: organization.publicProfileUrl,
            },
          }),
          providerApi.updateNotificationPreferences({
            emailEnabled: notificationChannels.emailNotifications,
            pushEnabled: notificationChannels.pushNotifications,
            categories: {
              applicationUpdates: notificationTypes.applicationUpdates,
              opportunityUpdates: notificationTypes.opportunityUpdates,
              analyticsReports: notificationTypes.analyticsReports,
              securityAlerts: notificationTypes.securityAlerts,
              marketingTips: notificationTypes.marketingTips,
            },
          }),
        ]);
      }
      setDirty(false);
      setToast('success');
      await load();
    } catch {
      setToast('unsaved');
    } finally {
      setSaving(false);
    }
  }, [general, organization, notificationChannels, notificationTypes, load]);

  const uploadLogo = useCallback(
    async (file: File | null) => {
      if (!file) return;
      setUploadingLogo(true);
      try {
        const result = await providerApi.uploadOrganizationLogo(file);
        const url = result.logoUrl || result.profile?.logoUrl || null;
        if (url) {
          setOrganization((prev) => ({ ...prev, logoUrl: url }));
          markDirty();
        }
        await load();
      } catch {
        setToast('unsaved');
      } finally {
        setUploadingLogo(false);
      }
    },
    [load, markDirty],
  );

  const uploadCover = useCallback(
    async (file: File | null) => {
      if (!file) return;
      setUploadingCover(true);
      try {
        const result = await providerApi.uploadOrganizationCover(file);
        const url = result.coverUrl || result.profile?.coverUrl || null;
        if (url) {
          setOrganization((prev) => ({ ...prev, coverUrl: url }));
          markDirty();
        }
        await load();
      } catch {
        setToast('unsaved');
      } finally {
        setUploadingCover(false);
      }
    },
    [load, markDirty],
  );

  const revokeSession = useCallback(
    async (id: string) => {
      try {
        if (!isStaticMode() && id !== 'current') {
          await providerApi.revokeSession(id);
        }
        setSessions((prev) => prev.filter((s) => s.id !== id));
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const resetTab = useCallback(() => {
    if (activeTab === 'general') setGeneral({ ...defaults.general });
    if (activeTab === 'organization') setOrganization({ ...defaults.organization });
    setDirty(false);
    setToast(null);
  }, [activeTab, defaults]);

  const discardChanges = useCallback(() => {
    setGeneral({ ...defaults.general });
    setOrganization({ ...defaults.organization });
    setNotificationChannels({ ...defaults.notificationChannels });
    setNotificationTypes({ ...defaults.notificationTypes });
    setDirty(false);
    setToast(null);
    void load();
  }, [defaults, load]);

  return {
    activeTab,
    setActiveTab,
    modal,
    setModal,
    toast,
    setToast,
    dirty,
    saving,
    uploadingLogo,
    uploadingCover,
    general,
    setGeneral,
    organization,
    setOrganization,
    notificationChannels,
    setNotificationChannels,
    notificationTypes,
    setNotificationTypes,
    sessions,
    profileCompletion,
    completionChecklist,
    markDirty,
    saveChanges,
    uploadLogo,
    uploadCover,
    revokeSession,
    resetTab,
    discardChanges,
  };
}

export type SettingsHub = ReturnType<typeof useSettingsHub>;
