'use client';

interface BuilderPageHeadingProps {
  title: string;
  titleAccent: string;
  subtitle?: string;
  subtitleLines?: readonly string[];
  centered?: boolean;
  /** Figma mobile builder pages use single-color serif title */
  mobile?: boolean;
  /** When set on mobile, renders one serif line instead of title + accent */
  combinedTitle?: string;
}

/** Figma Opportunity Builder hero — 36px serif + 48px italic brand (desktop) */
export function BuilderPageHeading({
  title,
  titleAccent,
  subtitle,
  subtitleLines,
  centered = true,
  mobile = false,
  combinedTitle,
}: BuilderPageHeadingProps) {
  const lines = subtitleLines ?? (subtitle ? [subtitle] : []);

  if (mobile) {
    return (
      <div className={centered ? 'text-center' : ''}>
        <h1 className="font-serif text-[36px] leading-[56px] text-[#0F172A]">
          {combinedTitle ?? `${title}${titleAccent ? ` ${titleAccent}` : ''}`}
        </h1>
        <div className={`mt-2.5 space-y-0 text-sm leading-normal text-[#8C97AD] ${centered ? '' : ''}`}>
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={centered ? 'text-center' : ''}>
      <h1 className="font-serif text-[36px] font-normal leading-[44px] text-[#0F172A] md:leading-[56px]">
        {title}{' '}
        <span className="font-serif text-[48px] italic leading-[56px] text-[#2F66C8]">{titleAccent}</span>
      </h1>
      <div
        className={`mt-2.5 space-y-0 font-sans text-[16px] leading-normal text-[#44516A] ${centered ? 'mx-auto max-w-[794px]' : ''}`}
      >
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
