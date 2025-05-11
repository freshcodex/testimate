"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BasicSettings } from "@/components/studio/wall-of-love/settings/basic-settings";
import { BorderSettings } from "@/components/studio/wall-of-love/settings/border-settings";
import { ShadowSettings } from "@/components/studio/wall-of-love/settings/shadow-settings";
import { BackgroundSettings } from "@/components/studio/wall-of-love/settings/background-settings";
import { TextSettings } from "@/components/studio/wall-of-love/settings/text-settings";
import { VideoSettings } from "@/components/studio/wall-of-love/settings/video-settings";
import { TagsSettings } from "@/components/studio/wall-of-love/settings/tags-settings";
import { AIStyleSettings } from "@/components/studio/wall-of-love/settings/ai-style-settings";
import { LivePreview } from "@/components/studio/wall-of-love/live-preview";

interface ConfiguratorProps {
  layout: string;
  onBack: () => void;
}

export function WallOfLoveConfigurator({ layout, onBack }: ConfiguratorProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    layout,
    height: "800px",
    theme: "light",
    showBranding: true,
    scrollDirection: "vertical",
    showHeartAnimation: true,
    pauseOnHover: true,
    scrollSpeed: "normal",
    shadowBackground: true,
    primaryColor: "#6701E6",
    backgroundColor: "#FFFFFF",
    cardBackgroundColor: "#FFFFFF",
    textColor: "#000000",
    linkColor: "#6701E6",
    heartColor: "#DC2626",
    starColor: "#FBBF24",
    fontFamily: "Lato",
    fontSize: "base",
    highlightStyle: "gradient",
    showVideoDuration: true,
    playButtonColor: "#6701E6",
    buttonColor: "#6701E6",
    selectedButtonColor: "#4444FF",
    buttonAlignment: "left",
    buttonFontColor: "#FFFFFF",
    selectedFontColor: "#FFFFFF",
  });

  const handleConfigChange = (newConfig: Partial<typeof config>) => {
    setConfig({ ...config, ...newConfig });
  };

  const embedCode = `<iframe height="${config.height}" id="testimonialto-${layout}" src="https://embed-v2.testimonial.to/w/${layout}?theme=${config.theme}" frameborder="0" scrolling="no" width="100%"></iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveWidget = () => {
    // In a real app, this would save to a database
    alert("Widget saved successfully!");
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        <div className="ml-4">
          <h2 className="text-2xl font-bold">Embed a Wall of Love</h2>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
              <span className="text-xs font-medium text-purple-600">2</span>
            </div>
            <span className="text-sm font-medium">
              Customize your Wall of Love
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <div className="h-4 w-4 rounded-full bg-green-500 mr-2 flex items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium">
            {layout.replace("-", " ")}
          </span>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <pre className="text-sm overflow-x-auto">
          <code>{embedCode}</code>
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          Height is set to {config.height} by default. You can change the height
          parameter to what you like.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <Tabs defaultValue="basic" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger
                value="basic"
                className="flex flex-col items-center py-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 4.5H4.5V10.5H10.5V4.5Z" fill="currentColor" />
                  <path d="M19.5 4.5H13.5V10.5H19.5V4.5Z" fill="currentColor" />
                  <path
                    d="M10.5 13.5H4.5V19.5H10.5V13.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.5 13.5H13.5V19.5H19.5V13.5Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-xs mt-1">Basic</span>
              </TabsTrigger>
              <TabsTrigger
                value="border"
                className="flex flex-col items-center py-2"
              >
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
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <span className="text-xs mt-1">Border</span>
              </TabsTrigger>
              <TabsTrigger
                value="shadow"
                className="flex flex-col items-center py-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V6Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 20C4.89543 20 4 19.1046 4 18V8C4 6.89543 4.89543 6 6 6H18C19.1046 6 20 6.89543 20 8V18C20 19.1046 19.1046 20 18 20H6Z"
                    fill="currentColor"
                    opacity="0.2"
                  />
                </svg>
                <span className="text-xs mt-1">Shadow</span>
              </TabsTrigger>
              <TabsTrigger
                value="background"
                className="flex flex-col items-center py-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20H7C4.79086 20 3 18.2091 3 16V8Z"
                    fill="currentColor"
                  />
                  <path d="M12 8L16 14H8L12 8Z" fill="white" />
                </svg>
                <span className="text-xs mt-1">Background</span>
              </TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger
                value="text"
                className="flex flex-col items-center py-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 7V4H20V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 20V4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 20H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs mt-1">Text</span>
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="flex flex-col items-center py-2"
              >
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
                <span className="text-xs mt-1">Video</span>
              </TabsTrigger>
              <TabsTrigger
                value="tags"
                className="flex flex-col items-center py-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z"
                    fill="currentColor"
                  />
                  <circle cx="7" cy="7" r="2" fill="white" />
                </svg>
                <span className="text-xs mt-1">Tags</span>
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="flex flex-col items-center py-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-xs mt-1">AI style</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="basic">
                <BasicSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
              <TabsContent value="border">
                <BorderSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
              <TabsContent value="shadow">
                <ShadowSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
              <TabsContent value="background">
                <BackgroundSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
              <TabsContent value="text">
                <TextSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
              <TabsContent value="video">
                <VideoSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
              <TabsContent value="tags">
                <TagsSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
              <TabsContent value="ai">
                <AIStyleSettings
                  config={config}
                  onConfigChange={handleConfigChange}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <h3 className="font-medium mb-4">Live preview</h3>
          <LivePreview config={config} />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveWidget}>
            Save widget
          </Button>
          <Button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleCopyCode}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy code"}
          </Button>
        </div>
      </div>
    </div>
  );
}
