"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/studio/wall-of-love/color-picker";
import type { WallOfLoveConfig } from "../types";
interface BorderSettingsProps {
  config: WallOfLoveConfig;
  onConfigChange: (config: any) => void;
}

export function BorderSettings({
  config,
  onConfigChange,
}: BorderSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="border-width">Border width</Label>
        <Input
          id="border-width"
          type="number"
          min="0"
          max="10"
          className="mt-1"
          value={config.borderWidth || 1}
          onChange={(e) =>
            onConfigChange({ borderWidth: Number.parseInt(e.target.value) })
          }
        />
      </div>

      <div>
        <Label htmlFor="border-radius">Border radius</Label>
        <Input
          id="border-radius"
          type="number"
          min="0"
          max="50"
          className="mt-1"
          value={config.borderRadius || 8}
          onChange={(e) =>
            onConfigChange({ borderRadius: Number.parseInt(e.target.value) })
          }
        />
      </div>

      {/* <div>
        <Label htmlFor="border-style">Border style</Label>
        <Select
          value={config.borderStyle || "solid"}
          onValueChange={(value) => onConfigChange({ borderStyle: value })}
        >
          <SelectTrigger id="border-style" className="w-full mt-1">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="dashed">Dashed</SelectItem>
            <SelectItem value="dotted">Dotted</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <div>
        <Label className="block mb-2">Border color</Label>
        <ColorPicker
          color={config.borderColor || "#E5E7EB"}
          onChange={(color) => onConfigChange({ borderColor: color })}
        />
      </div>
    </div>
  );
}
