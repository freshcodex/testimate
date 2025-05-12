"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ColorPicker } from "@/components/studio/wall-of-love/color-picker";

interface VideoSettingsProps {
  config: any;
  onConfigChange: (config: any) => void;
}

export function VideoSettings({ config, onConfigChange }: VideoSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="design-option">Design option</Label>
        <Select
          value={config.videoDesign || "default"}
          onValueChange={(value) => onConfigChange({ videoDesign: value })}
        >
          <SelectTrigger id="design-option" className="w-full mt-1">
            <SelectValue placeholder="Select design" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-duration"
          checked={config.showVideoDuration}
          onCheckedChange={(checked) =>
            onConfigChange({ showVideoDuration: checked })
          }
        />
        <Label htmlFor="show-duration">Show video duration and controls</Label>
      </div>

      <div>
        <Label className="block mb-2">Play button color</Label>
        <ColorPicker
          color={config.playButtonColor}
          onChange={(color) => onConfigChange({ playButtonColor: color })}
        />
      </div>
    </div>
  );
}
