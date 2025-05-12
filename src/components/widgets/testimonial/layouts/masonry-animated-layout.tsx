"use client";

import { useRef, useState, useEffect } from "react";
import { TestimonialCard } from "../testimonial-card";
import { cn } from "@/lib/utils";
import type { TestimonialLayoutProps } from "../types";

export function MasonryAnimatedLayout({
  testimonials,
  config,
}: TestimonialLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const animationRef = useRef<number>(0);

  // Determine if horizontal mode
  const isHorizontal = config.scrollDirection === "horizontal";
  // Use config.height or fallback for horizontal row height
  const rowHeight = isHorizontal ? config.height || "340px" : undefined;

  // Calculate scroll speed based on config
  const getScrollSpeed = () => {
    switch (config.scrollSpeed) {
      case "slow":
        return 0.5;
      case "fast":
        return 2;
      default:
        return 1;
    }
  };

  // Handle scroll animation
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const contentWidth = container.scrollWidth;
      const contentHeight = container.scrollHeight;
      const visibleWidth = container.clientWidth;
      const visibleHeight = container.clientHeight;
      const speed = getScrollSpeed();

      if (isHorizontal) {
        let newPosition = scrollPosition + speed;
        if (newPosition >= contentWidth - visibleWidth) {
          newPosition = 0;
        }
        setScrollPosition(newPosition);
      } else {
        let newPosition = scrollPosition + speed;
        if (newPosition >= contentHeight - visibleHeight) {
          newPosition = 0;
        }
        setScrollPosition(newPosition);
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollPosition, config.scrollSpeed, isHorizontal]);

  // Container styles
  const containerStyle = {
    backgroundColor: config.backgroundColor || "transparent",
    fontFamily: config.fontFamily || "inherit",
    padding: "1rem",
    height: !isHorizontal ? config.height || "auto" : undefined,
    color: config.textColor || "inherit",
    fontSize: config.fontSize || "base",
    boxShadow: config.shadowBackground
      ? `${config.shadowOffset || "0 4px"} ${config.shadowBlur || "6px"} ${
          config.shadowColor || "rgba(0, 0, 0, 0.1)"
        }`
      : "none",
    overflow: "hidden",
    position: "relative" as const,
  };

  // Create duplicated testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div
      ref={containerRef}
      className={cn(
        "masonry-testimonials-container w-full",
        "relative overflow-hidden"
      )}
      style={containerStyle}
    >
      {isHorizontal ? (
        // Horizontal scrolling layout
        <div
          className={cn(
            "flex flex-nowrap items-start gap-4",
            "transition-transform duration-100 ease-linear"
          )}
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            minHeight: rowHeight,
            height: rowHeight,
            willChange: "transform",
          }}
        >
          {duplicatedTestimonials.map((testimonial) => (
            <div
              key={testimonial.id + Math.random()}
              className="flex-shrink-0 w-[320px] max-w-xs mr-4 break-inside-avoid testimonial-item"
              style={{
                borderWidth: config.borderWidth,
                borderColor: config.borderColor,
                borderRadius: config.borderRadius,
                background: config.cardBackgroundColor,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                willChange: "transform",
              }}
            >
              <TestimonialCard
                {...testimonial}
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
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        // Vertical scrolling layout
        <div
          className={cn(
            "relative",
            "transition-transform duration-100 ease-linear"
          )}
          style={{
            transform: `translateY(-${scrollPosition}px)`,
            willChange: "transform",
          }}
        >
          <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
            {duplicatedTestimonials.map((testimonial) => (
              <div
                key={testimonial.id + Math.random()}
                className="mb-4 break-inside-avoid testimonial-item"
                style={{
                  borderWidth: config.borderWidth,
                  borderColor: config.borderColor,
                  borderRadius: config.borderRadius,
                  background: config.cardBackgroundColor,
                }}
              >
                <TestimonialCard
                  {...testimonial}
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
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Branding if enabled */}
      {config.showBranding && (
        <div className="flex justify-center items-center mt-8 w-full">
          <div
            className="rounded-full p-2 mr-2"
            style={{
              backgroundColor: config.primaryColor || "rgb(224, 231, 255)",
              color: config.textColor || "rgb(79, 70, 229)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          </div>
          <span
            className="font-medium"
            style={{ color: config.textColor || "rgb(55, 65, 81)" }}
          >
            Testimonial
          </span>
        </div>
      )}
    </div>
  );
}
