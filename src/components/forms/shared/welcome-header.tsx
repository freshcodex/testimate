import { Heart } from "lucide-react";
import Image from "next/image";

interface WelcomeHeaderProps {
  primaryColor: string;
  showGradient: boolean;
  logoUrl: string;
}

export function WelcomeHeader({
  primaryColor,
  showGradient,
  logoUrl,
}: WelcomeHeaderProps) {
  const gradientStyle = showGradient
    ? {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}99 100%)`,
      }
    : { backgroundColor: primaryColor };

  return (
    <div
      className="relative flex flex-col items-center w-full pb-4"
      style={{ minHeight: "120px" }}
    >
      <div className="w-full h-24 rounded-t-3xl" style={gradientStyle}></div>
      <div className="-mt-10 z-10 flex items-center justify-center rounded-full bg-white p-2 shadow-md">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: primaryColor }}
        >
          {logoUrl ? (
            <Image
              className="rounded-full"
              src={logoUrl}
              alt="Logo"
              width={80}
              height={80}
            />
          ) : (
            <Heart className="h-10 w-10 text-white" />
          )}
        </div>
      </div>
      <div className="mt-2 text-center w-full">
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <Heart className="h-3 w-3 text-purple-600 fill-purple-600" />
          <span>Collect testimonials with Testimate</span>
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </div>
      </div>
    </div>
  );
}
