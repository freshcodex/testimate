import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { profiles, projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { env } from "@/env";
import Firecrawl from "@mendable/firecrawl-js";
// Initialize Firecrawl SDK
const firecrawl = new Firecrawl({
  apiKey: env.FIRECRAWL_API_KEY,
});

export const onboardingRouter = createTRPCRouter({
  completeOnboarding: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        businessType: z.string().min(1, "Business type is required"),
        websiteUrl: z.string().url("Please enter a valid website URL"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Update user profile
      const [updatedProfile] = await ctx.db
        .update(profiles)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          onboardingCompleted: true,
        })
        .where(eq(profiles.id, ctx.user.id))
        .returning();

      if (!updatedProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User profile not found",
        });
      }

      // Create a new project for the user
      const [newProject] = await ctx.db
        .insert(projects)
        .values({
          name: `${input.firstName}'s Project`,
          slug: `${input.firstName.toLowerCase()}-project`,
          businessType: input.businessType,
          url: input.websiteUrl,
          createdBy: ctx.user.id,
        })
        .returning();

      if (!newProject) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
        });
      }

      return {
        profile: updatedProfile,
        project: newProject,
      };
    }),

  scrapeWebsiteInfo: protectedProcedure
    .input(
      z.object({
        websiteUrl: z.string().url("Please enter a valid website URL"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Create a new crawling session
        const result = await firecrawl.scrapeUrl(input.websiteUrl, {
          formats: ["json"],
          jsonOptions: {
            schema: z.object({
              favicon: z.string().url(),
              themeColors: z.array(z.string()),
              metaTags: z.object({
                title: z.string(),
                description: z.string(),
                keywords: z.array(z.string()),
                author: z.string(),
                canonical: z.string().url(),
                robots: z.string(),
                viewport: z.string(),
                themeColor: z.string(),
              }),
            }),
          },
        });

        if (result.error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to scrape website information",
          });
        }

        if (result.success) {
          console.log(JSON.stringify(result.json, null, 2));
          return {
            faviconUrl: result.json?.favicon,
            title: result.json?.metaTags.title,
            description: result.json?.metaTags.description,
            colors: result.json?.themeColors.slice(0, 5),
          };
        }
      } catch (error) {
        console.error("Error scraping website:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to scrape website information",
        });
      }
    }),
});
