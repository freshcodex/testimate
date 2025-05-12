"use client";

import { useState } from "react";
import { SingleWidgetDesignSelector } from "@/components/studio/single-widget/design-selector";
import { SingleWidgetConfigurator } from "./single-widget/configurator";

export function SingleWidgetTab() {
  const [step, setStep] = useState<"select-design" | "configure">(
    "select-design"
  );
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const handleDesignSelect = (design: string) => {
    setSelectedDesign(design);
    setStep("configure");
  };

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
