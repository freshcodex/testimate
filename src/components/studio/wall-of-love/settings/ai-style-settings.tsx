import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";

interface AIStyleSettingsProps {
  config: any;
  onConfigChange: (config: any) => void;
}

export function AIStyleSettings({
  config,
  onConfigChange,
}: AIStyleSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="ai-prompt" className="block mb-2">
          Describe your desired style
        </Label>
        <Textarea
          id="ai-prompt"
          placeholder="Describe the style you want for your Wall of Love. For example: 'Modern, minimalist design with rounded corners and subtle shadows.'"
          className="min-h-[100px]"
        />
      </div>

      <Button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
        <Wand2 className="h-4 w-4" />
        Generate style
      </Button>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">
          AI style generation will create a custom design based on your
          description. The AI will adjust colors, fonts, shadows, and other
          properties to match your desired style.
        </p>
      </div>
    </div>
  );
}
