"use client";

import { createClient } from "@/supabase/clients/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      Sign out
    </Button>
  );
}
