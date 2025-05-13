"use client";

import { useState } from "react";
import { WallOfLoveLayoutSelector } from "@/components/studio/wall-of-love/layout-selector";
import { WallOfLoveConfigurator } from "@/components/studio/wall-of-love/configurator";
import { useParams } from "next/navigation";

// TODO: Show an actual example of testimonials there; moving maybe gif components there
export function WallOfLoveTab() {
  // TODO: use nuqs for this instead of useState
  const [step, setStep] = useState<"select-layout" | "configure">(
    "select-layout"
  );
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const { projectSlug } = useParams();

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
          projectSlug={projectSlug as string}
          layout={selectedLayout}
          onBack={() => setStep("select-layout")}
        />
      )}
    </div>
  );
}
