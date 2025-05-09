"use client";

import type { FormValues } from "@/lib/schema/form-schema";
import { WelcomePage } from "../../shared/welcome-page";

interface WelcomePreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function WelcomePreview({ viewMode, formData }: WelcomePreviewProps) {
  return <WelcomePage viewMode={viewMode} formData={formData} />;
}
