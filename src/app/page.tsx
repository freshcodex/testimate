import Link from "next/link";
import { HydrateClient } from "@/trpc/server";
import { Navbar } from "../components/navbar";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="relative min-h-screen p-4">
        <Navbar />
        <h1>hello</h1>
        <main className="min-h-screen bg-background pt-16">
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                  Collect & showcase testimonials that drive results
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  The easiest way to gather social proof, build trust, and
                  display testimonials that convert. All in one place.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Start collecting testimonials
                  </Link>
                  <Link
                    href="/docs"
                    className="text-sm font-semibold leading-6 text-foreground"
                  >
                    See how it works <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-secondary py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-primary">
                  Social Proof Made Simple
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Everything you need to build trust with testimonials
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  From collection to display, we make it effortless to gather
                  and showcase the social proof that drives your business
                  forward.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col">
                      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                        {feature.name}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                        <p className="flex-auto">{feature.description}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Trusted by creators and businesses worldwide
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Join thousands of teams who are already using Testimate to
                  build trust and drive conversions.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.author}
                    className="flex flex-col justify-between rounded-2xl bg-secondary p-8"
                  >
                    <div className="flex-1">
                      <p className="text-lg font-semibold leading-8 text-foreground">
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-x-4">
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-background">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
              <div className="relative isolate overflow-hidden bg-primary px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Ready to boost your business with social proof?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90">
                  Set up in minutes and discover how easy it is to collect,
                  manage, and share the testimonials that drive your business
                  forward.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/signup"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Start for free
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold leading-6 text-primary-foreground"
                  >
                    Contact sales <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}

const features = [
  {
    name: "Easy Collection",
    description:
      "Create and share testimonial forms in minutes. Collect text and video testimonials automatically, with built-in transcription for videos.",
  },
  {
    name: "Smart Organization",
    description:
      "Tag and sort testimonials by customer type, product, or sentiment. Use smart analysis to spot what your customers love most.",
  },
  {
    name: "Beautiful Display",
    description:
      "Showcase testimonials anywhere with customizable widgets and Walls of Love. Perfect for websites, emails, and social media.",
  },
];

const testimonials = [
  {
    content:
      "The setup was incredibly simple. It took less than 5 minutes to get started with collecting reviews. We were able to import existing reviews as well, which is such an important feature to have.",
    author: "Matt Davies",
    role: "Cofounder, Funnel Packs",
  },
  {
    content:
      "Hands-down the best testimonial tool on the market. We sell 2x more just because every landing page has a stunning wall of love.",
    author: "Chris Nguyen",
    role: "Founder, UX Playbook",
  },
  {
    content:
      "The granular filtering options let me find and show the perfect quote no matter which landing page a visitor hits, and they look great with so little work.",
    author: "Sophia O'Neal",
    role: "CEO, Ignore No More",
  },
];
