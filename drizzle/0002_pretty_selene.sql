ALTER TABLE "widgets" DROP CONSTRAINT "widgets_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "widgets" ADD COLUMN "project_slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_project_slug_projects_slug_fk" FOREIGN KEY ("project_slug") REFERENCES "public"."projects"("slug") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "widgets" DROP COLUMN "project_id";--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_slug_unique" UNIQUE("slug");