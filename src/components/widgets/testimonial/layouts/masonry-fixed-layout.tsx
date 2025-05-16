"use client";

import { Logo } from "@/components/logo";
import { TestimonialCard } from "../testimonial-card";
import type { TestimonialLayoutProps } from "../types";
import { cn } from "@/lib/utils";

export function MasonryFixedLayout({
  testimonials,
  config,
}: TestimonialLayoutProps) {
  // Container styles
  const containerStyle = {
    backgroundColor: config.backgroundColor || "transparent",
    fontFamily: config.fontFamily || "inherit",
    padding: "1rem",
    color: config.textColor || "inherit",
    fontSize: config.fontSize || "base",
    boxShadow: config.shadowBackground
      ? `${config.shadowOffset || "0 4px"} ${config.shadowBlur || "6px"} ${
          config.shadowColor || "rgba(0, 0, 0, 0.1)"
        }`
      : "none",
  };

  return (
    <div className={cn(" w-full")} style={containerStyle}>
      <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="mb-4 break-inside-avoid testimonial-item"
            style={{
              borderWidth: config.borderWidth,
              borderColor: config.borderColor,
              borderRadius: config.borderRadius,
              background: config.cardBackgroundColor,
            }}
          >
            <TestimonialCard
              testimonial={testimonial}
              config={{
                theme: config.theme,
                primaryColor: config.primaryColor,
                cardBackgroundColor: config.cardBackgroundColor,
                textColor: config.textColor,
                linkColor: config.linkColor,
                starColor: config.starColor,
                showStarRating: config.showStarRating,
                showDate: config.showDate,
                showSource: config.showSource,
                borderRadius: config.borderRadius,
                showBranding: config.showBranding,
              }}
            />
          </div>
        ))}
      </div>

      {/* Branding always on a new line below testimonials */}
      {config.showBranding && (
        <div className="flex justify-center items-center mt-8 w-full">
          <Logo />
        </div>
      )}
    </div>
  );
}
