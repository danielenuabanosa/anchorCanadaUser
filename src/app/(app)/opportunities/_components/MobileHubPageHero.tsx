import type { ReactNode } from 'react';

interface MobileHubPageHeroProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export function MobileHubPageHero({ title, subtitle, action }: MobileHubPageHeroProps) {
  return (
    <section className="py-5">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-serif text-[28px] leading-[56px] text-[#0F172A]">{title}</h1>
          <p className="text-sm leading-[18px] text-[#44516A]">{subtitle}</p>
        </div>
        {action}
      </div>
    </section>
  );
}
