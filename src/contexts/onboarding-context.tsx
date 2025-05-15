import { createContext, useContext, useState } from "react";
import { useQueryState } from "nuqs";
import type { ReactNode } from "react";
export interface UserData {
  name: string;
  businessType: string;
  website: string;
  projectSlug?: string;
}

export interface OnboardingContextType {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  step: string;
  setStep: (step: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  scrapedData: any;
  setScrapedData: (data: any) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useQueryState("step", { defaultValue: "welcome" });
  const [userData, setUserDataState] = useState<UserData>({
    name: "",
    businessType: "",
    website: "",
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => ({ ...prev, ...data }));
  };

  const value = {
    userData,
    setUserData,
    step,
    setStep,
    isLoading,
    setIsLoading,
    showConfetti,
    setShowConfetti,
    scrapedData,
    setScrapedData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
