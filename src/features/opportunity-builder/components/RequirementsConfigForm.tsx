'use client';

import { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BuilderDeleteModal } from '@/features/opportunity-builder/components/BuilderDeleteModal';
import { CustomDocumentModal } from '@/features/opportunity-builder/components/CustomDocumentModal';
import { BuilderMenuSelect } from '@/features/opportunity-builder/components/BuilderMenuSelect';
import {
  ESTIMATED_TIME_OPTIONS,
  type DocumentRequirement,
  type RequirementsApplicationConfig,
} from '@/features/opportunity-builder/lib/documentRequirementsData';

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked ? 'left-[22px]' : 'left-0.5',
        )}
      />
    </button>
  );
}

function DocumentRow({
  doc,
  onToggle,
  onRequestDelete,
}: {
  doc: DocumentRequirement;
  onToggle: () => void;
  onRequestDelete?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#EEF2F8] px-4 py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[15px] font-medium text-[#0F172A]">{doc.title}</p>
          {doc.isCustom && onRequestDelete ? (
            <button
              type="button"
              onClick={onRequestDelete}
              className="rounded p-1 text-[#8C97AD] hover:bg-[#FEF2F2] hover:text-[#EF4444]"
              aria-label={`Delete ${doc.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <p className="mt-1 text-sm leading-snug text-[#44516A]">{doc.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className={cn(
              'rounded px-1.5 py-0.5 text-xs font-medium',
              doc.enabled && doc.required
                ? 'bg-[#ECFDF5] text-[#15803D]'
                : 'bg-[#EEF2F8] text-[#44516A]',
            )}
          >
            {doc.enabled && doc.required ? 'Required' : 'Optional'}
          </span>
          <span className="rounded bg-[#EBF1FE] px-1.5 py-0.5 text-xs font-medium text-[#2F66C8]">
            {doc.inputKind}
          </span>
        </div>
      </div>
      <Toggle checked={doc.enabled} onChange={onToggle} label={`Toggle ${doc.title}`} />
    </div>
  );
}

interface RequirementsConfigFormProps {
  documents: DocumentRequirement[];
  applicationConfig: RequirementsApplicationConfig;
  applicationUrl: string;
  destinationName: string;
  opportunityType?: string | null;
  onToggleDocument: (id: string) => void;
  onRemoveDocument: (id: string) => void;
  onAddCustomDocument: (doc: {
    title: string;
    description: string;
    inputKind: DocumentRequirement['inputKind'];
    required: boolean;
  }) => void;
  onApplicationConfigChange: (patch: Partial<RequirementsApplicationConfig>) => void;
  onDestinationChange: (patch: { applicationUrl?: string; destinationName?: string }) => void;
}

export function RequirementsConfigForm({
  documents,
  applicationConfig,
  applicationUrl,
  destinationName,
  opportunityType,
  onToggleDocument,
  onRemoveDocument,
  onAddCustomDocument,
  onApplicationConfigChange,
  onDestinationChange,
}: RequirementsConfigFormProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DocumentRequirement | null>(null);
  const urlValid = /^https?:\/\/.+\..+/.test(applicationUrl.trim());
  const showDestination = opportunityType === 'external';

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
          <div className="border-b border-[#EEF2F8] px-5 py-4">
            <h2 className="text-base font-semibold text-[#0F172A]">1. Required Documents</h2>
            <p className="mt-1 text-sm text-[#44516A]">
              Choose the documents applicants must submit for this opportunity.
            </p>
          </div>
          <div>
            {documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                doc={doc}
                onToggle={() => onToggleDocument(doc.id)}
                onRequestDelete={doc.isCustom ? () => setDeleteTarget(doc) : undefined}
              />
            ))}
          </div>
          <div className="p-4">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#2F66C8] px-4 py-3 text-sm font-medium text-[#2F66C8] hover:bg-[#F5F8FE]"
            >
              <Plus className="h-4 w-4" />
              Add Custom Document
            </button>
          </div>
        </section>

        <div className="flex flex-col gap-5">
          <section className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
            <div className="border-b border-[#EEF2F8] px-5 py-4">
              <h2 className="text-base font-semibold text-[#0F172A]">2. Application mode</h2>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {(
                [
                  {
                    id: 'express-interest' as const,
                    title: 'Express Interest',
                    description: 'Applicants can express interest in this opportunity.',
                  },
                  {
                    id: 'full-application' as const,
                    title: 'Full Application',
                    description: 'Applications will be done inside of Anchor.',
                  },
                ] as const
              ).map((mode) => {
                const selected = applicationConfig.applicationMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => onApplicationConfigChange({ applicationMode: mode.id })}
                    className={cn(
                      'rounded-[10px] border p-4 text-left transition-colors',
                      selected
                        ? 'border-[#2F66C8] bg-[#F5F8FE]'
                        : 'border-[#EEF2F8] bg-white hover:border-[#D9E1EF]',
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                          selected ? 'border-[#2F66C8] bg-[#2F66C8]' : 'border-[#D9E1EF] bg-white',
                        )}
                      >
                        {selected ? <Check className="h-3 w-3 text-white" strokeWidth={3} /> : null}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#0F172A]">{mode.title}</p>
                        <p className="mt-0.5 text-sm text-[#44516A]">{mode.description}</p>
                        {mode.id === 'express-interest' && selected ? (
                          <div className="mt-3">
                            <label className="text-xs font-medium text-[#44516A]">
                              Leave a message <span className="text-[#8C97AD]">(optional)</span>
                            </label>
                            <div className="relative mt-1">
                              <textarea
                                value={applicationConfig.leaveMessage}
                                maxLength={80}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) =>
                                  onApplicationConfigChange({
                                    leaveMessage: e.target.value.slice(0, 80),
                                  })
                                }
                                placeholder="e.g. Share why you're interested…"
                                rows={3}
                                className="w-full resize-none rounded-[8px] border border-[#D9E1EF] px-3 py-2 pb-7 text-sm outline-none focus:border-[#2F66C8]"
                              />
                              <span className="absolute bottom-2 right-3 text-xs text-[#8C97AD]">
                                {applicationConfig.leaveMessage.length} / 80
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })}

              <label className="mt-2 flex flex-col gap-2">
                <span className="text-sm font-medium text-[#0F172A]">
                  Estimated Application Time{' '}
                  <span className="font-normal text-[#8C97AD]">(Optional)</span>
                </span>
                <BuilderMenuSelect
                  value={applicationConfig.estimatedTime}
                  onChange={(estimatedTime) => onApplicationConfigChange({ estimatedTime })}
                  options={ESTIMATED_TIME_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
                  aria-label="Estimated Application Time"
                />
              </label>
            </div>
          </section>

          <section className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
            <div className="border-b border-[#EEF2F8] px-5 py-4">
              <h2 className="text-base font-semibold text-[#0F172A]">3. Connect To Google Forms</h2>
              <p className="mt-1 text-sm text-[#44516A]">
                Link this opportunity to a google form for custom configuration.
              </p>
            </div>
            <div className="p-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#0F172A]">Form Link</span>
                <input
                  value={applicationConfig.googleFormLink}
                  onChange={(e) => onApplicationConfigChange({ googleFormLink: e.target.value })}
                  placeholder="https://docs.google.com/forms/..."
                  className="h-11 w-full rounded-[8px] border border-[#D9E1EF] px-3 text-sm outline-none focus:border-[#2F66C8]"
                />
              </label>
            </div>
          </section>

          {showDestination ? (
            <section className="overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white">
              <div className="border-b border-[#EEF2F8] px-5 py-4">
                <h2 className="text-base font-semibold text-[#0F172A]">4. Application Destination</h2>
              </div>
              <div className="flex flex-col gap-4 p-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Application URL <span className="text-[#E8242B]">*</span>
                  </span>
                  <span className="relative">
                    <input
                      value={applicationUrl}
                      onChange={(e) => onDestinationChange({ applicationUrl: e.target.value })}
                      className="h-11 w-full rounded-[8px] border border-[#D9E1EF] px-3 pr-10 text-sm outline-none focus:border-[#2F66C8]"
                    />
                    {urlValid ? (
                      <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#15803D]" />
                    ) : null}
                  </span>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#0F172A]">
                    Destination Name <span className="text-[#E8242B]">*</span>
                  </span>
                  <input
                    value={destinationName}
                    onChange={(e) => onDestinationChange({ destinationName: e.target.value })}
                    className="h-11 w-full rounded-[8px] border border-[#D9E1EF] px-3 text-sm outline-none focus:border-[#2F66C8]"
                  />
                </label>
                {urlValid ? (
                  <div className="flex items-center gap-2 rounded-[8px] border border-[#D1FAE5] bg-[#ECFDF5] px-3 py-2.5 text-sm text-[#15803D]">
                    <Check className="h-4 w-4 shrink-0" />
                    Destination URL validated
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <CustomDocumentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAddCustomDocument}
      />

      <BuilderDeleteModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) onRemoveDocument(deleteTarget.id);
        }}
        accentWord="Document"
        titleLead="Delete Custom"
        descriptionLines={[
          'Are you sure you want to delete this document?',
          'This action cannot be undone.',
        ]}
        itemTitle={deleteTarget?.title ?? ''}
        itemBadges={[
          deleteTarget?.required ? 'Required' : 'Optional',
          deleteTarget?.inputKind === 'Text Input' ? 'Long Text' : (deleteTarget?.inputKind ?? ''),
        ].filter(Boolean)}
        confirmLabel="Delete"
        createdLabel={new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      />
    </>
  );
}
