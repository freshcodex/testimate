import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - Testimate",
  description: "Set up your Testimate account to start collecting testimonials",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
