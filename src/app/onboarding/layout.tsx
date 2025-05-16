import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Onboarding - Testimate",
  description: "Set up your Testimate account to start collecting testimonials",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: add suspense to other pages as well with proper fallback skeletons
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-50">{children}</div>;
    </Suspense>
  );
}
