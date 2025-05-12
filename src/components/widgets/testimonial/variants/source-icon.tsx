import { Facebook, Linkedin, Twitter, Instagram, Globe } from "lucide-react";

interface SourceIconProps {
  source: string;
  color: string;
  size?: number;
}

export function SourceIcon({ source, color, size = 18 }: SourceIconProps) {
  const iconProps = {
    size,
    color,
  };

  switch (source.toLowerCase()) {
    case "twitter":
      return <Twitter {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "facebook":
      return <Facebook {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    default:
      return <Globe {...iconProps} />;
  }
}
