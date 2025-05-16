"use client";

import { Button } from "@/components/ui/button";
import { Heart, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import type { CollectionFormProps } from "./thankyou-page";
import { useThankyouContent } from "@/hooks/use-thankyou-content";

interface ThankYouContentProps {
  config: CollectionFormProps["collectionFormConfig"]["thankYouPage"];
  isMobile?: boolean;
  customLabels: CollectionFormProps["collectionFormConfig"]["customLabels"];
  design: CollectionFormProps["collectionFormConfig"]["design"];
}

export function ThankYouContent({
  config,
  isMobile = false,
  customLabels,
  design,
}: ThankYouContentProps) {
  const containerClass = isMobile ? "p-4" : "p-6";
  const titleClass = isMobile ? "text-lg" : "text-xl";

  // TODO: use zustand store to get the testimonial data here
  // TODO: fetch the testimonial data from either the form hook or the database
  const { thankyouContentFormData: testimonialData } = useThankyouContent();

  const handleSocialShare = (platform: string) => {
    if (!testimonialData?.text) return;

    const shareText = encodeURIComponent(testimonialData.text);
    const shareUrl = encodeURIComponent(window.location.href);
    let shareLink = "";

    // TODO: resuse this logic in the share page as well
    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case "whatsapp":
        shareLink = `https://wa.me/?text=${shareText}%20${shareUrl}`;
        break;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // You might want to add a toast notification here
  };

  return (
    <div className={`rounded-lg bg-white ${containerClass} shadow-sm`}>
      <div className="mb-4 flex justify-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: design.primaryColor }}
        >
          <Heart className="h-10 w-10 text-white" />
        </div>
      </div>

      <h2 className={`mb-2 text-center ${titleClass} font-semibold`}>
        {config.title}
      </h2>
      <p className="mb-6 text-center text-gray-700">{config.message}</p>

      {config.showSocialShare && (
        <>
          <div className="mb-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-2">
                  {testimonialData?.customerAvatar ? (
                    <img
                      src={testimonialData.customerAvatar}
                      alt={testimonialData.customerName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium">{testimonialData?.customerName}</p>
                  {testimonialData?.customerTagline && (
                    <p className="text-sm text-gray-500">
                      {testimonialData.customerTagline}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm mb-2">{testimonialData?.text}</p>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => handleSocialShare("twitter")}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Post in one click
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 my-2">OR</div>

          <div>
            <div className="flex justify-center gap-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-600 text-white hover:bg-blue-700 border-none"
                onClick={() => handleSocialShare("facebook")}
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-400 text-white hover:bg-blue-500 border-none"
                onClick={() => handleSocialShare("twitter")}
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-700 text-white hover:bg-blue-800 border-none"
                onClick={() => handleSocialShare("linkedin")}
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-green-600 text-white hover:bg-green-700 border-none"
                onClick={() => handleSocialShare("whatsapp")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="sr-only">Share on WhatsApp</span>
              </Button>
            </div>
            {/* <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 bg-transparent border-none text-sm outline-none"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleCopyLink}
              >
                <Link2 className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
}
