import type { FormValues } from "@/lib/schema/form-schema";
import { WelcomeHeader } from "./welcome-header";
import { ResponseContent } from "./response-content";

interface ResponsePageProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function ResponsePage({ viewMode, formData }: ResponsePageProps) {
  const { design, responsePage } = formData;
  const isMobile = viewMode === "mobile";

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
            collectRatings={responsePage.collectRatings}
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
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg">
        <div className="mx-auto max-w-md">
          <ResponseContent
            prompt={responsePage.prompt}
            collectRatings={responsePage.collectRatings}
            primaryColor={design.primaryColor}
          />
        </div>
      </div>
    </div>
  );
}
