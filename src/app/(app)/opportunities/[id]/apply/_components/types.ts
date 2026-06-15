export type FlowType = 'internal' | 'external' | 'express';

export type ApplyStep = 1 | 2 | 3 | 4;

export const FLOW_STEPS: Record<FlowType, number> = {
  internal: 4,
  external: 4,
  express: 4,
};

export const INTERNAL_STEP_LABELS = ['Checklist', 'Documents', 'Questions', 'Review'];
export const EXTERNAL_STEP_LABELS = ['Checklist', 'Overview', 'Redirect', 'Tracking'];
export const EXPRESS_STEP_LABELS = ['Checklist', 'Profile', 'Message', 'Track'];
