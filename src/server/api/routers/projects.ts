import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { desc, eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createUpdateSchema, createSelectSchema } from "drizzle-zod";
import { profiles, projects } from "@/server/db/schema";

const updateProjectSchema = createUpdateSchema(projects);
const baseSelectSchema = createSelectSchema(projects);

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db
      .select()
      .from(projects)
      .where(and(eq(projects.createdBy, ctx.user.id)))
      .orderBy(desc(projects.createdAt));

    return res;
  }),

  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.slug, input.slug),
            eq(projects.createdBy, ctx.user.id)
          )
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return project;
    }),

  getProjectAndCurrentUserProfile: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.slug, input.slug));

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const [userProfile] = await ctx.db
        .select()
        .from(profiles)
        .where(eq(profiles.id, project.createdBy));

      if (!userProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User profile not found",
        });
      }

      return { project, userProfile };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(eq(projects.id, input.id), eq(projects.createdBy, ctx.user.id))
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return project;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        active: z.boolean().default(true),
        slug: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProject = await ctx.db
        .insert(projects)
        .values({
          name: input.name,
          description: input.description || null,
          createdBy: ctx.user.id,
          active: input.active,
          slug: input.slug,
        })
        .returning();

      return newProject[0];
    }),

  update: protectedProcedure
    .input(
      updateProjectSchema
        .pick({ id: true, name: true, description: true, active: true })
        .extend({ id: z.number({ required_error: "Id is required" }) })
    )
    .mutation(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .select({ id: projects.id })
        .from(projects)
        .where(
          and(eq(projects.id, input.id), eq(projects.createdBy, ctx.user.id))
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Project not found or you do not have permission to update it",
        });
      }

      const updatedProject = await ctx.db
        .update(projects)
        .set({
          name: input.name,
          description: input.description,
          active: input.active,
        })
        .where(eq(projects.id, input.id))
        .returning();

      return updatedProject[0];
    }),

  delete: protectedProcedure
    .input(baseSelectSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .select({ id: projects.id })
        .from(projects)
        .where(
          and(eq(projects.id, input.id), eq(projects.createdBy, ctx.user.id))
        );

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Project not found or you do not have permission to delete it",
        });
      }

      await ctx.db.delete(projects).where(eq(projects.id, input.id));

      return { id: input.id };
    }),
});
