"use client";

import { TestimonialList } from "@/components/widgets/testimonial/testimonial-list";
import type {
  TestimonialLayoutConfig,
  TestimonialProps,
} from "@/components/widgets/testimonial/types";
import type { WallOfLoveConfig } from "@/components/studio/wall-of-love/types";
import { useWallOfLoveConfig } from "@/hooks/use-wall-of-love-config";
import { useParams, useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WallOfLovePage() {
  const searchParams = useSearchParams();
  const configParam = searchParams.get("config");
  const { projectSlug } = useParams();

  const { data: testimonials, isLoading } =
    api.testimonials.getAllTestimonialsByProjectSlug.useQuery({
      projectSlug: projectSlug as string,
    });

  console.log(JSON.stringify(testimonials, null, 2));

  let initialConfig: Partial<WallOfLoveConfig> = {};

  if (configParam) {
    try {
      const decodedConfig = JSON.parse(atob(configParam));
      initialConfig = decodedConfig;
    } catch (error) {
      console.error("Failed to parse config from URL:", error);
    }
  }

  const { config } = useWallOfLoveConfig(
    initialConfig.layout || "masonry-fixed"
  );

  if (isLoading) {
    return (
      <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <div className="p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <TestimonialList
      testimonials={testimonials as TestimonialProps[]}
      config={
        {
          ...config,
          ...initialConfig,
        } as TestimonialLayoutConfig
      }
    />
  );
}
