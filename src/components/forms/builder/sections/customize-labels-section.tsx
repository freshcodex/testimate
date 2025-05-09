"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FormValues } from "@/lib/schema/form-schema";

const LABEL_FIELDS = [
  { name: "recordVideoButton", label: "Record a video button" },
  { name: "writeReviewButton", label: "Write a review button" },
  { name: "videoTestimonialPageTitle", label: "Video testimonial page title" },
  { name: "openRecorderButton", label: "Open recorder button" },
  { name: "uploadFileButton", label: "Upload a file button" },
  { name: "recorderErrorMessage", label: "Recorder error message" },
  { name: "textTestimonialPageTitle", label: "Text Testimonial Page Title" },
  { name: "textTestimonialPlaceholder", label: "Text Testimonial Placeholder" },
  { name: "submitButtonLabel", label: "Submit Button Label" },
  { name: "attributionPageTitle", label: "Attribution Page Title" },
  { name: "yourName", label: "Your Name" },
  { name: "namePlaceholder", label: "Name Placeholder" },
  { name: "emailAddress", label: "Email Address" },
  { name: "emailPlaceholder", label: "Email Placeholder" },
  { name: "headline", label: "Headline" },
  { name: "taglinePlaceholder", label: "Tagline Placeholder" },
  { name: "pickAnImageLabel", label: "Pick an image label" },
  { name: "yourWebsite", label: "Your website" },
  { name: "websitePlaceholder", label: "Website Placeholder" },
  { name: "yourAvatar", label: "Your avatar" },
  { name: "company", label: "Company" },
  { name: "companyPlaceholder", label: "Company Placeholder" },
  { name: "companyLogo", label: "Company Logo" },
  { name: "teamLabel", label: "Team Label" },
  { name: "customFieldPlaceholder", label: "Custom Field Placeholder" },
  { name: "selectPlaceholder", label: "Select Placeholder" },
  { name: "shareYourTestimonial", label: "Share your testimonial" },
  { name: "marketingConsent", label: "Marketing Consent" },
];

export function CustomizeLabelsSection() {
  const { control, getValues } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      {LABEL_FIELDS.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={`customLabels.${field.name}` as any}
          render={({ field: inputField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  {...inputField}
                  value={
                    getValues(`customLabels.${field.name}` as any) ??
                    inputField.value
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
