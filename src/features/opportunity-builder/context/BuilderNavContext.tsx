'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface BuilderNavAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface BuilderNavState {
  step: number;
  backHref: string;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
  showMobileHelp?: boolean;
  headerVariant?: 'default' | 'review';
  secondaryAction?: BuilderNavAction;
}

interface BuilderNavContextValue extends BuilderNavState {
  register: (state: BuilderNavState) => void;
}

const defaultState: BuilderNavState = {
  step: 0,
  backHref: '/opportunities',
  onContinue: () => {},
  continueDisabled: true,
  continueLabel: 'Continue',
  showMobileHelp: true,
};

const BuilderNavContext = createContext<BuilderNavContextValue | null>(null);

export function BuilderNavProvider({ children }: { children: React.ReactNode }) {
  const [nav, setNav] = useState<BuilderNavState>(defaultState);

  const register = useCallback((state: BuilderNavState) => {
    setNav(state);
  }, []);

  const value = useMemo(
    () => ({
      ...nav,
      register,
    }),
    [nav, register],
  );

  return <BuilderNavContext.Provider value={value}>{children}</BuilderNavContext.Provider>;
}

export function useBuilderNav() {
  const ctx = useContext(BuilderNavContext);
  if (!ctx) throw new Error('useBuilderNav must be used within BuilderNavProvider');
  return ctx;
}

/** Call from each builder step page to wire the shared top header. */
export function useRegisterBuilderNav(state: BuilderNavState) {
  const { register } = useBuilderNav();

  useEffect(() => {
    register(state);
  }, [
    register,
    state.step,
    state.backHref,
    state.onContinue,
    state.continueDisabled,
    state.continueLabel,
    state.showMobileHelp,
    state.headerVariant,
    state.secondaryAction,
  ]);
}
