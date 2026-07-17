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
import type { RequirementField } from '@/features/opportunity-builder/lib/requirementsData';
import {
  DEFAULT_APPLICATION_CONFIG,
  DEFAULT_DOCUMENT_REQUIREMENTS,
  documentToRequirementField,
  type DocumentRequirement,
  type RequirementsApplicationConfig,
} from '@/features/opportunity-builder/lib/documentRequirementsData';
import {
  DEFAULT_CATEGORY_CONFIG,
  type OpportunityCategoryConfig,
} from '@/features/opportunity-builder/lib/categoryConfigData';

export type OpportunityType = 'internal' | 'external' | 'express-interest';
export type WorkflowType = 'internal' | 'external' | 'express-interest';

type BuilderMutators =
  | 'setBuilderData'
  | 'resetBuilder'
  | 'setDetails'
  | 'initRequirementsFromTemplate'
  | 'addRequirement'
  | 'removeRequirement'
  | 'reorderRequirements'
  | 'updateRequirement'
  | 'setDocumentRequirements'
  | 'toggleDocument'
  | 'addCustomDocument'
  | 'setApplicationConfig'
  | 'setCategoryConfig'
  | 'removeDocument';

export interface OpportunityBuilderState {
  opportunityType: OpportunityType | null;
  category: string | null;
  template: string | null;
  requirements: string[];
  requirementFields: RequirementField[];
  documentRequirements: DocumentRequirement[];
  applicationConfig: RequirementsApplicationConfig;
  categoryConfig: OpportunityCategoryConfig;
  details: Record<string, string>;
  workflowType: WorkflowType | null;
  internalWorkflow: { stages: WorkflowStage[]; selectedStageId: string | null };
  externalWorkflow: ExternalWorkflowConfig;
  expressInterestWorkflow: ExpressInterestConfig;
  requirementsInitialized: boolean;
  setBuilderData: (
    data: Partial<Omit<OpportunityBuilderState, BuilderMutators>>,
  ) => void;
  setDetails: (patch: Partial<OpportunityDetails>) => void;
  initRequirementsFromTemplate: () => void;
  addRequirement: (field: RequirementField) => void;
  removeRequirement: (id: string) => void;
  reorderRequirements: (fields: RequirementField[]) => void;
  updateRequirement: (id: string, patch: Partial<RequirementField>) => void;
  setDocumentRequirements: (docs: DocumentRequirement[]) => void;
  toggleDocument: (id: string) => void;
  addCustomDocument: (doc: Omit<DocumentRequirement, 'id' | 'isCustom' | 'enabled'>) => void;
  removeDocument: (id: string) => void;
  setApplicationConfig: (patch: Partial<RequirementsApplicationConfig>) => void;
  setCategoryConfig: (patch: Partial<OpportunityCategoryConfig>) => void;
  resetBuilder: () => void;
}

function syncFromDocuments(docs: DocumentRequirement[]): {
  documentRequirements: DocumentRequirement[];
  requirementFields: RequirementField[];
  requirements: string[];
} {
  const enabled = docs.filter((d) => d.enabled);
  const requirementFields = enabled.map(documentToRequirementField);
  return {
    documentRequirements: docs,
    requirementFields,
    requirements: requirementFields.map((f) => f.title),
  };
}

