import { GalleryVerticalEnd } from "lucide-react";

import { SignupForm } from "@/components/signup-form";
import { Logo } from "@/components/logo";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted lg:flex items-center justify-center relative hidden ">
        <Image
          src="/logo.png"
          width={500}
          height={500}
          alt="Image"
          className=""
        />
      </div>
    </div>
  );
}
