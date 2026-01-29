"use client";

import { MeetingListFilter as FilterType } from "@/types/meetings";
import { cn } from "@/lib/utils";

interface MeetingListFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

export function MeetingListFilter({
  activeFilter,
  onFilterChange,
}: MeetingListFilterProps) {
  return (
    <div 
      className="h-12 inline-flex items-center p-1.5 rounded-[14px] border"
      style={{ 
        backgroundColor: '#F6F7F9',
        borderColor: 'rgba(0,0,0,0.06)'
      }}
    >
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "px-4 py-2 text-sm rounded-[10px] transition-all",
            activeFilter === filter.value
              ? "bg-white text-[#111827] font-semibold"
              : "bg-transparent text-[#6B7280] font-normal hover:text-[#111827]"
          )}
          style={activeFilter === filter.value ? {
            boxShadow: '0 1px 2px rgba(0,0,0,0.10)'
          } : undefined}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
