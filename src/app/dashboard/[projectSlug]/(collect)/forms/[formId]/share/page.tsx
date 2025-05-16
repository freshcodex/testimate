"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "@/components/share-form/Sidebar";
import { LinkShare } from "@/components/share-form/LinkShare";
import { EmbedForm } from "@/components/share-form/EmbedForm";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { env } from "@/env";

export default function ShareFormPage() {
  const params = useParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("link");

  // TODO: Change to the actual form link
  const formLink = `${env.NEXT_PUBLIC_URL}/p/test-project/r/${params.formId}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <div className="mb-8">
        <Link
          href={`/dashboard/${params.projectSlug}/forms`}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Forms
        </Link>
        <h1 className="text-3xl font-bold">Share your form</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="md:col-span-2">
          {/* {activeTab === "invite" && <InviteCustomers />} */}
          {activeTab === "link" && (
            <LinkShare
              formLink={formLink}
              copied={copied}
              handleCopy={handleCopy}
            />
          )}
          {activeTab === "embed" && (
            <EmbedForm
              formLink={formLink}
              copied={copied}
              handleCopy={handleCopy}
            />
          )}
          {/* {activeTab === "course" && <CourseIntegration />} */}
          {/* {activeTab === "automate" && <Automation />} */}
        </div>
      </div>
    </div>
  );
}
