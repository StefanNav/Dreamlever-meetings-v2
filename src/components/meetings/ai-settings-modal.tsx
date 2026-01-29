"use client";

import { useState } from "react";
import { X, Bot, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AiParticipationSetting = 
  | "all-meetings"
  | "meetings-i-own"
  | "dreamlever-participants"
  | "explicit-invite";

interface AiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (setting: AiParticipationSetting) => void;
}

const participationOptions: {
  id: AiParticipationSetting;
  title: string;
  description: string;
}[] = [
  {
    id: "all-meetings",
    title: "Miles joins all meetings",
    description: "AI will automatically join every meeting",
  },
  {
    id: "meetings-i-own",
    title: "Miles joins only meetings I own",
    description: "AI joins meetings you organize",
  },
  {
    id: "dreamlever-participants",
    title: "Miles joins only meetings with @dreamlever participants",
    description: "AI joins when team members are present",
  },
  {
    id: "explicit-invite",
    title: "Miles joins only when I explicitly invite miles@dreamlever.ai",
    description: "Manual control for each meeting",
  },
];

export function AiSettingsModal({ isOpen, onClose, onSave }: AiSettingsModalProps) {
  const [selectedSetting, setSelectedSetting] = useState<AiParticipationSetting>("meetings-i-own");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.(selectedSetting);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 space-y-6">
          {/* Header */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Description */}
          <div className="space-y-2 -mt-2">
            <h2 className="text-lg font-semibold text-foreground">
              AI Participation Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure when Miles AI should automatically join your meetings. You can override these settings for individual meetings.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {participationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedSetting(option.id)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-xl border transition-colors text-left",
                  selectedSetting === option.id
                    ? "bg-cyan-light border-cyan"
                    : "bg-muted/50 border-muted-foreground/30 hover:border-muted-foreground/50"
                )}
              >
                {/* Radio indicator */}
                <div className={cn(
                  "mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                  selectedSetting === option.id
                    ? "border-cyan"
                    : "border-muted-foreground/50"
                )}>
                  {selectedSetting === option.id && (
                    <div className="w-2 h-2 rounded-full bg-cyan" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start gap-2">
                    <Bot className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground text-sm">
                      {option.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Warning Banner */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-700/50 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              You can override these default settings for any individual meeting using the AI toggle in the meeting row.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full border-cyan text-cyan hover:bg-cyan hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="rounded-full bg-cyan hover:bg-cyan-dark text-white"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
