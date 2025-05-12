"use client";

import React from "react";
import {
  Brush,
  MessageSquare,
  MessageCircle,
  User,
  ThumbsUp,
  Tag,
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
import { CustomizeLabelsSection } from "./sections/customize-labels-section";

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
    <div className="flex-shrink-0">
      <Accordion
        type="single"
        collapsible
        value={activeSection}
        onValueChange={handleAccordionChange}
        className="w-full space-y-4"
      >
        <AccordionItem
          value="design"
          className={`border-b ${activeSection !== "design" && "opacity-50"}`}
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center space-x-4">
              <Brush className="h-6 w-6 text-blue-500" />
              <span>Design</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <DesignSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="welcome"
          className={`border-b ${activeSection !== "welcome" && "opacity-50"}`}
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-6 w-6 text-green-500" />
              <span>Welcome page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <WelcomeSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="response"
          className={`border-b ${activeSection !== "response" && "opacity-50"}`}
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center space-x-4">
              <MessageCircle className="h-6 w-6 text-orange-500" />
              <span>Response page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <ResponseSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="customer"
          className={`border-b ${activeSection !== "customer" && "opacity-50"}`}
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center space-x-4">
              <User className="h-6 w-6 text-purple-500" />
              <span>Customer details page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <CustomerDetailsSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="thank-you"
          className={`border-b ${
            activeSection !== "thank-you" && "opacity-50"
          }`}
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center space-x-4">
              <ThumbsUp className="h-6 w-6 text-pink-500" />
              <span>Thank you page</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <ThankYouSection />
          </AccordionContent>
        </AccordionItem>

        {/* <SidebarAccordionItem
          value="word-of-mouth"
          icon={<Share2 className="h-4 w-4 text-indigo-500" />}
          label="Word of Mouth"
          isActive={activeSection === "word-of-mouth"}
        />

        <SidebarAccordionItem
          value="collect-more"
          icon={<Gift className="h-4 w-4 text-indigo-500" />}
          label="Collect 2x more testimonials"
          isActive={activeSection === "collect-more"}
        />

        <SidebarAccordionItem
          value="language"
          icon={<Globe className="h-4 w-4 text-indigo-500" />}
          label="Language"
          isActive={activeSection === "language"}
        />

        <SidebarAccordionItem
          value="auto-translate"
          icon={<Languages className="h-4 w-4 text-indigo-500" />}
          label="Auto-translate"
          isActive={activeSection === "auto-translate"}
        /> */}

        <AccordionItem
          value="customize-labels"
          className={`border-b ${
            activeSection !== "customize-labels" ? "opacity-50 " : ""
          }`}
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center space-x-4">
              <Tag className="h-4 w-4 text-indigo-500" />
              <span className="ml-2 text-sm font-medium">Customize labels</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <CustomizeLabelsSection />
          </AccordionContent>
        </AccordionItem>

        {/* <SidebarAccordionItem
          value="custom-domain"
          icon={<Globe2 className="h-4 w-4 text-indigo-500" />}
          label="Custom domain"
          isActive={activeSection === "custom-domain"}
        />

        <SidebarAccordionItem
          value="remove-branding"
          icon={<Heart className="h-4 w-4 text-indigo-500" />}
          label="Remove Senja branding"
          isActive={activeSection === "remove-branding"}
        />

        <SidebarAccordionItem
          value="advanced"
          icon={<Settings className="h-4 w-4 text-indigo-500" />}
          label="Advanced"
          isActive={activeSection === "advanced"}
        /> */}
      </Accordion>
    </div>
  );
}
