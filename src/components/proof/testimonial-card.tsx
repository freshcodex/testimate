"use client";

import { Heart } from "lucide-react";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import { StarRating } from "@/components/proof/star-rating";
import { StatusBadge } from "@/components/proof/status-badge";
import { Badge } from "@/components/ui/badge";
import type { FilteredTestimonial } from "@/types";
import MuxPlayer from "@mux/mux-player-react";

export function TestimonialCard({
  testimonial,
  checked,
  onCheck,
}: {
  testimonial: FilteredTestimonial;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
}) {
  return (
    <div className="flex w-full items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex-shrink-0">
        {testimonial?.customerAvatar?.startsWith("/") && (
          <Image
            src={testimonial.customerAvatar || "/placeholder.svg"}
            alt={testimonial.customerName}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
      </div>

      <div className="flex-1">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{testimonial.customerName}</h3>
              {testimonial.customerEmail && (
                <p className="text-sm text-gray-500">
                  {testimonial.customerEmail}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge
                status={testimonial.approved ? "approved" : "unapproved"}
              />
              <Checkbox
                className="h-5 w-5 rounded border-gray-300"
                checked={checked}
                onCheckedChange={onCheck}
                aria-label="Select testimonial"
              />
            </div>
          </div>
        </div>

        <StarRating rating={testimonial.rating as number} />

        {testimonial.tags && testimonial.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {testimonial.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 fill-purple-500 text-purple-500" />
            <span>{testimonial.createdAt.toLocaleDateString()} </span>
          </div>
        </div>

        {testimonial.text && (
          <p className="mt-2 text-sm text-gray-700">{testimonial.text}</p>
        )}

        {testimonial.videoUrl && (
          <div className="mt-2">
            <MuxPlayer
              // Just having a bad name wasted my 1hr right now cuz of bad name
              poster={testimonial.thumbnailUrl as string}
              playbackId={testimonial.videoUrl}
              playerInitTime={0}
              autoPlay={false}
              className="h-48 w-64 rounded-2xl object-contain"
              accentColor="purple"
            />
          </div>
        )}

        {/* {testimonial..length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {testimonial.media.map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-md">
                {item.type === "video" && (
                  <div className="group relative">
                    <Image
                      src={
                        item.thumbnail ||
                        "/placeholder.svg?height=100&width=150"
                      }
                      alt=""
                      width={150}
                      height={100}
                      className="h-auto w-full rounded-md object-cover"
                    />
                    {item.duration && (
                      <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
                        {item.duration}
                      </div>
                    )}
                    {item.title && (
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {item.title}
                      </p>
                    )}
                  </div>
                )}
                {item.type === "image" && (
                  <Image
                    src={item.src || "/placeholder.svg?height=100&width=150"}
                    alt=""
                    width={150}
                    height={100}
                    className="h-auto w-full rounded-md object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
