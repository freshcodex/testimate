"use client";

import { useFormContext } from "react-hook-form";
import { Heart } from "lucide-react";
import { env } from "@/env";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function DesignSection() {
  const { control } = useFormContext<CollectionFormConfig>();

  const { mutate: getPresignedUrl } =
    api.fileUpload.getPresignedUrl.useMutation();

  const handleFileUpload = async (
    file: File,
    setValue: (value: string) => void
  ) => {
    try {
      getPresignedUrl(
        {
          fileName: file.name,
          fileType: file.type,
        },
        {
          onSuccess: async (data) => {
            const uploadUrl = data.url;
            const path = data.path;

            const uploadResponse = await fetch(uploadUrl, {
              method: "PUT",
              body: file,
              headers: {
                "Content-Type": file.type,
              },
            });

            console.log(JSON.stringify(uploadResponse.body, null, 2));

            if (uploadResponse.ok) {
              // Get the public URL for the uploaded file
              const publicUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${env.NEXT_PUBLIC_S3_BUCKET_NAME}/${path}`;
              setValue(publicUrl);
              toast.success("Logo uploaded successfully");
            } else {
              toast.error("Failed to upload logo");
            }
          },
        }
      );
    } catch (error) {
      toast.error("Failed to upload logo");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="my-2 space-y-4">
      <FormField
        control={control}
        name="design.logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-medium text-gray-500">
              Logo
            </FormLabel>
            <div className="mt-1 border border-gray-200 p-4 rounded-md inline-block">
              {field.value ? (
                <div className="relative">
                  <img
                    src={field.value}
                    alt="Logo preview"
                    className="h-12 w-12 object-contain rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => field.onChange("")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
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
              )}
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file, field.onChange);
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

        {/* <FormField
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
        /> */}
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
