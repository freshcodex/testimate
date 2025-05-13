import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Tag = RouterOutput["tags"]["getAllByProjectId"][number];
export type TagCategory = Tag["category"];

// get the type of data from collectionForms
export type CollectionForm = RouterOutput["collectionForms"]["getAll"][number];

export type FilteredTestimonial =
  RouterOutput["testimonials"]["getFilteredTestimonials"][number];
