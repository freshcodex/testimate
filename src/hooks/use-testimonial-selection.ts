import { useState, useCallback } from "react";
import { api } from "@/trpc/react";
import { type testimonials } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { toast } from "sonner";

type Testimonial = InferSelectModel<typeof testimonials>;

interface UseTestimonialSelectionProps {
  projectId: number;
  testimonials: Testimonial[];
}

export function useTestimonialSelection({
  projectId,
  testimonials,
}: UseTestimonialSelectionProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const utils = api.useUtils();

  const bulkApprove = api.testimonials.bulkApprove.useMutation({
    onSuccess: () => {
      utils.testimonials.getAll.invalidate({ projectId });
      toast.success("Testimonials approved");
    },
  });

  const bulkUnapprove = api.testimonials.bulkUnapprove.useMutation({
    onSuccess: () => {
      utils.testimonials.getAll.invalidate({ projectId });
      toast.success("Testimonials unapproved");
    },
  });

  const bulkDelete = api.testimonials.bulkDelete.useMutation({
    onSuccess: () => {
      utils.testimonials.getAll.invalidate({ projectId });
      toast.success("Testimonials deleted");
      setSelectedIds([]); // Clear selection after deletion
      setIsDeleteDialogOpen(false); // Close dialog after successful deletion
    },
  });

  const handleSelect = useCallback((id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(testimonials.map((t) => t.id));
      } else {
        setSelectedIds([]);
      }
    },
    [testimonials]
  );

  const handleBulkApprove = useCallback(() => {
    if (selectedIds.length === 0) return;
    bulkApprove.mutate({ ids: selectedIds, projectId });
  }, [selectedIds, projectId, bulkApprove]);

  const handleBulkUnapprove = useCallback(() => {
    if (selectedIds.length === 0) return;
    bulkUnapprove.mutate({ ids: selectedIds, projectId });
  }, [selectedIds, projectId, bulkUnapprove]);

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) return;
    setIsDeleteDialogOpen(true);
  }, [selectedIds]);

  const confirmBulkDelete = useCallback(() => {
    bulkDelete.mutate({ ids: selectedIds, projectId });
  }, [selectedIds, projectId, bulkDelete]);

  const selectedTestimonials = testimonials.filter((t) =>
    selectedIds.includes(t.id)
  );

  const allSelectedApproved = selectedTestimonials.every((t) => t.approved);
  const allSelectedUnapproved = selectedTestimonials.every((t) => !t.approved);
  const hasMixedApprovalStatus = !allSelectedApproved && !allSelectedUnapproved;

  return {
    selectedIds,
    selectedCount: selectedIds.length,
    allSelected: selectedIds.length === testimonials.length,
    handleSelect,
    handleSelectAll,
    handleBulkApprove,
    handleBulkUnapprove,
    handleBulkDelete,
    confirmBulkDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    allSelectedApproved,
    allSelectedUnapproved,
    hasMixedApprovalStatus,
    isApproving: bulkApprove.isPending,
    isUnapproving: bulkUnapprove.isPending,
    isDeleting: bulkDelete.isPending,
  };
}
