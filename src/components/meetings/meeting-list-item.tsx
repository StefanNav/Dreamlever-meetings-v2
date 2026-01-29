"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, ChevronDown, ChevronUp, Plus, Check } from "lucide-react";
import { Meeting } from "@/types/meetings";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StatusBadge } from "./status-badge";
import { cn } from "@/lib/utils";

// Mock department agendas data
const departmentAgendas = [
  { id: "1", name: "Operations", color: "#7a5af8", count: 7 },
  { id: "2", name: "Engineering", color: "#3b82f6", count: 5 },
  { id: "3", name: "Design", color: "#ec4899", count: 6 },
  { id: "4", name: "Marketing", color: "#f97316", count: 4 },
  { id: "5", name: "Sales", color: "#22c55e", count: 5 },
  { id: "6", name: "Product", color: "#8b5cf6", count: 4 },
];

interface MeetingListItemProps {
  meeting: Meeting;
  className?: string;
}

export function MeetingListItem({ meeting, className }: MeetingListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(meeting.aiEnabled);
  const [isAgendaDropdownOpen, setIsAgendaDropdownOpen] = useState(false);
  const [addedToAgenda, setAddedToAgenda] = useState<string | null>(null);

  const isPast = meeting.status === "past";
  const isLive = meeting.status === "live";
  const isRecurring = meeting.status === "recurring";
  const canAddToAgenda = !isPast && !isRecurring;
  const hasExpandableContent =
    meeting.agendaItems?.length || meeting.previousSummary || meeting.description;

  // Handle adding meeting to an agenda
  const handleAddToAgenda = (departmentName: string) => {
    setAddedToAgenda(departmentName);
    setIsAgendaDropdownOpen(false);
  };

  // Reset the success message after 2 seconds
  useEffect(() => {
    if (addedToAgenda) {
      const timer = setTimeout(() => {
        setAddedToAgenda(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [addedToAgenda]);

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border overflow-hidden transition-all hover:shadow-sm hover:border-cyan",
        className
      )}
    >
      {/* Main Row */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground">{meeting.title}</h4>
              <StatusBadge status={meeting.status} />
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {meeting.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {meeting.time}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {meeting.participantCount}
              </span>
            </div>
            {canAddToAgenda && (
              <Popover open={isAgendaDropdownOpen} onOpenChange={setIsAgendaDropdownOpen}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-1 mt-1.5 text-sm transition-colors",
                      addedToAgenda 
                        ? "text-green-600" 
                        : "text-cyan hover:text-cyan-dark"
                    )}
                    aria-label="Add to Agenda"
                  >
                    {addedToAgenda ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to {addedToAgenda}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Agenda</span>
                      </>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="start">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Add to Agenda</p>
                  </div>
                  <div className="py-1">
                    {departmentAgendas.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => handleAddToAgenda(dept.name)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: dept.color }}
                          />
                          <span className="text-foreground">{dept.name}</span>
                        </div>
                        <span className="text-muted-foreground text-xs">({dept.count})</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip content={aiEnabled ? "AI Assistant is enabled" : "AI Assistant is disabled"} position="left">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-muted-foreground">AI</span>
              <Switch
                checked={aiEnabled}
                onCheckedChange={setAiEnabled}
                className="data-[state=checked]:bg-cyan"
              />
            </div>
          </Tooltip>

          {isLive && (
            <Button
              size="sm"
              className="bg-cyan hover:bg-cyan-dark text-white"
            >
              Join
            </Button>
          )}

          {hasExpandableContent && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md hover:bg-muted transition-colors"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && hasExpandableContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              <div className="bg-cyan-light/50 rounded-lg p-4 border border-cyan/20">
                {/* Description */}
                {meeting.description && (
                  <p className="text-sm text-muted-foreground italic mb-3">
                    {meeting.description}
                  </p>
                )}

                {/* Agenda Items (for upcoming/recurring) */}
                {!isPast && meeting.agendaItems && meeting.agendaItems.length > 0 && (
                  <>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Agenda:
                    </p>
                    <ul className="space-y-1.5 mb-3">
                      {meeting.agendaItems.map((item) => (
                        <li
                          key={item.id}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-cyan mt-0.5">•</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="text-sm text-cyan hover:text-cyan-dark transition-colors font-medium">
                      Edit Agenda
                    </button>
                  </>
                )}

                {/* Previous Summary (for past meetings) */}
                {isPast && meeting.previousSummary && (
                  <>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Previous Meeting Summary
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {meeting.previousSummary}
                    </p>
                    <button className="text-sm text-cyan hover:text-cyan-dark transition-colors font-medium">
                      View Full Transcript
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
