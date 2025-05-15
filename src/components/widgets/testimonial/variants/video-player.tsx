"use client";

import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
}

export function VideoPlayer({ url, thumbnail }: VideoPlayerProps) {
  return (
    <MuxPlayer className="w-full h-full" playbackId={url} poster={thumbnail} />
  );
}
