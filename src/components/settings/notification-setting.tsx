import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import SettingSection from "@/components/settings/setting-section";

export default function NotificationSettings() {
  return (
    <div>
      <SettingSection
        title="Email Notifications"
        description="Manage your personal notification settings for the Shane Parrish project."
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="testimonial" defaultChecked />
            <label
              htmlFor="testimonial"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              New testimonial notifications
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="import" defaultChecked />
            <label
              htmlFor="import"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Auto-import notifications
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="report" defaultChecked />
            <label
              htmlFor="report"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Monthly report
            </label>
          </div>
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
