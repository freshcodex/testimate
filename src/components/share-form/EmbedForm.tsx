import { Copy, Check } from "lucide-react";

interface EmbedFormProps {
  formLink: string;
  copied: string | null;
  handleCopy: (text: string, type: string) => void;
}

export function EmbedForm({ formLink, copied, handleCopy }: EmbedFormProps) {
  const iframeId = "testimate-collector-iframe";
  const embedCode = `<iframe id="${iframeId}" src="${formLink}" allow="camera;microphone" title="Testimate form" frameborder="0" width="100%" height="900"></iframe>`;

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Embed your form</h2>
      <p className="text-sm text-gray-500 mb-4">
        Copy and paste this code snippet into your website:
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
  );
}
