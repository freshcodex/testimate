import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PromotionCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-[300px_1fr]">
          <div className="bg-purple-600 p-6 text-white">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Testimonial questions template"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm font-medium uppercase tracking-wider text-purple-600">
                TESTIMONIAL QUESTIONS
              </p>
              <h3 className="text-2xl font-bold">Get better testimonials</h3>
            </div>
            <p className="mb-2 text-gray-600">
              View over 50 probing testimonial questions and add them to your
              your forms.
            </p>
            <p className="mb-6 text-gray-600">
              Questions for SaaS, creators, newsletters, communities, and
              courses.
            </p>
            <Button variant="outline" className="gap-2">
              Browse the library <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
