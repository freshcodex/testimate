import { updateSession } from "@/supabase/clients/middleware";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/p/:path*",
  "/t/:path*",
  "/w/:path*",
  "/login",
  "/signup",
  "/email-confirm",
];

export async function middleware(request: NextRequest) {
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request, NextResponse.next());

  // Check authentication for protected routes
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
