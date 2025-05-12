import { Button } from "@/components/ui/button";
import SettingSection from "@/components/settings/setting-section";
import { Zap } from "lucide-react";

export default function PoweredBySettings() {
  return (
    <div>
      <SettingSection
        title="Show Powered By"
        description="Turn on the Senja Powered By badge for all your forms, widgets and Walls of Love. You can turn them off individually."
      >
        <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-3">
          <Zap className="h-5 w-5 text-purple-600" />
          <p className="text-sm">
            Upgrade to remove the Senja powered by badge from all your forms,
            widgets and Walls of Love.
          </p>
        </div>
      </SettingSection>

      <SettingSection
        title="Affiliate link for Powered By"
        description="Add your affiliate URL to the Powered By badge."
      >
        <div className="space-y-2">
          <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-3">
            <Zap className="h-5 w-5 text-purple-600" />
            <p className="text-sm">
              Upgrade to add your affiliate link to the Senja powered by badge.
            </p>
          </div>
          <p className="text-sm text-purple-600">
            <a href="#" className="underline">
              Click here
            </a>{" "}
            to sign up to Senja's affiliate program.
          </p>
        </div>
      </SettingSection>

      <div className="flex justify-end mt-6">
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save settings
        </Button>
      </div>
    </div>
  );
}
