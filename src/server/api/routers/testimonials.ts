import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { desc, eq, and, inArray, or, like } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createUpdateSchema } from "drizzle-zod";
import {
  testimonials,
  projects,
  collectionForms,
  insertTestimonialSchema,
  selectTestimonialSchema,
  testimonialTags,
  tags,
} from "@/server/db/schema";
import { createObjectCsvWriter } from "csv-writer";
import { join } from "path";
import { readFile, unlink } from "fs/promises";
import { tmpdir } from "os";

const updateTestimonialSchema = createUpdateSchema(testimonials);

export const testimonialsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      // First verify the project belongs to the user
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found or you don't have access to it",
        });
      }

      const allTestimonials = await ctx.db
        .select()
        .from(testimonials)
        .where(eq(testimonials.projectId, input.projectId))
        .orderBy(desc(testimonials.createdAt));

      return allTestimonials;
    }),

  getFilteredTestimonials: protectedProcedure
    .input(
      z.object({
        projectSlug: z.string(),
        status: z.enum(["approved", "unapproved"]).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // First verify the project belongs to the user
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.slug, input.projectSlug),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found or you don't have access to it",
        });
      }

      const filteredTestimonials = await ctx.db.query.testimonials.findMany({
        where: and(
          eq(testimonials.projectId, project.id),
          input.status
            ? eq(testimonials.approved, input.status === "approved")
            : undefined,
          input.searchQuery?.trim()
            ? or(
                like(testimonials.customerName, `%${input.searchQuery}%`),
                like(testimonials.customerEmail, `%${input.searchQuery}%`),
                like(testimonials.text, `%${input.searchQuery}%`)
              )
            : undefined
        ),
        with: {
          testimonialTags: {
            with: {
              tag: true,
            },
          },
        },
        orderBy: desc(testimonials.createdAt),
      });

      // Transform the response to include tags directly
      return filteredTestimonials.map((testimonial) => ({
        ...testimonial,
        tags: testimonial.testimonialTags.map((tt) => tt.tag),
        testimonialTags: undefined, // Remove the junction table data
      }));
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [testimonial] = await ctx.db
        .select()
        .from(testimonials)
        .where(eq(testimonials.id, input.id));

      if (!testimonial) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
        });
      }

      // Verify the user has access to the project
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, testimonial.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this testimonial",
        });
      }

      return testimonial;
    }),

  create: publicProcedure
    .input(
      insertTestimonialSchema.omit({ id: true, projectId: true }).extend({
        formId: z.number({ required_error: "Form ID is required" }),
        projectSlug: z.string({ required_error: "Project slug is required" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify the project exists
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.slug, input.projectSlug));

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      // verify the form exists and belongs to the project
      const [form] = await ctx.db
        .select()
        .from(collectionForms)
        .where(
          and(
            eq(collectionForms.id, input.formId),
            eq(collectionForms.projectId, project.id)
          )
        );

      if (!form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection form not found or doesn't belong to the project",
        });
      }

      const newTestimonial = await ctx.db
        .insert(testimonials)
        .values({
          ...input,
          projectId: project.id,
        })
        .returning();

      return newTestimonial[0];
    }),

  update: protectedProcedure
    .input(
      updateTestimonialSchema
        .omit({
          projectId: true,
          type: true,
          integrationSource: true,
          sourceId: true,
          formId: true,
          originalDate: true,
          createdAt: true,
          updatedAt: true,
        })
        .extend({ id: z.number({ required_error: "Id is required" }) })
    )
    .mutation(async ({ ctx, input }) => {
      const [testimonial] = await ctx.db
        .select()
        .from(testimonials)
        .where(eq(testimonials.id, input.id));

      if (!testimonial) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
        });
      }

      // Verify the user has access to the project
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, testimonial.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this testimonial",
        });
      }

      const updatedTestimonial = await ctx.db
        .update(testimonials)
        .set({
          ...input,
        })
        .where(eq(testimonials.id, input.id))
        .returning();

      return updatedTestimonial[0];
    }),

  bulkApprove: protectedProcedure
    .input(z.object({ ids: z.array(z.number()), projectId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Verify the user has access to the project
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this testimonial",
        });
      }

      await ctx.db
        .update(testimonials)
        .set({ approved: true })
        .where(inArray(testimonials.id, input.ids));

      return { ids: input.ids };
    }),

  bulkUnapprove: protectedProcedure
    .input(z.object({ ids: z.array(z.number()), projectId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Verify the user has access to the project
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this testimonial",
        });
      }

      await ctx.db
        .update(testimonials)
        .set({ approved: false })
        .where(inArray(testimonials.id, input.ids));

      return { ids: input.ids };
    }),

  bulkDelete: protectedProcedure
    .input(z.object({ ids: z.array(z.number()), projectId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Verify the user has access to the project
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this testimonial",
        });
      }

      await ctx.db
        .delete(testimonials)
        .where(inArray(testimonials.id, input.ids));

      return { ids: input.ids };
    }),

  delete: protectedProcedure
    .input(selectTestimonialSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const [testimonial] = await ctx.db
        .select()
        .from(testimonials)
        .where(eq(testimonials.id, input.id));

      if (!testimonial) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
        });
      }

      // Verify the user has access to the project
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, testimonial.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this testimonial",
        });
      }

      await ctx.db.delete(testimonials).where(eq(testimonials.id, input.id));

      return { id: input.id };
    }),

  bulkExport: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        testimonialIds: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify the project belongs to the user
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found or you don't have access to it",
        });
      }

      // Get selected testimonials for the project
      const selectedTestimonials = await ctx.db
        .select()
        .from(testimonials)
        .where(
          and(
            eq(testimonials.projectId, input.projectId),
            inArray(testimonials.id, input.testimonialIds)
          )
        )
        .orderBy(desc(testimonials.createdAt));

      if (selectedTestimonials.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No testimonials found with the provided IDs",
        });
      }

      // Create a temporary file path
      const tempFilePath = join(
        tmpdir(),
        `testimonials-${project.id}-${Date.now()}.csv`
      );

      // Create CSV writer
      const csvWriter = createObjectCsvWriter({
        path: tempFilePath,
        header: [
          { id: "type", title: "type" },
          { id: "integration", title: "integration" },
          { id: "title", title: "title" },
          { id: "text", title: "text" },
          { id: "rating", title: "rating" },
          { id: "attachments", title: "attachments" },
          { id: "url", title: "url" },
          { id: "date", title: "date" },
          { id: "platform_id", title: "platform_id" },
          { id: "video_mp4_url", title: "video_mp4_url" },
          { id: "tags", title: "tags" },
          { id: "likes", title: "likes" },
          { id: "customer_name", title: "customer_name" },
          { id: "customer_email", title: "customer_email" },
          { id: "customer_avatar", title: "customer_avatar" },
          { id: "customer_tagline", title: "customer_tagline" },
          { id: "customer_company", title: "customer_company" },
          { id: "customer_company_logo", title: "customer_company_logo" },
          { id: "reward", title: "reward" },
          { id: "customer_url", title: "customer_url" },
        ],
      });

      // Transform testimonials to match CSV format
      const records = selectedTestimonials.map((testimonial) => ({
        type: testimonial.type,
        integration: testimonial.integrationSource,
        title: testimonial.title || "",
        text: testimonial.text || "",
        rating: testimonial.rating || "",
        attachments: "", // Not in schema
        url: testimonial.url || "",
        date: testimonial.originalDate || testimonial.createdAt,
        platform_id: testimonial.sourceId || "",
        video_mp4_url: testimonial.videoUrl || "",
        tags: "", // Not in schema
        likes: "", // Not in schema
        customer_name: testimonial.customerName,
        customer_email: testimonial.customerEmail || "",
        customer_avatar: testimonial.customerAvatar || "",
        customer_tagline: testimonial.customerTagline || "",
        customer_company: testimonial.customerCompany || "",
        customer_company_logo: testimonial.customerCompanyLogo || "",
        reward: "", // Not in schema
        customer_url: testimonial.customerUrl || "",
      }));

      // Write to CSV
      await csvWriter.writeRecords(records);

      // Read the file
      const fileContent = await readFile(tempFilePath, "utf-8");

      // Delete the temporary file
      await unlink(tempFilePath);

      return {
        csvContent: fileContent,
        filename: `testimonials-${project.slug}-${
          new Date().toISOString().split("T")[0]
        }.csv`,
      };
    }),
});
