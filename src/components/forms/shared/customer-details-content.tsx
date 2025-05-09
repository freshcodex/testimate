import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Camera } from "lucide-react";

interface CustomerDetailsContentProps {
  nameEnabled: boolean;
  emailEnabled: boolean;
  jobTitleEnabled: boolean;
  companyEnabled: boolean;
  primaryColor: string;
  isMobile?: boolean;
}

export function CustomerDetailsContent({
  nameEnabled,
  emailEnabled,
  jobTitleEnabled,
  companyEnabled,
  primaryColor,
  isMobile = false,
}: CustomerDetailsContentProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold">Almost done 🙌</h2>
      </div>

      <div className="space-y-4">
        {nameEnabled && (
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Your Name <span className="text-red-500">*</span>
            </label>
            <Input id="name" placeholder="Sherlock Holmes" />
          </div>
        )}

        {emailEnabled && (
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="sherlock@bakerstreet.com"
            />
          </div>
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

        {jobTitleEnabled && (
          <div>
            <label
              htmlFor="jobTitle"
              className="mb-1 block text-sm font-medium"
            >
              Job Title
            </label>
            <Input id="jobTitle" placeholder="Head of Investigations" />
          </div>
        )}

        <div>
          <label htmlFor="website" className="mb-1 block text-sm font-medium">
            Company Website
          </label>
          <Input id="website" placeholder="https://bakerstreet.com" />
        </div>

        {companyEnabled && (
          <div>
            <label htmlFor="company" className="mb-1 block text-sm font-medium">
              Company
            </label>
            <Input id="company" placeholder="Baker Street Detectives" />
          </div>
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

        <Button className="w-full" style={{ backgroundColor: primaryColor }}>
          Submit
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you give us permission to use this testimonial across
          social channels and other marketing efforts
        </p>
      </div>
    </div>
  );
}
