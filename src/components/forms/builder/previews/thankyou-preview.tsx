"use client";

import type { FormValues } from "@/lib/schema/form-schema";
import { ThankYouPage } from "../../shared/thankyou-page";

interface ThankYouPreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function ThankYouPreview({ viewMode, formData }: ThankYouPreviewProps) {
  return <ThankYouPage viewMode={viewMode} formData={formData} />;
}
