"use client";

import { MeetingStatus } from "@/types/meetings";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: MeetingStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (status === "upcoming" || status === "past") {
    return null;
  }

  const isLive = status === "live";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        isLive
          ? "bg-live-bg text-live border-live"
          : "bg-recurring-bg text-recurring border-recurring",
        className
      )}
      style={{
        backgroundColor: isLive ? "var(--live-bg)" : "var(--recurring-bg)",
        color: isLive ? "var(--live)" : "var(--recurring)",
        borderColor: isLive ? "var(--live)" : "var(--recurring)",
      }}
    >
      {isLive && (
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--live)" }}
        />
      )}
      {isLive ? "Live" : "Recurring"}
    </span>
  );
}
