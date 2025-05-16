import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Camera } from "lucide-react";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useTestimonialForm } from "@/hooks/use-testimonial-form";
import { useFormStep } from "@/hooks/use-form-step";
import type { CollectionFormProps } from "./thankyou-page";
import { useThankyouContent } from "@/hooks/use-thankyou-content";
import { useTestimonialStore } from "@/store/testimonial-store";

interface CustomerDetailsContentProps {
  config: CollectionFormProps["collectionFormConfig"]["customerDetails"];
  additionalFields: CollectionFormProps["collectionFormConfig"]["additionalFields"];
  isMobile?: boolean;
  customLabels: CollectionFormProps["collectionFormConfig"]["customLabels"];
  design: CollectionFormProps["collectionFormConfig"]["design"];
  formId: number;
  projectSlug: string;
}

// TODO: if the user directly navigates to the customer details page, we should show a message to the user that they need to submit the feedback first, we can do this bby checking form

//TODO: fix custom labels some fields have it and some don't; like fullname dont have it; keep type in central place to solve this issues

export function CustomerDetailsContent({
  config,
  additionalFields,
  isMobile = false,
  customLabels,
  design,
  formId,
  projectSlug,
}: CustomerDetailsContentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { setCurrentStep } = useFormStep();
  const createTestimonial = api.testimonials.create.useMutation({
    onSuccess: (data) => {
      toast.success("Testimonial submitted successfully!");
      setCurrentStep("thank-you");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // update testimonial if we have an id in the store
  const updateTestimonial = api.testimonials.update.useMutation({
    onSuccess: (data) => {
      // Intentional: Don't wanna confuse the user
      toast.success("Testimonial submitted successfully!");
      setCurrentStep("thank-you");
    },
  });

  const { rating, text, testimonialId, token } = useTestimonialStore();

  const { form, handleSubmit } = useTestimonialForm({
    formId,
    projectSlug,
    initialData: {
      rating,
      text,
    },
  });

  const { setThankyouContentFormData } = useThankyouContent();

  useEffect(() => {
    formRef.current && autoAnimate(formRef.current);
  }, [formRef]);

  const onSubmit = handleSubmit((data) => {
    // TODO: have a better way to handle this
    setThankyouContentFormData(data);

    if (testimonialId) {
      updateTestimonial.mutate({
        ...data,
        id: testimonialId,
        token,
      });
    } else {
      console.log(formId, "formId");
      createTestimonial.mutate({
        ...data,
        formId,
        projectSlug,
      });
    }
  });

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{customLabels.yourName}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Sherlock Holmes"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {config.emailEnabled && (
          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {customLabels.emailAddress}
                  {config.emailRequired && (
                    <span className="text-red-400">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={customLabels.emailPlaceholder}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {config.userPhotoEnabled && (
          <div>
            <label htmlFor="photo" className="mb-1 block text-sm font-medium">
              Your Photo
              {config.userPhotoRequired && (
                <span className="text-red-400 ml-1">*</span>
              )}
            </label>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                <Camera className="mr-1 h-3 w-3" />
                Pick an image
              </Button>
            </div>
          </div>
        )}

        {config.jobTitleEnabled && (
          <FormField
            control={form.control}
            name="customerTagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Job Title
                  {config.jobTitleRequired && (
                    <span className="text-red-400">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Head of Investigations"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {config.websiteUrlEnabled && (
          <FormField
            control={form.control}
            name="customerUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Website URL
                  {config.websiteUrlRequired && (
                    <span className="text-red-400">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://bakerstreet.com"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {config.companyEnabled && (
          <FormField
            control={form.control}
            name="customerCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company Name
                  {config.companyRequired && (
                    <span className="text-red-400">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Baker Street Detectives"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {config.companyLogoEnabled && (
          <div>
            <label
              htmlFor="companyLogo"
              className="mb-1 block text-sm font-medium"
            >
              Company Logo
              {config.companyLogoRequired && (
                <span className="text-red-400 ml-1">*</span>
              )}
            </label>
            <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center border border-gray-200">
              <Camera className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        )}

        {/* TODO: zod form should respect or have info about whether this field is required or not */}
        {additionalFields?.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-400">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    required={field.required}
                    placeholder={field.label}
                    {...formField}
                    value={formField.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-full"
          style={{ backgroundColor: design.primaryColor }}
          disabled={createTestimonial.isPending}
        >
          {createTestimonial.isPending ? "Submitting..." : "Submit"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you give us permission to use this testimonial across
          social channels and other marketing efforts
        </p>
      </form>
    </Form>
  );
}
