CREATE TYPE "public"."integration_source" AS ENUM('manual', 'twitter', 'product_hunt', 'google', 'facebook', 'reddit', 'appsumo', 'capterra', 'g2', 'linkedin', 'app_store', 'trustpilot', 'shopify', 'play_store', 'yelp', 'slack', 'discord', 'apple_podcasts', 'telegram', 'whatsapp', 'youtube', 'instagram', 'tiktok', 'form', 'api', 'csv_import');--> statement-breakpoint
CREATE TYPE "public"."testimonial_type" AS ENUM('text', 'video');--> statement-breakpoint
CREATE TABLE "collection_forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"project_id" integer NOT NULL,
	"design" json,
	"welcome_page" json,
	"response_page" json,
	"customer_details" json,
	"thank_you_page" json,
	"custom_fields" json,
	"custom_labels" json,
	"redirect_url" varchar(255),
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"email" varchar(255) NOT NULL,
	"avatar_url" varchar(1024),
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"role" varchar(50) DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"default_language" varchar(10) DEFAULT 'en' NOT NULL,
	"created_by" varchar(36) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"type" "testimonial_type" NOT NULL,
	"title" varchar(255),
	"text" text,
	"rating" integer,
	"url" varchar(1024),
	"video_url" varchar(1024),
	"thumbnail_url" varchar(1024),
	"customer_name" varchar(255) NOT NULL,
	"customer_email" varchar(255),
	"customer_avatar" varchar(1024),
	"customer_company" varchar(255),
	"customer_company_logo" varchar(1024),
	"customer_tagline" varchar(255),
	"customer_username" varchar(100),
	"customer_url" varchar(1024),
	"integration_source" "integration_source" DEFAULT 'manual' NOT NULL,
	"source_id" varchar(255),
	"form_id" integer,
	"approved" boolean DEFAULT false NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"language" varchar(10) DEFAULT 'en' NOT NULL,
	"custom_fields" json,
	"original_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collection_forms" ADD CONSTRAINT "collection_forms_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_form_id_collection_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."collection_forms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "project_slug_idx" ON "projects" USING btree ("slug");