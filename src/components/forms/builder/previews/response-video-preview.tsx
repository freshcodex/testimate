"use client";

import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import { ResponseVideoPage } from "../../shared/response-video-page";

interface ResponseVideoPreviewProps {
  viewMode: "desktop" | "mobile";
  collectionFormConfig: CollectionFormConfig;
}

export function ResponseVideoPreview({
  viewMode,
  collectionFormConfig,
}: ResponseVideoPreviewProps) {
  return (
    <ResponseVideoPage
      viewMode={viewMode}
      collectionFormConfig={collectionFormConfig}
    />
  );
}
