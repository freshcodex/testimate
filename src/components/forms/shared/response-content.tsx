"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, PenLine } from "lucide-react";
import { useFormStep } from "@/hooks/use-form-step";
import { StarRating } from "./star-rating";
import { useState } from "react";

interface ResponseContentProps {
  prompt: string;
  collectRatings: boolean;
  primaryColor: string;
  isMobile?: boolean;
}

export function ResponseContent({
  prompt,
  collectRatings,
  primaryColor,
  isMobile = false,
}: ResponseContentProps) {
  const { setCurrentStep } = useFormStep();
  const [rating, setRating] = useState(0);

  // Parse the prompt into an array of questions
  const questions = prompt
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.replace(/^-\s*/, "").trim());

  const handleBack = () => {
    setCurrentStep("welcome");
  };

  const handleSubmit = () => {
    setCurrentStep("thank-you");
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center">
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="mr-auto p-0"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-xl font-semibold mx-auto">
          Write a text testimonial
        </h2>
      </div>

      <ul className="mb-4 space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-sm">•</span>
            <span>{question}</span>
          </li>
        ))}
      </ul>

      {collectRatings && (
        <div className="mb-4">
          <StarRating value={rating} onChange={setRating} size={24} />
        </div>
      )}

      <Textarea
        placeholder="Write your testimonial here..."
        className="min-h-[150px] mb-4"
      />

      <Button
        className="w-full"
        style={{ backgroundColor: primaryColor }}
        onClick={handleSubmit}
      >
        <PenLine className="mr-2 h-4 w-4" />
        Submit
      </Button>
    </div>
  );
}
