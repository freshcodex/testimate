import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "Testimonial Form";
    const description =
      searchParams.get("description") || "Share your testimonial with us";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 30,
                color: "#666666",
                lineHeight: 1.5,
              }}
            >
              {description}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 40,
              fontSize: 24,
              color: "#666666",
            }}
          >
            Testimate
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    // console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
