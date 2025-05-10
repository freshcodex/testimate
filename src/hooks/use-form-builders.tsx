"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  type CollectionFormConfig,
  collectionFormSchema,
} from "@/lib/schema/form-schema";
import type { FormSection } from "@/components/forms/builder/form-builder";

export function useFormBuilder() {
  // Active section state
  const [activeSection, setActiveSection] = useState<FormSection>("design");

  // View mode state (desktop or mobile)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");

  // Initialize form with default values
  const form = useForm<CollectionFormConfig>({
    resolver: zodResolver(collectionFormSchema),
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
        emailEnabled: true,
        emailRequired: true,
        jobTitleEnabled: true,
        jobTitleRequired: false,
        userPhotoEnabled: true,
        userPhotoRequired: false,
        websiteUrlEnabled: true,
        websiteUrlRequired: false,
        companyEnabled: true,
        companyRequired: false,
        teamEnabled: false,
        teamRequired: false,
        companyLogoEnabled: true,
        companyLogoRequired: false,
      },
      thankYouPage: {
        title: "Thank you for your testimonial!",
        message: "We appreciate you taking the time to share your experience.",
        showSocialShare: true,
      },
      additionalFields: [],
      customLabels: {
        recordVideoButton: "Record a video",
        writeReviewButton: "Write a testimonial",
        videoTestimonialPageTitle: "Record a video testimonial",
        openRecorderButton: "Open recorder",
        uploadFileButton: "Upload a file",
        recorderErrorMessage:
          "We can't access your camera. To enable access: click the lock icon in your browser bar.",
        textTestimonialPageTitle: "Write a text testimonial",
        textTestimonialPlaceholder: "Write something nice ✨",
        submitButtonLabel: "Submit",
        attributionPageTitle: "Almost done 🙌",
        yourName: "Your Name",
        namePlaceholder: "Sherlock Holmes",
        emailAddress: "Email address",
        emailPlaceholder: "sherlock@bakerstreet.com",
        headline: "Job Title",
        taglinePlaceholder: "Head of Investigations",
        pickAnImageLabel: "Pick an image",
        yourWebsite: "Company Website",
        websitePlaceholder: "https://bakerstreet.com",
        yourAvatar: "Your Photo",
        company: "Company",
        companyPlaceholder: "Baker Street Detectives",
        companyLogo: "Company Logo",
        teamLabel: "Team",
        customFieldPlaceholder: "Enter details here",
        selectPlaceholder: "Select an option",
        shareYourTestimonial: "Share your testimonial",
        marketingConsent:
          "By submitting, you give us permission to use this testimonial across social channels.",
      },
    },
  });

  // Get form values for preview
  const collectionFormConfig = form.watch();

  // Helper to add an additional field
  const addAdditionalField = (
    field: CollectionFormConfig["additionalFields"][number]
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
    collectionFormConfig,
    activeSection,
    viewMode,
    handleSectionChange,
    handleViewModeChange,
    addAdditionalField,
  };
}
