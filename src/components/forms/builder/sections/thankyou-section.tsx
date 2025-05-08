"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FormValues } from "@/lib/schema/form-schema";

export function ThankYouSection() {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="thankYouPage.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thank You Page Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="thankYouPage.message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thank You Message</FormLabel>
            <FormControl>
              <Textarea {...field} rows={4} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="thankYouPage.showSocialShare"
        render={({ field }) => (
          <FormItem className="flex items-start space-x-2 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="font-normal">
              Show social sharing options
            </FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
