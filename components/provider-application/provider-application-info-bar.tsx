import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export function ProviderApplicationInfoBar() {
  return (
    <div className="mt-auto px-4 pb-4 md:px-0 md:pb-0">
      <div className="border border-primary/10 bg-info-banner md:border-t md:border-x-0 md:border-b-0 md:border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-xl px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:rounded-none md:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-sm text-info-banner-foreground">
            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary">
              <Info className="size-3.5" aria-hidden />
            </span>
            <p>
              Your journey can be updated anytime in your account settings.
            </p>
          </div>

          <Link
            href="#"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:inline-flex"
          >
            Learn more about our Privacy Policy
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
