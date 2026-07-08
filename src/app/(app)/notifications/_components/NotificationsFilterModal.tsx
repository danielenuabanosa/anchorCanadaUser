'use client';



import { useEffect, useRef, useState } from 'react';

import { CalendarDays, Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import {

  DateRangeDropdown,

  type DateRangeOption,

} from '@/shared/components/hub/DateRangeDropdown';

import { HubFilterField } from '@/shared/components/hub/HubFilterField';

import {

  DEFAULT_NOTIFICATION_FILTERS,

  NOTIFICATION_FILTER_STATUS,

  NOTIFICATION_FILTER_TYPES,

  type NotificationFilters,

} from './notificationsData';



function FilterOptionDropdown<T extends string>({

  open,

  onClose,

  value,

  options,

  onChange,

  className,

}: {

  open: boolean;

  onClose: () => void;

  value: T;

  options: readonly T[];

  onChange: (value: T) => void;

  className?: string;

}) {

  if (!open) return null;



  return (

    <>

      <button type="button" className="fixed inset-0 z-40" onClick={onClose} aria-label="Close menu" />

      <div

        className={cn(

          'absolute top-full z-50 mt-1 w-full rounded-[10px] border border-[#EEF2F8] bg-[#F8FAFC] p-1 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]',

          className,

        )}

      >

        <div className="overflow-hidden rounded-[9px] border border-[#EEF2F8] bg-white">

          {options.map((option, index) => {

            const selected = value === option;

            return (

              <button

                key={option}

                type="button"

                onClick={() => {

                  onChange(option);

                  onClose();

                }}

                className={cn(

                  'flex w-full items-center gap-2.5 p-3 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC]',

                  index < options.length - 1 && 'border-b border-[#EEF2F8]',

                )}

              >

                <span className="flex-1">{option}</span>

                {selected ? (

                  <Check className="h-[18px] w-[18px] shrink-0 text-[#2F66C8]" strokeWidth={2} />

                ) : (

                  <span className="h-[18px] w-[18px] shrink-0" />

                )}

              </button>

            );

          })}

        </div>

      </div>

    </>

  );

}



interface NotificationsFilterModalProps {

  open: boolean;

  onClose: () => void;

  mobile?: boolean;

  filters: NotificationFilters;

  onApply: (filters: NotificationFilters) => void;

}



export function NotificationsFilterModal({

  open,

  onClose,

  mobile,

  filters,

  onApply,

}: NotificationsFilterModalProps) {

  const [draft, setDraft] = useState<NotificationFilters>(filters);

  const [dateOpen, setDateOpen] = useState(false);

  const [typeOpen, setTypeOpen] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);



  useEffect(() => {

    if (open) setDraft(filters);

  }, [open, filters]);



  if (!open) return null;



  function clearAll() {

    setDraft(DEFAULT_NOTIFICATION_FILTERS);

  }



  function handleApply() {

    onApply(draft);

    onClose();

  }



  return (

    <div

      className={`fixed inset-0 z-50 flex ${mobile ? 'items-end' : 'items-center'} justify-center ${mobile ? '' : 'p-4'}`}

      role="dialog"

      aria-modal="true"

    >

      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close filter" />

      <div

        className={`relative w-full overflow-hidden border border-[#EEF2F8] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.05)] ${

          mobile ? 'max-h-[85vh] overflow-y-auto rounded-t-[10px]' : 'max-w-[480px] rounded-[10px]'

        }`}

      >

        <div className="border-b border-[#EEF2F8] p-5">

          <div className="flex items-center justify-between">

            <h2 className="text-sm font-semibold text-[#0F172A]">Filters</h2>

            <button type="button" onClick={clearAll} className="text-sm text-[#2F66C8]">

              Clear all

            </button>

          </div>

        </div>



        <div className="flex flex-col gap-4 p-5">

          <div className="relative">

            <HubFilterField

              label="Date Range"

              value={draft.dateRange}

              icon={ChevronDown}

              onClick={() => {

                setTypeOpen(false);

                setStatusOpen(false);

                setDateOpen((current) => !current);

              }}

            />

            <DateRangeDropdown

              open={dateOpen}

              onClose={() => setDateOpen(false)}

              value={draft.dateRange as DateRangeOption}

              onChange={(value) => {

                setDraft((current) => ({ ...current, dateRange: value }));

                setDateOpen(false);

              }}

              align="left"

              className="left-0 w-full"

            />

          </div>

          <div className="relative">

            <HubFilterField

              label="Type"

              value={draft.type}

              icon={ChevronDown}

              onClick={() => {

                setDateOpen(false);

                setStatusOpen(false);

                setTypeOpen((current) => !current);

              }}

            />

            <FilterOptionDropdown

              open={typeOpen}

              onClose={() => setTypeOpen(false)}

              value={draft.type}

              options={NOTIFICATION_FILTER_TYPES}

              onChange={(type) => setDraft((current) => ({ ...current, type }))}

            />

          </div>

          <div className="relative">

            <HubFilterField

              label="Status"

              value={draft.status}

              icon={ChevronDown}

              onClick={() => {

                setDateOpen(false);

                setTypeOpen(false);

                setStatusOpen((current) => !current);

              }}

            />

            <FilterOptionDropdown

              open={statusOpen}

              onClose={() => setStatusOpen(false)}

              value={draft.status}

              options={NOTIFICATION_FILTER_STATUS}

              onChange={(status) => setDraft((current) => ({ ...current, status }))}

            />

          </div>

        </div>



        <div className="flex justify-end gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-5">

          <button

            type="button"

            onClick={onClose}

            className="rounded-[6px] border border-[#D9E1EF] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A]"

          >

            Cancel

          </button>

          <button

            type="button"

            onClick={handleApply}

            className="min-w-[140px] rounded-[6px] bg-[#2F66C8] px-4 py-2.5 text-sm font-medium text-white"

          >

            Apply Filters

          </button>

        </div>

      </div>

    </div>

  );

}


