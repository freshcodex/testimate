export type Theme = "light" | "dark";
export type FontFamily =
  | "Lato"
  | "Inter"
  | "Roboto"
  | "Open Sans"
  | "Montserrat";
export type FontSize = "xs" | "sm" | "base" | "lg" | "xl";
export type HighlightStyle = "gradient" | "underline" | "highlight" | "none";
export type ButtonAlignment = "left" | "center" | "right";
export type Design =
  | "left-aligned"
  | "left-aligned-bold"
  | "with-large-image"
  | "simple-centered";

export interface SingleWidgetConfig {
  design: Design;
  height: string;
  theme: Theme;
  showBranding: boolean;
  showHeartAnimation: boolean;
  shadowBackground: boolean;
  showDate: boolean;
  showSource: boolean;
  showCaptions: boolean;
  showStarRating: boolean;
  primaryColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  linkColor: string;
  heartColor: string;
  starColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
  highlightStyle: HighlightStyle;
  customFont?: string;
  showVideoDuration: boolean;
  playButtonColor: string;
  buttonColor: string;
  selectedButtonColor: string;
  buttonAlignment: ButtonAlignment;
  buttonFontColor: string;
  selectedFontColor: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;
  shadowColor?: string;
  shadowBlur?: string;
  shadowOffset?: string;
  showTags?: boolean;
  tagBackgroundColor?: string;
  tagTextColor?: string;
  tagBorderRadius?: string;
}
