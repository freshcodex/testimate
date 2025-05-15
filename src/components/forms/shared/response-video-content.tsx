"use client";

import { ArrowLeft } from "lucide-react";
import { useFormStep } from "@/hooks/use-form-step";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";
import { useTestimonialStore } from "@/store/testimonial-store";
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
import type { CollectionFormProps } from "./thankyou-page";
import { VideoRecorder } from "./response-video-recorder";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface ResponseContentProps {
  config: CollectionFormProps["collectionFormConfig"]["responsePage"];
  isMobile?: boolean;
  customLabels: CollectionFormProps["collectionFormConfig"]["customLabels"];
  design: CollectionFormProps["collectionFormConfig"]["design"];
  formId: number;
  projectSlug: string;
}

const formSchema = z.object({
  rating: z.number().min(1, "Please provide a rating"),
  videoUrl: z.string().optional(),
});

export function ResponseVideoContent({
  config,
  isMobile = false,
  customLabels,
  design,
}: ResponseContentProps) {
  const { setCurrentStep } = useFormStep();
  const { rating, setRating, videoUrl, setVideoUrl } = useTestimonialStore();
  const [videoPlaybackId, setVideoPlaybackId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: rating || 0,
      videoUrl: undefined,
    },
  });

  const handleContinue = (values: z.infer<typeof formSchema>) => {
    if (!values.videoUrl) {
      toast.error("Please upload a video");
      return;
    }
    console.log("values", values);
    // Update both the Zustand store and the form
    setRating(values.rating);
    setVideoUrl(values.videoUrl || "");

    setCurrentStep("customer-details");
  };

  const handleBack = () => {
    setCurrentStep("welcome");
  };

  const handleVideoUpload = (playbackId: string) => {
    console.log("upload complete", playbackId);
    setVideoPlaybackId(playbackId);
    form.setValue("videoUrl", playbackId);
  };

  const questions = config.prompt.split("\n").filter(Boolean);

  return (
    <div
      className={`w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 overflow-y-auto ${
        isMobile ? "h-[calc(100vh-2rem)]  pb-8" : ""
      }`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className={`${isMobile ? "sticky top-0 bg-white z-10" : "mb-4"}`}
      >
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
          {config.collectRatings && (
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
                      size={isMobile ? 20 : 24}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <VideoRecorder
            maxDuration={500}
            onUploadComplete={handleVideoUpload}
          />

          <Button
            className={`${isMobile ? "sticky bottom-0" : "w-full"}`}
            style={{ backgroundColor: design.primaryColor }}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
