import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import { WelcomeHeader } from "./welcome-header";
import { ThankYouContent } from "./thankyou-content";

export interface CollectionFormProps {
  viewMode: "desktop" | "mobile";
  collectionFormConfig: CollectionFormConfig;
}

export function ThankYouPage({
  viewMode,
  collectionFormConfig,
}: CollectionFormProps) {
  const { design, thankYouPage } = collectionFormConfig;
  const isMobile = viewMode === "mobile";

  if (isMobile) {
    return (
      <div className="flex h-full flex-col">
        <WelcomeHeader
          primaryColor={design.primaryColor}
          showGradient={design.showGradient}
        />
        <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg overflow-auto">
          <ThankYouContent
            title={thankYouPage.title}
            message={thankYouPage.message}
            showSocialShare={thankYouPage.showSocialShare}
            primaryColor={design.primaryColor}
            isMobile={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <WelcomeHeader
        primaryColor={design.primaryColor}
        showGradient={design.showGradient}
      />
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg overflow-auto">
        <div className="mx-auto max-w-md">
          <ThankYouContent
            title={thankYouPage.title}
            message={thankYouPage.message}
            showSocialShare={thankYouPage.showSocialShare}
            primaryColor={design.primaryColor}
          />
        </div>
      </div>
    </div>
  );
}
