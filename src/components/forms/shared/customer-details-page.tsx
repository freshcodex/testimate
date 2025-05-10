import { WelcomeHeader } from "./welcome-header";
import { CustomerDetailsContent } from "./customer-details-content";
import { useParams } from "next/navigation";
import type { CollectionFormProps } from "./thankyou-page";

export function CustomerDetailsPage({
  viewMode,
  collectionFormConfig,
}: CollectionFormProps) {
  const { design, customerDetails } = collectionFormConfig;
  const isMobile = viewMode === "mobile";

  const { formId, projectSlug } = useParams();

  if (isMobile) {
    return (
      <div className="flex h-full flex-col">
        <WelcomeHeader
          primaryColor={design.primaryColor}
          showGradient={design.showGradient}
        />
        <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg overflow-auto">
          <CustomerDetailsContent
            config={customerDetails}
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
      />
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg overflow-auto">
        <div className="mx-auto max-w-md">
          <CustomerDetailsContent
            config={customerDetails}
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
