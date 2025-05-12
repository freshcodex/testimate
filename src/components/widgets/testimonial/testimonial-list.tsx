"use client";

import { TestimonialLayoutFactory } from "./layouts/layout-factory";
import type { TestimonialLayoutProps } from "./types";

export function TestimonialList(props: TestimonialLayoutProps) {
  return <TestimonialLayoutFactory {...props} />;
}
