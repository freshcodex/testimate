import type { Theme } from "@/components/studio/wall-of-love/types";
import type { Testimonial } from "@/types";

export type TestimonialProps = Testimonial;

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

// TODO: use this from wall of love config for this; rename it to distinguis from single widget and wall of love

// TODO: create different types for different layouts by extending from common types
export interface TestimonialLayoutConfig {
  layout: "carousel-slider" | "masonry-fixed" | "masonry-animated";
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
