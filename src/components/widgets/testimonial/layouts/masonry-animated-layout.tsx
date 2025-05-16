"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { TestimonialCard } from "../testimonial-card";
import { cn } from "@/lib/utils";
import type { TestimonialLayoutProps } from "../types";
import { Logo } from "@/components/logo";

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
        "masonry-testimonials-container",
        "relative overflow-hidden"
      )}
      style={containerStyle}
    >
      {isHorizontal ? (
        // Horizontal scrolling layout
        <motion.div
          className="flex flex-nowrap items-start gap-4 p-4 mt-4"
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
            >
              <TestimonialCard testimonial={testimonial} config={config} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Vertical scrolling layout
        <motion.div
          className="relative mt-3"
          variants={verticalVariants}
          animate="animate"
          whileHover={config.pauseOnHover ? "hover" : undefined}
        >
          <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
            {duplicatedTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id + Math.random()}
                className="mb-4 break-inside-avoid testimonial-item"
              >
                <TestimonialCard testimonial={testimonial} config={config} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Branding if enabled */}
      {config.showBranding && (
        <div className="flex justify-center items-center mt-8 w-full">
          <Logo />
        </div>
      )}
    </div>
  );
}
