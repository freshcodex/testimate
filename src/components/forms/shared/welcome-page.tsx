import { WelcomeHeader } from "./welcome-header";
import { WelcomeContent } from "./welcome-content";
import type { CollectionFormProps } from "./thankyou-page";

export function WelcomePage({
  viewMode,
  collectionFormConfig,
}: CollectionFormProps) {
  const { design, welcomePage } = collectionFormConfig;
  const isMobile = viewMode === "mobile";

  if (isMobile) {
    return (
      <div className="flex h-full flex-col">
        <WelcomeHeader
          primaryColor={design.primaryColor}
          showGradient={design.showGradient}
        />
        <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg">
          <WelcomeContent
            config={welcomePage}
            customLabels={collectionFormConfig.customLabels}
            design={design}
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
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg">
        <div className="mx-auto max-w-md">
          <WelcomeContent
            config={welcomePage}
            customLabels={collectionFormConfig.customLabels}
            design={design}
          />
        </div>
      </div>
    </div>
  );
}
