import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { ProgressBar } from "./progress-bar";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  // Get current step from URL to calculate progress
  const getCurrentStep = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const step = params.get("step") || "welcome";
      const steps = [
        "welcome",
        "business-type",
        "website",
        "import",
        "completion",
      ];
      return steps.indexOf(step) + 1 || 1;
    }
    return 1;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 opacity-90 -z-10" />

      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className="h-6 w-6 text-white" />
          <span className="ml-2 text-white font-medium">Testimate</span>
        </div>
        <button className="text-white/80 hover:text-white text-sm">
          Skip setup →
        </button>
      </header>

      {/* Progress bar */}
      <div className="px-4">
        <ProgressBar currentStep={getCurrentStep()} totalSteps={5} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-white/70 text-sm">
        <p>© 2023 Testimate. All rights reserved.</p>
      </footer>
    </div>
  );
}
