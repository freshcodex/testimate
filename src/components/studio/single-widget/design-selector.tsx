import React from "react";

interface SingleWidgetDesignSelectorProps {
  onDesignSelect: (design: string) => void;
}

const DESIGN_OPTIONS = [
  // TODO: Add gif image here for all designs
  { value: "left-aligned", label: "Left aligned", image: "/logo.png" },
  {
    value: "left-aligned-bold",
    label: "Left aligned - Bold",
    image: "/logo.png",
  },
  { value: "with-large-image", label: "With large image", image: "/logo.png" },
  { value: "simple-centered", label: "Simple centered", image: "/logo.png" },
];

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import NextImage from "next/image";

export function SingleWidgetDesignSelector({
  onDesignSelect,
}: SingleWidgetDesignSelectorProps) {
  // here
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Embed a testimonial</h2>
        <div className="flex items-center justify-center mb-4 space-x-2">
          <Badge>step: 1</Badge>
          <span className="text-lg font-medium">Choose a design</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DESIGN_OPTIONS.map((design) => (
          <Card
            key={design.value}
            className="overflow-hidden cursor-pointer hover:border-purple-300 transition-colors"
            onClick={() => onDesignSelect(design.value)}
          >
            <div className="h-48 bg-gray-100 relative">
              <NextImage
                src={design.image || "/logo.png"}
                alt={design.label}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-center">{design.label}</h3>
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
