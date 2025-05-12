"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { TestimonialCard } from "../testimonial-card";
import { cn } from "@/lib/utils";
import type { TestimonialLayoutProps } from "../types";

export function MasonryAnimatedLayout({
  testimonials,
  config,
}: TestimonialLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontal = config.scrollDirection === "horizontal";
  const rowHeight = isHorizontal ? config.height || "340px" : undefined;

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

  // Get animation duration based on config
  const getAnimationDuration = () => {
    switch (config.scrollSpeed) {
      case "slow":
        return 20;
      case "fast":
        return 5;
      default:
        return 10;
    }
  };

  // Animation variants for horizontal scroll
  const horizontalVariants = {
    animate: {
      x: isHorizontal ? [0, -50 * duplicatedTestimonials.length] : 0,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: getAnimationDuration(),
          ease: "linear",
        },
      },
    },
    hover: {
      x: "0%",
      transition: {
        duration: 0.3,
      },
    },
  };

  // Animation variants for vertical scroll
  const verticalVariants = {
    animate: {
      y: !isHorizontal ? [0, -50 * duplicatedTestimonials.length] : 0,
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: getAnimationDuration(),
          ease: "linear",
        },
      },
    },
    hover: {
      y: "0%",
      transition: {
        duration: 0.3,
      },
    },
  };

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
        <motion.div
          className="flex flex-nowrap items-start gap-4"
          variants={horizontalVariants}
          animate="animate"
          whileHover={config.pauseOnHover ? "hover" : undefined}
          style={{
            minHeight: rowHeight,
            height: rowHeight,
          }}
        >
          {duplicatedTestimonials.map((testimonial) => (
            <motion.div
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
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Vertical scrolling layout
        <motion.div
          className="relative"
          variants={verticalVariants}
          animate="animate"
          whileHover={config.pauseOnHover ? "hover" : undefined}
        >
          <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
            {duplicatedTestimonials.map((testimonial) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </motion.div>
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
