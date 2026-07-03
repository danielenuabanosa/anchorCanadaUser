import type { ElementType } from 'react';
import { cn } from '@/lib/utils';

interface NotificationRowProps {
  title: string;
  body: string;
  time: string;
  unread?: boolean;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
  className?: string;
}

export function NotificationRow({
  title,
  body,
  time,
  unread,
  icon: Icon,
  iconBg,
  iconColor,
  className,
}: NotificationRowProps) {
  return (
    <div className={cn('flex items-center gap-5 p-5', className)}>
      <span
        className={cn(
          'flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[10px] p-[18px]',
          iconBg,
        )}
      >
        <Icon className={cn('h-6 w-6', iconColor)} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2">
          <p className="truncate text-sm font-medium text-[#0F172A]">{title}</p>
          <p className="truncate text-xs text-[#44516A]">{body}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-5">
        <p className="whitespace-nowrap text-right text-xs text-[#8C97AD]">{time}</p>
        {unread ? (
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2F66C8]" aria-label="Unread" />
        ) : (
          <span className="h-2.5 w-2.5 shrink-0" aria-hidden />
        )}
      </div>
    </div>
  );
}
