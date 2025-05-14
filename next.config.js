/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["coyixansbxtnortjfiib.supabase.co"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/p/:projectSlug/r/:formId",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // In production, you should restrict this to specific domains
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default config;
