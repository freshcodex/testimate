import Image from "next/image";
import { FileText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-6 rounded-full bg-purple-100 p-3">
        <FileText className="h-6 w-6" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">No forms yet</h2>
      <p className="mb-6 max-w-md text-center text-gray-500">
        Create your first form to start collecting testimonials and feedback
        from your customers.
      </p>
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Create your first form
      </Button>

      <div className="mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick start guide</CardTitle>
            <CardDescription>
              Learn how to create and share your forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-600">
                  1
                </span>
                <span>Create a form with custom questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-600">
                  2
                </span>
                <span>Share the form link with your customers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-600">
                  3
                </span>
                <span>Collect and manage testimonials</span>
              </li>
            </ul>
            <Button variant="link" className="mt-4 px-0 ">
              View documentation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Watch a demo</CardTitle>
            <CardDescription>
              See how to get the most out of forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="outline"
                  className="gap-2 bg-white/80 backdrop-blur-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-purple-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Play video
                </Button>
              </div>
              <Image
                src="/placeholder.svg?height=200&width=350"
                alt="Demo video thumbnail"
                width={350}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
