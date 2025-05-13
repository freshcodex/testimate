"use client";

import { api } from "@/trpc/react";
import { useDebounce } from "./use-debounce";
import { useQueryState } from "nuqs";

type Status = "all" | "approved" | "unapproved";

interface UseTestimonialFiltersProps {
  projectSlug: string;
}

export function useTestimonialFilters({
  projectSlug,
}: UseTestimonialFiltersProps) {
  const [status, setStatus] = useQueryState<Status>("status", {
    defaultValue: "all",
    parse: (value): Status => {
      if (value === "approved" || value === "unapproved") return value;
      return "all";
    },
  });

  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: testimonials, isLoading } =
    api.testimonials.getFilteredTestimonials.useQuery({
      projectSlug,
      status: status === "all" ? undefined : status,
      searchQuery: debouncedSearchQuery || undefined,
    });

  return {
    status,
    setStatus,
    searchQuery,
    setSearchQuery,
    testimonials: testimonials ?? [],
    isLoading,
  };
}
