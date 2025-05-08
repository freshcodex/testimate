"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormsList } from "@/components/forms/form-list";
import { EmptyState } from "@/components/forms/form-empty-state";
import { PromotionCard } from "@/components/forms/promotion-card";

export function FormsDashboard() {
  const [forms, setForms] = useState<any[]>([
    {
      id: 1,
      name: "My testimonial form",
      status: "active",
      stats: {
        uniqueVisits: 0,
        testimonials: 0,
        responseRate: 0,
      },
      isBeta: true,
    },
  ]);

  // Toggle between empty and populated state for demo purposes
  const [isEmpty, setIsEmpty] = useState(false);

  const toggleEmptyState = () => {
    setIsEmpty(!isEmpty);
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold">Your Forms</h1>
          <p className="text-gray-500 mt-1">
            Use forms to collect testimonials and feedback from your customers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={toggleEmptyState}
            className="hidden md:flex"
          >
            {isEmpty ? "Show Forms" : "Show Empty State"}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Create new
          </Button>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          <FormsList forms={forms} />
          <div className="mt-8">
            <PromotionCard />
          </div>
        </>
      )}
    </div>
  );
}
