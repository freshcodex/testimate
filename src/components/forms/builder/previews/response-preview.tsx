"use client";

import { Button } from "@/components/ui/button";
import type { FormValues } from "@/lib/schema/form-schema";
import { Heart, Star, ArrowLeft, PenLine } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ResponsePreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function ResponsePreview({ viewMode, formData }: ResponsePreviewProps) {
  const { design, responsePage } = formData;
  const gradientStyle = design.showGradient
    ? {
        background: `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.primaryColor}99 100%)`,
      }
    : { backgroundColor: design.primaryColor };

  // Parse the prompt into an array of questions
  const questions = responsePage.prompt
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.replace(/^-\s*/, "").trim());

  const content = (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center">
        {viewMode === "desktop" && (
          <Button variant="ghost" size="sm" className="mr-auto p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-xl font-semibold mx-auto">
          Write a text testimonial
        </h2>
      </div>

      <ul className="mb-4 space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-sm">•</span>
            <span>{question}</span>
          </li>
        ))}
      </ul>

      {responsePage.collectRatings && (
        <div className="mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className={`h-6 w-6 ${
                  rating <= 4
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <Textarea placeholder="asas" className="min-h-[150px] mb-4" />

      <Button
        className="w-full"
        style={{ backgroundColor: design.primaryColor }}
      >
        <PenLine className="mr-2 h-4 w-4" />
        Submit
      </Button>
    </div>
  );

  if (viewMode === "mobile") {
    return (
      <div className="flex h-full flex-col">
        <div className="h-1/3 w-full" style={gradientStyle}></div>
        <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-white p-2">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: design.primaryColor }}
            >
              <Heart className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="mb-2 mt-8 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <Heart className="h-3 w-3 text-purple-600 fill-purple-600" />
              <span>Collect testimonials with Testimate</span>
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="h-1/3 w-full" style={gradientStyle}></div>
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg">
        <div className="mx-auto max-w-md">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-white p-2">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: design.primaryColor }}
            >
              <Heart className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="mb-2 mt-8 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <Heart className="h-3 w-3 text-purple-600 fill-purple-600" />
              <span>Collect testimonials with Testimate</span>
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}
