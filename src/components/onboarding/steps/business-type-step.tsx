"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepHeader } from "../step-header";

interface BusinessTypeStepProps {
  onNext: (data: { businessType: string }) => void;
  userData: {
    name: string;
    businessType: string;
    website: string;
    importedTestimonials: any[];
  };
}

const businessTypes = [
  { id: "saas", label: "SaaS product" },
  { id: "ecommerce", label: "E-commerce store" },
  { id: "agency", label: "Agency or service business" },
  { id: "coaching", label: "Coaching or consulting" },
  { id: "course", label: "Online courses" },
  { id: "other", label: "Other" },
];

export function BusinessTypeStep({ onNext, userData }: BusinessTypeStepProps) {
  const [selectedType, setSelectedType] = useState(userData.businessType || "");

  return (
    <div className="p-8">
      <StepHeader
        title={`Hi ${userData.name}, what do you want to collect testimonials for?`}
        description="We'll customize your experience based on your business type."
      />

      <div className="mt-8 space-y-3">
        {businessTypes.map((type) => (
          <button
            key={type.id}
            className={`w-full p-4 flex items-center justify-between rounded-lg border ${
              selectedType === type.id
                ? "border-purple-600 bg-purple-50 text-purple-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <span>{type.label}</span>
            {selectedType === type.id && (
              <Check className="h-5 w-5 text-purple-600" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <Button
          onClick={() => onNext({ businessType: selectedType })}
          disabled={!selectedType}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
