"use client";

import { useState, useRef, useEffect } from "react";
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
  GripVertical,
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
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  generateUrlParams,
  useWallOfLoveConfig,
} from "@/hooks/use-wall-of-love-config";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { SaveWidgetModal } from "@/components/studio/wall-of-love/save-widget-modal";
import { useSaveWidget } from "@/hooks/use-save-widget";

interface ConfiguratorProps {
  layout: string;
  onBack: () => void;
  projectSlug: string;
}

export function WallOfLoveConfigurator({
  layout,
  onBack,
  projectSlug,
}: ConfiguratorProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [copied, setCopied] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [settingsWidth, setSettingsWidth] = useState(300); // Default width in pixels
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { config, handleConfigChange } = useWallOfLoveConfig(layout);
  const { isSaving: isSavingWidget } = useSaveWidget();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;

      // Set minimum and maximum widths
      if (newWidth >= 200 && newWidth <= containerRect.width - 200) {
        setSettingsWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

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
      <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col space-y-2">
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
        <div className="flex items-center">
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

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 rounded-lg border mx-4 my-2"
      >
        <ResizablePanel className="min-w-[250px]" defaultSize={20} minSize={15}>
          <div className="h-full bg-white rounded-lg p-4 overflow-y-auto">
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
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={80} minSize={30}>
          <div className="h-full bg-white rounded-lg p-4 ">
            <h3 className="font-medium mb-4">Live preview</h3>
            <div className="w-full overflow-x-auto">
              <LivePreview config={config} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="container px-4 py-4 bg-gray-100 rounded-lg mx-4 my-4">
        <pre className="text-sm break-all whitespace-pre-wrap">
          <code>{embedCode}</code>
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          Height is set to {config.height} by default. You can change the height
          parameter to what you like.
        </p>
      </div>

      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-4 mb-4">
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
