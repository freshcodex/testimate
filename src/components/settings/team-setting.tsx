import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingSection from "@/components/settings/setting-section";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TeamSettings() {
  return (
    <div>
      <SettingSection
        title="Invite Teammates"
        description="Invite new teammates to your collaborate with you in your Senja project."
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Email address" className="flex-1" />
            <Select defaultValue="editor">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Send invite
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                Admin
              </Badge>
              <p className="text-sm">
                Can invite new teammates, update billing and delete account.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                Editor
              </Badge>
              <p className="text-sm">
                Can edit content in this project but can't invite new teammates,
                update billing or delete account.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Sharer
              </Badge>
              <p className="text-sm">
                Can only view and share approved testimonials, forms, widgets,
                Walls of Love, images and social videos.
              </p>
            </div>
          </div>
        </div>
      </SettingSection>

      <SettingSection title="Manage Seats" description="Manage existing seats.">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Bishal</p>
                <p className="text-sm text-muted-foreground">
                  bishalsecret@gmail.com
                </p>
              </div>
              <Badge className="ml-2 bg-purple-100 text-purple-800">You</Badge>
            </div>
            <Badge className="bg-green-100 text-green-800">Owner</Badge>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">1 / 1</p>
          <div className="w-full max-w-xs bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-600 h-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </SettingSection>
    </div>
  );
}
