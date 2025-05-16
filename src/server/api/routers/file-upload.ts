import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "@/env";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Mux from "@mux/mux-node";
import { projects, testimonials } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const s3Client = new S3Client({
  forcePathStyle: true,
  region: env.S3_REGION,
  endpoint: env.NEXT_PUBLIC_S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

const muxClient = new Mux({
  tokenId: env.MUX_TOKEN_ID,
  tokenSecret: env.MUX_TOKEN_SECRET,
});

export const fileUploadRouter = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z
          .string()
          .refine(
            (type) => type.startsWith("image/"),
            "Only image files are allowed"
          ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const key = `${ctx.user.id}/${Date.now()}-${input.fileName}`;
        const command = new PutObjectCommand({
          Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
          Key: key,
          ContentType: input.fileType,
          ACL: "public-read",
        });

        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        });

        return {
          url: signedUrl,
          path: key,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate presigned URL",
          cause: error,
        });
      }
    }),

  getMuxUploadUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z
          .string()
          .refine(
            (type) => type.startsWith("video/"),
            "Only video files are allowed"
          ),
        projectSlug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await ctx.db.query.projects.findFirst({
          where: eq(projects.slug, input.projectSlug),
        });

        if (!project) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project not found",
          });
        }

        const [tempTestimonial] = await ctx.db
          .insert(testimonials)
          .values({
            projectId: project.id,
            customerName: "",
            customerEmail: "",
            type: "video",
            approved: false,
            // Add a temporary title that will be updated later
            title: "Video upload in progress...",
          })
          .returning();

        // Generate JWT token with testimonial and project IDs
        const token = jwt.sign(
          {
            testimonialId: tempTestimonial?.id!,
            projectId: project.id,
          },
          env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Create Mux upload with metadata containing testimonial ID
        const upload = await muxClient.video.uploads.create({
          new_asset_settings: {
            passthrough: tempTestimonial?.id.toString(),
            playback_policy: ["public"],
            meta: {
              title: "Video upload in progress...",
              creator_id: tempTestimonial?.id.toString(),
            },
          },
          cors_origin: "*",
        });

        return {
          uploadUrl: upload.url,
          uploadId: upload.id,
          testimonialId: tempTestimonial?.id,
          token, // Add the JWT token to the response
        };
      } catch (error) {
        console.error("Mux upload error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate Mux upload URL",
          cause: error,
        });
      }
    }),
});
