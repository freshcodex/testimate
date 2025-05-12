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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useQueryState } from "nuqs";
import { Badge } from "@/components/ui/badge";

import { BasicSettings } from "@/components/studio/single-widget/settings/basic-settings";
import { BorderSettings } from "@/components/studio/single-widget/settings/border-settings";
import { ShadowSettings } from "@/components/studio/single-widget/settings/shadow-settings";
import { BackgroundSettings } from "@/components/studio/single-widget/settings/background-settings";
import { TextSettings } from "@/components/studio/single-widget/settings/text-settings";
import { VideoSettings } from "@/components/studio/single-widget/settings/video-settings";
import { TagsSettings } from "@/components/studio/single-widget/settings/tags-settings";
import { AIStyleSettings } from "@/components/studio/single-widget/settings/ai-style-settings";
import { LivePreview } from "@/components/studio/single-widget/live-preview";
import { useSingleWidgetConfig } from "@/hooks/use-single-widget-config";

interface ConfiguratorProps {
  design: string;
  onBack: () => void;
}

export function SingleWidgetConfigurator({
  design,
  onBack,
}: ConfiguratorProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [copied, setCopied] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [settingsWidth, setSettingsWidth] = useState(300); // Default width in pixels
  const resizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { config, handleConfigChange } = useSingleWidgetConfig(design);

  // Get the current URL parameters from nuqs
  const [urlParams] = useQueryState("config");

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

  // TODO: use only stuff from the config, must be better way to do this
  const embedCode = `<iframe height="${config.height}" id="testimonialto-${config.design}" src="http://localhost:3000/w/${config.design}?config=${urlParams}" frameborder="0" scrolling="no" width="100%"></iframe>`;

  const handleCopyCode = () => {
    const url = `http://localhost:3000/w/${config.design}?config=${urlParams}`;
    console.log(url);
    navigator.clipboard.writeText(url);
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
      <div className="container mx-auto px-4 py-8 flex flex-col space-y-2 mb-6">
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
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <div className="h-4 w-4 rounded-full bg-green-500 mr-2 flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium">
              {config.design.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-200px)] rounded-lg border m-4"
      >
        <ResizablePanel className="" defaultSize={20} minSize={15}>
          <div className="h-full bg-white rounded-lg p-4 overflow-auto">
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
          <div className="h-full bg-white rounded-lg p-4 overflow-auto">
            <h3 className="font-medium mb-4">Live preview</h3>
            <LivePreview config={config} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="container mx-auto px-4 py-8 bg-gray-100 p-4 rounded-lg my-6">
        <pre className="text-sm text-wrap overflow-ellipsis">
          <code>{embedCode}</code>
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          Height is set to {config.height} by default. You can change the height
          parameter to what you like.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 flex justify-between mt-8">
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
