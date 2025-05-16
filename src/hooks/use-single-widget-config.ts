import { useState } from "react";
import type {
  Design,
  SingleWidgetConfig,
} from "@/components/studio/single-widget/types";

const defaultConfig: SingleWidgetConfig = {
  // Basic Settings
  design: "left-aligned" as Design,
  height: "800px",
  theme: "light",
  showBranding: true,
  showHeartAnimation: true,
  shadowBackground: true,
  showDate: true,
  showSource: true,
  showCaptions: false,
  showStarRating: false,

  // Colors
  primaryColor: "#6701E6",
  backgroundColor: "#FFFFFF",
  cardBackgroundColor: "#FFFFFF",
  textColor: "#000000",
  linkColor: "#6701E6",
  heartColor: "#DC2626",
  starColor: "#FBBF24",

  // Text Settings
  fontFamily: "Lato",
  fontSize: "base",
  highlightStyle: "gradient",

  // Video Settings
  showVideoDuration: true,
  playButtonColor: "#6701E6",

  // Button Settings
  buttonColor: "#6701E6",
  selectedButtonColor: "#4444FF",
  buttonAlignment: "left",
  buttonFontColor: "#FFFFFF",
  selectedFontColor: "#FFFFFF",

  // Border Settings
  borderWidth: "0px",
  borderColor: "#E5E7EB",
  borderRadius: "8px",

  // Shadow Settings
  shadowColor: "rgba(0, 0, 0, 0.1)",
  shadowBlur: "4px",
  shadowOffset: "0px 2px",

  // Tags Settings
  showTags: true,
  tagBackgroundColor: "#F3F4F6",
  tagTextColor: "#374151",
  tagBorderRadius: "4px",
};

export function generateUrlParams(config: SingleWidgetConfig): string {
  // Remove undefined values and convert to a clean object
  const cleanConfig = Object.fromEntries(
    Object.entries(config).filter(([_, value]) => value !== undefined)
  );

  // Convert to base64 to make it URL safe and compact
  return btoa(JSON.stringify(cleanConfig));
}

export function useSingleWidgetConfig(initialDesign: Design) {
  const [config, setConfig] = useState<SingleWidgetConfig>(() => ({
    ...defaultConfig,
    design: initialDesign as Design,
  }));

  const handleConfigChange = (newConfig: Partial<SingleWidgetConfig>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  return {
    config,
    handleConfigChange,
  };
}
