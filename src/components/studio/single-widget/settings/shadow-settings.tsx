"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ColorPicker } from "@/components/studio/wall-of-love/color-picker";

interface ShadowSettingsProps {
  config: any;
  onConfigChange: (config: any) => void;
}

export function ShadowSettings({
  config,
  onConfigChange,
}: ShadowSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Shadow type</Label>
        <RadioGroup
          defaultValue="standard"
          className="flex flex-col space-y-2"
          onValueChange={(value) => onConfigChange({ shadowType: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="shadow-none" />
            <Label htmlFor="shadow-none">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="shadow-standard" />
            <Label htmlFor="shadow-standard">Standard</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="spotlight" id="shadow-spotlight" />
            <Label htmlFor="shadow-spotlight">Spotlight</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Shadow size</Label>
        <RadioGroup
          defaultValue="medium"
          className="flex flex-col space-y-2"
          onValueChange={(value) => onConfigChange({ shadowSize: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="shadow-small" />
            <Label htmlFor="shadow-small">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="shadow-medium" />
            <Label htmlFor="shadow-medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="shadow-large" />
            <Label htmlFor="shadow-large">Large</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Shadow color</Label>
        <div className="flex items-center gap-2 mb-2">
          <div className="px-3 py-1 bg-gray-100 rounded text-sm">
            Solid color
          </div>
        </div>
        <ColorPicker
          color={config.shadowColor || "#000000"}
          onChange={(color) => onConfigChange({ shadowColor: color })}
        />
      </div>
    </div>
  );
}
