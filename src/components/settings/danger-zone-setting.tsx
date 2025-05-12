import { Button } from "@/components/ui/button";
import SettingSection from "@/components/settings/setting-section";
import { AlertCircle } from "lucide-react";

export default function DangerZoneSettings() {
  return (
    <div>
      <SettingSection
        title="Delete Project"
        description="This will permanently delete your entire project. All your testimonials, forms and widgets will be deleted permanently."
      >
        <div className="space-y-4">
          <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
            Delete Project
          </Button>

          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              You can't delete this project until you create a new one.
            </p>
          </div>
        </div>
      </SettingSection>
    </div>
  );
}
