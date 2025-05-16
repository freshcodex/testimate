import { Shield, Code, Zap, Palette, Globe, LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function FeatureSection() {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "100% Open Source",
      description:
        "Full access to the source code. Modify, extend, and contribute back to the community.",
    },
    {
      icon: <Code className="h-6 w-6 text-purple-600" />,
      title: "Self-hostable",
      description:
        "Host it yourself on your own infrastructure. Keep full control of your data and privacy.",
    },

    {
      icon: <Palette className="h-6 w-6 text-purple-600" />,
      title: "Fully Customizable",
      description:
        "Customize every aspect of your testimonial widgets to match your brand perfectly.",
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-600" />,
      title: "No Vendor Lock-in",
      description:
        "Unlike proprietary solutions, you're never locked into our platform. Your data, your rules.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why choose Testimate?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The open-source alternative to expensive testimonial platforms with
            all the features you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
