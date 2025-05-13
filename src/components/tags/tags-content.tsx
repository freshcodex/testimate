"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { EmptyState } from "./empty-state";
import { TagCreationModal } from "./tag-creation-modal";
import { TagList } from "./tag-list";
import { useTags } from "@/hooks/use-tags";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tag } from "@/types";

interface TagsContentProps {
  projectSlug: string;
  projectId: number;
}

export function TagsContent({ projectSlug, projectId }: TagsContentProps) {
  const [showModal, setShowModal] = useState(false);
  const { tags, isLoading, isCreating, createTag } = useTags({ projectSlug });

  const handleCreateTag = async (tag: Tag) => {
    await createTag({
      name: tag.name,
      description: tag.description || "",
      category: tag.category,
      projectId: projectId,
    });
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 min-w-[800px]">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-5 w-64 mb-8" />
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
      </div>
    );
  }

  return (
    // todo: make this responsive
    <div className="p-6 min-w-[800px]">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Your tags</h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
          disabled={isCreating}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create new
        </Button>
      </div>
      <p className="text-gray-500 mb-8">
        Tags help you organize your testimonials.
      </p>

      {tags.length === 0 ? (
        <EmptyState onCreateTag={() => setShowModal(true)} />
      ) : (
        <TagList tags={tags} projectSlug={projectSlug} />
      )}

      {/* TODO: don't pass instead keep stuff in TagCreationModal */}
      {showModal && (
        <TagCreationModal
          onClose={() => setShowModal(false)}
          onCreateTag={handleCreateTag}
        />
      )}
    </div>
  );
}
