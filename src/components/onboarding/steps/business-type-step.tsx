"use client";

import { useState } from "react";
import { Building2, Store, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepHeader } from "../step-header";
import { useOnboarding } from "@/contexts/onboarding-context";

interface BusinessTypeStepProps {
  onNext: (data: { businessType: string }) => void;
  userData: {
    name: string;
    businessType: string;
    website: string;
  };
}

const businessTypes = [
  {
    id: "agency",
    name: "Agency",
    description: "I run a marketing or development agency",
    icon: Building2,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "I sell products online",
    icon: Store,
  },
  {
    id: "saas",
    name: "SaaS",
    description: "I provide software as a service",
    icon: Briefcase,
  },
  {
    id: "other",
    name: "Other",
    description: "I have a different type of business",
    icon: Users,
  },
];

export function BusinessTypeStep({ onNext, userData }: BusinessTypeStepProps) {
  const [selectedType, setSelectedType] = useState(userData.businessType);
  const { setUserData } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType) {
      setUserData({ businessType: selectedType });
      onNext({ businessType: selectedType });
    }
  };

  return (
    <div className="p-8">
      <StepHeader
        title={`Hi ${userData.name}!`}
        description="What type of business do you run?"
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businessTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedType === type.id
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-200"
              }`}
            >
              <div className="flex items-start space-x-4">
                <type.icon
                  className={`h-6 w-6 ${
                    selectedType === type.id
                      ? "text-purple-600"
                      : "text-gray-400"
                  }`}
                />
                <div className="text-left">
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Button
          type="submit"
          disabled={!selectedType}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
