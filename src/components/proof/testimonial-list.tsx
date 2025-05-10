"use client";

import { TestimonialCard } from "@/components/proof/testimonial-card";
import { TestimonialActionBar } from "@/components/proof/testimonial-action-bar";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export function TestimonialList({ projectId }: { projectId: number }) {
  const { data: testimonials, isLoading } = api.testimonials.getAll.useQuery({
    projectId,
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)
    );
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked && testimonials) {
      setSelectedIds(testimonials.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!testimonials?.length) {
    return (
      <div className="text-center text-muted-foreground">
        No testimonials found
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          checked={selectedIds.includes(testimonial.id)}
          onCheck={(checked) => handleSelect(testimonial.id, checked)}
        />
      ))}
      {selectedIds.length > 0 && (
        <TestimonialActionBar
          selectedCount={selectedIds.length}
          onSelectAll={handleSelectAll}
          allSelected={selectedIds.length === testimonials.length}
        />
      )}
    </div>
  );
}
