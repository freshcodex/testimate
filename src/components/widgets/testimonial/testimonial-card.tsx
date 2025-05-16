import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Theme } from "@/components/studio/wall-of-love/types";
import type { Testimonial } from "@/types";
import MuxPlayer from "@mux/mux-player-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export interface TestimonialProps {
  testimonial: Testimonial;
}

// TODO: add other config options here; make it same as wholeconfig from wall-of-love there is only small things that are different here
export interface TestimonialCardProps extends TestimonialProps {
  config: {
    theme: Theme;
    primaryColor: string;
    cardBackgroundColor: string;
    textColor: string;
    linkColor: string;
    starColor: string;
    showStarRating: boolean;
    showDate: boolean;
    showSource: boolean;
    showBranding: boolean;

    // TODO: make it mandatory add border and shadow settings here
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    shadowColor?: string;
    shadowBlur?: string;
    shadowOffset?: string;

    borderStyle?: string;
  };
}

export function TestimonialCard({ testimonial, config }: TestimonialCardProps) {
  // Determine card style based on config
  const cardStyle = {
    backgroundColor: config.cardBackgroundColor || "#ffffff",
    color: config.textColor || "#000000",
    borderRadius: config.borderRadius || "0.75rem",
    borderWidth: config.borderWidth || "1px",
    borderColor: config.borderColor || "transparent",
    borderStyle: config.borderStyle || "solid",
    boxShadow:
      config.shadowColor && config.shadowBlur && config.shadowOffset
        ? `${config.shadowOffset} ${config.shadowBlur} ${config.shadowColor}`
        : "0 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <div
      className="testimonial-card overflow-hidden flex flex-col shadow-sm transition-shadow duration-200 hover:shadow-lg focus-within:shadow-lg border bg-white dark:bg-zinc-900 max-w-md w-full mx-auto"
      style={cardStyle}
      tabIndex={0}
      aria-label={`Testimonial by ${testimonial.customerName || "Customer"}`}
    >
      <div className="p-5 flex flex-col gap-3 h-full">
        {/* Header with avatar and name */}
        <div className="flex items-center gap-4 mb-2 min-h-[56px]">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={testimonial?.customerAvatar || ""}
              alt={testimonial.customerName || "Customer avatar"}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-muted text-lg font-semibold">
              {testimonial.customerName
                ? testimonial.customerName.charAt(0).toUpperCase()
                : "C"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <h3
              className="font-bold text-base truncate max-w-[180px]"
              title={testimonial.customerName || "Customer"}
            >
              {testimonial.customerName || "Customer"}
            </h3>
            {testimonial.customerUsername && (
              <span
                className="text-xs text-gray-500 truncate max-w-[180px]"
                title={testimonial.customerUsername}
              >
                @{testimonial.customerUsername}
              </span>
            )}
            {testimonial.customerCompany && (
              <span
                className="text-xs text-gray-400 truncate max-w-[180px]"
                title={testimonial.customerCompany}
              >
                {testimonial.customerCompany}
              </span>
            )}
          </div>
        </div>

        {/* Rating stars */}
        {config.showStarRating && testimonial.rating && (
          <div
            className="flex mb-1"
            aria-label={`Rated ${testimonial.rating} out of 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={cn(
                  "mr-0.5",
                  i < testimonial.rating! ? "fill-current" : "opacity-30"
                )}
                style={{ color: config.starColor || "#fbbf24" }}
                fill={
                  i < testimonial.rating!
                    ? config.starColor || "#fbbf24"
                    : "none"
                }
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-grow">
          <p className="text-base mb-2 line-clamp-5 break-words whitespace-pre-line">
            {testimonial.text || (
              <span className="italic text-gray-400">
                No testimonial provided.
              </span>
            )}
          </p>
        </div>

        {/* Video thumbnail */}
        {testimonial.videoUrl && testimonial.thumbnailUrl && (
          <div className="relative w-full aspect-video mt-2 mb-2 rounded-lg overflow-hidden group">
            <MuxPlayer
              playbackId={testimonial.videoUrl!}
              poster={testimonial.thumbnailUrl}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 bg-opacity-80">
                <div className="ml-1 w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white" />
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-zinc-800 my-2" />

        {/* Footer with date */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          {config.showDate && testimonial.createdAt && (
            <span>
              {formatDistanceToNow(testimonial.createdAt, {
                addSuffix: true,
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
