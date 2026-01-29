"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Plus } from "lucide-react";
import { RecurringMeeting, DayFilter } from "@/types/meetings";
import { RecurringMeetingCard } from "./recurring-meeting-card";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6;

interface RecurringMeetingsGridProps {
  meetings: RecurringMeeting[];
  activeDay: DayFilter;
}

const dayLabels: Record<DayFilter, string> = {
  "coming-up": "this week",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export function RecurringMeetingsGrid({
  meetings,
  activeDay,
}: RecurringMeetingsGridProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeDay]);

  if (meetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-cyan-light flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8 text-cyan" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Nothing on the agenda{activeDay === "coming-up" ? " this week" : " for " + dayLabels[activeDay]}!
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Your schedule is clear. Start by creating an agenda item for an upcoming meeting.
        </p>
        <Button className="bg-cyan hover:bg-cyan-dark text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Agenda Item
        </Button>
      </div>
    );
  }

  const visibleMeetings = meetings.slice(0, visibleCount);
  const hasMore = visibleCount < meetings.length;
  const remainingCount = meetings.length - visibleCount;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleMeetings.map((meeting) => (
          <RecurringMeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center pt-2">
          <button
            onClick={handleShowMore}
            className="text-cyan hover:text-cyan-dark transition-colors text-sm font-medium"
          >
            Show more ({remainingCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
