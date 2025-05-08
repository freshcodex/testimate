import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProofDashboard } from "@/components/proof/proof-dashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ProofDashboard />
    </DashboardLayout>
  );
}
