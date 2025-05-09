import { Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Automation() {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Connect to Zapier</h2>
      <p className="text-gray-500 mb-6">
        Zapier makes it possible to connect Testimate to 5000+ other apps
        without a single line of code! With it, you can automate your
        testimonial workflow and save time.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your API Key
        </label>
        <div className="relative">
          <Input
            type="password"
            value="••••••••••••••••••••••••••••••••"
            readOnly
            className="pr-10"
          />
          <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex items-center">
        <Zap className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
        <p className="text-sm text-purple-600">
          Upgrade your plan to connect to Zapier.
        </p>
      </div>

      <div className="flex space-x-3 mb-6">
        <Button
          variant="default"
          className="bg-black text-white hover:bg-gray-800"
        >
          Sign up
        </Button>
        <Button variant="outline">Log in</Button>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Connect this app...</h3>
        <div className="border rounded-lg p-3 flex items-center">
          <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
            <span className="text-xs font-bold">T</span>
          </div>
          <span>Testimate</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">with this one!</h3>
          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <span className="text-xs font-bold">+</span>
          </div>
        </div>
        <Input placeholder="Search for thousands of apps" />
      </div>

      <div>
        <h3 className="font-medium mb-4">Popular workflows</h3>

        <div className="space-y-3">
          <div className="border rounded-lg p-4 hover:border-gray-300 cursor-pointer">
            <div className="flex items-center mb-2">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                <span className="text-xs font-bold">T</span>
              </div>
              <img
                src="/placeholder.svg?height=24&width=24"
                alt="Slack"
                className="h-6 w-6 mr-2"
              />
              <h4 className="font-medium">
                Get Slack channel notifications for new Testimate testimonials
              </h4>
            </div>
            <p className="text-sm text-gray-500">Testimate + Slack</p>
          </div>

          <div className="border rounded-lg p-4 hover:border-gray-300 cursor-pointer">
            <div className="flex items-center mb-2">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                <span className="text-xs font-bold">T</span>
              </div>
              <img
                src="/placeholder.svg?height=24&width=24"
                alt="Slack"
                className="h-6 w-6 mr-2"
              />
              <h4 className="font-medium">
                Send Slack channel alerts for new Testimate testimonials
              </h4>
            </div>
            <p className="text-sm text-gray-500">Testimate + Slack</p>
          </div>
        </div>
      </div>
    </div>
  );
}
