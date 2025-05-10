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

  const buttonContainerClass = isMobile ? "flex flex-col gap-2" : "flex gap-4";
  const titleClass = isMobile ? "text-lg" : "text-xl";
  const messageClass = isMobile ? "text-sm" : "";
  const containerClass = isMobile ? "p-4" : "p-6";

  const handleTextClick = () => {
    setCurrentStep("response");
  };

  return (
    <div className={`rounded-lg bg-white ${containerClass} shadow-sm`}>
      <h2 className={`mb-2 text-center ${titleClass} font-semibold`}>
        {config.title}
      </h2>
      <div
        className={`mb-4 text-center text-gray-700 whitespace-pre-line ${messageClass}`}
      >
        {config.introductoryMessage}
      </div>

      <div className={buttonContainerClass}>
        {config.collectVideo && (
          <Button
            className={
              isMobile ? "w-full justify-center" : "flex-1 justify-center"
            }
            style={{ backgroundColor: design.primaryColor }}
          >
            <Video className="mr-2 h-4 w-4" />
            {customLabels.recordVideoButton}
          </Button>
        )}

        {config.collectText && (
          <Button
            variant="outline"
            className={
              isMobile ? "w-full justify-center" : "flex-1 justify-center"
            }
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
