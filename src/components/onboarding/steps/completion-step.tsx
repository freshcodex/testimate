"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepHeader } from "../step-header";
import { useOnboarding } from "@/contexts/onboarding-context";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface CompletionStepProps {
  onNext: () => void;
  userData: {
    name: string;
    businessType: string;
    website: string;
    projectSlug?: string;
  };
}

export function CompletionStep({ onNext, userData }: CompletionStepProps) {
  const { setUserData, setIsLoading, scrapedData } = useOnboarding();

  const updateProject = api.project.update.useMutation({
    onSuccess: () => {
      onNext();
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const handleContinue = () => {
    if (scrapedData && userData.projectSlug) {
      const projectId = parseInt(userData.projectSlug);
      if (!isNaN(projectId)) {
        setIsLoading(true);
        updateProject.mutate({
          id: projectId,
          name: scrapedData.title || `${userData.name}'s Project`,
          description: scrapedData.description || "",
          url: userData.website,
          logoUrl: scrapedData.faviconUrl,
          active: true,
          slug: userData.projectSlug,
        });
      }
    } else {
      setUserData({ projectSlug: userData.projectSlug });
      onNext();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <StepHeader
        title="All set!"
        description="Your project has been created successfully. Let's start collecting testimonials!"
      />

      <div className="mt-8 space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h3 className="font-medium">Project Details</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Name:</span> {userData.name}
            </p>
            <p>
              <span className="font-medium">Business Type:</span>{" "}
              {userData.businessType}
            </p>
            <p>
              <span className="font-medium">Website:</span> {userData.website}
            </p>
          </div>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
