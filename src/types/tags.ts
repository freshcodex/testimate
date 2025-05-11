import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Tag = RouterOutput["tags"]["getAllByProjectId"][number];
export type TagCategory = Tag["category"];
