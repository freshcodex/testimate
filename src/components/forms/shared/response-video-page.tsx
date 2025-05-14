import { WelcomeHeader } from "./welcome-header";
import { useParams } from "next/navigation";
import type { CollectionFormProps } from "./thankyou-page";
import { ResponseVideoContent } from "./response-video-content";

export function ResponseVideoPage({
  viewMode,
  collectionFormConfig,
}: CollectionFormProps) {
  const { design, responsePage } = collectionFormConfig;
  const isMobile = viewMode === "mobile";

  const { projectSlug, formId } = useParams();

  if (isMobile) {
    return (
      <div className="flex h-full flex-col">
        <WelcomeHeader
          primaryColor={design.primaryColor}
          showGradient={design.showGradient}
          logoUrl={design.logo}
        />
        <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg overflow-auto">
          <ResponseVideoContent
            config={responsePage}
            customLabels={collectionFormConfig.customLabels}
            design={design}
            isMobile={true}
            formId={Number(formId)}
            projectSlug={String(projectSlug)}
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
        logoUrl={design.logo}
      />
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg">
        <div className="mx-auto max-w-md">
          <ResponseVideoContent
            config={responsePage}
            customLabels={collectionFormConfig.customLabels}
            design={design}
            formId={Number(formId)}
            projectSlug={String(projectSlug)}
          />
        </div>
      </div>
    </div>
  );
}
