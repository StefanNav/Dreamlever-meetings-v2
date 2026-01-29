"use client";

import { DayFilter } from "@/types/meetings";
import { cn } from "@/lib/utils";

interface DayTabsProps {
  activeDay: DayFilter;
  onDayChange: (day: DayFilter) => void;
}

const days: { value: DayFilter; label: string }[] = [
  { value: "coming-up", label: "Coming Up" },
  { value: "mon", label: "Mon" },
  { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" },
  { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" },
  { value: "sat", label: "Sat" },
  { value: "sun", label: "Sun" },
];

export function DayTabs({ activeDay, onDayChange }: DayTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-border">
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => onDayChange(day.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeDay === day.value
              ? "text-cyan"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {day.label}
          {activeDay === day.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan" />
          )}
        </button>
      ))}
    </div>
  );
}
