"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FormSidebar } from "@/components/forms/builder/form-sidebar";
import { FormPreview } from "@/components/forms/builder/form-preview";

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
  const [activeSection, setActiveSection] = useState<FormSection>("design");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");

  // Form data state
  const [formData, setFormData] = useState({
    name: "My testimonial form",
    design: {
      logo: "heart",
      primaryColor: "#6701E6",
      backgroundColor: "#FFFFFF",
      font: "Default",
      showGradient: true,
    },
    content: {
      title: "Share a testimonial!",
      description: "Do you love using our product? We'd love to hear about it!",
      bullets: [
        "Share your experience with a quick video or text testimonial",
        "Recording a video? Don't forget to smile 😊",
      ],
    },
  });

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as Record<string, any>),
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/forms"
          className="flex items-center text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Forms
        </Link>
        <h1 className="ml-4 text-lg font-semibold">{formData.name}</h1>
        <div className="ml-auto">
          <Button
            variant="default"
            className="bg-black text-white hover:bg-gray-800"
          >
            Save changes
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <FormSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          formData={formData}
          updateFormData={updateFormData}
        />
        <FormPreview
          viewMode={viewMode}
          setViewMode={setViewMode}
          formData={formData}
        />
      </div>
    </div>
  );
}
