"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EmptyStateProps {
  onCreateTag: () => void;
}

export function EmptyState({ onCreateTag }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src="/placeholder.svg?height=128&width=128"
          alt="Tag icon"
          width={128}
          height={128}
          className="opacity-30"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">No tags, yet.</h2>
      <p className="text-gray-500 text-center mb-6">
        Tags help you organize your testimonials. Create your first tag to get
        started.
      </p>
      <Button
        onClick={onCreateTag}
        className="bg-purple-600 hover:bg-purple-700"
      >
        Create new tag
      </Button>
    </div>
  );
}
