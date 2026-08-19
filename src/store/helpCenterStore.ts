import { create } from 'zustand';

export type HelpCenterTab = 'search' | 'faq' | 'documentation' | 'video' | 'contact';

interface HelpCenterState {
  isOpen: boolean;
  tab: HelpCenterTab;
  reportOpen: boolean;
  reportSubmitted: boolean;
  open: (tab?: HelpCenterTab) => void;
  close: () => void;
  setTab: (tab: HelpCenterTab) => void;
  openReport: () => void;
  closeReport: () => void;
  submitReport: () => void;
}

export const useHelpCenterStore = create<HelpCenterState>((set) => ({
  isOpen: false,
  tab: 'search',
  reportOpen: false,
  reportSubmitted: false,

  open: (tab) =>
    set({ isOpen: true, tab: tab ?? 'search', reportOpen: false, reportSubmitted: false }),
  close: () => set({ isOpen: false, reportOpen: false, reportSubmitted: false }),
  setTab: (tab) => set({ tab }),

  openReport: () => set({ isOpen: false, reportOpen: true, reportSubmitted: false }),
  closeReport: () =>
    set((state) => ({
      reportOpen: false,
      reportSubmitted: false,
      isOpen: state.reportSubmitted ? false : true,
    })),
  submitReport: () => set({ reportSubmitted: true }),
}));
