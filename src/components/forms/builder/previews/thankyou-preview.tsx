"use client";

import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import { ThankYouPage } from "../../shared/thankyou-page";

interface ThankYouPreviewProps {
  viewMode: "desktop" | "mobile";
  collectionFormConfig: CollectionFormConfig;
}

export function ThankYouPreview({
  viewMode,
  collectionFormConfig,
}: ThankYouPreviewProps) {
  return (
    <ThankYouPage
      viewMode={viewMode}
      collectionFormConfig={collectionFormConfig}
    />
  );
}
