"use client";

import React from "react";
import type { SingleWidgetConfig } from "./types";
import TestimonialFactory from "./testimonial-factory";
import { DEFAULT_TESTIMONIAL } from "@/lib/constants";

interface LivePreviewProps {
  config: SingleWidgetConfig;
}

// TODO: when livepreview changes its height it should not affect config left side of panel
export function LivePreview({ config }: LivePreviewProps) {
  const testimonialConfig: SingleWidgetConfig = {
    design: config.design,
    height: config.height || "auto",
    theme: config.theme || "light",
    showBranding: config.showBranding || false,
    showHeartAnimation: config.showHeartAnimation || false,
    shadowBackground: config.shadowBackground || false,
    showDate: config.showDate || false,
    showSource: config.showSource || false,
    showCaptions: config.showCaptions ?? true,
    showStarRating: config.showStarRating || false,
    backgroundColor: config.backgroundColor || "transparent",
    cardBackgroundColor: config.cardBackgroundColor || "#ffffff",
    textColor: config.textColor || "#000000",
    linkColor: config.linkColor || "#0066cc",
    heartColor: config.heartColor || "#ff0000",
    starColor: config.starColor || "#ffd700",
    fontFamily: config.fontFamily || "system-ui",
    fontSize: config.fontSize || "base",
    highlightStyle: config.highlightStyle || "background",
    showVideoDuration: config.showVideoDuration || false,
    playButtonColor: config.playButtonColor || "#ffffff",
    buttonColor: config.buttonColor || "#f3f4f6",
    selectedButtonColor: config.selectedButtonColor || "#e5e7eb",
    buttonAlignment: config.buttonAlignment || "flex-start",
    buttonFontColor: config.buttonFontColor || "#374151",
    selectedFontColor: config.selectedFontColor || "#111827",
    borderWidth: config.borderWidth || "1px",
    borderColor: config.borderColor || "#e5e7eb",
    borderRadius: config.borderRadius || "0.5rem",
    shadowColor: config.shadowColor || "rgba(0, 0, 0, 0.1)",
    shadowBlur: config.shadowBlur || "4px",
    shadowOffset: config.shadowOffset || "0 2px",
    showTags: config.showTags || false,
    primaryColor: config.primaryColor || "#0066cc",
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <TestimonialFactory
          config={testimonialConfig}
          style={config.design}
          testimonial={DEFAULT_TESTIMONIAL}
        />
      </div>
    </div>
  );
}
