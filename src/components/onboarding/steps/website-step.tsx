"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepHeader } from "../step-header";
import { useOnboarding } from "@/contexts/onboarding-context";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface WebsiteStepProps {
  onNext: (data: { website: string }) => void;
  userData: {
    name: string;
    businessType: string;
    website: string;
  };
}

export function WebsiteStep({ onNext, userData }: WebsiteStepProps) {
  const [website, setWebsite] = useState(userData.website);
  const { setUserData, setIsLoading, setScrapedData } = useOnboarding();

  const scrapeWebsite = api.onboarding.scrapeWebsiteInfo.useMutation({
    onSuccess: (data) => {
      setScrapedData(data);
      onNext({ website });
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website.trim()) {
      setUserData({ website });
      setIsLoading(true);
      scrapeWebsite.mutate({
        websiteUrl: website,
      });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
          <Globe className="h-8 w-8 text-purple-600" />
        </div>
      </div>

      <StepHeader
        title="What's your website?"
        description="We'll use this to help collect testimonials and customize your experience."
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <Input
            placeholder="https://yourwebsite.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        <Button
          type="submit"
          disabled={!website.trim()}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
