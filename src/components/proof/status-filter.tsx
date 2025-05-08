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

const statuses = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Unapproved", value: "unapproved" },
  { label: "Pending", value: "pending" },
];

export function StatusFilter() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[120px] justify-between">
          Status
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuGroup>
          {statuses.map((status) => (
            <DropdownMenuItem
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className="flex items-center justify-between"
            >
              {status.label}
              {selectedStatus === status.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
