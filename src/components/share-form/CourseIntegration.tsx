export function CourseIntegration() {
  const platforms = [
    {
      name: "Teachable",
      description: "Add your form to Teachable courses",
    },
    {
      name: "Thinkific",
      description: "Add your form to Thinkific courses",
    },
    {
      name: "Kajabi",
      description: "Add your form to Kajabi courses",
    },
    {
      name: "Podia",
      description: "Add your form to Podia courses",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Add to Course</h2>
      <p className="text-gray-500 mb-6">
        Collect student testimonials inside your course platform.
      </p>

      <div className="space-y-4">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="border rounded-lg p-4 hover:border-gray-300 cursor-pointer"
          >
            <div className="flex items-center">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt={platform.name}
                className="h-10 w-10 mr-3"
              />
              <div>
                <h3 className="font-medium">{platform.name}</h3>
                <p className="text-sm text-gray-500">{platform.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
