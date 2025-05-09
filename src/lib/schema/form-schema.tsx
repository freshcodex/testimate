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
  emailEnabled: z.boolean().default(true),
  emailRequired: z.boolean().default(true),
  jobTitleEnabled: z.boolean().default(true),
  jobTitleRequired: z.boolean().default(false),
  userPhotoEnabled: z.boolean().default(true),
  userPhotoRequired: z.boolean().default(false),
  websiteUrlEnabled: z.boolean().default(true),
  websiteUrlRequired: z.boolean().default(false),
  companyEnabled: z.boolean().default(true),
  companyRequired: z.boolean().default(false),
  teamEnabled: z.boolean().default(false),
  teamRequired: z.boolean().default(false),
  companyLogoEnabled: z.boolean().default(true),
  companyLogoRequired: z.boolean().default(false),
});

// Thank you page schema
export const thankYouPageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  showSocialShare: z.boolean().default(true),
});

// Main form schema
export const additionalFieldSchema = z.object({
  id: z.string().min(1, "ID is required"),
  label: z.string().min(1, "Label is required"),
  type: z.enum(["text", "number", "date", "select"]),
  required: z.boolean().default(true),
  hidden: z.boolean().default(false),
});

// Custom Labels schema
export const customLabelsSchema = z.object({
  recordVideoButton: z.string().default("Record a video"),
  writeReviewButton: z.string().default("Write a testimonial"),
  videoTestimonialPageTitle: z.string().default("Record a video testimonial"),
  openRecorderButton: z.string().default("Open recorder"),
  uploadFileButton: z.string().default("Upload a file"),
  recorderErrorMessage: z
    .string()
    .default(
      "We can't access your camera. To enable access: click the lock icon in your browser bar."
    ),
  textTestimonialPageTitle: z.string().default("Write a text testimonial"),
  textTestimonialPlaceholder: z.string().default("Write something nice ✨"),
  submitButtonLabel: z.string().default("Submit"),
  attributionPageTitle: z.string().default("Almost done 🙌"),
  yourName: z.string().default("Your Name"),
  namePlaceholder: z.string().default("Sherlock Holmes"),
  emailAddress: z.string().default("Email address"),
  emailPlaceholder: z.string().default("sherlock@bakerstreet.com"),
  headline: z.string().default("Job Title"),
  taglinePlaceholder: z.string().default("Head of Investigations"),
  pickAnImageLabel: z.string().default("Pick an image"),
  yourWebsite: z.string().default("Company Website"),
  websitePlaceholder: z.string().default("https://bakerstreet.com"),
  yourAvatar: z.string().default("Your Photo"),
  company: z.string().default("Company"),
  companyPlaceholder: z.string().default("Baker Street Detectives"),
  companyLogo: z.string().default("Company Logo"),
  teamLabel: z.string().default("Team"),
  customFieldPlaceholder: z.string().default("Enter details here"),
  selectPlaceholder: z.string().default("Select an option"),
  shareYourTestimonial: z.string().default("Share your testimonial"),
  marketingConsent: z
    .string()
    .default(
      "By submitting, you give us permission to use this testimonial across social channels."
    ),
});

export const formSchema = z.object({
  name: z.string().min(1, "Form name is required"),
  design: designSchema,
  welcomePage: welcomePageSchema,
  responsePage: responsePageSchema,
  customerDetails: customerDetailsSchema,
  thankYouPage: thankYouPageSchema,
  additionalFields: z.array(additionalFieldSchema).default([]),
  customLabels: customLabelsSchema.default({}),
});

export type FormValues = z.infer<typeof formSchema>;
export type DesignValues = z.infer<typeof designSchema>;
export type WelcomePageValues = z.infer<typeof welcomePageSchema>;
export type ResponsePageValues = z.infer<typeof responsePageSchema>;
export type CustomerDetailsValues = z.infer<typeof customerDetailsSchema>;
export type ThankYouPageValues = z.infer<typeof thankYouPageSchema>;
export type AdditionalField = z.infer<typeof additionalFieldSchema>;
export type CustomLabelsValues = z.infer<typeof customLabelsSchema>;
