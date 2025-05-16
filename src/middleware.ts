import { updateSession } from "@/supabase/clients/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./supabase/clients/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const { response, user } = await updateSession(request, NextResponse.next());

  // Skip auth checks for login and onboarding routes
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/onboarding"
  ) {
    return response;
  }

  // Check authentication for protected routes
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // TODO: profiles are created after signup, via supabase postres trigger function
  // may not be available immediately idk
  // here use supabase to get the profile instead of db
  // Check onboarding completion for protected routes
  // since perf hook from trpc is not working in edge runtime
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile?.onboardingCompleted) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
