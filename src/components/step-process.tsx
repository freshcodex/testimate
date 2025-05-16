import { Upload, ListChecks, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StepProcess() {
  return (
    <section className="py-8 bg-[#eafdff]">
      <div className="max-w-5xl mx-auto px-2">
        <div className="rounded-2xl bg-white shadow-lg flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center min-w-[200px]">
            <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center mb-2">
              <Upload className="h-8 w-8 text-gray-700" aria-label="Collect" />
            </div>
            <div className="font-semibold text-lg mb-1">Step 1:</div>
            <div className="font-medium text-gray-900 mb-1">
              Collect testimonials
            </div>
            <div className="text-gray-600 text-sm">
              Use our widget to collect testimonials from your customers.
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:flex mx-4 items-center">
            <svg
              className="w-10 h-10 rotate-[45deg] text-gray-400"
              fill="currentColor"
              viewBox="-20 -20 240.01 240.01"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M197.007,48.479L139.348,0v28.623C63.505,32.538,3.006,95.472,3.006,172.271v27.741h40.099v-27.741 c0-54.682,42.527-99.614,96.243-103.47v28.156L197.007,48.479z"></path>
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center min-w-[200px]">
            <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center mb-2">
              <ListChecks
                className="h-8 w-8 text-gray-700"
                aria-label="Manage"
              />
            </div>
            <div className="font-semibold text-lg mb-1">Step 2:</div>
            <div className="font-medium text-gray-900 mb-1">
              Manage testimonials
            </div>
            <div className="text-gray-600 text-sm">
              Approve and reject testimonials.
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex mx-4 items-center">
            <svg
              className="w-10 h-10 rotate-[45deg] text-gray-400"
              fill="currentColor"
              viewBox="-20 -20 240.01 240.01"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M197.007,48.479L139.348,0v28.623C63.505,32.538,3.006,95.472,3.006,172.271v27.741h40.099v-27.741 c0-54.682,42.527-99.614,96.243-103.47v28.156L197.007,48.479z"></path>
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center min-w-[200px]">
            <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center mb-2">
              <Share2 className="h-8 w-8 text-gray-700" aria-label="Share" />
            </div>
            <div className="font-semibold text-lg mb-1">Step 3:</div>
            <div className="font-medium text-gray-900 mb-1">
              Share testimonials
            </div>
            <div className="text-gray-600 text-sm">
              Display your testimonials on your website using our widget.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
