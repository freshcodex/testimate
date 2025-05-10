"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, PenLine } from "lucide-react";
import { useFormStep } from "@/hooks/use-form-step";
import { StarRating } from "./star-rating";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { toast } from "sonner";

// Define the form schema
const responseSchema = z.object({
  testimonial: z.string().min(1, "Please write your testimonial"),
  rating: z.number().min(1, "Please provide a rating"),
});

type ResponseFormData = z.infer<typeof responseSchema>;

interface ResponseContentProps {
  prompt: string;
  collectRatings: boolean;
  primaryColor: string;
  isMobile?: boolean;
  formId: number;
  projectSlug: string;
}

export function ResponseContent({
  prompt,
  collectRatings,
  primaryColor,
  isMobile = false,
  formId,
  projectSlug,
}: ResponseContentProps) {
  const { setCurrentStep } = useFormStep();
  const [rating, setRating] = useState(0);

  // Initialize form
  const form = useForm<ResponseFormData>({
    resolver: zodResolver(responseSchema),
    defaultValues: {
      testimonial: "",
      rating: undefined,
    },
  });

  const createTestimonial = api.testimonials.create.useMutation({
    onSuccess: () => {
      toast.success("Thank you for your testimonial!");
      setCurrentStep("thank-you");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Parse the prompt into an array of questions
  const questions = prompt
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.replace(/^-\s*/, "").trim());

  const handleBack = () => {
    setCurrentStep("welcome");
  };

  const onSubmit = (data: ResponseFormData) => {
    createTestimonial.mutate({
      ...data,
      formId,
      projectSlug,
      type: "text",
      integrationSource: "form",
      customerName: "",
    });
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center">
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="mr-auto p-0"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-xl font-semibold mx-auto">
          Write a text testimonial
        </h2>
      </div>

      <ul className="mb-4 space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-sm">•</span>
            <span>{question}</span>
          </li>
        ))}
      </ul>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {collectRatings && (
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <StarRating
                      value={rating}
                      onChange={(value) => {
                        setRating(value);
                        field.onChange(value);
                      }}
                      size={24}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="testimonial"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your testimonial here..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: primaryColor }}
            disabled={createTestimonial.isPending}
          >
            <PenLine className="mr-2 h-4 w-4" />
            {createTestimonial.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
