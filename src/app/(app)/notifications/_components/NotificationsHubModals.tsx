'use client';



import Link from 'next/link';

import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { Archive, CheckCircle2, CircleCheckBig, Trash2, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { RECENT_ACTIVITY_WIDGET, NOTIFICATION_PREFS, type NotificationItem } from './notificationsData';



function ModalOverlay({
  onClose,
  children,
  mobile,
}: {
  onClose: () => void;
  children: React.ReactNode;
  mobile?: boolean;
}) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-[5px]">

      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close modal" />

      <div className={cn('relative w-full max-w-[720px]', mobile && 'max-w-[400px]')}>{children}</div>

    </div>

  );

}



export function DeleteNotificationModal({

  open,

  onClose,

  onConfirm,
  mobile,

}: {

  open: boolean;

  onClose: () => void;

  onConfirm: () => void;
  mobile?: boolean;

}) {

  if (!open) return null;



  return (

    <ModalOverlay onClose={onClose} mobile={mobile}>

      <div className="overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">

        <div className="flex justify-end p-[26px] pb-0">

          <button

            type="button"

            onClick={onClose}

            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"

            aria-label="Close"

          >

            <X className="h-6 w-6" />

          </button>

        </div>

        <div className="flex flex-col items-center px-[26px] py-10">

          <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-[#FEF2F2]">

            <Trash2 className="h-14 w-14 text-[#EF4444]" strokeWidth={1.5} />

          </div>

          <div className="mt-5 text-center">

            <h2 className="font-serif text-[28px] leading-tight text-[#0F172A]">

              Delete this <span className="italic text-[#2F66C8]">Notification?</span>

            </h2>

            <p className="mt-2.5 text-base text-[#44516A]">This action cannot be undone</p>

          </div>

        </div>

        <div className="flex justify-end gap-2.5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">

          <button

            type="button"

            onClick={onClose}

            className="rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#0F172A]"

          >

            Cancel

          </button>

          <button

            type="button"

            onClick={onConfirm}

            className="rounded-[6px] bg-[#EF4444] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"

          >

            Delete

          </button>

        </div>

      </div>

    </ModalOverlay>

  );

}



export function NotificationDetailModal({

  item,

  onClose,
  mobile,

}: {

  item: NotificationItem | null;

  onClose: () => void;
  mobile?: boolean;

}) {

  const router = useRouter();



  if (!item?.detail) return null;



  const { detail } = item;



  return (

    <ModalOverlay onClose={onClose} mobile={mobile}>

      <div className="overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">

        <div className="flex justify-end p-[26px] pb-0">

          <button

            type="button"

            onClick={onClose}

            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A]"

            aria-label="Close"

          >

            <X className="h-6 w-6" />

          </button>

        </div>

        <div className="flex flex-col items-center px-[26px] py-10">

          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[#F1FFEE]">

            <CheckCircle2 className="h-24 w-24 text-[#15803D]" strokeWidth={1.5} />

          </div>

          <h2 className="mt-5 text-center font-serif text-[28px] leading-tight text-[#0F172A] md:text-[36px]">

            Application <span className="italic text-[#2F66C8]">Submitted</span>

          </h2>

          <div className="mt-5 w-full overflow-hidden rounded-[10px] border border-[#EEF2F8]">

            <div className="flex items-center gap-4 bg-[#F8FAFC] p-3.5">

              <Image

                src={detail.applicantAvatar}

                alt={detail.applicantName}

                width={40}

                height={40}

                className="h-10 w-10 rounded-full object-cover"

              />

              <div className="min-w-0 flex-1">

                <p className="text-sm font-medium text-[#0F172A]">{detail.applicantName}</p>

                <p className="text-xs text-[#44516A]">Submitted an application for</p>

              </div>

              <div className="text-right">

                <p className="text-xs text-[#44516A]">Opportunity</p>

                <span className="mt-1 inline-flex rounded-[4px] bg-[#ECFDF5] px-1.5 py-0.5 text-xs font-medium text-[#15803D]">

                  {detail.opportunityName}

                </span>

              </div>

            </div>

            <div className="flex bg-[#F8FAFC] p-3.5">

              <div className="flex-1">

                <p className="text-xs text-[#44516A]">Submitted</p>

                <p className="mt-1 text-sm font-medium text-[#0F172A]">{detail.submittedAt}</p>

              </div>

              <div className="flex-1 text-right">

                <p className="text-xs text-[#44516A]">Created At</p>

                <p className="mt-1 text-sm font-medium text-[#0F172A]">{detail.createdAt}</p>

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">

          <button

            type="button"

            onClick={() => {

              router.push(detail.applicationHref);

              onClose();

            }}

            className="w-full rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)]"

          >

            View Application

          </button>

        </div>

      </div>

    </ModalOverlay>

  );

}



export function NotificationBulkBar({
  count,
  mobile,
  onMarkRead,
  onArchive,
  onDelete,
  onClearSelection,
}: {
  count: number;
  mobile?: boolean;
  onMarkRead: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onClearSelection: () => void;
}) {
  if (count === 0) return null;

  const actionButtons = (
    <>
      <button
        type="button"
        onClick={onMarkRead}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-sm text-[#2F66C8]',
          mobile ? 'flex-1 px-4' : 'px-4',
        )}
      >
        <CircleCheckBig className="h-3.5 w-3.5" strokeWidth={1.75} />
        Mark Read
      </button>
      <button
        type="button"
        onClick={onArchive}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-sm text-[#0F172A]',
          mobile ? 'flex-1 px-4' : 'px-4',
        )}
      >
        <Archive className="h-3.5 w-3.5" strokeWidth={1.75} />
        Archive
      </button>
      <button
        type="button"
        onClick={onDelete}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-[6px] border border-[#D9E1EF] bg-white py-2.5 text-sm text-[#B91C1C]',
          mobile ? 'flex-1 px-4' : 'px-4',
        )}
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
        Delete
      </button>
    </>
  );

  if (mobile) {
    return (
      <div className="flex flex-col gap-2.5 py-2.5">
        <button type="button" onClick={onClearSelection} className="flex items-center gap-3.5 py-3.5">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8]" />
          <span className="text-sm text-[#0F172A]">{count} selected</span>
        </button>
        <div className="flex gap-2.5">{actionButtons}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-2.5">
      <button type="button" onClick={onClearSelection} className="flex items-center gap-3.5">
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-[#D9E1EF] bg-[#EEF2F8]" />
        <span className="text-sm text-[#0F172A]">{count} selected</span>
      </button>
      <div className="flex flex-wrap gap-2.5">{actionButtons}</div>
    </div>
  );
}



