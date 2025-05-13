import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import type { WidgetCreateInput } from "@/types";

export function useSaveWidget() {
  const [isSaving, setIsSaving] = useState(false);

  const { mutate: createWidget } = api.widget.create.useMutation({
    onSuccess: () => {
      toast.success("Widget saved successfully!");
      setIsSaving(false);

      // TODO: redirect to the saved widget page maybe right now its just state but it would be better to make it a page
    },
    onError: (error) => {
      toast.error(`Error saving widget: ${error.message}`);
      setIsSaving(false);
    },
  });

  const saveWidget = async (input: WidgetCreateInput) => {
    setIsSaving(true);
    createWidget(input);
  };

  return {
    saveWidget,
    isSaving,
  };
}
