import { Button } from "@/components/ui/button";
import { Video, PenLine } from "lucide-react";

interface WelcomeContentProps {
  title: string;
  introductoryMessage: string;
  collectVideo: boolean;
  collectText: boolean;
  primaryColor: string;
  isMobile?: boolean;
}

export function WelcomeContent({
  title,
  introductoryMessage,
  collectVideo,
  collectText,
  primaryColor,
  isMobile = false,
}: WelcomeContentProps) {
  const buttonContainerClass = isMobile ? "flex flex-col gap-2" : "flex gap-4";
  const titleClass = isMobile ? "text-lg" : "text-xl";
  const messageClass = isMobile ? "text-sm" : "";
  const containerClass = isMobile ? "p-4" : "p-6";

  return (
    <div className={`rounded-lg bg-white ${containerClass} shadow-sm`}>
      <h2 className={`mb-2 text-center ${titleClass} font-semibold`}>
        {title}
      </h2>
      <div
        className={`mb-4 text-center text-gray-700 whitespace-pre-line ${messageClass}`}
      >
        {introductoryMessage}
      </div>

      <div className={buttonContainerClass}>
        {collectVideo && (
          <Button
            className={
              isMobile ? "w-full justify-center" : "flex-1 justify-center"
            }
            style={{ backgroundColor: primaryColor }}
          >
            <Video className="mr-2 h-4 w-4" />
            Record a video
          </Button>
        )}

        {collectText && (
          <Button
            variant="outline"
            className={
              isMobile ? "w-full justify-center" : "flex-1 justify-center"
            }
          >
            <PenLine className="mr-2 h-4 w-4" />
            Write a testimonial
          </Button>
        )}
      </div>
    </div>
  );
}
