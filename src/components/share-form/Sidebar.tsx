import { Mail, Link2, Code, GraduationCap, Zap } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const sidebarItems = [
  {
    id: "invite",
    icon: Mail,
    title: "Invite your customers",
    description:
      "Invite your customers to leave you a testimonial and track their progress.",
  },
  {
    id: "link",
    icon: Link2,
    title: "Share the link",
    description:
      "Share your link on social media, your website, or anywhere else.",
  },
  {
    id: "embed",
    icon: Code,
    title: "Embed",
    description: "Embed your form on your website to collect testimonials.",
  },
  // {
  //   id: "course",
  //   icon: GraduationCap,
  //   title: "Add to Course",
  //   description: "Collect student testimonials inside course.",
  // },
  // {
  //   id: "automate",
  //   icon: Zap,
  //   title: "Automate",
  //   description: "Automate your testimonial collection with Senja and Zapier.",
  // },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="space-y-2">
      {sidebarItems.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-lg cursor-pointer flex items-start ${
            activeTab === item.id
              ? "bg-purple-50 border border-purple-200"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
