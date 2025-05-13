import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { desc, eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createUpdateSchema, createInsertSchema } from "drizzle-zod";
import { widgets, projects } from "@/server/db/schema";

const updateWidgetSchema = createUpdateSchema(widgets);
const insertWidgetSchema = createInsertSchema(widgets);

export const widgetRouter = createTRPCRouter({
  // Get all widgets for a project by slug
  getAllByProjectSlug: protectedProcedure
    .input(z.object({ projectSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      // First get the project to verify ownership
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
          message: "Project not found",
        });
      }

      const widgetsList = await ctx.db
        .select()
        .from(widgets)
        .where(eq(widgets.projectSlug, input.projectSlug))
        .orderBy(desc(widgets.createdAt));

      return widgetsList;
    }),

  // Get a single widget by ID (with project slug verification)
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        projectSlug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // First get the project to verify ownership
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
          message: "Project not found",
        });
      }

      const [widget] = await ctx.db
        .select()
        .from(widgets)
        .where(
          and(
            eq(widgets.id, input.id),
            eq(widgets.projectSlug, input.projectSlug)
          )
        );

      if (!widget) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Widget not found",
        });
      }

      return widget;
    }),

  // Create a new widget
  create: protectedProcedure
    .input(insertWidgetSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      // First get the project to verify ownership
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
          message: "Project not found",
        });
      }

      const [newWidget] = await ctx.db
        .insert(widgets)
        .values({
          name: input.name,
          type: input.type,
          config: input.config,
          projectSlug: input.projectSlug,
        })
        .returning();

      return newWidget;
    }),

  // Update a widget
  update: protectedProcedure
    .input(
      updateWidgetSchema.extend({ projectSlug: z.string(), id: z.number() })
    )
    .mutation(async ({ ctx, input }) => {
      // First get the project to verify ownership
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
          message: "Project not found",
        });
      }

      // Verify widget exists and belongs to the project
      const [existingWidget] = await ctx.db
        .select()
        .from(widgets)
        .where(
          and(
            eq(widgets.id, input.id),
            eq(widgets.projectSlug, input.projectSlug)
          )
        );

      if (!existingWidget) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Widget not found or you don't have permission to update it",
        });
      }

      const updateData = {
        ...(input.name && { name: input.name }),
        ...(input.config && { config: input.config }),
        updatedAt: new Date(),
      };

      const [updatedWidget] = await ctx.db
        .update(widgets)
        .set(updateData)
        .where(eq(widgets.id, input.id))
        .returning();

      return updatedWidget;
    }),

  // Delete a widget
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        projectSlug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // First get the project to verify ownership
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
          message: "Project not found",
        });
      }

      // Verify widget exists and belongs to the project
      const [existingWidget] = await ctx.db
        .select()
        .from(widgets)
        .where(
          and(
            eq(widgets.id, input.id),
            eq(widgets.projectSlug, input.projectSlug)
          )
        );

      if (!existingWidget) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Widget not found or you don't have permission to delete it",
        });
      }

      await ctx.db.delete(widgets).where(eq(widgets.id, input.id));

      return { id: input.id };
    }),
});
