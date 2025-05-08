import * as z from "zod";

// Design section schema
export const designSchema = z.object({
  logo: z.string(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Must be a valid hex color code",
  }),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Must be a valid hex color code",
  }),
  font: z.string(),
  showGradient: z.boolean(),
});

// Welcome page schema
export const welcomePageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  introductoryMessage: z.string().min(1, "Introductory message is required"),
  collectVideo: z.boolean().default(true),
  collectText: z.boolean().default(true),
  welcomeVideoMessage: z.string().optional(),
});

// Response page schema
export const responsePageSchema = z.object({
  useDifferentPrompts: z.boolean().default(false),
  prompt: z.string().min(1, "Prompt is required"),
  collectRatings: z.boolean().default(true),
  collectImageAttachments: z.boolean().default(false),
});

// Customer details page schema
export const customerDetailsSchema = z.object({
  collectName: z.boolean().default(true),
  collectEmail: z.boolean().default(true),
  collectCompany: z.boolean().default(false),
  collectJobTitle: z.boolean().default(false),
});

// Thank you page schema
export const thankYouPageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  showSocialShare: z.boolean().default(true),
});

// Main form schema
export const formSchema = z.object({
  name: z.string().min(1, "Form name is required"),
  design: designSchema,
  welcomePage: welcomePageSchema,
  responsePage: responsePageSchema,
  customerDetails: customerDetailsSchema,
  thankYouPage: thankYouPageSchema,
});

export type FormValues = z.infer<typeof formSchema>;
export type DesignValues = z.infer<typeof designSchema>;
export type WelcomePageValues = z.infer<typeof welcomePageSchema>;
export type ResponsePageValues = z.infer<typeof responsePageSchema>;
export type CustomerDetailsValues = z.infer<typeof customerDetailsSchema>;
export type ThankYouPageValues = z.infer<typeof thankYouPageSchema>;
