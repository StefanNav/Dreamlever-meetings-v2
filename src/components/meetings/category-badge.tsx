"use client";

import { MeetingCategory } from "@/types/meetings";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: MeetingCategory;
  className?: string;
}

const categoryConfig: Record<
  MeetingCategory,
  { label: string; bgClass: string; textClass: string }
> = {
  operations: {
    label: "Operations",
    bgClass: "bg-operations-bg",
    textClass: "text-operations",
  },
  design: {
    label: "Design",
    bgClass: "bg-design-bg",
    textClass: "text-design",
  },
  engineering: {
    label: "Engineering",
    bgClass: "bg-engineering-bg",
    textClass: "text-engineering",
  },
  marketing: {
    label: "Marketing",
    bgClass: "bg-marketing-bg",
    textClass: "text-marketing",
  },
  sales: {
    label: "Sales",
    bgClass: "bg-sales-bg",
    textClass: "text-sales",
  },
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const config = categoryConfig[category];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        config.bgClass,
        config.textClass,
        className
      )}
      style={{
        backgroundColor: `var(--${category}-bg)`,
        color: `var(--${category})`,
        borderColor: `var(--${category})`,
      }}
    >
      {config.label}
    </span>
  );
}
