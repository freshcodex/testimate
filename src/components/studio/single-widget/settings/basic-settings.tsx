"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BasicSettingsProps {
  config: any;
  onConfigChange: (config: any) => void;
}

export function BasicSettings({ config, onConfigChange }: BasicSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remove-branding"
          checked={!config.showBranding}
          onCheckedChange={(checked) =>
            onConfigChange({ showBranding: !checked })
          }
        />
        <Label htmlFor="remove-branding" className="flex items-center">
          Remove Testimonial branding
          <span className="ml-2 text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
            🔒
          </span>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="dark-theme"
          checked={config.theme === "dark"}
          onCheckedChange={(checked) =>
            onConfigChange({ theme: checked ? "dark" : "light" })
          }
        />
        <Label htmlFor="dark-theme">Dark theme</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hide-date"
          checked={!config.showDate}
          onCheckedChange={(checked) => onConfigChange({ showDate: !checked })}
        />
        <Label htmlFor="hide-date">Hide the date</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hide-source"
          checked={!config.showSource}
          onCheckedChange={(checked) =>
            onConfigChange({ showSource: !checked })
          }
        />
        <Label htmlFor="hide-source">Hide source icons</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-captions"
          checked={config.showCaptions}
          onCheckedChange={(checked) =>
            onConfigChange({ showCaptions: checked })
          }
        />
        <Label htmlFor="show-captions">Show closed captions by default</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="add-star-rating"
          checked={config.showStarRating}
          onCheckedChange={(checked) =>
            onConfigChange({ showStarRating: checked })
          }
        />
        <Label htmlFor="add-star-rating" className="flex items-center">
          Add star rating snippet in Google search results
          <span className="ml-2 text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
            🔒
          </span>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-heart"
          checked={config.showHeartAnimation}
          onCheckedChange={(checked) =>
            onConfigChange({ showHeartAnimation: checked })
          }
        />
        <Label htmlFor="show-heart">Show heart animation</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="shadow-background"
          checked={config.shadowBackground}
          onCheckedChange={(checked) =>
            onConfigChange({ shadowBackground: checked })
          }
        />
        <Label htmlFor="shadow-background">
          Top and bottom shadow background
        </Label>
      </div>
    </div>
  );
}
