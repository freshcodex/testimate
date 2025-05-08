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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { FormSection } from "@/components/forms/builder/form-builder";

interface FormSidebarProps {
  activeSection: FormSection;
  setActiveSection: (section: FormSection) => void;
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
}

export function FormSidebar({
  activeSection,
  setActiveSection,
  formData,
  updateFormData,
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
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="logo"
                  className="text-xs font-medium text-gray-500"
                >
                  Logo
                </Label>
                <div className="mt-1 border border-gray-200 p-4 rounded-md inline-block">
                  <div className="h-12 w-12 flex items-center justify-center bg-white rounded-md">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="primaryColor"
                    className="text-xs font-medium text-gray-500"
                  >
                    Primary Color
                  </Label>
                  <div className="mt-1 flex items-center">
                    <div className="h-6 w-6 rounded-md bg-purple-600 mr-2"></div>
                    <Input
                      id="primaryColor"
                      value={formData.design.primaryColor}
                      onChange={(e) =>
                        updateFormData("design", "primaryColor", e.target.value)
                      }
                      className="h-9"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="backgroundColor"
                    className="text-xs font-medium text-gray-500"
                  >
                    Background Color
                  </Label>
                  <div className="mt-1 flex items-center">
                    <div className="h-6 w-6 rounded-md bg-white border border-gray-200 mr-2"></div>
                    <Input
                      id="backgroundColor"
                      value={formData.design.backgroundColor}
                      onChange={(e) =>
                        updateFormData(
                          "design",
                          "backgroundColor",
                          e.target.value
                        )
                      }
                      className="h-9"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="font"
                  className="text-xs font-medium text-gray-500"
                >
                  Font
                </Label>
                <div className="relative mt-1">
                  <select
                    id="font"
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
                    value={formData.design.font}
                    onChange={(e) =>
                      updateFormData("design", "font", e.target.value)
                    }
                  >
                    <option>Default</option>
                    <option>Sans Serif</option>
                    <option>Serif</option>
                    <option>Monospace</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showGradient" className="text-sm">
                  Show Gradient Background
                </Label>
                <Switch
                  id="showGradient"
                  checked={formData.design.showGradient}
                  onCheckedChange={(checked) =>
                    updateFormData("design", "showGradient", checked)
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <SidebarAccordionItem
          value="welcome"
          icon={<MessageSquare className="h-3.5 w-3.5" />}
          label="Welcome page"
          isActive={activeSection === "welcome"}
        />

        <SidebarAccordionItem
          value="response"
          icon={<MessageCircle className="h-3.5 w-3.5" />}
          label="Response page"
          isActive={activeSection === "response"}
        />

        <SidebarAccordionItem
          value="customer"
          icon={<User className="h-3.5 w-3.5" />}
          label="Customer details page"
          isActive={activeSection === "customer"}
        />

        <SidebarAccordionItem
          value="thank-you"
          icon={<ThumbsUp className="h-3.5 w-3.5" />}
          label="Thank you page"
          isActive={activeSection === "thank-you"}
        />

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
