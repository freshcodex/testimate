import { Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialShowcase } from "@/components/testimonial-showcase";
import { StepProcess } from "@/components/step-process";
import { FeatureSection } from "@/components/feature-section";
import { RoadmapSection } from "@/components/roadmap-section";
import { HeroGradient } from "@/components/hero-gradient";
import { DashOrAuthButton } from "@/components/dash-or-auth-button";
import { Logo } from "@/components/logo";
import NextLink from "next/link";
import { Badge } from "@/components/ui/badge";
export default function Home() {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="w-full container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#roadmap" className="text-gray-600 hover:text-gray-900">
              Roadmap
            </a>
            <a
              href="https://github.com/bishaln/testimate"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
          </nav>

          <DashOrAuthButton />
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative py-16 md:py-24 text-center overflow-hidden"
      >
        <HeroGradient />
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-600 mb-6 shadow-sm">
            <span className="bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 text-xs font-medium mr-2">
              NEW
            </span>
            Introducing Testimate — Open Source Testimonial Platform
          </div>
          <div>
            <Badge className="cursor-pointer">
              <NextLink
                className="flex"
                target="_blank"
                href="https://github.com/bishaln"
              >
                Made by Bishal
                <Github className="h-4 w-4 ml-2" />
              </NextLink>
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Beautiful testimonials,
            <br />
            <span className="text-purple-600">without the subscription</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Get professional testimonial widgets in minutes with our open-source
            alternative to commercial platforms. Self-host for complete control
            over your data.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <NextLink target="_blank" href="/dashboard">
              <Button className="bg-purple-600 hover:bg-purple-700 h-12 px-8 text-lg">
                Start collecting testimonials
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </NextLink>
            <NextLink
              target="_blank"
              href="https://github.com/bishaln/testimate"
            >
              <Button variant="outline" className="h-12 px-8 text-lg">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </Button>
            </NextLink>
          </div>

          <TestimonialShowcase />
        </div>
      </section>

      {/* Process Section */}
      <StepProcess />

      {/* Features Section */}
      <FeatureSection />

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to showcase your customer love?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join the open-source movement and take control of your testimonials
            today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 h-12 px-8 text-lg">
              Get started for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <NextLink
                    href="#features"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Features
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    href="#roadmap"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Roadmap
                  </NextLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <NextLink
                    target="_blank"
                    href="https://github.com/bishaln/testimate"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    GitHub
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    target="_blank"
                    href="https://x.com/bishaltwt"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Twitter
                  </NextLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <Logo />
            <div>
              <NextLink
                target="_blank"
                href="https://github.com/bishaln"
                className="text-gray-600 hover:text-gray-900"
              >
                Made with ❤️ by Bishal
              </NextLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
