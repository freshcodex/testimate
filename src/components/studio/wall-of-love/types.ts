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

export interface WallOfLoveConfig {
  // Basic Settings
  layout: string;
  height: string;
  theme: Theme;
  showBranding: boolean;
  scrollDirection: ScrollDirection;
  showHeartAnimation: boolean;
  pauseOnHover: boolean;
  scrollSpeed: ScrollSpeed;
  shadowBackground: boolean;
  showDate: boolean;
  showSource: boolean;
  showCaptions: boolean;
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
  showTags?: boolean;
  tagBackgroundColor?: string;
  tagTextColor?: string;
  tagBorderRadius?: string;
}
