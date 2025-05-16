"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepHeader } from "../step-header";
import { useOnboarding } from "@/contexts/onboarding-context";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CompletionStep() {
  const { setIsLoading, userData } = useOnboarding();
  const router = useRouter();

  const onboarding = api.onboarding.completeOnboarding.useMutation({
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const handleContinue = async () => {
    setIsLoading(true);
    const result = await onboarding.mutateAsync({
      fullName: userData.name,
      businessType: userData.businessType,
      websiteUrl: userData.website,
    });
    setIsLoading(false);
    router.push(`/dashboard/${result.project.slug}`);
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
          disabled={onboarding.isPending}
          onClick={handleContinue}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          {onboarding.isPending ? "Redirecting..." : "Go to Dashboard"}
        </Button>
      </div>
    </div>
  );
}
