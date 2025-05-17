import { Star } from "lucide-react";
import { VideoPlayer } from "./video-player";
import type { TestimonialCardProps } from "../testimonial-card";
import { SourceIcon } from "./source-icon";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

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
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-lg flex items-center justify-center"
          style={{ borderRadius }}
        >
          {testimonial.customerAvatar ? (
            <Image
              src={testimonial.customerAvatar}
              alt={`${testimonial.customerName}'s testimonial`}
              width={200}
              height={200}
              className="rounded-full items-center"
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

      {config.showBranding && (
        <div className="flex justify-center items-center font-bold mt-8 w-full space-x-2">
          <span>Powered By</span>
          <Logo />
        </div>
      )}
    </div>
  );
}
