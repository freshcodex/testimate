"use client";

import React from "react";
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
  const testimonial: TestimonialProps = {
    id: 1,
    customerName: "Lexie",
    customerUsername: "@lexiebarn",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "I've used @Superhuman for just 5 hours since my onboarding with their team and I have never gotten through so many emails in a day. I may finally get some sleep tonight and not wake up in a cold sweat about an email I forgot to respond to.",
    createdAt: new Date("2022-01-26"),
    integrationSource: "twitter",
    projectId: 1,
    type: "text",
    title: null,
    url: null,
    videoUrl: null,
    thumbnailUrl: null,
    customerCompany: "Superhuman",
    approved: true,
    customerCompanyLogo: null,
    customerTagline: null,
    customerUrl: null,
    updatedAt: new Date("2022-01-26"),
    customerEmail: "hello@superhuman.com",
    formId: 2,
    featured: false,
    language: "en",
    customFields: [],
    originalDate: new Date("2022-01-26"),
    sourceId: "twitter",
  };

  // create multiple testimonials
  const wallOfLoveTestimonials: TestimonialProps[] = Array.from(
    {
      length: 5,
    },
    () => ({
      ...testimonial,
      id: Math.random(),
      customerName: `Customer ${Math.random()}`,
      // get the random testimonial text length and snip it from the original testimonial
      text: testimonial.text?.slice(
        0,
        Math.floor(Math.random() * testimonial.text!.length)
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

  console.log(JSON.stringify(testimonialConfig, null, 2));

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
