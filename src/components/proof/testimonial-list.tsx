import { TestimonialCard } from "@/components/proof/testimonial-card";

// Sample data for testimonials
const testimonials = [
  {
    id: 1,
    avatar: "ZX",
    avatarColor: "bg-green-100 text-green-800",
    name: "ZXZ",
    username: "zx@as.com",
    rating: 4,
    content: "zxzxz",
    days: 3,
    country: "GB",
    status: "unapproved" as const,
    media: [],
  },
  {
    id: 2,
    avatar: "/placeholder.svg?height=60&width=60",
    name: "Chicken Tikka",
    username: "neupanebishal07@gmail.com",
    role: "dev",
    rating: 4,
    days: 3,
    country: "GB",
    status: "approved" as const,
    media: [
      {
        type: "video" as const,
        thumbnail: "/placeholder.svg?height=150&width=250",
        duration: "04:32",
        title: "Introduce yourself and share what you do",
      },
      {
        type: "video" as const,
        thumbnail: "/placeholder.svg?height=150&width=250",
        duration: "02:27",
        title: "What was it like getting started...",
      },
    ],
  },
  {
    id: 3,
    avatar: "/placeholder.svg?height=60&width=60",
    name: "Josh Jones",
    rating: 5,
    content:
      "I can't say enough great things about The Farnam in Omaha. From the moment I arrived, the service has been exceptional across every touchpoint — valet, front desk, restaurant, and bars. As someone who travels frequently, it's rare to experience such consistently high quality service.",
    weeks: 2,
    country: "GB",
    status: "approved" as const,
    media: [
      { type: "image" as const, src: "/placeholder.svg?height=120&width=150" },
      { type: "image" as const, src: "/placeholder.svg?height=120&width=150" },
      { type: "image" as const, src: "/placeholder.svg?height=120&width=150" },
      { type: "image" as const, src: "/placeholder.svg?height=120&width=150" },
      { type: "image" as const, src: "/placeholder.svg?height=120&width=150" },
      { type: "image" as const, src: "/placeholder.svg?height=120&width=150" },
      { type: "image" as const, src: "/placeholder.svg?height=120&width=150" },
    ],
  },
];

export function TestimonialList() {
  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}
