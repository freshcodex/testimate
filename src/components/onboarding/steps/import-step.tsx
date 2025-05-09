"use client";

import { useState, useEffect } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepHeader } from "../step-header";

interface ImportStepProps {
  onNext: (data: { importedTestimonials: any[] }) => void;
  userData: {
    name: string;
    businessType: string;
    website: string;
    importedTestimonials: any[];
  };
}

// Mock testimonials that would be found on the user's website
const mockTestimonials = [
  {
    id: 1,
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    rating: 5,
    content:
      "This product has completely transformed our workflow. The team's productivity has increased by 30% since we started using it.",
    date: "2023-04-15",
  },
  {
    id: 2,
    author: "Michael Chen",
    role: "Founder",
    company: "StartupX",
    rating: 4,
    content:
      "Great product with excellent customer support. Would recommend to other startups looking to streamline their processes.",
    date: "2023-05-22",
  },
  {
    id: 3,
    author: "Jessica Williams",
    role: "Product Manager",
    company: "InnovateNow",
    rating: 5,
    content:
      "The best solution we've found after trying numerous alternatives. Easy to use and powerful features.",
    date: "2023-06-10",
  },
];

export function ImportStep({ onNext, userData }: ImportStepProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading testimonials from the website
    const timer = setTimeout(() => {
      setTestimonials(mockTestimonials);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTestimonial = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const selectedTestimonials = testimonials.filter((t) =>
      selectedIds.includes(t.id)
    );
    onNext({ importedTestimonials: selectedTestimonials });
  };

  return (
    <div className="p-8">
      <StepHeader
        title={`${userData.name}, we found these testimonials on your website`}
        description="Select the ones you'd like to import. You can always add or remove them later."
      />

      <div className="mt-8">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mb-4"></div>
            <p className="text-gray-500">
              Scanning your website for testimonials...
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedIds.includes(testimonial.id)
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleTestimonial(testimonial.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                    {selectedIds.includes(testimonial.id) && (
                      <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex mt-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-700">{testimonial.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              {selectedIds.length} of {testimonials.length} testimonials
              selected
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <Button
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700"
        >
          {selectedIds.length > 0
            ? `Import ${selectedIds.length} testimonials`
            : "Skip import"}
        </Button>
      </div>
    </div>
  );
}
