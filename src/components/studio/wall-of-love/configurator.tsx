"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  LayoutGrid,
  Square,
  Layers,
  Palette,
  Type,
  Video,
  Tag,
  Sparkles,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import type { Layout, WallOfLoveConfig } from "./types";

interface ConfiguratorProps {
  layout: string;
  onBack: () => void;
}

export function WallOfLoveConfigurator({ layout, onBack }: ConfiguratorProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [copied, setCopied] = useState(false);
  // TODO: use nuqs for this instead of useState; imp for prod
  const [config, setConfig] = useState<WallOfLoveConfig>({
    // Basic Settings
    layout: layout as Layout,
    height: "800px",
    theme: "light",
    showBranding: true,
    scrollDirection: "vertical",
    showHeartAnimation: true,
    pauseOnHover: true,
    scrollSpeed: "normal",
    shadowBackground: true,
    showDate: true,
    showSource: true,
    showCaptions: false,
    showStarRating: false,

    // Colors
    primaryColor: "#6701E6",
    backgroundColor: "#FFFFFF",
    cardBackgroundColor: "#FFFFFF",
    textColor: "#000000",
    linkColor: "#6701E6",
    heartColor: "#DC2626",
    starColor: "#FBBF24",

    // Text Settings
    fontFamily: "Lato",
    fontSize: "base",
    highlightStyle: "gradient",

    // Video Settings
    showVideoDuration: true,
    playButtonColor: "#6701E6",

    // Button Settings
    buttonColor: "#6701E6",
    selectedButtonColor: "#4444FF",
    buttonAlignment: "left",
    buttonFontColor: "#FFFFFF",
    selectedFontColor: "#FFFFFF",

    // Border Settings
    borderWidth: "0px",
    borderColor: "#E5E7EB",
    borderRadius: "8px",

    // Shadow Settings
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowBlur: "4px",
    shadowOffset: "0px 2px",

    // Tags Settings
    showTags: true,
    tagBackgroundColor: "#F3F4F6",
    tagTextColor: "#374151",
    tagBorderRadius: "4px",
  });

  const handleConfigChange = (newConfig: Partial<WallOfLoveConfig>) => {
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

  const settingsTabs = [
    { id: "basic", label: "Basic", icon: LayoutGrid },
    { id: "border", label: "Border", icon: Square },
    { id: "shadow", label: "Shadow", icon: Layers },
    { id: "background", label: "Background", icon: Palette },
    { id: "text", label: "Text", icon: Type },
    { id: "video", label: "Video", icon: Video },
    { id: "tags", label: "Tags", icon: Tag },
    { id: "ai", label: "AI style", icon: Sparkles },
  ];

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-6">
        <button
          onClick={onBack}
          className="cursor-pointer flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Embed a Wall of Love</h2>
          <div className="flex space-x-2 items-baseline">
            <Badge>final step: 2</Badge>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <Tabs defaultValue="basic" onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap gap-2 mb-4">
              {settingsTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center py-2 min-h-5"
                >
                  <tab.icon className="h-2 w-2" />
                  <span className="text-xs mt-1">{tab.label}</span>
                </TabsTrigger>
              ))}
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

      <div className="bg-gray-100 p-4 rounded-lg my-6">
        <pre className="text-sm text-wrap">
          <code>{embedCode}</code>
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          Height is set to {config.height} by default. You can change the height
          parameter to what you like.
        </p>
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
