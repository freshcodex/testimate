import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Theme } from "@/components/studio/wall-of-love/types";

export interface TestimonialProps {
  id: string;
  name: string;
  username?: string;
  title?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
  source?: "twitter" | "linkedin" | "facebook" | "instagram" | string;
  date?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  likes?: number;
  highlighted?: string[];
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

export function TestimonialCard({
  name,
  username,
  title,
  company,
  avatar,
  content,
  rating,
  source,
  date,
  videoUrl,
  videoThumbnail,
  likes,
  config,
}: TestimonialCardProps) {
  // Determine if this is a Twitter/X style card
  const isTwitterStyle = source === "twitter" || username?.startsWith("@");

  // Determine if this is a video testimonial
  const hasVideo = !!videoUrl || !!videoThumbnail;

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

  // Generate avatar letter if no avatar image
  const avatarLetter = name ? name.charAt(0).toUpperCase() : "U";

  // Generate random avatar background color if no avatar image
  const getAvatarColor = () => {
    if (avatar) return {};
    return { backgroundColor: "#6366f1" };
  };

  return (
    <div
      className="testimonial-card overflow-hidden flex flex-col h-full shadow-sm"
      style={cardStyle}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Header with avatar and name */}
        <div className="flex items-center mb-3">
          <div className="mr-3 flex-shrink-0">
            {avatar ? (
              <Image
                src={avatar || "/placeholder.svg"}
                alt={name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={getAvatarColor()}
              >
                {avatarLetter}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-base">{name}</h3>
            {username && <p className="text-sm text-gray-500">{username}</p>}
            {(title || company) && !isTwitterStyle && (
              <p className="text-sm text-gray-500">
                {title}
                {title && company && ", "}
                {company}
              </p>
            )}
          </div>

          {/* Twitter/X icon if it's a Twitter testimonial */}
          {isTwitterStyle && (
            <div className="ml-auto">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          )}
        </div>

        {/* Rating stars */}
        {config.showStarRating && rating && (
          <div className="flex mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={cn(
                  "mr-1",
                  i < rating ? "fill-current" : "opacity-30"
                )}
                style={{ color: config.starColor || "#fbbf24" }}
                fill={i < rating ? config.starColor || "#fbbf24" : "none"}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-grow">
          <p className="text-base mb-3">{content}</p>
        </div>

        {/* Video thumbnail */}
        {hasVideo && videoThumbnail && (
          <div className="relative w-full mt-2 mb-3 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-500 bg-opacity-80">
                <div className="ml-1 w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white" />
              </div>
            </div>
            <Image
              src={videoThumbnail || "/placeholder.svg"}
              alt="Video thumbnail"
              width={600}
              height={400}
              className="w-full object-cover rounded-lg"
            />
            {source === "twitter" && (
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                LIVE
              </div>
            )}
          </div>
        )}

        {/* Footer with date and likes */}
        <div className="mt-auto flex items-center justify-between">
          {config.showDate && date && (
            <div className="text-sm text-gray-500">{date}</div>
          )}

          {isTwitterStyle && likes !== undefined && (
            <div className="flex items-center text-gray-500">
              <Heart size={16} className="mr-1" />
              <span className="text-sm">{likes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
