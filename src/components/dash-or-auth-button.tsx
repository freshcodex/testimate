import Link from "next/link";
import { createClient } from "@/supabase/clients/server";
import { SignoutButton } from "@/components/signout-button";
import { db } from "@/server/db";
import { projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function DashOrAuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  // TODO: this is a temporary solution to get the project slug,
  // maybe fetch the projects for user and allow user to select one from there
  let projectSlug = "";
  if (data.session) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.createdBy, data.session?.user.id!));

    projectSlug = project!.slug;
  }

  return (
    <div className="flex items-center space-x-2">
      {data.session ? (
        <>
          <Link
            href={`/dashboard/${projectSlug}`}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Dashboard
          </Link>
          <SignoutButton />
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}
