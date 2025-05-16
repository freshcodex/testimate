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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  generateUrlParams,
  useWallOfLoveConfig,
} from "@/hooks/use-wall-of-love-config";
import { SaveWidgetModal } from "@/components/studio/wall-of-love/save-widget-modal";
import { useSaveWidget } from "@/hooks/use-save-widget";
import { Layout } from "./types";

interface ConfiguratorProps {
  layout: string;
  onBack: () => void;
  projectSlug: string;
}

// TODO: hide the sidebar when this is opened in any device mode
export function WallOfLoveConfigurator({
  layout,
  onBack,
  projectSlug,
}: ConfiguratorProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [copied, setCopied] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const { config, handleConfigChange } = useWallOfLoveConfig(layout as Layout);
  const { isSaving: isSavingWidget } = useSaveWidget();

  const embedCode = `<iframe height="${
    config.height
  }" id="testimonialto-${projectSlug}" src="http://localhost:3000/w/${projectSlug}?config=${generateUrlParams(
    config
  )}" frameborder="0" scrolling="no" width="100%"></iframe>`;

  const handleCopyCode = () => {
    const url = `http://localhost:3000/w/${projectSlug}?config=${generateUrlParams(
      config
    )}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveWidget = () => {
    setIsSaveModalOpen(true);
  };

  const settingsTabs = [
    { id: "basic", label: "Basic", icon: LayoutGrid },
    { id: "border", label: "Border", icon: Square },
    { id: "shadow", label: "Shadow", icon: Layers },
    { id: "background", label: "Background", icon: Palette },
    { id: "text", label: "Text", icon: Type },
    // { id: "video", label: "Video", icon: Video },
    // { id: "tags", label: "Tags", icon: Tag },
    // { id: "ai", label: "AI style", icon: Sparkles },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 flex flex-col space-y-2">
        <button
          onClick={onBack}
          className="cursor-pointer flex items-center text-gray-600 hover:text-gray-900 w-fit"
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
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-2 sm:p-4 min-w-0">
        <div className="w-full lg:w-1/4 bg-white rounded-lg p-4 overflow-y-auto min-w-0">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select setting" />
            </SelectTrigger>
            <SelectContent>
              {settingsTabs.map((tab) => (
                <SelectItem key={tab.id} value={tab.id}>
                  <div className="flex items-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-6">
            {activeTab === "basic" && (
              <BasicSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
            {activeTab === "border" && (
              <BorderSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
            {activeTab === "shadow" && (
              <ShadowSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
            {activeTab === "background" && (
              <BackgroundSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
            {activeTab === "text" && (
              <TextSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
            {activeTab === "video" && (
              <VideoSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
            {activeTab === "tags" && (
              <TagsSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
            {activeTab === "ai" && (
              <AIStyleSettings
                config={config}
                onConfigChange={handleConfigChange}
              />
            )}
          </div>
        </div>

        <div className="w-full lg:w-3/4 bg-white rounded-lg p-4 overflow-y-auto min-w-0">
          <h3 className="font-medium mb-4">Live preview</h3>
          <LivePreview config={config} />
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-8">
        <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm break-all whitespace-pre-wrap">
            <code>{embedCode}</code>
          </pre>
          <p className="text-xs text-gray-500 mt-2">
            Height is set to {config.height} by default. You can change the
            height parameter to what you like.
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={isSaveModalOpen || isSavingWidget}
              onClick={handleSaveWidget}
            >
              {isSavingWidget ? "Saving..." : "Save widget"}
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
      <SaveWidgetModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        config={config}
        projectSlug={projectSlug}
        type="wall_of_love"
        url={`http://localhost:3000/w/${layout}?config=${generateUrlParams(
          config
        )}`}
      />
    </div>
  );
}
