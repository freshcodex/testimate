"use client";

import { useFormContext } from "react-hook-form";
import { Heart } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FormValues } from "@/lib/schema/form-schema";

export function DesignSection() {
  const { control, formState } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="design.logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-medium text-gray-500">
              Logo
            </FormLabel>
            <div className="mt-1 border border-gray-200 p-4 rounded-md inline-block">
              <div
                className="h-12 w-12 flex items-center justify-center bg-white rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  const fileInput = document.querySelector(
                    'input[type="file"]'
                  ) as HTMLInputElement;
                  fileInput?.click();
                }}
              >
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="design.primaryColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-gray-500">
                Primary Color
              </FormLabel>
              <div className="mt-1 flex items-center">
                <FormControl>
                  <Input type="color" {...field} className="h-9 w-20 p-1" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="design.backgroundColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-gray-500">
                Background Color
              </FormLabel>
              <div className="mt-1 flex items-center">
                <FormControl>
                  <Input type="color" {...field} className="h-9 w-20 p-1" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="design.font"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-medium text-gray-500">
              Font
            </FormLabel>
            <div className="relative mt-1">
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
                >
                  <option>Default</option>
                  <option>Sans Serif</option>
                  <option>Serif</option>
                  <option>Monospace</option>
                </select>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="design.showGradient"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <FormLabel className="text-sm">Show Gradient Background</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
