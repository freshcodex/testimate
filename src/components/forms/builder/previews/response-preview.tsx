"use client";

import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import { ResponsePage } from "../../shared/response-page";

interface ResponsePreviewProps {
  viewMode: "desktop" | "mobile";
  collectionFormConfig: CollectionFormConfig;
}

export function ResponsePreview({
  viewMode,
  collectionFormConfig,
}: ResponsePreviewProps) {
  return (
    <ResponsePage
      viewMode={viewMode}
      collectionFormConfig={collectionFormConfig}
    />
  );
}
