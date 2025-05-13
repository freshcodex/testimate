"use client";

import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input";
import { StatusFilter } from "@/components/proof/status-filter";
import { TagsFilter } from "@/components/proof/tags-filter";
import { TestimonialList } from "@/components/proof/testimonial-list";
import { useTestimonialFilters } from "@/hooks/use-testimonial-filters";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
export function ProofDashboard() {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  const {
    status,
    setStatus,
    searchQuery,
    setSearchQuery,
    testimonials,
    isLoading,
  } = useTestimonialFilters({ projectSlug });

  const { data: project, isLoading: isProjectLoading } =
    api.project.getBySlug.useQuery({
      slug: projectSlug,
    });

  return (
    // TODO: Make this responsive
    <div className="flex min-w-[700px] flex-col p-6">
      {isProjectLoading ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Proof</h1>
            {/* <Button>Invite a customer</Button> */}
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  placeholder="Search for your proof using natural language"
                  className="pl-10 bg-white border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <StatusFilter value={status} onValueChange={setStatus} />
              <TagsFilter />
              {/* <Button variant="outline" size="icon" className="h-10 w-10">
                <Search className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          <div className="w-full">
            <TestimonialList
              projectId={project?.id as number}
              testimonials={testimonials}
              isLoading={isLoading}
            />
          </div>

          <div className="mt-4 flex items-center justify-between py-4">
            <p className="text-sm text-gray-500">
              Select testimonials to perform bulk actions
            </p>
          </div>
        </>
      )}
    </div>
  );
}
