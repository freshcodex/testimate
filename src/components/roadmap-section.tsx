import { Check, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RoadmapSection() {
  const roadmapItems = [
    {
      title: "Self-hosted version",
      description:
        "Deploy Testimate on your own infrastructure with full control over your data.",
      status: "completed",
    },
    {
      title: "Cloud version (beta)",
      description:
        "A hosted version of Testimate for those who prefer not to self-host.",
      status: "in-progress",
    },
    {
      title: "Advanced analytics",
      description:
        "Detailed insights into how your testimonials are performing.",
      status: "planned",
    },
    {
      title: "AI-powered testimonial summarization",
      description: "Automatically generate highlights from your testimonials.",
      status: "planned",
    },
    {
      title: "Multi-language support",
      description: "Collect and display testimonials in multiple languages.",
      status: "planned",
    },
    {
      title: "Advanced integrations",
      description:
        "Connect with your favorite tools like Zapier, Slack, and more.",
      status: "planned",
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Roadmap</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're just getting started. Here's what we're working on next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {roadmapItems.map((item, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {item.status === "completed" && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <Check className="h-3 w-3 mr-1" /> Complete
                    </Badge>
                  )}
                  {item.status === "in-progress" && (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      <Clock className="h-3 w-3 mr-1" /> In Progress
                    </Badge>
                  )}
                  {item.status === "planned" && (
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-800 hover:bg-gray-100"
                    >
                      Planned
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
