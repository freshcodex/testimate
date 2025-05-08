"use client";

import type React from "react";
import {
  Brush,
  MessageSquare,
  MessageCircle,
  User,
  ThumbsUp,
  Share2,
  Gift,
  Globe,
  Languages,
  Tag,
  Globe2,
  Heart,
  Settings,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FormSection } from "./form-builder";
import { DesignSection } from "./sections/design-section";
import { WelcomeSection } from "./sections/welcome-section";
import { ResponseSection } from "./sections/response-section";
import { CustomerDetailsSection } from "./sections/customer-detail-sections";
import { ThankYouSection } from "./sections/thankyou-section";

interface FormSidebarProps {
  activeSection: FormSection;
  setActiveSection: (section: FormSection) => void;
}

export function FormSidebar({
  activeSection,
  setActiveSection,
}: FormSidebarProps) {
  // This function handles the accordion state changes
  const handleAccordionChange = (value: string) => {
    if (value) {
      setActiveSection(value as FormSection);
    }
  };

  return (
    <div className="w-[380px] flex-shrink-0 overflow-auto border-r">
      <Accordion
        type="single"
        collapsible
        value={activeSection}
        onValueChange={handleAccordionChange}
        className="w-full"
      >
        <AccordionItem value="design" className="border-b">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-100 text-purple-600">
                <Brush className="h-3.5 w-3.5" />
              </div>
              <span className="ml-2 text-sm font-medium">Design</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <DesignSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="welcome" className="border-b">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md ${
                  activeSection === "welcome"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </div>
              <span className="ml-2 text-sm font-medium">Welcome page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <WelcomeSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="response" className="border-b">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md ${
                  activeSection === "response"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </div>
              <span className="ml-2 text-sm font-medium">Response page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ResponseSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="customer" className="border-b">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md ${
                  activeSection === "customer"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="ml-2 text-sm font-medium">
                Customer details page
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <CustomerDetailsSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="thank-you" className="border-b">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md ${
                  activeSection === "thank-you"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </div>
              <span className="ml-2 text-sm font-medium">Thank you page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ThankYouSection />
          </AccordionContent>
        </AccordionItem>

        <SidebarAccordionItem
          value="word-of-mouth"
          icon={<Share2 className="h-3.5 w-3.5" />}
          label="Word of Mouth"
          isActive={activeSection === "word-of-mouth"}
        />

        <SidebarAccordionItem
          value="collect-more"
          icon={<Gift className="h-3.5 w-3.5" />}
          label="Collect 2x more testimonials"
          isActive={activeSection === "collect-more"}
        />

        <SidebarAccordionItem
          value="language"
          icon={<Globe className="h-3.5 w-3.5" />}
          label="Language"
          isActive={activeSection === "language"}
        />

        <SidebarAccordionItem
          value="auto-translate"
          icon={<Languages className="h-3.5 w-3.5" />}
          label="Auto-translate"
          isActive={activeSection === "auto-translate"}
        />

        <SidebarAccordionItem
          value="customize-labels"
          icon={<Tag className="h-3.5 w-3.5" />}
          label="Customize labels"
          isActive={activeSection === "customize-labels"}
        />

        <SidebarAccordionItem
          value="custom-domain"
          icon={<Globe2 className="h-3.5 w-3.5" />}
          label="Custom domain"
          isActive={activeSection === "custom-domain"}
        />

        <SidebarAccordionItem
          value="remove-branding"
          icon={<Heart className="h-3.5 w-3.5" />}
          label="Remove Senja branding"
          isActive={activeSection === "remove-branding"}
        />

        <SidebarAccordionItem
          value="advanced"
          icon={<Settings className="h-3.5 w-3.5" />}
          label="Advanced"
          isActive={activeSection === "advanced"}
        />
      </Accordion>
    </div>
  );
}

interface SidebarAccordionItemProps {
  value: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function SidebarAccordionItem({
  value,
  icon,
  label,
  isActive,
}: SidebarAccordionItemProps) {
  return (
    <AccordionItem value={value} className="border-b">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-md ${
              isActive
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {icon}
          </div>
          <span className="ml-2 text-sm font-medium">{label}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="text-sm text-gray-500">
          {isActive ? (
            <p>Content for {label} goes here</p>
          ) : (
            <p>This section is currently inactive</p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
