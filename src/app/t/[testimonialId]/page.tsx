// here we'll show a single testimonial
// for config we'll use url bar params

"use client";

import TestimonialFactory from "@/components/studio/single-widget/testimonial-factory";
import type { Design } from "@/components/studio/single-widget/types";
import type { SingleWidgetConfig } from "@/components/studio/single-widget/types";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

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

const testimonial = {
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
};

export default function TestimonialPage() {
  const params = useParams();

  // const { data: testimonial } = api.testimonials.getById.useQuery({
  //   id: Number(params.testimonialId),
  // });

  return (
    <TestimonialFactory
      config={defaultConfig}
      //TODO: fix just for testing
      style={params.testimonialId as Design}
      {...testimonial}
    />
  );
}
