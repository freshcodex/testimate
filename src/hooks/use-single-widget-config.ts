import { useQueryState } from "nuqs";
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

export function useSingleWidgetConfig(initialDesign: string) {
  const [config, setConfig] = useQueryState<SingleWidgetConfig>("config", {
    defaultValue: { ...defaultConfig, design: initialDesign as Design },
    parse: (value) => {
      try {
        const parsedConfig = JSON.parse(decodeURIComponent(value));
        // Ensure all required fields are present by merging with default config
        return {
          ...defaultConfig,
          ...parsedConfig,
          design: parsedConfig.design || initialDesign,
        };
      } catch (error) {
        console.warn("Failed to parse config from URL:", error);
        return { ...defaultConfig, design: initialDesign };
      }
    },
    serialize: (value) => {
      // Only serialize non-default values to keep URL clean
      const nonDefaultValues = Object.entries(value).reduce(
        (acc, [key, val]) => {
          const typedKey = key as keyof SingleWidgetConfig;
          if (JSON.stringify(val) !== JSON.stringify(defaultConfig[typedKey])) {
            acc[typedKey] = val;
          }
          return acc;
        },
        {} as Partial<SingleWidgetConfig>
      );

      return encodeURIComponent(JSON.stringify(nonDefaultValues));
    },
  });

  const handleConfigChange = (newConfig: Partial<SingleWidgetConfig>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  return {
    config,
    handleConfigChange,
  };
}
