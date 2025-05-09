"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactConfetti from "react-confetti";
import { OnboardingLayout } from "@/components/onboarding/layout";
import { WelcomeStep } from "@/components/onboarding/steps/welcome-step";
import { BusinessTypeStep } from "@/components/onboarding/steps/business-type-step";
import { WebsiteStep } from "@/components/onboarding/steps/website-step";
import { ImportStep } from "@/components/onboarding/steps/import-step";
import { CompletionStep } from "@/components/onboarding/steps/completion-step";

// Instead of using nuqs, we'll use URL search params directly
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<string>("welcome");
  const [userData, setUserData] = useState({
    name: "",
    businessType: "",
    website: "",
    importedTestimonials: [] as any[],
  });
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // Get the current step from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get("step");
    if (
      stepParam &&
      ["welcome", "business-type", "website", "import", "completion"].includes(
        stepParam
      )
    ) {
      setStep(stepParam);
    }
  }, []);

  // Update URL when step changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("step", step);
    window.history.pushState({}, "", url);
  }, [step]);

  // Trigger confetti on first visit
  useEffect(() => {
    if (isFirstVisit && step === "welcome") {
      setIsFirstVisit(false);
      setShowConfetti(true);
      // Hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit, step]);

  const handleNext = (data: Partial<typeof userData> = {}) => {
    // Update user data
    setUserData((prev) => ({ ...prev, ...data }));

    // Move to next step
    const steps = [
      "welcome",
      "business-type",
      "website",
      "import",
      "completion",
    ] as const;
    const currentIndex = steps.indexOf(step as (typeof steps)[number]);

    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1] as (typeof steps)[number]);
    } else {
      // Onboarding complete, redirect to dashboard
      router.push("/forms");
    }
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeStep onNext={handleNext} />;
      case "business-type":
        return <BusinessTypeStep onNext={handleNext} userData={userData} />;
      case "website":
        return <WebsiteStep onNext={handleNext} userData={userData} />;
      case "import":
        return <ImportStep onNext={handleNext} userData={userData} />;
      case "completion":
        return <CompletionStep onNext={handleNext} userData={userData} />;
      default:
        return <WelcomeStep onNext={handleNext} />;
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
