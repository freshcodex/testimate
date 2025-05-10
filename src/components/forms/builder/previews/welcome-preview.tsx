"use client";

import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import { WelcomePage } from "../../shared/welcome-page";

interface WelcomePreviewProps {
  viewMode: "desktop" | "mobile";
  collectionFormConfig: CollectionFormConfig;
}

export function WelcomePreview({
  viewMode,
  collectionFormConfig,
}: WelcomePreviewProps) {
  return (
    <WelcomePage
      viewMode={viewMode}
      collectionFormConfig={collectionFormConfig}
    />
  );
}
