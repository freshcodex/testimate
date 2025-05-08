"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tags = [
  { label: "All Tags", value: "all" },
  { label: "Product", value: "product" },
  { label: "Service", value: "service" },
  { label: "Support", value: "support" },
  { label: "Feature", value: "feature" },
];

export function TagsFilter() {
  const [selectedTag, setSelectedTag] = useState("all");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[120px] justify-between">
          Tags
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuGroup>
          {tags.map((tag) => (
            <DropdownMenuItem
              key={tag.value}
              onClick={() => setSelectedTag(tag.value)}
              className="flex items-center justify-between"
            >
              {tag.label}
              {selectedTag === tag.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
