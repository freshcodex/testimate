import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "@/env";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  forcePathStyle: true,
  region: env.S3_REGION,
  endpoint: env.NEXT_PUBLIC_S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
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
});
