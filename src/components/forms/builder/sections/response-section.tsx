"use client";

import { useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FormValues } from "@/lib/schema/form-schema";

export function ResponseSection() {
  const { control, watch } = useFormContext<FormValues>();
  const useDifferentPrompts = watch("responsePage.useDifferentPrompts");

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="responsePage.useDifferentPrompts"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <FormLabel className="text-sm">
              Use different prompt for text and video testimonials
            </FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="responsePage.prompt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prompt</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={6}
                placeholder="Enter questions to prompt your customers..."
              />
            </FormControl>
            <p className="text-xs text-gray-500 mt-1">Markdown supported</p>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormField
          control={control}
          name="responsePage.collectRatings"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Collect Ratings</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="responsePage.collectImageAttachments"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Collect Image Attachments
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
