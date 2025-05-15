import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { env } from "@/env";
import { db } from "@/server/db";
import { testimonials } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { Mux } from "@mux/mux-node";
import type {
  VideoAssetCreatedWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
  VideoAssetDeletedWebhookEvent,
} from "@mux/mux-node/resources/webhooks.mjs";

type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetTrackReadyWebhookEvent
  | VideoAssetDeletedWebhookEvent;

const mux = new Mux({
  tokenId: env.MUX_TOKEN_ID,
  tokenSecret: env.MUX_TOKEN_SECRET,
});

export async function POST(request: Request) {
  try {
    const headersPayload = await headers();
    const muxSignature = headersPayload.get("mux-signature");

    if (!muxSignature) {
      return new Response("No signature found", { status: 401 });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    mux.webhooks.verifySignature(
      body,
      {
        "mux-signature": muxSignature,
      },
      env.MUX_WEBHOOK_SECRET
    );

    console.log("payload", JSON.stringify(payload, null, 2));

    switch (payload.type as WebhookEvent["type"]) {
      case "video.asset.ready": {
        const data = payload.data as VideoAssetReadyWebhookEvent["data"];
        const testimonialId = Number(data.passthrough);
        const playbackId = data.playback_ids?.[0]?.id;

        console.log("video asset ready", JSON.stringify(data, null, 2));

        if (!data.upload_id) {
          return new Response("Missing upload ID", { status: 400 });
        }

        if (!playbackId) {
          return new Response("Missing playback ID", { status: 400 });
        }

        const tempThumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
        // const tempPreviewUrl = `https://image.mux.com/${playbackId}/animated.gif`;

        await db
          .update(testimonials)
          .set({
            // TODO: rename this to playbackId in schema and add preview url as well
            videoUrl: playbackId,
            thumbnailUrl: tempThumbnailUrl,
          })
          .where(eq(testimonials.id, testimonialId));
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Mux webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
