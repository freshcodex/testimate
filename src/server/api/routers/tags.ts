import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { desc, eq, count, and, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import {
  createUpdateSchema,
  createSelectSchema,
  createInsertSchema,
} from "drizzle-zod";
import {
  tags,
  testimonialTags,
  projects,
  testimonials,
} from "@/server/db/schema";

const updateTagSchema = createUpdateSchema(tags);
const baseSelectSchema = createSelectSchema(tags);
const insertTagSchema = createInsertSchema(tags);

export const tagRouter = createTRPCRouter({
  getAllByProjectId: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      const projectTags = await ctx.db
        .select({
          id: tags.id,
          name: tags.name,
          description: tags.description,
          category: tags.category,
          projectId: tags.projectId,
          createdAt: tags.createdAt,
          updatedAt: tags.updatedAt,
          testimonialCount: count(testimonialTags.tagId),
        })
        .from(tags)
        .leftJoin(testimonialTags, eq(tags.id, testimonialTags.tagId))
        .where(eq(tags.projectId, input.projectId))
        .groupBy(tags.id)
        .orderBy(desc(tags.createdAt));

      return projectTags;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [tag] = await ctx.db
        .select({
          id: tags.id,
          name: tags.name,
          description: tags.description,
          category: tags.category,
          projectId: tags.projectId,
          createdAt: tags.createdAt,
          updatedAt: tags.updatedAt,
          testimonialCount: count(testimonialTags.tagId),
        })
        .from(tags)
        .leftJoin(testimonialTags, eq(tags.id, testimonialTags.tagId))
        .where(eq(tags.id, input.id))
        .groupBy(tags.id);

      if (!tag) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tag not found",
        });
      }

      return tag;
    }),

  create: protectedProcedure
    .input(insertTagSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      // Verify the project exists and belongs to the user
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

      const [newTag] = await ctx.db
        .insert(tags)
        .values({
          name: input.name,
          description: input.description || null,
          category: input.category,
          projectId: input.projectId,
        })
        .returning();

      return newTag;
    }),

  update: protectedProcedure
    .input(
      updateTagSchema
        .pick({ id: true, name: true, description: true, category: true })
        .extend({ id: z.number({ required_error: "Id is required" }) })
    )
    .mutation(async ({ ctx, input }) => {
      const [tag] = await ctx.db
        .select({ id: tags.id })
        .from(tags)
        .where(eq(tags.id, input.id));

      if (!tag) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tag not found",
        });
      }

      const [updatedTag] = await ctx.db
        .update(tags)
        .set({
          name: input.name,
          description: input.description,
          category: input.category,
        })
        .where(eq(tags.id, input.id))
        .returning();

      return updatedTag;
    }),

  delete: protectedProcedure
    .input(baseSelectSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      // TODO: verify that user owns this project with tag

      const [tag] = await ctx.db
        .select({ id: tags.id })
        .from(tags)
        .where(eq(tags.id, input.id));

      if (!tag) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tag not found",
        });
      }

      await ctx.db.delete(tags).where(eq(tags.id, input.id));

      return { id: input.id };
    }),

  bulkTagTestimonials: protectedProcedure
    .input(
      z.object({
        testimonialIds: z.array(z.number()),
        tagId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // First verify the tag exists and get its project
      const [tag] = await ctx.db
        .select()
        .from(tags)
        .where(eq(tags.id, input.tagId));

      if (!tag) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tag not found",
        });
      }

      // Verify the user has access to the project
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, tag.projectId),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this tag",
        });
      }

      // Verify all testimonials belong to the same project
      const [testimonialCount] = await ctx.db
        .select({ count: count() })
        .from(testimonials)
        .where(
          and(
            eq(testimonials.projectId, tag.projectId),
            inArray(testimonials.id, input.testimonialIds)
          )
        );

      if (testimonialCount?.count !== input.testimonialIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Some testimonials do not belong to the project",
        });
      }

      // Insert the tag associations
      await ctx.db.insert(testimonialTags).values(
        input.testimonialIds.map((testimonialId) => ({
          testimonialId,
          tagId: input.tagId,
        }))
      );

      return { testimonialIds: input.testimonialIds, tagId: input.tagId };
    }),
});
