import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Form - Testimate",
  description: "Share your testimonial collection form with customers",
};

export default function ShareFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
