'use client';

import { Check, CircleCheckBig, X } from 'lucide-react';
import { useOpportunityBuilderStore } from '@/store/opportunityBuilderStore';
import {
  getInternalJourneySteps,
  WORKFLOW_COMPARISON,
  type WorkflowModelDef,
} from '../lib/workflowData';

export function WorkflowModelCard({
  model,
  selected,
  onSelect,
  compact = false,
}: {
  model: WorkflowModelDef;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const Icon = model.icon;
  const requiresInterview = useOpportunityBuilderStore((s) => s.categoryConfig.requiresInterview);
  const journey =
    model.id === 'internal' ? getInternalJourneySteps(requiresInterview) : model.journey;

  if (compact) {
    return (
      <div
        className={`overflow-hidden rounded-[10px] border ${
          selected ? 'border-[#2F66C8] bg-[#F8FAFC]' : 'border-[#EEF2F8] bg-white'
        }`}
      >
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-5 pb-2.5">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-5">
                  <div
                    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[9px] p-2"
                    style={{ backgroundColor: model.iconBg }}
                  >
                    <Icon className="h-6 w-6" style={{ color: model.accentColor }} />
                  </div>
                  <p className="min-w-0 flex-1 font-sans text-[16px] font-semibold text-[#0F172A]">
                    {model.title}
                  </p>
                </div>
                <p className="font-sans text-[14px] leading-[1.6] text-[#44516A]">{model.description}</p>
              </div>
              <span
                className="inline-flex w-fit rounded-[4px] px-1.5 py-0.5 text-[12px] font-medium"
                style={{ backgroundColor: model.tagBg, color: model.tagColor }}
              >
                Applicant Journey
              </span>
            </div>

            <div className="flex flex-col gap-2.5 py-2.5">
              {journey.map((step) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-4">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full p-1.5"
                      style={{ backgroundColor: model.journeyStepBg }}
                    >
                      <StepIcon className="h-3.5 w-3.5" style={{ color: model.accentColor }} />
                    </div>
                    <p className="text-[14px] text-[#0F172A]">{step.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={onSelect}
            className={`flex w-full items-center justify-center gap-2 rounded-[10px] py-3 text-[14px] font-medium transition-colors ${
              selected
                ? 'bg-[#2F66C8] text-white'
                : 'border border-[#EEF2F8] bg-white text-[#2F66C8] hover:bg-[#EFF4FF]'
            }`}
          >
            {selected && <Check className="h-[18px] w-[18px]" strokeWidth={2.5} />}
            {selected ? 'Selected' : 'Select Workflow'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-[10px] border ${
        selected ? 'border-[#2F66C8] bg-[#F8FAFC]' : 'border-[#EEF2F8] bg-white'
      }`}
    >
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex items-start gap-4">
          <div
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[9px]"
            style={{ backgroundColor: model.iconBg }}
          >
            <Icon className="h-6 w-6" style={{ color: model.accentColor }} />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[16px] font-semibold text-[#0F172A]">{model.title}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[#44516A]">{model.description}</p>
          </div>
        </div>

        <span
          className="inline-flex w-fit rounded-[4px] px-1.5 py-0.5 text-[12px] font-medium"
          style={{ backgroundColor: model.tagBg, color: model.tagColor }}
        >
          Applicant Journey
        </span>

        <div className="flex flex-col gap-3 py-2">
          {journey.map((step) => {
            const StepIcon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-4">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: model.iconBg }}
                >
                  <StepIcon className="h-3.5 w-3.5" style={{ color: model.accentColor }} />
                </div>
                <p className="text-[14px] text-[#0F172A]">{step.label}</p>
              </div>
            );
          })}
        </div>

        <div className="text-[14px] text-[#0F172A]">
          <p className="font-semibold">Best For:</p>
          <ul className="mt-1 list-disc pl-5">
            {model.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={`mx-5 mb-5 flex items-center justify-center gap-2 rounded-[10px] py-3 text-[14px] font-medium transition-colors ${
          selected
            ? 'bg-[#2F66C8] text-white'
            : 'border border-[#EEF2F8] bg-white text-[#2F66C8] hover:bg-[#EFF4FF]'
        }`}
      >
        {selected && <Check className="h-4 w-4" />}
        {selected ? 'Selected' : 'Select Workflow'}
      </button>
    </div>
  );
}

function ComparisonCell({ value }: { value: string }) {
  const unavailable = value === 'Not Available';

  return (
    <div className="flex items-center gap-2.5 py-4">
      {unavailable ? (
        <X className="h-[18px] w-[18px] shrink-0 text-[#EF4444]" strokeWidth={2} />
      ) : (
        <CircleCheckBig className="h-[18px] w-[18px] shrink-0 text-[#22C55E]" strokeWidth={2} />
      )}
      <span className={unavailable ? 'text-[#44516A]' : 'text-[#0F172A]'}>{value}</span>
    </div>
  );
}

export function WorkflowComparisonTable({ expanded }: { expanded: boolean }) {
  if (!expanded) return null;

  const { features, values } = WORKFLOW_COMPARISON;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-[#EEF2F8]">
            <th className="py-4 font-medium text-[#0F172A]">Features</th>
            <th className="py-4 font-medium text-[#1B44DE]">Internal Workflow</th>
            <th className="py-4 font-medium text-[#422EC0]">External Workflow</th>
            <th className="py-4 font-medium text-[#1A7945]">Express Interest Workflow</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr key={feature} className="border-b border-[#EEF2F8] last:border-0">
              <td className="py-4 text-[#44516A]">{feature}</td>
              <td>
                <ComparisonCell value={values.internal[i]} />
              </td>
              <td>
                <ComparisonCell value={values.external[i]} />
              </td>
              <td>
                <ComparisonCell value={values['express-interest'][i]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
