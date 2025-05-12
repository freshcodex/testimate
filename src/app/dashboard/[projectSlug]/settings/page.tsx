import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import ProjectSettings from "@/components/settings/project-settings-page";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ProjectSettings />
    </DashboardLayout>
  );
}
