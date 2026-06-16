import Image from "next/image";
import Link from "next/link";
import { CircleHelp } from "lucide-react";

import { ASSETS } from "@/lib/provider-application/constants";

export function ProviderApplicationHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Anchor Canada home">
          <Image
            src={ASSETS.logo}
            alt="Anchor Canada"
            width={180}
            height={48}
            priority
            className="h-10 sm:h-12"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          Need Help?
          <span className="inline-flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground">
            <CircleHelp className="size-4" aria-hidden />
          </span>
        </Link>
      </div>
    </header>
  );
}
