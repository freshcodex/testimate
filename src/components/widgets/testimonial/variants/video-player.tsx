"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
}

export function VideoPlayer({ url, thumbnail }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={url}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg"
      onClick={handlePlay}
    >
      <img
        src={thumbnail || "/placeholder.svg?height=400&width=600"}
        alt="Video thumbnail"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
          <Play className="h-8 w-8 fill-current text-gray-800" />
        </div>
      </div>
    </div>
  );
}
