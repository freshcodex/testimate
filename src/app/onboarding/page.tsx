"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactConfetti from "react-confetti";
import { OnboardingLayout } from "@/components/onboarding/layout";
import { WelcomeStep } from "@/components/onboarding/steps/welcome-step";
import { BusinessTypeStep } from "@/components/onboarding/steps/business-type-step";
import { WebsiteStep } from "@/components/onboarding/steps/website-step";
import { CompletionStep } from "@/components/onboarding/steps/completion-step";
import { ProgressIndicator } from "@/components/onboarding/progress-indicator";
import {
  OnboardingProvider,
  useOnboarding,
  type UserData,
} from "@/contexts/onboarding-context";
import { api } from "@/trpc/react";
import { toast } from "sonner";

function OnboardingContent() {
  const router = useRouter();
  const {
    step,
    setStep,
    userData,
    setUserData,
    isLoading,
    setIsLoading,
    showConfetti,
    setShowConfetti,
  } = useOnboarding();

  const completeOnboarding = api.onboarding.completeOnboarding.useMutation({
    onSuccess: (data) => {
      setUserData({ projectSlug: data.project.slug });
      handleNext();
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

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

  const handleNext = (data: Partial<UserData> = {}) => {
    // Update user data
    setUserData(data);

    // Move to next step
    const steps = [
      "welcome",
      "business-type",
      "website",
      "completion",
    ] as const;
    const currentIndex = steps.indexOf(step as (typeof steps)[number]);

    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setStep(nextStep as string);

      // Handle API calls based on the current step
      if (step === "website") {
        setIsLoading(true);
        completeOnboarding.mutate({
          firstName: userData.name?.split(" ")[0] || "User",
          lastName: userData.name?.split(" ").slice(1).join(" ") || "User",
          businessType: userData.businessType || "",
          websiteUrl: userData.website || "",
        });
      }
    } else {
      // Onboarding complete, redirect to dashboard
      if (userData.projectSlug) {
        router.push(`/dashboard/${userData.projectSlug}`);
      }
    }
  };

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <ProgressIndicator
            steps={["welcome", "business-type", "website", "completion"]}
            currentStep={step}
          />
          <p className="mt-4 text-gray-600">
            {step === "website" && "Creating your project..."}
            {step === "business-type" && "Scraping your website..."}
            {step === "completion" && "Updating project details..."}
          </p>
        </div>
      );
    }

    switch (step) {
      case "welcome":
        return <WelcomeStep onNext={handleNext} />;
      case "business-type":
        return <BusinessTypeStep onNext={handleNext} userData={userData} />;
      case "website":
        return <WebsiteStep onNext={handleNext} userData={userData} />;
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

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
