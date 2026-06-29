'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  DEFAULT_EXPRESS_CONFIG,
  DEFAULT_EXTERNAL_CONFIG,
  DEFAULT_INTERNAL_STAGES,
  type ExpressInterestConfig,
  type ExternalWorkflowConfig,
  type WorkflowStage,
} from '@/features/opportunity-builder/lib/workflowData';
import type { OpportunityDetails } from '@/features/opportunity-builder/lib/detailsData';
import {
  getDefaultRequirementsForTemplate,
  type RequirementField,
} from '@/features/opportunity-builder/lib/requirementsData';

export type OpportunityType = 'internal' | 'external' | 'express-interest';
export type WorkflowType = 'internal' | 'external' | 'express-interest';

export interface OpportunityBuilderState {
  opportunityType: OpportunityType | null;
  category: string | null;
  template: string | null;
  requirements: string[];
  requirementFields: RequirementField[];
  details: Record<string, string>;
  workflowType: WorkflowType | null;
  internalWorkflow: { stages: WorkflowStage[]; selectedStageId: string | null };
  externalWorkflow: ExternalWorkflowConfig;
  expressInterestWorkflow: ExpressInterestConfig;
  requirementsInitialized: boolean;
  setBuilderData: (data: Partial<Omit<OpportunityBuilderState, 'setBuilderData' | 'resetBuilder' | 'setDetails' | 'initRequirementsFromTemplate' | 'addRequirement' | 'removeRequirement' | 'reorderRequirements' | 'updateRequirement'>>) => void;
  setDetails: (patch: Partial<OpportunityDetails>) => void;
  initRequirementsFromTemplate: () => void;
  addRequirement: (field: RequirementField) => void;
  removeRequirement: (id: string) => void;
  reorderRequirements: (fields: RequirementField[]) => void;
  updateRequirement: (id: string, patch: Partial<RequirementField>) => void;
  resetBuilder: () => void;
}

const INITIAL: Omit<
  OpportunityBuilderState,
  | 'setBuilderData'
  | 'resetBuilder'
  | 'setDetails'
  | 'initRequirementsFromTemplate'
  | 'addRequirement'
  | 'removeRequirement'
  | 'reorderRequirements'
  | 'updateRequirement'
> = {
  opportunityType: null,
  category: null,
  template: null,
  requirements: [],
  requirementFields: [],
  details: {},
  workflowType: null,
  internalWorkflow: {
    stages: DEFAULT_INTERNAL_STAGES,
    selectedStageId: DEFAULT_INTERNAL_STAGES[4]?.id ?? null,
  },
  externalWorkflow: DEFAULT_EXTERNAL_CONFIG,
  expressInterestWorkflow: DEFAULT_EXPRESS_CONFIG,
  requirementsInitialized: false,
};

function syncRequirementTitles(fields: RequirementField[]): string[] {
  return fields.map((f) => f.title);
}

export const useOpportunityBuilderStore = create<OpportunityBuilderState>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      setBuilderData: (data) => set((s) => ({ ...s, ...data })),
      setDetails: (patch) =>
        set((s) => {
          const merged = { ...s.details };
          for (const [key, value] of Object.entries(patch)) {
            merged[key] = typeof value === 'boolean' ? String(value) : String(value ?? '');
          }
          return { details: merged };
        }),
      initRequirementsFromTemplate: () => {
        const { template, requirementsInitialized } = get();
        if (requirementsInitialized) return;
        const fields = getDefaultRequirementsForTemplate(template);
        set({
          requirementFields: fields,
          requirements: syncRequirementTitles(fields),
          requirementsInitialized: true,
        });
      },
      addRequirement: (field) =>
        set((s) => {
          const requirementFields = [...s.requirementFields, field];
          return {
            requirementFields,
            requirements: syncRequirementTitles(requirementFields),
          };
        }),
      removeRequirement: (id) =>
        set((s) => {
          const requirementFields = s.requirementFields.filter((f) => f.id !== id);
          return {
            requirementFields,
            requirements: syncRequirementTitles(requirementFields),
          };
        }),
      reorderRequirements: (fields) =>
        set({
          requirementFields: fields,
          requirements: syncRequirementTitles(fields),
        }),
      updateRequirement: (id, patch) =>
        set((s) => {
          const requirementFields = s.requirementFields.map((f) =>
            f.id === id ? { ...f, ...patch } : f,
          );
          return {
            requirementFields,
            requirements: syncRequirementTitles(requirementFields),
          };
        }),
      resetBuilder: () => set(INITIAL),
    }),
    {
      name: 'provider-opportunity-builder',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
