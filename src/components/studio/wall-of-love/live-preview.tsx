"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { WallOfLoveConfig } from "./types";
import { TestimonialList } from "@/components/widgets/testimonial/testimonial-list";
import type {
  TestimonialProps,
  TestimonialLayoutConfig,
} from "@/components/widgets/testimonial/types";

interface LivePreviewProps {
  config: WallOfLoveConfig;
}

// TODO: when livepreview changes its height it should not affect config left side of panel
export function LivePreview({ config }: LivePreviewProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const testimonials: TestimonialProps[] = [
    {
      id: "1",
      name: "Lexie",
      username: "@lexiebarn",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "I've used @Superhuman for just 5 hours since my onboarding with their team and I have never gotten through so many emails in a day. I may finally get some sleep tonight and not wake up in a cold sweat about an email I forgot to respond to.",
      date: "Jan 26, 2022",
      source: "twitter",
      highlighted: ["Product", "Email"],
    },
    {
      id: "2",
      name: "Jay Clouse",
      username: "@jayclouse",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "HUGE fan of the Senja product and team. Less than a month into implementing Senja and I've already seen a tangible impact on revenue and conversion by sharing more social proof.",
      date: "Feb 15, 2022",
      source: "twitter",
      highlighted: ["Product", "Revenue"],
    },
  ];

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
      <div className="mb-4">
        <Button size="sm" variant="outline" className="text-xs">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M12 6V12L16 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Themes
        </Button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <TestimonialList
          testimonials={testimonials}
          config={testimonialConfig}
        />
      </div>
    </div>
  );
}
