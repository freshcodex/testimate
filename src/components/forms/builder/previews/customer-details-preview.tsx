"use client";

import type { FormValues } from "@/lib/schema/form-schema";
import { CustomerDetailsPage } from "../../shared/customer-details-page";

interface CustomerDetailsPreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function CustomerDetailsPreview({
  viewMode,
  formData,
}: CustomerDetailsPreviewProps) {
  return <CustomerDetailsPage viewMode={viewMode} formData={formData} />;
}
