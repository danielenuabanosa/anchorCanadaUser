'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

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

type RegisterFn = (state: BuilderNavState) => void;

const defaultState: BuilderNavState = {
  step: 0,
  backHref: '/opportunities',
  onContinue: () => {},
  continueDisabled: true,
  continueLabel: 'Continue',
  showMobileHelp: true,
};

/** Stable — step pages subscribe only to register, so nav updates do not re-render them. */
const BuilderNavRegisterContext = createContext<RegisterFn | null>(null);
/** Layout chrome reads current nav values. */
const BuilderNavStateContext = createContext<BuilderNavState>(defaultState);

export function BuilderNavProvider({ children }: { children: React.ReactNode }) {
  const [nav, setNav] = useState<BuilderNavState>(defaultState);

  const register = useCallback((state: BuilderNavState) => {
    setNav((prev) => {
      const sameSecondary =
        prev.secondaryAction?.label === state.secondaryAction?.label &&
        prev.secondaryAction?.disabled === state.secondaryAction?.disabled &&
        prev.secondaryAction?.onClick === state.secondaryAction?.onClick;

      if (
        prev.step === state.step &&
        prev.backHref === state.backHref &&
        prev.onContinue === state.onContinue &&
        prev.continueDisabled === state.continueDisabled &&
        prev.continueLabel === state.continueLabel &&
        prev.showMobileHelp === state.showMobileHelp &&
        prev.headerVariant === state.headerVariant &&
        sameSecondary
      ) {
        return prev;
      }
      return state;
    });
  }, []);

  return (
    <BuilderNavRegisterContext.Provider value={register}>
      <BuilderNavStateContext.Provider value={nav}>{children}</BuilderNavStateContext.Provider>
    </BuilderNavRegisterContext.Provider>
  );
}

export function useBuilderNav() {
  return useContext(BuilderNavStateContext);
}

/** Call from each builder step page to wire the shared top header. */
export function useRegisterBuilderNav(state: BuilderNavState) {
  const register = useContext(BuilderNavRegisterContext);
  if (!register) {
    throw new Error('useRegisterBuilderNav must be used within BuilderNavProvider');
  }

  const onContinueRef = useRef(state.onContinue);
  const secondaryOnClickRef = useRef(state.secondaryAction?.onClick);

  useEffect(() => {
    onContinueRef.current = state.onContinue;
    secondaryOnClickRef.current = state.secondaryAction?.onClick;
  }, [state.onContinue, state.secondaryAction?.onClick]);

  const stableContinue = useCallback(() => {
    onContinueRef.current();
  }, []);

  const stableSecondaryOnClick = useCallback(() => {
    secondaryOnClickRef.current?.();
  }, []);

  const hasSecondary = Boolean(state.secondaryAction);
  const secondaryLabel = state.secondaryAction?.label;
  const secondaryDisabled = state.secondaryAction?.disabled;

  useEffect(() => {
    register({
      step: state.step,
      backHref: state.backHref,
      onContinue: stableContinue,
      continueDisabled: state.continueDisabled,
      continueLabel: state.continueLabel,
      showMobileHelp: state.showMobileHelp,
      headerVariant: state.headerVariant,
      secondaryAction: hasSecondary
        ? {
            label: secondaryLabel ?? '',
            disabled: secondaryDisabled,
            onClick: stableSecondaryOnClick,
          }
        : undefined,
    });
  }, [
    register,
    stableContinue,
    stableSecondaryOnClick,
    state.step,
    state.backHref,
    state.continueDisabled,
    state.continueLabel,
    state.showMobileHelp,
    state.headerVariant,
    hasSecondary,
    secondaryLabel,
    secondaryDisabled,
  ]);
}
