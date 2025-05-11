"use client";

import { useState } from "react";
import { WallOfLoveLayoutSelector } from "@/components/studio/wall-of-love/layout-selector";
import { WallOfLoveConfigurator } from "@/components/studio/wall-of-love/configurator";

export function WallOfLoveTab() {
  const [step, setStep] = useState<"select-layout" | "configure">(
    "select-layout"
  );
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  const handleLayoutSelect = (layout: string) => {
    setSelectedLayout(layout);
    setStep("configure");
  };

  return (
    <div>
      {step === "select-layout" && (
        <WallOfLoveLayoutSelector onLayoutSelect={handleLayoutSelect} />
      )}

      {step === "configure" && selectedLayout && (
        <WallOfLoveConfigurator
          layout={selectedLayout}
          onBack={() => setStep("select-layout")}
        />
      )}
    </div>
  );
}
