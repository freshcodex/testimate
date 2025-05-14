import { FileText, Share2, Tag, Settings } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useParams, usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import { UserPopoverMenu } from "../user-popover-menu";
import type { User } from "@/types";

export function AppSidebar() {
  const { projectSlug } = useParams();
  const pathname = usePathname();

  const { data: projectAndUserProfile } =
    api.project.getProjectAndCurrentUserProfile.useQuery({
      slug: projectSlug as string,
    });

  const isActive = (path: string) => {
    return pathname === `/dashboard/${projectSlug}/${path}`;
  };

  return (
    <Sidebar className="border-r border-gray-200 min-w-64">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2">
          <div className="flex justify-between w-full">
            <div className="flex space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
                <span className="text-lg font-bold">
                  {projectAndUserProfile?.userProfile.firstName?.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {projectAndUserProfile?.userProfile.firstName}
                </span>
                <span className="text-xs text-gray-500">
                  {projectAndUserProfile?.project.name}
                </span>
              </div>
            </div>
            <UserPopoverMenu
              user={projectAndUserProfile?.userProfile as User}
              plan={"Free plan"}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-purple-600">
                <Zap className="h-4 w-4" />
                <span>Upgrade</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup> */}

        <SidebarGroup>
          <SidebarGroupLabel>COLLECT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("forms")}>
                  <Link href={`/dashboard/${projectSlug}/forms`}>
                    <FileText className="h-4 w-4" />
                    <span>Forms</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Import className="h-4 w-4" />
                    <span>Import</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-green-100 text-green-800">
                  New
                </SidebarMenuBadge>
              </SidebarMenuItem> */}

              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Layers className="h-4 w-4" />
                    <span>Auto-collect</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>MANAGE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("proof")}>
                  <Link href={`/dashboard/${projectSlug}/proof`}>
                    <FileText className="h-4 w-4" />
                    <span>Proof</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("tags")}>
                  <Link href={`/dashboard/${projectSlug}/tags`}>
                    <Tag className="h-4 w-4" />
                    <span>Tags</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>SHARE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("studio")}>
                  <Link href={`/dashboard/${projectSlug}/studio`}>
                    <Share2 className="h-4 w-4" />
                    <span>Studio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <FileText className="h-4 w-4" />
                    <span>Brand</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Lightning className="h-4 w-4" />
                    <span>Rich snippet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel>ANALYZE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <BarChart2 className="h-4 w-4" />
                    <span>Analyze</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-accent">
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {projectAndUserProfile?.project.name?.charAt(0)}
                </span>
              </div>
              <span className="text-sm">
                {projectAndUserProfile?.project.name}
              </span>
            </div>
            <Link
              href={`/dashboard/${projectSlug}/settings`}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
