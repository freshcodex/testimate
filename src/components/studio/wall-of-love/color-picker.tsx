"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(color);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(e.target.value)) {
      onChange(e.target.value);
    }
  };

  const presetColors = [
    "#FFFFFF",
    "#000000",
    "#F97316",
    "#F59E0B",
    "#84CC16",
    "#10B981",
    "#0EA5E9",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#F43F5E",
    "#6366F1",
  ];

  return (
    <div>
      <div className="grid grid-cols-6 gap-2 mb-2">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className="h-8 w-8 rounded border border-gray-200 flex items-center justify-center"
            style={{ backgroundColor: presetColor }}
            onClick={() => {
              onChange(presetColor);
              setInputValue(presetColor);
            }}
            type="button"
          >
            {presetColor === color && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke={presetColor === "#FFFFFF" ? "#000000" : "#FFFFFF"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded border border-gray-200"
          style={{ backgroundColor: color }}
        />
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            className="font-mono"
            placeholder="#FFFFFF"
          />
        </div>
      </div>
    </div>
  );
}
