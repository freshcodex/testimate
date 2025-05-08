"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type FormValues, formSchema } from "@/lib/schema/form-schema";
import type { FormSection } from "@/components/forms/builder/form-builder";

export function useFormBuilder() {
  // Active section state
  const [activeSection, setActiveSection] = useState<FormSection>("design");

  // View mode state (desktop or mobile)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "My testimonial form",
      design: {
        logo: "heart",
        primaryColor: "#6701E6",
        backgroundColor: "#FFFFFF",
        font: "Default",
        showGradient: true,
      },
      welcomePage: {
        title: "Share a testimonial!",
        introductoryMessage:
          "Do you love using our product? We'd love to hear about it!\n\n- Share your experience with a quick video or text testimonial\n- Recording a video? Don't forget to smile 😊",
        collectVideo: true,
        collectText: true,
        welcomeVideoMessage:
          "Upgrade your plan to record a welcome video for your form.",
      },
      responsePage: {
        useDifferentPrompts: false,
        prompt:
          "- What do you like most about us?\n- Would you recommend us to a friend?",
        collectRatings: true,
        collectImageAttachments: false,
      },
      customerDetails: {
        collectName: true,
        collectEmail: true,
        collectCompany: false,
        collectJobTitle: false,
      },
      thankYouPage: {
        title: "Thank you for your testimonial!",
        message: "We appreciate you taking the time to share your experience.",
        showSocialShare: true,
      },
    },
  });

  // Get form values for preview
  const formValues = form.watch();

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
  };
}
