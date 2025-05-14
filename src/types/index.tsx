import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;
export type Tag = RouterOutput["tags"]["getAllByProjectId"][number];
export type TagCategory = Tag["category"];

// get the type of data from collectionForms
export type CollectionForm = RouterOutput["collectionForms"]["getAll"][number];

export type FilteredTestimonial =
  RouterOutput["testimonials"]["getFilteredTestimonials"][number];

// get the input type for widget create
export type WidgetCreateInput = RouterInput["widget"]["create"];

// type of testimonial router output
export type Testimonial = RouterOutput["testimonials"]["getById"];
