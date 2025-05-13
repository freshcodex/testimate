import { useState, useCallback } from "react";
import { api } from "@/trpc/react";
import type { Tag, TagCategory } from "@/types";
import { toast } from "sonner";

interface UseTagsProps {
  projectSlug: string;
}

export function useTags({ projectSlug }: UseTagsProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const utils = api.useUtils();

  // Fetch tags
  const { data: tags = [], isLoading } = api.tags.getAllByProjectSlug.useQuery(
    {
      projectSlug,
    },
    {
      enabled: !!projectSlug,
    }
  );

  // Create tag mutation
  const createTagMutation = api.tags.create.useMutation({
    onSuccess: () => {
      utils.tags.getAllByProjectSlug.invalidate({ projectSlug });
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
      utils.tags.getAllByProjectSlug.invalidate({ projectSlug });
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
      projectId: number;
    }) => {
      try {
        setIsCreating(true);
        await createTagMutation.mutateAsync({
          ...tagData,
        });
      } finally {
        setIsCreating(false);
      }
    },
    [createTagMutation]
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
