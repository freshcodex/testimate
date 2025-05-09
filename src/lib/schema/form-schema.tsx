import {
  designConfigSchema,
  welcomePageConfigSchema,
  responsePageConfigSchema,
  customerDetailsConfigSchema,
  thankYouPageConfigSchema,
  customLabelsSchema,
  additionalFieldSchema,
} from "@/server/db/schema";
import * as z from "zod";

// Main form schema
export const formSchema = z.object({
  name: z.string().min(1, "Form name is required"),
  design: designConfigSchema,
  welcomePage: welcomePageConfigSchema,
  responsePage: responsePageConfigSchema,
  customerDetails: customerDetailsConfigSchema,
  thankYouPage: thankYouPageConfigSchema,
  additionalFields: z.array(additionalFieldSchema).default([]),
  customLabels: customLabelsSchema,
});

export type FormValues = z.infer<typeof formSchema>;
export type DesignValues = z.infer<typeof designConfigSchema>;
export type WelcomePageValues = z.infer<typeof welcomePageConfigSchema>;
export type ResponsePageValues = z.infer<typeof responsePageConfigSchema>;
export type CustomerDetailsValues = z.infer<typeof customerDetailsConfigSchema>;
export type ThankYouPageValues = z.infer<typeof thankYouPageConfigSchema>;
export type AdditionalField = z.infer<typeof additionalFieldSchema>;
export type CustomLabelsValues = z.infer<typeof customLabelsSchema>;
