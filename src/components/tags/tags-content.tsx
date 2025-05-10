"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { EmptyState } from "./empty-state";
import { TagCreationModal } from "./tag-creation-modal";
import { TagList } from "./tag-list";

export type TagCategory =
  | "Product"
  | "Company Size"
  | "Business Type"
  | "Industry"
  | "Job title";

export interface Tag {
  id: string;
  name: string;
  description: string;
  category: TagCategory;
  testimonialCount: number;
}

export function TagsContent() {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleCreateTag = (tag: Tag) => {
    setTags([...tags, tag]);
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    // todo: make this responsive
    <div className="p-6 min-w-[800px]">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Your tags</h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
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
        <TagList tags={tags} />
      )}

      {showModal && (
        <TagCreationModal
          onClose={() => setShowModal(false)}
          onCreateTag={handleCreateTag}
        />
      )}
    </div>
  );
}
