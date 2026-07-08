import Image from "next/image";
import { Eye, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { JourneyOption } from "@/lib/provider-application/types";

interface JourneyOptionCardProps {
  option: JourneyOption;
  isSelected: boolean;
  onSelect: () => void;
  imagePriority?: boolean;
}

const themeStyles = {
  publish: {
    tag: "bg-journey-publish-tag text-journey-publish-tag-foreground",
    iconWrap: "bg-journey-publish-tag text-journey-publish-accent",
    Icon: ShieldCheck,
  },
  explore: {
    tag: "bg-journey-explore-tag text-journey-explore-tag-foreground",
    iconWrap: "bg-journey-explore-tag text-journey-explore-accent",
    Icon: Eye,
  },
} as const;

export function JourneyOptionCard({
  option,
  isSelected,
  onSelect,
  imagePriority = false,
}: JourneyOptionCardProps) {
  const theme = themeStyles[option.theme];
  const ThemeIcon = theme.Icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card text-left shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all",
        "hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:outline-none",
        isSelected
          ? "border-primary border-dashed"
          : "border-transparent",
      )}
    >
      <span
        className={cn(
          "absolute top-4 right-4 z-10 flex size-5 items-center justify-center rounded-full border-2 bg-background transition-colors",
          isSelected ? "border-primary" : "border-border",
        )}
        aria-hidden
      >
        {isSelected ? (
          <span className="size-2.5 rounded-full bg-primary" />
        ) : null}
      </span>

      <div className="relative aspect-[490/240] w-full overflow-hidden">
        <Image
          src={option.imageSrc}
          alt={option.imageAlt}
          fill
          priority={imagePriority}
          sizes="(max-width: 768px) 100vw, 490px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2 pr-8">
          <h3 className="font-heading text-2xl leading-tight text-foreground">
            {option.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {option.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {option.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                theme.tag,
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-start gap-3 border-t border-border pt-4">
          <span
            className={cn(
              "inline-flex size-8 shrink-0 items-center justify-center rounded-full",
              theme.iconWrap,
            )}
          >
            <ThemeIcon className="size-4" aria-hidden />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              {option.footerHighlight}
            </span>{" "}
            {option.footerText}
          </p>
        </div>
      </div>
    </button>
  );
}
