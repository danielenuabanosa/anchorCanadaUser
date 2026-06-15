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

export function useApplyRouting() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const flow = parseFlow(searchParams.get('flow'));
  const step = parseStep(searchParams.get('step'));
  const totalSteps = FLOW_STEPS[flow];

  const basePath = `/opportunities/${params.id}/apply`;

  const navigate = useCallback(
    (nextFlow: FlowType, nextStep: ApplyStep, extra?: Record<string, string>) => {
      const qs = new URLSearchParams({ flow: nextFlow, step: String(nextStep) });
      if (extra) {
        Object.entries(extra).forEach(([k, v]) => qs.set(k, v));
      }
      router.push(`${basePath}?${qs.toString()}`);
    },
    [basePath, router],
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
    router.push(`/opportunities/${params.id}`);
  }, [goToStep, params.id, router, step]);

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
    opportunityId: params.id,
  };
}
