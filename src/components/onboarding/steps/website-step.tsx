"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepHeader } from "../step-header";

interface WebsiteStepProps {
  onNext: (data: { website: string }) => void;
  userData: {
    name: string;
    businessType: string;
    website: string;
    importedTestimonials: any[];
  };
}

export function WebsiteStep({ onNext, userData }: WebsiteStepProps) {
  const [website, setWebsite] = useState(userData.website || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic URL validation
    if (!website.trim()) {
      setError("Please enter your website URL");
      return;
    }

    // Add https:// if missing
    let formattedUrl = website;
    if (!/^https?:\/\//i.test(website)) {
      formattedUrl = `https://${website}`;
    }

    onNext({ website: formattedUrl });
  };

  return (
    <div className="p-8">
      <StepHeader
        title={`Hi ${userData.name}! What website do you want to collect testimonials for?`}
        description="We'll create a project for you and look for existing testimonials."
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website URL
          </label>
          <Input
            id="website"
            placeholder="https://yourwebsite.com"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
              setError("");
            }}
            className={`h-12 ${error ? "border-red-500" : ""}`}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
