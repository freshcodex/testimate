"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";

import { type FormValues, formSchema } from "@/lib/schema/form-schema";
import type { FormSection } from "@/components/forms/builder/form-builder";

export function useEditFormBuilder() {
  const params = useParams();
  const formId = Number(params.formId);

  // Active section state
  const [activeSection, setActiveSection] = useState<FormSection>("design");

  // View mode state (desktop or mobile)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");

  // Fetch form data
  const { data: formData } = api.collectionForms.getById.useQuery(
    { id: formId },
    {
      enabled: !!formId,
    }
  );

  // Initialize form with default values
  const form = useForm<FormValues>({
    // @ts-expect-error - TODO: Fix this
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData?.title ?? "My testimonial form",
      design: formData?.design ?? {}, // TODO: Get default values from zod schema
      welcomePage: {
        ...(formData?.welcomePage ?? {}),
        collectVideo: formData?.welcomePage?.collectVideo !== false,
        collectText: formData?.welcomePage?.collectText !== false,
      },
      responsePage: formData?.responsePage ?? {},
      customerDetails: formData?.customerDetails ?? {},
      thankYouPage: formData?.thankYouPage ?? {},
      additionalFields: formData?.customFields ?? [],
      customLabels: formData?.customLabels ?? {},
    },
  });

  // Update form values when formData changes
  useEffect(() => {
    if (formData) {
      form.reset({
        name: formData.title,
        design: formData.design || form.getValues("design"),
        welcomePage: formData.welcomePage || form.getValues("welcomePage"),
        responsePage: formData.responsePage || form.getValues("responsePage"),
        customerDetails:
          formData.customerDetails || form.getValues("customerDetails"),
        thankYouPage: formData.thankYouPage || form.getValues("thankYouPage"),
        additionalFields: formData.customFields || [],
        customLabels: formData.customLabels || form.getValues("customLabels"),
      });
    }
  }, [formData, form]);

  // Get form values for preview
  const formValues = form.watch();

  // Helper to add an additional field
  const addAdditionalField = (
    field: FormValues["additionalFields"][number]
  ) => {
    const current = form.getValues("additionalFields") || [];
    form.setValue("additionalFields", [...current, field]);
  };

  // Handle accordion section change
  const handleSectionChange = (section: FormSection) => {
    setActiveSection(section);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: "desktop" | "mobile") => {
    setViewMode(mode);
  };

  return {
    form,
    formValues,
    activeSection,
    viewMode,
    handleSectionChange,
    handleViewModeChange,
    addAdditionalField,
  };
}
