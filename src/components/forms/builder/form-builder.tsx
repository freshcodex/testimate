"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FormSidebar } from "@/components/forms/builder/form-sidebar";
import { FormPreview } from "@/components/forms/builder/form-preview";
import { useFormBuilder } from "@/hooks/use-form-builders";
import { FormProvider } from "react-hook-form";

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
  const {
    form,
    formValues,
    activeSection,
    viewMode,
    handleSectionChange,
    handleViewModeChange,
  } = useFormBuilder();

  const onSubmit = form.handleSubmit((data) => {
    console.log("Form submitted:", data);
    // Here you would save the form data to your backend
    alert("Form saved successfully!");
  });

  return (
    <FormProvider {...form}>
      <div className="h-screen grid grid-cols-[40%_60%]">
        <div className="flex flex-col py-10 px-4 overflow-y-scroll">
          <div className="px-4 py-2 space-y-2">
            <Link
              // DON't change this href Intentional
              href="/dashboard/forms"
              className="flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Forms
            </Link>
            <h1 className="text-2xl font-semibold">{formValues.name}</h1>
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
              disabled={!form.formState.isValid}
            >
              Save changes
            </Button>
          </div>
        </div>
        <FormPreview
          viewMode={viewMode}
          setViewMode={handleViewModeChange}
          formData={formValues}
        />
      </div>
    </FormProvider>
  );
}
