// here we'll show a single testimonial
// for config we'll use url bar params

"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function TestimonialPage() {
  const params = useParams();

  const { data: testimonial } = api.testimonials.getById.useQuery({
    id: Number(params.testimonialId),
  });

  return <div>{testimonial?.text}</div>;
}
