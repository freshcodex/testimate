import { formatDate } from "@/lib/utils";
import type { TestimonialCardProps } from "../testimonial-card";
import { Star, ThumbsUp } from "lucide-react";
import { VideoPlayer } from "./video-player";
import { SourceIcon } from "./source-icon";

export default function LeftAlignedTestimonial({
  name,
  username,
  title,
  company,
  avatar,
  content,
  rating = 5,
  source,
  date,
  videoUrl,
  videoThumbnail,
  likes,
  config,
}: TestimonialCardProps) {
  const {
    cardBackgroundColor,
    textColor,
    starColor,
    linkColor,
    showStarRating,
    showDate,
    showSource,
    borderWidth = "1px",
    borderColor = "#e2e8f0",
    borderRadius = "0.5rem",
    shadowColor = "rgba(0, 0, 0, 0.1)",
    shadowBlur = "10px",
    shadowOffset = "4px",
    borderStyle = "solid",
  } = config;

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
    color: textColor,
    borderWidth,
    borderColor,
    borderRadius,
    borderStyle,
    boxShadow: `0 ${shadowOffset} ${shadowBlur} ${shadowColor}`,
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full p-6" style={cardStyle}>
      <div className="flex flex-col gap-4">
        {showStarRating && rating > 0 && (
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5"
                style={{
                  fill: i < rating ? starColor : "transparent",
                  color: i < rating ? starColor : "#e2e8f0",
                }}
              />
            ))}
          </div>
        )}

        {videoUrl && <VideoPlayer url={videoUrl} thumbnail={videoThumbnail} />}

        <p className="text-lg" style={{ color: textColor }}>
          "{content}"
        </p>

        <div className="flex items-center gap-4">
          {avatar ? (
            <img
              src={avatar || "/placeholder.svg"}
              alt={`${name}'s avatar`}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold"
              style={{ backgroundColor: config.primaryColor, color: "#ffffff" }}
            >
              {getInitials(name)}
            </div>
          )}
          <div>
            <p className="font-medium" style={{ color: textColor }}>
              {name}
              {username && (
                <span
                  className="ml-1 text-sm"
                  style={{ color: config.linkColor }}
                >
                  @{username}
                </span>
              )}
            </p>
            <p className="text-sm" style={{ color: `${textColor}99` }}>
              {title}
              {company && title ? `, ${company}` : company}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showSource && source && (
              <SourceIcon source={source} color={linkColor} />
            )}
            {showDate && date && (
              <span className="text-sm" style={{ color: `${textColor}99` }}>
                {formatDate(date)}
              </span>
            )}
          </div>

          {likes !== undefined && likes > 0 && (
            <div
              className="flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: `${config.primaryColor}20`,
                color: config.primaryColor,
              }}
            >
              <ThumbsUp size={16} />
              {likes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
