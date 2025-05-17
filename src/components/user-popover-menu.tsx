"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/clients/client";
import * as React from "react";
import type { User } from "@/types";

interface UserPopoverMenuProps {
  user: User;
  plan: string;
}

export function UserPopoverMenu({ user, plan }: UserPopoverMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-1">
          <ChevronDown className="h-5 w-5 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-62 p-0">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {user?.firstName?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base">
                {user?.firstName || "User"}
              </span>
              <span className="text-xs text-purple-600 font-medium">
                {plan}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Signed in as
            <br />
            <span className="font-medium text-gray-700">{user?.email}</span>
          </div>
        </div>
        <div className="border-t px-2 py-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive font-medium"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MenuItem({ label }: { label: string }) {
  return (
    <li>
      <Button
        variant="ghost"
        className="w-full justify-start text-sm font-normal px-2 py-2"
      >
        {label}
      </Button>
    </li>
  );
}
