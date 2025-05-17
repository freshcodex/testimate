"use client";

import type { TestimonialCardProps } from "../testimonial-card";
import { Star } from "lucide-react";
import { VideoPlayer } from "./video-player";
import { Logo } from "@/components/logo";

export default function TestimonialWithVideo({
  testimonial,
  config,
}: TestimonialCardProps) {
  const {
    cardBackgroundColor = "#000000",
    textColor = "#ffffff",
    starColor = "#FFD700",
    linkColor,
    showStarRating = true,
    showDate,
    showSource,
    borderWidth = "0px",
    borderColor = "#e2e8f0",
    borderRadius = "0.75rem",
    shadowColor = "rgba(0, 0, 0, 0.2)",
    shadowBlur = "10px",
    shadowOffset = "4px",
    borderStyle = "solid",
    primaryColor = "#6366f1",
  } = config;

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
    color: textColor,
    borderWidth,
    borderColor,
    borderRadius,
    borderStyle,
    boxShadow: `0 ${shadowOffset} ${shadowBlur} ${shadowColor}`,
    overflow: "hidden",
  };

  return (
    <div className="w-full" style={cardStyle}>
      <div className="relative">
        {testimonial.videoUrl && (
          <div className="relative">
            <div className="aspect-video w-full">
              <VideoPlayer
                url={testimonial.videoUrl}
                thumbnail={testimonial.thumbnailUrl || undefined}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-bold text-white">
                {testimonial.customerName}
              </h3>
              <p className="text-sm text-white/80">
                {testimonial.title ||
                  `CEO and founder of ${testimonial.customerCompany}`}
              </p>

              {showStarRating && testimonial.rating && (
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5"
                      style={{
                        fill:
                          i < testimonial.rating! ? starColor : "transparent",
                        color: i < testimonial.rating! ? starColor : "#e2e8f0",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-6" style={{ backgroundColor: primaryColor }}>
        <p className="text-lg font-medium text-white">"{testimonial.text}"</p>
      </div>

      {config.showBranding && (
        <div className="flex justify-center items-center font-bold my-8 w-full space-x-2">
          <span>Powered By</span>
          <Logo />
        </div>
      )}
    </div>
  );
}
