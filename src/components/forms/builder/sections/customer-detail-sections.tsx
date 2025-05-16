"use client";

import { useFormContext } from "react-hook-form";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import type { CollectionFormConfig } from "@/lib/schema/form-schema";
import {
  AtSign,
  Briefcase,
  User,
  Globe,
  Building2,
  Hexagon,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomFieldModal } from "./custom-field-modal";

// TODO: should come from db or a central place right now duplication
const customerFields = [
  {
    key: "email",
    label: "Collect Email Address",
    description:
      "Collect email addresses so you can stay in touch and send a thank you note",
    enabledName: "customerDetails.emailEnabled",
    requiredName: "customerDetails.emailRequired",
    defaultEnabled: true,
    defaultRequired: true,
    icon: <AtSign className="h-5 w-5 text-gray-500" />,
  },
  {
    key: "jobTitle",
    label: "Collect Job Title",
    description:
      "Collect job titles so you search by title, and group testimonials in some widgets.",
    enabledName: "customerDetails.jobTitleEnabled",
    requiredName: "customerDetails.jobTitleRequired",
    defaultEnabled: true,
    defaultRequired: false,
    icon: <Briefcase className="h-5 w-5 text-gray-500" />,
  },
  {
    key: "userPhoto",
    label: "Collect User Photo",
    description:
      "Collect user photos to make widgets that convert better because they look more authentic.",
    enabledName: "customerDetails.userPhotoEnabled",
    requiredName: "customerDetails.userPhotoRequired",
    defaultEnabled: true,
    defaultRequired: false,
    icon: <User className="h-5 w-5 text-gray-500" />,
  },
  {
    key: "websiteUrl",
    label: "Collect Website URL",
    description:
      "Collect website URL so you can learn more about your customers, and include a link in some widgets.",
    enabledName: "customerDetails.websiteUrlEnabled",
    requiredName: "customerDetails.websiteUrlRequired",
    defaultEnabled: true,
    defaultRequired: false,
    icon: <Globe className="h-5 w-5 text-gray-500" />,
  },
  {
    key: "company",
    label: "Collect Company",
    description:
      "Collect company name so you can search for testimonials from the same company, and display it in some widgets.",
    enabledName: "customerDetails.companyEnabled",
    requiredName: "customerDetails.companyRequired",
    defaultEnabled: true,
    defaultRequired: false,
    icon: <Building2 className="h-5 w-5 text-gray-500" />,
  },
  // {
  //   key: "team",
  //   label: "Collect Team",
  //   description:
  //     "Collect team so you can search for testimonials by department and display it in some widgets.",
  //   enabledName: "customerDetails.teamEnabled",
  //   requiredName: "customerDetails.teamRequired",
  //   defaultEnabled: false,
  //   defaultRequired: false,
  //   icon: <Users className="h-5 w-5 text-gray-500" />,
  // },
  {
    key: "companyLogo",
    label: "Collect Company Logo",
    description:
      "Collect company logos to create widgets that showcase the logos of your customers.",
    enabledName: "customerDetails.companyLogoEnabled",
    requiredName: "customerDetails.companyLogoRequired",
    defaultEnabled: true,
    defaultRequired: false,
    icon: <Hexagon className="h-5 w-5 text-gray-500" />,
  },
];

export function CustomerDetailsSection() {
  const { control, watch } = useFormContext<CollectionFormConfig>();
  const [open, setOpen] = React.useState(false);
  const additionalFields = watch("additionalFields") || [];
  const { setValue, getValues } = useFormContext<CollectionFormConfig>();

  // Helper to remove a field by id
  const handleDeleteField = (id: string) => {
    const current = getValues("additionalFields") || [];
    setValue(
      "additionalFields",
      current.filter((f) => f.id !== id)
    );
  };

  // Helper to add a field
  const handleAddField = (
    field: CollectionFormConfig["additionalFields"][number]
  ) => {
    const current = getValues("additionalFields") || [];
    setValue("additionalFields", [...current, field]);
  };

  return (
    <div className="my-2 space-y-6">
      <p className="text-sm text-gray-500 mb-2">
        Select which customer details to collect:
      </p>
      <div className="space-y-4">
        {customerFields.map((field) => {
          const enabled = watch(field.enabledName as any);
          return (
            <div
              key={field.key}
              className="border rounded-lg p-4 bg-white flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex  gap-4">
                  <span>{field.icon}</span>
                  <div>
                    <div className="text-sm">{field.label}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {field.description}
                    </div>
                    <div className="flex gap-4 items-end my-2">
                      <FormField
                        control={control}
                        name={field.enabledName as any}
                        render={({ field: enabledField }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={!!enabledField.value}
                                onCheckedChange={enabledField.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-xs">Enabled</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={field.requiredName as any}
                        render={({ field: requiredField }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={!!requiredField.value}
                                onCheckedChange={requiredField.onChange}
                                disabled={!enabled}
                              />
                            </FormControl>
                            <FormLabel className="text-xs">Required</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-base">Additional Fields</div>
            <div className="text-xs text-gray-500 mt-1">
              ⚡ Collect more information from your users by adding an
              additional field.{" "}
              <span className="italic">Click to add one.</span>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" size="icon">
            <Plus className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {additionalFields.map((field) => (
            <div
              key={field.id}
              className="border rounded-lg p-4 flex items-center justify-between bg-gray-50"
            >
              <div>
                <div className="font-medium text-base">{field.label}</div>
                <div className="text-xs text-gray-400">{field.id}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteField(field.id)}
                aria-label="Delete field"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          ))}
        </div>
        <CustomFieldModal
          open={open}
          onOpenChange={setOpen}
          addAdditionalField={handleAddField}
        />
      </div>
    </div>
  );
}
