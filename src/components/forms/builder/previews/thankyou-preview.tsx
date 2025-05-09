"use client";

import { Button } from "@/components/ui/button";
import type { FormValues } from "@/lib/schema/form-schema";
import { Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";

interface ThankYouPreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function ThankYouPreview({ viewMode, formData }: ThankYouPreviewProps) {
  const { design, thankYouPage } = formData;
  const gradientStyle = design.showGradient
    ? {
        background: `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.primaryColor}99 100%)`,
      }
    : { backgroundColor: design.primaryColor };

  const content = (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex justify-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: design.primaryColor }}
        >
          <Heart className="h-10 w-10 text-white" />
        </div>
      </div>

      <h2 className="mb-2 text-center text-xl font-semibold">
        {thankYouPage.title}
      </h2>
      <p className="mb-6 text-center text-gray-700">{thankYouPage.message}</p>

      {thankYouPage.showSocialShare && (
        <>
          <div className="mb-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-2">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Sherlock Holmes</p>
                  <p className="text-sm text-gray-500">@sherlock_holmes</p>
                </div>
              </div>
              <p className="text-sm mb-2">
                When your customer leaves a testimonial, they will see it here.
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <img
                  src="/placeholder.svg?height=16&width=16"
                  alt=""
                  className="mr-2 h-4 w-4"
                />
                Post in one click
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 my-2">OR</div>

          <div>
            <div className="flex justify-center gap-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-600 text-white hover:bg-blue-700 border-none"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-400 text-white hover:bg-blue-500 border-none"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-700 text-white hover:bg-blue-800 border-none"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-green-600 text-white hover:bg-green-700 border-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="sr-only">Share on WhatsApp</span>
              </Button>
            </div>
            <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
              <input
                type="text"
                value="https://testimate.io/p/shane-parrish/t/beby7bdb..."
                readOnly
                className="flex-1 bg-transparent border-none text-sm outline-none"
              />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (viewMode === "mobile") {
    return (
      <div className="flex h-full flex-col">
        <div className="h-1/3 w-full" style={gradientStyle}></div>
        <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white px-4 pt-6 shadow-lg overflow-auto">
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
      <div className="relative -mt-4 flex-1 rounded-t-3xl bg-white p-8 shadow-lg overflow-auto">
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
