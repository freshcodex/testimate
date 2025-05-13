"use client";

import { TestimonialCard } from "@/components/proof/testimonial-card";
import { TestimonialActionBar } from "@/components/proof/testimonial-action-bar";
import { DeleteTestimonialsDialog } from "@/components/proof/delete-testimonials-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonialSelection } from "@/hooks/use-testimonial-selection";
import { type testimonials } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Testimonial = InferSelectModel<typeof testimonials>;

interface TestimonialListProps {
  projectId: number;
  testimonials: Testimonial[];
  isLoading: boolean;
}

export function TestimonialList({
  projectId,
  testimonials,
  isLoading,
}: TestimonialListProps) {
  const [parent] = useAutoAnimate();
  const {
    selectedIds,
    selectedCount,
    allSelected,
    handleSelect,
    handleSelectAll,
    handleBulkApprove,
    handleBulkUnapprove,
    handleBulkDelete,
    handleBulkExport,
    confirmBulkDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    allSelectedApproved,
    allSelectedUnapproved,
    hasMixedApprovalStatus,
    isApproving,
    isUnapproving,
    isDeleting,
    isExporting,
    isTagging,
    isTagModalOpen,
    setIsTagModalOpen,
    handleBulkTag,
  } = useTestimonialSelection({
    projectId,
    testimonials,
  });

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
    <div className="space-y-4 w-full" ref={parent}>
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
          selectedCount={selectedCount}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          onApprove={handleBulkApprove}
          onUnapprove={handleBulkUnapprove}
          onDelete={handleBulkDelete}
          onExport={handleBulkExport}
          allSelectedApproved={allSelectedApproved}
          allSelectedUnapproved={allSelectedUnapproved}
          hasMixedApprovalStatus={hasMixedApprovalStatus}
          isApproving={isApproving}
          isUnapproving={isUnapproving}
          isDeleting={isDeleting}
          isExporting={isExporting}
          isTagging={isTagging}
          isTagModalOpen={isTagModalOpen}
          onTagModalOpenChange={setIsTagModalOpen}
          onTag={handleBulkTag}
          projectId={projectId}
        />
      )}
      <DeleteTestimonialsDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmBulkDelete}
        count={selectedCount}
      />
    </div>
  );
}
