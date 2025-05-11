import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StudioHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-purple-600" />
          <span className="font-medium text-lg">Testimate</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/forms" className="text-gray-600 hover:text-gray-900">
            Forms
          </Link>
          <Link href="/studio" className="text-purple-600 font-medium">
            Studio
          </Link>
          <Link href="/proof" className="text-gray-600 hover:text-gray-900">
            Proof
          </Link>

          <div className="ml-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-sm font-medium text-purple-600">B</span>
            </div>
            <Button variant="outline" size="sm">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
