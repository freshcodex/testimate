"use client";

import { useState } from "react";
import { TestimonialList } from "@/components/widgets/testimonial/testimonial-list";
import type { TestimonialLayoutConfig } from "@/components/widgets/testimonial/types";

// Sample testimonials data
const testimonials = [
  {
    id: "1",
    name: "Kevin Carpenter",
    username: "@kejca",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      'Warren Buffett: "If it makes a difference to you whether your stocks are down 15% or not, you need to get a somewhat different investment philosophy."\n\n"People have emotions, but you\'ve got to check them at the door when you invest."\n\nx.com/kejca/status/19190907844914833/video/1',
    source: "twitter",
    videoThumbnail: "/placeholder.svg?height=400&width=600",
    date: "May 4, 2025",
    likes: 899,
  },
  {
    id: "2",
    name: "bishal",
    avatar: undefined, // Will use letter avatar
    content:
      '"I tried it as a gimmick. Two months later, my screen time is down 38% and I actually enjoy deep work now. What the hell." — Max D., Freelance Writer',
    rating: 5,
    date: "May 11, 2025",
  },
  {
    id: "3",
    name: "bishal",
    avatar: undefined, // Will use letter avatar
    content: "was nothing great nobody is a cool guy than that",
    rating: 5,
    date: "May 11, 2025",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechGrowth",
    avatar: undefined,
    content:
      "This product has completely transformed our workflow. The ROI has been incredible!",
    rating: 5,
    date: "May 9, 2025",
  },
  {
    id: "5",
    name: "Michael Chen",
    title: "Product Manager",
    company: "InnovateCorp",
    avatar: undefined,
    content:
      "After trying countless solutions, this is the only one that actually delivered on its promises.",
    rating: 4,
    date: "May 7, 2025",
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    username: "@emrodz",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Just implemented this in our startup and wow! Customer engagement is up 45% in just two weeks.",
    source: "twitter",
    date: "May 2, 2025",
    likes: 432,
  },
];

// Default configuration
const defaultConfig: TestimonialLayoutConfig = {
  layout: "masonry-animated",
  height: "auto",
  theme: "light",
  showBranding: true,
  scrollDirection: "vertical",
  showHeartAnimation: false,
  pauseOnHover: true, // only for masonry-animated layout
  scrollSpeed: "fast",
  shadowBackground: false,
  showDate: true,
  showSource: true,
  showCaptions: true,
  showStarRating: true,
  primaryColor: "#6366f1",
  backgroundColor: "#f9fafb",
  cardBackgroundColor: "#ffffff",
  textColor: "#111827",
  linkColor: "#2563eb",
  heartColor: "#ef4444",
  starColor: "#f59e0b",
  fontFamily: "Inter",
  fontSize: "base",
  highlightStyle: "none",
  showVideoDuration: false,
  playButtonColor: "#ef4444",
  buttonColor: "#f3f4f6",
  selectedButtonColor: "#6366f1",
  buttonAlignment: "center",
  buttonFontColor: "#111827",
  selectedFontColor: "#ffffff",
  borderWidth: "1px",
  borderColor: "#e5e7eb",
  borderRadius: "0.75rem",
  shadowColor: "rgba(0, 0, 0, 0.1)",
  shadowBlur: "4px",
  shadowOffset: "0px 2px 4px",
  showTags: false,
};

export default function ExamplePage() {
  const [config, setConfig] = useState<TestimonialLayoutConfig>(defaultConfig);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <TestimonialList testimonials={testimonials} config={config} />
        </div>
      </div>
    </main>
  );
}
