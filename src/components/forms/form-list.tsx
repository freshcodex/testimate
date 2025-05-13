import type React from "react";
import {
  Copy,
  Edit,
  Heart,
  Link as LinkIcon,
  Pause,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { CollectionForm } from "@/types";

interface FormListProps {
  forms: CollectionForm[];
  projectSlug: string;
}

export function CollectionFormsList({ forms, projectSlug }: FormListProps) {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  return (
    <div ref={parent} className="space-y-4 mt-4">
      {forms.map((form) => (
        <CollectionFormCard
          key={form.id}
          form={form}
          projectSlug={projectSlug}
        />
      ))}
    </div>
  );
}

function CollectionFormCard({
  form,
  projectSlug,
}: {
  form: CollectionForm;
  projectSlug: string;
}) {
  const utils = api.useUtils();
  const { mutate: updateForm, isPending: isUpdating } =
    api.collectionForms.update.useMutation({
      onSuccess: () => {
        utils.collectionForms.getAll.invalidate({ projectSlug });
        toast.success("Form status updated successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: deleteForm, isPending: isDeleting } =
    api.collectionForms.delete.useMutation({
      onSuccess: () => {
        utils.collectionForms.getAll.invalidate({ projectSlug });
        toast.success("Form deleted successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: duplicateForm, isPending: isDuplicating } =
    api.collectionForms.duplicate.useMutation({
      onSuccess: () => {
        utils.collectionForms.getAll.invalidate({ projectSlug });
        toast.success("Form duplicated successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleCopyLink = () => {
    const link = `${window.location.origin}/dashboard/${projectSlug}/forms/${form.id}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const handleToggleActive = () => {
    updateForm({
      id: form.id,
      active: !form.active,
    });
  };

  return (
    <Card className="border-l-4 border-l-purple-600">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  form.active ? "bg-green-500" : "bg-yellow-500"
                }`}
                aria-hidden="true"
              />
              <h3 className="font-medium">{form.title}</h3>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center justify-between p-2">
          <div className="flex flex-wrap gap-1">
            <Link href={`/dashboard/${projectSlug}/forms/${form.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-gray-500 hover:text-gray-900"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline-block">
                  Edit
                </span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-gray-500 hover:text-gray-900"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">
                Copy link
              </span>
            </Button>
            <Link href={`/dashboard/${projectSlug}/forms/${form.id}/share`}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-gray-500 hover:text-gray-900"
              >
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline-block">
                  Share
                </span>
              </Button>
            </Link>
            <ActionButton
              icon={Copy}
              label="Duplicate"
              onClick={() => duplicateForm({ id: form.id })}
              disabled={isDuplicating}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-gray-500 hover:text-gray-900"
              disabled={isUpdating}
              onClick={handleToggleActive}
            >
              <Pause className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline-block">
                {form.active ? "Pause" : "Resume"}
              </span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-gray-500 hover:text-gray-900"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline-block">
                    Delete
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the form and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteForm({ id: form.id })}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ActionButton icon={Heart} label="Testimonials" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  disabled,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 gap-1 text-gray-500 hover:text-gray-900"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only md:not-sr-only md:inline-block">{label}</span>
    </Button>
  );
}
