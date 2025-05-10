"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
}

export function StarRating({ value, onChange, size = 24 }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className="p-0.5 focus:outline-none"
          onClick={() => onChange(rating)}
          onMouseEnter={() => setHoveredRating(rating)}
          onMouseLeave={() => setHoveredRating(null)}
        >
          <Star
            size={size}
            className={`transition-colors duration-200 ${
              rating <= (hoveredRating ?? value)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
