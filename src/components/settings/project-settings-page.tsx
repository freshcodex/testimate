"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralSettings from "@/components/settings/general-setting";
import DangerZoneSettings from "@/components/settings/danger-zone-setting";

export default function ProjectSettings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="container mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full p-4 mx-3"
      >
        <h1 className="text-3xl font-bold mb-6">Project Settings</h1>
        <TabsList className="mb-6 border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="general">General</TabsTrigger>
          {/* <TabsTrigger
            value="domain"
            className={`px-4 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:font-medium data-[state=active]:shadow-none bg-transparent`}
          >
            Domain
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className={`px-4 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:font-medium data-[state=active]:shadow-none bg-transparent`}
          >
            Team
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className={`px-4 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:font-medium data-[state=active]:shadow-none bg-transparent`}
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="poweredBy"
            className={`px-4 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:font-medium data-[state=active]:shadow-none bg-transparent`}
          >
            Powered By
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className={`px-4 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:font-medium data-[state=active]:shadow-none bg-transparent`}
          >
            Billing
          </TabsTrigger> */}
          <TabsTrigger value="dangerZone">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        {/* <TabsContent value="domain">
          <DomainSettings />
        </TabsContent>

        <TabsContent value="team">
          <TeamSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="poweredBy">
          <PoweredBySettings />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettings />
        </TabsContent> */}

        <TabsContent value="dangerZone">
          <DangerZoneSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
