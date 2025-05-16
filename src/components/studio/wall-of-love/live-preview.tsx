"use client";

import React from "react";
import type { WallOfLoveConfig } from "./types";
import { TestimonialList } from "@/components/widgets/testimonial/testimonial-list";
import type {
  TestimonialProps,
  TestimonialLayoutConfig,
} from "@/components/widgets/testimonial/types";
import { DEFAULT_TESTIMONIAL } from "@/lib/constants";
interface LivePreviewProps {
  config: WallOfLoveConfig;
}

// TODO: when livepreview changes its height it should not affect config left side of panel
export function LivePreview({ config }: LivePreviewProps) {
  // create multiple testimonials
  const wallOfLoveTestimonials: TestimonialProps[] = Array.from(
    {
      length: 5,
    },
    () => ({
      ...DEFAULT_TESTIMONIAL,
      id: Math.random(),
      customerName: `Customer ${Math.random()}`,
      // get the random testimonial text length and snip it from the original testimonial
      text: DEFAULT_TESTIMONIAL.text?.slice(
        0,
        Math.floor(Math.random() * DEFAULT_TESTIMONIAL.text!.length)
      ) as string,
    })
  );

  const testimonialConfig: TestimonialLayoutConfig = {
    layout: config.layout || "masonry-animated",
    height: config.height || "auto",
    theme: config.theme || "light",
    showBranding: config.showBranding || false,
    scrollDirection: config.scrollDirection || "vertical",
    showHeartAnimation: config.showHeartAnimation || false,
    pauseOnHover: config.pauseOnHover ?? true,
    scrollSpeed: config.scrollSpeed || "normal",
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
        <TestimonialList
          testimonials={wallOfLoveTestimonials}
          config={testimonialConfig}
        />
      </div>
    </div>
  );
}
