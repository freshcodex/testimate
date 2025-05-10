import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tag } from "./tags-content";

interface TagListProps {
  tags: Tag[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="space-y-4">
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  );
}

interface TagItemProps {
  tag: Tag;
}

function TagItem({ tag }: TagItemProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Product":
        return "bg-green-50";
      case "Company Size":
        return "bg-teal-50";
      case "Business Type":
        return "bg-blue-50";
      case "Industry":
        return "bg-indigo-50";
      case "Job title":
        return "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  };

  const getCategoryDot = (category: string) => {
    switch (category) {
      case "Product":
        return "bg-green-400";
      case "Company Size":
        return "bg-teal-400";
      case "Business Type":
        return "bg-blue-400";
      case "Industry":
        return "bg-indigo-400";
      case "Job title":
        return "bg-purple-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getCategoryColor(tag.category)}`}>
      <div className="flex items-center">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${getCategoryDot(
              tag.category
            )} mr-2`}
          ></div>
          <span className="font-medium">{tag.category}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium">{tag.name}</h3>
          <p className="text-gray-500 text-sm">{tag.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-purple-600">
            <span className="text-sm">{tag.testimonialCount} testimonial</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
