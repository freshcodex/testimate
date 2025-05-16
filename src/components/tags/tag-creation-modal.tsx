"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Tag, TagCategory } from "@/types";

interface TagCreationModalProps {
  onClose: () => void;
  // TODO: fix this type not accurately representing the tag insertion
  onCreateTag: (tag: Tag) => void;
}

interface CategoryOption {
  id: TagCategory;
  name: TagCategory;
  description: string;
  example: string;
  icon: React.ReactNode;
  color: string;
}

export function TagCreationModal({
  onClose,
  onCreateTag,
}: TagCreationModalProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<TagCategory | null>(
    null
  );
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");

  const categoryOptions: CategoryOption[] = [
    {
      id: "Product",
      name: "Product",
      description:
        "Use this category for tags about different products or services you offer.",
      example: "ex. Course, Newsletter",
      icon: <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>,
      color: "bg-green-50",
    },
    {
      id: "Company Size",
      name: "Company Size",
      description:
        "Use this category for tags about your customer's company size.",
      example: "ex. 0-10 employees, 20-50 employees",
      icon: <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>,
      color: "bg-teal-50",
    },
    {
      id: "Business Type",
      name: "Business Type",
      description:
        "Use this category for tags about your customer's business type.",
      example: "ex. Creator, SaaS",
      icon: <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>,
      color: "bg-blue-50",
    },
    {
      id: "Industry",
      name: "Industry",
      description: "Use this category for tags about your customer's industry.",
      example: "ex. Agriculture, Technology",
      icon: <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>,
      color: "bg-indigo-50",
    },
    {
      id: "Job Title",
      name: "Job Title",
      description:
        "Use this category for tags about your customer's job title.",
      example: "",
      icon: <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>,
      color: "bg-purple-50",
    },
  ];

  const handleCategorySelect = (category: TagCategory) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleCreateTag = () => {
    if (selectedCategory && tagName) {
      onCreateTag({
        name: tagName,
        description: tagDescription,
        category: selectedCategory,
        testimonialCount: 0,
      } as Tag);
    }
  };

  return (
    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Select a category</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {step === 1 && (
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              Select a category to get started
            </p>
            <div className="space-y-2">
              {categoryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-md cursor-pointer hover:bg-gray-50 ${option.color}`}
                  onClick={() => handleCategorySelect(option.id)}
                >
                  <div className="flex items-center mb-1">
                    {option.icon}
                    <span className="font-medium">{option.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-5">
                    {option.description}
                  </p>
                  {option.example && (
                    <p className="text-sm text-gray-500 ml-5">
                      {option.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-gray-50 cursor-not-allowed"
                value={selectedCategory ?? ""}
                disabled
              >
                <option value={selectedCategory ?? ""}>
                  {selectedCategory}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                Tag name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Ex. Landing Page Testimonials"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suggestions
              </label>
              <div className="flex gap-2 flex-wrap">
                {["Course", "Consultation Calls", "Newsletter"].map(
                  (suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 border border-gray-200"
                      onClick={() => setTagName(suggestion)}
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md resize-none"
                value={tagDescription}
                onChange={(e) => setTagDescription(e.target.value)}
                placeholder="Describe this tag so your team knows what it's for"
                rows={3}
              />
            </div>
          </div>
        )}

        <div className="p-4 border-t flex justify-end">
          {step === 2 ? (
            <>
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="mr-2"
              >
                Back
              </Button>
              <Button
                onClick={handleCreateTag}
                disabled={!tagName}
                className="bg-black hover:bg-gray-800 text-white"
              >
                {/* TODO: show loading state */}
                Create
              </Button>
            </>
          ) : (
            <Button onClick={onClose} variant="ghost" className="mr-2">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
