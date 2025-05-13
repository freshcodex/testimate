import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Copy, Check, LayoutGrid, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { widgets } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { useParams } from "next/navigation";
type Widget = InferSelectModel<typeof widgets>;

export function SavedWidgetsTab() {
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [copied, setCopied] = useState(false);
  const { projectSlug } = useParams();
  const { data: widgets, isLoading } = api.widget.getAllByProjectSlug.useQuery({
    projectSlug: projectSlug as string,
  });

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Widget URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const getWidgetIcon = (type: string) => {
    switch (type) {
      case "wall_of_love":
        return <Heart className="h-4 w-4" />;
      case "single_widget":
        return <LayoutGrid className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  console.log(JSON.stringify(widgets, null, 2));

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Saved Widgets</h2>
      <p className="text-gray-600 mb-8">
        Access your saved widgets and get the embed code to use on your website.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets?.map((widget: Widget) => (
          <div
            key={widget.id}
            className="border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedWidget(widget)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{widget.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getWidgetIcon(widget.type)}
                  <p className="text-sm text-gray-500">
                    {widget.type.replace("_", " ")}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {format(new Date(widget.createdAt), "MMM d, yyyy")}
              </Badge>
            </div>
            <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
              <span className="text-gray-400">Widget Preview</span>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="text-sm text-purple-600 hover:text-purple-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyUrl(widget.url as string);
                }}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy URL
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedWidget}
        onOpenChange={() => setSelectedWidget(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Widget Details</DialogTitle>
          </DialogHeader>
          {selectedWidget && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getWidgetIcon(selectedWidget.type)}
                <h3 className="text-lg font-medium">{selectedWidget.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">
                    {selectedWidget.type.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium">
                    {format(new Date(selectedWidget.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Widget URL</p>
                <div className="flex gap-2">
                  <code className="flex-1 bg-gray-100 p-2 rounded text-sm break-all">
                    {selectedWidget.url}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyUrl(selectedWidget.url as string)}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              {selectedWidget.description && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-sm">{selectedWidget.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
