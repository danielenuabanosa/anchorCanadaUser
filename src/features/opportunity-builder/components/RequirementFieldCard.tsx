'use client';

import { useState } from 'react';
import { ChevronDown, GripVertical, Pencil, Trash2 } from 'lucide-react';
import type { RequirementField } from '@/features/opportunity-builder/lib/requirementsData';
import { getRequirementType } from '@/features/opportunity-builder/lib/requirementsData';

interface RequirementFieldCardProps {
  field: RequirementField;
  onRequiredChange: (required: boolean) => void;
  onDelete: () => void;
  onEdit?: () => void;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  isDragging?: boolean;
  isDropTarget?: boolean;
}

export function RequirementFieldCard({
  field,
  onRequiredChange,
  onDelete,
  onEdit,
  draggable = true,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging = false,
  isDropTarget = false,
}: RequirementFieldCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const typeDef = getRequirementType(field.typeId);
  const Icon = typeDef?.icon;

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`flex flex-col gap-3 rounded-[10px] border bg-white p-4 transition-all sm:flex-row sm:items-center sm:justify-between ${
        isDragging ? 'opacity-50' : ''
      } ${isDropTarget ? 'border-[#2F66C8] shadow-[0_0_0_2px_#2F66C8]/20' : 'border-[#EEF2F8]'}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <GripVertical className="hidden h-6 w-6 shrink-0 cursor-grab text-[#8C97AD] active:cursor-grabbing sm:block" />
        <div
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[10px]"
          style={{ backgroundColor: typeDef?.iconBg ?? '#EFF4FF' }}
        >
          {Icon && (
            <Icon className="h-6 w-6" style={{ color: typeDef?.iconColor ?? '#2F66C8' }} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[16px] font-medium text-[#0F172A]">{field.title}</p>
          <p className="mt-1 truncate font-sans text-[14px] text-[#44516A]">{field.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 sm:gap-10">
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center gap-2.5 rounded-[6px] border border-[#EEF2F8] bg-white px-4 py-2.5 text-[14px] text-[#44516A]"
          >
            {field.required ? 'Required' : 'Optional'}
            <ChevronDown className="h-4 w-4" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-[6px] border border-[#EEF2F8] bg-white py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    onRequiredChange(true);
                    setMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-[14px] text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  Required
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRequiredChange(false);
                    setMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-[14px] text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  Optional
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Edit requirement"
          >
            <Pencil className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[6px] border border-[#EEF2F8] bg-white text-[#EF4444] hover:bg-[#FEF2F2]"
            aria-label="Delete requirement"
          >
            <Trash2 className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
