import type { TestimonialCardProps } from "../testimonial-card";
import { Star } from "lucide-react";
import { VideoPlayer } from "./video-player";
import { SourceIcon } from "./source-icon";

export default function SimpleCenteredTestimonial({
  testimonial,
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
      <div className="flex flex-col items-center gap-4 text-center">
        {testimonial.customerAvatar ? (
          <img
            src={testimonial.customerAvatar || "/placeholder.svg"}
            alt={`${testimonial.customerName}'s avatar`}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
            style={{ backgroundColor: config.primaryColor, color: "#ffffff" }}
          >
            {getInitials(testimonial.customerName)}
          </div>
        )}

        <div>
          <p className="font-medium" style={{ color: textColor }}>
            {testimonial.customerName}
            {testimonial.customerUsername && (
              <span
                className="ml-1 text-sm"
                style={{ color: config.linkColor }}
              >
                @{testimonial.customerUsername}
              </span>
            )}
          </p>
          <p className="text-sm" style={{ color: `${textColor}99` }}>
            {testimonial.customerCompany}
          </p>
        </div>

        {testimonial.videoUrl && (
          <VideoPlayer
            url={testimonial.videoUrl}
            thumbnail={testimonial.thumbnailUrl || undefined}
          />
        )}

        <p className="text-lg font-medium" style={{ color: textColor }}>
          "{testimonial.text}"
        </p>

        {showStarRating && testimonial.rating && (
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5"
                style={{
                  fill: i < testimonial.rating! ? starColor : "transparent",
                  color: i < testimonial.rating! ? starColor : "#e2e8f0",
                }}
              />
            ))}
          </div>
        )}

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {showSource && testimonial.integrationSource && (
              <SourceIcon
                source={testimonial.integrationSource}
                color={linkColor}
              />
            )}
            {showDate && testimonial.createdAt && (
              <span className="text-sm" style={{ color: `${textColor}99` }}>
                {testimonial.createdAt.toLocaleDateString()}
              </span>
            )}
          </div>

          {/* {testimonial.likes !== undefined && testimonial.likes > 0 && (
            <div
              className="flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: `${config.primaryColor}20`,
                color: config.primaryColor,
              }}
            >
              <ThumbsUp size={16} />
              {testimonial.likes}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
