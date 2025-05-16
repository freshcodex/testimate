import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/clients/server";
import { CreateProjectModal } from "./create-project-modal";
import { ProjectCard } from "./project-card";
import { Logo } from "@/components/logo";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <Logo />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your Projects
          </h1>
          <CreateProjectModal />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-6">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
