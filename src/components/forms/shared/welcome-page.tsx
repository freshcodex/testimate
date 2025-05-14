import { WelcomeHeader } from "./welcome-header";
import { WelcomeContent } from "./welcome-content";
import type { CollectionFormProps } from "./thankyou-page";

export function WelcomePage({
  viewMode,
  collectionFormConfig,
}: CollectionFormProps) {
  const { design, welcomePage } = collectionFormConfig;
  const isMobile = viewMode === "mobile";

  return (
    <div className="flex h-full flex-col">
      <WelcomeHeader
        primaryColor={design.primaryColor}
        showGradient={design.showGradient}
        logoUrl={design.logo}
      />
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 py-6 shadow-lg sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-md">
          <WelcomeContent
            config={welcomePage}
            customLabels={collectionFormConfig.customLabels}
            design={design}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}
