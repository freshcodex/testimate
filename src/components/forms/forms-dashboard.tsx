"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CollectionFormsList } from "@/components/forms/form-list";
import { EmptyState } from "@/components/forms/form-empty-state";
import { PromotionCard } from "@/components/forms/promotion-card";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function FormsDashboard() {
  const { projectSlug } = useParams();

  const { data: forms, isLoading } = api.collectionForms.getAll.useQuery({
    projectSlug: projectSlug as string,
  });

  const isEmpty = !forms || forms.length === 0;

  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold">Your Forms</h1>
          <p className="text-gray-500 mt-1">
            Use forms to collect testimonials and feedback from your customers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/${projectSlug}/forms/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create new
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : isEmpty ? (
        <EmptyState projectSlug={projectSlug as string} />
      ) : (
        <>
          <CollectionFormsList
            forms={forms}
            projectSlug={projectSlug as string}
          />
          <div className="mt-8">
            <PromotionCard />
          </div>
        </>
      )}
    </div>
  );
}
