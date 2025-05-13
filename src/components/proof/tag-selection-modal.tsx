import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTags } from "@/hooks/use-tags";
import type { Tag } from "@/types";

interface TagSelectionModalProps {
  onClose: () => void;
  projectSlug: string;
  onTagSelect: (tagId: number) => Promise<void>;
  isTagging: boolean;
}

export function TagSelectionModal({
  onClose,
  projectSlug,
  onTagSelect,
  isTagging,
}: TagSelectionModalProps) {
  const { tags, isLoading } = useTags({ projectSlug });
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  // TODO: handle already selected tags state; for that implement backend to give associated testimonials as well

  // TODO: Add feature for toggling tags, add and remove tags from testimonials

  const handleTagSelect = (tag: Tag) => {
    setSelectedTag(tag);
  };

  const handleTagSubmit = async () => {
    if (!selectedTag) return;
    await onTagSelect(selectedTag.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Select a tag</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-100 animate-pulse rounded-md"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`w-full p-3 text-left rounded-md border transition-colors ${
                    selectedTag?.id === tag.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTagSelect(tag)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{tag.name}</h3>
                      <p className="text-sm text-gray-500">
                        {tag.testimonialCount} testimonials
                      </p>
                    </div>
                    {selectedTag?.id === tag.id && (
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <X className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleTagSubmit}
            disabled={!selectedTag || isTagging}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isTagging ? "Tagging..." : "Apply Tag"}
          </Button>
        </div>
      </div>
    </div>
  );
}
