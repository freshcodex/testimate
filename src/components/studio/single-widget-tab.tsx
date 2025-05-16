"use client";

import { useState } from "react";
import { SingleWidgetDesignSelector } from "@/components/studio/single-widget/design-selector";
import { SingleWidgetConfigurator } from "./single-widget/configurator";
import { useSingleWidgetConfig } from "@/hooks/use-single-widget-config";
import type { Design } from "./single-widget/types";
export function SingleWidgetTab() {
  const [step, setStep] = useState<"select-design" | "configure">(
    "select-design"
  );
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const handleDesignSelect = (design: string) => {
    setSelectedDesign(design);
    handleConfigChange({ design: design as Design });
    setStep("configure");
  };

  const { handleConfigChange } = useSingleWidgetConfig(
    selectedDesign as Design
  );

  return (
    <div>
      {step === "select-design" && (
        <SingleWidgetDesignSelector onDesignSelect={handleDesignSelect} />
      )}
      {step === "configure" && selectedDesign && (
        <SingleWidgetConfigurator
          design={selectedDesign}
          onBack={() => setStep("select-design")}
        />
      )}
    </div>
  );
}
