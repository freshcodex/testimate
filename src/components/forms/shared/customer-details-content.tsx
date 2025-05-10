import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Camera } from "lucide-react";
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

interface CustomerDetailsContentProps {
  config: CollectionFormProps["collectionFormConfig"]["customerDetails"];
  isMobile?: boolean;
  customLabels: CollectionFormProps["collectionFormConfig"]["customLabels"];
  design: CollectionFormProps["collectionFormConfig"]["design"];
  formId: number;
  projectSlug: string;
}

// TODO: if the user directly navigates to the customer details page, we should show a message to the user that they need to submit the feedback first, we can do this bby checking form

export function CustomerDetailsContent({
  config,
  isMobile = false,
  customLabels,
  design,
  formId,
  projectSlug,
}: CustomerDetailsContentProps) {
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

  const { form, handleSubmit, setThankyouContentFormData } = useTestimonialForm(
    {
      formId,
      projectSlug,
    }
  );

  const onSubmit = handleSubmit((data) => {
    createTestimonial.mutate({
      ...data,
      formId,
      projectSlug,
    });

    setThankyouContentFormData(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="sherlock@bakerstreet.com"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div>
          <label htmlFor="photo" className="mb-1 block text-sm font-medium">
            Your Photo
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

        {config.jobTitleEnabled && (
          <FormField
            control={form.control}
            name="customerTagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
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

        <FormField
          control={form.control}
          name="customerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
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

        {config.companyEnabled && (
          <FormField
            control={form.control}
            name="customerCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
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

        <div>
          <label
            htmlFor="companyLogo"
            className="mb-1 block text-sm font-medium"
          >
            Company Logo
          </label>
          <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center border border-gray-200">
            <Camera className="h-6 w-6 text-gray-400" />
          </div>
        </div>

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
