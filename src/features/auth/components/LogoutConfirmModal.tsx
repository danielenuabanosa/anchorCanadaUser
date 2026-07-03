'use client';

import { useRouter } from 'next/navigation';
import { DoorOpen, X } from 'lucide-react';
import { useLogout } from '@/features/auth/hooks/useAuth';

interface LogoutConfirmModalProps {
  onCancel?: () => void;
}

export function LogoutConfirmModal({ onCancel }: LogoutConfirmModalProps) {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 p-4 backdrop-blur-[5px]">
      <div className="w-full max-w-[720px] overflow-hidden rounded-[20px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
        <div className="flex justify-end border-b border-[#EEF2F8] p-[26px]">
          <button
            type="button"
            onClick={handleCancel}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#EEF2F8] bg-white text-[#44516A] transition hover:bg-[#F8FAFC]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center px-[26px] py-10">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[#F1FFEE]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ECFDF5]">
              <DoorOpen className="h-12 w-12 text-[#15803D]" strokeWidth={1.5} />
            </div>
          </div>

          <div className="mt-5 text-center">
            <h2 className="font-serif text-[28px] text-[#0F172A]">
              You&apos;re <span className="italic text-[36px] text-[#2F66C8]">Leaving!</span>
            </h2>
            <p className="mt-5 text-base text-[#44516A]">
              Are you sure want you want to exit your dashboard.
              <br />
              Not to worry your data will be synced and saved.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-5 border-t border-[#EEF2F8] bg-[#F8FAFC] p-[26px]">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="min-w-[86px] rounded-[6px] border border-[#EEF2F8] bg-white px-5 py-3 text-sm font-medium text-[#44516A]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => logout()}
            disabled={isPending}
            className="rounded-[6px] bg-[#2F66C8] px-5 py-3 text-sm font-medium text-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] disabled:opacity-70"
          >
            {isPending ? 'Logging out…' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
