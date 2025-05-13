import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSaveWidget } from "@/hooks/use-save-widget";
import type { WallOfLoveConfig } from "./types";
import type { SingleWidgetConfig } from "../single-widget/types";
import type { WidgetCreateInput } from "@/types";

interface SaveWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WallOfLoveConfig | SingleWidgetConfig;
  projectSlug: string;
  type: WidgetCreateInput["type"];
}

export function SaveWidgetModal({
  isOpen,
  onClose,
  config,
  projectSlug,
  type,
}: SaveWidgetModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { saveWidget, isSaving } = useSaveWidget();

  const handleSave = async () => {
    if (!name.trim()) {
      return;
    }

    await saveWidget({
      name,
      description,
      type,
      config,
      projectSlug,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Widget</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter widget name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter widget description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !name.trim()}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
