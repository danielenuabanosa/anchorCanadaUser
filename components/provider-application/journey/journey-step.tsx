"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { JOURNEY_OPTIONS } from "@/lib/provider-application/constants";
import type { JourneyOptionId } from "@/lib/provider-application/types";
import { useProviderOnboardingStore } from "@/store/onboardingStore";

import { JourneyNavigation } from "./journey-navigation";
import { JourneyOptionCard } from "./journey-option-card";

export function JourneyStep() {
  const router = useRouter();
  const setOnboardingData = useProviderOnboardingStore((s) => s.setOnboardingData);
  const [selectedJourney, setSelectedJourney] =
    useState<JourneyOptionId>("explore");

  function handleContinue() {
    if (!selectedJourney) return;
    setOnboardingData({ journey: selectedJourney });
    if (selectedJourney === "explore") {
      router.push("/guest");
      return;
    }
    router.push("/onboarding/organization-type");
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <h1 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            How Would You Like To Use
            <span className="mt-1 block text-5xl italic text-primary sm:text-6xl">
              Anchor?
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Choose the path that best matches your goals. You can switch
            anytime.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {JOURNEY_OPTIONS.map((option, index) => (
            <JourneyOptionCard
              key={option.id}
              option={option}
              isSelected={selectedJourney === option.id}
              onSelect={() => setSelectedJourney(option.id)}
              imagePriority={index === 0}
            />
          ))}
        </div>
      </div>

      <JourneyNavigation
        isContinueDisabled={!selectedJourney}
        onBack={() => router.push("/login")}
        onContinue={handleContinue}
      />
    </>
  );
}
