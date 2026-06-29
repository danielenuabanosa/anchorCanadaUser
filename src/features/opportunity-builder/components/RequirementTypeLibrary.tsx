'use client';

import { useMemo, useState } from 'react';
import { Lightbulb, Plus, Search, X } from 'lucide-react';
import {
  REQUIREMENT_CATEGORIES,
  REQUIREMENT_TYPES,
  createRequirementFromType,
  type RequirementField,
} from '@/features/opportunity-builder/lib/requirementsData';

interface AddRequirementsModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (fields: RequirementField[]) => void;
  existingTypeIds: string[];
}

export function AddRequirementsModal({
  open,
  onClose,
  onAdd,
  existingTypeIds,
}: AddRequirementsModalProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return REQUIREMENT_TYPES;
    return REQUIREMENT_TYPES.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.includes(q),
    );
  }, [search]);

  const grouped = useMemo(() => {
    return REQUIREMENT_CATEGORIES.filter((c) => c.id !== 'custom').map((cat) => ({
      ...cat,
      items: filtered.filter((t) => t.category === cat.id),
    }));
  }, [filtered]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAdd() {
    const fields = Array.from(selected)
      .map((id) => createRequirementFromType(id))
      .filter((f): f is RequirementField => f !== null);
    onAdd(fields);
    setSelected(new Set());
    setSearch('');
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-0 backdrop-blur-[5px] sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close dialog" />
      <div className="relative flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] sm:rounded-[20px]">
        <div className="flex items-center justify-between border-b border-[#EEF2F8] px-[26px] py-5">
          <div>
            <h2 className="font-sans text-[20px] font-semibold text-[#0F172A]">Choose Requirement Type</h2>
            <p className="mt-1 font-sans text-[13px] text-[#44516A]">
              Select one or more requirement types to add to your application form.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-[#EEF2F8] px-5 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requirements..."
              className="w-full rounded-[8px] border border-[#D9E1EF] py-2.5 pl-10 pr-4 text-[14px] text-[#0F172A] outline-none focus:border-[#2F66C8]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {grouped.map((group) =>
            group.items.length === 0 ? null : (
              <div key={group.id} className="mb-6">
                <p
                  className="mb-3 text-[12px] font-semibold uppercase tracking-wide"
                  style={{ color: group.color }}
                >
                  {group.title}
                </p>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => {
                    const alreadyAdded = existingTypeIds.includes(item.id);
                    const isSelected = selected.has(item.id);
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-[10px] border border-[#EEF2F8] p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px]"
                            style={{ backgroundColor: item.iconBg }}
                          >
                            <Icon className="h-5 w-5" style={{ color: item.iconColor }} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-sans text-[14px] font-medium text-[#0F172A]">
                              {item.title}
                            </p>
                            <p className="truncate font-sans text-[12px] text-[#8C97AD]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={alreadyAdded}
                          onClick={() => toggle(item.id)}
                          className={`shrink-0 rounded-[6px] px-3 py-1.5 text-[13px] font-medium ${
                            alreadyAdded
                              ? 'cursor-not-allowed bg-[#F8FAFC] text-[#8C97AD]'
                              : isSelected
                                ? 'bg-[#2F66C8] text-white'
                                : 'border border-[#D9E1EF] text-[#2F66C8] hover:bg-[#EFF4FF]'
                          }`}
                        >
                          {alreadyAdded ? 'Added' : isSelected ? 'Selected' : 'Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#EEF2F8] bg-[#F8FAFC] px-[26px] py-5">
          <span className="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-[#44516A]">
            {selected.size} selected
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-[14px] font-medium text-[#44516A] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selected.size === 0}
              onClick={() => {
                handleAdd();
                onClose();
              }}
              className={`rounded-[6px] px-5 py-3 text-[14px] font-medium text-white ${
                selected.size === 0 ? 'cursor-not-allowed bg-[#2F66C8]/40' : 'bg-[#2F66C8] hover:bg-[#2454A4]'
              }`}
            >
              Add Selected ({selected.size})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
interface RequirementTypeLibraryProps {
  onAddType: (typeId: string) => void;
}

export function RequirementTypeLibrary({ onAddType }: RequirementTypeLibraryProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const types = q
      ? REQUIREMENT_TYPES.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q),
        )
      : REQUIREMENT_TYPES;
    return REQUIREMENT_CATEGORIES.map((cat) => ({
      ...cat,
      items: types.filter((t) => t.category === cat.id).slice(0, cat.id === 'custom' ? 1 : 8),
      total: REQUIREMENT_TYPES.filter((t) => t.category === cat.id).length,
    }));
  }, [search]);

  return (
    <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8865F1] text-[18px] font-semibold text-white">
            2
          </div>
          <div>
            <p className="font-sans text-[18px] font-semibold text-[#0F172A]">Add More Requirements</p>
            <p className="mt-2 font-sans text-[14px] text-[#44516A]">
              Browse requirement types and add them to your application.
            </p>
          </div>
        </div>
        <div className="relative w-full lg:max-w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C97AD]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search requirement types..."
            className="w-full rounded-[8px] border border-[#D9E1EF] py-2.5 pl-10 pr-4 text-[14px] outline-none focus:border-[#2F66C8]"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col rounded-[10px] border border-[#EEF2F8] p-4"
            style={{ backgroundColor: cat.id === 'custom' ? cat.bg : 'white' }}
          >
            <p className="text-[14px] font-semibold" style={{ color: cat.color }}>
              {cat.title}
            </p>
            {cat.id === 'custom' ? (
              <button
                type="button"
                onClick={() => onAddType('short-text')}
                className="mt-4 flex flex-1 flex-col items-center justify-center gap-3 rounded-[8px] border border-dashed border-[#D9E1EF] bg-white/60 p-4 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Lightbulb className="h-5 w-5 text-[#6821CD]" />
                </div>
                <p className="font-sans text-[14px] font-medium text-[#0F172A]">Create Custom Requirement</p>
              </button>
            ) : (
              <>
                <ul className="mt-3 flex flex-1 flex-col gap-2">
                  {cat.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onAddType(item.id)}
                        className="flex w-full items-center gap-2 rounded-[6px] px-1 py-1.5 text-left text-[13px] text-[#44516A] hover:bg-[#F8FAFC] hover:text-[#2F66C8]"
                      >
                        <Plus className="h-3.5 w-3.5 shrink-0" />
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
                {cat.total > cat.items.length && (
                  <p className="mt-2 text-[12px] font-medium text-[#2F66C8]">
                    View all ({cat.total})
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
