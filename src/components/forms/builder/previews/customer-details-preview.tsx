"use client";

import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import { CustomerDetailsPage } from "../../shared/customer-details-page";

interface CustomerDetailsPreviewProps {
  viewMode: "desktop" | "mobile";
  collectionFormConfig: CollectionFormConfig;
}

export function CustomerDetailsPreview({
  viewMode,
  collectionFormConfig,
}: CustomerDetailsPreviewProps) {
  return (
    <CustomerDetailsPage
      viewMode={viewMode}
      collectionFormConfig={collectionFormConfig}
    />
  );
}
