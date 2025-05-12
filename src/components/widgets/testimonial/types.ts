import type { Theme } from "@/components/studio/wall-of-love/types";

export interface TestimonialProps {
  id: string;
  name: string;
  username?: string;
  title?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
  source?: "twitter" | "linkedin" | "facebook" | "instagram" | string;
  date?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  likes?: number;
  highlighted?: string[];
}

export interface TestimonialCardConfig {
  theme: Theme;
  primaryColor: string;
  cardBackgroundColor: string;
  textColor: string;
  linkColor: string;
  starColor: string;
  showStarRating: boolean;
  showDate: boolean;
  showSource: boolean;
  borderRadius?: string;
}

export interface TestimonialLayoutConfig {
  layout: "carousel" | "masonry-fixed" | "masonry-animated";
  height: string | "auto";
  theme: Theme;
  showBranding: boolean;
  scrollDirection: "horizontal" | "vertical";
  showHeartAnimation: boolean;
  pauseOnHover: boolean;
  scrollSpeed: "slow" | "normal" | "fast";
  shadowBackground: boolean;
  showDate: boolean;
  showSource: boolean;
  showCaptions: boolean;
  showStarRating: boolean;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  linkColor: string;
  heartColor: string;
  starColor: string;
  fontFamily: string;
  fontSize: string;
  highlightStyle: string;
  showVideoDuration: boolean;
  playButtonColor: string;
  buttonColor: string;
  selectedButtonColor: string;
  buttonAlignment: string;
  buttonFontColor: string;
  selectedFontColor: string;
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  shadowColor: string;
  shadowBlur: string;
  shadowOffset: string;
  showTags: boolean;
  primaryColor: string;
}

export interface TestimonialLayoutProps {
  testimonials: TestimonialProps[];
  config: TestimonialLayoutConfig;
}

export interface CarouselConfig extends TestimonialLayoutConfig {
  slidesToShow?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export interface InfiniteScrollConfig extends TestimonialLayoutConfig {
  scrollSpeed: "slow" | "normal" | "fast";
  scrollDirection: "horizontal" | "vertical";
}
