"use client";

import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/studio/wall-of-love/color-picker";

interface BackgroundSettingsProps {
  config: any;
  onConfigChange: (config: any) => void;
}

export function BackgroundSettings({
  config,
  onConfigChange,
}: BackgroundSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Background color</Label>
        <div className="flex items-center gap-2 mb-2">
          <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm">
            Gradient
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded text-sm">
            Solid color
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded text-sm">
            Transparent
          </div>
        </div>
        <ColorPicker
          color={config.backgroundColor}
          onChange={(color) => onConfigChange({ backgroundColor: color })}
        />
      </div>

      <div>
        <Label className="block mb-2">Card background color</Label>
        <div className="flex items-center gap-2 mb-2">
          <div className="px-3 py-1 bg-gray-100 rounded text-sm">
            Solid color
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded text-sm">
            Transparent
          </div>
        </div>
        <ColorPicker
          color={config.cardBackgroundColor}
          onChange={(color) => onConfigChange({ cardBackgroundColor: color })}
        />
      </div>
    </div>
  );
}
