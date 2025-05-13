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
import type { WallOfLoveConfig } from "../types";

interface TextSettingsProps {
  config: WallOfLoveConfig;
  onConfigChange: (config: any) => void;
}

export function TextSettings({ config, onConfigChange }: TextSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2">Text color</Label>
        <ColorPicker
          color={config.textColor}
          onChange={(color) => onConfigChange({ textColor: color })}
        />
      </div>

      <div>
        <Label className="block mb-2">Link color</Label>
        <ColorPicker
          color={config.linkColor}
          onChange={(color) => onConfigChange({ linkColor: color })}
        />
      </div>

      <div>
        <Label className="block mb-2">Heart color</Label>
        <ColorPicker
          color={config.heartColor}
          onChange={(color) => onConfigChange({ heartColor: color })}
        />
      </div>

      <div>
        <Label className="block mb-2">Star color</Label>
        <ColorPicker
          color={config.starColor}
          onChange={(color) => onConfigChange({ starColor: color })}
        />
      </div>

      {/* <div>
        <Label htmlFor="font-family">Font family</Label>
        <div className="flex items-center gap-2 mt-1">
          <Select
            value={config.fontFamily}
            onValueChange={(value) => onConfigChange({ fontFamily: value })}
          >
            <SelectTrigger id="font-family" className="w-full">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lato">Lato</SelectItem>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Open Sans">Open Sans</SelectItem>
              <SelectItem value="Montserrat">Montserrat</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Checkbox id="custom-font" />
            <Label htmlFor="custom-font" className="text-sm">
              Custom font
            </Label>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="font-size">Font size</Label>
        <Select
          value={config.fontSize}
          onValueChange={(value) => onConfigChange({ fontSize: value })}
        >
          <SelectTrigger id="font-size" className="w-full mt-1">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xs">Extra Small</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="base">Base</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="highlight-style">Highlight style</Label>
        <Select
          value={config.highlightStyle}
          onValueChange={(value) => onConfigChange({ highlightStyle: value })}
        >
          <SelectTrigger id="highlight-style" className="w-full mt-1">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="underline">Underline</SelectItem>
            <SelectItem value="highlight">Highlight</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}
