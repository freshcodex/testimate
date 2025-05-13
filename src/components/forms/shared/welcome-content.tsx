import { Button } from "@/components/ui/button";
import { Video, PenLine } from "lucide-react";
import { useFormStep } from "@/hooks/use-form-step";
import type { CollectionFormProps } from "./thankyou-page";

interface WelcomeContentProps {
  config: CollectionFormProps["collectionFormConfig"]["welcomePage"];
  isMobile?: boolean;
  customLabels: CollectionFormProps["collectionFormConfig"]["customLabels"];
  design: CollectionFormProps["collectionFormConfig"]["design"];
}

export function WelcomeContent({
  config,
  isMobile = false,
  customLabels,
  design,
}: WelcomeContentProps) {
  const { setCurrentStep } = useFormStep();

  const handleTextClick = () => {
    setCurrentStep("response");
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-2 text-center text-lg font-semibold sm:text-xl">
        {config.title}
      </h2>
      <div className="mb-4 text-center text-sm text-gray-700 whitespace-pre-line sm:text-base">
        {config.introductoryMessage}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        {config.collectVideo && (
          <Button
            className="w-full justify-center sm:flex-1"
            style={{ backgroundColor: design.primaryColor }}
          >
            <Video className="mr-2 h-4 w-4" />
            {customLabels.recordVideoButton}
          </Button>
        )}

        {config.collectText && (
          <Button
            variant="outline"
            className="w-full justify-center sm:flex-1"
            onClick={handleTextClick}
          >
            <PenLine className="mr-2 h-4 w-4" />
            {customLabels.writeReviewButton}
          </Button>
        )}
      </div>
    </div>
  );
}
