"use client";

import { Monitor, Smartphone } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import type { FormSection } from "./form-builder";
import { WelcomePreview } from "./previews/welcome-preview";
import { ResponsePreview } from "./previews/response-preview";
import { CustomerDetailsPreview } from "./previews/customer-details-preview";
import { ThankYouPreview } from "./previews/thankyou-preview";
import { useFormStep } from "@/hooks/use-form-step";

interface FormPreviewProps {
  viewMode: "desktop" | "mobile";
  setViewMode: (mode: "desktop" | "mobile") => void;
  collectionFormConfig: CollectionFormConfig;
  activeSection: FormSection;
}

export function FormPreview({
  viewMode,
  setViewMode,
  collectionFormConfig,
  activeSection,
}: FormPreviewProps) {
  return (
    <div className="flex flex-1 flex-col bg-gray-100">
      <div className="flex h-12 items-center justify-between border-b bg-white px-4">
        <div className="text-sm text-gray-500">
          {viewMode === "mobile" ? "Mobile preview" : "Desktop preview"}
        </div>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) =>
            value && setViewMode(value as "desktop" | "mobile")
          }
        >
          <ToggleGroupItem value="desktop" aria-label="Desktop view">
            <Monitor className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="mobile" aria-label="Mobile view">
            <Smartphone className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        {viewMode === "mobile" ? (
          <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[40px] border-8 border-black bg-white shadow-xl">
            <div className="absolute inset-x-0 top-0 h-6 bg-black"></div>
            <div className="absolute inset-x-0 bottom-0 h-6 bg-black"></div>
            <div className="h-full overflow-hidden">
              <PreviewContent
                viewMode="mobile"
                collectionFormConfig={collectionFormConfig}
                activeSection={activeSection}
              />
            </div>
          </div>
        ) : (
          <div className="h-[600px] w-[800px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <PreviewContent
              viewMode="desktop"
              collectionFormConfig={collectionFormConfig}
              activeSection={activeSection}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface PreviewContentProps {
  viewMode: "desktop" | "mobile";
  collectionFormConfig: CollectionFormConfig;
  activeSection: FormSection;
}

function PreviewContent({
  viewMode,
  collectionFormConfig,
  activeSection,
}: PreviewContentProps) {
  const { currentStep } = useFormStep();

  const previewComponents: Record<
    string,
    React.ComponentType<{
      viewMode: "desktop" | "mobile";
      collectionFormConfig: CollectionFormConfig;
    }>
  > = {
    welcome: WelcomePreview,
    response: ResponsePreview,
    customer: CustomerDetailsPreview,
    "thank-you": ThankYouPreview,
    "customer-details": CustomerDetailsPreview,
  };

  // Determine which component to render based on activeSection or currentStep
  const Component =
    previewComponents[activeSection] ||
    previewComponents[currentStep] ||
    WelcomePreview;

  return (
    <Component
      viewMode={viewMode}
      collectionFormConfig={collectionFormConfig}
    />
  );
}
