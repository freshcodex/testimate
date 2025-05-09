"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepHeader } from "../step-header";

interface CompletionStepProps {
  onNext: () => void;
  userData: {
    name: string;
    businessType: string;
    website: string;
    importedTestimonials: any[];
  };
}

export function CompletionStep({ onNext, userData }: CompletionStepProps) {
  return (
    <div className="p-8">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <StepHeader
        title={`You're all set, ${userData.name}!`}
        description="Your account has been created and your testimonials are ready to go."
      />

      <div className="mt-8 space-y-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <div className="text-sm font-medium text-gray-500">Business Type</div>
          <div className="font-medium">
            {userData.businessType || "Not specified"}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500">Website</div>
          <div className="font-medium">
            {userData.website || "Not specified"}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500">
            Imported Testimonials
          </div>
          <div className="font-medium">
            {userData.importedTestimonials.length || 0}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Button
          onClick={onNext}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          Go to dashboard
        </Button>

        <div className="text-center">
          <Button variant="link" className="text-purple-600">
            Watch a quick tutorial
          </Button>
        </div>
      </div>
    </div>
  );
}
