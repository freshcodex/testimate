import type { FormValues } from "@/lib/schema/form-schema";
import { WelcomeHeader } from "./welcome-header";
import { ResponseContent } from "./response-content";
import { useParams } from "next/navigation";

interface ResponsePageProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function ResponsePage({ viewMode, formData }: ResponsePageProps) {
  const { design, responsePage } = formData;
  const isMobile = viewMode === "mobile";

  const { projectSlug, formId } = useParams();

  if (isMobile) {
    return (
      <div className="flex h-full flex-col">
        <WelcomeHeader
          primaryColor={design.primaryColor}
          showGradient={design.showGradient}
        />
        <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg">
          <ResponseContent
            prompt={responsePage.prompt}
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
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg">
        <div className="mx-auto max-w-md">
          <ResponseContent
            prompt={responsePage.prompt}
            primaryColor={design.primaryColor}
            formId={Number(formId)}
            projectSlug={String(projectSlug)}
          />
        </div>
      </div>
    </div>
  );
}
