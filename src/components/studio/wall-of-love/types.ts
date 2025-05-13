export type ScrollDirection = "vertical" | "horizontal";
export type Theme = "light" | "dark";
export type ScrollSpeed = "slow" | "normal" | "fast";
export type FontFamily =
  | "Lato"
  | "Inter"
  | "Roboto"
  | "Open Sans"
  | "Montserrat";
export type FontSize = "xs" | "sm" | "base" | "lg" | "xl";
export type HighlightStyle = "gradient" | "underline" | "highlight" | "none";
export type ButtonAlignment = "left" | "center" | "right";
export type Layout = "carousel-slider" | "masonry-fixed" | "masonry-animated";

export interface WallOfLoveConfig {
  // Basic Settings
  layout: Layout;
  height: string;
  theme: Theme;
  showBranding: boolean;
  scrollDirection: ScrollDirection; // vertical or horizontal scrolling; default is vertical
  showHeartAnimation: boolean; // shows heart flowing around like confetti
  pauseOnHover: boolean;
  scrollSpeed: ScrollSpeed;
  shadowBackground: boolean;
  showDate: boolean;
  showSource: boolean; // shows the source of the testimonial; default is true
  showCaptions: boolean; // for videos testimonials
  showStarRating: boolean;

  // Colors
  primaryColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  linkColor: string;
  heartColor: string;
  starColor: string;

  // Text Settings
  fontFamily: FontFamily;
  fontSize: FontSize;
  highlightStyle: HighlightStyle;
  customFont?: string;

  // Video Settings
  showVideoDuration: boolean;
  playButtonColor: string;

  // Button Settings
  buttonColor: string;
  selectedButtonColor: string;
  buttonAlignment: ButtonAlignment;
  buttonFontColor: string;
  selectedFontColor: string;

  // Border Settings
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;

  // Shadow Settings
  shadowColor?: string;
  shadowBlur?: string;
  shadowOffset?: string;

  // Tags Settings
  showTags?: boolean; // tags are shown inside the testimonial card; like a badge
  tagBackgroundColor?: string;
  tagTextColor?: string;
  tagBorderRadius?: string;
}
