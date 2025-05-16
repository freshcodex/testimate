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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { BasicSettings } from "@/components/studio/single-widget/settings/basic-settings";
import { BorderSettings } from "@/components/studio/single-widget/settings/border-settings";
import { ShadowSettings } from "@/components/studio/single-widget/settings/shadow-settings";
import { BackgroundSettings } from "@/components/studio/single-widget/settings/background-settings";
import { TextSettings } from "@/components/studio/single-widget/settings/text-settings";
import { LivePreview } from "@/components/studio/single-widget/live-preview";
import {
  generateUrlParams,
  useSingleWidgetConfig,
} from "@/hooks/use-single-widget-config";
import { useSaveWidget } from "@/hooks/use-save-widget";
import { SaveWidgetModal } from "../wall-of-love/save-widget-modal";
import { useParams } from "next/navigation";
import type { Design } from "./types";
import { env } from "@/env";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const { saveWidget, isSaving } = useSaveWidget();

  const { projectSlug } = useParams();

  const { config, handleConfigChange } = useSingleWidgetConfig(
    design as Design
  );

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
  const embedCode = `<iframe height="${config.height}" id="testimonialto-${
    config.design
  }" src="${env.NEXT_PUBLIC_URL}/t/${config.design}?config=${generateUrlParams(
    config
  )}" frameborder="0" scrolling="no" width="100%"></iframe>`;

  const handleCopyCode = () => {
    const url = `${env.NEXT_PUBLIC_URL}/t/${
      config.design
    }?config=${generateUrlParams(config)}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <h2 className="text-2xl font-bold">Embed a Single Widget</h2>
          <div className="flex space-x-2 items-baseline">
            <Badge>final step: 2</Badge>
            <span className="text-sm font-medium">Customize your widget</span>
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

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-1/4 bg-white rounded-lg p-4 overflow-auto">
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
          </div>
        </div>

        <div className="w-full lg:w-3/4 bg-white rounded-lg p-4 overflow-auto">
          <h3 className="font-medium mb-4">Live preview</h3>
          <LivePreview config={config} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 p-4 rounded-lg">
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
              disabled={isSaveModalOpen || isSaving}
              onClick={() => setIsSaveModalOpen(true)}
            >
              {isSaving ? "Saving..." : "Save widget"}
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
        projectSlug={projectSlug as string}
        type="single_widget"
        getUrl={() =>
          `${env.NEXT_PUBLIC_URL}/t/${config.design}?config=${generateUrlParams(
            config
          )}`
        }
      />
    </div>
  );
}
