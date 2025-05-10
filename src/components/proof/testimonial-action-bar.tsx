import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Tag,
  Share2,
  Download,
  CheckCircle2,
  XCircle,
  Trash2,
} from "lucide-react";

interface TestimonialActionBarProps {
  selectedCount: number;
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  onApprove: () => void;
  onUnapprove: () => void;
  onDelete: () => void;
  allSelectedApproved: boolean;
  allSelectedUnapproved: boolean;
  hasMixedApprovalStatus: boolean;
  isApproving: boolean;
  isUnapproving: boolean;
  isDeleting: boolean;
}

export function TestimonialActionBar({
  selectedCount,
  onSelectAll,
  allSelected,
  onApprove,
  onUnapprove,
  onDelete,
  allSelectedApproved,
  allSelectedUnapproved,
  hasMixedApprovalStatus,
  isApproving,
  isUnapproving,
  isDeleting,
}: TestimonialActionBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-50 w-full border-t bg-white px-4 py-3 shadow-lg flex items-center gap-4",
        "md:px-8"
      )}
      role="region"
      aria-label="Testimonial actions"
    >
      <div className="flex items-center gap-3 flex-wrap">
        <Checkbox
          checked={allSelected}
          onCheckedChange={onSelectAll}
          aria-label="Select all testimonials"
        />
        <span className="font-medium text-sm">{selectedCount} selected</span>
        <div className="flex flex-wrap gap-2 ml-4">
          <Button size="sm" variant="outline">
            <Tag className="size-4 mr-1" /> Tag
          </Button>
          {/* <Button size="sm" variant="outline">
            <Languages className="size-4 mr-1" /> Translate
          </Button>
          <Button size="sm" variant="outline">
            <BarChart2 className="size-4 mr-1" /> Analyze
          </Button> */}
          <Button size="sm" variant="outline">
            <Share2 className="size-4 mr-1" /> Share
          </Button>
          <Button size="sm" variant="outline">
            <Download className="size-4 mr-1" /> Export
          </Button>
          {!hasMixedApprovalStatus && (
            <>
              {allSelectedUnapproved && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onApprove}
                  disabled={isApproving}
                >
                  <CheckCircle2 className="size-4 mr-1" />
                  {isApproving ? "Approving..." : "Approve"}
                </Button>
              )}
              {allSelectedApproved && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onUnapprove}
                  disabled={isUnapproving}
                >
                  <XCircle className="size-4 mr-1" />
                  {isUnapproving ? "Unapproving..." : "Unapprove"}
                </Button>
              )}
            </>
          )}
          {/* <Button size="sm" variant="outline">
            <GitMerge className="size-4 mr-1" /> Merge
          </Button> */}
          <Button
            size="sm"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <Trash2 className="size-4 mr-1" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
