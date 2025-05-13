"use client";

import { useEffect, useState } from "react";
import type { TestimonialFormData } from "./use-testimonial-form";

const STORAGE_KEY = "thankyou_content_data";

const DEFAULT_DATA: TestimonialFormData = {
  type: "text",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerCompany: "Acme Inc",
  customerTagline: "Software Engineer",
  customerUrl: "https://example.com",
  text: "This is a sample testimonial. The product exceeded my expectations in every way possible. The team was incredibly helpful and responsive throughout the entire process.",
  rating: 5,
  formId: 1,
  projectSlug: "default-project",
};

export function useThankyouContent() {
  const [thankyouContentFormData, setThankyouContentFormData] =
    useState<TestimonialFormData | null>(() => {
      // Initialize from localStorage if available
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
        // If no stored data, set default data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
        return DEFAULT_DATA;
      }
      return null;
    });

  useEffect(() => {
    // Save to localStorage whenever data changes
    if (thankyouContentFormData) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(thankyouContentFormData)
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [thankyouContentFormData]);

  return {
    thankyouContentFormData,
    setThankyouContentFormData,
  };
}
