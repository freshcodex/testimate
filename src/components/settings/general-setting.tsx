"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SettingSection from "@/components/settings/setting-section";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function GeneralSettings() {
  const { projectSlug } = useParams();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const { data: project, isLoading } = api.project.getBySlug.useQuery(
    {
      slug: projectSlug as string,
    },
    {
      enabled: !!projectSlug,
    }
  );

  // invalidate the query when the project is updated
  const utils = api.useUtils();

  const updateProject = api.project.update.useMutation({
    onSuccess: () => {
      toast.success("Project settings updated successfully");
      utils.project.getBySlug.invalidate({ slug: projectSlug as string });
      // invalidate all projects realted query maybe
      utils.project.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Set initial values when project data is loaded
  useEffect(() => {
    if (project) {
      setName(project.name);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    updateProject.mutate({
      id: project.id,
      name,
      url,
      active: project.active,
      description: project.description,
    });
  };

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
    <form onSubmit={handleSubmit}>
      <SettingSection
        title="Project Name"
        description="The name of your product, service, company or organization."
      >
        <div className="space-y-2">
          <h3 className="text-base font-medium">Project Name</h3>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>
      </SettingSection>

      {/* <SettingSection
        title="Project Slug"
        description="This will be used in the URLs of your forms, walls of love and testimonials."
      >
        <div className="space-y-2">
          <h3 className="text-base font-medium">Project Slug</h3>
          <Input value={project?.slug} placeholder="Enter project slug" />
          <p className="text-sm text-muted-foreground">
            http://localhost:3000/p/{project?.slug}
          </p>
        </div>
      </SettingSection> */}

      <SettingSection
        title="Project URL"
        description="The URL of your website, product, service, company or organization."
      >
        <div className="space-y-2">
          <h3 className="text-base font-medium">Your Business URL</h3>
          <Input
            defaultValue={project?.name}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.fs.blog"
          />
          <p className="text-sm text-muted-foreground">
            This is the URL of your business website.
            <br />
            Used to scrape logos, testimonials online and more.
          </p>
        </div>
      </SettingSection>

      <div className="flex justify-end mt-6">
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700"
          disabled={updateProject.isPending}
        >
          {updateProject.isPending ? "Saving..." : "Save settings"}
        </Button>
      </div>
    </form>
  );
}
