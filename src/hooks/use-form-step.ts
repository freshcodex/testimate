import { useQueryState } from "nuqs";

export type FormStep = "welcome" | "response" | "thank-you";

export function useFormStep() {
  const [currentStep, setCurrentStep] = useQueryState("step", {
    defaultValue: "welcome",
    parse: (value): FormStep => {
      if (
        value === "welcome" ||
        value === "response" ||
        value === "thank-you"
      ) {
        return value;
      }
      return "welcome";
    },
  });

  return {
    currentStep,
    setCurrentStep,
  };
}
