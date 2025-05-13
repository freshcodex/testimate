import { useState, useCallback } from "react";
import { api } from "@/trpc/react";
import { type testimonials } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { toast } from "sonner";
import { useParams } from "next/navigation";

// TODO: In frontend always get data from route handler infer instead of using db schema
type Testimonial = InferSelectModel<typeof testimonials>;

interface UseTestimonialSelectionProps {
  projectId: number;
  testimonials: Testimonial[];
}

// TODO: break this into multiple reusable and decoupled hooks
export function useTestimonialSelection({
  projectId,
  testimonials,
}: UseTestimonialSelectionProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const { projectSlug } = useParams();

  const utils = api.useUtils();

  const bulkApprove = api.testimonials.bulkApprove.useMutation({
    onSuccess: () => {
      utils.testimonials.getAll.invalidate({ projectId });
      utils.testimonials.getFilteredTestimonials.invalidate({
        projectSlug: projectSlug as string,
      });
      toast.success("Testimonials approved");
    },
  });

  const bulkUnapprove = api.testimonials.bulkUnapprove.useMutation({
    onSuccess: () => {
      utils.testimonials.getAll.invalidate({ projectId });
      utils.testimonials.getFilteredTestimonials.invalidate({
        projectSlug: projectSlug as string,
      });
      toast.success("Testimonials unapproved");
    },
  });

  const bulkDelete = api.testimonials.bulkDelete.useMutation({
    onSuccess: () => {
      utils.testimonials.getAll.invalidate({ projectId });
      utils.testimonials.getFilteredTestimonials.invalidate({
        projectSlug: projectSlug as string,
      });
      toast.success("Testimonials deleted");
      setSelectedIds([]); // Clear selection after deletion
      setIsDeleteDialogOpen(false); // Close dialog after successful deletion
    },
  });

  const bulkExport = api.testimonials.bulkExport.useMutation({
    onSuccess: (data) => {
      // Create a download link
      const blob = new Blob([data.csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Testimonials exported successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to export testimonials");
    },
  });

  const bulkTag = api.tags.bulkTagTestimonials.useMutation({
    onSuccess: () => {
      utils.testimonials.getAll.invalidate({ projectId });
      utils.testimonials.getFilteredTestimonials.invalidate({
        projectSlug: projectSlug as string,
      });
      toast.success("Testimonials tagged successfully");
      setIsTagModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to tag testimonials");
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

  const handleBulkExport = useCallback(() => {
    if (selectedIds.length === 0) return;
    bulkExport.mutate({ testimonialIds: selectedIds, projectId });
  }, [selectedIds, projectId, bulkExport]);

  const handleBulkTag = useCallback(
    async (tagId: number) => {
      if (selectedIds.length === 0) return;
      await bulkTag.mutateAsync({
        testimonialIds: selectedIds,
        tagId,
      });
    },
    [selectedIds, bulkTag]
  );

  const confirmBulkDelete = useCallback(() => {
    bulkDelete.mutate({ ids: selectedIds, projectId });
  }, [selectedIds, projectId, bulkDelete]);

  const handleShare = useCallback(async () => {
    if (selectedIds.length !== 1) return;

    const shareUrl = `${window.location.origin}/t/${selectedIds[0]}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link to clipboard");
    }
  }, [selectedIds]);

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
    handleBulkExport,
    handleBulkTag,
    confirmBulkDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isTagModalOpen,
    setIsTagModalOpen,
    allSelectedApproved,
    allSelectedUnapproved,
    hasMixedApprovalStatus,
    isApproving: bulkApprove.isPending,
    isUnapproving: bulkUnapprove.isPending,
    isDeleting: bulkDelete.isPending,
    isExporting: bulkExport.isPending,
    isTagging: bulkTag.isPending,
    projectId,
    handleShare,
    isSingleSelection: selectedIds.length === 1,
    selectedTestimonialIds: selectedIds,
  };
}
