import { Button } from "@/components/ui/button";
import SettingSection from "@/components/settings/setting-section";
import { Zap } from "lucide-react";

export default function DomainSettings() {
  return (
    <div>
      <SettingSection
        title="Custom domain"
        description="Personalize the url of your Senja page by connecting a custom domain. You can use any subdomain that you own."
      >
        <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-3">
          <Zap className="h-5 w-5 text-purple-600" />
          <p className="text-sm">
            Upgrade your plan to add a custom domain to your Walls of Love and
            forms.
          </p>
        </div>
      </SettingSection>

      <SettingSection
        title="Custom Favicon"
        description="Add a custom favicon to your walls of love and forms."
      >
        <div className="space-y-4">
          <p className="text-sm">Click to change your favicon</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
            </div>
            <Button variant="outline">Change favicon</Button>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Custom Code"
        description="Add custom code to the <head> of your walls of love and forms. Useful for adding custom analytics or plugins."
      >
        <div className="bg-amber-50 p-4 rounded-lg flex items-center gap-3">
          <p className="text-sm">
            You need to connect a custom domain to use this feature
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
