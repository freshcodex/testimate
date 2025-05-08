"use client";

import { Monitor, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { FormValues } from "@/lib/schema/form-schema";

interface FormPreviewProps {
  viewMode: "desktop" | "mobile";
  setViewMode: (mode: "desktop" | "mobile") => void;
  formData: FormValues;
}

export function FormPreview({
  viewMode,
  setViewMode,
  formData,
}: FormPreviewProps) {
  return (
    <div className="flex flex-1 flex-col bg-gray-100">
      <div className="flex h-12 items-center justify-end border-b bg-white px-4">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) =>
            value && setViewMode(value as "desktop" | "mobile")
          }
        >
          <ToggleGroupItem value="desktop" aria-label="Desktop view">
            <Monitor className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="mobile" aria-label="Mobile view">
            <Smartphone className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        {viewMode === "mobile" ? (
          <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[40px] border-8 border-black bg-white shadow-xl">
            <div className="absolute inset-x-0 top-0 h-6 bg-black"></div>
            <div className="absolute inset-x-0 bottom-0 h-6 bg-black"></div>
            <div className="h-full overflow-hidden">
              {formData.welcomePage && (
                <MobileFormPreview formData={formData} />
              )}
            </div>
          </div>
        ) : (
          <div className="h-[600px] w-[800px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            {formData.welcomePage && <DesktopFormPreview formData={formData} />}
          </div>
        )}
      </div>
    </div>
  );
}

function MobileFormPreview({ formData }: { formData: FormValues }) {
  const gradientStyle = formData.design.showGradient
    ? {
        background: `linear-gradient(135deg, ${formData.design.primaryColor} 0%, ${formData.design.primaryColor}99 100%)`,
      }
    : { backgroundColor: formData.design.primaryColor };

  return (
    <div className="flex h-full flex-col">
      <div className="h-1/3 w-full" style={gradientStyle}></div>

      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-white p-2">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: formData.design.primaryColor }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-10 w-10 text-white"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        <div className="mb-2 mt-8 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 text-purple-600"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Collect testimonials with Senja</span>
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
          <div className="mb-4 flex justify-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: formData.design.primaryColor }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-white"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          <h2 className="mb-2 text-center text-lg font-semibold">
            {formData.welcomePage.title}
          </h2>
          <p className="mb-4 text-center text-sm text-gray-700 whitespace-pre-line">
            {formData.welcomePage.introductoryMessage}
          </p>

          {formData.welcomePage.collectVideo && (
            <Button
              className="mb-2 w-full justify-center"
              style={{ backgroundColor: formData.design.primaryColor }}
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Record a video
            </Button>
          )}

          {formData.welcomePage.collectText && (
            <Button variant="outline" className="w-full justify-center">
              <svg
                viewBox="0 0 24 24"
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a testimonial
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopFormPreview({ formData }: { formData: FormValues }) {
  return (
    <div className="flex h-full flex-col">
      <div
        className="h-1/3 w-full"
        style={
          formData.design.showGradient
            ? {
                background: `linear-gradient(135deg, ${formData.design.primaryColor} 0%, ${formData.design.primaryColor}99 100%)`,
              }
            : { backgroundColor: formData.design.primaryColor }
        }
      ></div>

      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg">
        <div className="mx-auto max-w-md">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-white p-2">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: formData.design.primaryColor }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10 text-white"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          <div className="mb-2 mt-8 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 text-purple-600"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Collect testimonials with Senja</span>
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
            <div className="mb-4 flex justify-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: formData.design.primaryColor }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>

            <h2 className="mb-2 text-center text-xl font-semibold">
              {formData.welcomePage.title}
            </h2>
            <p className="mb-4 text-center text-gray-700 whitespace-pre-line">
              {formData.welcomePage.introductoryMessage}
            </p>

            <div className="flex gap-4">
              {formData.welcomePage.collectVideo && (
                <Button
                  className="flex-1 justify-center"
                  style={{ backgroundColor: formData.design.primaryColor }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Record a video
                </Button>
              )}

              {formData.welcomePage.collectText && (
                <Button variant="outline" className="flex-1 justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
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
