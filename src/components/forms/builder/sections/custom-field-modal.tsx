import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";
import type { AdditionalField } from "@/lib/schema/form-schema";

interface CustomFieldModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addAdditionalField?: (field: AdditionalField) => void;
}

const FIELD_TYPES = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "Select", value: "select" },
];

export function CustomFieldModal({
  open,
  onOpenChange,
  addAdditionalField,
}: CustomFieldModalProps) {
  const isMobile = useIsMobile();
  const { setValue, getValues } = useFormContext();
  const [type, setType] = React.useState(FIELD_TYPES[0]?.value ?? "text");
  const [label, setLabel] = React.useState("");
  const [id, setId] = React.useState("");
  const [required, setRequired] = React.useState(true);
  const [hidden, setHidden] = React.useState(false);

  console.log("should be open", open);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newField = {
      id,
      label,
      type: type as AdditionalField["type"],
      required,
      hidden,
    };
    if (addAdditionalField) {
      addAdditionalField(newField);
    } else {
      const current = getValues("additionalFields") || [];
      setValue("additionalFields", [...current, newField]);
    }
    setType(FIELD_TYPES[0]?.value ?? "text");
    setLabel("");
    setId("");
    setRequired(true);
    setHidden(false);
    onOpenChange(false);
  };

  const formContent = (
    <form className="grid gap-6" onSubmit={handleSave}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {FIELD_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="New Field"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="new-field"
            required
          />
        </div>
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={required}
              onCheckedChange={setRequired}
              id="required"
            />
            <Label htmlFor="required" className="text-sm">
              Required
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={hidden} onCheckedChange={setHidden} id="hidden" />
            <Label htmlFor="hidden" className="text-sm">
              Hidden
            </Label>
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Create Custom Field</DrawerTitle>
            <DrawerDescription>
              Add a new custom field to collect more information from your
              users.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">{formContent}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Create Custom Field</DialogTitle>
          <DialogDescription>
            Add a new custom field to collect more information from your users.
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
