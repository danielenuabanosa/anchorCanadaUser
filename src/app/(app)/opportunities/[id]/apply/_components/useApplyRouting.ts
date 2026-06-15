'use client';

import { useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type { ApplyStep, FlowType } from './types';
import { FLOW_STEPS } from './types';

const FLOWS: FlowType[] = ['internal', 'external', 'express'];

function parseFlow(value: string | null): FlowType {
  if (value && FLOWS.includes(value as FlowType)) return value as FlowType;
  return 'internal';
}

function parseStep(value: string | null): ApplyStep {
  const n = Number(value);
  if (n >= 1 && n <= 4) return n as ApplyStep;
  return 1;
}

export type ApplyRoutingMode = 'overlay' | 'page';

export function useApplyRouting(mode: ApplyRoutingMode = 'page') {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const flow = parseFlow(searchParams.get('flow'));
  const step = parseStep(searchParams.get('step'));
  const totalSteps = FLOW_STEPS[flow];

  const basePath =
    mode === 'overlay' ? `/opportunities/${params.id}` : `/opportunities/${params.id}/apply`;

  const closeApply = useCallback(() => {
    router.push(`/opportunities/${params.id}`);
  }, [params.id, router]);

  const navigate = useCallback(
    (nextFlow: FlowType, nextStep: ApplyStep, extra?: Record<string, string>) => {
      const qs = new URLSearchParams({ flow: nextFlow, step: String(nextStep) });
      if (mode === 'overlay') qs.set('apply', '1');
      if (extra) {
        Object.entries(extra).forEach(([k, v]) => qs.set(k, v));
      }
      router.push(`${basePath}?${qs.toString()}`);
    },
    [basePath, mode, router],
  );

  const goToStep = useCallback(
    (nextStep: ApplyStep) => navigate(flow, nextStep),
    [flow, navigate],
  );

  const goBack = useCallback(() => {
    if (step > 1) {
      goToStep((step - 1) as ApplyStep);
      return;
    }
    closeApply();
  }, [closeApply, goToStep, step]);

  const progressPct = (step / totalSteps) * 100;

  return {
    flow,
    step,
    totalSteps,
    progressPct,
    basePath,
    navigate,
    goToStep,
    goBack,
    closeApply,
    opportunityId: params.id,
  };
}

export function buildApplyHref(opportunityId: string, flow: FlowType, step: ApplyStep = 1) {
  const qs = new URLSearchParams({ apply: '1', flow, step: String(step) });
  return `/opportunities/${opportunityId}?${qs.toString()}`;
}
