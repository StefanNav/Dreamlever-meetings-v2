"use client";

import { motion } from "framer-motion";
import { Clock, Plus } from "lucide-react";
import { RecurringMeeting } from "@/types/meetings";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "./category-badge";
import { AvatarStack } from "./avatar-stack";
import { cn } from "@/lib/utils";

interface RecurringMeetingCardProps {
  meeting: RecurringMeeting;
  className?: string;
}

export function RecurringMeetingCard({
  meeting,
  className,
}: RecurringMeetingCardProps) {
  const hasAgendaItems = meeting.agendaItems.length > 0;

  return (
    <motion.div
      whileHover={{ 
        y: -4, 
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
      className={cn("h-full", className)}
    >
      <Card className="h-full flex flex-col border border-border hover:border-cyan/30 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CategoryBadge category={meeting.category} />
            <AvatarStack participants={meeting.participants} />
          </div>
          <h3 className="text-lg font-semibold text-foreground mt-3">
            {meeting.title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              {meeting.isDaily ? "Daily:" : "Next:"} {meeting.nextDate} · {meeting.time}
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          {hasAgendaItems ? (
            <div className="bg-muted/50 rounded-lg p-3">
              <ul className="space-y-1.5 max-h-[128px] overflow-y-auto scrollbar-thin pr-1">
                {meeting.agendaItems.map((item) => (
                  <li
                    key={item.id}
                    className="text-sm text-muted-foreground flex gap-2"
                  >
                    <span className="text-cyan leading-5 shrink-0">•</span>
                    <span className="leading-5">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-3 min-h-[80px] flex flex-col items-start justify-center">
              <p className="text-sm text-muted-foreground italic">
                No agenda items yet
              </p>
              <button className="text-sm text-cyan hover:text-cyan-dark transition-colors flex items-center gap-1 mt-1">
                <Plus className="w-3.5 h-3.5" />
                Add first agenda item
              </button>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            variant="outline"
            className="w-full border-cyan text-cyan hover:bg-cyan hover:text-white transition-colors"
          >
            Open Agenda
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
