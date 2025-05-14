import { type TestimonialLayoutProps } from "../types";
import { CarouselLayout } from "./carousel-layout";
import { MasonryAnimatedLayout } from "./masonry-animated-layout";
import { MasonryFixedLayout } from "./masonry-fixed-layout";

// TODO:  All the components here should use sth other than media query for size they must look at containers height and adjust to it rather than using media query
export function TestimonialLayoutFactory(props: TestimonialLayoutProps) {
  const { config } = props;

  switch (config.layout) {
    case "carousel-slider":
      return <CarouselLayout {...props} />;
    case "masonry-animated":
      return <MasonryAnimatedLayout {...props} />;
    default:
      return <MasonryFixedLayout {...props} />;
  }
}
