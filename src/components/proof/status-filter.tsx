"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "all" | "approved" | "unapproved";

interface StatusFilterProps {
  value: Status;
  onValueChange: (value: Status) => void;
}

export function StatusFilter({ value, onValueChange }: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="unapproved">Unapproved</SelectItem>
      </SelectContent>
    </Select>
  );
}
