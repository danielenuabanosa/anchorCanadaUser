'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_DANGER,
  DEFAULT_GENERAL,
  DEFAULT_NOTIFICATION_CHANNELS,
  DEFAULT_NOTIFICATION_TYPES,
  DEFAULT_ORGANIZATION,
  DEFAULT_TEAM,
  INTEGRATION_CARDS,
  type DangerZoneSettings,
  type GeneralSettings,
  type IntegrationCard,
  type NotificationChannelSettings,
  type NotificationTypeSettings,
  type OrganizationSettings,
  type SettingsModal,
  type SettingsTab,
  type SettingsToast,
  type TeamSettings,
} from './settingsData';

function cloneDefaults() {
  return {
    general: { ...DEFAULT_GENERAL },
    organization: { ...DEFAULT_ORGANIZATION },
    team: { ...DEFAULT_TEAM },
    danger: { ...DEFAULT_DANGER },
    notificationChannels: { ...DEFAULT_NOTIFICATION_CHANNELS },
    notificationTypes: { ...DEFAULT_NOTIFICATION_TYPES },
    integrations: INTEGRATION_CARDS.map((c) => ({ ...c })),
    twoFactorEnabled: false,
  };
}

export function useSettingsHub() {
  const defaults = useMemo(() => cloneDefaults(), []);
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [modal, setModal] = useState<SettingsModal>(null);
  const [toast, setToast] = useState<SettingsToast>(null);
  const [dirty, setDirty] = useState(false);

  const [general, setGeneral] = useState<GeneralSettings>(defaults.general);
  const [organization, setOrganization] = useState<OrganizationSettings>(defaults.organization);
  const [team, setTeam] = useState<TeamSettings>(defaults.team);
  const [danger, setDanger] = useState<DangerZoneSettings>(defaults.danger);
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannelSettings>(
    defaults.notificationChannels,
  );
  const [notificationTypes, setNotificationTypes] = useState<NotificationTypeSettings>(
    defaults.notificationTypes,
  );
  const [integrations, setIntegrations] = useState<IntegrationCard[]>(defaults.integrations);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(defaults.twoFactorEnabled);

  const markDirty = useCallback(() => {
    setDirty(true);
    setToast('unsaved');
  }, []);

  const saveChanges = useCallback(() => {
    setDirty(false);
    setToast('success');
  }, []);

  const resetTab = useCallback(() => {
    if (activeTab === 'general') setGeneral({ ...defaults.general });
    if (activeTab === 'organization') setOrganization({ ...defaults.organization });
    if (activeTab === 'teams') setTeam({ ...defaults.team });
    setDirty(false);
    setToast(null);
  }, [activeTab, defaults]);

  const discardChanges = useCallback(() => {
    setGeneral({ ...defaults.general });
    setOrganization({ ...defaults.organization });
    setTeam({ ...defaults.team });
    setDanger({ ...defaults.danger });
    setNotificationChannels({ ...defaults.notificationChannels });
    setNotificationTypes({ ...defaults.notificationTypes });
    setIntegrations(defaults.integrations.map((c) => ({ ...c })));
    setTwoFactorEnabled(defaults.twoFactorEnabled);
    setDirty(false);
    setToast(null);
  }, [defaults]);

  const toggleIntegration = useCallback(
    (id: string) => {
      setIntegrations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item)),
      );
      markDirty();
    },
    [markDirty],
  );

  const enable2FA = useCallback(() => {
    setTwoFactorEnabled(true);
    setModal(null);
    markDirty();
  }, [markDirty]);

  return {
    activeTab,
    setActiveTab,
    modal,
    setModal,
    toast,
    setToast,
    dirty,
    general,
    setGeneral,
    organization,
    setOrganization,
    team,
    setTeam,
    danger,
    setDanger,
    notificationChannels,
    setNotificationChannels,
    notificationTypes,
    setNotificationTypes,
    integrations,
    toggleIntegration,
    twoFactorEnabled,
    setTwoFactorEnabled,
    markDirty,
    saveChanges,
    resetTab,
    discardChanges,
    enable2FA,
  };
}

export type SettingsHub = ReturnType<typeof useSettingsHub>;
