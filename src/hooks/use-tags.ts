import { useState, useCallback } from "react";
import { api } from "@/trpc/react";
import type { Tag, TagCategory } from "@/types/tags";
import { toast } from "sonner";

interface UseTagsProps {
  projectId: number;
}

export function useTags({ projectId }: UseTagsProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const utils = api.useUtils();

  // Fetch tags
  const { data: tags = [], isLoading } = api.tags.getAllByProjectId.useQuery({
    projectId,
  });

  // Create tag mutation
  const createTagMutation = api.tags.create.useMutation({
    onSuccess: () => {
      utils.tags.getAllByProjectId.invalidate({ projectId });
      toast.success("Tag created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create tag");
      console.error("Error creating tag:", error);
    },
  });

  // Delete tag mutation
  const deleteTagMutation = api.tags.delete.useMutation({
    onSuccess: () => {
      utils.tags.getAllByProjectId.invalidate({ projectId });
      toast.success("Tag deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete tag");
      console.error("Error deleting tag:", error);
    },
  });

  // Create tag handler
  const createTag = useCallback(
    async (tagData: {
      name: string;
      description: string;
      category: TagCategory;
    }) => {
      try {
        setIsCreating(true);
        await createTagMutation.mutateAsync({
          ...tagData,
          projectId,
        });
      } finally {
        setIsCreating(false);
      }
    },
    [createTagMutation, projectId]
  );

  // Delete tag handler
  const deleteTag = useCallback(
    async (tagId: number) => {
      try {
        setIsDeleting(true);
        await deleteTagMutation.mutateAsync({ id: tagId });
      } finally {
        setIsDeleting(false);
      }
    },
    [deleteTagMutation]
  );

  return {
    tags,
    isLoading,
    isCreating,
    isDeleting,
    createTag,
    deleteTag,
  };
}
