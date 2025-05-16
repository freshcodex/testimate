"use client";

import TestimonialFactory from "@/components/studio/single-widget/testimonial-factory";
import type { SingleWidgetConfig } from "@/components/studio/single-widget/types";
import { useSingleWidgetConfig } from "@/hooks/use-single-widget-config";
import { api } from "@/trpc/react";
import { useParams, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_TESTIMONIAL } from "@/lib/constants";

export default function TestimonialPage() {
  const { testimonialId } = useParams();

  // TODO: only show approved testimonials; if the id of testimonial is not found or is not approved, show a 404 page;
  const { data: testimonial, isLoading } = api.testimonials.getById.useQuery({
    id: Number(testimonialId),
  });

  const searchParams = useSearchParams();
  const configParam = searchParams.get("config");

  let initialConfig: Partial<SingleWidgetConfig> = {};

  if (configParam) {
    try {
      const decodedConfig = JSON.parse(atob(configParam));
      initialConfig = decodedConfig;
    } catch (error) {
      console.error("Failed to parse config from URL:", error);
    }
  }

  console.log(initialConfig);

  const { config } = useSingleWidgetConfig(
    initialConfig.design || "left-aligned"
  );

  if (isLoading) {
    return (
      <div className="w-full h-full p-4">
        <div className="w-full p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <TestimonialFactory
        config={
          {
            ...config,
            ...initialConfig,
          } as SingleWidgetConfig
        }
        style={config.design}
        //TODO: maybe use a prod env for this just in case while in test goes to default testimonial
        testimonial={testimonial ?? DEFAULT_TESTIMONIAL}
      />
    </div>
  );
}
