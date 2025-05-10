import { Copy, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type StyleType = "unstyled" | "styled";
type TriggerType = "button" | "time" | "scroll";

interface EmbedFormProps {
  formLink: string;
  embedType: string;
  setEmbedType: (type: string) => void;
  copied: string | null;
  handleCopy: (text: string, type: string) => void;
}

export function EmbedForm({
  formLink,
  embedType,
  setEmbedType,
  copied,
  handleCopy,
}: EmbedFormProps) {
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("unstyled");
  const [triggerType, setTriggerType] = useState<TriggerType>("button");

  const getEmbedCode = (style: StyleType, trigger: TriggerType) => {
    const baseUrl = formLink;
    const iframeId = "testimate-collector-iframe";

    const styles: Record<StyleType, string> = {
      unstyled: "",
      styled: `
        #${iframeId} {
          border: none;
          width: 100%;
          min-height: 700px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }`,
    };

    const styleCode = styles[style];

    if (embedType === "inline") {
      return `<iframe id="${iframeId}" src="${baseUrl}" allow="camera;microphone" title="Testimate form" frameborder="0" scrolling="no" width="100%" height="700"></iframe>
<style>${styleCode}</style>`;
    } else {
      // Modal logic with trigger
      let triggerScript = "";
      let triggerComment = "";
      if (trigger === "button") {
        triggerScript = `
<button onclick=\"openTestimateForm()\">Open Form</button>`;
        triggerComment =
          "To open the popup on clicking a button, use the button below.";
      } else if (trigger === "time") {
        triggerScript = `
<script type=\"text/javascript\">\n  setTimeout(openTestimateForm, 3000); // Opens after 3 seconds\n<\/script>`;
        triggerComment = "The popup will open automatically after a delay.";
      } else if (trigger === "scroll") {
        triggerScript = `
<script type=\"text/javascript\">\n  window.addEventListener('scroll', function onScroll() {\n    if (window.scrollY > 200) {\n      openTestimateForm();\n      window.removeEventListener('scroll', onScroll);\n    }\n  });\n<\/script>`;
        triggerComment = "The popup will open after scrolling down the page.";
      }
      return `${triggerComment}
${triggerScript}
<script type=\"text/javascript\">\n  function openTestimateForm() {\n    const backdrop = document.createElement('div');\n    backdrop.className = 'testimate-modal-backdrop';\n    const modal = document.createElement('div');\n    modal.className = 'testimate-modal';\n    modal.innerHTML = '<iframe id=\"${iframeId}\" src=\"${baseUrl}\" allow=\"camera;microphone\" title=\"Testimate form\" frameborder=\"0\" scrolling=\"no\" width=\"100%\" height=\"700\"></iframe>';\n    document.body.appendChild(backdrop);\n    document.body.appendChild(modal);\n    backdrop.onclick = function() {\n      document.body.removeChild(backdrop);\n      document.body.removeChild(modal);\n    };\n  }\n<\/script>
<style>
  .testimate-modal {
    font-family: system-ui, -apple-system, sans-serif;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  .testimate-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 999;
    backdrop-filter: blur(4px);
  }
  ${styleCode}
</style>`;
    }
  };

  const embedCode = getEmbedCode(selectedStyle, triggerType);

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">
        How would you like to embed your form?
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        You can embed your form as an inline embed or as a popup widget.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={`border rounded-lg p-4 cursor-pointer ${
            embedType === "inline" ? "border-purple-500 bg-purple-50" : ""
          }`}
          onClick={() => setEmbedType("inline")}
        >
          <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
            <div className="w-2/3 h-16 bg-purple-400 rounded"></div>
          </div>
          <p className="text-center font-medium">Inline</p>
        </div>
        <div
          className={`border rounded-lg p-4 cursor-pointer ${
            embedType === "modal" ? "border-purple-500 bg-purple-50" : ""
          }`}
          onClick={() => setEmbedType("modal")}
        >
          <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
            <div className="w-1/2 h-24 bg-purple-400 rounded"></div>
          </div>
          <p className="text-center font-medium">Modal</p>
        </div>
      </div>

      {embedType === "modal" && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium">Open Trigger</h3>
          </div>
          <Select
            value={triggerType}
            onValueChange={(value: TriggerType) => setTriggerType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="button">On Button Click</SelectItem>
              <SelectItem value="time">After Elapsed Time</SelectItem>
              <SelectItem value="scroll">After Scrolling</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-medium">Embed style</h3>
          <div className="ml-2 rounded-full bg-gray-200 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
        </div>

        <Select
          value={selectedStyle}
          onValueChange={(value: StyleType) => setSelectedStyle(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unstyled">Unstyled</SelectItem>
            <SelectItem value="styled">Styled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Your Code Snippet</h3>
        <p className="text-sm text-gray-500 mb-4">
          To embed your collection form, paste the following code snippet
          anywhere in the body of your website:
        </p>

        <div className="relative">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>{embedCode}</code>
            </pre>
          </div>
          <button
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
            onClick={() => handleCopy(embedCode, "embed")}
          >
            {copied === "embed" ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
