import type { FormValues } from "@/lib/schema/form-schema";
import { WelcomeHeader } from "./welcome-header";
import { CustomerDetailsContent } from "./customer-details-content";
import { useParams } from "next/navigation";

interface CustomerDetailsPageProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function CustomerDetailsPage({
  viewMode,
  formData,
}: CustomerDetailsPageProps) {
  const { design, customerDetails } = formData;
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
            emailEnabled={customerDetails.emailEnabled}
            jobTitleEnabled={customerDetails.jobTitleEnabled}
            companyEnabled={customerDetails.companyEnabled}
            primaryColor={design.primaryColor}
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
            emailEnabled={customerDetails.emailEnabled}
            jobTitleEnabled={customerDetails.jobTitleEnabled}
            companyEnabled={customerDetails.companyEnabled}
            primaryColor={design.primaryColor}
            formId={Number(formId)}
            projectSlug={String(projectSlug)}
          />
        </div>
      </div>
    </div>
  );
}
