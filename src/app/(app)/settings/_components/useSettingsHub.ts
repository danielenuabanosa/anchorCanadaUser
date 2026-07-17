'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_GENERAL,
  DEFAULT_NOTIFICATION_CHANNELS,
  DEFAULT_NOTIFICATION_TYPES,
  DEFAULT_ORGANIZATION,
  type GeneralSettings,
  type NotificationChannelSettings,
  type NotificationTypeSettings,
  type OrganizationSettings,
  type SettingsModal,
  type SettingsTab,
  type SettingsToast,
} from './settingsData';

function cloneDefaults() {
  return {
    general: { ...DEFAULT_GENERAL },
    organization: { ...DEFAULT_ORGANIZATION },
    notificationChannels: { ...DEFAULT_NOTIFICATION_CHANNELS },
    notificationTypes: { ...DEFAULT_NOTIFICATION_TYPES },
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
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannelSettings>(
    defaults.notificationChannels,
  );
  const [notificationTypes, setNotificationTypes] = useState<NotificationTypeSettings>(
    defaults.notificationTypes,
  );

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
  }, [defaults]);

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
    notificationChannels,
    setNotificationChannels,
    notificationTypes,
    setNotificationTypes,
    markDirty,
    saveChanges,
    resetTab,
    discardChanges,
  };
}

export type SettingsHub = ReturnType<typeof useSettingsHub>;