export function NotificationsSidePanels({

  prefs,

  onPrefToggle,

  mobile,

}: {

  prefs: (typeof NOTIFICATION_PREFS[number] & { enabled: boolean })[];

  onPrefToggle: (id: string) => void;

  mobile?: boolean;

}) {

  return (

    <>

      <div className="rounded-[10px] border border-[#EEF2F8] bg-white p-5">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="text-sm font-semibold leading-[1.8] text-[#0F172A]">Recent Activity</h3>

          <Link href="/applications" className="text-sm font-medium text-[#2F66C8]">

            View All

          </Link>

        </div>

        <ul>

          {RECENT_ACTIVITY_WIDGET.map((item) => {

            const Icon = item.icon;

            return (

              <li key={item.id} className="py-3.5">

                <div className="flex items-center gap-4">

                  <span

                    className={cn(

                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] p-2.5',

                      item.iconBg,

                    )}

                  >

                    <Icon className={cn('h-5 w-5', item.iconColor)} strokeWidth={1.75} />

                  </span>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>

                    <p className="mt-1 text-sm text-[#44516A]">

                      {item.subtitle}

                      <span className="mx-2.5">•</span>

                      {item.time}

                    </p>

                  </div>

                </div>

              </li>

            );

          })}

        </ul>

      </div>



      <div className={cn('overflow-hidden rounded-[10px] border border-[#EEF2F8] bg-white', mobile && 'rounded-[10px]')}>

        <div className="p-5">

          <h3 className="text-sm font-semibold leading-[1.8] text-[#0F172A]">Notification Preferences</h3>

          <p className="mt-0.5 text-xs text-[#44516A]">Manage how you receive notifications</p>

          <ul>

            {prefs.map((pref) => {

              const Icon = pref.icon;

              return (

                <li key={pref.id} className="py-3.5">

                  <div className="flex items-center gap-4">

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] bg-[#EEF2F8] p-2.5">

                      <Icon className="h-5 w-5 text-[#44516A]" strokeWidth={1.75} />

                    </span>

                    <div className="flex min-w-0 flex-1 items-center justify-between gap-3">

                      <div className="min-w-0">

                        <p className="text-sm font-medium text-[#0F172A]">{pref.label}</p>

                        <p className="text-sm text-[#44516A]">{pref.desc}</p>

                      </div>

                      <button

                        type="button"

                        role="switch"

                        aria-checked={pref.enabled}

                        onClick={() => onPrefToggle(pref.id)}

                        className={cn(

                          'relative h-5 w-10 shrink-0 rounded-full transition',

                          pref.enabled ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]',

                        )}

                      >

                        <span

                          className={cn(

                            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition',

                            pref.enabled ? 'left-[22px]' : 'left-0.5',

                          )}

                        />

                      </button>

                    </div>

                  </div>

                </li>

              );

            })}

          </ul>

        </div>

        <div className="border-t border-[#EEF2F8] bg-[#F8FAFC] p-5">

          <Link

            href="/settings"

            className="flex w-full items-center justify-center rounded-[6px] border border-[#D9E1EF] py-3 text-sm font-medium text-[#2F66C8]"

          >

            Manage Preferences

          </Link>

        </div>

      </div>

    </>

  );

}


