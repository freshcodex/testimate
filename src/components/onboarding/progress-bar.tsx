interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-purple-600 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
