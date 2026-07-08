"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface JourneyNavigationProps {
  onBack?: () => void;
  onContinue?: () => void;
  isContinueDisabled?: boolean;
}

export function JourneyNavigation({
  onBack,
  onContinue,
  isContinueDisabled = false,
}: JourneyNavigationProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse gap-3 py-6 md:flex-row md:items-center md:justify-between md:py-8">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="md:h-11 md:w-auto"
          onClick={onBack}
        >
          <ArrowLeft data-icon="inline-start" />
          Back
        </Button>

        <Button
          type="button"
          size="xl"
          className="md:h-11 md:w-auto"
          onClick={onContinue}
          disabled={isContinueDisabled}
        >
          Continue
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  );
}
