"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormValues } from "@/lib/schema/form-schema";
import { Heart, User, Camera } from "lucide-react";

interface CustomerDetailsPreviewProps {
  viewMode: "desktop" | "mobile";
  formData: FormValues;
}

export function CustomerDetailsPreview({
  viewMode,
  formData,
}: CustomerDetailsPreviewProps) {
  const { design, customerDetails } = formData;
  const gradientStyle = design.showGradient
    ? {
        background: `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.primaryColor}99 100%)`,
      }
    : { backgroundColor: design.primaryColor };

  const content = (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold">Almost done 🙌</h2>
      </div>

      <div className="space-y-4">
        {customerDetails.nameEnabled && (
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Your Name <span className="text-red-500">*</span>
            </label>
            <Input id="name" placeholder="Sherlock Holmes" />
          </div>
        )}

        {customerDetails.emailEnabled && (
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="sherlock@bakerstreet.com"
            />
          </div>
        )}

        <div>
          <label htmlFor="photo" className="mb-1 block text-sm font-medium">
            Your Photo
          </label>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Camera className="mr-1 h-3 w-3" />
              Pick an image
            </Button>
          </div>
        </div>

        {customerDetails.jobTitleEnabled && (
          <div>
            <label
              htmlFor="jobTitle"
              className="mb-1 block text-sm font-medium"
            >
              Job Title
            </label>
            <Input id="jobTitle" placeholder="Head of Investigations" />
          </div>
        )}

        <div>
          <label htmlFor="website" className="mb-1 block text-sm font-medium">
            Company Website
          </label>
          <Input id="website" placeholder="https://bakerstreet.com" />
        </div>

        {customerDetails.companyEnabled && (
          <div>
            <label htmlFor="company" className="mb-1 block text-sm font-medium">
              Company
            </label>
            <Input id="company" placeholder="Baker Street Detectives" />
          </div>
        )}

        <div>
          <label
            htmlFor="companyLogo"
            className="mb-1 block text-sm font-medium"
          >
            Company Logo
          </label>
          <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center border border-gray-200">
            <Camera className="h-6 w-6 text-gray-400" />
          </div>
        </div>

        <Button
          className="w-full"
          style={{ backgroundColor: design.primaryColor }}
        >
          Submit
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you give us permission to use this testimonial across
          social channels and other marketing efforts
        </p>
      </div>
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
