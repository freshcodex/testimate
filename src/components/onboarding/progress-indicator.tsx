interface ProgressIndicatorProps {
  steps: string[];
  currentStep: string;
}

export function ProgressIndicator({
  steps,
  currentStep,
}: ProgressIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center space-x-2">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`h-2 rounded-full ${
            index <= currentIndex ? "bg-purple-600" : "bg-gray-200"
          } ${index === 0 || index === steps.length - 1 ? "w-4" : "w-12"}`}
        />
      ))}
    </div>
  );
}
