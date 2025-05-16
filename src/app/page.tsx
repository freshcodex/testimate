import { Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialShowcase } from "@/components/testimonial-showcase";
import { StepProcess } from "@/components/step-process";
import { FeatureSection } from "@/components/feature-section";
import { RoadmapSection } from "@/components/roadmap-section";
import { HeroGradient } from "@/components/hero-gradient";
import { DashOrAuthButton } from "@/components/dash-or-auth-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="font-bold text-xl">Testimate</span>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              OSS
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#examples" className="text-gray-600 hover:text-gray-900">
              Examples
            </a>
            <a href="#roadmap" className="text-gray-600 hover:text-gray-900">
              Roadmap
            </a>
            <a
              href="https://github.com/testimate/testimate"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
            <a
              href="/docs"
              className="hidden md:block text-gray-600 hover:text-gray-900"
            >
              Docs
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <DashOrAuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 text-center overflow-hidden">
        <HeroGradient />
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-600 mb-6 shadow-sm">
            <span className="bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 text-xs font-medium mr-2">
              NEW
            </span>
            Introducing Testimate — Open Source Testimonial Platform
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
            <Button className="bg-purple-600 hover:bg-purple-700 h-12 px-8 text-lg">
              Start collecting testimonials
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="h-12 px-8 text-lg">
              <Github className="mr-2 h-5 w-5" />
              Star on GitHub
            </Button>
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
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 h-12 px-8 text-lg"
            >
              View documentation
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
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Contributors
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold">Testimate</span>
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Testimate. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
