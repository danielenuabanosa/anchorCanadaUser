'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { BuilderDeleteModal } from './BuilderDeleteModal';
import { RequirementFieldCard } from './RequirementFieldCard';
import { RequirementSettingsPanel } from './RequirementSettingsPanel';
import { AddRequirementsModal } from './RequirementTypeLibrary';
import type { RequirementField } from '@/features/opportunity-builder/lib/requirementsData';


interface RequirementListBuilderProps {

  fields: RequirementField[];

  onReorder: (fields: RequirementField[]) => void;

  onUpdate: (id: string, patch: Partial<RequirementField>) => void;

  onRemove: (id: string) => void;

  onAdd: (fields: RequirementField[]) => void;

  title?: string;

  subtitle?: string;

  showStepBadge?: boolean;

}



export function RequirementListBuilder({

  fields,

  onReorder,

  onUpdate,

  onRemove,

  onAdd,

  title = 'Recommended Requirements',

  subtitle = 'These requirements come pre-filled from your selected template.',

  showStepBadge = true,

}: RequirementListBuilderProps) {

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RequirementField | null>(null);


  const editingField = fields.find((f) => f.id === editingId) ?? null;



  function handleDragStart(index: number) {

    setDragIndex(index);

  }



  function handleDragOver(e: React.DragEvent, index: number) {

    e.preventDefault();

    setDropIndex(index);

  }



  function handleDrop(index: number) {

    if (dragIndex !== null && dragIndex !== index) {

      const next = [...fields];

      const [moved] = next.splice(dragIndex, 1);

      next.splice(index, 0, moved);

      onReorder(next);

    }

    setDragIndex(null);

    setDropIndex(null);

  }



  return (

    <>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex gap-5">

            {showStepBadge && (

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8865F1] text-[18px] font-semibold text-white">

                1

              </div>

            )}

            <div>

              <p className="font-sans text-[18px] font-semibold text-[#0F172A]">{title}</p>

              <p className="mt-2 font-sans text-[14px] text-[#44516A]">{subtitle}</p>

            </div>

          </div>

          <button

            type="button"

            onClick={() => setModalOpen(true)}

            className="inline-flex shrink-0 items-center gap-2 text-[14px] font-medium text-[#2F66C8] hover:underline"

          >

            <Plus className="h-[18px] w-[18px]" />

            Add Custom Requirements

          </button>

        </div>



        <div className="mt-10 flex flex-col gap-2.5">

          {fields.length === 0 ? (

            <div className="rounded-[10px] border border-dashed border-[#D9E1EF] bg-[#F8FAFC] px-6 py-10 text-center">

              <p className="font-sans text-[16px] text-[#44516A]">No requirements added yet.</p>

              <button

                type="button"

                onClick={() => setModalOpen(true)}

                className="mt-3 text-[14px] font-medium text-[#2F66C8] hover:underline"

              >

                Add your first requirement

              </button>

            </div>

          ) : (

            fields.map((field, index) => (

              <RequirementFieldCard

                key={field.id}

                field={field}

                isDragging={dragIndex === index}

                isDropTarget={dropIndex === index && dragIndex !== index}

                onDragStart={() => handleDragStart(index)}

                onDragOver={(e) => handleDragOver(e, index)}

                onDrop={() => handleDrop(index)}

                onRequiredChange={(required) => onUpdate(field.id, { required })}

                onDelete={() => setDeleteTarget(field)}

                onEdit={() => setEditingId(field.id)}

              />

            ))

          )}

        </div>



        {fields.length > 0 && (

          <p className="mt-5 text-center font-sans text-[12px] text-[#8C97AD]">

            Drag and drop to reorder requirements

          </p>

        )}

      </div>



      <AddRequirementsModal

        open={modalOpen}

        onClose={() => setModalOpen(false)}

        existingTypeIds={fields.map((f) => f.typeId)}

        onAdd={(newFields) => {

          onAdd(newFields);

          setModalOpen(false);

        }}

      />



      <RequirementSettingsPanel
        field={editingField}
        open={editingId !== null}
        onClose={() => setEditingId(null)}
        onSave={(patch) => {
          if (editingId) onUpdate(editingId, patch);
        }}
      />

      <BuilderDeleteModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) onRemove(deleteTarget.id);
        }}
        accentWord="Requirement"
        descriptionLines={[
          'This action may affect your application form and applicant experience.',
          'This action cannot be undone.',
        ]}
        itemTitle={deleteTarget?.title ?? ''}
        itemSubtitle={deleteTarget?.description}
        itemBadge={deleteTarget?.required ? 'Required' : 'Optional'}
        confirmLabel="Delete Requirement"
      />
    </>
  );
}