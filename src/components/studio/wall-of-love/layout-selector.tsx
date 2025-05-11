"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface LayoutSelectorProps {
  onLayoutSelect: (layout: string) => void;
}

export function WallOfLoveLayoutSelector({
  onLayoutSelect,
}: LayoutSelectorProps) {
  const layouts = [
    {
      id: "masonry-animated",
      name: "Masonry - animated",
      description: "A dynamic grid layout with animation effects",
      image:
        "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fanimated-demo.gif?alt=media&token=08b0e0d6-5290-4441-a309-942e074c7b77",
    },
    {
      id: "masonry-fixed",
      name: "Masonry - fixed",
      description: "A static grid layout with fixed positioning",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "carousel-slider",
      name: "Carousel slider",
      description: "A horizontal sliding carousel of testimonials",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Embed a Wall of Love</h2>
        <div className="flex items-center justify-center mb-4 space-x-2">
          <Badge>step: 1</Badge>
          <span className="text-lg font-medium">Choose a layout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {layouts.map((layout) => (
          <Card
            key={layout.id}
            className="overflow-hidden cursor-pointer hover:border-purple-300 transition-colors"
            onClick={() => onLayoutSelect(layout.id)}
          >
            <div className="h-48 bg-gray-100 relative">
              <img
                src={layout.image || "/placeholder.svg"}
                alt={layout.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-center">{layout.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Check out our{" "}
          <span className="text-purple-600">Wall of Love embed guide</span> for
          more help.
        </p>
      </div>
    </div>
  );
}
