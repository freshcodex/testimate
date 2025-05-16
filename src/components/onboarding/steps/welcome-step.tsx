"use client";

import type React from "react";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepHeader } from "../step-header";
import { useOnboarding } from "@/contexts/onboarding-context";

export function WelcomeStep() {
  const [name, setName] = useState("");
  const { setUserData, setStep } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserData({ name });
      setStep("business-type");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
          <Heart className="h-8 w-8 text-purple-600" />
        </div>
      </div>

      <StepHeader
        title="Welcome to Testimate!"
        description="Let's personalize your experience. What's your name?"
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="h-12 text-lg"
          />
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
