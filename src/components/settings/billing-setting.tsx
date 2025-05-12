import SettingSection from "@/components/settings/setting-section";
import { Mail } from "lucide-react";

export default function BillingSettings() {
  return (
    <div>
      <SettingSection
        title="Billing Settings"
        description="Manage your billing information and subscription."
      >
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm">
              Project Billing Manger: bishalsecret@gmail.com
            </p>
          </div>

          <div className="border rounded-lg p-4 flex items-center gap-3">
            <Mail className="h-5 w-5" />
            <div>
              <p className="text-sm">
                You're not subscribed to any plan.{" "}
                <a href="#" className="text-purple-600 font-medium">
                  Upgrade your plan to get started
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-medium">Invoice history</h3>
            <p className="text-sm text-muted-foreground">
              You haven't paid for anything yet.
            </p>
          </div>
        </div>
      </SettingSection>
    </div>
  );
}
