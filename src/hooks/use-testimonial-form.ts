import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTestimonialSchema } from "@/server/db/zod-schemas";
import { z } from "zod";

const insertTestimonial = insertTestimonialSchema
  .omit({ projectId: true })
  .extend({
    projectSlug: z.string(),
    customerName: z.string({ required_error: "Name is required" }),
    customerEmail: z.string({ required_error: "Email is required" }),
    type: z.enum(["text", "video"]),
  });

export type TestimonialFormData = z.infer<typeof insertTestimonial>;

interface UseTestimonialFormProps {
  formId: number;
  projectSlug: string;
  initialData?: Partial<TestimonialFormData>;
}

export function useTestimonialForm({
  formId,
  projectSlug,
  initialData = {},
}: UseTestimonialFormProps) {
  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(insertTestimonial),
    defaultValues: {
      ...initialData,
      type: "text",
      formId,
      projectSlug,
    },
  });

  return {
    form,
    formData: form.getValues(),
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit,
  };
}
