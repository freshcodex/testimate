"use client";

import { ArrowLeft } from "lucide-react";
import { useFormStep } from "@/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./star-rating";
import { useTestimonialForm } from "@/hooks/use-testimonial-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ResponseContentProps {
  prompt: string;
  primaryColor: string;
  isMobile?: boolean;
  formId: number;
  projectSlug: string;
}

const formSchema = z.object({
  rating: z.number().min(1, "Please provide a rating"),
  text: z.string().min(10, "Testimonial must be at least 10 characters"),
});

export function ResponseContent({
  prompt,
  primaryColor,
  formId,
  projectSlug,
}: ResponseContentProps) {
  const { setCurrentStep } = useFormStep();

  const { form: testimonialForm } = useTestimonialForm({
    formId,
    projectSlug,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: testimonialForm.getValues("rating") || 0,
      text: testimonialForm.getValues("text") || "",
    },
  });

  const handleContinue = (values: z.infer<typeof formSchema>) => {
    testimonialForm.setValue("rating", values.rating);
    testimonialForm.setValue("text", values.text);
    setCurrentStep("customer-details");
  };

  const handleBack = () => {
    setCurrentStep("welcome");
  };

  const questions = prompt.split("\n").filter(Boolean);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <p key={index} className="text-sm text-gray-600">
            {question}
          </p>
        ))}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleContinue)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  How would you rate your experience?
                </FormLabel>
                <FormControl>
                  <StarRating
                    value={field.value}
                    onChange={field.onChange}
                    size={24}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Your Testimonial
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience..."
                    className="min-h-[150px] resize-y"
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
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
