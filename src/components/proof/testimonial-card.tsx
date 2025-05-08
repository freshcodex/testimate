import { Heart } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { StarRating } from "@/components/proof/star-rating";
import { StatusBadge } from "@/components/proof/status-badge";

interface Media {
  type: "video" | "image";
  src?: string;
  thumbnail?: string;
  duration?: string;
  title?: string;
}

interface TestimonialProps {
  id: number;
  avatar: string;
  avatarColor?: string;
  name: string;
  username?: string;
  role?: string;
  rating: number;
  content?: string;
  days?: number;
  weeks?: number;
  country: string;
  status: "approved" | "unapproved" | "pending";
  media: Media[];
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialProps;
}) {
  const {
    avatar,
    avatarColor,
    name,
    username,
    role,
    rating,
    content,
    days,
    weeks,
    country,
    status,
    media,
  } = testimonial;

  return (
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex-shrink-0">
        {avatar.startsWith("/") ? (
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold",
              avatarColor || "bg-gray-100 text-gray-800"
            )}
          >
            {avatar}
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{name}</h3>
              {username && <p className="text-sm text-gray-500">{username}</p>}
              {role && <p className="text-sm text-gray-500">{role}</p>}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={status} />
              <Checkbox className="h-5 w-5 rounded border-gray-300" />
            </div>
          </div>
        </div>

        <StarRating rating={rating} />

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 fill-purple-500 text-purple-500" />
            {days && <span>{days} days ago</span>}
            {weeks && <span>{weeks} weeks ago</span>}
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block h-4 w-6 overflow-hidden rounded-sm">
              {country === "GB" && (
                <span className="flex h-full w-full items-center justify-center bg-red-500 text-[8px] text-white">
                  GB
                </span>
              )}
            </span>
          </div>
        </div>

        {content && <p className="mt-2 text-sm text-gray-700">{content}</p>}

        {media.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {media.map((item, index) => (
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
        )}
      </div>
    </div>
  );
}
