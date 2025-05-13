"use client";

import TestimonialFactory from "@/components/studio/single-widget/testimonial-factory";
import type { Design } from "@/components/studio/single-widget/types";
import type { SingleWidgetConfig } from "@/components/studio/single-widget/types";
import { useSingleWidgetConfig } from "@/hooks/use-single-widget-config";
import { useWallOfLoveConfig } from "@/hooks/use-wall-of-love-config";
import { api } from "@/trpc/react";
import { useParams, useSearchParams } from "next/navigation";

const testimonial = {
  id: "1",
  name: "Lexie",
  username: "@lexiebarn",
  avatar: "/placeholder.svg?height=40&width=40",
  rating: 5,
  content:
    "I've used @Superhuman for just 5 hours since my onboarding with their team and I have never gotten through so many emails in a day. I may finally get some sleep tonight and not wake up in a cold sweat about an email I forgot to respond to.",
  date: "Jan 26, 2022",
  source: "twitter",
  highlighted: ["Product", "Email"],
};

export default function TestimonialPage() {
  const params = useParams();

  // const { data: testimonial } = api.testimonials.getById.useQuery({
  //   id: Number(params.testimonialId),
  // });

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

  return (
    <div className="w-full h-full p-4">
      <TestimonialFactory
        config={
          {
            ...config,
            ...initialConfig,
          } as SingleWidgetConfig
        }
        //TODO: fix just for testing
        style={params.testimonialId as Design}
        {...testimonial}
      />
    </div>
  );
}
