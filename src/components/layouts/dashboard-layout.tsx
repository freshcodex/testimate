"use client";

import type React from "react";
import { AppSidebar } from "@/components/layouts/sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <AppSidebar />
        <SidebarInset className="bg-white">
          <header className="sticky top-0 flex h-16 items-center gap-2  bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1"></div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
