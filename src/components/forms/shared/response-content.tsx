import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ArrowLeft, PenLine } from "lucide-react";

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
  // Parse the prompt into an array of questions
  const questions = prompt
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.replace(/^-\s*/, "").trim());

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center">
        {!isMobile && (
          <Button variant="ghost" size="sm" className="mr-auto p-0">
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
          <div className="flex">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className={`h-6 w-6 ${
                  rating <= 4
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <Textarea placeholder="asas" className="min-h-[150px] mb-4" />

      <Button className="w-full" style={{ backgroundColor: primaryColor }}>
        <PenLine className="mr-2 h-4 w-4" />
        Submit
      </Button>
    </div>
  );
}
