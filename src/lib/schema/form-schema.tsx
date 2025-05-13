import {
  designConfigSchema,
  welcomePageConfigSchema,
  responsePageConfigSchema,
  customerDetailsConfigSchema,
  thankYouPageConfigSchema,
  customLabelsSchema,
  additionalFieldsSchema,
  additionalFieldSchema,
} from "@/server/db/zod-schemas";
import * as z from "zod";

// Main form schema
export const collectionFormSchema = z.object({
  name: z.string().min(1, "Form name is required"),
  design: designConfigSchema,
  welcomePage: welcomePageConfigSchema,
  responsePage: responsePageConfigSchema,
  customerDetails: customerDetailsConfigSchema,
  thankYouPage: thankYouPageConfigSchema,
  additionalFields: z.array(additionalFieldSchema).default([]),
  customLabels: customLabelsSchema,
});

export type CollectionFormConfig = z.infer<typeof collectionFormSchema>;
export type DesignValues = z.infer<typeof designConfigSchema>;
export type WelcomePageValues = z.infer<typeof welcomePageConfigSchema>;
export type ResponsePageValues = z.infer<typeof responsePageConfigSchema>;
export type CustomerDetailsValues = z.infer<typeof customerDetailsConfigSchema>;
export type ThankYouPageValues = z.infer<typeof thankYouPageConfigSchema>;
export type AdditionalField = z.infer<typeof additionalFieldSchema>;
export type CustomLabelsValues = z.infer<typeof customLabelsSchema>;
