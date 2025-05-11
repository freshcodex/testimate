"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { WallOfLoveConfig } from "./types";

interface LivePreviewProps {
  config: WallOfLoveConfig;
}

// TODO: when livepreview changes its height it should not affect config left side of panel
export function LivePreview({ config }: LivePreviewProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  // This is a simplified preview component
  // In a real implementation, this would render a more accurate preview
  // based on the selected configuration

  const testimonials = [
    {
      id: 1,
      author: "Lexie",
      username: "@lexiebarn",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "I've used @Superhuman for just 5 hours since my onboarding with their team and I have never gotten through so many emails in a day. I may finally get some sleep tonight and not wake up in a cold sweat about an email I forgot to respond to.",
      date: "Jan 26, 2022",
      type: "text",
      tags: ["Product", "Email"],
    },
    {
      id: 2,
      author: "Jay Clouse",
      username: "@jayclouse",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "HUGE fan of the Senja product and team. Less than a month into implementing Senja and I've already seen a tangible impact on revenue and conversion by sharing more social proof.",
      date: "Feb 15, 2022",
      type: "video",
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Product", "Revenue"],
    },
  ];

  const getCardStyle = () => {
    return {
      backgroundColor: config.cardBackgroundColor,
      color: config.textColor,
      borderRadius: config.borderRadius,
      boxShadow: config.shadowBackground
        ? `${config.shadowOffset} ${config.shadowBlur} ${config.shadowColor}`
        : "none",
      border: `${config.borderWidth} solid ${config.borderColor}`,
      padding: "16px",
      marginBottom: "16px",
      fontFamily: config.fontFamily,
      fontSize: config.fontSize === "base" ? "1rem" : config.fontSize,
    };
  };

  const getButtonStyle = (isActive: boolean) => {
    return {
      backgroundColor: isActive
        ? config.selectedButtonColor
        : config.buttonColor,
      color: isActive ? config.selectedFontColor : config.buttonFontColor,
      borderRadius: "4px",
      padding: "4px 12px",
      fontSize: "14px",
      marginRight: "8px",
      border: "none",
      cursor: "pointer",
    };
  };

  const getTagStyle = () => {
    return {
      backgroundColor: config.tagBackgroundColor,
      color: config.tagTextColor,
      borderRadius: config.tagBorderRadius,
      padding: "2px 8px",
      fontSize: "12px",
      marginRight: "4px",
      display: "inline-block",
    };
  };

  return (
    <div>
      <div className="mb-4">
        <Button size="sm" variant="outline" className="text-xs">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M12 6V12L16 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Themes
        </Button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <div
          className="mb-4 flex"
          style={{ justifyContent: config.buttonAlignment }}
        >
          <button
            style={getButtonStyle(activeFilter === "all")}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            style={getButtonStyle(activeFilter === "text")}
            onClick={() => setActiveFilter("text")}
          >
            Text
          </button>
          <button
            style={getButtonStyle(activeFilter === "video")}
            onClick={() => setActiveFilter("video")}
          >
            Video
          </button>
        </div>

        {testimonials
          .filter((t) => activeFilter === "all" || t.type === activeFilter)
          .map((testimonial) => (
            <div key={testimonial.id} style={getCardStyle()}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.username}
                    </div>
                  </div>
                </div>
                {config.showSource && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {config.showStarRating && (
                <div className="flex mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={config.starColor}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
              )}

              <p className="mb-3" style={{ color: config.textColor }}>
                {testimonial.content.includes("@Superhuman")
                  ? testimonial.content.split("@Superhuman").map((part, i) =>
                      i === 0 ? (
                        part
                      ) : (
                        <React.Fragment key={i}>
                          <span style={{ color: config.linkColor }}>
                            @Superhuman
                          </span>
                          {part}
                        </React.Fragment>
                      )
                    )
                  : testimonial.content}
              </p>

              {testimonial.type === "video" && (
                <div className="relative h-40 bg-black rounded-md mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={testimonial.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <button
                    className="absolute h-12 w-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: config.playButtonColor,
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  </button>
                  {config.showVideoDuration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                      02:45
                    </div>
                  )}
                </div>
              )}

              {config.showTags && testimonial.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {testimonial.tags.map((tag) => (
                    <span key={tag} style={getTagStyle()}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {config.showDate && (
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <span>{testimonial.date}</span>
                </div>
              )}

              {config.showHeartAnimation && (
                <div className="flex items-center mt-2">
                  <button className="flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={config.heartColor}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
