import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { desc, eq, and, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createUpdateSchema, createSelectSchema } from "drizzle-zod";
import {
  testimonials,
  projects,
  collectionForms,
  testimonialTypeEnum,
  integrationSourceEnum,
  insertTestimonialSchema,
  selectTestimonialSchema,
} from "@/server/db/schema";

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
});
