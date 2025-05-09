"use client";

import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { ResponsePage } from "@/components/forms/shared/response-page";
import { WelcomePage } from "@/components/forms/shared/welcome-page";
import { ThankYouPage } from "@/components/forms/shared/thankyou-page";
import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import type { FormValues } from "@/lib/schema/form-schema";
import type {
  CustomerDetailsConfig,
  ResponsePageConfig,
  CustomLabels,
  WelcomePageConfig,
  AdditionalFields,
  ThankYouPageConfig,
} from "@/server/db/schema";
import type { DesignConfig } from "@/server/db/schema";

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
  const [currentStep, setCurrentStep] = useQueryState("step", {
    defaultValue: "welcome",
    parse: (value): "welcome" | "response" | "thank-you" => {
      if (
        value === "welcome" ||
        value === "response" ||
        value === "thank-you"
      ) {
        return value;
      }
      return "welcome";
    },
  });
  const [formData, setFormData] = useState<FormValues | null>(null);

  const { data: form, isLoading } = api.collectionForms.getById.useQuery({
    id: Number(params.formId),
  });

  useEffect(() => {
    if (form) {
      setFormData({
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

  if (isLoading || !formData) {
    return <FormSkeleton />;
  }

  const handleSubmit = async (response: any) => {
    // TODO: Implement form submission
    setCurrentStep("thank-you");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" bg-gray-50">
        {currentStep === "welcome" && (
          <div className="h-full" onClick={() => setCurrentStep("response")}>
            <WelcomePage viewMode="desktop" formData={formData} />
          </div>
        )}
        {currentStep === "response" && (
          <div onClick={() => setCurrentStep("thank-you")}>
            <ResponsePage viewMode="desktop" formData={formData} />
          </div>
        )}
        {currentStep === "thank-you" && (
          <ThankYouPage viewMode="desktop" formData={formData} />
        )}
      </div>
    </div>
  );
}
