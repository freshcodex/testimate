"use client";

import { Button } from "@/components/ui/button";
import type { FormValues } from "@/lib/schema/form-schema";
import { Heart, Video, PenLine } from "lucide-react";

interface WelcomePreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function WelcomePreview({ viewMode, formData }: WelcomePreviewProps) {
  const { design, welcomePage } = formData;
  const gradientStyle = design.showGradient
    ? {
        background: `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.primaryColor}99 100%)`,
      }
    : { backgroundColor: design.primaryColor };

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

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-center text-lg font-semibold">
              {welcomePage.title}
            </h2>
            <div className="mb-4 text-center text-sm text-gray-700 whitespace-pre-line">
              {welcomePage.introductoryMessage}
            </div>

            {welcomePage.collectVideo && (
              <Button
                className="mb-2 w-full justify-center"
                style={{ backgroundColor: design.primaryColor }}
              >
                <Video className="mr-2 h-4 w-4" />
                Record a video
              </Button>
            )}

            {welcomePage.collectText && (
              <Button variant="outline" className="w-full justify-center">
                <PenLine className="mr-2 h-4 w-4" />
                Write a testimonial
              </Button>
            )}
          </div>
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

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-center text-xl font-semibold">
              {welcomePage.title}
            </h2>
            <div className="mb-4 text-center text-gray-700 whitespace-pre-line">
              {welcomePage.introductoryMessage}
            </div>

            <div className="flex gap-4">
              {welcomePage.collectVideo && (
                <Button
                  className="flex-1 justify-center"
                  style={{ backgroundColor: design.primaryColor }}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Record a video
                </Button>
              )}

              {welcomePage.collectText && (
                <Button variant="outline" className="flex-1 justify-center">
                  <PenLine className="mr-2 h-4 w-4" />
                  Write a testimonial
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
