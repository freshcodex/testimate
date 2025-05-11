export function SavedWidgetsTab() {
  const savedWidgets = [
    {
      id: 1,
      name: "Customer Testimonials Wall",
      type: "wall-of-love",
      layout: "masonry-animated",
      createdAt: "2023-05-15",
    },
    {
      id: 2,
      name: "Product Page Widget",
      type: "single-widget",
      layout: "card",
      createdAt: "2023-06-22",
    },
    {
      id: 3,
      name: "Video Testimonials",
      type: "video-widget",
      layout: "carousel",
      createdAt: "2023-07-10",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Widgets</h2>
      <p className="text-gray-600 mb-8">
        Access your saved widgets and get the embed code to use on your website.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedWidgets.map((widget) => (
          <div
            key={widget.id}
            className="border rounded-lg bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{widget.name}</h3>
                <p className="text-sm text-gray-500">{widget.type}</p>
              </div>
              <span className="text-xs text-gray-400">{widget.createdAt}</span>
            </div>
            <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
              <span className="text-gray-400">Widget Preview</span>
            </div>
            <div className="flex justify-end">
              <button className="text-sm text-purple-600 hover:text-purple-800">
                Get Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
