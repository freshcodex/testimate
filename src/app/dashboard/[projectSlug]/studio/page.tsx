"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WallOfLoveTab } from "@/components/studio/wall-of-love-tab";
import { SingleWidgetTab } from "@/components/studio/single-widget-tab";
import { VideoWidgetTab } from "@/components/studio/video-widget-tab";
import { SavedWidgetsTab } from "@/components/studio/saved-widget-tab";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("wall-of-love");

  return (
    // <DashboardLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Social Proof Studio ✨</h1>
        <p className="text-gray-600 mb-6">What would you like to create?</p>

        <div className="flex justify-between items-center mb-8">
          <Tabs
            defaultValue="wall-of-love"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="wall-of-love"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="9"
                      height="9"
                      rx="2"
                      fill="currentColor"
                    />
                    <rect
                      x="13"
                      y="2"
                      width="9"
                      height="9"
                      rx="2"
                      fill="currentColor"
                    />
                    <rect
                      x="2"
                      y="13"
                      width="9"
                      height="9"
                      rx="2"
                      fill="currentColor"
                    />
                    <rect
                      x="13"
                      y="13"
                      width="9"
                      height="9"
                      rx="2"
                      fill="currentColor"
                    />
                  </svg>
                  Walls of Love
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="single-widget"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="3"
                      fill="currentColor"
                    />
                  </svg>
                  Single Widget
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="video-widget"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="2"
                      fill="currentColor"
                    />
                    <path d="M15 12L10 15V9L15 12Z" fill="white" />
                  </svg>
                  Video Widget
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                      fill="currentColor"
                    />
                  </svg>
                  Saved
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {activeTab === "wall-of-love" && <WallOfLoveTab />}
      {activeTab === "single-widget" && <SingleWidgetTab />}
      {activeTab === "video-widget" && <VideoWidgetTab />}
      {activeTab === "saved" && <SavedWidgetsTab />}
    </div>
    // </DashboardLayout>
  );
}
