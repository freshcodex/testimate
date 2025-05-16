import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/clients/server";
import { CreateProjectModal } from "./create-project-modal";
import { ProjectCard } from "./project-card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const userProjects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.createdBy, session.user.id),
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });

  // TODO: maybe add a bit of branding seems of page header
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <CreateProjectModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
