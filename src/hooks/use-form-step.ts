import { useQueryState } from "nuqs";

export type FormStep =
  | "welcome"
  | "response"
  | "customer-details"
  | "thank-you";

export function useFormStep(): {
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
} {
  const [currentStep, setCurrentStep] = useQueryState("step", {
    defaultValue: "welcome",
    parse: (value): FormStep => {
      if (
        value === "welcome" ||
        value === "response" ||
        value === "customer-details" ||
        value === "thank-you"
      ) {
        return value as FormStep;
      }
      return "welcome";
    },
  });

  return {
    currentStep: currentStep as FormStep,
    setCurrentStep,
  };
}
