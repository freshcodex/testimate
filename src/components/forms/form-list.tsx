import type React from "react";
import { Copy, Edit, Heart, Link, Pause, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormStats {
  uniqueVisits: number;
  testimonials: number;
  responseRate: number;
}

interface FormProps {
  id: number;
  name: string;
  status: "active" | "paused";
  stats: FormStats;
  isBeta?: boolean;
}

interface FormsListProps {
  forms: FormProps[];
}

export function FormsList({ forms }: FormsListProps) {
  return (
    <div className="space-y-4 mt-4">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}

function FormCard({ form }: { form: FormProps }) {
  return (
    <Card className="border-l-4 border-l-purple-600">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-green-500"
                aria-hidden="true"
              />
              <h3 className="font-medium">{form.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {form.isBeta && (
                <div className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Beta
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs text-gray-500 underline"
                        >
                          Upgrade to 2.0
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upgrade to the latest version</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center justify-between p-2">
          <div className="flex flex-wrap gap-1">
            <ActionButton icon={Edit} label="Edit" />
            <ActionButton icon={Link} label="Copy link" />
            <ActionButton icon={Copy} label="Share" />
            <ActionButton icon={Copy} label="Duplicate" />
            <ActionButton icon={Pause} label="Pause" />
            <ActionButton icon={Trash2} label="Delete" />
            <ActionButton icon={Heart} label="Testimonials" />
          </div>
          <div className="flex items-center gap-6 px-2 text-sm text-gray-500">
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-900">
                {form.stats.uniqueVisits}
              </span>
              <span>unique visits</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-900">
                {form.stats.testimonials}
              </span>
              <span>testimonials</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-900">
                {form.stats.responseRate}%
              </span>
              <span>response rate</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButton({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 gap-1 text-gray-500 hover:text-gray-900"
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only md:not-sr-only md:inline-block">{label}</span>
    </Button>
  );
}
