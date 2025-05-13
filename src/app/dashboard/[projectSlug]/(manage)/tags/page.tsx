// "use client";

import { TagsContent } from "@/components/tags/tags-content";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { projects } from "@/server/db/schema";

export default async function TagsPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const project = await db.query.projects.findFirst({
    where: eq(projects.slug, projectSlug),
  });

  console.log(project);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <DashboardLayout>
      <TagsContent projectId={project.id} projectSlug={project.slug} />
    </DashboardLayout>
  );
}
