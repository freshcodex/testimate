import { Copy, Check, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LinkShareProps {
  formLink: string;
  copied: string | null;
  handleCopy: (text: string, type: string) => void;
}

export function LinkShare({ formLink, copied, handleCopy }: LinkShareProps) {
  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(formLink);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedUrl}`;
        break;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Your form link</h2>
      <p className="text-sm text-gray-500 mb-2">
        Click to copy and paste your form link.
      </p>

      <div className="relative mb-6">
        <Input
          value={formLink}
          readOnly
          className="pr-10"
          onClick={() => handleCopy(formLink, "link")}
        />
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          onClick={() => handleCopy(formLink, "link")}
        >
          {copied === "link" ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Add a custom domain</h3>
        <p className="text-sm text-gray-500 mb-4">
          Collect and share testimonials with a branded URL like{" "}
          <span className="text-purple-600 font-medium">love.fs.blog</span>.
          Available on all paid plans.
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
            <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
              <span className="text-xs font-bold">T</span>
            </div>
            <span className="text-sm">love.fs.blog</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          Upgrade
        </Button>
      </div> */}

      <div>
        <h3 className="text-lg font-medium mb-2">Share on socials</h3>
        <p className="text-sm text-gray-500 mb-4">
          Share your form on social channels and messaging apps with one click.
        </p>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black text-white hover:bg-gray-800 border-none"
            onClick={() => handleSocialShare("twitter")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700 border-none"
            onClick={() => handleSocialShare("facebook")}
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-blue-500 text-white hover:bg-blue-600 border-none"
            onClick={() => handleSocialShare("linkedin")}
          >
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-green-500 text-white hover:bg-green-600 border-none"
            onClick={() => handleSocialShare("whatsapp")}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
