import type { TestimonialCardProps } from "@/components/widgets/testimonial/testimonial-card";
import LeftAlignedTestimonial from "@/components/widgets/testimonial/variants/left-aligned";
import LeftAlignedBoldTestimonial from "@/components/widgets/testimonial/variants/left-aligned-bold";
import WithImageTestimonial from "@/components/widgets/testimonial/variants/with-image";
import SimpleCenteredTestimonial from "@/components/widgets/testimonial/variants/simple-centered";
import type { Design } from "./types";

interface TestimonialProps extends TestimonialCardProps {
  style: Design;
}

export default function TestimonialFactory({
  style,
  ...props
}: TestimonialProps) {
  switch (style) {
    case "left-aligned":
      return <LeftAlignedTestimonial {...props} />;
    case "left-aligned-bold":
      return <LeftAlignedBoldTestimonial {...props} />;
    case "with-large-image":
      return <WithImageTestimonial {...props} />;
    case "simple-centered":
      return <SimpleCenteredTestimonial {...props} />;
    default:
      return <LeftAlignedTestimonial {...props} />;
  }
}
