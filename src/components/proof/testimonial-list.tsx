"use client";

import { TestimonialCard } from "@/components/proof/testimonial-card";
import { TestimonialActionBar } from "@/components/proof/testimonial-action-bar";
import { DeleteTestimonialsDialog } from "@/components/proof/delete-testimonials-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonialSelection } from "@/hooks/use-testimonial-selection";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { FilteredTestimonial } from "@/types";
import { useParams } from "next/navigation";

interface TestimonialListProps {
  projectId: number;
  testimonials: FilteredTestimonial[];
  isLoading: boolean;
}

export function TestimonialList({
  projectId,
  testimonials,
  isLoading,
}: TestimonialListProps) {
  const [parent] = useAutoAnimate();
  const { projectSlug } = useParams();

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
    handleBulkTag,
    handleShare,
    confirmBulkDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isTagModalOpen,
    setIsTagModalOpen,
    allSelectedApproved,
    allSelectedUnapproved,
    hasMixedApprovalStatus,
    isApproving,
    isUnapproving,
    isDeleting,
    isExporting,
    isTagging,
    isSingleSelection,
  } = useTestimonialSelection({
    projectId,
    testimonials,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No testimonials</h3>
        <p className="mt-2 text-sm text-gray-500">
          Get started by adding your first testimonial.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div ref={parent}>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            checked={selectedIds.includes(testimonial.id)}
            onCheck={(checked) => handleSelect(testimonial.id, checked)}
          />
        ))}
      </div>
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
          onShare={handleShare}
          isSingleSelection={isSingleSelection}
          projectSlug={projectSlug as string}
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
