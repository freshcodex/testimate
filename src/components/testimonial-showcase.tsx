"use client";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TestimonialList } from "./widgets/testimonial/testimonial-list";
import { useWallOfLoveConfig } from "@/hooks/use-wall-of-love-config";
import type {
  TestimonialLayoutConfig,
  TestimonialProps,
} from "./widgets/testimonial/types";
import { DEFAULT_TESTIMONIAL } from "@/lib/constants";
import TestimonialFactory from "./studio/single-widget/testimonial-factory";
import type { SingleWidgetConfig } from "./studio/single-widget/types";
import { useSingleWidgetConfig } from "@/hooks/use-single-widget-config";
export function TestimonialShowcase() {
  // TODO: make masonry-fixed work properly here
  // TODO: Fix the branding difference in each widget make it consistent across all widgets
  const { config } = useWallOfLoveConfig("carousel-slider");
  const { config: singleConfig } = useSingleWidgetConfig("with-large-image");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <Tabs defaultValue="wall" className="w-full">
          <div className="border-b border-gray-100">
            <div className="px-4">
              <TabsList className="h-14 w-full bg-transparent gap-6">
                <TabsTrigger
                  value="wall"
                  className="data-[state=active]:text-purple-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
                >
                  Wall of Love
                </TabsTrigger>
                <TabsTrigger
                  value="single"
                  className="data-[state=active]:text-purple-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
                >
                  Single Widget
                </TabsTrigger>
                <TabsTrigger
                  value="video"
                  className="data-[state=active]:text-purple-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none bg-transparent"
                >
                  Video Widget
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="p-6">
            <TabsContent value="wall" className="mt-0">
              <TestimonialList
                testimonials={[
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                  DEFAULT_TESTIMONIAL,
                ]}
                config={config as TestimonialLayoutConfig}
              />
            </TabsContent>

            <TabsContent value="single" className="mt-0">
              <TestimonialFactory
                config={singleConfig}
                style={singleConfig.design}
                testimonial={DEFAULT_TESTIMONIAL}
              />
            </TabsContent>

            <TabsContent value="video" className="mt-0">
              <TestimonialFactory
                // TODO: new design for single widget with video comp
                config={singleConfig}
                style={singleConfig.design}
                testimonial={{
                  ...DEFAULT_TESTIMONIAL,
                  // type: "video",
                  // TODO: add some default playback id for mux player here
                  // videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                }}
              />
            </TabsContent>
          </div>
        </Tabs>
        <div className="px-6 pb-6 text-center">
          <Badge variant="outline" className="bg-gray-50">
            Example testimonials — Testimate is brand new!
          </Badge>
        </div>
      </div>
    </div>
  );
}
