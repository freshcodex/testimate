"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LivePreviewProps {
  config: any;
}

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
    },
  ];

  const getCardStyle = () => {
    return {
      backgroundColor: config.cardBackgroundColor || "#FFFFFF",
      color: config.textColor || "#000000",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      border: config.borderWidth
        ? `${config.borderWidth}px ${config.borderStyle || "solid"} ${
            config.borderColor || "#E5E7EB"
          }`
        : "1px solid #E5E7EB",
      padding: "16px",
      marginBottom: "16px",
    };
  };

  const getHeartColor = () => {
    return config.heartColor || "#DC2626";
  };

  const getStarColor = () => {
    return config.starColor || "#FBBF24";
  };

  const getLinkColor = () => {
    return config.linkColor || "#6701E6";
  };

  const getButtonStyle = (isActive: boolean) => {
    return {
      backgroundColor: isActive
        ? config.selectedButtonColor || "#4444FF"
        : config.buttonColor || "#6701E6",
      color: isActive
        ? config.selectedFontColor || "#FFFFFF"
        : config.buttonFontColor || "#FFFFFF",
      borderRadius: "4px",
      padding: "4px 12px",
      fontSize: "14px",
      marginRight: "8px",
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
          style={{ justifyContent: config.buttonAlignment || "left" }}
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
                      src={testimonial.avatar || "/placeholder.svg"}
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
              </div>

              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={getStarColor()}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>

              <p
                className="mb-3"
                style={{ color: config.textColor || "#000000" }}
              >
                {testimonial.content.includes("@Superhuman")
                  ? testimonial.content.split("@Superhuman").map((part, i) =>
                      i === 0 ? (
                        part
                      ) : (
                        <React.Fragment key={i}>
                          <span style={{ color: getLinkColor() }}>
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
                    src={testimonial.thumbnail || "/placeholder.svg"}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <button
                    className="absolute h-12 w-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: config.playButtonColor || "#6701E6",
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

              <div className="flex items-center text-sm text-gray-500">
                <button className="flex items-center mr-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={getHeartColor()}
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>9</span>
                </button>
                {config.showDate !== false && <span>{testimonial.date}</span>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
