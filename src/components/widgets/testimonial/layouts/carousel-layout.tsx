"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "../testimonial-card";
import { cn } from "@/lib/utils";
import type { TestimonialLayoutProps } from "../types";
import type { CarouselConfig } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export function CarouselLayout({
  testimonials,
  config,
}: TestimonialLayoutProps) {
  const carouselConfig = config as CarouselConfig;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);

  // Adjust slidesToShow based on screen size
  const [visibleSlides, setVisibleSlides] = useState(
    carouselConfig.slidesToShow || 3
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(carouselConfig.slidesToShow || 3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [carouselConfig.slidesToShow]);

  // Calculate total number of pages
  const totalSlides = testimonials.length;
  const totalPages = Math.ceil(totalSlides / visibleSlides);

  // Handle auto play
  useEffect(() => {
    if (!carouselConfig.autoPlay || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, carouselConfig.autoPlayInterval || 5000);

    return () => clearInterval(interval);
  }, [
    carouselConfig.autoPlay,
    isPaused,
    currentSlide,
    carouselConfig.autoPlayInterval,
    totalPages,
  ]);

  // Navigation functions
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Handle mouse events for pausing autoplay
  const handleMouseEnter = () => {
    if (config.pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (config.pauseOnHover) {
      setIsPaused(false);
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0]?.clientX as number);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX as number);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }

    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Calculate visible testimonials
  const startIndex = currentSlide * visibleSlides;
  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + visibleSlides
  );

  // Apply container styles based on config
  const containerStyle = {
    backgroundColor: config.backgroundColor || "transparent",
    fontFamily: config.fontFamily || "inherit",
  };

  // Calculate carousel height
  useEffect(() => {
    const calculateHeight = () => {
      if (!carouselRef.current) return;

      // Get all testimonial cards in the current view
      const cards = carouselRef.current.querySelectorAll(".testimonial-card");
      if (cards.length === 0) return;

      // Find the maximum height among all cards
      const maxHeight = Math.max(
        ...Array.from(cards).map((card) => card.getBoundingClientRect().height)
      );

      // Add some padding to account for navigation and spacing
      const totalHeight = maxHeight + 80; // 80px for navigation and spacing
      setCarouselHeight(totalHeight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [currentSlide, visibleTestimonials]);

  return (
    <div
      className="carousel-testimonials-container relative w-full"
      style={{
        ...containerStyle,
        height: carouselHeight ? `${carouselHeight}px` : "auto",
        minHeight: "400px", // Fallback minimum height
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel content */}
      <div ref={carouselRef} className="overflow-hidden px-4 py-6 h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto h-full"
          >
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full h-fit testimonial-card"
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
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 text-gray-700 hover:text-gray-900 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 text-gray-700 hover:text-gray-900 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index
                ? "bg-indigo-600 w-4"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Branding if enabled */}
      {config.showBranding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-indigo-100 text-indigo-600 rounded-full p-2 mr-2"
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
          </motion.div>
          <span className="text-gray-700 font-medium">Testimonial</span>
        </motion.div>
      )}
    </div>
  );
}
