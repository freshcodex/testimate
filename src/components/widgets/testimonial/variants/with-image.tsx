import { Star } from "lucide-react";
import { VideoPlayer } from "./video-player";
import type { TestimonialCardProps } from "../testimonial-card";
import { SourceIcon } from "./source-icon";

export default function WithImageTestimonial({
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

  return (
    <div className="w-full p-6" style={cardStyle}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-4xl font-bold" style={{ color: textColor }}>
              "
            </div>

            {testimonial.videoUrl && (
              <VideoPlayer
                url={testimonial.videoUrl}
                thumbnail={testimonial.thumbnailUrl || undefined}
              />
            )}

            <p className="text-lg font-medium" style={{ color: textColor }}>
              {testimonial.text}
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

            <div className="flex items-center justify-between">
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
              {/* 
              {testimonial.likes !== undefined && testimonial.likes > 0 && (
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

        <div
          className="relative overflow-hidden rounded-lg"
          style={{ borderRadius }}
        >
          {testimonial.customerAvatar ? (
            <img
              src={testimonial.customerAvatar || "/placeholder.svg"}
              alt={`${testimonial.customerName}'s testimonial`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-gray-200 to-gray-800"></div>
          )}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="font-medium">{testimonial.customerName}</p>
            <p className="text-sm text-white/80">
              {testimonial.customerCompany}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
