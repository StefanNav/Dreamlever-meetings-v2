"use client";

import { Participant } from "@/types/meetings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
  participants: Participant[];
  maxDisplay?: number;
  size?: "sm" | "md";
  className?: string;
}

export function AvatarStack({
  participants,
  maxDisplay = 3,
  size = "sm",
  className,
}: AvatarStackProps) {
  const displayParticipants = participants.slice(0, maxDisplay);
  const remainingCount = participants.length - maxDisplay;

  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-8 h-8 text-sm",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-2">
        {displayParticipants.map((participant, index) => (
          <Avatar
            key={participant.id}
            className={cn(
              sizeClasses[size],
              "border-2 border-white ring-0"
            )}
            style={{ zIndex: maxDisplay - index }}
          >
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback className="bg-gradient-to-br from-cyan to-cyan-dark text-white text-xs">
              {participant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      {remainingCount > 0 && (
        <span className="ml-1 text-xs text-muted-foreground font-medium">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
