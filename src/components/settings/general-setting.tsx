"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SettingSection from "@/components/settings/setting-section";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function GeneralSettings() {
  // get the current project by slug
  const { projectSlug } = useParams();

  const { data: project, isLoading } = api.project.getBySlug.useQuery(
    {
      slug: projectSlug as string,
    },
    {
      enabled: !!projectSlug,
    }
  );

  if (isLoading) {
    return (
      <div aria-busy="true">
        <SettingSection
          title="Project Name"
          description="The name of your product, service, company or organization."
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </SettingSection>

        <SettingSection
          title="Project Slug"
          description="This will be used in the URLs of your forms, walls of love and testimonials."
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
        </SettingSection>

        <SettingSection
          title="Project URL"
          description="The URL of your website, product, service, company or organization."
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </SettingSection>

        <div className="flex justify-end mt-6">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <SettingSection
        title="Project Name"
        description="The name of your product, service, company or organization."
      >
        <div className="space-y-2">
          <h3 className="text-base font-medium">Project Name</h3>
          <Input defaultValue={project?.name} />
        </div>
      </SettingSection>

      <SettingSection
        title="Project Slug"
        description="This will be used in the URLs of your forms, walls of love and testimonials."
      >
        <div className="space-y-2">
          <h3 className="text-base font-medium">Project Slug</h3>
          <Input defaultValue={project?.slug} />
          <p className="text-sm text-muted-foreground">
            https://testimate.io/p/{project?.slug}
          </p>
        </div>
      </SettingSection>

      <SettingSection
        title="Project URL"
        description="The URL of your website, product, service, company or organization."
      >
        <div className="space-y-2">
          <h3 className="text-base font-medium">Project URL</h3>
          <Input defaultValue={project?.name} />
        </div>
      </SettingSection>

      <div className="flex justify-end mt-6">
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save settings
        </Button>
      </div>
    </div>
  );
}
