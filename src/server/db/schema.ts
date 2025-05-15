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
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type {
  AdditionalFields,
  CustomerDetailsConfig,
  CustomLabels,
  DesignConfig,
  ResponsePageConfig,
  ThankYouPageConfig,
  WelcomePageConfig,
} from "./zod-schemas";
import type { SingleWidgetConfig } from "@/components/studio/single-widget/types";
import type { WallOfLoveConfig } from "@/components/studio/wall-of-love/types";

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

// Tag category enum
export const tagCategoryEnum = pgEnum("tag_category", [
  "Product",
  "Company Size",
  "Business Type",
  "Industry",
  "Job Title",
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
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    // businessType: varchar("business_type", { length: 255 }),
    description: text("description"),
    url: varchar("url"), // this is a business url for which the testimonial is collected
    logoUrl: varchar("logo_url"),
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
  // TODO: rename it to customerDetailsPage to be consistent
  customerDetails: json("customer_details").$type<CustomerDetailsConfig>(),
  thankYouPage: json("thank_you_page").$type<ThankYouPageConfig>(),
  customFields: json("custom_fields").$type<AdditionalFields>(),
  customLabels: json("custom_labels").$type<CustomLabels>(),
  redirectUrl: varchar("redirect_url", { length: 255 }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
  // TODO: better type for this use additionalFieldsSchema
  customFields: json("custom_fields").$type<AdditionalFields>(),
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
  tags: many(tags),
  widgets: many(widgets),
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

export const testimonialsRelations = relations(
  testimonials,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [testimonials.projectId],
      references: [projects.id],
    }),
    form: one(collectionForms, {
      fields: [testimonials.formId],
      references: [collectionForms.id],
      relationName: "testimonial_form",
    }),
    testimonialTags: many(testimonialTags),
  })
);

// Tags table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: tagCategoryEnum("category").notNull(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// export type
export type Tag = typeof tags.$inferSelect;

// Testimonial-Tag junction table
export const testimonialTags = pgTable(
  "testimonial_tags",
  {
    testimonialId: integer("testimonial_id")
      .notNull()
      .references(() => testimonials.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: uniqueIndex("testimonial_tags_pk").on(
        table.testimonialId,
        table.tagId
      ),
    };
  }
);

// Add relations for tags
export const tagsRelations = relations(tags, ({ one, many }) => ({
  project: one(projects, {
    fields: [tags.projectId],
    references: [projects.id],
  }),
  testimonialTags: many(testimonialTags),
}));

export const testimonialTagsRelations = relations(
  testimonialTags,
  ({ one }) => ({
    testimonial: one(testimonials, {
      fields: [testimonialTags.testimonialId],
      references: [testimonials.id],
    }),
    tag: one(tags, {
      fields: [testimonialTags.tagId],
      references: [tags.id],
    }),
  })
);

export const widgetTypeEnum = pgEnum("widget_type", [
  "single_widget",
  "wall_of_love",
]);

// Widget table
export const widgets = pgTable("widgets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: widgetTypeEnum("type").notNull(),
  config: json("config").$type<SingleWidgetConfig | WallOfLoveConfig>(),
  url: text("url"), // raw url with config params
  projectSlug: varchar("project_slug", { length: 255 })
    .notNull()
    .references(() => projects.slug, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Add widget relations
export const widgetsRelations = relations(widgets, ({ one }) => ({
  project: one(projects, {
    fields: [widgets.projectSlug],
    references: [projects.slug],
  }),
}));
