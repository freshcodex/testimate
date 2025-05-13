"use client";

import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { ResponsePage } from "@/components/forms/shared/response-page";
import { WelcomePage } from "@/components/forms/shared/welcome-page";
import { ThankYouPage } from "@/components/forms/shared/thankyou-page";
import { CustomerDetailsPage } from "@/components/forms/shared/customer-details-page";
import { useState, useEffect } from "react";
import { useFormStep } from "@/hooks/use-form-step";
import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import type {
  CustomerDetailsConfig,
  ResponsePageConfig,
  CustomLabels,
  WelcomePageConfig,
  AdditionalFields,
  ThankYouPageConfig,
} from "@/server/db/zod-schemas";
import type { DesignConfig } from "@/server/db/zod-schemas";
import { useIsMobile } from "@/hooks/use-mobile";

function FormSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-3xl py-8 px-4">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse mt-6"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SharedFormPage() {
  const params = useParams();
  const { currentStep } = useFormStep();
  const [collectionFormConfig, setCollectionFormData] =
    useState<CollectionFormConfig | null>(null);

  const { data: form, isLoading } = api.collectionForms.getById.useQuery({
    id: Number(params.formId),
  });

  const isMobile = useIsMobile();

  useEffect(() => {
    if (form) {
      setCollectionFormData({
        name: form.title,
        design: form?.design as DesignConfig,
        welcomePage: form?.welcomePage as WelcomePageConfig,
        responsePage: form?.responsePage as ResponsePageConfig,
        customerDetails: form?.customerDetails as CustomerDetailsConfig,
        thankYouPage: form?.thankYouPage as ThankYouPageConfig,
        additionalFields: form?.customFields as AdditionalFields,
        customLabels: form?.customLabels as CustomLabels,
      });
    }
  }, [form]);

  if (isLoading || !collectionFormConfig) {
    return <FormSkeleton />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:py-8">
        {currentStep === "welcome" && (
          <div className="h-full">
            <WelcomePage
              viewMode={isMobile ? "mobile" : "desktop"}
              collectionFormConfig={collectionFormConfig}
            />
          </div>
        )}
        {currentStep === "response" && (
          <div className="h-full">
            <ResponsePage
              viewMode={isMobile ? "mobile" : "desktop"}
              collectionFormConfig={collectionFormConfig}
            />
          </div>
        )}
        {currentStep === "customer-details" && (
          <div className="h-full">
            <CustomerDetailsPage
              viewMode={isMobile ? "mobile" : "desktop"}
              collectionFormConfig={collectionFormConfig}
            />
          </div>
        )}
        {currentStep === "thank-you" && (
          <div className="h-full">
            <ThankYouPage
              viewMode={isMobile ? "mobile" : "desktop"}
              collectionFormConfig={collectionFormConfig}
            />
          </div>
        )}
      </div>
    </div>
  );
}
