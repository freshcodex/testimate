import { updateSession } from "@/supabase/clients/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./supabase/clients/server";

const protectedRoutes = ["/dashboard/:path*"];

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
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
