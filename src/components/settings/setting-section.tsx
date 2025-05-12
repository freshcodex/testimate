import type React from "react";
import { Separator } from "@/components/ui/separator";

interface SettingSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingSection({
  title,
  description,
  children,
}: SettingSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 py-6">
      <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
      <Separator className="col-span-2" />
    </div>
  );
}
