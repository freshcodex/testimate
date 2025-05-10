import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusFilter } from "@/components/proof/status-filter";
import { TagsFilter } from "@/components/proof/tags-filter";
import { TestimonialList } from "@/components/proof/testimonial-list";

export function ProofDashboard() {
  return (
    // TODO: Make this responsive
    <div className="flex min-w-[700px] flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Proof</h1>
        <Button>Invite a customer</Button>
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
            />
          </div>
          <StatusFilter />
          <TagsFilter />
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* TODO: Replace with the project id */}
      <div className="w-full">
        <TestimonialList projectId={1} />
      </div>

      <div className="mt-4 flex items-center justify-between py-4">
        <p className="text-sm text-gray-500">
          Select testimonials to perform bulk actions
        </p>
      </div>
    </div>
  );
}
