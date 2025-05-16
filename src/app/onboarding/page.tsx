"use client";

import { useEffect } from "react";
import ReactConfetti from "react-confetti";
import { OnboardingLayout } from "@/components/onboarding/layout";
import { WelcomeStep } from "@/components/onboarding/steps/welcome-step";
import { BusinessTypeStep } from "@/components/onboarding/steps/business-type-step";
import { WebsiteStep } from "@/components/onboarding/steps/website-step";
import { CompletionStep } from "@/components/onboarding/steps/completion-step";
import {
  OnboardingProvider,
  useOnboarding,
} from "@/contexts/onboarding-context";

// TODO: check if user is already onboarded; make it rsc maybe?
function OnboardingContent() {
  const { step, showConfetti, setShowConfetti } = useOnboarding();

  // Trigger confetti on first visit
  useEffect(() => {
    if (step === "welcome") {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, setShowConfetti]);

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeStep />;
      case "business-type":
        return <BusinessTypeStep />;
      case "website":
        return <WebsiteStep />;
      case "completion":
        return <CompletionStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <OnboardingLayout>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={["#6701E6", "#9B51E0", "#D8B4FE"]}
        />
      )}
      {renderStep()}
    </OnboardingLayout>
  );
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
