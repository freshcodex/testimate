"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/studio/wall-of-love/color-picker";

interface TagsSettingsProps {
  config: any;
  onConfigChange: (config: any) => void;
}

export function TagsSettings({ config, onConfigChange }: TagsSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="design">Design</Label>
        <Select
          value={config.tagDesign || "button"}
          onValueChange={(value) => onConfigChange({ tagDesign: value })}
        >
          <SelectTrigger id="design" className="w-full mt-1">
            <SelectValue placeholder="Select design" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="button">Button</SelectItem>
            <SelectItem value="pill">Pill</SelectItem>
            <SelectItem value="text">Text only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="alignment">Alignment</Label>
        <Select
          value={config.buttonAlignment}
          onValueChange={(value) => onConfigChange({ buttonAlignment: value })}
        >
          <SelectTrigger id="alignment" className="w-full mt-1">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block mb-2">Font color</Label>
        <ColorPicker
          color={config.buttonFontColor}
          onChange={(color) => onConfigChange({ buttonFontColor: color })}
        />
      </div>

      <div>
        <Label className="block mb-2">Selected font color</Label>
        <ColorPicker
          color={config.selectedFontColor}
          onChange={(color) => onConfigChange({ selectedFontColor: color })}
        />
      </div>

      <div>
        <Label className="block mb-2">Button color</Label>
        <ColorPicker
          color={config.buttonColor}
          onChange={(color) => onConfigChange({ buttonColor: color })}
        />
      </div>

      <div>
        <Label className="block mb-2">Selected button color</Label>
        <ColorPicker
          color={config.selectedButtonColor}
          onChange={(color) => onConfigChange({ selectedButtonColor: color })}
        />
      </div>
    </div>
  );
}
