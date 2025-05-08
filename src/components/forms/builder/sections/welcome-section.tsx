"use client";

import { useFormContext } from "react-hook-form";
import { Zap } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FormValues } from "@/lib/schema/form-schema";

export function WelcomeSection() {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="welcomePage.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Welcome Page Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="welcomePage.introductoryMessage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Introductory Message</FormLabel>
            <FormControl>
              <Textarea {...field} rows={6} />
            </FormControl>
            <p className="text-xs text-gray-500 mt-1">Markdown supported</p>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormField
          control={control}
          name="welcomePage.collectVideo"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Collect Video Testimonials
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="welcomePage.collectText"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Collect Text Testimonials
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="welcomePage.welcomeVideoMessage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Welcome Video Message</FormLabel>
            <div className="bg-purple-50 p-3 rounded-md flex items-center text-sm">
              <Zap className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0" />
              <p className="text-purple-600">{field.value}</p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
