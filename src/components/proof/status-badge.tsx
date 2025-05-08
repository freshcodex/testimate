import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "approved" | "unapproved" | "pending";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-1 text-xs font-medium",
        status === "approved" && "bg-green-100 text-green-800",
        status === "unapproved" && "bg-orange-100 text-orange-800",
        status === "pending" && "bg-blue-100 text-blue-800",
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
