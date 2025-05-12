"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "../testimonial-card";
import { cn } from "@/lib/utils";
import type { TestimonialLayoutProps } from "../types";
import type { CarouselConfig } from "../types";

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
    setCurrentSlide((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
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

  return (
    <div
      className="carousel-testimonials-container relative w-full"
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel content */}
      <div ref={carouselRef} className="overflow-hidden px-4 py-6">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(0%)`,
            gap: "1rem",
          }}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className={cn(
                "flex-shrink-0",
                visibleSlides === 1
                  ? "w-full"
                  : visibleSlides === 2
                  ? "w-[calc(50%-0.5rem)]"
                  : "w-[calc(33.333%-0.667rem)]"
              )}
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

      {/* Navigation arrows */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 text-gray-700 hover:text-gray-900 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 text-gray-700 hover:text-gray-900 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
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
        <div className="flex justify-center items-center mt-8">
          <div className="bg-indigo-100 text-indigo-600 rounded-full p-2 mr-2">
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
          <span className="text-gray-700 font-medium">Testimonial</span>
        </div>
      )}
    </div>
  );
}
