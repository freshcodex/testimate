"use client";

import type { FormValues } from "@/lib/schema/form-schema";
import { ResponsePage } from "../../shared/response-page";

interface ResponsePreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function ResponsePreview({ viewMode, formData }: ResponsePreviewProps) {
  return <ResponsePage viewMode={viewMode} formData={formData} />;
}