const INITIAL: Omit<OpportunityBuilderState, BuilderMutators> = {
  opportunityType: null,
  category: null,
  template: null,
  requirements: [],
  requirementFields: [],
  documentRequirements: DEFAULT_DOCUMENT_REQUIREMENTS,
  applicationConfig: DEFAULT_APPLICATION_CONFIG,
  categoryConfig: DEFAULT_CATEGORY_CONFIG,
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
        const { requirementsInitialized, documentRequirements } = get();
        const docs =
          Array.isArray(documentRequirements) && documentRequirements.length > 0
            ? documentRequirements
            : DEFAULT_DOCUMENT_REQUIREMENTS;
        // Always repair missing/corrupt documents; skip only when already healthy.
        if (requirementsInitialized && Array.isArray(documentRequirements) && documentRequirements.length > 0) {
          return;
        }
        set({
          ...syncFromDocuments(docs),
          requirementsInitialized: true,
        });
      },
      addRequirement: (field) =>
        set((s) => {
          const requirementFields = [...s.requirementFields, field];
          return {
            requirementFields,
            requirements: requirementFields.map((f) => f.title),
          };
        }),
      removeRequirement: (id) =>
        set((s) => {
          const requirementFields = s.requirementFields.filter((f) => f.id !== id);
          return {
            requirementFields,
            requirements: requirementFields.map((f) => f.title),
          };
        }),
      reorderRequirements: (fields) =>
        set({
          requirementFields: fields,
          requirements: fields.map((f) => f.title),
        }),
      updateRequirement: (id, patch) =>
        set((s) => {
          const requirementFields = s.requirementFields.map((f) =>
            f.id === id ? { ...f, ...patch } : f,
          );
          return {
            requirementFields,
            requirements: requirementFields.map((f) => f.title),
          };
        }),
      setDocumentRequirements: (docs) => set(syncFromDocuments(docs)),
      toggleDocument: (id) =>
        set((s) => {
          const current = Array.isArray(s.documentRequirements)
            ? s.documentRequirements
            : DEFAULT_DOCUMENT_REQUIREMENTS;
          const docs = current.map((d) =>
            d.id === id
              ? {
                  ...d,
                  enabled: !d.enabled,
                  required: !d.enabled ? true : d.required,
                }
              : d,
          );
          return syncFromDocuments(docs);
        }),
      addCustomDocument: (doc) =>
        set((s) => {
          const current = Array.isArray(s.documentRequirements)
            ? s.documentRequirements
            : DEFAULT_DOCUMENT_REQUIREMENTS;
          const next: DocumentRequirement = {
            ...doc,
            id: `custom-${Date.now()}`,
            enabled: true,
            isCustom: true,
          };
          return syncFromDocuments([...current, next]);
        }),
      removeDocument: (id) =>
        set((s) => {
          const current = Array.isArray(s.documentRequirements)
            ? s.documentRequirements
            : DEFAULT_DOCUMENT_REQUIREMENTS;
          return syncFromDocuments(current.filter((d) => d.id !== id));
        }),
      setApplicationConfig: (patch) =>
        set((s) => {
          const applicationConfig = {
            ...DEFAULT_APPLICATION_CONFIG,
            ...(s.applicationConfig ?? {}),
            ...patch,
          };
          const workflowType =
            patch.applicationMode === undefined
              ? s.workflowType
              : patch.applicationMode === 'express-interest'
                ? 'express-interest'
                : s.opportunityType === 'external'
                  ? 'external'
                  : 'internal';
          return { applicationConfig, workflowType };
        }),
      setCategoryConfig: (patch) =>
        set((s) => ({
          categoryConfig: { ...s.categoryConfig, ...patch },
        })),
      resetBuilder: () => set(INITIAL),
    }),
    {
      name: 'provider-opportunity-builder',
      storage: createJSONStorage(() => sessionStorage),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<OpportunityBuilderState>;
        return {
          ...current,
          ...p,
          documentRequirements: Array.isArray(p.documentRequirements)
            ? p.documentRequirements
            : current.documentRequirements,
          requirementFields: Array.isArray(p.requirementFields)
            ? p.requirementFields
            : current.requirementFields,
          requirements: Array.isArray(p.requirements) ? p.requirements : current.requirements,
          applicationConfig: {
            ...DEFAULT_APPLICATION_CONFIG,
            ...(p.applicationConfig ?? {}),
          },
          categoryConfig: {
            ...DEFAULT_CATEGORY_CONFIG,
            ...(p.categoryConfig ?? {}),
          },
          details: p.details && typeof p.details === 'object' ? p.details : current.details,
          externalWorkflow: {
            ...DEFAULT_EXTERNAL_CONFIG,
            ...(p.externalWorkflow ?? {}),
          },
          expressInterestWorkflow: {
            ...DEFAULT_EXPRESS_CONFIG,
            ...(p.expressInterestWorkflow ?? {}),
          },
          internalWorkflow: {
            stages: Array.isArray(p.internalWorkflow?.stages)
              ? p.internalWorkflow.stages
              : current.internalWorkflow.stages,
            selectedStageId:
              p.internalWorkflow?.selectedStageId ?? current.internalWorkflow.selectedStageId,
          },
        };
      },
    },
  ),
);
