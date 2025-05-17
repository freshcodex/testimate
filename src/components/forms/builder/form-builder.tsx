"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FormSidebar } from "@/components/forms/builder/form-sidebar";
import { FormPreview } from "@/components/forms/builder/form-preview";
import { useFormBuilder } from "@/hooks/use-form-builders";
import { FormProvider } from "react-hook-form";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

// TODO: keep this in central place for reusability
export type FormSection =
  | "design"
  | "welcome"
  | "response"
  | "customer"
  | "thank-you"
  | "word-of-mouth"
  | "collect-more"
  | "language"
  | "auto-translate"
  | "customize-labels"
  | "custom-domain"
  | "remove-branding"
  | "advanced";

export function FormBuilder() {
  const router = useRouter();
  const { projectSlug } = useParams();
  const {
    form,
    collectionFormConfig,
    activeSection,
    viewMode,
    handleSectionChange,
    handleViewModeChange,
  } = useFormBuilder();

  const utils = api.useUtils();
  const createForm = api.collectionForms.create.useMutation({
    onSuccess: async (data) => {
      await utils.collectionForms.getAll.invalidate();
      toast.success("Form saved successfully!");
      router.push(`/dashboard/${projectSlug}/forms/${data?.id}/share`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    createForm.mutate({
      title: data.name,
      projectSlug: projectSlug as string,
      design: data.design,
      welcomePage: data.welcomePage,
      responsePage: data.responsePage,
      customerDetails: data.customerDetails,
      thankYouPage: data.thankYouPage,
      customFields: data.additionalFields,
      customLabels: data.customLabels,
    });
  });

  return (
    <FormProvider {...form}>
      <div className="h-screen grid grid-cols-[40%_60%]">
        <div className="flex flex-col py-10 px-4 overflow-y-scroll">
          <div className="px-4 py-2 space-y-2">
            <Link
              href={`/dashboard/${projectSlug}/forms`}
              className="flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Forms
            </Link>
            <h1 className="text-2xl font-semibold">
              {collectionFormConfig.name}
            </h1>
          </div>
          <FormSidebar
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
          />
          <div className="mt-auto px-4 py-2">
            <Button
              variant="default"
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={onSubmit}
              disabled={!form.formState.isValid || createForm.isPending}
            >
              {createForm.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
        <FormPreview
          viewMode={viewMode}
          setViewMode={handleViewModeChange}
          collectionFormConfig={collectionFormConfig}
          activeSection={activeSection}
        />
      </div>
    </FormProvider>
  );
}
