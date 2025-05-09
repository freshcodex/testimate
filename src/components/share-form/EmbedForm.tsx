import { Copy, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const embedCode = `<script type="text/javascript" src="https://widget.testimate.io/js/iframeResizer.min.js"></script>
<iframe id="testimate-collector-iframe" src="${formLink}"></iframe>
<script type="text/javascript">iframeResize({log: false, checkOrigin: false}, "#testimate-collector-iframe");</script>`;

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

        <Select defaultValue="unstyled">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unstyled">Unstyled</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="branded">Branded</SelectItem>
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
              <code>
                <span className="text-pink-400">&lt;script</span>{" "}
                <span className="text-blue-400">type</span>=
                <span className="text-green-400">"text/javascript"</span>{" "}
                <span className="text-blue-400">src</span>=
                <span className="text-green-400">
                  "https://widget.testimate.io/js/iframeResizer.min.js"
                </span>
                <span className="text-pink-400">&gt;&lt;/script&gt;</span>
                <br />
                <span className="text-pink-400">&lt;iframe</span>{" "}
                <span className="text-blue-400">id</span>=
                <span className="text-green-400">
                  "testimate-collector-iframe"
                </span>{" "}
                <span className="text-blue-400">src</span>=
                <span className="text-green-400">"{formLink}"</span>
                <span className="text-pink-400">&gt;&lt;/iframe&gt;</span>
                <br />
                <span className="text-pink-400">&lt;script</span>{" "}
                <span className="text-blue-400">type</span>=
                <span className="text-green-400">"text/javascript"</span>
                <span className="text-pink-400">&gt;</span>
                iframeResize(&#123;log: false, checkOrigin: false&#125;,
                "#testimate-collector-iframe")
                <span className="text-pink-400">&lt;/script&gt;</span>
              </code>
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
