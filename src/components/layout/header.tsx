"use client";

import { useState } from "react";
import { Search, Calendar, Bell } from "lucide-react";
import Image from "next/image";
import { mockNotifications } from "@/lib/notifications-data";
import { NotificationsDrawer } from "./notifications-drawer";

function MileAiButton() {
  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-gradient-start to-brand-gradient-end flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg hover:opacity-90 transition-all">
      <Image
        src="/miles-logo.png"
        alt="Miles AI"
        width={24}
        height={24}
        className="brightness-0 invert"
      />
    </div>
  );
}

export function Header() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const hasUnread = mockNotifications.some((n) => !n.isRead);

  return (
    <>
      <header className="flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-7 h-7 text-heading-1" />
          <h1 className="text-3xl font-semibold text-heading-1">Recurring meetings</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Notifications"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            )}
          </button>
          <MileAiButton />
        </div>
      </header>

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
