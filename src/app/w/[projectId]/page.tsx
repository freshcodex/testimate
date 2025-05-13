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
// Sample testimonials data
const testimonials = [
  {
    id: "1",
    name: "Kevin Carpenter",
    username: "@kejca",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      'Warren Buffett: "If it makes a difference to you whether your stocks are down 15% or not, you need to get a somewhat different investment philosophy."\n\n"People have emotions, but you\'ve got to check them at the door when you invest."\n\nx.com/kejca/status/19190907844914833/video/1',
    source: "twitter",
    videoThumbnail: "/placeholder.svg?height=400&width=600",
    date: "May 4, 2025",
    likes: 899,
  },
  {
    id: "2",
    name: "bishal",
    avatar: undefined, // Will use letter avatar
    content:
      '"I tried it as a gimmick. Two months later, my screen time is down 38% and I actually enjoy deep work now. What the hell." — Max D., Freelance Writer',
    rating: 5,
    date: "May 11, 2025",
  },
  {
    id: "3",
    name: "bishal",
    avatar: undefined, // Will use letter avatar
    content: "was nothing great nobody is a cool guy than that",
    rating: 5,
    date: "May 11, 2025",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "TechGrowth",
    avatar: undefined,
    content:
      "This product has completely transformed our workflow. The ROI has been incredible!",
    rating: 5,
    date: "May 9, 2025",
  },
  {
    id: "5",
    name: "Michael Chen",
    title: "Product Manager",
    company: "InnovateCorp",
    avatar: undefined,
    content:
      "After trying countless solutions, this is the only one that actually delivered on its promises.",
    rating: 4,
    date: "May 7, 2025",
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    username: "@emrodz",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Just implemented this in our startup and wow! Customer engagement is up 45% in just two weeks.",
    source: "twitter",
    date: "May 2, 2025",
    likes: 432,
  },
];

export default function WallOfLovePage() {
  const searchParams = useSearchParams();
  const configParam = searchParams.get("config");
  const { projectId } = useParams();

  const { data: testimonials } = api.testimonials.getAll.useQuery({
    projectId: Number(projectId),
  });

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
