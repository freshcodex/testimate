import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  json,
  pgEnum,
  uniqueIndex,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const testimonialTypeEnum = pgEnum("testimonial_type", [
  "text",
  "video",
]);
export const integrationSourceEnum = pgEnum("integration_source", [
  "manual",
  "twitter",
  "product_hunt",
  "google",
  "facebook",
  "reddit",
  "appsumo",
  "capterra",
  "g2",
  "linkedin",
  "app_store",
  "trustpilot",
  "shopify",
  "play_store",
  "yelp",
  "slack",
  "discord",
  "apple_podcasts",
  "telegram",
  "whatsapp",
  "youtube",
  "instagram",
  "tiktok",
  "form",
  "api",
  "csv_import",
]);

// Profile table (references Supabase user)
export const profiles = pgTable("profiles", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID from Supabase auth.users
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  avatarUrl: varchar("avatar_url", { length: 1024 }),
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  role: varchar("role", { length: 50 }).default("member").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Projects
export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    defaultLanguage: varchar("default_language", { length: 10 })
      .default("en")
      .notNull(),
    createdBy: varchar("created_by", { length: 36 })
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }), // Reference to profiles
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      slugIdx: uniqueIndex("project_slug_idx").on(table.slug),
    };
  }
);

// Types for form configuration
export type DesignConfig = z.infer<typeof designConfigSchema>;
export type WelcomePageConfig = z.infer<typeof welcomePageConfigSchema>;
export type ResponsePageConfig = z.infer<typeof responsePageConfigSchema>;
export type CustomerDetailsConfig = z.infer<typeof customerDetailsConfigSchema>;
export type ThankYouPageConfig = z.infer<typeof thankYouPageConfigSchema>;
export type CustomLabels = z.infer<typeof customLabelsSchema>;
export type AdditionalFields = z.infer<typeof additionalFieldsSchema>;

// Zod schemas for configuration
export const designConfigSchema = z.object({
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

export const welcomePageConfigSchema = z.object({
  title: z.string().min(1, "Title is required"),
  introductoryMessage: z.string().min(1, "Introductory message is required"),
  collectVideo: z.boolean().default(true),
  collectText: z.boolean().default(true),
  welcomeVideoMessage: z.string().optional(),
});

export const responsePageConfigSchema = z.object({
  useDifferentPrompts: z.boolean().default(false),
  prompt: z.string().min(1, "Prompt is required"),
  collectRatings: z.boolean().default(true),
  collectImageAttachments: z.boolean().default(false),
});

export const customerDetailsConfigSchema = z.object({
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

export const thankYouPageConfigSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  showSocialShare: z.boolean().default(true),
});

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

export const additionalFieldSchema = z.object({
  id: z.string().min(1, "ID is required"),
  label: z.string().min(1, "Label is required"),
  type: z.enum(["text", "number", "date", "select"]),
  required: z.boolean().default(true),
  hidden: z.boolean().default(false),
});

export const additionalFieldsSchema = z
  .array(additionalFieldSchema)
  .default([]);

// Collection Forms
export const collectionForms = pgTable("collection_forms", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  // Configuration as JSON fields
  design: json("design").$type<DesignConfig>(),
  welcomePage: json("welcome_page").$type<WelcomePageConfig>(),
  responsePage: json("response_page").$type<ResponsePageConfig>(),
  customerDetails: json("customer_details").$type<CustomerDetailsConfig>(),
  thankYouPage: json("thank_you_page").$type<ThankYouPageConfig>(),
  customFields: json("custom_fields").$type<AdditionalFields>(),
  customLabels: json("custom_labels").$type<CustomLabels>(),
  redirectUrl: varchar("redirect_url", { length: 255 }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Derive schemas from the table
export const insertCollectionFormSchema = createInsertSchema(collectionForms, {
  design: designConfigSchema,
  welcomePage: welcomePageConfigSchema,
  responsePage: responsePageConfigSchema,
  customerDetails: customerDetailsConfigSchema,
  thankYouPage: thankYouPageConfigSchema,
  customFields: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      required: z.boolean(),
    })
  ),
  customLabels: customLabelsSchema,
});

export const selectCollectionFormSchema = createSelectSchema(collectionForms);

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  type: testimonialTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }),
  text: text("text"),
  rating: integer("rating"),
  url: varchar("url", { length: 1024 }),
  videoUrl: varchar("video_url", { length: 1024 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 1024 }),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerAvatar: varchar("customer_avatar", { length: 1024 }),
  customerCompany: varchar("customer_company", { length: 255 }),
  customerCompanyLogo: varchar("customer_company_logo", { length: 1024 }),
  customerTagline: varchar("customer_tagline", { length: 255 }),
  customerUsername: varchar("customer_username", { length: 100 }),
  customerUrl: varchar("customer_url", { length: 1024 }),
  integrationSource: integrationSourceEnum("integration_source")
    .default("manual")
    .notNull(),
  sourceId: varchar("source_id", { length: 255 }),
  formId: integer("form_id").references(() => collectionForms.id),
  approved: boolean("approved").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  customFields: json("custom_fields").$type<Record<string, any>>(),
  originalDate: timestamp("original_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const profilesRelations = relations(profiles, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  creator: one(profiles, {
    fields: [projects.createdBy],
    references: [profiles.id],
  }),
  testimonials: many(testimonials),
  forms: many(collectionForms),
}));

export const collectionFormsRelations = relations(
  collectionForms,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [collectionForms.projectId],
      references: [projects.id],
    }),
    testimonials: many(testimonials),
  })
);

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  project: one(projects, {
    fields: [testimonials.projectId],
    references: [projects.id],
  }),
  form: one(collectionForms, {
    fields: [testimonials.formId],
    references: [collectionForms.id],
    relationName: "testimonial_form",
  }),
}));
