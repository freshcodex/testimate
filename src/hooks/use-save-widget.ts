import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import type { WidgetCreateInput } from "@/types";

export function useSaveWidget() {
  const { mutateAsync: createWidget, isPending } =
    api.widget.create.useMutation({
      onSuccess: () => {
        toast.success("Widget saved successfully!");
        // TODO: redirect to the saved widget page maybe right now its just state but it would be better to make it a page
      },
      onError: (error) => {
        toast.error(`Error saving widget: ${error.message}`);
      },
    });

  const saveWidget = async (input: WidgetCreateInput) => {
    await createWidget(input);
  };

  return {
    saveWidget,
    isSaving: isPending,
  };
}
