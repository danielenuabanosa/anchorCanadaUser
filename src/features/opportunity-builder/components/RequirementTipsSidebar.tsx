'use client';

import { Lightbulb } from 'lucide-react';
import { REQUIREMENTS_TIPS } from '@/features/opportunity-builder/lib/requirementsData';
import type { RequirementField } from '@/features/opportunity-builder/lib/requirementsData';
import { getRequirementType } from '@/features/opportunity-builder/lib/requirementsData';

interface RequirementTipsSidebarProps {
  fields: RequirementField[];
  compact?: boolean;
}

export function RequirementTipsSidebar({ fields, compact = false }: RequirementTipsSidebarProps) {
  const requiredCount = fields.filter((f) => f.required).length;
  const optionalCount = fields.length - requiredCount;

  return (
    <aside className={`flex flex-col gap-5 ${compact ? '' : 'lg:sticky lg:top-6 lg:w-[320px] lg:shrink-0'}`}>
      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
        <p className="font-sans text-[16px] font-semibold text-[#0F172A]">Application Preview</p>
        <p className="mt-1 font-sans text-[13px] text-[#8C97AD]">
          How applicants will see your requirements
        </p>

        <div className="mt-4 flex gap-3">
          <div className="flex-1 rounded-[8px] bg-[#EFF4FF] px-3 py-2 text-center">
            <p className="text-[20px] font-semibold text-[#2F66C8]">{requiredCount}</p>
            <p className="text-[11px] text-[#44516A]">Required</p>
          </div>
          <div className="flex-1 rounded-[8px] bg-[#F8FAFC] px-3 py-2 text-center">
            <p className="text-[20px] font-semibold text-[#44516A]">{optionalCount}</p>
            <p className="text-[11px] text-[#44516A]">Optional</p>
          </div>
        </div>

        <ul className="mt-4 flex max-h-[240px] flex-col gap-2 overflow-y-auto">
          {fields.length === 0 ? (
            <li className="rounded-[8px] bg-[#F8FAFC] px-3 py-4 text-center text-[13px] text-[#8C97AD]">
              Add requirements to preview the application form
            </li>
          ) : (
            fields.map((field) => {
              const typeDef = getRequirementType(field.typeId);
              const Icon = typeDef?.icon;
              return (
                <li
                  key={field.id}
                  className="flex items-center gap-2.5 rounded-[8px] border border-[#EEF2F8] px-3 py-2.5"
                >
                  {Icon && (
                    <Icon className="h-4 w-4 shrink-0" style={{ color: typeDef?.iconColor }} />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-[#0F172A]">{field.title}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-[4px] px-1.5 py-0.5 text-[10px] font-medium ${
                      field.required
                        ? 'bg-[#EFF4FF] text-[#2F66C8]'
                        : 'bg-[#F8FAFC] text-[#8C97AD]'
                    }`}
                  >
                    {field.required ? 'Req' : 'Opt'}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <div className="rounded-[10px] border border-[#EAF0FD] bg-[#F5F8FE] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5EEFF]">
            <Lightbulb className="h-5 w-5 text-[#2F66C8]" />
          </div>
          <p className="font-sans text-[15px] font-semibold text-[#0F172A]">Tips</p>
        </div>
        <ul className="mt-4 flex flex-col gap-4">
          {REQUIREMENTS_TIPS.map((tip) => (
            <li key={tip.title}>
              <p className="font-sans text-[14px] font-medium text-[#0F172A]">{tip.title}</p>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#44516A]">{tip.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
